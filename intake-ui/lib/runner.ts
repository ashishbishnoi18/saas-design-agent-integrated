import { spawn } from "node:child_process";
import { createWriteStream, existsSync, promises as fs } from "node:fs";
import path from "node:path";
import { loadProjectEnv } from "./env-file";
import { newRunId, PROJECT_ROOT, runOutDirFor, writeRun, readRun, runLogPath, runMetaPath } from "./runs";
import type { RunOptions, RunRecord } from "./types";

export const PIPELINE_SCRIPT = "integrated_pipeline.py";

/**
 * Pick the python interpreter to spawn:
 *   1. INTAKE_PYTHON env override
 *   2. project .venv/bin/python (so `pip install -r requirements.txt` actually applies)
 *   3. python3 from PATH
 *
 * Resolved at spawn time, not module load, so adding/removing the venv
 * doesn't require a server restart.
 */
export function resolvePythonBin(): string {
  if (process.env.INTAKE_PYTHON) return process.env.INTAKE_PYTHON;
  const venvPython = path.join(PROJECT_ROOT, ".venv", "bin", "python");
  if (existsSync(venvPython)) return venvPython;
  return "python3";
}

function buildArgs(inputRel: string, outRel: string, opts: RunOptions): string[] {
  const args = [
    PIPELINE_SCRIPT,
    "--input", inputRel,
    "--out", outRel,
    "--diagnosis-provider", opts.diagnosis_provider,
    "--validator-provider", opts.validator_provider,
    "--evaluator-provider", opts.evaluator_provider,
  ];
  if (opts.use_diagnosis_strategies) args.push("--use-diagnosis-strategies");
  if (opts.judge_panel) args.push("--judge-panel");
  if (opts.blind_pairwise) args.push("--blind-pairwise");
  if (opts.pairwise) args.push("--pairwise");
  if (opts.synthesize_top_k && opts.synthesize_top_k > 0) {
    args.push("--synthesize-top-k", String(opts.synthesize_top_k));
  }
  return args;
}

export interface StartRunArgs {
  sessionId: string;
  inputAbs: string; // absolute path to input.json
  options: RunOptions;
}

export async function startRun({ sessionId, inputAbs, options }: StartRunArgs): Promise<RunRecord> {
  const runId = newRunId();
  const outDir = runOutDirFor(sessionId, runId);
  await fs.mkdir(outDir, { recursive: true });

  const inputRel = path.relative(PROJECT_ROOT, inputAbs);
  const outRel = path.relative(PROJECT_ROOT, outDir);
  const args = buildArgs(inputRel, outRel, options);

  const env = { ...process.env, ...(await loadProjectEnv()) };
  const pythonBin = resolvePythonBin();

  // Open the log file before spawn so a blank log exists immediately for the UI.
  const logStream = createWriteStream(runLogPath(outDir), { flags: "w" });

  const proc = spawn(pythonBin, args, {
    cwd: PROJECT_ROOT,
    env,
    stdio: ["ignore", "pipe", "pipe"],
    detached: false,
  });

  const record: RunRecord = {
    id: runId,
    session_id: sessionId,
    status: "running",
    started_at: Date.now(),
    pid: proc.pid,
    command: [pythonBin, ...args],
    input_path: inputAbs,
    out_dir: outDir,
    options,
  };
  await writeRun(record);

  const writeLine = (kind: "OUT" | "ERR", chunk: Buffer) => {
    logStream.write(chunk);
    // Mirror to dev console as well so it's not opaque when watching the server.
    process.stdout.write(`[run ${runId} ${kind}] ${chunk}`);
  };
  proc.stdout?.on("data", (c: Buffer) => writeLine("OUT", c));
  proc.stderr?.on("data", (c: Buffer) => writeLine("ERR", c));

  proc.on("error", async (err) => {
    logStream.end(`\n[runner] failed to spawn: ${err.message}\n`);
    const next = (await readRun(outDir)) ?? record;
    next.status = "failed";
    next.error = err.message;
    next.ended_at = Date.now();
    await writeRun(next);
  });

  proc.on("close", async (code, signal) => {
    logStream.end(`\n[runner] exited code=${code} signal=${signal}\n`);
    const next = (await readRun(outDir)) ?? record;
    if (next.status === "killed") {
      next.ended_at = Date.now();
    } else {
      next.status = code === 0 ? "completed" : "failed";
      next.exit_code = code ?? undefined;
      next.ended_at = Date.now();
    }
    await writeRun(next);
  });

  return record;
}

export async function killRun(record: RunRecord): Promise<RunRecord> {
  if (record.status !== "running" || !record.pid) return record;
  try {
    process.kill(record.pid, "SIGTERM");
  } catch {
    /* may already be dead */
  }
  const next: RunRecord = { ...record, status: "killed" };
  await writeRun(next);
  // Re-read to get any further updates from the close handler.
  return (await readRun(record.out_dir)) ?? next;
}

const PROVIDER_FAMILY: Record<string, string> = {
  "claude-cli": "anthropic",
  anthropic: "anthropic",
  "codex-cli": "openai",
  openai: "openai",
  gemini: "google",
};

function providerAvailable(p: string, env: Record<string, string | undefined>): boolean {
  switch (p) {
    case "gemini":
      return !!(env.GOOGLE_API_KEY || env.GEMINI_API_KEY);
    case "openai":
      return !!env.OPENAI_API_KEY;
    case "anthropic":
      return !!env.ANTHROPIC_API_KEY;
    case "claude-cli":
      // Assumed installed — the harness/runner already depends on it; the
      // command-not-found error from spawn is clear enough if it isn't.
      return true;
    case "codex-cli":
      return true;
    default:
      return false;
  }
}

/**
 * Pick a validator from a *different* model family than `sessionProvider`,
 * preferring providers whose API keys are present. Falls back to the session
 * provider if nothing cross-family is available — mixing is a "best effort"
 * default, not a hard requirement.
 *
 * Cross-family validation is the highest-leverage diversity in this pipeline:
 * the validator's job is to flag overconfidence and bias in the diagnosis,
 * which an in-family model is biased to overlook.
 */
function pickCrossFamilyValidator(sessionProvider: string, env: Record<string, string | undefined>): string {
  const sessionFamily = PROVIDER_FAMILY[sessionProvider] ?? sessionProvider;
  // Preference orders by session family; first available wins.
  const preferenceBySession: Record<string, string[]> = {
    anthropic: ["gemini", "openai", "codex-cli", "claude-cli"],
    openai: ["gemini", "anthropic", "claude-cli", "codex-cli"],
    google: ["anthropic", "openai", "claude-cli", "codex-cli"],
  };
  const prefs = preferenceBySession[sessionFamily] ?? ["gemini", "openai", "anthropic"];
  for (const p of prefs) {
    const fam = PROVIDER_FAMILY[p];
    if (fam === sessionFamily) continue;
    if (providerAvailable(p, env)) return p;
  }
  return sessionProvider;
}

export async function defaultRunOptions(provider: string): Promise<RunOptions> {
  // Provider names accepted by integrated_pipeline.py: gemini, openai, anthropic, claude-cli, codex-cli.
  const safe = ["gemini", "openai", "anthropic", "claude-cli", "codex-cli"].includes(provider) ? provider : "claude-cli";
  // Merge .env with process.env so we honor either.
  const env: Record<string, string | undefined> = { ...process.env, ...(await loadProjectEnv()) };
  const validator = pickCrossFamilyValidator(safe, env);
  return {
    diagnosis_provider: safe,
    validator_provider: validator,
    evaluator_provider: safe,
    use_diagnosis_strategies: true,
    judge_panel: true,
    blind_pairwise: true,
    pairwise: true,
    synthesize_top_k: 0,
  };
}

// Used by the metaPath consumer; re-exported for convenience.
export { runMetaPath };
