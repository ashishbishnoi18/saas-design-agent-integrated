"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertTriangle, ArrowLeft, Link2, Link2Off, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ViewportSwitcher, type Viewport } from "@/components/results/viewport-switcher";
import { SyncedFrames } from "@/components/compare/synced-frames";
import { PairwiseRail } from "@/components/compare/pairwise-rail";
import type { ArtifactsSummary, RunRecord } from "@/lib/types";

export default function ComparePage() {
  const params = useSearchParams();
  const router = useRouter();
  const runId = params.get("run") ?? "";
  const a = params.get("a") ?? "";
  const b = params.get("b") ?? "";

  const [run, setRun] = useState<RunRecord | null>(null);
  const [summary, setSummary] = useState<ArtifactsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [synced, setSynced] = useState(true);

  useEffect(() => {
    if (!runId || !a || !b) {
      setError("Missing query params: need run, a, b");
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    Promise.all([
      fetch(`/api/runs/${encodeURIComponent(runId)}`).then((r) => r.json()),
      fetch(`/api/runs/${encodeURIComponent(runId)}/artifacts`).then((r) => r.json()),
    ])
      .then(([runBody, artBody]) => {
        if (cancelled) return;
        if (runBody.error) { setError(runBody.error); return; }
        if (artBody.error) { setError(artBody.error); return; }
        setRun(runBody.run as RunRecord);
        setSummary(artBody.summary as ArtifactsSummary);
      })
      .catch((e) => { if (!cancelled) setError((e as Error).message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [runId, a, b]);

  const candidateA = summary?.candidates.find((c) => c.strategy === a);
  const candidateB = summary?.candidates.find((c) => c.strategy === b);

  const fileUrl = useCallback((p?: string) => {
    if (!p || !runId) return undefined;
    return `/api/runs/${encodeURIComponent(runId)}/file?path=${encodeURIComponent(p)}`;
  }, [runId]);

  const goBack = () => {
    if (run) {
      router.push(`/?session=${encodeURIComponent(run.session_id)}`);
    } else {
      router.push("/");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-sm text-muted-foreground">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> loading run + artifacts…
      </div>
    );
  }

  if (error || !summary) {
    return (
      <div className="flex h-screen items-center justify-center px-6">
        <div className="max-w-md space-y-3 text-center">
          <AlertTriangle className="mx-auto h-6 w-6 text-rose-500" />
          <div className="text-sm">Couldn&apos;t load comparison: {error ?? "unknown error"}</div>
          <Button variant="outline" onClick={goBack} className="gap-1.5"><ArrowLeft className="h-3.5 w-3.5" /> Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="flex flex-wrap items-center gap-3 border-b border-border bg-background/80 px-4 py-2.5 backdrop-blur">
        <Button size="sm" variant="ghost" onClick={goBack} className="gap-1.5 px-2">
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Compare</span>
          <code className="font-mono text-[12px]">{a}</code>
          <span className="text-muted-foreground">vs</span>
          <code className="font-mono text-[12px]">{b}</code>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSynced((v) => !v)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px] font-medium transition-colors",
              synced ? "border-primary/30 bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground hover:bg-accent",
            )}
            title={synced ? "Scroll is linked between both panes" : "Each pane scrolls independently"}
          >
            {synced ? <Link2 className="h-3 w-3" /> : <Link2Off className="h-3 w-3" />}
            {synced ? "synced scroll" : "independent scroll"}
          </button>
          <ViewportSwitcher value={viewport} onChange={setViewport} />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-hidden">
          <SyncedFrames
            srcA={fileUrl(candidateA?.wireframe_path)}
            srcB={fileUrl(candidateB?.wireframe_path)}
            viewport={viewport}
            synced={synced}
          />
        </main>
        <PairwiseRail a={a} b={b} summary={summary} />
      </div>
    </div>
  );
}
