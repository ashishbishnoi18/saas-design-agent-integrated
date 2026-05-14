import { spawn } from "node:child_process";
import type { CliProvider } from "./types";

const CLAUDE_DEFAULT_MODEL = process.env.INTAKE_CLAUDE_MODEL || "claude-opus-4-7";
const CLAUDE_EFFORT = process.env.INTAKE_CLAUDE_EFFORT || "max";
const CODEX_DEFAULT_MODEL = process.env.INTAKE_CODEX_MODEL || "gpt-5.5";
const CODEX_EFFORT = process.env.INTAKE_CODEX_EFFORT || "xhigh";
const CALL_TIMEOUT_MS = Number(process.env.INTAKE_CLI_TIMEOUT_MS || 1_800_000);

export interface CliCallOptions {
  provider: CliProvider;
  systemPrompt: string;
  userText: string;
  model?: string;
  signal?: AbortSignal;
}

export async function callCli(opts: CliCallOptions): Promise<string> {
  if (opts.provider === "claude-cli") return runClaude(opts);
  if (opts.provider === "codex-cli") return runCodex(opts);
  throw new Error(`unknown provider: ${opts.provider as string}`);
}

async function runClaude(opts: CliCallOptions): Promise<string> {
  const model = opts.model || CLAUDE_DEFAULT_MODEL;
  const args = [
    "-p", opts.userText,
    "--model", model,
    "--effort", CLAUDE_EFFORT,
    "--allowedTools", "Read",
    "--permission-mode", "acceptEdits",
    "--output-format", "text",
    "--append-system-prompt", opts.systemPrompt,
  ];
  // Force the CLI to use the user's Claude subscription auth, not API credit.
  const env: NodeJS.ProcessEnv = { ...process.env };
  delete env.ANTHROPIC_API_KEY;
  return runProcess("claude", args, { env, signal: opts.signal });
}

async function runCodex(opts: CliCallOptions): Promise<string> {
  const model = opts.model || CODEX_DEFAULT_MODEL;
  const args = [
    "exec",
    "-m", model,
    "-c", `model_reasoning_effort="${CODEX_EFFORT}"`,
    "--skip-git-repo-check",
    "-",
  ];
  const env: NodeJS.ProcessEnv = { ...process.env };
  delete env.OPENAI_API_KEY;
  const stdin = `=== SYSTEM ===\n${opts.systemPrompt}\n\n=== USER ===\n${opts.userText}`;
  const raw = await runProcess("codex", args, { env, signal: opts.signal, stdin });
  return stripCodexExecOutput(raw);
}

interface RunProcessOptions {
  env: NodeJS.ProcessEnv;
  signal?: AbortSignal;
  stdin?: string;
}

function runProcess(cmd: string, args: string[], opts: RunProcessOptions): Promise<string> {
  return new Promise((resolve, reject) => {
    let proc;
    try {
      proc = spawn(cmd, args, {
        env: opts.env,
        stdio: [opts.stdin !== undefined ? "pipe" : "ignore", "pipe", "pipe"],
      });
    } catch (err) {
      reject(new Error(`failed to spawn ${cmd}: ${(err as Error).message}`));
      return;
    }

    const stdoutChunks: Buffer[] = [];
    const stderrChunks: Buffer[] = [];
    let timedOut = false;
    let aborted = false;

    const timer = setTimeout(() => {
      timedOut = true;
      proc.kill("SIGKILL");
    }, CALL_TIMEOUT_MS);

    const onAbort = () => {
      aborted = true;
      proc.kill("SIGKILL");
    };
    if (opts.signal) {
      if (opts.signal.aborted) onAbort();
      else opts.signal.addEventListener("abort", onAbort, { once: true });
    }

    proc.stdout?.on("data", (chunk: Buffer) => stdoutChunks.push(chunk));
    proc.stderr?.on("data", (chunk: Buffer) => stderrChunks.push(chunk));

    proc.on("error", (err) => {
      clearTimeout(timer);
      opts.signal?.removeEventListener("abort", onAbort);
      const code = (err as NodeJS.ErrnoException).code;
      if (code === "ENOENT") {
        reject(new Error(
          `${cmd} CLI not found on PATH. Install Claude Code (npm i -g @anthropic-ai/claude-code) ` +
          `or Codex (npm i -g @openai/codex).`,
        ));
        return;
      }
      reject(new Error(`failed to run ${cmd}: ${err.message}`));
    });

    proc.on("close", (code) => {
      clearTimeout(timer);
      opts.signal?.removeEventListener("abort", onAbort);
      const stdout = Buffer.concat(stdoutChunks).toString("utf8");
      const stderr = Buffer.concat(stderrChunks).toString("utf8");
      if (aborted) { reject(new Error(`${cmd} call was aborted`)); return; }
      if (timedOut) { reject(new Error(`${cmd} call timed out after ${CALL_TIMEOUT_MS}ms`)); return; }
      if (code !== 0 || stdout.includes("Credit balance is too low")) {
        reject(new Error(
          `${cmd} exited ${code}. stderr=${stderr.slice(0, 400)} stdout=${stdout.slice(0, 400)}`,
        ));
        return;
      }
      resolve(stdout);
    });

    if (opts.stdin !== undefined && proc.stdin) {
      proc.stdin.end(opts.stdin);
    }
  });
}

/**
 * `codex exec` stdout layout:
 *   OpenAI Codex v...
 *   --------
 *   workdir / model / etc.
 *   --------
 *   user
 *   <prompt>
 *   codex
 *   <response>
 *   tokens used
 *   <count>
 *   <response duplicated>
 * Take everything between the first `\ncodex\n` and the `\ntokens used\n` line.
 */
export function stripCodexExecOutput(raw: string): string {
  const codexMatch = raw.match(/\ncodex\s*\n/);
  if (!codexMatch || codexMatch.index === undefined) return raw.trim();
  const after = raw.slice(codexMatch.index + codexMatch[0].length);
  const tokensMatch = after.match(/\ntokens used\s*\n/);
  const body = tokensMatch && tokensMatch.index !== undefined ? after.slice(0, tokensMatch.index) : after;
  return body.trim();
}
