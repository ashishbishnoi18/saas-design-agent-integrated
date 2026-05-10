"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, Circle, Loader2, MinusCircle, Sparkles, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Stage, StageStatus } from "@/lib/stages";

const STATUS_META: Record<StageStatus, { icon: typeof Circle; tone: string; spin?: boolean }> = {
  pending: { icon: Circle, tone: "text-muted-foreground" },
  running: { icon: Loader2, tone: "text-amber-600", spin: true },
  completed: { icon: CheckCircle2, tone: "text-emerald-600" },
  failed: { icon: XCircle, tone: "text-rose-600" },
  skipped: { icon: MinusCircle, tone: "text-muted-foreground/60" },
};

export function StageTracker({
  stages,
  recent,
}: {
  stages: Stage[];
  recent: string[];
}) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-4 py-2">
        <Sparkles className="h-3.5 w-3.5 text-primary" />
        <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Pipeline progress</span>
        <span className="ml-auto text-[10px] text-muted-foreground">
          {countByStatus(stages, "completed")} done
          {" · "}
          {countByStatus(stages, "running")} running
          {" · "}
          {countByStatus(stages, "failed") > 0 && <span className="text-rose-700">{countByStatus(stages, "failed")} failed · </span>}
          {countByStatus(stages, "pending")} pending
        </span>
      </div>

      <div className="flex flex-1 min-h-0 divide-x divide-border">
        <ol className="flex-1 overflow-y-auto scrollbar-thin">
          {stages.map((stage, idx) => (
            <StageRow key={stage.id} stage={stage} isLast={idx === stages.length - 1} />
          ))}
        </ol>
        {recent.length > 0 && (
          <div className="hidden w-[260px] shrink-0 overflow-y-auto scrollbar-thin bg-muted/20 px-3 py-3 lg:block">
            <div className="text-[10px] font-mono uppercase tracking-wide text-muted-foreground">recent activity</div>
            <ul className="mt-2 space-y-1.5">
              {recent.slice().reverse().map((line, i) => (
                <li key={i} className="font-mono text-[11px] leading-snug text-foreground/80">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function countByStatus(stages: Stage[], status: StageStatus): number {
  return stages.filter((s) => s.status === status).length;
}

function StageRow({ stage, isLast }: { stage: Stage; isLast: boolean }) {
  const meta = STATUS_META[stage.status];
  const Icon = meta.icon;
  const [open, setOpen] = useState(stage.status === "running" || stage.status === "failed");
  const expandable = (stage.items && stage.items.length > 0) || !!stage.detail;

  return (
    <li className={cn("relative px-4 py-2.5", !isLast && "border-b border-border/60")}>
      <div className="flex items-start gap-2.5">
        <Icon className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", meta.tone, meta.spin && "animate-spin")} />
        <div className="min-w-0 flex-1">
          <button
            type="button"
            disabled={!expandable}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "flex w-full items-center gap-1.5 text-left",
              expandable && "cursor-pointer",
            )}
          >
            <span className={cn("text-[12.5px] font-medium", stage.status === "skipped" && "text-muted-foreground")}>
              {stage.label}
            </span>
            {stage.progress && (
              <ProgressPill done={stage.progress.done} total={stage.progress.total} failed={stage.progress.failed} />
            )}
            {stage.detail && (
              <span className="ml-1 truncate text-[11px] text-muted-foreground">· {stage.detail}</span>
            )}
            {expandable && (
              <ChevronDown className={cn("ml-auto h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")} />
            )}
          </button>

          {open && stage.items && stage.items.length > 0 && (
            <ul className="mt-1.5 space-y-0.5 pl-1">
              {stage.items.map((item) => {
                const im = STATUS_META[item.status];
                const ItemIcon = im.icon;
                return (
                  <li key={item.name} className="flex items-start gap-1.5 text-[11px]">
                    <ItemIcon className={cn("mt-0.5 h-2.5 w-2.5 shrink-0", im.tone, im.spin && "animate-spin")} />
                    <span className="font-mono text-foreground/80">{item.name}</span>
                    {item.note && <span className="truncate text-muted-foreground">— {item.note}</span>}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </li>
  );
}

function ProgressPill({ done, total, failed }: { done: number; total: number; failed: number }) {
  const pct = total > 0 ? Math.min(100, Math.round((done / total) * 100)) : 0;
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-1.5 py-0 font-mono text-[10px] tabular-nums text-muted-foreground">
      <span className="relative inline-block h-1 w-10 overflow-hidden rounded-full bg-border">
        <span className="absolute left-0 top-0 h-full bg-emerald-500" style={{ width: `${pct}%` }} />
        {failed > 0 && (
          <span
            className="absolute top-0 h-full bg-rose-500"
            style={{ left: `${pct}%`, width: `${Math.min(100 - pct, (failed / total) * 100)}%` }}
          />
        )}
      </span>
      <span>{done}/{total}{failed > 0 ? ` (${failed} failed)` : ""}</span>
    </span>
  );
}
