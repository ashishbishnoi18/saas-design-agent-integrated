export type CliProvider = "claude-cli" | "codex-cli";

export type Role = "interviewer" | "user" | "system";

export type MessageType = "question" | "pushback" | "trade_off" | "summary" | "user" | "note";

export interface Message {
  id: string;
  role: Role;
  type: MessageType;
  content: string;
  target_axis?: string;
  rationale?: string;
  created_at: number;
}

export interface AxisConfidence {
  axis: string;
  confidence: number;
  why: string;
}

export interface DiagnosisPreview {
  one_sentence_summary: string;
  detected_archetype: string;
  detected_market_type: string;
  detected_sales_motion: string;
  axes: AxisConfidence[];
  missing_critical_info: string[];
  open_questions: string[];
  ready_for_full_diagnosis: boolean;
  overall_confidence: number;
}

export interface FinalBrief {
  raw_brief: string;
  optional_business_context: string;
  optional_known_constraints: string;
  optional_user_preferences: string;
  optional_existing_site_or_brand_notes: string;
}

export interface Session {
  id: string;
  created_at: number;
  updated_at: number;
  provider: CliProvider;
  messages: Message[];
  preview?: DiagnosisPreview;
  final_brief?: FinalBrief;
  latest_run_id?: string;
}

export type RunStatus = "running" | "completed" | "failed" | "killed";

export interface RunOptions {
  diagnosis_provider: string;
  validator_provider: string;
  evaluator_provider: string;
  use_diagnosis_strategies: boolean;
  judge_panel: boolean;
  blind_pairwise: boolean;
  pairwise: boolean;
  synthesize_top_k: number;
}

export interface RunRecord {
  id: string;
  session_id: string;
  status: RunStatus;
  started_at: number;
  ended_at?: number;
  exit_code?: number;
  pid?: number;
  command: string[];
  input_path: string;
  out_dir: string;
  options: RunOptions;
  error?: string;
}

export interface RankingEntry {
  gate: "RANKED" | "BLOCKED" | "REJECTED" | string;
  rank: number;
  strategy: string;
  total: number;
  positive?: number;
  trope_penalty?: number;
  programmatic_gate?: string;
  programmatic_score?: number;
  hard_floor?: boolean;
  eligible?: boolean;
  pairwise_points?: number;
  blind_points?: number;
  panel_avg?: number;
  panel_scores?: Record<string, number>;
  gate_reason?: string;
  raw: string;
}

export interface ParsedRanking {
  winner?: string;
  why_won?: string;
  runner_up_note?: string;
  synthesis_note?: string;
  entries: RankingEntry[];
}

export interface PanelData {
  judges: string[];
  candidates: Record<string, {
    panel_average: number;
    panel_scores: Record<string, number>;
    hard_failures?: string[];
  }>;
}

export interface TournamentData {
  pairwise_enabled?: boolean;
  participants?: string[];
  points?: Record<string, number>;
  records?: Record<string, { wins: number; losses: number; ties: number }>;
}

export interface CandidateArtifacts {
  strategy: string;
  ui_spec_path?: string;
  wireframe_path?: string;
  programmatic_path?: string;
  verdict_path?: string;
  shots: Array<{ viewport: string; kind: "viewport" | "full"; path: string }>;
}

export interface PairwiseRecord {
  candidate_a: string;
  candidate_b: string;
  winner: "A" | "B" | "tie" | string;
  confidence?: number;
  scores?: Record<string, string>;
  reasoning?: string;
  best_reusable_move_a?: string;
  best_reusable_move_b?: string;
  synthesis_recommended?: boolean;
  source_file: string;
}

export interface BlindPairwiseRecord {
  candidate_a: string;
  candidate_b: string;
  winner: "A" | "B" | "tie" | string;
  confidence?: number;
  perception?: Record<string, string>;
  reasoning?: string;
  blocking_visual_issue_a?: string;
  blocking_visual_issue_b?: string;
  source_file: string;
}

export interface ArtifactsSummary {
  out_dir: string;
  ranking?: ParsedRanking;
  panel?: PanelData;
  tournament?: TournamentData;
  blind_tournament?: TournamentData;
  candidates: CandidateArtifacts[];
  pairwise_records: PairwiseRecord[];
  blind_pairwise_records: BlindPairwiseRecord[];
  strategic_diagnosis?: unknown;
  has_pipeline_input: boolean;
  has_strategic_diagnosis: boolean;
}
