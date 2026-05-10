// Client-safe pipeline-stage parser. Combines stdout markers from
// integrated_pipeline.py + harness.py with artifact file presence (from the
// already-loaded ArtifactsSummary) to produce a stage progression.
//
// File presence is the ground truth for "this stage produced its output."
// Log markers tell us what's *currently* running and provide per-item
// progress so the UI can show a candidate-by-candidate or pair-by-pair view.

import type { ArtifactsSummary, RunStatus } from "./types";

export type StageStatus = "pending" | "running" | "completed" | "failed" | "skipped";

export interface StageItem {
  name: string;          // e.g. strategy name, "a vs b", judge name
  status: StageStatus;
  note?: string;         // e.g. "programmatic 4", "EVALUATOR FAILED: Error 400…"
}

export interface Stage {
  id: string;
  label: string;
  status: StageStatus;
  detail?: string;       // headline note (latest activity, or summary)
  items?: StageItem[];   // sub-items if relevant
  progress?: { done: number; total: number; failed: number };
}

interface ParseInput {
  log: string;
  artifacts?: ArtifactsSummary | null;
  runStatus?: RunStatus;
}

/**
 * Find the latest occurrence of a regex pattern in the log. Returns the
 * match plus the byte offset so callers can decide which markers were
 * "more recent" (used to determine the currently-running stage).
 */
function lastMatch(log: string, re: RegExp): { match: RegExpExecArray; offset: number } | null {
  let last: RegExpExecArray | null = null;
  let lastIndex = -1;
  // The regex must be /g for matchAll-style iteration.
  const flags = re.flags.includes("g") ? re.flags : re.flags + "g";
  const r = new RegExp(re.source, flags);
  let m: RegExpExecArray | null;
  while ((m = r.exec(log)) !== null) {
    last = m;
    lastIndex = m.index;
    if (r.lastIndex === m.index) r.lastIndex++; // safety against zero-width
  }
  return last ? { match: last, offset: lastIndex } : null;
}

function allMatches(log: string, re: RegExp): RegExpExecArray[] {
  const flags = re.flags.includes("g") ? re.flags : re.flags + "g";
  const r = new RegExp(re.source, flags);
  const out: RegExpExecArray[] = [];
  let m: RegExpExecArray | null;
  while ((m = r.exec(log)) !== null) {
    out.push(m);
    if (r.lastIndex === m.index) r.lastIndex++;
  }
  return out;
}

export function parseStages({ log, artifacts, runStatus }: ParseInput): Stage[] {
  const stages: Stage[] = [];
  const isRunning = runStatus === "running";

  // ---- 1. Strategic diagnosis (Agent 01) ----
  const diagStarted = lastMatch(log, /=== AGENT 01: Strategic diagnosis \(([^)]+)\) ===/);
  const diagDone = artifacts ? !!artifacts.strategic_diagnosis : !!log.match(/Deterministic diagnosis validation:/);
  stages.push({
    id: "diagnosis",
    label: "Strategic diagnosis",
    status: diagDone ? "completed" : diagStarted ? "running" : isRunning ? "pending" : "skipped",
    detail: diagStarted?.match[1] ? `via ${diagStarted.match[1]}` : undefined,
  });

  // ---- 2. Deterministic + semantic validation (with repair attempts) ----
  const detLine = log.match(/Deterministic diagnosis validation: passed=(\w+)/);
  const detPassed = detLine?.[1] === "True";
  const semAttempts = allMatches(log, /=== SEMANTIC DIAGNOSIS VALIDATION attempt (\d+) \(([^)]+)\) ===/);
  const repairs = allMatches(log, /validator failed; running diagnosis repair/);
  const gateLine = !!log.match(/Diagnosis gate failed/);

  let validationStatus: StageStatus = "pending";
  if (detLine || semAttempts.length > 0) {
    validationStatus = "running";
    if (semAttempts.length > 0 && !isRunning) validationStatus = detPassed ? "completed" : "failed";
    // If the next stage already started (architect step 1), validation must be done.
    if (log.includes("=== ARCHITECT/EVALUATOR RUN:") || log.includes("=== STEP 1: Architect")) {
      validationStatus = "completed";
    }
    if (gateLine) validationStatus = "failed";
  } else if (!isRunning) {
    validationStatus = "skipped";
  }

  const validationDetail: string[] = [];
  if (detLine) validationDetail.push(`deterministic ${detPassed ? "✓" : "✗"}`);
  if (semAttempts.length > 0) validationDetail.push(`${semAttempts.length} semantic attempt${semAttempts.length === 1 ? "" : "s"}`);
  if (repairs.length > 0) validationDetail.push(`${repairs.length} repair${repairs.length === 1 ? "" : "s"}`);

  stages.push({
    id: "validation",
    label: "Validation + repair loop",
    status: validationStatus,
    detail: validationDetail.join(" · ") || undefined,
  });

  // ---- 3. Architect (per-strategy) ----
  // "=== ARCHITECT/EVALUATOR RUN: 6 strategies ===" tells us the total.
  const archHeader = log.match(/=== ARCHITECT\/EVALUATOR RUN: (\d+) strategies ===/);
  const stratLine = log.match(/Strategies: (.+)/);
  const declaredStrategies = stratLine ? stratLine[1].split(",").map((s) => s.trim()).filter(Boolean) : [];
  const totalCandidates = archHeader ? Number(archHeader[1]) : declaredStrategies.length || (artifacts?.candidates.length ?? 0);

  const archStartLines = allMatches(log, /\[([^\]]+)\] running architect via claude CLI\.\.\./);
  const archWroteLines = allMatches(log, /\[([^\]]+)\] WROTE spec=/);
  const archDoneSet = new Set(archWroteLines.map((m) => m[1]));
  const archCostLine = log.match(/→ (\d+) candidates produced \(architect cost: \$([\d.]+)\)/);

  const archItems: StageItem[] = (declaredStrategies.length ? declaredStrategies : Array.from(new Set([...archStartLines.map((m) => m[1]), ...archWroteLines.map((m) => m[1])])))
    .map((name) => ({
      name,
      status: archDoneSet.has(name) ? "completed" : (archStartLines.some((m) => m[1] === name) || isRunning ? "running" : "pending"),
    }));

  let archStatus: StageStatus = "pending";
  if (archHeader || archStartLines.length > 0) {
    archStatus = archDoneSet.size === totalCandidates && totalCandidates > 0 ? "completed" : "running";
  }
  if (!isRunning && archStatus === "running") archStatus = archDoneSet.size > 0 ? "completed" : "failed";

  stages.push({
    id: "architect",
    label: "Architect (Best-of-N)",
    status: archStatus,
    detail: archCostLine ? `${archCostLine[1]} produced · architect cost $${archCostLine[2]}` : undefined,
    items: archItems.length > 0 ? archItems : undefined,
    progress: totalCandidates > 0 ? { done: archDoneSet.size, total: totalCandidates, failed: 0 } : undefined,
  });

  // ---- 4. Screenshots ----
  // First-pass screenshots happen once per strategy after architect; revisions
  // re-screenshot after Step 3. We treat "any screenshot for that strategy"
  // as "screenshots produced." Use file presence as ground truth.
  const candidatesWithShots = (artifacts?.candidates ?? []).filter((c) => c.shots.length > 0);
  const shotHeader = log.match(/=== STEP 2: Screenshotting (\d+) wireframes ===/);
  const shotTotal = shotHeader ? Number(shotHeader[1]) : totalCandidates;
  let shotStatus: StageStatus = "pending";
  if (shotHeader || candidatesWithShots.length > 0) {
    shotStatus = candidatesWithShots.length >= shotTotal && shotTotal > 0 ? "completed" : "running";
  }
  if (!isRunning && shotStatus === "running") shotStatus = candidatesWithShots.length > 0 ? "completed" : "failed";
  stages.push({
    id: "screenshots",
    label: "Screenshots (3 viewports)",
    status: shotStatus,
    progress: shotTotal > 0 ? { done: candidatesWithShots.length, total: shotTotal, failed: 0 } : undefined,
  });

  // ---- 5. Programmatic checks (per-strategy, with possible revisions) ----
  const progScoreLines = allMatches(log, /\[([^\]]+)\] programmatic score = (\d+) \(([^)]*)/);
  const progRevisionLines = allMatches(log, /\[([^\]]+)\] sending back for revision/);
  const progHeader = log.match(/=== STEP 3: Programmatic checks ===/);
  // file presence: programmatic.<strategy>.json
  const progFiles = new Set((artifacts?.candidates ?? []).filter((c) => c.programmatic_path).map((c) => c.strategy));

  // Latest score per strategy
  const latestScore = new Map<string, { score: number; reason: string }>();
  for (const m of progScoreLines) latestScore.set(m[1], { score: Number(m[2]), reason: m[3].slice(0, 80) });

  const progItems: StageItem[] = Array.from(new Set([...latestScore.keys(), ...progFiles])).map((name) => {
    const s = latestScore.get(name);
    const revised = progRevisionLines.some((m) => m[1] === name);
    return {
      name,
      status: progFiles.has(name) ? "completed" : "running",
      note: s ? `score ${s.score}${revised ? " · revised" : ""}` : undefined,
    };
  });

  let progStatus: StageStatus = "pending";
  if (progHeader || progScoreLines.length > 0) {
    progStatus = progFiles.size >= totalCandidates && totalCandidates > 0 ? "completed" : "running";
  }
  if (!isRunning && progStatus === "running") progStatus = progFiles.size > 0 ? "completed" : "failed";

  stages.push({
    id: "programmatic",
    label: "Programmatic checks",
    status: progStatus,
    detail: progRevisionLines.length > 0 ? `${progRevisionLines.length} revision${progRevisionLines.length === 1 ? "" : "s"} triggered` : undefined,
    items: progItems.length > 0 ? progItems : undefined,
    progress: totalCandidates > 0 ? { done: progFiles.size, total: totalCandidates, failed: 0 } : undefined,
  });

  // ---- 6. Evaluator (per-strategy verdict) ----
  const evalHeader = log.match(/=== STEP 4: Evaluator \(([^)]+)\) on (\d+) candidates ===/);
  const evalFails = allMatches(log, /\[([^\]]+)\] EVALUATOR FAILED: ([^\n]+)/);
  const verdictFiles = new Set((artifacts?.candidates ?? []).filter((c) => c.verdict_path).map((c) => c.strategy));
  const evalTotal = evalHeader ? Number(evalHeader[2]) : totalCandidates;
  const evalFailed = new Map(evalFails.map((m) => [m[1], m[2].slice(0, 120)] as [string, string]));

  const evalItems: StageItem[] = (declaredStrategies.length ? declaredStrategies : Array.from(verdictFiles)).map((name) => ({
    name,
    status: evalFailed.has(name) ? "failed" : verdictFiles.has(name) ? "completed" : (evalHeader ? "running" : "pending"),
    note: evalFailed.get(name),
  }));

  let evalStatus: StageStatus = "pending";
  if (evalHeader) {
    const done = evalItems.filter((i) => i.status === "completed").length;
    const failed = evalItems.filter((i) => i.status === "failed").length;
    if (done + failed >= evalTotal) evalStatus = failed === evalTotal ? "failed" : "completed";
    else evalStatus = "running";
  }
  if (!isRunning && evalStatus === "running") evalStatus = verdictFiles.size > 0 ? "completed" : "failed";

  stages.push({
    id: "evaluator",
    label: "Evaluator verdicts",
    status: evalStatus,
    detail: evalHeader ? `via ${evalHeader[1]}` : undefined,
    items: evalItems.length > 0 ? evalItems : undefined,
    progress: evalTotal > 0 ? { done: verdictFiles.size, total: evalTotal, failed: evalFailed.size } : undefined,
  });

  // ---- 7. Judge panel (optional) ----
  const panelHeader = log.match(/=== JUDGE PANEL on (\d+) candidates ===/);
  const panelLines = allMatches(log, /\[([^\]]+)\] panel judge: (\w+)/);
  const panelDone = !!artifacts?.panel;
  const panelTotal = panelHeader ? Number(panelHeader[1]) : 0;
  // Each candidate gets ~5 judges; count distinct candidates that have had any judge run.
  const panelCandidates = new Set(panelLines.map((m) => m[1]));
  let panelStatus: StageStatus = "pending";
  if (panelHeader) panelStatus = panelDone ? "completed" : "running";
  else if (!isRunning && !panelDone) panelStatus = "skipped";

  stages.push({
    id: "panel",
    label: "Judge panel (multi-perspective)",
    status: panelStatus,
    detail: panelHeader && !panelDone ? `${panelCandidates.size}/${panelTotal} candidates judged` : undefined,
    progress: panelHeader ? { done: panelCandidates.size, total: panelTotal, failed: 0 } : undefined,
  });

  // ---- 8. Blind pairwise (optional) ----
  const blindHeader = log.match(/=== BLIND PAIRWISE SCREENSHOT TOURNAMENT on (\d+) candidates ===/);
  const blindLines = allMatches(log, /\[([^\]]+) vs ([^\]]+)\] blind screenshot judging/);
  const blindCount = artifacts?.blind_pairwise_records.length ?? 0;
  const blindExpected = blindHeader ? (Number(blindHeader[1]) * (Number(blindHeader[1]) - 1)) / 2 : 0;
  let blindStatus: StageStatus = "pending";
  if (blindHeader) blindStatus = blindCount >= blindExpected && blindExpected > 0 ? "completed" : "running";
  else if (!isRunning && blindCount === 0) blindStatus = "skipped";

  stages.push({
    id: "blind",
    label: "Blind pairwise tournament",
    status: blindStatus,
    detail: blindHeader ? `${blindCount}/${blindExpected} pairs judged · ${blindLines.length} started` : undefined,
    progress: blindExpected > 0 ? { done: blindCount, total: blindExpected, failed: 0 } : undefined,
  });

  // ---- 9. Spec-aware pairwise (optional) ----
  const pwHeader = log.match(/=== STEP 5: Pairwise tournament on (\d+) candidates ===/);
  const pwLines = allMatches(log, /\[([^\]]+) vs ([^\]]+)\] pairwise judging/);
  const pwCount = artifacts?.pairwise_records.length ?? 0;
  const pwExpected = pwHeader ? (Number(pwHeader[1]) * (Number(pwHeader[1]) - 1)) / 2 : 0;
  let pwStatus: StageStatus = "pending";
  if (pwHeader) pwStatus = pwCount >= pwExpected && pwExpected > 0 ? "completed" : "running";
  else if (!isRunning && pwCount === 0) pwStatus = "skipped";

  stages.push({
    id: "pairwise",
    label: "Spec-aware pairwise tournament",
    status: pwStatus,
    detail: pwHeader ? `${pwCount}/${pwExpected} pairs judged · ${pwLines.length} started` : undefined,
    progress: pwExpected > 0 ? { done: pwCount, total: pwExpected, failed: 0 } : undefined,
  });

  // ---- 10. Final ranking ----
  const rankingDone = !!artifacts?.ranking?.entries.length;
  let rankStatus: StageStatus = rankingDone ? "completed" : (isRunning ? "pending" : "skipped");
  // If the run is terminal but ranking missing, mark failed.
  if (!isRunning && !rankingDone && (runStatus === "failed" || runStatus === "killed")) rankStatus = "failed";

  stages.push({
    id: "ranking",
    label: "Final ranking",
    status: rankStatus,
    detail: rankingDone && artifacts?.ranking?.winner ? `winner: ${artifacts.ranking.winner}` : undefined,
  });

  return stages;
}

/**
 * Pull the most recent log lines that match any structured marker we know
 * about. Used to render a "recent activity" feed beside the stage list.
 */
export function recentActivity(log: string, max = 8): string[] {
  const patterns: RegExp[] = [
    /=== [^\n]+===/,
    /\[[^\]]+\] WROTE [^\n]+/,
    /\[[^\]]+\] running architect via claude CLI[^\n]*/,
    /\[[^\]]+\] viewport \+ full-page screenshots captured at 3 viewports/,
    /\[[^\]]+\] programmatic score = [^\n]+/,
    /\[[^\]]+\] sending back for revision/,
    /\[[^\]]+\] EVALUATOR FAILED: [^\n]+/,
    /\[[^\]]+\] panel judge: [^\n]+/,
    /\[[^\]]+ vs [^\]]+\] (blind screenshot judging|pairwise judging)/,
    /Deterministic diagnosis validation: [^\n]+/,
    /validator failed; running diagnosis repair/,
    /→ [^\n]+/,
  ];
  const combined = new RegExp(patterns.map((p) => `(?:${p.source})`).join("|"), "g");
  const matches: Array<{ index: number; text: string }> = [];
  let m: RegExpExecArray | null;
  while ((m = combined.exec(log)) !== null) {
    matches.push({ index: m.index, text: m[0].trim() });
    if (combined.lastIndex === m.index) combined.lastIndex++;
  }
  return matches.slice(-max).map((m) => m.text);
}
