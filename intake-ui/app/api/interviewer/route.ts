import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { callCli } from "@/lib/cli";
import { extractJsonObject } from "@/lib/extract-json";
import { interviewerPrompt } from "@/lib/prompts";
import { loadSession, saveSession } from "@/lib/sessions";
import type { CliProvider, Message, MessageType } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface InterviewerOutput {
  type?: MessageType;
  message?: string;
  target_axis?: string;
  rationale?: string;
}

interface PostBody {
  session_id: string;
  user_message?: string;
  provider_override?: CliProvider;
}

export async function POST(req: Request) {
  const body = (await req.json()) as PostBody;
  if (!body.session_id) return NextResponse.json({ error: "session_id required" }, { status: 400 });
  const session = await loadSession(body.session_id);
  if (!session) return NextResponse.json({ error: "session not found" }, { status: 404 });

  if (body.provider_override) session.provider = body.provider_override;

  if (body.user_message && body.user_message.trim()) {
    const userMsg: Message = {
      id: randomBytes(6).toString("hex"),
      role: "user",
      type: "user",
      content: body.user_message.trim(),
      created_at: Date.now(),
    };
    session.messages.push(userMsg);
  }

  const systemPrompt = await interviewerPrompt();
  const userPayload = JSON.stringify({
    raw_seed: session.messages.length === 0 ? "" : undefined,
    messages: session.messages.map((m) => ({ role: m.role, content: m.content })),
    diagnosis_preview: session.preview ?? null,
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

  let parsed: InterviewerOutput;
  try {
    parsed = extractJsonObject<InterviewerOutput>(raw);
  } catch {
    parsed = { type: "question", message: raw.trim() };
  }

  const interviewerMsg: Message = {
    id: randomBytes(6).toString("hex"),
    role: "interviewer",
    type: (parsed.type as MessageType) || "question",
    content: (parsed.message || "").trim() || "(empty response from model)",
    target_axis: parsed.target_axis,
    rationale: parsed.rationale,
    created_at: Date.now(),
  };
  session.messages.push(interviewerMsg);
  const saved = await saveSession(session);
  return NextResponse.json({ session: saved, interviewer_message: interviewerMsg });
}
