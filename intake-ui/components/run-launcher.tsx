"use client";

import { useState } from "react";
import { Loader2, Play, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { CliProvider, RunOptions } from "@/lib/types";

const PROVIDERS = ["claude-cli", "codex-cli", "gemini", "openai", "anthropic"] as const;

function providerDefault(sessionProvider: CliProvider): string {
  return sessionProvider;
}

export function RunLauncher({
  sessionProvider,
  starting,
  onStart,
  disabled,
  disabledReason,
}: {
  sessionProvider: CliProvider;
  starting: boolean;
  onStart: (options: RunOptions) => void;
  disabled?: boolean;
  disabledReason?: string;
}) {
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState<RunOptions>({
    diagnosis_provider: providerDefault(sessionProvider),
    validator_provider: providerDefault(sessionProvider),
    evaluator_provider: providerDefault(sessionProvider),
    use_diagnosis_strategies: true,
    judge_panel: true,
    blind_pairwise: true,
    pairwise: true,
    synthesize_top_k: 0,
  });

  const update = (patch: Partial<RunOptions>) => setOptions((o) => ({ ...o, ...patch }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Run pipeline</span>
          <button
            type="button"
            onClick={() => setShowOptions((v) => !v)}
            className="text-[11px] font-normal text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
          >
            <Settings2 className="h-3 w-3" /> {showOptions ? "hide options" : "options"}
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-[12px] text-muted-foreground">
          Runs <code className="font-mono">integrated_pipeline.py</code> against this finalized brief — diagnosis, validation, architect Best-of-N, screenshots, programmatic gates, judge panel, pairwise tournaments, ranking. Takes several minutes.
        </p>

        {showOptions && (
          <div className="space-y-2.5 border-t border-border pt-3">
            <ProviderRow label="Diagnosis" value={options.diagnosis_provider} onChange={(v) => update({ diagnosis_provider: v })} />
            <ProviderRow label="Validator" value={options.validator_provider} onChange={(v) => update({ validator_provider: v })} />
            <ProviderRow label="Evaluator" value={options.evaluator_provider} onChange={(v) => update({ evaluator_provider: v })} />
            <Toggle label="Use diagnosis strategy seeds" value={options.use_diagnosis_strategies} onChange={(v) => update({ use_diagnosis_strategies: v })} />
            <Toggle label="Multi-judge panel" value={options.judge_panel} onChange={(v) => update({ judge_panel: v })} />
            <Toggle label="Blind screenshot pairwise" value={options.blind_pairwise} onChange={(v) => update({ blind_pairwise: v })} />
            <Toggle label="Spec-aware pairwise tournament" value={options.pairwise} onChange={(v) => update({ pairwise: v })} />
            <div className="flex items-center justify-between text-[12px]">
              <label htmlFor="topk">Synthesize top-K</label>
              <input
                id="topk"
                type="number"
                min={0}
                max={6}
                value={options.synthesize_top_k}
                onChange={(e) => update({ synthesize_top_k: Math.max(0, Math.min(6, Number(e.target.value) || 0)) })}
                className="w-14 rounded border border-input bg-background px-1.5 py-0.5 text-center"
              />
            </div>
          </div>
        )}

        <Button
          className="w-full gap-2"
          onClick={() => onStart(options)}
          disabled={disabled || starting}
          title={disabledReason}
        >
          {starting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
          {starting ? "starting…" : "Run pipeline"}
        </Button>
        {disabled && disabledReason && (
          <div className="text-[11px] text-muted-foreground">{disabledReason}</div>
        )}
      </CardContent>
    </Card>
  );
}

function ProviderRow({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center justify-between text-[12px]">
      <label>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded border border-input bg-background px-1.5 py-0.5 text-[12px]"
      >
        {PROVIDERS.map((p) => <option key={p} value={p}>{p}</option>)}
      </select>
    </div>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between text-[12px] cursor-pointer">
      <span>{label}</span>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={cn(
          "h-4 w-7 rounded-full p-0.5 transition-colors",
          value ? "bg-primary" : "bg-border",
        )}
      >
        <span className={cn("block h-3 w-3 rounded-full bg-background transition-transform", value && "translate-x-3")} />
      </button>
    </label>
  );
}
