"use client";

import { Cpu } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CliProvider } from "@/lib/types";

const PROVIDERS: Array<{ id: CliProvider; label: string; sub: string }> = [
  { id: "claude-cli", label: "Claude CLI", sub: "opus 4.7" },
  { id: "codex-cli", label: "Codex CLI", sub: "gpt-5.5" },
];

export function ModelSwitcher({
  value,
  onChange,
  disabled,
}: {
  value: CliProvider;
  onChange: (next: CliProvider) => void;
  disabled?: boolean;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-md border border-border bg-background p-1">
      <Cpu className="ml-1.5 h-3.5 w-3.5 text-muted-foreground" />
      {PROVIDERS.map((p) => {
        const active = p.id === value;
        return (
          <button
            key={p.id}
            type="button"
            disabled={disabled}
            onClick={() => onChange(p.id)}
            className={cn(
              "rounded px-2 py-1 text-xs font-medium transition-colors",
              active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent",
              disabled && "opacity-60 cursor-not-allowed",
            )}
          >
            <span>{p.label}</span>
            <span className="ml-1 text-[10px] opacity-70">{p.sub}</span>
          </button>
        );
      })}
    </div>
  );
}
