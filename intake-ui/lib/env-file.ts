import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * Lightweight `.env` loader. Reads KEY=VAL or KEY="VAL" lines from the project
 * root (one level up from the intake-ui working dir) and returns them as an
 * object suitable for merging into a child-process env. Comments (#…) and
 * blank lines are skipped.
 *
 * We do this in Node rather than relying on `dotenv` because the python pipeline
 * does not load `.env` itself — it reads from `os.environ` — so we have to push
 * the keys into the spawn env explicitly.
 */
export async function loadProjectEnv(): Promise<Record<string, string>> {
  const projectRoot = path.resolve(process.cwd(), "..");
  const envPath = path.join(projectRoot, ".env");
  let raw: string;
  try {
    raw = await fs.readFile(envPath, "utf8");
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return {};
    throw err;
  }
  const out: Record<string, string> = {};
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (key) out[key] = value;
  }
  return out;
}
