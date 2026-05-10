"use client";

import { useEffect, useState } from "react";
import { ExternalLink, FileText, Loader2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CandidateArtifacts, RankingEntry } from "@/lib/types";

const VIEWPORTS = ["desktop", "tablet", "mobile"] as const;

export function CandidateDetail({
  candidate,
  ranking,
  runId,
  onClose,
}: {
  candidate: CandidateArtifacts;
  ranking?: RankingEntry;
  runId: string;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<"screenshots" | "wireframe" | "verdict" | "spec">("screenshots");
  const [verdict, setVerdict] = useState<string | null>(null);
  const [spec, setSpec] = useState<string | null>(null);
  const [loadingText, setLoadingText] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (tab === "verdict" && verdict === null && candidate.verdict_path) {
      setLoadingText(true);
      fetch(`/api/runs/${runId}/file?path=${encodeURIComponent(candidate.verdict_path)}`)
        .then((r) => r.text()).then(setVerdict).catch(() => setVerdict("(failed to load)"))
        .finally(() => setLoadingText(false));
    }
    if (tab === "spec" && spec === null && candidate.ui_spec_path) {
      setLoadingText(true);
      fetch(`/api/runs/${runId}/file?path=${encodeURIComponent(candidate.ui_spec_path)}`)
        .then((r) => r.text()).then(setSpec).catch(() => setSpec("(failed to load)"))
        .finally(() => setLoadingText(false));
    }
  }, [tab, verdict, spec, candidate.verdict_path, candidate.ui_spec_path, runId]);

  const fileUrl = (p?: string) => (p ? `/api/runs/${runId}/file?path=${encodeURIComponent(p)}` : undefined);

  return (
    <div className="fixed inset-0 z-50 flex items-stretch bg-background/80 backdrop-blur">
      <div className="flex flex-1 flex-col bg-background shadow-2xl">
        <header className="flex items-center justify-between border-b border-border px-5 py-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-semibold">{candidate.strategy}</span>
            {ranking && (
              <>
                <Badge variant="default" className="font-mono">#{ranking.rank} · {ranking.gate.toLowerCase()}</Badge>
                <Badge variant="outline" className="font-mono">total {ranking.total?.toFixed(2) ?? "—"}</Badge>
                {typeof ranking.panel_avg === "number" && <Badge variant="outline" className="font-mono">panel {ranking.panel_avg.toFixed(1)}</Badge>}
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <TabButton id="screenshots" current={tab} onClick={setTab}>Screenshots</TabButton>
            <TabButton id="wireframe" current={tab} onClick={setTab} disabled={!candidate.wireframe_path}>Wireframe</TabButton>
            <TabButton id="verdict" current={tab} onClick={setTab} disabled={!candidate.verdict_path}>Verdict</TabButton>
            <TabButton id="spec" current={tab} onClick={setTab} disabled={!candidate.ui_spec_path}>Spec</TabButton>
            <Button size="icon" variant="ghost" onClick={onClose} className="ml-2">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-auto scrollbar-thin">
          {tab === "screenshots" && (
            <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3">
              {VIEWPORTS.map((v) => {
                const viewport = candidate.shots.find((s) => s.viewport === v && s.kind === "viewport");
                const full = candidate.shots.find((s) => s.viewport === v && s.kind === "full");
                return (
                  <div key={v} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{v}</div>
                      {full && (
                        <a
                          href={fileUrl(full.path)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground"
                        >
                          full page <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                    {viewport ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={fileUrl(viewport.path)} alt={`${candidate.strategy} ${v}`} className="w-full rounded border border-border" />
                    ) : (
                      <div className="rounded border border-dashed border-border p-6 text-center text-xs text-muted-foreground">no {v} screenshot</div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {tab === "wireframe" && candidate.wireframe_path && (
            <iframe
              src={fileUrl(candidate.wireframe_path)}
              className="h-full w-full border-0"
              title={`${candidate.strategy} wireframe`}
              sandbox="allow-same-origin"
            />
          )}

          {tab === "verdict" && (
            <div className="p-6">
              {loadingText && verdict === null ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> loading…</div>
              ) : (
                <pre className="whitespace-pre-wrap rounded border border-border bg-muted/40 p-4 text-[12px] leading-relaxed">{verdict ?? "(empty)"}</pre>
              )}
            </div>
          )}

          {tab === "spec" && (
            <div className="p-6">
              {loadingText && spec === null ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> loading…</div>
              ) : (
                <pre className="whitespace-pre-wrap rounded border border-border bg-muted/40 p-4 text-[12px] leading-relaxed">{spec ?? "(empty)"}</pre>
              )}
            </div>
          )}
        </div>

        {ranking?.panel_scores && Object.keys(ranking.panel_scores).length > 0 && (
          <footer className="border-t border-border bg-muted/40 px-5 py-2.5">
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-thin">
              <FileText className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <span className="shrink-0 text-[11px] uppercase tracking-wide text-muted-foreground">judge panel</span>
              {Object.entries(ranking.panel_scores).map(([judge, score]) => (
                <span key={judge} className="shrink-0 text-[12px]">
                  <span className="font-mono text-muted-foreground">{judge}</span>{" "}
                  <span className={cn("font-mono font-medium", score === 0 && "text-rose-700")}>{Number(score).toFixed(1)}</span>
                </span>
              ))}
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

function TabButton({
  id,
  current,
  onClick,
  disabled,
  children,
}: {
  id: "screenshots" | "wireframe" | "verdict" | "spec";
  current: typeof id | string;
  onClick: (v: "screenshots" | "wireframe" | "verdict" | "spec") => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const active = current === id;
  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      disabled={disabled}
      className={cn(
        "rounded px-2 py-1 text-xs font-medium transition-colors",
        active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent",
        disabled && "opacity-40 cursor-not-allowed hover:bg-transparent",
      )}
    >
      {children}
    </button>
  );
}
