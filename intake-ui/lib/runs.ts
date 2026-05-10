import { promises as fs } from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";
import type { RunRecord } from "./types";

/**
 * Run records live alongside their pipeline output, at
 *   <project_root>/runs/intake-<sessionId>-pipeline-<runId>/run.meta.json
 *
 * Picking a discoverable filesystem layout (rather than a separate index file)
 * means orphan crashes / cleanup is just `rm -rf` the dir — no index drift.
 */

export const PROJECT_ROOT = path.resolve(process.cwd(), "..");
export const RUNS_ROOT = path.join(PROJECT_ROOT, "runs");

export function newRunId(): string {
  return randomBytes(4).toString("hex");
}

export function runOutDirFor(sessionId: string, runId: string): string {
  return path.join(RUNS_ROOT, `intake-${sessionId}-pipeline-${runId}`);
}

export function runMetaPath(outDir: string): string {
  return path.join(outDir, "run.meta.json");
}

export function runLogPath(outDir: string): string {
  return path.join(outDir, "run.log");
}

export async function writeRun(record: RunRecord): Promise<RunRecord> {
  await fs.mkdir(record.out_dir, { recursive: true });
  await fs.writeFile(runMetaPath(record.out_dir), JSON.stringify(record, null, 2), "utf8");
  return record;
}

export async function readRun(outDir: string): Promise<RunRecord | null> {
  try {
    const text = await fs.readFile(runMetaPath(outDir), "utf8");
    return JSON.parse(text) as RunRecord;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw err;
  }
}

export async function readRunById(runId: string): Promise<RunRecord | null> {
  // Scan RUNS_ROOT for a dir matching the run id suffix.
  let entries: string[];
  try {
    entries = await fs.readdir(RUNS_ROOT);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw err;
  }
  const match = entries.find((e) => e.endsWith(`-pipeline-${runId}`));
  if (!match) return null;
  return readRun(path.join(RUNS_ROOT, match));
}

export async function listRunsForSession(sessionId: string): Promise<RunRecord[]> {
  let entries: string[];
  try {
    entries = await fs.readdir(RUNS_ROOT);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
  const prefix = `intake-${sessionId}-pipeline-`;
  const out: RunRecord[] = [];
  for (const e of entries) {
    if (!e.startsWith(prefix)) continue;
    const rec = await readRun(path.join(RUNS_ROOT, e));
    if (rec) out.push(rec);
  }
  out.sort((a, b) => b.started_at - a.started_at);
  return out;
}

export async function tailLog(outDir: string, maxBytes = 64_000): Promise<{ text: string; bytes: number; truncated: boolean }> {
  const p = runLogPath(outDir);
  try {
    const stat = await fs.stat(p);
    const fd = await fs.open(p, "r");
    try {
      const start = stat.size > maxBytes ? stat.size - maxBytes : 0;
      const buf = Buffer.alloc(stat.size - start);
      await fd.read(buf, 0, buf.length, start);
      return { text: buf.toString("utf8"), bytes: stat.size, truncated: start > 0 };
    } finally {
      await fd.close();
    }
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return { text: "", bytes: 0, truncated: false };
    throw err;
  }
}
