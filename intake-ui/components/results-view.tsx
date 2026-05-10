"use client";

import { useEffect, useMemo, useState } from "react";
import { Inbox, RefreshCw, Scale, Trophy, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Leaderboard, type LeaderboardRow } from "./results/leaderboard";
import { FocusPane } from "./results/focus-pane";
import type { ArtifactsSummary, RankingEntry } from "@/lib/types";

const MAX_COMPARE = 2;

export function ResultsView({
  runId,
  summary,
  refreshing,
  onRefresh,
  initialFocus,
  onFocusChange,
  onCompare,
}: {
  runId: string;
  summary: ArtifactsSummary | null;
  refreshing: boolean;
  onRefresh: () => void;
  initialFocus?: string;
  onFocusChange?: (strategy: string | undefined) => void;
  onCompare?: (a: string, b: string) => void;
}) {
  const [focused, setFocused] = useState<string | undefined>(initialFocus);
  const [selected, setSelected] = useState<string[]>([]);

  const rankingByStrategy = useMemo(() => {
    const m = new Map<string, RankingEntry>();
    for (const e of summary?.ranking?.entries ?? []) m.set(e.strategy, e);
    return m;
  }, [summary]);

  const orderedRows: LeaderboardRow[] = useMemo(() => {
    if (!summary) return [];
    const ranked = summary.ranking?.entries.map((e) => e.strategy) ?? [];
    const set = new Set(ranked);
    const tail = summary.candidates.filter((c) => !set.has(c.strategy)).map((c) => c.strategy);
    const order = [...ranked, ...tail];
    const rows: LeaderboardRow[] = [];
    for (const strategy of order) {
      const candidate = summary.candidates.find((c) => c.strategy === strategy);
      if (candidate) rows.push({ candidate, ranking: rankingByStrategy.get(strategy) });
    }
    return rows;
  }, [summary, rankingByStrategy]);

  // Default focus to the top candidate if none set yet (and no initialFocus prop change pending).
  useEffect(() => {
    if (!focused && orderedRows.length > 0) {
      const next = orderedRows[0].candidate.strategy;
      setFocused(next);
      onFocusChange?.(next);
    }
  }, [focused, orderedRows, onFocusChange]);

  // Sync external initialFocus changes (e.g., from URL).
  useEffect(() => {
    if (initialFocus && initialFocus !== focused) setFocused(initialFocus);
  }, [initialFocus, focused]);

  if (!summary) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        <Inbox className="mr-2 h-4 w-4" /> no artifacts yet
      </div>
    );
  }

  const winner = summary.ranking?.winner;
  const focusedRow = orderedRows.find((r) => r.candidate.strategy === focused);

  const setFocus = (strategy: string) => {
    setFocused(strategy);
    onFocusChange?.(strategy);
  };

  const toggleSelect = (strategy: string) => {
    setSelected((cur) => {
      if (cur.includes(strategy)) return cur.filter((s) => s !== strategy);
      if (cur.length >= MAX_COMPARE) return [cur[1], strategy];
      return [...cur, strategy];
    });
  };

  const startCompare = () => {
    if (selected.length === 2 && onCompare) onCompare(selected[0], selected[1]);
  };

  return (
    <div className="relative flex h-full overflow-hidden">
      <aside className="flex w-[340px] shrink-0 flex-col border-r border-border bg-muted/30">
        <div className="flex items-center justify-between border-b border-border bg-background/60 px-3 py-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Leaderboard</span>
            <span className="text-[10px] text-muted-foreground">{orderedRows.length} candidates</span>
          </div>
          <Button size="icon" variant="ghost" onClick={onRefresh} disabled={refreshing} title="Refresh artifacts">
            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>

        {winner && (
          <div className="border-b border-border bg-amber-50/60 px-3 py-2">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-amber-900">
              <Trophy className="h-3 w-3" /> winner
            </div>
            <div className="mt-0.5 truncate font-mono text-[12px] text-amber-900">{winner}</div>
            {summary.ranking?.why_won && (
              <div className="mt-1 line-clamp-3 text-[11px] leading-snug text-amber-800/80">{summary.ranking.why_won}</div>
            )}
          </div>
        )}

        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <Leaderboard
            rows={orderedRows}
            focusedStrategy={focused}
            selectedStrategies={selected}
            onFocus={setFocus}
            onToggleSelect={toggleSelect}
            winner={winner}
          />
        </div>
      </aside>

      <main className="flex-1 overflow-hidden bg-background">
        <FocusPane
          candidate={focusedRow?.candidate}
          ranking={focusedRow?.ranking}
          summary={summary}
          runId={runId}
          isWinner={!!focused && focused === winner}
          onSelectStrategy={setFocus}
        />
      </main>

      {selected.length > 0 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
          <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-border bg-background/95 px-3 py-2 shadow-lg backdrop-blur">
            <Scale className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs">
              {selected.length === 1
                ? <>Selected <code className="font-mono">{selected[0]}</code> — pick one more to compare.</>
                : <>Compare <code className="font-mono">{selected[0]}</code> vs <code className="font-mono">{selected[1]}</code></>}
            </span>
            <Button size="sm" disabled={selected.length !== 2} onClick={startCompare} className="gap-1.5">
              Compare
            </Button>
            <button
              type="button"
              onClick={() => setSelected([])}
              className="inline-flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground hover:bg-accent"
              title="Clear selection"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
