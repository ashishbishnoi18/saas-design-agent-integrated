import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { callCli } from "@/lib/cli";
import { extractJsonObject } from "@/lib/extract-json";
import { finalizePrompt } from "@/lib/prompts";
import { loadSession, saveSession } from "@/lib/sessions";
import type { FinalBrief } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = (await req.json()) as { session_id: string };
  if (!body.session_id) return NextResponse.json({ error: "session_id required" }, { status: 400 });
  const session = await loadSession(body.session_id);
  if (!session) return NextResponse.json({ error: "session not found" }, { status: 404 });

  const systemPrompt = await finalizePrompt();
  const userPayload = JSON.stringify({
    transcript: session.messages.map((m) => ({ role: m.role, content: m.content, type: m.type, target_axis: m.target_axis })),
    preview: session.preview ?? null,
  }, null, 2);

  let raw: string;
  try {
    raw = await callCli({
      provider: session.provider,
      systemPrompt,
      userText: userPayload,
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 502 });
  }

  let brief: FinalBrief;
  try {
    brief = extractJsonObject<FinalBrief>(raw);
  } catch (err) {
    return NextResponse.json({ error: `could not parse final brief JSON: ${(err as Error).message}`, raw }, { status: 502 });
  }

  for (const key of [
    "raw_brief",
    "optional_business_context",
    "optional_known_constraints",
    "optional_user_preferences",
    "optional_existing_site_or_brand_notes",
  ] as const) {
    if (typeof brief[key] !== "string") brief[key] = "";
  }

  session.final_brief = brief;
  const saved = await saveSession(session);

  // Write to ../runs/intake-<id>/input.json so it's immediately consumable by integrated_pipeline.py
  const runsDir = path.resolve(process.cwd(), "..", "runs", `intake-${session.id}`);
  await fs.mkdir(runsDir, { recursive: true });
  const inputPath = path.join(runsDir, "input.json");
  await fs.writeFile(inputPath, JSON.stringify(brief, null, 2), "utf8");

  return NextResponse.json({
    session: saved,
    final_brief: brief,
    written_to: inputPath,
    next_command: `python3 integrated_pipeline.py --input ${path.relative(path.resolve(process.cwd(), ".."), inputPath)} --out runs/intake-${session.id}-pipeline`,
  });
}
