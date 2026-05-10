"use client";

import { useEffect, useRef, useState } from "react";
import { Clock, FolderOpen, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SessionStub {
  id: string;
  updated_at: number;
  preview?: string;
}

function formatRelative(ts: number): string {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60_000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export function SessionPicker({
  currentId,
  onPick,
  refreshKey,
}: {
  currentId?: string;
  onPick: (id: string) => void;
  refreshKey: number;
}) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<SessionStub[]>([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoading(true);
    fetch("/api/sessions")
      .then((r) => r.json())
      .then((j) => {
        if (cancelled) return;
        setItems(Array.isArray(j.sessions) ? j.sessions : []);
      })
      .catch(() => { if (!cancelled) setItems([]); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [open, refreshKey]);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <Button size="sm" variant="outline" onClick={() => setOpen((v) => !v)} className="gap-1.5">
        <FolderOpen className="h-3.5 w-3.5" /> Sessions
      </Button>
      {open && (
        <div className="absolute right-0 z-30 mt-1 w-[360px] overflow-hidden rounded-md border border-border bg-card shadow-lg">
          <div className="flex items-center justify-between border-b border-border px-3 py-2 text-[11px] uppercase tracking-wide text-muted-foreground">
            <span>Saved intakes</span>
            {loading && <Loader2 className="h-3 w-3 animate-spin" />}
          </div>
          <div className="max-h-[60vh] overflow-y-auto scrollbar-thin">
            {!loading && items.length === 0 && (
              <div className="p-4 text-xs text-muted-foreground">No saved sessions yet.</div>
            )}
            {items.map((s) => {
              const active = s.id === currentId;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => { setOpen(false); onPick(s.id); }}
                  className={cn(
                    "block w-full border-b border-border px-3 py-2.5 text-left text-xs transition-colors last:border-b-0",
                    active ? "bg-accent" : "hover:bg-accent/60",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <code className="font-mono text-[11px] text-foreground">{s.id.slice(0, 12)}</code>
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock className="h-3 w-3" /> {formatRelative(s.updated_at)}
                    </span>
                  </div>
                  <div className="mt-1 line-clamp-2 text-[12px] leading-snug text-muted-foreground">
                    {s.preview || <span className="italic">empty session</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
