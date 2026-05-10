import { NextResponse } from "next/server";
import path from "node:path";
import { promises as fs } from "node:fs";
import { listRunsForSession, PROJECT_ROOT } from "@/lib/runs";
import { defaultRunOptions, startRun } from "@/lib/runner";
import { loadSession, saveSession } from "@/lib/sessions";
import type { RunOptions } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get("session_id");
  if (!sessionId) return NextResponse.json({ error: "session_id required" }, { status: 400 });
  const runs = await listRunsForSession(sessionId);
  return NextResponse.json({ runs });
}

interface PostBody {
  session_id: string;
  options?: Partial<RunOptions>;
}

export async function POST(req: Request) {
  const body = (await req.json()) as PostBody;
  if (!body.session_id) return NextResponse.json({ error: "session_id required" }, { status: 400 });

  const session = await loadSession(body.session_id);
  if (!session) return NextResponse.json({ error: "session not found" }, { status: 404 });
  if (!session.final_brief) {
    return NextResponse.json({ error: "session has no finalized brief; finalize first" }, { status: 400 });
  }

  const inputAbs = path.join(PROJECT_ROOT, "runs", `intake-${session.id}`, "input.json");
  try {
    await fs.access(inputAbs);
  } catch {
    return NextResponse.json({ error: `input.json missing at ${inputAbs}; re-finalize` }, { status: 400 });
  }

  const merged: RunOptions = { ...defaultRunOptions(session.provider), ...(body.options ?? {}) };

  const record = await startRun({ sessionId: session.id, inputAbs, options: merged });

  session.latest_run_id = record.id;
  await saveSession(session);

  return NextResponse.json({ run: record });
}
