"use client";

import { useEffect, useState } from "react";
import { ChevronDown, FileText, Gavel, Loader2, Notebook, ScrollText, ShieldAlert, ShieldCheck, Swords } from "lucide-react";
import { cn } from "@/lib/utils";
import { Markdown } from "@/components/markdown";
import type {
  ArtifactsSummary,
  BlindPairwiseRecord,
  CandidateArtifacts,
  PairwiseRecord,
  RankingEntry,
} from "@/lib/types";

function fileUrl(runId: string, p?: string) {
  if (!p) return undefined;
  return `/api/runs/${encodeURIComponent(runId)}/file?path=${encodeURIComponent(p)}`;
}

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetch ${url} -> ${res.status}`);
  return res.text();
}

export function AnalysisStack({
  candidate,
  ranking,
  summary,
  runId,
}: {
  candidate: CandidateArtifacts;
  ranking?: RankingEntry;
  summary: ArtifactsSummary;
  runId: string;
}) {
  const eligible = ranking?.eligible !== false && ranking?.programmatic_gate !== "fail";
  const panelData = summary.panel?.candidates?.[candidate.strategy];

  const pairwiseFor = (summary.pairwise_records ?? []).filter(
    (r) => r.candidate_a === candidate.strategy || r.candidate_b === candidate.strategy,
  );
  const blindFor = (summary.blind_pairwise_records ?? []).filter(
    (r) => r.candidate_a === candidate.strategy || r.candidate_b === candidate.strategy,
  );

  return (
    <div className="space-y-4 px-6 py-5">
      <ScoreCard ranking={ranking} eligible={eligible} panelData={panelData} />

      <Section icon={Gavel} title="Evaluator verdict" defaultOpen>
        <RemoteText runId={runId} path={candidate.verdict_path} empty="No verdict file." render="md" dense />
      </Section>

      <Section icon={ScrollText} title="UI spec" defaultOpen={false}>
        <RemoteText runId={runId} path={candidate.ui_spec_path} empty="No UI spec file." render="md" />
      </Section>

      {(pairwiseFor.length > 0 || blindFor.length > 0) && (
        <Section icon={Swords} title={`Pairwise verdicts for this candidate (${pairwiseFor.length} spec-aware · ${blindFor.length} blind)`} defaultOpen={false}>
          <PairwiseList strategy={candidate.strategy} pairwise={pairwiseFor} blind={blindFor} />
        </Section>
      )}

      <Section icon={Notebook} title="Strategic diagnosis (this brief)" defaultOpen={false}>
        <DiagnosisSummary diagnosis={summary.strategic_diagnosis} />
      </Section>
    </div>
  );
}

function ScoreCard({
  ranking,
  eligible,
  panelData,
}: {
  ranking?: RankingEntry;
  eligible: boolean;
  panelData?: { panel_average: number; panel_scores: Record<string, number>; hard_failures?: string[] };
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className="flex flex-wrap items-baseline gap-3">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[11px] uppercase tracking-wide text-muted-foreground">total</span>
          <span className="text-2xl font-semibold tabular-nums">{ranking?.total?.toFixed(2) ?? "—"}</span>
        </div>
        {typeof ranking?.panel_avg === "number" && <Stat label="panel avg" value={ranking.panel_avg.toFixed(1)} />}
        {typeof ranking?.pairwise_points === "number" && <Stat label="pairwise" value={ranking.pairwise_points.toFixed(1)} />}
        {typeof ranking?.blind_points === "number" && <Stat label="blind" value={ranking.blind_points.toFixed(1)} />}
        {typeof ranking?.programmatic_score === "number" && <Stat label="programmatic" value={ranking.programmatic_score.toFixed(1)} />}
        <span
          className={cn(
            "ml-auto inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-mono uppercase tracking-wide",
            eligible ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900",
          )}
        >
          {eligible ? <ShieldCheck className="h-3 w-3" /> : <ShieldAlert className="h-3 w-3" />}
          gate {ranking?.programmatic_gate ?? "—"}
        </span>
      </div>

      {panelData?.panel_scores && Object.keys(panelData.panel_scores).length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 md:grid-cols-5">
          {Object.entries(panelData.panel_scores).map(([judge, score]) => (
            <div key={judge} className="rounded border border-border bg-background p-2">
              <div className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">{judge}</div>
              <div className={cn("mt-0.5 text-sm font-semibold tabular-nums", score === 0 && "text-rose-700")}>{Number(score).toFixed(1)}</div>
            </div>
          ))}
        </div>
      )}

      {ranking?.gate_reason && (
        <div className="mt-3 rounded border border-amber-200 bg-amber-50 p-2 text-[11px] leading-relaxed text-amber-900">
          <div className="font-mono uppercase tracking-wide">gate reason</div>
          <div className="mt-0.5">{ranking.gate_reason}</div>
        </div>
      )}

      {panelData?.hard_failures && panelData.hard_failures.length > 0 && (
        <details className="mt-3 rounded border border-rose-200 bg-rose-50 p-2 text-[11px] text-rose-900">
          <summary className="cursor-pointer font-mono uppercase tracking-wide">{panelData.hard_failures.length} judge hard failure{panelData.hard_failures.length === 1 ? "" : "s"}</summary>
          <ul className="mt-2 space-y-2">
            {panelData.hard_failures.map((f, i) => (
              <li key={i} className="whitespace-pre-wrap break-all rounded bg-white/70 p-1.5 font-mono text-[10px] leading-snug">{f.length > 360 ? f.slice(0, 360) + "…" : f}</li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-1">
      <span className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</span>
      <span className="text-sm font-medium tabular-nums">{value}</span>
    </div>
  );
}

function Section({ icon: Icon, title, defaultOpen, children }: { icon: typeof FileText; title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="rounded-lg border border-border bg-card shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 px-4 py-2.5 text-left"
      >
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-[13px] font-semibold">{title}</span>
        <ChevronDown className={cn("ml-auto h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>
      {open && <div className="border-t border-border px-4 py-3">{children}</div>}
    </div>
  );
}

function RemoteText({
  runId,
  path,
  empty,
  render,
  dense = false,
}: {
  runId: string;
  path?: string;
  empty: string;
  render: "md" | "pre";
  dense?: boolean;
}) {
  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const url = fileUrl(runId, path);

  useEffect(() => {
    if (!url) return;
    setText(null);
    setLoading(true);
    fetchText(url).then(setText).catch(() => setText("(failed to load)")).finally(() => setLoading(false));
  }, [url]);

  if (!path) return <div className="text-xs text-muted-foreground">{empty}</div>;
  if (loading && text === null) {
    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Loader2 className="h-3 w-3 animate-spin" /> loading…
      </div>
    );
  }
  if (!text) return <div className="text-xs text-muted-foreground">(empty)</div>;
  if (render === "md") return <Markdown dense={dense}>{text}</Markdown>;
  return <pre className="whitespace-pre-wrap rounded border border-border bg-muted/40 p-3 font-mono text-[12px] leading-snug">{text}</pre>;
}

function PairwiseList({
  strategy,
  pairwise,
  blind,
}: {
  strategy: string;
  pairwise: PairwiseRecord[];
  blind: BlindPairwiseRecord[];
}) {
  const opponents = new Set<string>();
  for (const r of pairwise) opponents.add(r.candidate_a === strategy ? r.candidate_b : r.candidate_a);
  for (const r of blind) opponents.add(r.candidate_a === strategy ? r.candidate_b : r.candidate_a);
  const opponentList = Array.from(opponents).sort();

  if (opponentList.length === 0) return <div className="text-xs text-muted-foreground">No pairwise records.</div>;

  return (
    <div className="space-y-3">
      {opponentList.map((opp) => {
        const pw = pairwise.find((r) => (r.candidate_a === strategy && r.candidate_b === opp) || (r.candidate_a === opp && r.candidate_b === strategy));
        const bp = blind.find((r) => (r.candidate_a === strategy && r.candidate_b === opp) || (r.candidate_a === opp && r.candidate_b === strategy));
        const orient = (winner: string, recA: string) => {
          // winner is "A" or "B" of (recA, recB). We want it from `strategy`'s POV.
          if (winner === "tie") return "tie";
          if (recA === strategy) return winner === "A" ? "this won" : "this lost";
          return winner === "A" ? "this lost" : "this won";
        };
        return (
          <div key={opp} className="rounded border border-border bg-background p-3">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="font-mono text-[12px]">vs <span className="font-medium text-foreground">{opp}</span></span>
              {pw && (
                <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-mono uppercase",
                  orient(pw.winner, pw.candidate_a) === "this won" ? "bg-emerald-100 text-emerald-900" :
                  orient(pw.winner, pw.candidate_a) === "this lost" ? "bg-rose-100 text-rose-900" :
                  "bg-muted text-muted-foreground")}>
                  spec {orient(pw.winner, pw.candidate_a)}{typeof pw.confidence === "number" ? ` (${pw.confidence.toFixed(2)})` : ""}
                </span>
              )}
              {bp && (
                <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-mono uppercase",
                  orient(bp.winner, bp.candidate_a) === "this won" ? "bg-emerald-100 text-emerald-900" :
                  orient(bp.winner, bp.candidate_a) === "this lost" ? "bg-rose-100 text-rose-900" :
                  "bg-muted text-muted-foreground")}>
                  blind {orient(bp.winner, bp.candidate_a)}{typeof bp.confidence === "number" ? ` (${bp.confidence.toFixed(2)})` : ""}
                </span>
              )}
            </div>
            {pw?.reasoning && (
              <details className="mt-2">
                <summary className="cursor-pointer text-[11px] uppercase tracking-wide text-muted-foreground">spec-aware reasoning</summary>
                <div className="mt-1.5 text-[12px] leading-relaxed text-foreground">{pw.reasoning}</div>
              </details>
            )}
            {bp?.reasoning && (
              <details className="mt-2">
                <summary className="cursor-pointer text-[11px] uppercase tracking-wide text-muted-foreground">blind reasoning</summary>
                <div className="mt-1.5 text-[12px] leading-relaxed text-foreground">{bp.reasoning}</div>
              </details>
            )}
          </div>
        );
      })}
    </div>
  );
}

interface DiagnosisShape {
  input_summary?: { one_sentence_summary?: string };
  primary_hypothesis?: { primary_archetype?: string; market_type?: string; sales_motion?: string };
  first_viewport_obligation?: { must_accomplish?: string; primary_question_to_answer?: string; failure_condition?: string };
  beauty_function_balance?: { beauty_definition_for_this_site?: string; functionality_definition_for_this_site?: string; rationale?: string };
  hard_floors?: Array<{ rule?: string; why_it_matters?: string }>;
  anti_patterns?: Array<{ anti_pattern?: string; why_bad_for_this_site?: string }>;
}

function DiagnosisSummary({ diagnosis }: { diagnosis: unknown }) {
  if (!diagnosis || typeof diagnosis !== "object") return <div className="text-xs text-muted-foreground">No strategic_diagnosis.json on disk.</div>;
  const d = diagnosis as DiagnosisShape;
  return (
    <div className="space-y-3 text-[12px] leading-relaxed">
      {d.input_summary?.one_sentence_summary && (
        <div>
          <div className="text-[10px] uppercase tracking-wide text-muted-foreground">brief</div>
          <div>{d.input_summary.one_sentence_summary}</div>
        </div>
      )}
      {d.primary_hypothesis && (
        <div className="flex flex-wrap gap-1.5">
          {d.primary_hypothesis.primary_archetype && <Chip label="archetype" value={d.primary_hypothesis.primary_archetype} />}
          {d.primary_hypothesis.market_type && <Chip label="market" value={d.primary_hypothesis.market_type} />}
          {d.primary_hypothesis.sales_motion && <Chip label="sales" value={d.primary_hypothesis.sales_motion} />}
        </div>
      )}
      {d.first_viewport_obligation?.must_accomplish && (
        <div>
          <div className="text-[10px] uppercase tracking-wide text-muted-foreground">first viewport must</div>
          <div>{d.first_viewport_obligation.must_accomplish}</div>
        </div>
      )}
      {d.beauty_function_balance && (d.beauty_function_balance.beauty_definition_for_this_site || d.beauty_function_balance.functionality_definition_for_this_site) && (
        <div className="grid gap-2 sm:grid-cols-2">
          {d.beauty_function_balance.beauty_definition_for_this_site && (
            <div className="rounded bg-muted/40 p-2">
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">beauty</div>
              <div>{d.beauty_function_balance.beauty_definition_for_this_site}</div>
            </div>
          )}
          {d.beauty_function_balance.functionality_definition_for_this_site && (
            <div className="rounded bg-muted/40 p-2">
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">functionality</div>
              <div>{d.beauty_function_balance.functionality_definition_for_this_site}</div>
            </div>
          )}
        </div>
      )}
      {d.hard_floors && d.hard_floors.length > 0 && (
        <details>
          <summary className="cursor-pointer text-[10px] uppercase tracking-wide text-muted-foreground">{d.hard_floors.length} hard floors</summary>
          <ul className="mt-2 space-y-1">
            {d.hard_floors.map((hf, i) => (
              <li key={i}>· {hf.rule}</li>
            ))}
          </ul>
        </details>
      )}
      {d.anti_patterns && d.anti_patterns.length > 0 && (
        <details>
          <summary className="cursor-pointer text-[10px] uppercase tracking-wide text-muted-foreground">{d.anti_patterns.length} anti-patterns</summary>
          <ul className="mt-2 space-y-1">
            {d.anti_patterns.map((ap, i) => (
              <li key={i}>· {ap.anti_pattern}</li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}

function Chip({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-baseline gap-1 rounded bg-muted px-1.5 py-0.5 font-mono text-[11px]">
      <span className="text-[9px] uppercase text-muted-foreground">{label}</span>
      <span>{value}</span>
    </span>
  );
}
