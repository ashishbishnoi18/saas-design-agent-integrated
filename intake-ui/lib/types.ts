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
}
