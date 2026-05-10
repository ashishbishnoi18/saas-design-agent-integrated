import { promises as fs } from "node:fs";
import path from "node:path";

const PROMPTS_DIR = path.join(process.cwd(), "prompts");

const cache = new Map<string, string>();

async function load(name: string): Promise<string> {
  const cached = cache.get(name);
  if (cached) return cached;
  const text = await fs.readFile(path.join(PROMPTS_DIR, name), "utf8");
  cache.set(name, text);
  return text;
}

export const interviewerPrompt = (): Promise<string> => load("interviewer.md");
export const previewPrompt = (): Promise<string> => load("preview-diagnosis.md");
export const finalizePrompt = (): Promise<string> => load("finalize.md");
