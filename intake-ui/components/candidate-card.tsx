"use client";

import { ChevronRight, ImageOff, ShieldAlert, ShieldCheck, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { CandidateArtifacts, RankingEntry } from "@/lib/types";

export function CandidateCard({
  candidate,
  ranking,
  runId,
  isWinner,
  onOpen,
}: {
  candidate: CandidateArtifacts;
  ranking?: RankingEntry;
  runId: string;
  isWinner: boolean;
  onOpen: () => void;
}) {
  const heroShot = candidate.shots.find((s) => s.viewport === "desktop" && s.kind === "viewport") ?? candidate.shots[0];
  const heroSrc = heroShot ? `/api/runs/${runId}/file?path=${encodeURIComponent(heroShot.path)}` : null;

  const eligible = ranking?.eligible !== false && ranking?.programmatic_gate !== "fail";

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card text-left shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        {heroSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={heroSrc}
            alt={`${candidate.strategy} desktop`}
            className="h-full w-full object-cover object-top transition-transform group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <ImageOff className="h-6 w-6" />
          </div>
        )}
        {ranking && (
          <div className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-background/90 px-2 py-0.5 text-[11px] font-medium shadow">
            #{ranking.rank}
          </div>
        )}
        {isWinner && (
          <div className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-900 shadow">
            <Trophy className="h-3 w-3" /> winner
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="font-mono text-[13px] font-medium leading-tight">{candidate.strategy}</div>
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
        </div>

        {ranking && (
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="default" className="font-mono">total {ranking.total?.toFixed(2) ?? "—"}</Badge>
            {typeof ranking.panel_avg === "number" && (
              <Badge variant="outline" className="font-mono">panel {ranking.panel_avg.toFixed(1)}</Badge>
            )}
            {typeof ranking.pairwise_points === "number" && (
              <Badge variant="outline" className="font-mono">pw {ranking.pairwise_points.toFixed(1)}</Badge>
            )}
            {typeof ranking.blind_points === "number" && (
              <Badge variant="outline" className="font-mono">blind {ranking.blind_points.toFixed(1)}</Badge>
            )}
            <Badge
              className={cn("font-mono inline-flex items-center gap-1", eligible ? "bg-emerald-100 text-emerald-900 border-emerald-200" : "bg-rose-100 text-rose-900 border-rose-200")}
            >
              {eligible ? <ShieldCheck className="h-3 w-3" /> : <ShieldAlert className="h-3 w-3" />}
              gate {ranking.programmatic_gate ?? "—"}
            </Badge>
          </div>
        )}

        {ranking?.gate_reason && (
          <div className="line-clamp-2 text-[11px] text-muted-foreground">
            {ranking.gate_reason}
          </div>
        )}
      </div>
    </button>
  );
}
