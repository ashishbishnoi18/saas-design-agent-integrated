"use client";

import { ChevronDown, Eye, Gavel, Scale, Trophy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ArtifactsSummary, BlindPairwiseRecord, PairwiseRecord, RankingEntry } from "@/lib/types";
import { findPair } from "@/lib/pairwise";

export function PairwiseRail({
  a,
  b,
  summary,
}: {
  a: string;
  b: string;
  summary: ArtifactsSummary;
}) {
  const rankA = summary.ranking?.entries.find((e) => e.strategy === a);
  const rankB = summary.ranking?.entries.find((e) => e.strategy === b);

  const pwHit = findPair(summary.pairwise_records, a, b);
  const blindHit = findPair(summary.blind_pairwise_records, a, b);
  const pw = pwHit?.oriented as PairwiseRecord | undefined;
  const blind = blindHit?.oriented as BlindPairwiseRecord | undefined;

  return (
    <aside className="flex w-[420px] shrink-0 flex-col border-l border-border bg-background">
      <header className="border-b border-border bg-muted/30 px-4 py-3">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          <Scale className="h-3 w-3" /> head-to-head
        </div>
        <div className="mt-1 grid grid-cols-2 gap-3">
          <SideHeader label="A" strategy={a} ranking={rankA} />
          <SideHeader label="B" strategy={b} ranking={rankB} />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <ScoreDeltas rankA={rankA} rankB={rankB} summary={summary} a={a} b={b} />

        {pw ? <PairwiseSection pw={pw} a={a} b={b} /> : (
          <NoVerdict label="Spec-aware pairwise" reason="The pipeline did not run a spec-aware judgment for this exact pair." />
        )}

        {blind ? <BlindSection bp={blind} a={a} b={b} /> : (
          <NoVerdict label="Blind screenshot pairwise" reason="The pipeline did not run a blind judgment for this exact pair." />
        )}
      </div>
    </aside>
  );
}

function SideHeader({ label, strategy, ranking }: { label: "A" | "B"; strategy: string; ranking?: RankingEntry }) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wide text-muted-foreground">
        <span className="rounded bg-muted px-1">{label}</span>
        {ranking && <span>#{ranking.rank}</span>}
      </div>
      <div className="mt-0.5 truncate font-mono text-[12px] font-medium">{strategy}</div>
    </div>
  );
}

function ScoreDeltas({
  rankA,
  rankB,
  summary,
  a,
  b,
}: {
  rankA?: RankingEntry;
  rankB?: RankingEntry;
  summary: ArtifactsSummary;
  a: string;
  b: string;
}) {
  const panelA = summary.panel?.candidates?.[a]?.panel_average;
  const panelB = summary.panel?.candidates?.[b]?.panel_average;

  const rows: Array<{ label: string; va?: number; vb?: number }> = [
    { label: "total", va: rankA?.total, vb: rankB?.total },
    { label: "panel avg", va: panelA, vb: panelB },
    { label: "pairwise", va: rankA?.pairwise_points, vb: rankB?.pairwise_points },
    { label: "blind", va: rankA?.blind_points, vb: rankB?.blind_points },
    { label: "programmatic", va: rankA?.programmatic_score, vb: rankB?.programmatic_score },
  ];

  return (
    <div className="border-b border-border px-4 py-3">
      <div className="text-[10px] font-mono uppercase tracking-wide text-muted-foreground">scores</div>
      <table className="mt-1.5 w-full text-[12px] tabular-nums">
        <thead>
          <tr className="text-muted-foreground">
            <th className="text-left font-normal">metric</th>
            <th className="text-right font-normal">A</th>
            <th className="text-right font-normal">B</th>
            <th className="text-right font-normal">Δ</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const a = r.va, b = r.vb;
            const has = typeof a === "number" && typeof b === "number";
            const delta = has ? a! - b! : undefined;
            return (
              <tr key={r.label} className="border-t border-border/60">
                <td className="py-1 text-muted-foreground">{r.label}</td>
                <td className={cn("py-1 text-right", has && a! > b! && "font-medium text-foreground")}>{typeof a === "number" ? a.toFixed(2) : "—"}</td>
                <td className={cn("py-1 text-right", has && b! > a! && "font-medium text-foreground")}>{typeof b === "number" ? b.toFixed(2) : "—"}</td>
                <td className={cn("py-1 text-right", delta !== undefined && delta > 0 ? "text-emerald-700" : delta !== undefined && delta < 0 ? "text-rose-700" : "text-muted-foreground")}>
                  {delta === undefined ? "—" : (delta > 0 ? "+" : "") + delta.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function PairwiseSection({ pw, a, b }: { pw: PairwiseRecord; a: string; b: string }) {
  const winnerLabel = pw.winner === "A" ? a : pw.winner === "B" ? b : "tie";
  const winnerSide = pw.winner === "A" ? "A" : pw.winner === "B" ? "B" : null;
  return (
    <section className="border-b border-border px-4 py-3">
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        <Gavel className="h-3 w-3" /> spec-aware verdict
      </div>
      <div className="mt-1.5 flex items-center gap-2">
        <Trophy className="h-3.5 w-3.5 text-amber-500" />
        <span className="text-[12px]">winner: <span className="font-mono font-medium">{winnerLabel}</span></span>
        {winnerSide && <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-mono uppercase text-emerald-900">{winnerSide}</span>}
        {typeof pw.confidence === "number" && (
          <span className="text-[11px] tabular-nums text-muted-foreground">conf {pw.confidence.toFixed(2)}</span>
        )}
        {pw.synthesis_recommended && (
          <span className="ml-auto rounded bg-violet-100 px-1.5 py-0.5 text-[10px] font-mono uppercase text-violet-900">synth recommended</span>
        )}
      </div>

      {pw.scores && Object.keys(pw.scores).length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {Object.entries(pw.scores).map(([dim, who]) => {
            const tone = who === "A" ? "bg-emerald-100 text-emerald-900" : who === "B" ? "bg-sky-100 text-sky-900" : "bg-muted text-muted-foreground";
            return (
              <span key={dim} className={cn("rounded px-1.5 py-0.5 font-mono text-[10px]", tone)}>
                <span className="opacity-70">{dim}</span>: <span className="font-medium">{who}</span>
              </span>
            );
          })}
        </div>
      )}

      {pw.reasoning && (
        <div className="mt-3 rounded border border-border bg-muted/30 p-3 text-[12px] leading-relaxed">{pw.reasoning}</div>
      )}

      <Collapsible label="Best reusable moves">
        {pw.best_reusable_move_a && (
          <div className="mt-1.5 text-[12px]">
            <span className="rounded bg-emerald-100 px-1 py-0.5 font-mono text-[10px] text-emerald-900">A</span> {pw.best_reusable_move_a}
          </div>
        )}
        {pw.best_reusable_move_b && (
          <div className="mt-1.5 text-[12px]">
            <span className="rounded bg-sky-100 px-1 py-0.5 font-mono text-[10px] text-sky-900">B</span> {pw.best_reusable_move_b}
          </div>
        )}
      </Collapsible>
    </section>
  );
}

function BlindSection({ bp, a, b }: { bp: BlindPairwiseRecord; a: string; b: string }) {
  const winnerLabel = bp.winner === "A" ? a : bp.winner === "B" ? b : "tie";
  const winnerSide = bp.winner === "A" ? "A" : bp.winner === "B" ? "B" : null;

  return (
    <section className="px-4 py-3">
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        <Eye className="h-3 w-3" /> blind screenshot verdict
      </div>
      <div className="mt-1.5 flex items-center gap-2">
        <Trophy className="h-3.5 w-3.5 text-amber-500" />
        <span className="text-[12px]">winner: <span className="font-mono font-medium">{winnerLabel}</span></span>
        {winnerSide && <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-mono uppercase text-emerald-900">{winnerSide}</span>}
        {typeof bp.confidence === "number" && (
          <span className="text-[11px] tabular-nums text-muted-foreground">conf {bp.confidence.toFixed(2)}</span>
        )}
      </div>

      {bp.perception && Object.keys(bp.perception).length > 0 && (
        <div className="mt-3 grid grid-cols-1 gap-1.5">
          {Object.entries(bp.perception).map(([k, v]) => (
            <div key={k} className="rounded bg-muted/40 p-2 text-[11px]">
              <div className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">{k.replace(/_/g, " ")}</div>
              <div className="mt-0.5 leading-snug">{v}</div>
            </div>
          ))}
        </div>
      )}

      {bp.reasoning && (
        <div className="mt-3 rounded border border-border bg-muted/30 p-3 text-[12px] leading-relaxed">{bp.reasoning}</div>
      )}

      {(bp.blocking_visual_issue_a || bp.blocking_visual_issue_b) && (
        <div className="mt-3 space-y-1.5">
          {bp.blocking_visual_issue_a && (
            <div className="rounded border border-rose-200 bg-rose-50 p-2 text-[12px] text-rose-900">
              <span className="rounded bg-rose-200 px-1 py-0.5 font-mono text-[10px]">A blocker</span> {bp.blocking_visual_issue_a}
            </div>
          )}
          {bp.blocking_visual_issue_b && (
            <div className="rounded border border-rose-200 bg-rose-50 p-2 text-[12px] text-rose-900">
              <span className="rounded bg-rose-200 px-1 py-0.5 font-mono text-[10px]">B blocker</span> {bp.blocking_visual_issue_b}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function NoVerdict({ label, reason }: { label: string; reason: string }) {
  return (
    <section className="border-b border-border px-4 py-3 last:border-b-0">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{reason}</div>
    </section>
  );
}

function Collapsible({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3 rounded border border-border">
      <button type="button" onClick={() => setOpen((v) => !v)} className="flex w-full items-center gap-2 px-2.5 py-1.5 text-left">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
        <ChevronDown className={cn("ml-auto h-3.5 w-3.5 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>
      {open && <div className="border-t border-border px-2.5 py-2">{children}</div>}
    </div>
  );
}
