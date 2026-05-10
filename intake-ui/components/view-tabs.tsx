"use client";

import { CheckCircle2, MessageSquare, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export type ViewMode = "intake" | "pipeline" | "results";

const TABS: Array<{ id: ViewMode; label: string; icon: typeof MessageSquare }> = [
  { id: "intake", label: "Intake", icon: MessageSquare },
  { id: "pipeline", label: "Pipeline", icon: Play },
  { id: "results", label: "Results", icon: CheckCircle2 },
];

export function ViewTabs({
  value,
  onChange,
  pipelineEnabled,
  resultsEnabled,
}: {
  value: ViewMode;
  onChange: (v: ViewMode) => void;
  pipelineEnabled: boolean;
  resultsEnabled: boolean;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-md border border-border bg-background p-1">
      {TABS.map((t) => {
        const disabled =
          (t.id === "pipeline" && !pipelineEnabled) ||
          (t.id === "results" && !resultsEnabled);
        const active = t.id === value;
        const Icon = t.icon;
        return (
          <button
            key={t.id}
            type="button"
            disabled={disabled}
            onClick={() => onChange(t.id)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-colors",
              active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent",
              disabled && "opacity-40 cursor-not-allowed hover:bg-transparent",
            )}
          >
            <Icon className="h-3.5 w-3.5" /> {t.label}
          </button>
        );
      })}
    </div>
  );
}
