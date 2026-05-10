/**
 * Extract the first balanced JSON object from a text blob.
 * Mirrors the behavior of harness._extract_json_object so the same model
 * outputs that work in the Python pipeline also work here.
 */
export function extractJsonObject<T = unknown>(raw: string): T {
  const text = raw.trim();
  if (!text) throw new Error("empty model response");

  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidates: string[] = [];
  if (fenced && fenced[1]) candidates.push(fenced[1].trim());
  candidates.push(text);

  for (const body of candidates) {
    const start = body.indexOf("{");
    if (start < 0) continue;
    let depth = 0;
    let inString = false;
    let escape = false;
    for (let i = start; i < body.length; i++) {
      const ch = body[i];
      if (escape) { escape = false; continue; }
      if (ch === "\\") { escape = true; continue; }
      if (ch === '"') { inString = !inString; continue; }
      if (inString) continue;
      if (ch === "{") depth++;
      else if (ch === "}") {
        depth--;
        if (depth === 0) {
          const slice = body.slice(start, i + 1);
          try { return JSON.parse(slice) as T; } catch { /* try next */ }
          break;
        }
      }
    }
  }
  throw new Error(`could not parse JSON object from response: ${text.slice(0, 240)}`);
}
