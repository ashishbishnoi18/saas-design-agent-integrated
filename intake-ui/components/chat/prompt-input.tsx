"use client";

import { useEffect, useRef } from "react";
import { ArrowUp, Loader2, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function PromptInput({
  value,
  onChange,
  onSubmit,
  loading,
  placeholder,
  targetAxis,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  loading: boolean;
  placeholder?: string;
  targetAxis?: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 240)}px`;
  }, [value]);

  return (
    <div className="space-y-1.5">
      {targetAxis && (
        <div className="flex items-center gap-1.5 px-1 text-[11px] text-muted-foreground">
          <Target className="h-3 w-3" />
          <span>answering one thing:</span>
          <code className="font-mono lowercase text-foreground">{targetAxis}</code>
        </div>
      )}
      <div className="rounded-xl border border-border bg-card p-2 shadow-sm">
      <Textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            if (!loading && value.trim()) onSubmit();
          }
        }}
        placeholder={placeholder ?? "Type your answer. Be specific. ⌘/Ctrl+Enter to send."}
        rows={2}
        className="border-0 px-2 py-1.5 focus-visible:ring-0 min-h-[44px]"
      />
      <div className="flex items-center justify-between px-1 pt-1">
        <div className="text-[11px] text-muted-foreground">⌘/Ctrl + Enter to send</div>
        <Button
          size="sm"
          onClick={onSubmit}
          disabled={loading || !value.trim()}
          className="gap-1"
        >
          {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ArrowUp className="h-3.5 w-3.5" />}
          Send
        </Button>
      </div>
      </div>
    </div>
  );
}
