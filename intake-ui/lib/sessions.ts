import { promises as fs } from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";
import type { Session } from "./types";

const SESSIONS_DIR = path.join(process.cwd(), "sessions");

async function ensureDir(): Promise<void> {
  await fs.mkdir(SESSIONS_DIR, { recursive: true });
}

export function newSessionId(): string {
  return randomBytes(8).toString("hex");
}

export async function loadSession(id: string): Promise<Session | null> {
  await ensureDir();
  try {
    const text = await fs.readFile(path.join(SESSIONS_DIR, `${id}.json`), "utf8");
    return JSON.parse(text) as Session;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw err;
  }
}

export async function saveSession(session: Session): Promise<Session> {
  await ensureDir();
  const updated: Session = { ...session, updated_at: Date.now() };
  await fs.writeFile(
    path.join(SESSIONS_DIR, `${session.id}.json`),
    JSON.stringify(updated, null, 2),
    "utf8",
  );
  return updated;
}

export async function listSessions(): Promise<Array<{ id: string; updated_at: number; preview?: string }>> {
  await ensureDir();
  const files = await fs.readdir(SESSIONS_DIR);
  const out: Array<{ id: string; updated_at: number; preview?: string }> = [];
  for (const file of files) {
    if (!file.endsWith(".json")) continue;
    try {
      const text = await fs.readFile(path.join(SESSIONS_DIR, file), "utf8");
      const s = JSON.parse(text) as Session;
      out.push({
        id: s.id,
        updated_at: s.updated_at,
        preview: s.preview?.one_sentence_summary || s.messages.find((m) => m.role === "user")?.content,
      });
    } catch { /* skip corrupt file */ }
  }
  out.sort((a, b) => b.updated_at - a.updated_at);
  return out;
}
