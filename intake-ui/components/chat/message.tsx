"use client";

import { AlertTriangle, Brain, MessageCircle, Scale, StickyNote, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { Message } from "@/lib/types";

const TYPE_META: Record<string, { label: string; icon: typeof Brain; tone: string }> = {
  question: { label: "Question", icon: MessageCircle, tone: "bg-slate-100 text-slate-900" },
  pushback: { label: "Pushback", icon: AlertTriangle, tone: "bg-amber-100 text-amber-900" },
  trade_off: { label: "Trade-off", icon: Scale, tone: "bg-violet-100 text-violet-900" },
  summary: { label: "Summary", icon: Brain, tone: "bg-emerald-100 text-emerald-900" },
  note: { label: "Assumption", icon: StickyNote, tone: "bg-zinc-100 text-zinc-900" },
};

export function MessageBubble({ message }: { message: Message }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-primary text-primary-foreground px-4 py-2.5 text-sm leading-relaxed">
          <div className="mb-1 flex items-center gap-1.5 text-[11px] opacity-70">
            <User className="h-3 w-3" /> You
          </div>
          <div className="whitespace-pre-wrap">{message.content}</div>
        </div>
      </div>
    );
  }

  const meta = TYPE_META[message.type] ?? TYPE_META.question;
  const Icon = meta.icon;

  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] space-y-2">
        <div className="flex items-center gap-2">
          <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium", meta.tone)}>
            <Icon className="h-3 w-3" /> {meta.label}
          </span>
          {message.target_axis && (
            <Badge variant="outline" className="font-mono lowercase">{message.target_axis}</Badge>
          )}
        </div>
        <div className="rounded-2xl rounded-tl-sm border border-border bg-card px-4 py-3 text-sm leading-relaxed">
          <div className="whitespace-pre-wrap text-foreground">{message.content}</div>
          {message.rationale && (
            <div className="mt-2 border-t border-border pt-2 text-[11px] italic text-muted-foreground">
              why: {message.rationale}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
