import { NextResponse } from "next/server";
import { readRunById, tailLog } from "@/lib/runs";
import { killRun } from "@/lib/runner";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const record = await readRunById(params.id);
  if (!record) return NextResponse.json({ error: "run not found" }, { status: 404 });
  const log = await tailLog(record.out_dir);
  return NextResponse.json({ run: record, log });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const record = await readRunById(params.id);
  if (!record) return NextResponse.json({ error: "run not found" }, { status: 404 });
  const next = await killRun(record);
  return NextResponse.json({ run: next });
}
