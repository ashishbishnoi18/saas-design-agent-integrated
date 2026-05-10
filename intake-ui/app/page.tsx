"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AlertTriangle, Brain, PlusCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatThread } from "@/components/chat/chat-thread";
import { PromptInput } from "@/components/chat/prompt-input";
import { DiagnosisPanel } from "@/components/diagnosis-panel";
import { ModelSwitcher } from "@/components/model-switcher";
import { SessionPicker } from "@/components/session-picker";
import type { CliProvider, DiagnosisPreview, Message, Session } from "@/lib/types";

const DIAGNOSE_EVERY_N_USER_MESSAGES = 2;

export default function Page() {
  const [session, setSession] = useState<Session | null>(null);
  const [provider, setProvider] = useState<CliProvider>("claude-cli");
  const [input, setInput] = useState("");
  const [interviewerLoading, setInterviewerLoading] = useState(false);
  const [diagnoseLoading, setDiagnoseLoading] = useState(false);
  const [finalizing, setFinalizing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [finalSummary, setFinalSummary] = useState<string | undefined>();
  const [sessionsRefreshKey, setSessionsRefreshKey] = useState(0);
  const lastAutoDiagnoseAt = useRef<number>(0);

  const messages: Message[] = session?.messages ?? [];
  const preview: DiagnosisPreview | undefined = session?.preview;
  const lastInterviewer = [...messages].reverse().find((m) => m.role === "interviewer");
  const currentTargetAxis = lastInterviewer?.target_axis;

  const setUrlSession = (id: string | null) => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (id) url.searchParams.set("session", id);
    else url.searchParams.delete("session");
    window.history.replaceState({}, "", url.toString());
  };

  const startSession = useCallback(async () => {
    setError(null);
    setFinalSummary(undefined);
    const res = await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider }),
    });
    if (!res.ok) {
      setError(`could not create session: ${res.status}`);
      return;
    }
    const next = (await res.json()) as Session;
    setSession(next);
    setUrlSession(next.id);
    setSessionsRefreshKey((k) => k + 1);
    lastAutoDiagnoseAt.current = 0;
    await askInterviewer(next.id, undefined, provider);
  }, [provider]);

  const loadSession = useCallback(async (id: string) => {
    setError(null);
    setFinalSummary(undefined);
    const res = await fetch(`/api/sessions?id=${encodeURIComponent(id)}`);
    if (!res.ok) {
      setError(`could not load session ${id}: ${res.status}`);
      return;
    }
    const loaded = (await res.json()) as Session;
    setSession(loaded);
    setProvider(loaded.provider);
    setUrlSession(loaded.id);
    lastAutoDiagnoseAt.current = loaded.messages.filter((m) => m.role === "user").length;
  }, []);

  const askInterviewer = useCallback(
    async (sessionId: string, userMessage: string | undefined, providerOverride?: CliProvider) => {
      setInterviewerLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/interviewer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            session_id: sessionId,
            user_message: userMessage,
            provider_override: providerOverride,
          }),
        });
        const body = await res.json();
        if (!res.ok) {
          setError(body.error ?? `interviewer error: ${res.status}`);
          return;
        }
        setSession(body.session as Session);
        setSessionsRefreshKey((k) => k + 1);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setInterviewerLoading(false);
      }
    },
    [],
  );

  const refreshDiagnosis = useCallback(async (sessionId: string) => {
    setDiagnoseLoading(true);
    try {
      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId }),
      });
      const body = await res.json();
      if (!res.ok) {
        setError(body.error ?? `diagnose error: ${res.status}`);
        return;
      }
      setSession(body.session as Session);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setDiagnoseLoading(false);
    }
  }, []);

  const finalize = useCallback(async (sessionId: string) => {
    setFinalizing(true);
    try {
      const res = await fetch("/api/finalize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId }),
      });
      const body = await res.json();
      if (!res.ok) {
        setError(body.error ?? `finalize error: ${res.status}`);
        return;
      }
      setSession(body.session as Session);
      setFinalSummary(
        `Wrote: ${body.written_to}\n\nNext:\n${body.next_command}\n\nraw_brief preview:\n${(body.final_brief?.raw_brief ?? "").slice(0, 600)}`,
      );
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setFinalizing(false);
    }
  }, []);

  // Restore session from URL on first load.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const id = new URL(window.location.href).searchParams.get("session");
    if (id) loadSession(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-trigger preview every N user messages (single-flight via ref).
  useEffect(() => {
    if (!session) return;
    const userCount = session.messages.filter((m) => m.role === "user").length;
    if (
      userCount > 0 &&
      userCount % DIAGNOSE_EVERY_N_USER_MESSAGES === 0 &&
      userCount !== lastAutoDiagnoseAt.current &&
      !diagnoseLoading &&
      !interviewerLoading
    ) {
      lastAutoDiagnoseAt.current = userCount;
      refreshDiagnosis(session.id);
    }
  }, [session, diagnoseLoading, interviewerLoading, refreshDiagnosis]);

  const submit = () => {
    if (!session || !input.trim()) return;
    const text = input;
    setInput("");
    askInterviewer(session.id, text);
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="flex items-center justify-between border-b border-border bg-background/80 px-4 py-2.5 backdrop-blur">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold">Strategist Intake</span>
          <span className="ml-2 hidden text-[11px] text-muted-foreground sm:inline">
            drives <code className="font-mono">strategic_diagnosis</code> with the right input
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ModelSwitcher
            value={provider}
            onChange={(p) => {
              setProvider(p);
              if (session) {
                setSession({ ...session, provider: p });
              }
            }}
            disabled={interviewerLoading || diagnoseLoading || finalizing}
          />
          <SessionPicker
            currentId={session?.id}
            onPick={loadSession}
            refreshKey={sessionsRefreshKey}
          />
          <Button size="sm" variant="outline" onClick={startSession} className="gap-1.5">
            <PlusCircle className="h-3.5 w-3.5" /> {session ? "New session" : "Start"}
          </Button>
        </div>
      </header>

      {error && (
        <div className="border-b border-destructive/30 bg-destructive/10 px-4 py-2 text-xs text-destructive flex items-center gap-2">
          <AlertTriangle className="h-3.5 w-3.5" /> {error}
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        <main className="flex flex-1 flex-col">
          {!session ? (
            <div className="flex flex-1 items-center justify-center px-4">
              <div className="max-w-md text-center space-y-3">
                <Brain className="mx-auto h-8 w-8 text-primary" />
                <h1 className="text-lg font-semibold">No intake started</h1>
                <p className="text-sm text-muted-foreground">
                  Pick a model and start. The interviewer will refuse vague answers, force trade-offs, and stop only when the diagnosis preview is strong.
                </p>
                <Button onClick={startSession} className="gap-1.5">
                  <PlusCircle className="h-4 w-4" /> Start intake
                </Button>
              </div>
            </div>
          ) : (
            <>
              <ChatThread messages={messages} pending={interviewerLoading} />
              <div className="border-t border-border bg-background/60 p-3">
                <div className="mx-auto w-full max-w-3xl">
                  <PromptInput
                    value={input}
                    onChange={setInput}
                    onSubmit={submit}
                    loading={interviewerLoading}
                    targetAxis={currentTargetAxis}
                  />
                </div>
              </div>
            </>
          )}
        </main>

        {session && (
          <DiagnosisPanel
            preview={preview}
            loading={diagnoseLoading}
            onRefresh={() => refreshDiagnosis(session.id)}
            onFinalize={() => finalize(session.id)}
            finalizing={finalizing}
            finalSummary={finalSummary}
          />
        )}
      </div>
    </div>
  );
}
