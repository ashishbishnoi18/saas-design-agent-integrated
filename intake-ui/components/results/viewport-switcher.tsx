"use client";

import { Monitor, Smartphone, Tablet } from "lucide-react";
import { cn } from "@/lib/utils";

export type Viewport = "desktop" | "tablet" | "mobile";

export const VIEWPORT_WIDTHS: Record<Viewport, number> = {
  desktop: 1280,
  tablet: 820,
  mobile: 390,
};

const TABS: Array<{ id: Viewport; label: string; icon: typeof Monitor; width: number }> = [
  { id: "desktop", label: "Desktop", icon: Monitor, width: VIEWPORT_WIDTHS.desktop },
  { id: "tablet", label: "Tablet", icon: Tablet, width: VIEWPORT_WIDTHS.tablet },
  { id: "mobile", label: "Mobile", icon: Smartphone, width: VIEWPORT_WIDTHS.mobile },
];

export function ViewportSwitcher({
  value,
  onChange,
}: {
  value: Viewport;
  onChange: (v: Viewport) => void;
}) {
  return (
    <div className="inline-flex items-center gap-0.5 rounded-md border border-border bg-background p-0.5">
      {TABS.map((t) => {
        const active = t.id === value;
        const Icon = t.icon;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            title={`${t.label} · ${t.width}px`}
            className={cn(
              "inline-flex items-center gap-1.5 rounded px-2 py-1 text-[11px] font-medium transition-colors",
              active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent",
            )}
          >
            <Icon className="h-3 w-3" />
            <span className="hidden sm:inline">{t.label}</span>
            <span className="font-mono opacity-70">{t.width}</span>
          </button>
        );
      })}
    </div>
  );
}
