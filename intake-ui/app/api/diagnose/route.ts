import { NextResponse } from "next/server";
import { callCli } from "@/lib/cli";
import { extractJsonObject } from "@/lib/extract-json";
import { previewPrompt } from "@/lib/prompts";
import { loadSession, saveSession } from "@/lib/sessions";
import type { DiagnosisPreview } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = (await req.json()) as { session_id: string };
  if (!body.session_id) return NextResponse.json({ error: "session_id required" }, { status: 400 });
  const session = await loadSession(body.session_id);
  if (!session) return NextResponse.json({ error: "session not found" }, { status: 404 });

  const systemPrompt = await previewPrompt();
  const userPayload = JSON.stringify({
    transcript: session.messages.map((m) => ({ role: m.role, content: m.content, type: m.type })),
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

  let preview: DiagnosisPreview;
  try {
    preview = extractJsonObject<DiagnosisPreview>(raw);
  } catch (err) {
    return NextResponse.json({ error: `could not parse preview JSON: ${(err as Error).message}`, raw }, { status: 502 });
  }

  if (!Array.isArray(preview.axes)) preview.axes = [];
  preview.overall_confidence = preview.axes.length
    ? preview.axes.reduce((sum, a) => sum + (Number(a.confidence) || 0), 0) / preview.axes.length
    : 0;

  session.preview = preview;
  const saved = await saveSession(session);
  return NextResponse.json({ session: saved, preview });
}
