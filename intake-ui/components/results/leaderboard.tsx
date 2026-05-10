"use client";

import { CheckCircle2, ChevronRight, ShieldAlert, ShieldCheck, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CandidateArtifacts, RankingEntry } from "@/lib/types";

export interface LeaderboardRow {
  candidate: CandidateArtifacts;
  ranking?: RankingEntry;
}

export function Leaderboard({
  rows,
  focusedStrategy,
  selectedStrategies,
  onFocus,
  onToggleSelect,
  winner,
}: {
  rows: LeaderboardRow[];
  focusedStrategy?: string;
  selectedStrategies: string[];
  onFocus: (strategy: string) => void;
  onToggleSelect: (strategy: string) => void;
  winner?: string;
}) {
  if (rows.length === 0) {
    return (
      <div className="p-4 text-xs text-muted-foreground">
        No candidates yet. Cards will appear here as the pipeline finishes the architect stage.
      </div>
    );
  }

  return (
    <ul className="divide-y divide-border">
      {rows.map((row) => {
        const r = row.ranking;
        const strategy = row.candidate.strategy;
        const isFocused = strategy === focusedStrategy;
        const isSelected = selectedStrategies.includes(strategy);
        const isWinner = winner === strategy;
        const eligible = r?.eligible !== false && r?.programmatic_gate !== "fail";
        return (
          <li
            key={strategy}
            className={cn(
              "group relative cursor-pointer transition-colors",
              isFocused ? "bg-accent/70" : "hover:bg-accent/40",
            )}
            onClick={() => onFocus(strategy)}
          >
            <div className="flex items-start gap-3 px-3 py-3">
              <label
                className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggleSelect(strategy)}
                  className="h-3.5 w-3.5 cursor-pointer accent-primary"
                  aria-label={`Select ${strategy} for compare`}
                />
              </label>

              <div className="flex w-7 shrink-0 flex-col items-center pt-0.5">
                <span className="text-[11px] font-mono text-muted-foreground">#{r?.rank ?? "—"}</span>
                {isWinner && <Trophy className="mt-1 h-3 w-3 text-amber-500" />}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate font-mono text-[12px] font-medium leading-tight">{strategy}</span>
                  <ChevronRight className={cn("ml-auto h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform", isFocused && "rotate-90 text-foreground")} />
                </div>

                <div className="mt-1.5 flex flex-wrap gap-x-2 gap-y-0.5 text-[11px] tabular-nums text-muted-foreground">
                  <Score label="total" value={r?.total} bold />
                  {typeof r?.panel_avg === "number" && <Score label="panel" value={r.panel_avg} />}
                  {typeof r?.pairwise_points === "number" && <Score label="pw" value={r.pairwise_points} />}
                  {typeof r?.blind_points === "number" && <Score label="blind" value={r.blind_points} />}
                </div>

                <div className="mt-1 flex flex-wrap gap-1">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wide",
                      eligible ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900",
                    )}
                  >
                    {eligible ? <ShieldCheck className="h-2.5 w-2.5" /> : <ShieldAlert className="h-2.5 w-2.5" />}
                    {r?.programmatic_gate ?? "no gate"}
                  </span>
                  {r?.gate === "BLOCKED" && (
                    <span className="rounded bg-rose-50 px-1.5 py-0.5 text-[10px] font-mono uppercase text-rose-900">blocked</span>
                  )}
                  {row.candidate.wireframe_path && (
                    <span className="inline-flex items-center gap-0.5 rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                      <CheckCircle2 className="h-2.5 w-2.5" /> live html
                    </span>
                  )}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function Score({ label, value, bold = false }: { label: string; value?: number; bold?: boolean }) {
  if (value === undefined || value === null || Number.isNaN(value)) return null;
  return (
    <span className="inline-flex items-baseline gap-0.5">
      <span className="text-[10px] uppercase">{label}</span>
      <span className={cn("text-[12px]", bold ? "font-semibold text-foreground" : "")}>{value.toFixed(2)}</span>
    </span>
  );
}
