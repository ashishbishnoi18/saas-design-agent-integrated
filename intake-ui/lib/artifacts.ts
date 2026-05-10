import { promises as fs } from "node:fs";
import path from "node:path";
import type {
  ArtifactsSummary,
  BlindPairwiseRecord,
  CandidateArtifacts,
  PairwiseRecord,
  PanelData,
  ParsedRanking,
  RankingEntry,
  TournamentData,
} from "./types";

async function fileExists(p: string): Promise<boolean> {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function readJsonIfExists<T>(p: string): Promise<T | undefined> {
  if (!(await fileExists(p))) return undefined;
  try {
    const text = await fs.readFile(p, "utf8");
    return JSON.parse(text) as T;
  } catch {
    return undefined;
  }
}

const NUMERIC_KEYS = new Set([
  "total", "positive", "trope_penalty", "programmatic_score",
  "pairwise_points", "blind_points", "panel_avg",
]);

const BOOL_KEYS = new Set(["hard_floor", "eligible"]);

function tryNumber(v: string): number | undefined {
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

/**
 * Parse a RANKING.txt into structured entries. The format from harness.py is:
 *
 *   FINAL WINNER: <strategy>
 *   Why it won: <text>
 *   Runner-up note: <text>
 *   Synthesis: <text>
 *
 *   <RANKED|BLOCKED|REJECTED> #<n> <strategy>   total= <n> positive= <n> trope_penalty= <n>
 *        key= value key= value ...
 *        panel_scores= {json}
 *        gate_reason: <text>
 *
 * We pluck the headline scalars, keep panel_scores as JSON, and preserve the
 * raw block so the UI can show full context if needed.
 */
export function parseRanking(text: string): ParsedRanking {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const result: ParsedRanking = { entries: [] };

  let current: { entry: RankingEntry; rawLines: string[] } | undefined;

  const flush = () => {
    if (current) {
      current.entry.raw = current.rawLines.join("\n");
      result.entries.push(current.entry);
      current = undefined;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.replace(/\s+$/, "");
    if (!line) continue;

    const winnerMatch = line.match(/^FINAL WINNER:\s*(.+)$/);
    if (winnerMatch) { result.winner = winnerMatch[1].trim(); continue; }
    const whyMatch = line.match(/^Why it won:\s*(.+)$/);
    if (whyMatch) { result.why_won = whyMatch[1].trim(); continue; }
    const runnerMatch = line.match(/^Runner-up note:\s*(.+)$/);
    if (runnerMatch) { result.runner_up_note = runnerMatch[1].trim(); continue; }
    const synthMatch = line.match(/^Synthesis:\s*(.+)$/);
    if (synthMatch) { result.synthesis_note = synthMatch[1].trim(); continue; }

    const head = line.match(/^(?<gate>RANKED|BLOCKED|REJECTED)\s+#(?<rank>\d+)\s+(?<strategy>\S+)\s+(?<rest>.*)$/);
    if (head && head.groups) {
      flush();
      const { gate, rank, strategy, rest } = head.groups;
      const entry: RankingEntry = {
        gate,
        rank: Number(rank),
        strategy,
        total: 0,
        raw: line,
      };
      // Pull headline key= value pairs from the rest, e.g. "total= 1.54 positive= 0.00".
      for (const m of rest.matchAll(/(\w+)=\s*([-\d.]+)/g)) {
        const key = m[1];
        const value = m[2];
        if (NUMERIC_KEYS.has(key)) {
          (entry as unknown as Record<string, number | undefined>)[key] = tryNumber(value);
        }
      }
      current = { entry, rawLines: [line] };
      continue;
    }

    if (current && /^\s/.test(rawLine)) {
      current.rawLines.push(rawLine);
      // Indented continuation: scan for known keys.
      const e = current.entry;
      const trimmed = rawLine.trim();

      const gateReason = trimmed.match(/^gate_reason:\s*(.+)$/);
      if (gateReason) { e.gate_reason = gateReason[1].trim(); continue; }

      const panelScores = trimmed.match(/^panel_scores=\s*(\{.*\})\s*$/);
      if (panelScores) {
        try { e.panel_scores = JSON.parse(panelScores[1]); } catch { /* ignore */ }
        continue;
      }

      const progGate = trimmed.match(/^programmatic_gate=\s*(\w+)/);
      if (progGate) e.programmatic_gate = progGate[1];

      for (const m of trimmed.matchAll(/(\w+)=\s*([-\dA-Za-z._]+)/g)) {
        const key = m[1];
        const value = m[2];
        if (NUMERIC_KEYS.has(key)) {
          (e as unknown as Record<string, number | undefined>)[key] = tryNumber(value);
        } else if (BOOL_KEYS.has(key)) {
          (e as unknown as Record<string, boolean | undefined>)[key] = value === "True";
        }
      }
      continue;
    }
  }
  flush();
  return result;
}

const SHOT_RE = /^shot\.(.+)\.(desktop|tablet|mobile)\.(viewport|full)\.png$/;

async function discoverCandidates(outDir: string): Promise<CandidateArtifacts[]> {
  const entries = await fs.readdir(outDir);
  const byStrategy = new Map<string, CandidateArtifacts>();
  const ensure = (strategy: string): CandidateArtifacts => {
    let c = byStrategy.get(strategy);
    if (!c) {
      c = { strategy, shots: [] };
      byStrategy.set(strategy, c);
    }
    return c;
  };

  for (const name of entries) {
    if (name.startsWith("UI_SPEC.") && name.endsWith(".md")) {
      const strategy = name.slice("UI_SPEC.".length, -".md".length);
      ensure(strategy).ui_spec_path = name;
    } else if (name.startsWith("wireframe.") && name.endsWith(".html")) {
      const strategy = name.slice("wireframe.".length, -".html".length);
      ensure(strategy).wireframe_path = name;
    } else if (name.startsWith("programmatic.") && name.endsWith(".json")) {
      const strategy = name.slice("programmatic.".length, -".json".length);
      ensure(strategy).programmatic_path = name;
    } else if (name.startsWith("verdict.") && name.endsWith(".txt")) {
      const strategy = name.slice("verdict.".length, -".txt".length);
      ensure(strategy).verdict_path = name;
    } else {
      const m = name.match(SHOT_RE);
      if (m) {
        const [, strategy, viewport, kind] = m;
        ensure(strategy).shots.push({
          viewport,
          kind: kind as "viewport" | "full",
          path: name,
        });
      }
    }
  }

  for (const c of byStrategy.values()) {
    c.shots.sort((a, b) => {
      const order = { desktop: 0, tablet: 1, mobile: 2 } as const;
      const av = order[a.viewport as keyof typeof order] ?? 9;
      const bv = order[b.viewport as keyof typeof order] ?? 9;
      if (av !== bv) return av - bv;
      return a.kind.localeCompare(b.kind);
    });
  }

  return Array.from(byStrategy.values()).sort((a, b) => a.strategy.localeCompare(b.strategy));
}

async function discoverPairwise(outDir: string): Promise<{
  pairwise: PairwiseRecord[];
  blind: BlindPairwiseRecord[];
}> {
  const entries = await fs.readdir(outDir);
  const pairwise: PairwiseRecord[] = [];
  const blind: BlindPairwiseRecord[] = [];

  for (const name of entries) {
    if (name.startsWith("pairwise.") && name.endsWith(".json") && !name.startsWith("pairwise.blind")) {
      const obj = await readJsonIfExists<Omit<PairwiseRecord, "source_file">>(path.join(outDir, name));
      if (obj) pairwise.push({ ...obj, source_file: name });
    } else if (name.startsWith("blind_pairwise.") && name.endsWith(".json")) {
      const obj = await readJsonIfExists<Omit<BlindPairwiseRecord, "source_file">>(path.join(outDir, name));
      if (obj) blind.push({ ...obj, source_file: name });
    }
  }

  return { pairwise, blind };
}

// findPair lives in ./pairwise so client components can import it without
// pulling in this file's node:fs / node:path imports.
export { findPair } from "./pairwise";

export async function loadArtifactsSummary(outDir: string): Promise<ArtifactsSummary> {
  const summary: ArtifactsSummary = {
    out_dir: outDir,
    candidates: [],
    pairwise_records: [],
    blind_pairwise_records: [],
    has_pipeline_input: await fileExists(path.join(outDir, "pipeline_input.json")),
    has_strategic_diagnosis: await fileExists(path.join(outDir, "strategic_diagnosis.json")),
  };

  const rankingPath = path.join(outDir, "RANKING.txt");
  if (await fileExists(rankingPath)) {
    const text = await fs.readFile(rankingPath, "utf8");
    summary.ranking = parseRanking(text);
  }

  summary.panel = await readJsonIfExists<PanelData>(path.join(outDir, "PANEL.json"));
  summary.tournament = await readJsonIfExists<TournamentData>(path.join(outDir, "TOURNAMENT.json"));
  summary.blind_tournament = await readJsonIfExists<TournamentData>(path.join(outDir, "TOURNAMENT.blind.json"));
  summary.strategic_diagnosis = await readJsonIfExists(path.join(outDir, "strategic_diagnosis.json"));

  try {
    summary.candidates = await discoverCandidates(outDir);
  } catch {
    summary.candidates = [];
  }

  try {
    const pairs = await discoverPairwise(outDir);
    summary.pairwise_records = pairs.pairwise;
    summary.blind_pairwise_records = pairs.blind;
  } catch {
    /* pairwise data is optional */
  }

  return summary;
}
