import { NextResponse } from "next/server";
import { listSessions, loadSession, newSessionId, saveSession } from "@/lib/sessions";
import type { CliProvider, Session } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (id) {
    const session = await loadSession(id);
    if (!session) return NextResponse.json({ error: "not found" }, { status: 404 });
    return NextResponse.json(session);
  }
  const sessions = await listSessions();
  return NextResponse.json({ sessions });
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { provider?: CliProvider };
  const provider: CliProvider = body.provider === "codex-cli" ? "codex-cli" : "claude-cli";
  const id = newSessionId();
  const now = Date.now();
  const session: Session = {
    id,
    created_at: now,
    updated_at: now,
    provider,
    messages: [],
  };
  await saveSession(session);
  return NextResponse.json(session);
}
