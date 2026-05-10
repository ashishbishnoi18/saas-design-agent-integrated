import { NextResponse } from "next/server";
import path from "node:path";
import { promises as fs } from "node:fs";
import { readRunById } from "@/lib/runs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".html": "text/html; charset=utf-8",
  ".htm": "text/html; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".log": "text/plain; charset=utf-8",
};

/**
 * Stream a file from inside a run's out_dir. The `path` query param is
 * resolved against out_dir; we then assert the resolved path is still
 * a descendant of out_dir before reading. Anything else returns 403.
 */
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const url = new URL(req.url);
  const requested = url.searchParams.get("path");
  if (!requested) return NextResponse.json({ error: "path required" }, { status: 400 });

  const record = await readRunById(params.id);
  if (!record) return NextResponse.json({ error: "run not found" }, { status: 404 });

  const baseAbs = path.resolve(record.out_dir);
  const targetAbs = path.resolve(baseAbs, requested);
  const baseWithSep = baseAbs.endsWith(path.sep) ? baseAbs : baseAbs + path.sep;
  if (targetAbs !== baseAbs && !targetAbs.startsWith(baseWithSep)) {
    return NextResponse.json({ error: "path escapes out_dir" }, { status: 403 });
  }

  let data: Buffer;
  try {
    data = await fs.readFile(targetAbs);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }

  const ext = path.extname(targetAbs).toLowerCase();
  const mime = MIME[ext] || "application/octet-stream";
  // Use a Blob so the response works for both text and binary content without
  // tripping Node-vs-DOM Buffer typings.
  return new NextResponse(new Blob([new Uint8Array(data)], { type: mime }), {
    status: 200,
    headers: { "Cache-Control": "private, max-age=60" },
  });
}
