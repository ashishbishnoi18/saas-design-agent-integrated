"use client";

import { useEffect, useRef } from "react";
import { CheckCircle2, Loader2, OctagonX, Square, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { RunRecord, RunStatus } from "@/lib/types";

const STATUS_META: Record<RunStatus, { label: string; tone: string; icon: typeof Loader2 }> = {
  running: { label: "running", tone: "bg-amber-100 text-amber-900 border-amber-200", icon: Loader2 },
  completed: { label: "completed", tone: "bg-emerald-100 text-emerald-900 border-emerald-200", icon: CheckCircle2 },
  failed: { label: "failed", tone: "bg-rose-100 text-rose-900 border-rose-200", icon: XCircle },
  killed: { label: "killed", tone: "bg-zinc-100 text-zinc-900 border-zinc-200", icon: OctagonX },
};

function formatElapsed(start: number, end?: number): string {
  const ms = (end ?? Date.now()) - start;
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}m ${r}s`;
}

export function RunStatusView({
  run,
  log,
  onKill,
  onStartNew,
}: {
  run: RunRecord;
  log: { text: string; bytes: number; truncated: boolean };
  onKill: () => void;
  onStartNew: () => void;
}) {
  const meta = STATUS_META[run.status];
  const Icon = meta.icon;
  const logRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const el = logRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [log.text]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-background/60 px-4 py-3">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
            meta.tone,
          )}
        >
          <Icon className={cn("h-3.5 w-3.5", run.status === "running" && "animate-spin")} />
          {meta.label}
        </span>
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">{run.id}</code>
        <span className="text-[11px] text-muted-foreground">
          elapsed {formatElapsed(run.started_at, run.ended_at)}
        </span>
        {run.exit_code !== undefined && (
          <span className="text-[11px] text-muted-foreground">exit {run.exit_code}</span>
        )}
        <div className="ml-auto flex items-center gap-2">
          {run.status === "running" && (
            <Button size="sm" variant="outline" onClick={onKill} className="gap-1.5">
              <Square className="h-3 w-3" /> Kill
            </Button>
          )}
          {run.status !== "running" && (
            <Button size="sm" variant="outline" onClick={onStartNew}>New run</Button>
          )}
        </div>
      </div>

      <div className="border-b border-border px-4 py-2 text-[11px] text-muted-foreground">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="font-mono">diagnosis: {run.options.diagnosis_provider}</Badge>
          <Badge variant="outline" className="font-mono">validator: {run.options.validator_provider}</Badge>
          <Badge variant="outline" className="font-mono">evaluator: {run.options.evaluator_provider}</Badge>
          {run.options.judge_panel && <Badge variant="outline">panel</Badge>}
          {run.options.blind_pairwise && <Badge variant="outline">blind-pairwise</Badge>}
          {run.options.pairwise && <Badge variant="outline">pairwise</Badge>}
          {run.options.use_diagnosis_strategies && <Badge variant="outline">diagnosis-strategies</Badge>}
          {run.options.synthesize_top_k > 0 && <Badge variant="outline">top-{run.options.synthesize_top_k}</Badge>}
        </div>
        <div className="mt-1 truncate font-mono text-[11px]">
          {run.command.join(" ")}
        </div>
      </div>

      <pre
        ref={logRef}
        className="flex-1 overflow-auto scrollbar-thin bg-zinc-950 p-4 text-[12px] leading-snug text-zinc-100 font-mono whitespace-pre-wrap"
      >
{log.truncated ? "… [log truncated to last 64KB] …\n" : ""}{log.text || (run.status === "running" ? "waiting for first output…" : "(no log)")}
      </pre>

      {run.error && (
        <div className="border-t border-destructive/30 bg-destructive/10 px-4 py-2 text-xs text-destructive">
          {run.error}
        </div>
      )}
    </div>
  );
}
