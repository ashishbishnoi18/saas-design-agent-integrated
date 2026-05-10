"use client";

import { useMemo, useState } from "react";
import { Award, Inbox, RefreshCw, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CandidateCard } from "./candidate-card";
import { CandidateDetail } from "./candidate-detail";
import type { ArtifactsSummary, RankingEntry } from "@/lib/types";

export function ResultsView({
  runId,
  summary,
  refreshing,
  onRefresh,
}: {
  runId: string;
  summary: ArtifactsSummary | null;
  refreshing: boolean;
  onRefresh: () => void;
}) {
  const [openStrategy, setOpenStrategy] = useState<string | null>(null);

  const rankingByStrategy = useMemo(() => {
    const m = new Map<string, RankingEntry>();
    for (const e of summary?.ranking?.entries ?? []) m.set(e.strategy, e);
    return m;
  }, [summary]);

  const orderedCandidates = useMemo(() => {
    if (!summary) return [];
    const ranked = summary.ranking?.entries.map((e) => e.strategy) ?? [];
    const set = new Set(ranked);
    const tail = summary.candidates.filter((c) => !set.has(c.strategy)).map((c) => c.strategy);
    const order = [...ranked, ...tail];
    return order
      .map((s) => summary.candidates.find((c) => c.strategy === s))
      .filter((x): x is NonNullable<typeof x> => Boolean(x));
  }, [summary]);

  const winner = summary?.ranking?.winner;
  const openCandidate = openStrategy ? summary?.candidates.find((c) => c.strategy === openStrategy) : undefined;
  const openRanking = openStrategy ? rankingByStrategy.get(openStrategy) : undefined;

  if (!summary) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        <Inbox className="mr-2 h-4 w-4" /> no artifacts yet
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-auto scrollbar-thin">
      <div className="border-b border-border bg-background/60 px-6 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Pipeline results</div>
            {winner ? (
              <div className="mt-1 flex items-center gap-2 text-base font-semibold">
                <Trophy className="h-4 w-4 text-amber-500" />
                <code className="font-mono">{winner}</code>
                <Badge variant="outline">winner</Badge>
              </div>
            ) : (
              <div className="mt-1 text-sm text-muted-foreground">No final winner determined.</div>
            )}
            {summary.ranking?.why_won && (
              <div className="mt-1 max-w-3xl text-[12px] text-muted-foreground">
                {summary.ranking.why_won}
              </div>
            )}
          </div>
          <Button size="sm" variant="outline" onClick={onRefresh} disabled={refreshing} className="gap-1.5">
            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} /> Refresh
          </Button>
        </div>

        {summary.ranking?.runner_up_note && (
          <div className="mt-2 max-w-3xl text-[12px] text-muted-foreground">
            <Award className="mr-1 inline h-3.5 w-3.5" /> {summary.ranking.runner_up_note}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 xl:grid-cols-3">
        {orderedCandidates.length === 0 ? (
          <div className="col-span-full text-sm text-muted-foreground">
            No candidates produced yet. Refresh after the pipeline finishes the architect stage.
          </div>
        ) : orderedCandidates.map((c) => (
          <CandidateCard
            key={c.strategy}
            candidate={c}
            ranking={rankingByStrategy.get(c.strategy)}
            runId={runId}
            isWinner={winner === c.strategy}
            onOpen={() => setOpenStrategy(c.strategy)}
          />
        ))}
      </div>

      {summary.tournament?.points && Object.keys(summary.tournament.points).length > 0 && (
        <div className="px-6 pb-6">
          <Card>
            <CardHeader>
              <CardTitle>Tournament points</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="py-1 pr-3">strategy</th>
                    <th className="py-1 pr-3 text-right">spec-aware</th>
                    <th className="py-1 pr-3 text-right">blind</th>
                    <th className="py-1 pr-3 text-right">panel avg</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(summary.tournament.points)
                    .sort((a, b) => b[1] - a[1])
                    .map(([strat, pts]) => {
                      const blind = summary.blind_tournament?.points?.[strat];
                      const panel = summary.panel?.candidates?.[strat]?.panel_average;
                      return (
                        <tr key={strat} className="border-b border-border last:border-b-0">
                          <td className="py-1 pr-3 font-mono">{strat}</td>
                          <td className="py-1 pr-3 text-right tabular-nums">{pts.toFixed(1)}</td>
                          <td className="py-1 pr-3 text-right tabular-nums text-muted-foreground">{typeof blind === "number" ? blind.toFixed(1) : "—"}</td>
                          <td className="py-1 pr-3 text-right tabular-nums text-muted-foreground">{typeof panel === "number" ? panel.toFixed(1) : "—"}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      )}

      {openCandidate && (
        <CandidateDetail
          candidate={openCandidate}
          ranking={openRanking}
          runId={runId}
          onClose={() => setOpenStrategy(null)}
        />
      )}
    </div>
  );
}
