"use client";

import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { MessageBubble } from "./message";
import type { Message } from "@/lib/types";

export function ChatThread({ messages, pending }: { messages: Message[]; pending: boolean }) {
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, pending]);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-6">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
        {messages.length === 0 && !pending && (
          <div className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            New intake. The interviewer will open with the question that most reduces the diagnoser&apos;s uncertainty.
            Click <span className="font-medium text-foreground">Start</span> when you&apos;re ready.
          </div>
        )}
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
        {pending && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            interviewer is thinking…
          </div>
        )}
        <div ref={endRef} />
      </div>
    </div>
  );
}
