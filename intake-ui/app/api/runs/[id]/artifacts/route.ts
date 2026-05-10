import { NextResponse } from "next/server";
import { readRunById } from "@/lib/runs";
import { loadArtifactsSummary } from "@/lib/artifacts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const record = await readRunById(params.id);
  if (!record) return NextResponse.json({ error: "run not found" }, { status: 404 });
  const summary = await loadArtifactsSummary(record.out_dir);
  return NextResponse.json({ run: record, summary });
}
