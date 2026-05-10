"use client";

import { CheckCircle2, CircleDashed, Loader2, RefreshCw, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DiagnosisPreview } from "@/lib/types";

function confidenceColor(c: number): string {
  if (c >= 0.8) return "bg-emerald-500";
  if (c >= 0.6) return "bg-emerald-400";
  if (c >= 0.4) return "bg-amber-400";
  if (c >= 0.2) return "bg-orange-400";
  return "bg-rose-400";
}

export function DiagnosisPanel({
  preview,
  loading,
  onRefresh,
  onFinalize,
  finalizing,
  finalSummary,
}: {
  preview: DiagnosisPreview | undefined;
  loading: boolean;
  onRefresh: () => void;
  onFinalize: () => void;
  finalizing: boolean;
  finalSummary?: string;
}) {
  const overall = preview?.overall_confidence ?? 0;
  const ready = preview?.ready_for_full_diagnosis;

  return (
    <aside className="hidden lg:flex w-[380px] shrink-0 flex-col border-l border-border bg-muted/30">
      <div className="flex items-center justify-between border-b border-border bg-background/60 px-4 py-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Diagnosis preview
          </div>
          <div className="mt-0.5 flex items-center gap-2">
            <span className="text-sm font-medium">
              {(overall * 100).toFixed(0)}% confident
            </span>
            {ready && <Badge variant="success">ready to finalize</Badge>}
          </div>
        </div>
        <Button size="icon" variant="ghost" onClick={onRefresh} disabled={loading} title="Recompute preview">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-4 space-y-4">
        {!preview && (
          <div className="rounded-md border border-dashed border-border p-4 text-xs text-muted-foreground">
            No preview yet. The interviewer will trigger one after a few turns, or click the refresh button to compute now.
          </div>
        )}

        {preview && (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-3.5 w-3.5" /> One-line read
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-foreground">
                {preview.one_sentence_summary || <span className="text-muted-foreground italic">not yet inferable</span>}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {preview.detected_archetype && (
                    <Badge variant="accent" className="font-mono">{preview.detected_archetype}</Badge>
                  )}
                  {preview.detected_market_type && (
                    <Badge variant="outline" className="font-mono">{preview.detected_market_type}</Badge>
                  )}
                  {preview.detected_sales_motion && (
                    <Badge variant="outline" className="font-mono">{preview.detected_sales_motion}</Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Axis confidence</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2.5">
                {(preview.axes ?? []).map((a) => (
                  <div key={a.axis}>
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="font-mono lowercase">{a.axis}</span>
                      <span className="text-muted-foreground tabular-nums">{(a.confidence * 100).toFixed(0)}%</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-border">
                      <div
                        className={cn("h-full rounded-full", confidenceColor(a.confidence))}
                        style={{ width: `${Math.max(2, Math.min(100, a.confidence * 100))}%` }}
                      />
                    </div>
                    {a.why && (
                      <div className="mt-1 text-[11px] text-muted-foreground">{a.why}</div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {preview.missing_critical_info?.length ? (
              <Card>
                <CardHeader>
                  <CardTitle>Missing critical info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1.5">
                  {preview.missing_critical_info.map((m, i) => (
                    <div key={i} className="flex items-start gap-2 text-[12px]">
                      <CircleDashed className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                      <span>{m}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ) : null}

            {preview.open_questions?.length ? (
              <Card>
                <CardHeader>
                  <CardTitle>Suggested next questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1.5">
                  {preview.open_questions.map((q, i) => (
                    <div key={i} className="text-[12px] leading-snug text-muted-foreground">— {q}</div>
                  ))}
                </CardContent>
              </Card>
            ) : null}

            {finalSummary && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" /> Finalized
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-[12px] text-muted-foreground whitespace-pre-wrap">
                  {finalSummary}
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>

      <div className="border-t border-border bg-background/60 p-3">
        <Button
          className="w-full gap-2"
          onClick={onFinalize}
          disabled={finalizing || !preview}
          variant={ready ? "default" : "subtle"}
        >
          {finalizing ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
          {ready ? "Finalize brief" : "Finalize anyway"}
        </Button>
        <div className="mt-1.5 text-center text-[11px] text-muted-foreground">
          Writes <code className="font-mono">runs/intake-&lt;id&gt;/input.json</code>
        </div>
      </div>
    </aside>
  );
}
