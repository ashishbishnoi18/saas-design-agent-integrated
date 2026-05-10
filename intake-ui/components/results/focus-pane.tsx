"use client";

import { useState } from "react";
import { ExternalLink, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ViewportSwitcher, type Viewport } from "./viewport-switcher";
import { WireframeFrame } from "./wireframe-frame";
import { AnalysisStack } from "./analysis-stack";
import type { ArtifactsSummary, CandidateArtifacts, RankingEntry } from "@/lib/types";

export function FocusPane({
  candidate,
  ranking,
  summary,
  runId,
  isWinner,
}: {
  candidate?: CandidateArtifacts;
  ranking?: RankingEntry;
  summary: ArtifactsSummary;
  runId: string;
  isWinner: boolean;
}) {
  const [viewport, setViewport] = useState<Viewport>("desktop");

  if (!candidate) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-sm text-muted-foreground">
        Select a candidate from the leaderboard to view its live wireframe and full analysis.
      </div>
    );
  }

  const wireframeUrl = candidate.wireframe_path
    ? `/api/runs/${encodeURIComponent(runId)}/file?path=${encodeURIComponent(candidate.wireframe_path)}`
    : undefined;

  return (
    <div className="flex h-full flex-col">
      <header className="flex flex-wrap items-center gap-3 border-b border-border bg-background/80 px-6 py-3 backdrop-blur">
        <div className="flex items-baseline gap-2">
          {ranking?.rank !== undefined && (
            <span className="text-[11px] font-mono uppercase tracking-wide text-muted-foreground">#{ranking.rank}</span>
          )}
          <h2 className="font-mono text-sm font-semibold leading-tight">{candidate.strategy}</h2>
          {isWinner && (
            <Badge variant="warn" className="gap-1">
              <Trophy className="h-3 w-3" /> winner
            </Badge>
          )}
          {ranking?.gate && ranking.gate !== "RANKED" && (
            <Badge variant="outline" className={cn("font-mono uppercase", ranking.gate === "BLOCKED" && "border-rose-300 bg-rose-50 text-rose-900")}>{ranking.gate.toLowerCase()}</Badge>
          )}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ViewportSwitcher value={viewport} onChange={setViewport} />
          {wireframeUrl && (
            <a
              href={wireframeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-[11px] text-muted-foreground hover:text-foreground"
            >
              open <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </header>

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="h-[60vh] min-h-[420px] shrink-0 border-b border-border">
          <WireframeFrame src={wireframeUrl} viewport={viewport} />
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <AnalysisStack candidate={candidate} ranking={ranking} summary={summary} runId={runId} />
        </div>
      </div>
    </div>
  );
}
