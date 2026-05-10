"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AlertTriangle, Brain, PlusCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatThread } from "@/components/chat/chat-thread";
import { PromptInput } from "@/components/chat/prompt-input";
import { DiagnosisPanel } from "@/components/diagnosis-panel";
import { ModelSwitcher } from "@/components/model-switcher";
import { SessionPicker } from "@/components/session-picker";
import { ViewTabs, type ViewMode } from "@/components/view-tabs";
import { RunLauncher } from "@/components/run-launcher";
import { RunStatusView } from "@/components/run-status";
import { ResultsView } from "@/components/results-view";
import type {
  ArtifactsSummary,
  CliProvider,
  DiagnosisPreview,
  Message,
  RunOptions,
  RunRecord,
  Session,
} from "@/lib/types";

const DIAGNOSE_EVERY_N_USER_MESSAGES = 2;
const RUN_POLL_MS = 1500;

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

  const [view, setView] = useState<ViewMode>("intake");
  const [currentRun, setCurrentRun] = useState<RunRecord | null>(null);
  const [runLog, setRunLog] = useState<{ text: string; bytes: number; truncated: boolean }>({ text: "", bytes: 0, truncated: false });
  const [artifacts, setArtifacts] = useState<ArtifactsSummary | null>(null);
  const [artifactsLoading, setArtifactsLoading] = useState(false);
  const [startingRun, setStartingRun] = useState(false);
  const justSwitchedToResults = useRef(false);

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

  const fetchRun = useCallback(async (runId: string) => {
    try {
      const res = await fetch(`/api/runs/${encodeURIComponent(runId)}`);
      if (!res.ok) return;
      const body = await res.json();
      setCurrentRun(body.run as RunRecord);
      setRunLog(body.log);
    } catch { /* swallow transient poll errors */ }
  }, []);

  const fetchArtifacts = useCallback(async (runId: string, opts?: { silent?: boolean }) => {
    if (!opts?.silent) setArtifactsLoading(true);
    try {
      const res = await fetch(`/api/runs/${encodeURIComponent(runId)}/artifacts`);
      if (!res.ok) return;
      const body = await res.json();
      setArtifacts(body.summary as ArtifactsSummary);
    } catch { /* ignore */ }
    finally { if (!opts?.silent) setArtifactsLoading(false); }
  }, []);

  const startSession = useCallback(async () => {
    setError(null);
    setFinalSummary(undefined);
    setCurrentRun(null);
    setArtifacts(null);
    setRunLog({ text: "", bytes: 0, truncated: false });
    setView("intake");
    const res = await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider }),
    });
    if (!res.ok) { setError(`could not create session: ${res.status}`); return; }
    const next = (await res.json()) as Session;
    setSession(next);
    setUrlSession(next.id);
    setSessionsRefreshKey((k) => k + 1);
    lastAutoDiagnoseAt.current = 0;
    await askInterviewer(next.id, undefined, provider);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  const loadSession = useCallback(async (id: string) => {
    setError(null);
    setFinalSummary(undefined);
    setCurrentRun(null);
    setArtifacts(null);
    setRunLog({ text: "", bytes: 0, truncated: false });
    setView("intake");
    const res = await fetch(`/api/sessions?id=${encodeURIComponent(id)}`);
    if (!res.ok) { setError(`could not load session ${id}: ${res.status}`); return; }
    const loaded = (await res.json()) as Session;
    setSession(loaded);
    setProvider(loaded.provider);
    setUrlSession(loaded.id);
    lastAutoDiagnoseAt.current = loaded.messages.filter((m) => m.role === "user").length;
    if (loaded.latest_run_id) {
      await fetchRun(loaded.latest_run_id);
      await fetchArtifacts(loaded.latest_run_id, { silent: true });
    }
  }, [fetchRun, fetchArtifacts]);

  const askInterviewer = useCallback(
    async (sessionId: string, userMessage: string | undefined, providerOverride?: CliProvider) => {
      setInterviewerLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/interviewer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionId, user_message: userMessage, provider_override: providerOverride }),
        });
        const body = await res.json();
        if (!res.ok) { setError(body.error ?? `interviewer error: ${res.status}`); return; }
        setSession(body.session as Session);
        setSessionsRefreshKey((k) => k + 1);
      } catch (err) { setError((err as Error).message); }
      finally { setInterviewerLoading(false); }
    }, [],
  );

  const refreshDiagnosis = useCallback(async (sessionId: string) => {
    setDiagnoseLoading(true);
    try {
      const res = await fetch("/api/diagnose", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ session_id: sessionId }) });
      const body = await res.json();
      if (!res.ok) { setError(body.error ?? `diagnose error: ${res.status}`); return; }
      setSession(body.session as Session);
    } catch (err) { setError((err as Error).message); }
    finally { setDiagnoseLoading(false); }
  }, []);

  const finalize = useCallback(async (sessionId: string) => {
    setFinalizing(true);
    try {
      const res = await fetch("/api/finalize", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ session_id: sessionId }) });
      const body = await res.json();
      if (!res.ok) { setError(body.error ?? `finalize error: ${res.status}`); return; }
      setSession(body.session as Session);
      setFinalSummary(`Wrote: ${body.written_to}\n\nNext:\n${body.next_command}\n\nraw_brief preview:\n${(body.final_brief?.raw_brief ?? "").slice(0, 600)}`);
      setView("pipeline");
    } catch (err) { setError((err as Error).message); }
    finally { setFinalizing(false); }
  }, []);

  const startRun = useCallback(async (options: RunOptions) => {
    if (!session) return;
    setStartingRun(true);
    setError(null);
    setRunLog({ text: "", bytes: 0, truncated: false });
    setArtifacts(null);
    try {
      const res = await fetch("/api/runs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ session_id: session.id, options }) });
      const body = await res.json();
      if (!res.ok) { setError(body.error ?? `run start error: ${res.status}`); return; }
      const run = body.run as RunRecord;
      setCurrentRun(run);
      setSession((s) => (s ? { ...s, latest_run_id: run.id } : s));
      setView("pipeline");
    } catch (err) { setError((err as Error).message); }
    finally { setStartingRun(false); }
  }, [session]);

  const killRun = useCallback(async () => {
    if (!currentRun) return;
    try {
      const res = await fetch(`/api/runs/${encodeURIComponent(currentRun.id)}`, { method: "DELETE" });
      const body = await res.json();
      if (res.ok) setCurrentRun(body.run as RunRecord);
    } catch { /* ignore */ }
  }, [currentRun]);

  // URL-based session restore on first mount.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const id = new URL(window.location.href).searchParams.get("session");
    if (id) loadSession(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-diagnose every N user messages.
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

  // Poll the run while it's running, and refresh artifacts periodically too.
  useEffect(() => {
    if (!currentRun) return;
    if (currentRun.status !== "running") return;
    const id = currentRun.id;
    const t = setInterval(() => {
      fetchRun(id);
      // refresh artifacts in background — they trickle in as the pipeline progresses
      fetchArtifacts(id, { silent: true });
    }, RUN_POLL_MS);
    return () => clearInterval(t);
  }, [currentRun, fetchRun, fetchArtifacts]);

  // When a run flips to completed, fetch artifacts once more and switch to Results.
  useEffect(() => {
    if (!currentRun) return;
    if (currentRun.status === "completed" || currentRun.status === "failed" || currentRun.status === "killed") {
      fetchArtifacts(currentRun.id, { silent: true });
      if (currentRun.status === "completed" && !justSwitchedToResults.current) {
        justSwitchedToResults.current = true;
        setView("results");
      }
    }
    if (currentRun.status === "running") {
      justSwitchedToResults.current = false;
    }
  }, [currentRun, fetchArtifacts]);

  const submit = () => {
    if (!session || !input.trim()) return;
    const text = input;
    setInput("");
    askInterviewer(session.id, text);
  };

  const pipelineEnabled = Boolean(session?.final_brief);
  const resultsEnabled = Boolean(artifacts || (currentRun && currentRun.status !== "running"));

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-background/80 px-4 py-2.5 backdrop-blur">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold">Strategist Intake</span>
          {session && (
            <ViewTabs
              value={view}
              onChange={setView}
              pipelineEnabled={pipelineEnabled}
              resultsEnabled={resultsEnabled}
            />
          )}
        </div>
        <div className="flex items-center gap-2">
          <ModelSwitcher
            value={provider}
            onChange={(p) => {
              setProvider(p);
              if (session) setSession({ ...session, provider: p });
            }}
            disabled={interviewerLoading || diagnoseLoading || finalizing}
          />
          <SessionPicker currentId={session?.id} onPick={loadSession} refreshKey={sessionsRefreshKey} />
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
        <main className="flex flex-1 flex-col overflow-hidden">
          {!session ? (
            <div className="flex flex-1 items-center justify-center px-4">
              <div className="max-w-md text-center space-y-3">
                <Brain className="mx-auto h-8 w-8 text-primary" />
                <h1 className="text-lg font-semibold">No intake started</h1>
                <p className="text-sm text-muted-foreground">
                  Pick a model and start. The interviewer asks one critical question at a time, refuses vague answers, and stops only when the diagnosis preview is strong. Then run the full pipeline from here.
                </p>
                <Button onClick={startSession} className="gap-1.5">
                  <PlusCircle className="h-4 w-4" /> Start intake
                </Button>
              </div>
            </div>
          ) : view === "intake" ? (
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
          ) : view === "pipeline" ? (
            currentRun ? (
              <RunStatusView
                run={currentRun}
                log={runLog}
                onKill={killRun}
                onStartNew={() => setCurrentRun(null)}
              />
            ) : (
              <div className="flex flex-1 items-center justify-center p-6">
                <div className="max-w-md text-center text-sm text-muted-foreground">
                  No run yet. Configure the run on the right and click <span className="font-semibold text-foreground">Run pipeline</span>. The pipeline takes several minutes; you can keep watching the live log here, then jump to <span className="font-semibold text-foreground">Results</span> when it finishes.
                </div>
              </div>
            )
          ) : (
            <ResultsView
              runId={currentRun?.id ?? ""}
              summary={artifacts}
              refreshing={artifactsLoading}
              onRefresh={() => currentRun && fetchArtifacts(currentRun.id)}
              initialFocus={typeof window !== "undefined" ? new URL(window.location.href).searchParams.get("focus") ?? undefined : undefined}
              onFocusChange={(strategy) => {
                if (typeof window === "undefined") return;
                const url = new URL(window.location.href);
                if (strategy) url.searchParams.set("focus", strategy);
                else url.searchParams.delete("focus");
                window.history.replaceState({}, "", url.toString());
              }}
              onCompare={(a, b) => {
                if (!currentRun) return;
                const params = new URLSearchParams({ run: currentRun.id, a, b });
                window.location.href = `/compare?${params.toString()}`;
              }}
            />
          )}
        </main>

        {session && view === "intake" && (
          <DiagnosisPanel
            preview={preview}
            loading={diagnoseLoading}
            onRefresh={() => refreshDiagnosis(session.id)}
            onFinalize={() => finalize(session.id)}
            finalizing={finalizing}
            finalSummary={finalSummary}
          />
        )}

        {session && view === "pipeline" && (
          <aside className="hidden lg:flex w-[380px] shrink-0 flex-col border-l border-border bg-muted/30 overflow-y-auto scrollbar-thin">
            <div className="p-4 space-y-3">
              <RunLauncher
                sessionProvider={session.provider}
                starting={startingRun}
                onStart={startRun}
                disabled={!pipelineEnabled || (currentRun?.status === "running")}
                disabledReason={
                  !pipelineEnabled
                    ? "Finalize the brief first."
                    : currentRun?.status === "running"
                      ? "A run is in progress. Kill it first to start another."
                      : undefined
                }
              />
              {currentRun && currentRun.status !== "running" && (
                <div className="text-[11px] text-muted-foreground">
                  Last run <code className="font-mono">{currentRun.id}</code> finished {currentRun.status}. View artifacts in <span className="font-medium text-foreground">Results</span>.
                </div>
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
