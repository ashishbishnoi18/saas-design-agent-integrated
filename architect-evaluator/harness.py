#!/usr/bin/env python3
"""
architect-evaluator harness — hybrid edition.

Pipeline:
  1. Receive a confirmed intake summary.
  2. Spawn N parallel architect runs via Claude Code CLI (`claude -p`),
     each with a different --strategy assignment. The architect writes
     the spec and HTML wireframe files directly via the Write tool.
  3. For each completed candidate:
     a. Render the wireframe at three viewports via Playwright.
     b. Run programmatic checks (deterministic, fast).
     c. If checks reveal repairable failures, send back to the architect
        for one targeted revision pass.
     d. Invoke the evaluator via Gemini, OpenAI, or Anthropic vision API with
        spec + wireframe + screenshots + check JSON.
  4. Collect verdicts, rank by weighted total, return top-k.

Why hybrid:
  - The CLI runs the architect natively: file writing via Write tool, no
    delimiter-block hacks, billable against Pro/Max if you have it.
  - A separate API adapter runs the evaluator: reliable multimodal image input
    and the option to use a different model family from the architect.

Required prerequisites:
  - Claude Code installed (`npm install -g @anthropic-ai/claude-code`)
  - Either ui-architect installed in .claude/agents/ (use --use-installed-agent)
    OR run from the directory containing ui-architect.md and friends so the
    harness can build the system prompt inline.
  - Playwright (`pip install playwright && playwright install chromium`)
  - One of:
    * Gemini: `pip install google-genai` and `GOOGLE_API_KEY` env var
    * OpenAI: `pip install openai` and `OPENAI_API_KEY` env var
    * Anthropic: `pip install anthropic` and `ANTHROPIC_API_KEY` env var
"""

from __future__ import annotations

import argparse
import asyncio
import base64
import dataclasses
import html.parser
import itertools
import json
import os
import pathlib
import re
import shutil
import sys
from typing import Any, Protocol

from playwright.async_api import async_playwright

# ────────────────────────────────────────────────────────────────────────────
# Configuration
# ────────────────────────────────────────────────────────────────────────────

DEFAULT_STRATEGIES = [
    "action-first",
    "evidence-first",
    "split-action-evidence",
    "problem-risk-first",
    "audience-self-selection",
    "content-teaching-first",
    "comparison-first",
    "workflow-walkthrough-first",
    "density-led",
    "unconventional",
]

VIEWPORTS = [
    ("desktop", 1440, 900),
    ("tablet", 768, 1024),
    ("mobile", 390, 844),
]

DIMENSION_WEIGHTS = {
    "business_outcome_fit": 0.30,
    "objection_resolution": 0.20,
    "wireframe_quality": 0.20,
    "decision_map_fidelity": 0.10,
    "mobile_conversion_path": 0.10,
    "strategy_commitment": 0.10,
}

DEFAULT_MODEL_ENV_VARS = {
    "gemini": "ARCH_EVAL_GEMINI_MODEL",
    "openai": "ARCH_EVAL_OPENAI_MODEL",
    "anthropic": "ARCH_EVAL_ANTHROPIC_MODEL",
    "claude-cli": "ARCH_EVAL_CLAUDE_CLI_MODEL",
    "codex-cli": "ARCH_EVAL_CODEX_MODEL",
}

# Provider IDs change. Prefer explicit env/CLI overrides in production.
# Fallbacks were checked against official provider docs on 2026-05-09.
FALLBACK_EVALUATOR_MODELS = {
    "gemini": "gemini-3.1-pro-preview",
    "openai": "gpt-5.5",
    "anthropic": "claude-opus-4-7",
    "claude-cli": "sonnet",
    "codex-cli": "gpt-5.5",
}

EVALUATOR_PROVIDER_CHOICES = ["gemini", "openai", "anthropic", "claude-cli", "codex-cli"]

QUALITY_RANK = {
    "exceptional": 5,
    "strong": 4,
    "competent": 3,
    "weak-trope": 2,
    "broken": 1,
}


# ────────────────────────────────────────────────────────────────────────────
# Data classes
# ────────────────────────────────────────────────────────────────────────────


@dataclasses.dataclass
class ScreenshotBundle:
    viewport: pathlib.Path | None
    full: pathlib.Path | None
    legacy: pathlib.Path | None = None


@dataclasses.dataclass
class ReferenceItem:
    id: str
    domain: str | None = None
    strategy: str | None = None
    audience: str | None = None
    industry: str | None = None
    page_type: str | None = None
    archetype: str | None = None
    visual_posture: str | None = None
    sales_motion: str | None = None
    primary_user_job: str | None = None
    quality_tier: str | None = None
    source_url: str | None = None
    what_works: list[str] = dataclasses.field(default_factory=list)
    what_to_avoid: list[str] = dataclasses.field(default_factory=list)
    structural_moves: list[str] = dataclasses.field(default_factory=list)
    trope_index: float | None = None
    notes: str = ""
    wireframe_path: pathlib.Path | None = None
    desktop_screenshot: pathlib.Path | None = None
    mobile_screenshot: pathlib.Path | None = None


@dataclasses.dataclass
class Candidate:
    strategy: str
    spec_path: pathlib.Path
    wireframe_path: pathlib.Path
    screenshots: dict[str, ScreenshotBundle] = dataclasses.field(default_factory=dict)
    programmatic_results: dict[str, Any] = dataclasses.field(default_factory=dict)
    evaluator_verdict: str | None = None
    parsed_scores: dict[str, float] = dataclasses.field(default_factory=dict)
    weighted_positive_total: float = 0.0
    weighted_total: float = 0.0
    programmatic_score: float = 0.0
    programmatic_passed: bool = False
    hard_floor_violated: bool = False
    eligible_for_final_ranking: bool = False
    revision_number: int = 0
    pairwise_points: float = 0.0
    pairwise_record: dict[str, int] = dataclasses.field(
        default_factory=lambda: {"wins": 0, "losses": 0, "ties": 0}
    )
    blind_pairwise_points: float = 0.0
    blind_pairwise_record: dict[str, int] = dataclasses.field(
        default_factory=lambda: {"wins": 0, "losses": 0, "ties": 0}
    )
    panel_scores: dict[str, float] = dataclasses.field(default_factory=dict)
    panel_average: float = 0.0
    panel_hard_failures: list[str] = dataclasses.field(default_factory=list)
    cli_cost_usd: float = 0.0


@dataclasses.dataclass
class RunConfig:
    intake_summary: str
    out_dir: pathlib.Path
    strategies: list[str]
    references_dir: pathlib.Path | None
    architect_prompt_path: pathlib.Path
    evaluator_prompt_path: pathlib.Path
    knowledge_dir: pathlib.Path
    evaluator_provider: str  # "gemini" | "openai"
    evaluator_model: str
    max_revisions: int = 1
    use_installed_agent: bool = False
    pairwise: bool = False
    pairwise_top_k: int = 10
    blind_pairwise: bool = False
    judge_panel: bool = False
    panel_weight: float = 0.20
    synthesize_top_k: int = 0
    strategic_diagnosis_path: pathlib.Path | None = None
    validator_result_path: pathlib.Path | None = None
    strategic_diagnosis: dict[str, Any] = dataclasses.field(default_factory=dict)
    validator_result: dict[str, Any] = dataclasses.field(default_factory=dict)
    strategy_seed_map: dict[str, dict[str, Any]] = dataclasses.field(default_factory=dict)
    dimension_weights: dict[str, float] = dataclasses.field(
        default_factory=lambda: dict(DIMENSION_WEIGHTS)
    )
    reference_items: list[ReferenceItem] = dataclasses.field(default_factory=list)


# ────────────────────────────────────────────────────────────────────────────
# Utilities
# ────────────────────────────────────────────────────────────────────────────


def _read(path: pathlib.Path) -> str:
    return path.read_text(encoding="utf-8")


def _read_optional(path: pathlib.Path, max_chars: int | None = None) -> str:
    if not path.exists():
        return ""
    text = path.read_text(encoding="utf-8", errors="replace")
    return text[:max_chars] if max_chars is not None else text


def _default_evaluator_model(provider: str) -> str:
    env_name = DEFAULT_MODEL_ENV_VARS[provider]
    return os.environ.get(env_name) or FALLBACK_EVALUATOR_MODELS[provider]


def _normalize_strategy_name(raw: str) -> str:
    """Normalize arbitrary diagnosis/CLI strategy labels into safe kebab slugs."""
    value = re.sub(r"\s+", "-", raw.strip().lower())
    value = value.replace("_", "-")
    value = re.sub(r"[^a-z0-9-]+", "-", value)
    value = re.sub(r"-+", "-", value).strip("-")
    return value or "strategy"


def _dedupe_preserve_order(values: list[str]) -> list[str]:
    seen: set[str] = set()
    out: list[str] = []
    for value in values:
        if value not in seen:
            out.append(value)
            seen.add(value)
    return out


def _load_json_file(path: pathlib.Path | None) -> dict[str, Any]:
    if not path:
        return {}
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError:
        raise RuntimeError(f"JSON file not found: {path}")
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"Invalid JSON in {path}: {exc}") from exc


def _build_strategy_seed_map(diagnosis: dict[str, Any]) -> dict[str, dict[str, Any]]:
    seeds = diagnosis.get("candidate_strategy_seeds") or []
    result: dict[str, dict[str, Any]] = {}
    for seed in seeds:
        if not isinstance(seed, dict):
            continue
        raw = str(seed.get("strategy_name") or "").strip()
        if not raw:
            continue
        slug = _normalize_strategy_name(raw)
        result[slug] = seed
    return result


def _strategies_from_diagnosis(diagnosis: dict[str, Any], fallback: list[str]) -> list[str]:
    strategies = list(_build_strategy_seed_map(diagnosis).keys())
    return _dedupe_preserve_order(strategies or fallback)


def _adapt_dimension_weights_from_diagnosis(diagnosis: dict[str, Any]) -> dict[str, float]:
    """Map Agent-01 dynamic evaluator weights onto the legacy evaluator dimensions.

    The strategic diagnosis uses more semantic dimensions than the original
    architect evaluator. This adapter keeps old verdict parsing intact while
    making the final weighted total responsive to the diagnosis.
    """
    weights = (
        diagnosis.get("dynamic_evaluator_policy", {}).get("weights", {})
        if diagnosis
        else {}
    )
    if not weights:
        return dict(DIMENSION_WEIGHTS)

    def w(name: str) -> float:
        try:
            return max(0.0, float(weights.get(name, 0.0)))
        except (TypeError, ValueError):
            return 0.0

    mapped = {
        "business_outcome_fit": w("strategic_diagnosis_fit") + 0.45 * w("functional_clarity"),
        "objection_resolution": w("trust_and_proof"),
        "wireframe_quality": w("visual_appropriateness") + 0.35 * w("anti_pattern_avoidance"),
        "decision_map_fidelity": w("content_sequence") + 0.20 * w("strategic_diagnosis_fit"),
        "mobile_conversion_path": w("mobile_path"),
        "strategy_commitment": w("first_viewport_fit") + 0.25 * w("anti_pattern_avoidance"),
    }
    total = sum(mapped.values())
    if total <= 0:
        return dict(DIMENSION_WEIGHTS)
    return {key: value / total for key, value in mapped.items()}


def _format_strategic_handoff_for_prompt(
    diagnosis: dict[str, Any], validator_result: dict[str, Any] | None = None
) -> str:
    if not diagnosis:
        return "No strategic diagnosis was provided. Use the raw intake and general evaluator policy."

    compact = {
        "diagnosis_id": diagnosis.get("diagnosis_id"),
        "primary_hypothesis": diagnosis.get("primary_hypothesis"),
        "strategic_axes": diagnosis.get("strategic_axes"),
        "audience_model": diagnosis.get("audience_model"),
        "business_model": diagnosis.get("business_model"),
        "decision_context": diagnosis.get("decision_context"),
        "beauty_function_balance": diagnosis.get("beauty_function_balance"),
        "design_directive": diagnosis.get("design_directive"),
        "first_viewport_obligation": diagnosis.get("first_viewport_obligation"),
        "hard_floors": diagnosis.get("hard_floors"),
        "anti_patterns": diagnosis.get("anti_patterns"),
        "dynamic_evaluator_policy": diagnosis.get("dynamic_evaluator_policy"),
        "candidate_strategy_seeds": diagnosis.get("candidate_strategy_seeds"),
        "reference_retrieval_profile": diagnosis.get("reference_retrieval_profile"),
        "downstream_constraints": diagnosis.get("downstream_constraints"),
        "assumptions": diagnosis.get("assumptions"),
        "open_questions": diagnosis.get("open_questions"),
        "confidence": diagnosis.get("confidence"),
    }
    if validator_result:
        compact["semantic_validator_result"] = {
            "passed": validator_result.get("passed"),
            "safe_to_pass_downstream": validator_result.get("safe_to_pass_downstream"),
            "overall_score": validator_result.get("overall_score"),
            "blocking_failures": validator_result.get("blocking_failures"),
            "repair_directive": validator_result.get("repair_directive"),
        }
    return json.dumps(compact, indent=2, ensure_ascii=False)


def _normalize_quality(value: str | None) -> str:
    return (value or "competent").strip().lower()


def load_reference_library(references_dir: pathlib.Path) -> list[ReferenceItem]:
    """Load curated reference metadata from references/**/meta.json.

    This intentionally does not scrape. It only consumes local curated examples
    and includes enough textual content for API prompts that cannot read paths.
    """
    if not references_dir.exists():
        return []

    references: list[ReferenceItem] = []
    for meta_path in sorted(references_dir.rglob("meta.json")):
        try:
            meta = json.loads(meta_path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as exc:
            print(f"[references] skipping {meta_path}: {exc}", file=sys.stderr)
            continue

        ref_dir = meta_path.parent
        item = ReferenceItem(
            id=str(meta.get("id") or ref_dir.name),
            domain=meta.get("domain"),
            strategy=meta.get("strategy"),
            audience=meta.get("audience"),
            industry=meta.get("industry"),
            page_type=meta.get("page_type"),
            archetype=meta.get("archetype"),
            visual_posture=meta.get("visual_posture"),
            sales_motion=meta.get("sales_motion"),
            primary_user_job=meta.get("primary_user_job"),
            quality_tier=meta.get("quality_tier"),
            source_url=meta.get("source_url"),
            what_works=list(meta.get("what_works") or []),
            what_to_avoid=list(meta.get("what_to_avoid") or []),
            structural_moves=list(meta.get("structural_moves") or []),
            trope_index=meta.get("trope_index"),
            notes=_read_optional(ref_dir / "notes.md", max_chars=1400),
            wireframe_path=(ref_dir / "wireframe.html")
            if (ref_dir / "wireframe.html").exists()
            else None,
            desktop_screenshot=(ref_dir / "screenshot-desktop.png")
            if (ref_dir / "screenshot-desktop.png").exists()
            else None,
            mobile_screenshot=(ref_dir / "screenshot-mobile.png")
            if (ref_dir / "screenshot-mobile.png").exists()
            else None,
        )
        references.append(item)
    return references


def select_references_for_strategy(
    references: list[ReferenceItem],
    intake_summary: str,
    strategy: str,
    max_items: int = 8,
) -> list[ReferenceItem]:
    if not references or max_items <= 0:
        return []

    intake_l = intake_summary.lower()

    def score(ref: ReferenceItem) -> tuple[int, int, str]:
        points = 0
        if ref.strategy and ref.strategy.lower() == strategy.lower():
            points += 50
        if ref.domain and ref.domain.lower() in intake_l:
            points += 12
        if ref.industry and ref.industry.lower() in intake_l:
            points += 8
        if ref.archetype and ref.archetype.lower().replace("_", " ") in intake_l:
            points += 8
        if ref.page_type and ref.page_type.lower().replace("_", " ") in intake_l:
            points += 6
        if ref.sales_motion and ref.sales_motion.lower().replace("_", " ") in intake_l:
            points += 4
        quality = _normalize_quality(ref.quality_tier)
        points += QUALITY_RANK.get(quality, 3)
        if quality in {"exceptional", "strong"}:
            points += 10
        if quality == "weak-trope":
            points += 6
        if ref.trope_index is not None:
            points += max(0, int((1.0 - float(ref.trope_index)) * 5))
        return (points, QUALITY_RANK.get(quality, 3), ref.id)

    exact_or_domain = sorted(references, key=score, reverse=True)
    selected: list[ReferenceItem] = []
    seen: set[str] = set()

    for ref in exact_or_domain:
        if len(selected) >= max_items:
            break
        if ref.id in seen:
            continue
        selected.append(ref)
        seen.add(ref.id)

    # Make sure negative calibration examples are represented when available.
    if len(selected) < max_items:
        for ref in references:
            if _normalize_quality(ref.quality_tier) != "weak-trope" or ref.id in seen:
                continue
            selected.append(ref)
            seen.add(ref.id)
            if len(selected) >= max_items:
                break

    return selected[:max_items]


def format_reference_pack_for_prompt(refs: list[ReferenceItem]) -> str:
    if not refs:
        return (
            "No curated references were loaded. Do not invent reference IDs. "
            "Use only the general trope rubric."
        )

    lines = [
        "REFERENCE PACK (curated taste calibration; use moves, do not copy layouts):"
    ]
    for ref in refs:
        quality = _normalize_quality(ref.quality_tier)
        lines.append("")
        lines.append(f"- ID: {ref.id}")
        lines.append(
            f"  domain={ref.domain or 'unknown'} | strategy={ref.strategy or 'unknown'} | "
            f"audience={ref.audience or 'unknown'} | industry={ref.industry or 'unknown'} | "
            f"page_type={ref.page_type or 'unknown'} | archetype={ref.archetype or 'unknown'} | "
            f"visual_posture={ref.visual_posture or 'unknown'} | sales_motion={ref.sales_motion or 'unknown'} | "
            f"quality={quality} | trope_index={ref.trope_index if ref.trope_index is not None else 'n/a'}"
        )
        if ref.primary_user_job:
            lines.append(f"  primary_user_job: {ref.primary_user_job}")
        if ref.what_works:
            lines.append("  what_works:")
            lines.extend(f"    - {item}" for item in ref.what_works[:6])
        if ref.structural_moves:
            lines.append(
                "  structural_moves: " + ", ".join(ref.structural_moves[:10])
            )
        if ref.what_to_avoid:
            lines.append("  what_to_avoid:")
            lines.extend(f"    - {item}" for item in ref.what_to_avoid[:6])
        if ref.notes.strip():
            one_line_notes = re.sub(r"\s+", " ", ref.notes.strip())
            lines.append(f"  notes: {one_line_notes[:700]}")
        if ref.wireframe_path:
            excerpt = _read_optional(ref.wireframe_path, max_chars=900)
            if excerpt:
                lines.append("  wireframe_excerpt:")
                lines.append("  ```html")
                lines.append(excerpt)
                lines.append("  ```")
    return "\n".join(lines)


# ────────────────────────────────────────────────────────────────────────────
# Architect via Claude Code CLI
# ────────────────────────────────────────────────────────────────────────────


def _build_architect_system_prompt(cfg: RunConfig) -> str:
    """Concatenate architect prompt + knowledge files for inline mode."""
    architect_prompt = _read(cfg.architect_prompt_path)
    parts = [architect_prompt]
    knowledge_files = [
        "intake-rules.md",
        "layout-principles.md",
        "ux-heuristics.md",
        "responsive-patterns.md",
        "wireframe-html-format.md",
        "structural-references.md",
    ]
    for kf in knowledge_files:
        kf_path = cfg.knowledge_dir / kf
        if kf_path.exists():
            parts.append(f"\n\n--- KNOWLEDGE: {kf} ---\n\n{_read(kf_path)}")
    output_spec_path = cfg.knowledge_dir.parent / "output-spec.md"
    if output_spec_path.exists():
        parts.append(f"\n\n--- OUTPUT SPEC ---\n\n{_read(output_spec_path)}")
    return "\n".join(parts)


def _build_architect_user_prompt(
    cfg: RunConfig, strategy: str, revision_directive: str | None = None
) -> str:
    spec_path = cfg.out_dir / f"UI_SPEC.{strategy}.md"
    wf_path = cfg.out_dir / f"wireframe.{strategy}.html"
    parts = [
        "You are the ui-architect agent. Run in SEARCH MODE.",
        "",
        f"--search-mode --strategy={strategy}",
        "",
        "INTAKE SUMMARY (already confirmed; do not re-run intake):",
        "```",
        cfg.intake_summary.strip(),
        "```",
        "",
        "STRATEGIC DIAGNOSIS HANDOFF (binding if provided):",
        "```json",
        _format_strategic_handoff_for_prompt(cfg.strategic_diagnosis, cfg.validator_result),
        "```",
        "",
        f"Your assigned strategy: {strategy}",
        "",
        "Produce all 12 output sections AND the HTML wireframe artifact.",
        "Use the Write tool to create both files at exactly these paths:",
        f"  Spec:      {spec_path}",
        f"  Wireframe: {wf_path}",
        "",
        "After both files are written, output a single line:",
        f"  STRATEGY={strategy} | SPEC={spec_path} | WIREFRAME={wf_path} | LOCAL_OPTIMUM_AVOIDED=<brief>",
    ]
    seed = cfg.strategy_seed_map.get(strategy)
    if seed:
        parts.append("")
        parts.append("DIAGNOSIS STRATEGY SEED FOR THIS RUN:")
        parts.append("```json")
        parts.append(json.dumps(seed, indent=2, ensure_ascii=False))
        parts.append("```")
    if cfg.strategic_diagnosis:
        parts.append("")
        parts.append(
            "Diagnosis compliance is mandatory. In the markdown spec, include explicit "
            "sub-blocks named exactly: STRATEGIC DIAGNOSIS MAPPING:, FIRST VIEWPORT "
            "OBLIGATION:, HARD FLOOR COVERAGE:, and ANTI-PATTERN AVOIDANCE:. Map every "
            "primary component to at least one strategic axis, decision-sequence step, "
            "first-viewport obligation or hard floor, user/buyer need, and avoided anti-pattern."
        )
    if cfg.references_dir:
        refs = select_references_for_strategy(
            cfg.reference_items, cfg.intake_summary, strategy
        )
        parts.append("")
        parts.append(f"Reference library root: {cfg.references_dir}")
        parts.append(format_reference_pack_for_prompt(refs))
        parts.append(
            "Use references for taste calibration. Extract structural moves and "
            "family resemblance cues, include weak-trope examples as anti-patterns, "
            "and do not copy layouts."
        )
    if revision_directive:
        parts.append("")
        parts.append("REVISION REQUIRED. Programmatic checks failed:")
        parts.append(revision_directive)
        parts.append("Fix these specific issues and re-write both files.")
    return "\n".join(parts)


async def _call_architect_cli(
    cfg: RunConfig, strategy: str, revision_directive: str | None = None
) -> dict[str, Any]:
    """Invoke claude -p as a subprocess with the architect agent."""
    if shutil.which("claude") is None:
        raise RuntimeError(
            "claude CLI not found on PATH. "
            "Install with: npm install -g @anthropic-ai/claude-code"
        )

    user_prompt = _build_architect_user_prompt(cfg, strategy, revision_directive)
    architect_model = os.environ.get("ARCH_CLI_MODEL", "sonnet")
    cmd = [
        "claude", "-p", user_prompt,
        "--model", architect_model,
        "--allowedTools", "Read,Write,Edit,Bash,Glob,Grep",
        "--permission-mode", "acceptEdits",
        "--output-format", "json",
    ]

    if not cfg.use_installed_agent:
        # Inline the agent's system prompt so the user doesn't need to install
        # the agent in .claude/agents/. This passes the full ~70KB prompt as a
        # CLI argument; on Windows ARG_MAX may be a problem and you'll want to
        # install the agent properly there instead.
        system_prompt = _build_architect_system_prompt(cfg)
        cmd.extend(["--append-system-prompt", system_prompt])

    # Strip ANTHROPIC_API_KEY so claude CLI uses the Max/Pro subscription
    # auth instead of routing through API credit (which can be empty).
    env = {k: v for k, v in os.environ.items() if k != "ANTHROPIC_API_KEY"}
    proc = await asyncio.create_subprocess_exec(
        *cmd,
        stdin=asyncio.subprocess.DEVNULL,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
        env=env,
    )
    stdout, stderr = await proc.communicate()
    out_text = stdout.decode(errors="replace")
    err_text = stderr.decode(errors="replace")
    if proc.returncode != 0 or "Credit balance is too low" in out_text:
        return {
            "error": f"claude -p exited {proc.returncode}",
            "stderr": err_text[:2000],
            "stdout": out_text[:2000],
        }
    try:
        return json.loads(out_text)
    except json.JSONDecodeError as e:
        return {
            "error": f"Could not parse claude -p JSON output: {e}",
            "raw": out_text[:2000],
        }


async def _run_architect_for_strategy(
    cfg: RunConfig, strategy: str
) -> Candidate | None:
    spec_path = cfg.out_dir / f"UI_SPEC.{strategy}.md"
    wf_path = cfg.out_dir / f"wireframe.{strategy}.html"

    print(f"[{strategy}] running architect via claude CLI...")
    result = await _call_architect_cli(cfg, strategy)
    if "error" in result:
        print(f"[{strategy}] FAILED: {result['error']}")
        (cfg.out_dir / f"_error.{strategy}.json").write_text(
            json.dumps(result, indent=2), encoding="utf-8"
        )
        return None

    if not spec_path.exists() or not wf_path.exists():
        print(
            f"[{strategy}] FAILED — architect did not write expected files. "
            f"spec={spec_path.exists()} wireframe={wf_path.exists()}"
        )
        (cfg.out_dir / f"_no-files.{strategy}.json").write_text(
            json.dumps(result, indent=2), encoding="utf-8"
        )
        return None

    cost = float(result.get("total_cost_usd", 0.0))
    print(
        f"[{strategy}] WROTE spec={spec_path.name} wireframe={wf_path.name} "
        f"cost=${cost:.4f}"
    )
    candidate = Candidate(strategy=strategy, spec_path=spec_path, wireframe_path=wf_path)
    candidate.cli_cost_usd = cost
    return candidate


# ────────────────────────────────────────────────────────────────────────────
# Wireframe screenshot
# ────────────────────────────────────────────────────────────────────────────


async def _screenshot_wireframe(candidate: Candidate, out_dir: pathlib.Path) -> None:
    candidate.screenshots = {}
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for vp_name, w, h in VIEWPORTS:
            ctx = await browser.new_context(
                viewport={"width": w, "height": h},
                device_scale_factor=1,
            )
            page = await ctx.new_page()
            await page.goto(f"file://{candidate.wireframe_path.resolve()}")
            await page.wait_for_load_state("networkidle")
            viewport_path = (
                out_dir / f"shot.{candidate.strategy}.{vp_name}.viewport.png"
            )
            full_path = out_dir / f"shot.{candidate.strategy}.{vp_name}.full.png"
            await page.screenshot(path=str(viewport_path), full_page=False)
            await page.screenshot(path=str(full_path), full_page=True)
            candidate.screenshots[vp_name] = ScreenshotBundle(
                viewport=viewport_path,
                full=full_path,
            )
            await ctx.close()
        await browser.close()
    print(
        f"[{candidate.strategy}] viewport + full-page screenshots captured "
        f"at {len(VIEWPORTS)} viewports"
    )


# ────────────────────────────────────────────────────────────────────────────
# Programmatic checks
# ────────────────────────────────────────────────────────────────────────────


def _kebab(s: str) -> str:
    value = re.sub(r"[^a-z0-9]+", "-", s.strip().lower())
    return value.strip("-")


def _is_nontrivial(value: str) -> bool:
    stripped = value.strip()
    if len(stripped) < 8:
        return False
    return not re.fullmatch(
        r"(tbd|todo|none|n/a|na|null|unknown|same as above|to be decided)",
        stripped,
        re.IGNORECASE,
    )


def _section_body(spec: str, number: int) -> str:
    match = re.search(
        rf"^##\s*Section\s*{number}\b[^\n]*\n(.*?)(?=^##\s*Section\s*\d+\b|\Z)",
        spec,
        re.DOTALL | re.IGNORECASE | re.MULTILINE,
    )
    return match.group(1).strip() if match else ""


def _parse_section_positions(spec: str) -> dict[int, int]:
    positions: dict[int, int] = {}
    for match in re.finditer(
        r"^##\s*Section\s*(\d+)\b", spec, re.IGNORECASE | re.MULTILINE
    ):
        number = int(match.group(1))
        positions.setdefault(number, match.start())
    return positions


def _parse_component_inventory(spec: str) -> list[dict[str, str]]:
    sec = _section_body(spec, 6)
    if not sec:
        return []
    rows = []
    for line in sec.split("\n"):
        if not line.strip().startswith("|"):
            continue
        if "----" in line or ("Component" in line and "Class" in line):
            continue
        cells = [c.strip() for c in line.strip("|").split("|")]
        if len(cells) >= 2 and cells[0]:
            class_value = cells[1].strip().upper()[:1]
            rows.append({"name": cells[0], "class": class_value})
    return rows


def _parse_required_selectors(spec: str) -> list[str]:
    sec11 = _section_body(spec, 11)
    sec_match = re.search(
        r"^###\s*11E\b[^\n]*\n(.*?)(?=^###\s*11[A-Z]\b|^##\s*Section\s*\d+\b|\Z)",
        sec11,
        re.DOTALL | re.IGNORECASE | re.MULTILINE,
    )
    if not sec_match:
        return []
    selectors: list[str] = []
    seen: set[str] = set()
    for selector in re.findall(r"#([a-z0-9][a-z0-9_-]*)", sec_match.group(1), re.I):
        selector = selector.lower()
        if selector not in seen:
            selectors.append(selector)
            seen.add(selector)
    return selectors


def _parse_tension_names(spec: str) -> list[str]:
    sec4 = _section_body(spec, 4)
    sec_match = re.search(
        r"^###\s*4E\b[^\n]*\n(.*?)(?=^###\s*4[A-E]\b|^##\s*Section\s*\d+\b|\Z)",
        sec4,
        re.DOTALL | re.IGNORECASE | re.MULTILINE,
    )
    if not sec_match:
        return []
    body = sec_match.group(1)
    names = [
        m.group(1).strip()
        for m in re.finditer(r"^\s*TENSION:\s*(.+?)\s*$", body, re.MULTILINE)
        if _is_nontrivial(m.group(1))
    ]
    if names:
        return names
    # Fallback: use first meaningful bullet/line as a coarse tension name.
    for line in body.splitlines():
        cleaned = re.sub(r"^[-*]\s*", "", line).strip()
        if _is_nontrivial(cleaned) and not cleaned.lower().startswith(
            ("business pull", "user pull", "resolution")
        ):
            return [cleaned[:80]]
    return []


def _check_section_4e_non_empty(spec: str) -> bool:
    sec4 = _section_body(spec, 4)
    sec_match = re.search(
        r"^###\s*4E\b[^\n]*\n(.*?)(?=^###\s*4[A-E]\b|^##\s*Section\s*\d+\b|\Z)",
        sec4,
        re.DOTALL | re.IGNORECASE | re.MULTILINE,
    )
    if not sec_match:
        return False
    body = sec_match.group(1).strip()
    if len(body) < 50:
        return False
    if re.search(
        r"\b(no tensions?|none identified|no tradeoffs?|not applicable|n/?a)\b",
        body,
        re.IGNORECASE,
    ):
        return False
    return True


def _check_all_sections_present(spec: str) -> tuple[bool, bool, list[str]]:
    expected = [f"Section {i}" for i in range(1, 13)]
    positions = _parse_section_positions(spec)
    missing = [s for i, s in enumerate(expected, 1) if i not in positions]
    sections_in_order = not missing and all(
        positions[i] < positions[i + 1] for i in range(1, 12)
    )
    return len(missing) == 0, sections_in_order, missing


def _check_section_2_complete(spec: str) -> bool:
    body = _section_body(spec, 2)
    required = ["PURPOSE", "AUDIENCE", "CONTEXT", "KEY ACTIONS"]
    for field in required:
        match = re.search(rf"^{field}:\s*(.+)$", body, re.IGNORECASE | re.MULTILINE)
        if not match or not _is_nontrivial(match.group(1)):
            return False
    return True


def _check_section_4_subsections(spec: str) -> tuple[bool, list[str]]:
    body = _section_body(spec, 4)
    missing: list[str] = []
    for suffix in "ABCDE":
        match = re.search(
            rf"^###\s*4{suffix}\b[^\n]*\n(.*?)(?=^###\s*4[A-E]\b|^##\s*Section\s*\d+\b|\Z)",
            body,
            re.DOTALL | re.IGNORECASE | re.MULTILINE,
        )
        if not match or not _is_nontrivial(re.sub(r"\s+", " ", match.group(1))):
            missing.append(f"4{suffix}")
    return not missing, missing


def _check_section_5_tiers(spec: str) -> bool:
    body = _section_body(spec, 5)
    for tier in ("PRIMARY", "SECONDARY", "TERTIARY"):
        match = re.search(
            rf"^\s*{tier}\b[^\n]*:\s*\n(.*?)(?=^\s*(?:PRIMARY|SECONDARY|TERTIARY)\b[^\n]*:|^##\s*Section\s*\d+\b|\Z)",
            body,
            re.DOTALL | re.IGNORECASE | re.MULTILINE,
        )
        if not match or not re.search(r"[A-Za-z0-9]", match.group(1)):
            return False
    return True


def _parse_section_12_stub(spec: str) -> dict[str, Any]:
    body = _section_body(spec, 12)
    component_match = re.search(r"Components:\s*(\d+)", body, re.IGNORECASE)
    selector_match = re.search(r"Selectors:\s*(\d+)", body, re.IGNORECASE)
    file_match = re.search(r"File:\s*(\S+)", body, re.IGNORECASE)
    status_match = re.search(r"Status:\s*([^\n]+)", body, re.IGNORECASE)
    stub_present = bool(
        re.search(r"HTML\s+WIREFRAME\s+ARTIFACT", body, re.IGNORECASE)
        and file_match
        and component_match
        and selector_match
        and status_match
    )
    return {
        "present": stub_present,
        "file": file_match.group(1) if file_match else None,
        "component_count": int(component_match.group(1)) if component_match else None,
        "selector_count": int(selector_match.group(1)) if selector_match else None,
        "status": status_match.group(1).strip() if status_match else None,
    }


class _HTMLAttrIndex(html.parser.HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.tags: list[tuple[str, dict[str, str]]] = []
        self.doctype_present = False
        self.parse_error: str | None = None

    def handle_decl(self, decl: str) -> None:
        if decl.strip().lower() == "doctype html":
            self.doctype_present = True

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.tags.append((tag.lower(), {k.lower(): v or "" for k, v in attrs}))

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.handle_starttag(tag, attrs)


def _html_index(wf: str) -> _HTMLAttrIndex:
    index = _HTMLAttrIndex()
    try:
        index.feed(wf)
        index.close()
    except Exception as exc:  # HTMLParser is tolerant; this catches catastrophic input.
        index.parse_error = str(exc)
    return index


def _check_wireframe_structural(wf: str) -> dict[str, Any]:
    index = _html_index(wf)
    tag_names = {tag for tag, _ in index.tags}
    page_root_attrs = next(
        (
            attrs
            for _, attrs in index.tags
            if attrs.get("id", "").lower() == "page-root"
        ),
        None,
    )
    html5_parse_warnings: list[str] = []
    if not index.doctype_present:
        html5_parse_warnings.append("Missing <!doctype html> declaration.")
    if "html" not in tag_names:
        html5_parse_warnings.append("Missing <html> tag.")
    if "body" not in tag_names:
        html5_parse_warnings.append("Missing <body> tag.")

    external_resources = re.findall(
        r"<(?:link|script|img)\b[^>]*(?:href|src)=['\"]https?://[^'\"]+['\"]",
        wf,
        re.IGNORECASE,
    )
    javascript_present = False
    for match in re.finditer(
        r"<script\b([^>]*)>(.*?)</script\s*>", wf, re.IGNORECASE | re.DOTALL
    ):
        attrs, content = match.group(1), match.group(2)
        if re.search(r"\bsrc\s*=", attrs, re.IGNORECASE):
            javascript_present = True
            break
        type_match = re.search(r"\btype\s*=\s*['\"]([^'\"]+)['\"]", attrs, re.I)
        script_type = type_match.group(1).lower() if type_match else ""
        if content.strip() and script_type != "application/json":
            javascript_present = True
            break

    valid_html5 = (
        index.parse_error is None
        and index.doctype_present
        and "html" in tag_names
        and "body" in tag_names
    )
    required_css_present = all(
        anchor in wf for anchor in ("--primary-fill", "--gap-md", ".wf-text-primary")
    )
    result = {
        "valid_html5": valid_html5,
        "html5_parse_warnings": html5_parse_warnings,
        "page_root_present": page_root_attrs is not None,
        "page_root_has_data_strategy": bool(
            page_root_attrs and page_root_attrs.get("data-strategy")
        ),
        "page_root_has_data_page": bool(
            page_root_attrs and page_root_attrs.get("data-page")
        ),
        "required_css_present": required_css_present,
        "external_resources": external_resources,
        "javascript_present": javascript_present,
    }
    result["passed"] = bool(
        result["valid_html5"]
        and result["page_root_present"]
        and result["page_root_has_data_strategy"]
        and result["page_root_has_data_page"]
        and result["required_css_present"]
        and not result["external_resources"]
        and not result["javascript_present"]
    )
    return {
        **result,
    }


def _check_coherence(spec: str, wf: str) -> dict[str, Any]:
    inventory = _parse_component_inventory(spec)
    selectors = _parse_required_selectors(spec)
    index = _html_index(wf)
    wf_component_tags = [
        attrs
        for _, attrs in index.tags
        if attrs.get("data-component")
    ]
    wf_components = {attrs["data-component"] for attrs in wf_component_tags}
    wf_ids = {attrs["id"].lower() for _, attrs in index.tags if attrs.get("id")}
    wf_tensions = {
        attrs["data-tension"]
        for _, attrs in index.tags
        if attrs.get("data-tension")
    }
    inv_components = {_kebab(c["name"]): c for c in inventory}
    missing_components = [
        c["name"] for k, c in inv_components.items() if k not in wf_components
    ]
    unjustified_components = sorted(c for c in wf_components if c not in inv_components)
    missing_selectors = [s for s in selectors if s not in wf_ids]
    primary_count_spec = sum(
        1 for c in inventory if c["class"].strip().upper().startswith("P")
    )
    primary_count_wireframe = sum(
        1 for attrs in wf_component_tags if attrs.get("data-class") == "primary"
    )
    class_mismatches = []
    class_map = {"P": "primary", "S": "secondary", "T": "tertiary"}
    for c in inventory:
        kebab = _kebab(c["name"])
        spec_class = class_map.get(c["class"].strip().upper()[:1])
        if not spec_class:
            continue
        matching_tag = next(
            (
                attrs
                for attrs in wf_component_tags
                if attrs.get("data-component") == kebab
            ),
            None,
        )
        if matching_tag and matching_tag.get("data-class") != spec_class:
            class_mismatches.append(
                {
                    "component": c["name"],
                    "spec": spec_class,
                    "wireframe": matching_tag.get("data-class"),
                }
            )
    tension_names = _parse_tension_names(spec)
    missing_tension_tags = [
        name for name in tension_names if _kebab(name) not in wf_tensions
    ]
    primary_count_matches = primary_count_wireframe >= primary_count_spec
    passed = bool(
        not missing_components
        and not unjustified_components
        and not class_mismatches
        and not missing_selectors
        and primary_count_matches
    )
    return {
        "missing_components": missing_components,
        "unjustified_components": unjustified_components,
        "class_mismatches": class_mismatches,
        "missing_selectors": missing_selectors,
        "missing_tension_tags": missing_tension_tags,
        "primary_count_spec": primary_count_spec,
        "primary_count_wireframe": primary_count_wireframe,
        "primary_count_matches": primary_count_matches,
        "passed": passed,
    }


def _diagnosis_keywords(value: Any, limit: int = 80) -> list[str]:
    text = json.dumps(value, ensure_ascii=False).lower()
    stop = {
        "the", "and", "for", "with", "that", "this", "must", "show", "from",
        "into", "user", "users", "site", "page", "website", "should", "their",
        "they", "need", "needs", "clear", "value", "trust", "action", "first",
        "viewport", "above", "fold", "design", "content", "product", "service",
    }
    tokens = re.findall(r"[a-z][a-z0-9-]{3,}", text)
    out: list[str] = []
    seen: set[str] = set()
    for token in tokens:
        if token in stop or token in seen:
            continue
        out.append(token)
        seen.add(token)
        if len(out) >= limit:
            break
    return out


def _any_term_present(terms: list[str], haystack: str) -> bool:
    return any(term and term.lower() in haystack for term in terms)


def _check_strategic_alignment(
    spec: str,
    wf: str,
    diagnosis: dict[str, Any] | None,
    strategy: str,
) -> dict[str, Any]:
    """Deterministic diagnosis-to-spec checks.

    These checks cannot prove strategic quality. They prevent the architect from
    silently ignoring Agent 01 by requiring an explicit mapping to first-viewport
    obligations, hard floors, anti-patterns, and strategy seeds.
    """
    if not diagnosis:
        return {
            "diagnosis_provided": False,
            "passed": True,
            "reasoning": "No strategic diagnosis was provided.",
        }

    text = (spec + "\n" + wf).lower()
    spec_l = spec.lower()
    seed_names = [
        _normalize_strategy_name(str(seed.get("strategy_name", "")))
        for seed in diagnosis.get("candidate_strategy_seeds", [])
        if isinstance(seed, dict)
    ]
    hard_floor_ids = [
        str(item.get("id", "")).lower()
        for item in diagnosis.get("hard_floors", [])
        if isinstance(item, dict)
    ]
    hard_floor_terms = hard_floor_ids + _diagnosis_keywords(diagnosis.get("hard_floors", []), 60)
    anti_pattern_ids = [
        str(item.get("id", "")).lower()
        for item in diagnosis.get("anti_patterns", [])
        if isinstance(item, dict)
    ]
    anti_pattern_terms = anti_pattern_ids + _diagnosis_keywords(diagnosis.get("anti_patterns", []), 60)
    viewport_terms = _diagnosis_keywords(diagnosis.get("first_viewport_obligation", {}), 40)
    axis_terms = _diagnosis_keywords(diagnosis.get("strategic_axes", {}), 30)

    has_mapping_block = "strategic diagnosis mapping:" in spec_l
    has_viewport_block = "first viewport obligation:" in spec_l
    has_hard_floor_block = "hard floor coverage:" in spec_l
    has_anti_pattern_block = "anti-pattern avoidance:" in spec_l
    strategy_from_seed = not seed_names or strategy in seed_names
    hard_floor_mentions = sorted({term for term in hard_floor_terms if term and term in text})[:20]
    anti_pattern_mentions = sorted({term for term in anti_pattern_terms if term and term in text})[:20]
    viewport_mentions = sorted({term for term in viewport_terms if term and term in text})[:20]
    axis_mentions = sorted({term for term in axis_terms if term and term in text})[:20]

    missing: list[str] = []
    if not has_mapping_block:
        missing.append("STRATEGIC DIAGNOSIS MAPPING block")
    if not has_viewport_block:
        missing.append("FIRST VIEWPORT OBLIGATION block")
    if not has_hard_floor_block:
        missing.append("HARD FLOOR COVERAGE block")
    if not has_anti_pattern_block:
        missing.append("ANTI-PATTERN AVOIDANCE block")
    if diagnosis.get("hard_floors") and len(hard_floor_mentions) < 2:
        missing.append("at least two diagnosis hard-floor IDs or concrete hard-floor terms")
    if diagnosis.get("anti_patterns") and len(anti_pattern_mentions) < 2:
        missing.append("at least two diagnosis anti-pattern IDs or concrete anti-pattern terms")
    if diagnosis.get("first_viewport_obligation") and len(viewport_mentions) < 2:
        missing.append("first-viewport obligation terms")
    if diagnosis.get("strategic_axes") and len(axis_mentions) < 2:
        missing.append("strategic-axis terms")

    passed = bool(not missing and strategy_from_seed)
    return {
        "diagnosis_provided": True,
        "diagnosis_id": diagnosis.get("diagnosis_id"),
        "strategy_from_diagnosis_seed": strategy_from_seed,
        "diagnosis_seed_names": seed_names,
        "mapping_block_present": has_mapping_block,
        "first_viewport_block_present": has_viewport_block,
        "hard_floor_block_present": has_hard_floor_block,
        "anti_pattern_block_present": has_anti_pattern_block,
        "hard_floor_mentions": hard_floor_mentions,
        "anti_pattern_mentions": anti_pattern_mentions,
        "first_viewport_mentions": viewport_mentions,
        "strategic_axis_mentions": axis_mentions,
        "missing_alignment_items": missing,
        "passed": passed,
        "reasoning": "Diagnosis alignment explicit." if passed else "Missing: " + ", ".join(missing),
    }


async def _check_render(wf_path: pathlib.Path, selectors: list[str]) -> dict[str, Any]:
    result = {
        "console_errors_desktop": [],
        "console_errors_tablet": [],
        "console_errors_mobile": [],
        "mobile_horizontal_overflow": False,
        "first_viewport_visible_components": 0,
        "missing_visible_selectors_desktop": [],
    }
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for vp_name, w, h in VIEWPORTS:
            ctx = await browser.new_context(
                viewport={"width": w, "height": h},
                device_scale_factor=1,
            )
            page = await ctx.new_page()
            errors: list[str] = []
            page.on(
                "console",
                lambda msg, e=errors: e.append(msg.text) if msg.type == "error" else None,
            )
            await page.goto(f"file://{wf_path.resolve()}")
            await page.wait_for_load_state("networkidle")
            result[f"console_errors_{vp_name}"] = list(errors)
            if vp_name == "mobile":
                scroll_w = await page.evaluate(
                    "() => document.documentElement.scrollWidth"
                )
                result["mobile_horizontal_overflow"] = scroll_w > w + 1
            if vp_name == "desktop":
                count = await page.evaluate(
                    "() => Array.from(document.querySelectorAll('[data-component]')).filter(el => {"
                    " const r = el.getBoundingClientRect();"
                    " return r.top < 900 && r.bottom > 0 && r.width > 0 && r.height > 0;"
                    "}).length"
                )
                result["first_viewport_visible_components"] = count
                result["missing_visible_selectors_desktop"] = await page.evaluate(
                    """(ids) => ids.filter(id => {
                        const el = document.getElementById(id);
                        if (!el) return true;
                        const style = window.getComputedStyle(el);
                        const r = el.getBoundingClientRect();
                        return style.display === 'none'
                            || style.visibility === 'hidden'
                            || Number(style.opacity) === 0
                            || r.width <= 0
                            || r.height <= 0;
                    })""",
                    selectors,
                )
            await ctx.close()
        await browser.close()
    result["passed"] = bool(
        not result["console_errors_desktop"]
        and not result["console_errors_tablet"]
        and not result["console_errors_mobile"]
        and not result["mobile_horizontal_overflow"]
        and result["first_viewport_visible_components"] >= 5
        and not result["missing_visible_selectors_desktop"]
    )
    return result


def _derive_score(result: dict[str, Any]) -> dict[str, Any]:
    score = 10
    reasons: list[str] = []
    fired: list[str] = []
    sp, ws, co, rn, rc = (
        result["spec_structural"],
        result["wireframe_structural"],
        result["coherence"],
        result["render"],
        result["reference_calibration"],
    )
    sa = result.get("strategic_alignment", {"diagnosis_provided": False, "passed": True})
    if not sp["all_sections_present"] or not sp["sections_in_order"]:
        score = min(score, 2)
        fired.append("spec_sections_missing_or_out_of_order_cap_2")
        reasons.append(
            f"Missing/out-of-order sections: missing={sp['missing_sections']} "
            f"in_order={sp['sections_in_order']}"
        )
    if not sp["section_2_complete"]:
        score = min(score, 5)
        fired.append("section_2_incomplete_cap_5")
        reasons.append("Section 2 intake fields are incomplete or trivial.")
    if not sp["section_4_subsections_present"]:
        score = min(score, 4)
        fired.append("section_4_subsections_missing_cap_4")
        reasons.append(f"Missing/empty Section 4 subsections: {sp['section_4_missing_subsections']}")
    if not sp["section_4e_non_empty"]:
        score = min(score, 5)
        fired.append("section_4e_empty_cap_5")
        reasons.append("Section 4E (Tension Map) is empty or trivial.")
    if not sp["section_5_has_primary_secondary_tertiary"]:
        score = min(score, 6)
        fired.append("section_5_tiers_missing_cap_6")
        reasons.append("Section 5 does not contain non-empty PRIMARY, SECONDARY, and TERTIARY tiers.")
    if not sp["section_6_min_rows_passed"]:
        score = min(score, 5)
        fired.append("section_6_min_rows_cap_5")
        reasons.append(f"Section 6 has only {sp['section_6_component_count']} component rows.")
    if not sp["section_11e_min_selectors_passed"]:
        score = min(score, 5)
        fired.append("section_11e_min_selectors_cap_5")
        reasons.append(f"Section 11E has only {sp['section_11e_selector_count']} selectors.")
    if not sp["section_12_stub_present"] or not sp["section_12_counts_match"]:
        score = min(score, 5)
        fired.append("section_12_stub_invalid_cap_5")
        reasons.append(
            "Section 12 stub is missing or its component/selector counts do not match Sections 6/11E."
        )
    if not ws["valid_html5"] or any(
        rn.get(key)
        for key in (
            "console_errors_desktop",
            "console_errors_tablet",
            "console_errors_mobile",
        )
    ):
        score = min(score, 2)
        fired.append("wireframe_parse_or_render_failure_cap_2")
        reasons.append("Wireframe has HTML5 parse problems or console render errors.")
    if ws["external_resources"]:
        score = min(score, 2)
        fired.append("external_resources_cap_2")
        reasons.append(f"External resources present: {ws['external_resources']}")
    if ws["javascript_present"]:
        score = min(score, 2)
        fired.append("javascript_present_cap_2")
        reasons.append("JavaScript present in wireframe.")
    if (
        not ws["page_root_present"]
        or not ws["page_root_has_data_strategy"]
        or not ws["page_root_has_data_page"]
        or not ws["required_css_present"]
    ):
        score = min(score, 4)
        fired.append("page_root_or_css_missing_cap_4")
        reasons.append(
            "#page-root, page-root data attributes, or required CSS anchors are missing."
        )
    miss_count = len(co["missing_components"])
    if miss_count == 1:
        score = min(score, 7)
        fired.append("one_missing_component_cap_7")
        reasons.append(f"1 missing component: {co['missing_components']}")
    elif miss_count >= 2:
        score = min(score, 4)
        fired.append("multiple_missing_components_cap_4")
        reasons.append(f"{miss_count} missing components: {co['missing_components']}")
    unjustified_count = len(co["unjustified_components"])
    if unjustified_count == 1:
        score = min(score, 7)
        fired.append("one_unjustified_component_cap_7")
        reasons.append(f"1 unjustified component: {co['unjustified_components']}")
    elif unjustified_count > 1:
        score = min(score, 4)
        fired.append("multiple_unjustified_components_cap_4")
        reasons.append(f"{unjustified_count} unjustified components: {co['unjustified_components']}")
    if co["class_mismatches"]:
        score = min(score, 7 if len(co["class_mismatches"]) == 1 else 5)
        fired.append("class_mismatch_cap")
        reasons.append(f"Class mismatches: {co['class_mismatches']}")
    miss_sel = len(co["missing_selectors"])
    if miss_sel:
        score = min(score, max(0, score - 3 * miss_sel))
        fired.append("missing_selectors_subtract_3_each")
        reasons.append(f"{miss_sel} missing required selectors: {co['missing_selectors']}")
    hidden_sel = rn["missing_visible_selectors_desktop"]
    if hidden_sel:
        score = min(score, 6)
        fired.append("hidden_required_selectors_cap_6")
        reasons.append(f"Required selectors are missing or hidden on desktop: {hidden_sel}")
    if not co["primary_count_matches"]:
        severe = co["primary_count_wireframe"] < max(1, co["primary_count_spec"] // 2)
        score = min(score, 5 if severe else 7)
        fired.append("primary_count_mismatch_cap")
        reasons.append(
            f"Primary count mismatch: spec={co['primary_count_spec']} "
            f"wireframe={co['primary_count_wireframe']}"
        )
    if rn["mobile_horizontal_overflow"]:
        score = min(score, 6)
        fired.append("mobile_horizontal_overflow_cap_6")
        reasons.append("Mobile horizontal overflow detected.")
    if rn["first_viewport_visible_components"] < 5:
        score = min(score, 5)
        fired.append("first_viewport_too_empty_cap_5")
        reasons.append(
            f"First viewport has only {rn['first_viewport_visible_components']} visible components."
        )
    if rc["references_provided"] and not rc["passed"]:
        score = min(score, 8)
        fired.append("reference_calibration_missing_cap_8")
        reasons.append("References were provided but calibration block or reference move mention is missing.")
    if sa.get("diagnosis_provided") and not sa.get("passed", False):
        has_blocks = all(
            sa.get(name, False)
            for name in (
                "mapping_block_present",
                "first_viewport_block_present",
                "hard_floor_block_present",
                "anti_pattern_block_present",
            )
        )
        score = min(score, 7 if has_blocks else 6)
        fired.append("strategic_diagnosis_alignment_missing_cap")
        reasons.append(sa.get("reasoning", "Strategic diagnosis alignment is missing or incomplete."))

    required_category_failed = not (
        sp["passed"] and ws["passed"] and co["passed"] and rn["passed"] and sa.get("passed", True)
    )
    all_passed = bool(
        sp["passed"]
        and ws["passed"]
        and co["passed"]
        and rn["passed"]
        and rc["passed"]
        and sa.get("passed", True)
    )
    return {
        "all_passed": all_passed,
        "required_category_failed": required_category_failed,
        "score": max(0, score),
        "rules_fired": fired,
        "reasoning": " ".join(reasons) if reasons else "All checks passed.",
    }


async def run_programmatic_checks(
    candidate: Candidate,
    references_dir: pathlib.Path | None,
    reference_items: list[ReferenceItem] | None = None,
    strategic_diagnosis: dict[str, Any] | None = None,
) -> dict[str, Any]:
    spec = _read(candidate.spec_path)
    wf = _read(candidate.wireframe_path)
    sections_ok, sections_in_order, missing_sections = _check_all_sections_present(spec)
    section_4_present, section_4_missing = _check_section_4_subsections(spec)
    inventory = _parse_component_inventory(spec)
    selectors = _parse_required_selectors(spec)
    section_12 = _parse_section_12_stub(spec)
    selected_refs = select_references_for_strategy(
        reference_items or [], spec, candidate.strategy
    )
    reference_terms = {ref.id.lower() for ref in selected_refs}
    for ref in selected_refs:
        reference_terms.update(move.lower() for move in ref.structural_moves)
    spec_l = spec.lower()
    reference_mentioned = bool(
        reference_terms and any(term and term in spec_l for term in reference_terms)
    )
    reference_calibration = {
        "references_provided": references_dir is not None,
        "reference_context_loaded": bool(selected_refs),
        "calibration_block_present": "REFERENCE CALIBRATION:" in spec,
        "mentioned_reference_ids_or_moves": reference_mentioned,
    }
    reference_calibration["passed"] = bool(
        not reference_calibration["references_provided"]
        or (
            reference_calibration["calibration_block_present"]
            and (
                not reference_calibration["reference_context_loaded"]
                or reference_calibration["mentioned_reference_ids_or_moves"]
            )
        )
    )
    section_12_counts_match = bool(
        section_12["present"]
        and section_12["component_count"] == len(inventory)
        and section_12["selector_count"] == len(selectors)
    )
    spec_structural = {
        "all_sections_present": sections_ok,
        "sections_in_order": sections_in_order,
        "missing_sections": missing_sections,
        "section_2_complete": _check_section_2_complete(spec),
        "section_4_subsections_present": section_4_present,
        "section_4_missing_subsections": section_4_missing,
        "section_4e_non_empty": _check_section_4e_non_empty(spec),
        "section_5_has_primary_secondary_tertiary": _check_section_5_tiers(spec),
        "section_6_component_count": len(inventory),
        "section_6_min_rows_passed": len(inventory) >= 4,
        "section_11e_selector_count": len(selectors),
        "section_11e_min_selectors_passed": len(selectors) >= 3,
        "section_12_stub_present": section_12["present"],
        "section_12_component_count": section_12["component_count"],
        "section_12_selector_count": section_12["selector_count"],
        "section_12_counts_match": section_12_counts_match,
    }
    spec_structural["passed"] = bool(
        spec_structural["all_sections_present"]
        and spec_structural["sections_in_order"]
        and spec_structural["section_2_complete"]
        and spec_structural["section_4_subsections_present"]
        and spec_structural["section_4e_non_empty"]
        and spec_structural["section_5_has_primary_secondary_tertiary"]
        and spec_structural["section_6_min_rows_passed"]
        and spec_structural["section_11e_min_selectors_passed"]
        and spec_structural["section_12_stub_present"]
        and spec_structural["section_12_counts_match"]
    )
    result = {
        "candidate_id": candidate.strategy,
        "spec_path": str(candidate.spec_path),
        "wireframe_path": str(candidate.wireframe_path),
        "spec_structural": spec_structural,
        "wireframe_structural": _check_wireframe_structural(wf),
        "coherence": _check_coherence(spec, wf),
        "render": await _check_render(candidate.wireframe_path, selectors),
        "reference_calibration": reference_calibration,
        "strategic_alignment": _check_strategic_alignment(
            spec, wf, strategic_diagnosis, candidate.strategy
        ),
    }
    result["score_derivation"] = _derive_score(result)
    candidate.programmatic_results = result
    _apply_programmatic_gate(candidate)
    return result


def _apply_programmatic_gate(candidate: Candidate) -> None:
    derivation = candidate.programmatic_results.get("score_derivation", {})
    candidate.programmatic_score = float(derivation.get("score", 0.0))
    candidate.programmatic_passed = bool(derivation.get("all_passed", False))
    candidate.hard_floor_violated = bool(
        not candidate.programmatic_passed
        or candidate.programmatic_score < 8
        or derivation.get("required_category_failed", False)
    )
    candidate.eligible_for_final_ranking = not candidate.hard_floor_violated


def _category_failed(checks: dict[str, Any]) -> bool:
    categories = [
        "spec_structural",
        "wireframe_structural",
        "coherence",
        "render",
        "reference_calibration",
    ]
    if checks.get("strategic_alignment", {}).get("diagnosis_provided"):
        categories.append("strategic_alignment")
    return any(not checks.get(category, {}).get("passed", False) for category in categories)


def _build_revision_directive(checks: dict[str, Any]) -> str | None:
    issues = []
    co, sp, rn, ws, rc = (
        checks["coherence"],
        checks["spec_structural"],
        checks["render"],
        checks["wireframe_structural"],
        checks["reference_calibration"],
    )
    sa = checks.get("strategic_alignment", {"diagnosis_provided": False, "passed": True})
    if sp["missing_sections"]:
        issues.append(f"Missing spec sections: {sp['missing_sections']}")
    if not sp["sections_in_order"]:
        issues.append("Spec sections are present but not in required Section 1-12 order.")
    if not sp["section_2_complete"]:
        issues.append("Section 2 must include non-trivial PURPOSE, AUDIENCE, CONTEXT, and KEY ACTIONS fields.")
    if not sp["section_4_subsections_present"]:
        issues.append(f"Section 4 is missing or has empty subsections: {sp['section_4_missing_subsections']}")
    if not sp["section_4e_non_empty"]:
        issues.append(
            "Section 4E (Tension Map) is empty/trivial. Real design has tensions; name at least one business-vs-user pull and its resolution."
        )
    if not sp["section_5_has_primary_secondary_tertiary"]:
        issues.append("Section 5 must include non-empty PRIMARY, SECONDARY, and TERTIARY hierarchy tiers.")
    if not sp["section_6_min_rows_passed"]:
        issues.append("Section 6 must include at least 4 component inventory rows.")
    if not sp["section_11e_min_selectors_passed"]:
        issues.append("Section 11E must list at least 3 required stable selectors.")
    if not sp["section_12_stub_present"] or not sp["section_12_counts_match"]:
        issues.append(
            "Section 12 must include the HTML WIREFRAME ARTIFACT stub with File, Components, Selectors, and Status; counts must match Sections 6 and 11E."
        )
    if not ws["valid_html5"]:
        issues.append(f"Wireframe must be valid HTML5 with <!doctype html>, <html>, and <body>: {ws['html5_parse_warnings']}")
    if not ws["page_root_present"]:
        issues.append("Wireframe must contain #page-root.")
    if not ws["page_root_has_data_strategy"] or not ws["page_root_has_data_page"]:
        issues.append("#page-root must include data-strategy and data-page attributes.")
    if not ws["required_css_present"]:
        issues.append("Wireframe CSS must include --primary-fill, --gap-md, and .wf-text-primary anchors.")
    if ws["external_resources"]:
        issues.append(f"Remove external resources; wireframe must be self-contained: {ws['external_resources']}")
    if ws["javascript_present"]:
        issues.append("Remove JavaScript; only empty scripts or type=\"application/json\" metadata blocks are allowed.")
    if co["missing_components"]:
        issues.append(
            f"Missing components in wireframe (must be added with matching data-component): {co['missing_components']}"
        )
    if co["unjustified_components"]:
        issues.append(
            f"Components in wireframe not in Section 6 inventory: {co['unjustified_components']}"
        )
    if co["missing_selectors"]:
        issues.append(
            f"Required selectors from 11E missing as id attributes: {co['missing_selectors']}"
        )
    if co["class_mismatches"]:
        issues.append(f"data-class disagrees with Section 6 class: {co['class_mismatches']}")
    if co["missing_tension_tags"]:
        issues.append(
            f"Consider adding data-tension tags for named tensions where a specific element resolves them: {co['missing_tension_tags']}"
        )
    if not co["primary_count_matches"]:
        issues.append(
            f"Primary component count under-renders Section 6: spec={co['primary_count_spec']} wireframe={co['primary_count_wireframe']}."
        )
    if rn["missing_visible_selectors_desktop"]:
        issues.append(
            f"Required selectors exist only in missing/hidden desktop markup: {rn['missing_visible_selectors_desktop']}"
        )
    if rn["mobile_horizontal_overflow"]:
        issues.append(
            "Mobile viewport (390px) has horizontal overflow. Fix the layout collapse."
        )
    if rn["first_viewport_visible_components"] < 5:
        issues.append(
            f"Desktop first viewport is too empty: only {rn['first_viewport_visible_components']} visible data-component elements; make at least 5 visible before the fold."
        )
    for key in ("console_errors_desktop", "console_errors_tablet", "console_errors_mobile"):
        if rn[key]:
            issues.append(f"Render console errors in {key.removeprefix('console_errors_')}: {rn[key]}")
    if rc["references_provided"] and not rc["passed"]:
        issues.append(
            "References were provided; add a REFERENCE CALIBRATION block that names loaded reference IDs or structural moves and states same-family/divergent/anti-trope usage."
        )
    return "\n".join(f"- {i}" for i in issues) if issues else None


# ────────────────────────────────────────────────────────────────────────────
# Evaluator providers (pluggable, non-Anthropic)
# ────────────────────────────────────────────────────────────────────────────


class EvaluatorProvider(Protocol):
    async def evaluate(
        self, system_prompt: str, user_text: str, image_paths: list[pathlib.Path]
    ) -> str: ...


class GeminiEvaluator:
    """Evaluator backed by Google Gemini.

    Model defaults are centralized in FALLBACK_EVALUATOR_MODELS and env vars.
    Install: pip install google-genai
    Auth:    GOOGLE_API_KEY in environment
    """

    def __init__(self, model: str):
        try:
            from google import genai  # noqa: F401
        except ImportError as e:
            raise RuntimeError(
                "google-genai not installed. Run: pip install google-genai"
            ) from e
        if not os.environ.get("GOOGLE_API_KEY"):
            raise RuntimeError("GOOGLE_API_KEY not set in environment.")
        from google import genai
        self._genai = genai
        self._client = genai.Client(api_key=os.environ["GOOGLE_API_KEY"])
        self._model = model

    async def evaluate(self, system_prompt, user_text, image_paths):
        from google.genai import types

        parts: list[Any] = [types.Part.from_text(text=user_text)]
        for img_path in image_paths:
            parts.append(
                types.Part.from_bytes(
                    data=img_path.read_bytes(),
                    mime_type="image/png",
                )
            )

        def _call():
            return self._client.models.generate_content(
                model=self._model,
                contents=parts,
                config=types.GenerateContentConfig(
                    system_instruction=system_prompt,
                    max_output_tokens=8000,
                    temperature=0.2,
                ),
            )

        response = await asyncio.to_thread(_call)
        return response.text or ""


class OpenAIEvaluator:
    """Evaluator backed by OpenAI.

    Model defaults are centralized in FALLBACK_EVALUATOR_MODELS and env vars.
    Install: pip install openai
    Auth:    OPENAI_API_KEY in environment
    """

    def __init__(self, model: str):
        try:
            from openai import AsyncOpenAI  # noqa: F401
        except ImportError as e:
            raise RuntimeError("openai not installed. Run: pip install openai") from e
        if not os.environ.get("OPENAI_API_KEY"):
            raise RuntimeError("OPENAI_API_KEY not set in environment.")
        from openai import AsyncOpenAI
        self._client = AsyncOpenAI()
        self._model = model

    async def evaluate(self, system_prompt, user_text, image_paths):
        content: list[dict[str, Any]] = [{"type": "text", "text": user_text}]
        for img_path in image_paths:
            data = base64.standard_b64encode(img_path.read_bytes()).decode()
            content.append(
                {
                    "type": "image_url",
                    "image_url": {"url": f"data:image/png;base64,{data}"},
                }
            )
        if hasattr(self._client, "responses"):
            responses_content: list[dict[str, Any]] = [
                {"type": "input_text", "text": user_text}
            ]
            for img_path in image_paths:
                data = base64.standard_b64encode(img_path.read_bytes()).decode()
                responses_content.append(
                    {
                        "type": "input_image",
                        "image_url": f"data:image/png;base64,{data}",
                    }
                )
            kwargs: dict[str, Any] = {
                "model": self._model,
                "input": [
                    {
                        "role": "system",
                        "content": [{"type": "input_text", "text": system_prompt}],
                    },
                    {"role": "user", "content": responses_content},
                ],
                "max_output_tokens": int(os.environ.get("ARCH_EVAL_OPENAI_MAX_OUTPUT_TOKENS", "8000")),
            }
            if not self._model.startswith("gpt-5") or os.environ.get("ARCH_EVAL_OPENAI_INCLUDE_TEMPERATURE") == "1":
                kwargs["temperature"] = float(os.environ.get("ARCH_EVAL_OPENAI_TEMPERATURE", "0.2"))
            if self._model.startswith("gpt-5"):
                kwargs["reasoning"] = {
                    "effort": os.environ.get("ARCH_EVAL_OPENAI_REASONING_EFFORT", "high")
                }
                kwargs["text"] = {
                    "verbosity": os.environ.get("ARCH_EVAL_OPENAI_VERBOSITY", "medium")
                }
            if os.environ.get("ARCH_EVAL_PROMPT_CACHE_KEY"):
                kwargs["prompt_cache_key"] = os.environ["ARCH_EVAL_PROMPT_CACHE_KEY"]
            response = await self._client.responses.create(**kwargs)
            output_text = getattr(response, "output_text", None)
            if output_text:
                return output_text
            return str(response)
        response = await self._client.chat.completions.create(
            model=self._model,
            max_tokens=8000,
            temperature=0.2,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": content},
            ],
        )
        return response.choices[0].message.content or ""


class AnthropicEvaluator:
    """Evaluator backed by Anthropic Claude Messages API.

    Install: pip install anthropic
    Auth:    ANTHROPIC_API_KEY in environment
    """

    def __init__(self, model: str):
        try:
            from anthropic import AsyncAnthropic  # noqa: F401
        except ImportError as e:
            raise RuntimeError("anthropic not installed. Run: pip install anthropic") from e
        if not os.environ.get("ANTHROPIC_API_KEY"):
            raise RuntimeError("ANTHROPIC_API_KEY not set in environment.")
        from anthropic import AsyncAnthropic
        self._client = AsyncAnthropic()
        self._model = model

    async def evaluate(self, system_prompt, user_text, image_paths):
        content: list[dict[str, Any]] = [{"type": "text", "text": user_text}]
        for img_path in image_paths:
            data = base64.standard_b64encode(img_path.read_bytes()).decode()
            content.append(
                {
                    "type": "image",
                    "source": {
                        "type": "base64",
                        "media_type": "image/png",
                        "data": data,
                    },
                }
            )
        kwargs: dict[str, Any] = {
            "model": self._model,
            "max_tokens": int(os.environ.get("ARCH_EVAL_ANTHROPIC_MAX_TOKENS", "8000")),
            "temperature": float(os.environ.get("ARCH_EVAL_ANTHROPIC_TEMPERATURE", "0.2")),
            "system": system_prompt,
            "messages": [{"role": "user", "content": content}],
        }
        # Claude 4.6/4.7 recommend adaptive thinking for harder tasks; keep opt-in
        # because not all accounts/models expose the same beta surface.
        if os.environ.get("ARCH_EVAL_ANTHROPIC_ADAPTIVE_THINKING") == "1":
            kwargs["thinking"] = {"type": "adaptive"}
        response = await self._client.messages.create(**kwargs)
        texts: list[str] = []
        for block in getattr(response, "content", []) or []:
            if getattr(block, "type", None) == "text":
                texts.append(getattr(block, "text", ""))
            elif isinstance(block, dict) and block.get("type") == "text":
                texts.append(str(block.get("text", "")))
        return "\n".join(texts)


class ClaudeCliEvaluator:
    """Evaluator backed by the local `claude` CLI (Claude Code).

    Uses the user's Claude Pro/Max subscription via `claude -p`. Images are
    referenced by absolute path in the prompt and read via the Read tool, which
    delivers them as native multimodal vision input.

    Pros: zero API cost, same auth as the architect stage, vision-capable.
    Cons: subprocess spawn per call, slower than direct API by ~2-4s.
    """

    def __init__(self, model: str):
        if shutil.which("claude") is None:
            raise RuntimeError(
                "claude CLI not found on PATH. Install with: "
                "npm install -g @anthropic-ai/claude-code"
            )
        # `model` accepts aliases like "sonnet" / "opus" or full IDs. Default to sonnet.
        self._model = model or "sonnet"

    async def evaluate(self, system_prompt, user_text, image_paths):
        if image_paths:
            attach_lines = ["", "ATTACHED IMAGES (use Read tool to view each, in order):"]
            for index, path in enumerate(image_paths, 1):
                attach_lines.append(f"  {index}. {pathlib.Path(path).resolve()}")
            attach_lines.append(
                "Read every image above before answering. Treat each as native vision input."
            )
            attach_lines.append("")
            full_user = user_text + "\n" + "\n".join(attach_lines)
        else:
            full_user = user_text

        cmd = [
            "claude", "-p", full_user,
            "--model", self._model,
            "--allowedTools", "Read",
            "--permission-mode", "acceptEdits",
            "--output-format", "text",
            "--append-system-prompt", system_prompt,
        ]
        # Strip ANTHROPIC_API_KEY from the subprocess env so Claude CLI uses
        # the Max/Pro subscription auth instead of falling through to API
        # credit (which is a separate, often-empty wallet).
        env = {k: v for k, v in os.environ.items() if k != "ANTHROPIC_API_KEY"}
        proc = await asyncio.create_subprocess_exec(
            *cmd,
            stdin=asyncio.subprocess.DEVNULL,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
            env=env,
        )
        stdout, stderr = await proc.communicate()
        out_text = stdout.decode(errors="replace")
        err_text = stderr.decode(errors="replace")
        if proc.returncode != 0 or "Credit balance is too low" in out_text:
            raise RuntimeError(
                f"claude CLI exited {proc.returncode}: stderr={err_text[:300]} "
                f"stdout={out_text[:300]}"
            )
        return out_text


class CodexCliEvaluator:
    """Evaluator backed by the local `codex` CLI.

    Uses the user's ChatGPT/Codex subscription via `codex exec`. Images are
    attached natively via the `-i/--image` flag, which the model receives as
    multimodal vision input. Reasoning effort defaults to `medium` because
    `xhigh` (Codex's local default) is slow and occasionally hangs on multi-image
    calls.

    Pros: zero API cost, native --image flag, fastest of the CLI options.
    Cons: stdout includes a banner + duplicate response + token-count line that
    must be stripped before parsing.
    """

    def __init__(self, model: str):
        if shutil.which("codex") is None:
            raise RuntimeError(
                "codex CLI not found on PATH. Install with: npm install -g @openai/codex"
            )
        self._model = model or os.environ.get("ARCH_EVAL_CODEX_MODEL") or "gpt-5.5"
        self._effort = os.environ.get("ARCH_EVAL_CODEX_EFFORT", "medium")

    async def evaluate(self, system_prompt, user_text, image_paths):
        # Codex has no system-prompt flag; concatenate. Pipe via stdin because
        # the full evaluator prompt routinely exceeds the ~128KB per-arg limit
        # on Linux when passed as positional argv.
        prompt = (
            f"=== SYSTEM ===\n{system_prompt}\n\n"
            f"=== USER ===\n{user_text}"
        )
        cmd = [
            "codex", "exec",
            "-m", self._model,
            "-c", f'model_reasoning_effort="{self._effort}"',
            "--skip-git-repo-check",
        ]
        for path in image_paths:
            cmd.extend(["--image", str(pathlib.Path(path).resolve())])
        cmd.append("-")  # tells codex to read prompt from stdin

        # Strip OPENAI_API_KEY so codex uses the ChatGPT subscription auth,
        # not API credit (which is a separate, often-empty wallet).
        env = {k: v for k, v in os.environ.items() if k != "OPENAI_API_KEY"}
        proc = await asyncio.create_subprocess_exec(
            *cmd,
            stdin=asyncio.subprocess.PIPE,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
            env=env,
        )
        stdout, stderr = await proc.communicate(input=prompt.encode("utf-8"))
        if proc.returncode != 0:
            raise RuntimeError(
                f"codex CLI exited {proc.returncode}: "
                f"{stderr.decode(errors='replace')[:1000]}"
            )
        return _strip_codex_exec_output(stdout.decode(errors="replace"))


def _strip_codex_exec_output(raw: str) -> str:
    """Extract the model response from `codex exec` stdout.

    Codex stdout layout:
        OpenAI Codex v...
        --------
        workdir: ...
        model: ...
        ...
        --------
        user
        <prompt>
        codex
        <response>
        tokens used
        <count>
        <response duplicated>

    Strategy: take everything after the first `\ncodex\n` line and before
    the `\ntokens used\n` line. If the markers are missing, return raw.
    """
    codex_marker = re.search(r"\ncodex\s*\n", raw)
    if not codex_marker:
        return raw.strip()
    after = raw[codex_marker.end():]
    tokens_marker = re.search(r"\ntokens used\s*\n", after)
    response = after[: tokens_marker.start()] if tokens_marker else after
    return response.strip()


def _make_evaluator(provider: str, model: str) -> EvaluatorProvider:
    if provider == "gemini":
        return GeminiEvaluator(model)
    if provider == "openai":
        return OpenAIEvaluator(model)
    if provider == "anthropic":
        return AnthropicEvaluator(model)
    if provider == "claude-cli":
        return ClaudeCliEvaluator(model)
    if provider == "codex-cli":
        return CodexCliEvaluator(model)
    raise ValueError(f"Unknown evaluator provider: {provider}")


# ────────────────────────────────────────────────────────────────────────────
# Evaluator invocation
# ────────────────────────────────────────────────────────────────────────────


def _build_evaluator_system_prompt(cfg: RunConfig) -> str:
    parts = [_read(cfg.evaluator_prompt_path)]
    rubric_dir = cfg.evaluator_prompt_path.parent / "architect-evaluator" / "rubric"
    if not rubric_dir.exists():
        rubric_dir = (
            cfg.evaluator_prompt_path.with_suffix("").parent
            / "architect-evaluator"
            / "rubric"
        )
    for f in (
        "business-outcome-fit.md",
        "objection-resolution.md",
        "wireframe-rubric.md",
        "decision-map-fidelity.md",
        "mobile-conversion-path.md",
        "structural-distinctiveness.md",
        "programmatic-checks.md",
        "cross-candidate-ranking.md",
    ):
        fp = rubric_dir / f
        if fp.exists():
            parts.append(f"\n\n--- RUBRIC: {f} ---\n\n{_read(fp)}")
    if cfg.strategic_diagnosis:
        parts.append(
            "\n\n--- STRATEGIC DIAGNOSIS EVALUATION POLICY ---\n\n"
            "The strategic diagnosis is binding. Apply its dynamic_evaluator_policy, "
            "hard_floors, anti_patterns, first_viewport_obligation, audience model, "
            "buyer/user split, and beauty/functionality balance. If the candidate violates "
            "a diagnosis hard floor, cap or block it according to that hard floor even if "
            "the layout seems competent. Penalize generic SaaS structure when the diagnosis "
            "names it as an anti-pattern."
        )
    return "\n".join(parts)


async def _call_evaluator(
    evaluator: EvaluatorProvider, cfg: RunConfig, candidate: Candidate
) -> str:
    system = _build_evaluator_system_prompt(cfg)
    refs = select_references_for_strategy(
        cfg.reference_items, cfg.intake_summary, candidate.strategy
    )
    reference_pack = format_reference_pack_for_prompt(refs)
    image_paths: list[pathlib.Path] = []
    screenshot_lines = ["SCREENSHOT ATTACHMENT ORDER:"]
    attachment_number = 1
    legacy_mode = False
    for vp_name, w, h in VIEWPORTS:
        bundle = candidate.screenshots.get(vp_name)
        if bundle and bundle.viewport and bundle.full:
            screenshot_lines.append(
                f"{attachment_number}. {vp_name} viewport screenshot, {w}x{h}, first fold only"
            )
            image_paths.append(bundle.viewport)
            attachment_number += 1
            screenshot_lines.append(f"{attachment_number}. {vp_name} full-page screenshot")
            image_paths.append(bundle.full)
            attachment_number += 1
        elif bundle and bundle.legacy:
            legacy_mode = True
            screenshot_lines.append(
                f"{attachment_number}. LEGACY {vp_name} full-page screenshot only; "
                f"first-viewport scoring is degraded until --rescreenshot is used"
            )
            image_paths.append(bundle.legacy)
            attachment_number += 1
    if legacy_mode:
        screenshot_lines.append(
            "Legacy screenshots are full-page captures from an old run. Do not claim "
            "exact first-fold evidence from them; recommend --rescreenshot where needed."
        )
    user_text = (
        f"Candidate strategy: {candidate.strategy}\n\n"
        f"=== STRATEGIC DIAGNOSIS HANDOFF ===\n"
        f"```json\n{_format_strategic_handoff_for_prompt(cfg.strategic_diagnosis, cfg.validator_result)}\n```\n\n"
        f"=== ACTIVE ORCHESTRATOR WEIGHTS ===\n"
        f"```json\n{json.dumps(cfg.dimension_weights, indent=2)}\n```\n\n"
        f"=== SPEC ({candidate.spec_path.name}) ===\n"
        f"{_read(candidate.spec_path)}\n\n"
        f"=== WIREFRAME HTML ({candidate.wireframe_path.name}) ===\n"
        f"```html\n{_read(candidate.wireframe_path)}\n```\n\n"
        f"=== REFERENCE CALIBRATION PACK ===\n"
        f"{reference_pack}\n\n"
        f"=== PROGRAMMATIC CHECK RESULTS ===\n"
        f"```json\n{json.dumps(candidate.programmatic_results, indent=2)}\n```\n\n"
        f"=== SCREENSHOTS ===\n"
        f"{chr(10).join(screenshot_lines)}\n\n"
        f"Now produce your verdict in the exact format specified by your "
        f"system prompt. No preamble, no postamble. Start with "
        f"`=== ARCHITECT EVALUATOR VERDICT ===`."
    )
    return await evaluator.evaluate(system, user_text, image_paths)


# ────────────────────────────────────────────────────────────────────────────
# Verdict parsing and ranking
# ────────────────────────────────────────────────────────────────────────────


def _parse_verdict(verdict: str) -> dict[str, float]:
    scores: dict[str, Any] = {}
    patterns = {
        "business_outcome_fit": r"BUSINESS_OUTCOME_FIT_SCORE:\s*([0-9.]+)",
        "objection_resolution": r"OBJECTION_RESOLUTION_SCORE:\s*([0-9.]+)",
        "wireframe_quality": r"WIREFRAME_QUALITY_SCORE:\s*([0-9.]+)",
        "decision_map_fidelity": r"DECISION_MAP_FIDELITY_SCORE:\s*([0-9.]+)",
        "mobile_conversion_path": r"MOBILE_CONVERSION_PATH_SCORE:\s*([0-9.]+)",
        "strategy_commitment": r"STRATEGY_COMMITMENT_SCORE:\s*([0-9.]+)",
        "structural_distinctiveness_diagnostic": r"STRUCTURAL_DISTINCTIVENESS_DIAGNOSTIC_SCORE:\s*([0-9.]+)",
        # Backward compatibility with old verdicts.
        "structural_distinctiveness": r"STRUCTURAL_DISTINCTIVENESS_SCORE:\s*([0-9.]+)",
        "programmatic_compliance": r"PROGRAMMATIC_COMPLIANCE_SCORE:\s*([0-9.]+)",
        "weighted_positive_total_reported": r"WEIGHTED_POSITIVE_TOTAL:\s*([0-9.]+)",
        "weighted_total_reported": r"WEIGHTED_TOTAL:\s*([0-9.]+)",
    }
    for key, pat in patterns.items():
        m = re.search(pat, verdict)
        if m:
            scores[key] = float(m.group(1))
    penalty = re.search(r"TROPE_REVERSION_PENALTY:\s*(-?[0-9.]+)", verdict)
    if not penalty:
        penalty = re.search(r"TROPE_REVERSION_PENALTY_APPLIED:\s*(-?[0-9.]+)", verdict)
    scores["trope_reversion_penalty"] = float(penalty.group(1)) if penalty else 0.0
    gate = re.search(r"PROGRAMMATIC_GATE_PASSED:\s*(yes|no)", verdict, re.IGNORECASE)
    if gate:
        scores["programmatic_gate_passed"] = gate.group(1).lower() == "yes"
    hf = re.search(r"HARD_FLOOR_VIOLATED:\s*(yes|no)", verdict, re.IGNORECASE)
    scores["hard_floor_violated"] = bool(hf and hf.group(1).lower() == "yes")
    eligible = re.search(
        r"ELIGIBLE_FOR_FINAL_RANKING:\s*(yes|no)", verdict, re.IGNORECASE
    )
    if eligible:
        scores["eligible_for_final_ranking"] = eligible.group(1).lower() == "yes"
    return scores


def _weighted_positive_total(
    scores: dict[str, float], weights: dict[str, float] | None = None
) -> float:
    active_weights = weights or DIMENSION_WEIGHTS
    return sum(float(scores.get(k, 0.0)) * w for k, w in active_weights.items())


def _weighted_total(scores: dict[str, float], weights: dict[str, float] | None = None) -> float:
    positive = _weighted_positive_total(scores, weights)
    penalty = max(-1.0, min(0.0, float(scores.get("trope_reversion_penalty", 0.0))))
    return max(0.0, min(10.0, positive + penalty))


def _apply_evaluator_scores(
    candidate: Candidate, weights: dict[str, float] | None = None, panel_weight: float = 0.0
) -> None:
    candidate.weighted_positive_total = _weighted_positive_total(candidate.parsed_scores, weights)
    candidate.weighted_total = _weighted_total(candidate.parsed_scores, weights)
    if candidate.panel_average and panel_weight > 0:
        panel_weight = max(0.0, min(0.5, panel_weight))
        candidate.weighted_total = (
            (1.0 - panel_weight) * candidate.weighted_total
            + panel_weight * candidate.panel_average
        )
    evaluator_hard_floor = bool(candidate.parsed_scores.get("hard_floor_violated", False))
    evaluator_gate_failed = (
        candidate.parsed_scores.get("programmatic_gate_passed") is False
    )
    candidate.hard_floor_violated = bool(
        candidate.hard_floor_violated or evaluator_hard_floor or evaluator_gate_failed
    )
    candidate.eligible_for_final_ranking = not candidate.hard_floor_violated


def _ranking_key(candidate: Candidate) -> tuple[Any, ...]:
    return (
        not candidate.eligible_for_final_ranking,
        -candidate.pairwise_points,
        -candidate.blind_pairwise_points,
        -candidate.weighted_total,
        -candidate.panel_average,
        -candidate.programmatic_score,
        candidate.revision_number,
        candidate.strategy,
    )


def _sort_candidates(candidates: list[Candidate]) -> list[Candidate]:
    return sorted(candidates, key=_ranking_key)


def _extract_json_object(text: str) -> dict[str, Any]:
    stripped = text.strip()
    if stripped.startswith("```"):
        stripped = re.sub(r"^```(?:json)?", "", stripped, flags=re.I).strip()
        stripped = re.sub(r"```$", "", stripped).strip()
    try:
        return json.loads(stripped)
    except json.JSONDecodeError:
        match = re.search(r"\{.*\}", stripped, re.DOTALL)
        if not match:
            raise
        return json.loads(match.group(0))


def _pairwise_image_paths(candidate: Candidate) -> tuple[list[str], list[pathlib.Path]]:
    labels: list[str] = []
    images: list[pathlib.Path] = []
    for vp in ("desktop", "mobile"):
        bundle = candidate.screenshots.get(vp)
        if bundle and bundle.viewport:
            labels.append(f"{candidate.strategy} {vp} viewport")
            images.append(bundle.viewport)
        if bundle and bundle.full and vp == "desktop":
            labels.append(f"{candidate.strategy} {vp} full page")
            images.append(bundle.full)
        if bundle and bundle.legacy:
            labels.append(f"{candidate.strategy} {vp} legacy full page")
            images.append(bundle.legacy)
    return labels, images


async def _call_pairwise_evaluator(
    evaluator: EvaluatorProvider,
    cfg: RunConfig,
    candidate_a: Candidate,
    candidate_b: Candidate,
) -> dict[str, Any]:
    system = _build_evaluator_system_prompt(cfg)
    refs = select_references_for_strategy(
        cfg.reference_items,
        cfg.intake_summary,
        f"{candidate_a.strategy},{candidate_b.strategy}",
    )
    labels_a, images_a = _pairwise_image_paths(candidate_a)
    labels_b, images_b = _pairwise_image_paths(candidate_b)
    image_labels = labels_a + labels_b
    user_text = f"""
STEP 5: Cross-candidate pairwise tournament.

Given the same brief, compare candidate A and candidate B. Absolute scores drift;
your job is relative judgment. Do not reward novelty by itself. Unusual structure
only matters if it improves business outcome, objection resolution, audience fit,
task completion, first viewport effectiveness, mobile path, or strategy commitment.
For `trope_risk`, choose the candidate with lower generic/trope risk.

INTAKE SUMMARY:
```
{cfg.intake_summary}
```

REFERENCE PACK:
{format_reference_pack_for_prompt(refs)}

CANDIDATE A: {candidate_a.strategy}
SPEC:
```
{_read(candidate_a.spec_path)}
```
PROGRAMMATIC:
```json
{json.dumps(candidate_a.programmatic_results, indent=2)}
```
INDIVIDUAL VERDICT:
```
{candidate_a.evaluator_verdict or ''}
```

CANDIDATE B: {candidate_b.strategy}
SPEC:
```
{_read(candidate_b.spec_path)}
```
PROGRAMMATIC:
```json
{json.dumps(candidate_b.programmatic_results, indent=2)}
```
INDIVIDUAL VERDICT:
```
{candidate_b.evaluator_verdict or ''}
```

SCREENSHOT ATTACHMENT ORDER:
{chr(10).join(f"{i + 1}. {label}" for i, label in enumerate(image_labels))}

Return ONLY valid JSON in this exact shape:
{{
  "candidate_a": "{candidate_a.strategy}",
  "candidate_b": "{candidate_b.strategy}",
  "winner": "A|B|tie",
  "confidence": 0.0,
  "scores": {{
    "business_outcome_fit": "A|B|tie",
    "objection_resolution": "A|B|tie",
    "first_viewport": "A|B|tie",
    "mobile_path": "A|B|tie",
    "strategy_commitment": "A|B|tie",
    "trope_risk": "A|B|tie"
  }},
  "reasoning": "...",
  "best_reusable_move_a": "...",
  "best_reusable_move_b": "...",
  "synthesis_recommended": true
}}
""".strip()
    raw = await evaluator.evaluate(system, user_text, images_a + images_b)
    parsed = _extract_json_object(raw)
    parsed.setdefault("candidate_a", candidate_a.strategy)
    parsed.setdefault("candidate_b", candidate_b.strategy)
    parsed.setdefault("winner", "tie")
    parsed.setdefault("confidence", 0.0)
    return parsed


def _strategy_diversity_summary(
    candidates: list[Candidate], pairwise_results: list[dict[str, Any]]
) -> dict[str, Any]:
    commitment = {
        c.strategy: float(c.parsed_scores.get("strategy_commitment", 0.0))
        for c in candidates
    }
    most = max(commitment, key=commitment.get) if commitment else None
    least = min(commitment, key=commitment.get) if commitment else None
    collapsed: list[list[str]] = []
    for result in pairwise_results:
        scores = result.get("scores", {})
        if (
            result.get("winner") == "tie"
            and scores.get("strategy_commitment") == "tie"
            and scores.get("first_viewport") == "tie"
        ):
            collapsed.append([result["candidate_a"], result["candidate_b"]])
    return {
        "collapsed_strategies": collapsed,
        "most_distinct": most,
        "least_distinct": least,
        "notes": (
            "Diagnostic only. Distinctiveness across candidates is inferred from "
            "pairwise strategy-commitment and first-viewport ties; it is not a "
            "positive winner boost."
        ),
    }


async def run_pairwise_tournament(
    evaluator: EvaluatorProvider,
    cfg: RunConfig,
    candidates: list[Candidate],
) -> list[dict[str, Any]]:
    eligible = [c for c in candidates if c.eligible_for_final_ranking]
    pool = eligible if eligible else list(candidates)
    pool = _sort_candidates(pool)
    if cfg.pairwise_top_k > 0:
        pool = pool[: cfg.pairwise_top_k]
    if len(pool) < 2:
        return []

    print(f"\n=== STEP 5: Pairwise tournament on {len(pool)} candidates ===")
    pairwise_results: list[dict[str, Any]] = []
    for a, b in itertools.combinations(pool, 2):
        print(f"  [{a.strategy} vs {b.strategy}] pairwise judging")
        try:
            result = await _call_pairwise_evaluator(evaluator, cfg, a, b)
        except Exception as exc:
            result = {
                "candidate_a": a.strategy,
                "candidate_b": b.strategy,
                "winner": "tie",
                "confidence": 0.0,
                "error": str(exc),
                "synthesis_recommended": False,
            }
        pairwise_results.append(result)
        safe_a = re.sub(r"[^a-z0-9_-]+", "-", a.strategy.lower())
        safe_b = re.sub(r"[^a-z0-9_-]+", "-", b.strategy.lower())
        (cfg.out_dir / f"pairwise.{safe_a}_vs_{safe_b}.json").write_text(
            json.dumps(result, indent=2), encoding="utf-8"
        )
        winner = str(result.get("winner", "tie")).lower()
        if winner == "a":
            a.pairwise_points += 1
            a.pairwise_record["wins"] += 1
            b.pairwise_record["losses"] += 1
        elif winner == "b":
            b.pairwise_points += 1
            b.pairwise_record["wins"] += 1
            a.pairwise_record["losses"] += 1
        else:
            a.pairwise_points += 0.5
            b.pairwise_points += 0.5
            a.pairwise_record["ties"] += 1
            b.pairwise_record["ties"] += 1

    tournament = {
        "pairwise_enabled": True,
        "participants": [c.strategy for c in pool],
        "points": {c.strategy: c.pairwise_points for c in pool},
        "records": {c.strategy: c.pairwise_record for c in pool},
        "strategy_diversity": _strategy_diversity_summary(pool, pairwise_results),
        "results": pairwise_results,
    }
    (cfg.out_dir / "TOURNAMENT.json").write_text(
        json.dumps(tournament, indent=2), encoding="utf-8"
    )
    absolute_lines = [
        f"{c.strategy}\teligible={c.eligible_for_final_ranking}\tabs={c.weighted_total:.2f}\tprogrammatic={c.programmatic_score:.1f}"
        for c in _sort_candidates(candidates)
    ]
    (cfg.out_dir / "RANKING.absolute.txt").write_text(
        "\n".join(absolute_lines) + "\n", encoding="utf-8"
    )
    pairwise_lines = [
        f"{c.strategy}\tpoints={c.pairwise_points:.1f}\trecord={c.pairwise_record}\tabs={c.weighted_total:.2f}"
        for c in _sort_candidates(pool)
    ]
    (cfg.out_dir / "RANKING.pairwise.txt").write_text(
        "\n".join(pairwise_lines) + "\n", encoding="utf-8"
    )
    return pairwise_results



async def _call_blind_pairwise_evaluator(
    evaluator: EvaluatorProvider,
    cfg: RunConfig,
    candidate_a: Candidate,
    candidate_b: Candidate,
) -> dict[str, Any]:
    """Pairwise screenshot judge with no spec, no previous verdict, and no programmatic JSON."""
    system = (
        "You are a blind SaaS design perception judge. You see only the brief, "
        "strategic diagnosis, and screenshots. Do not infer hidden intent from specs. "
        "Judge what a real user/buyer can perceive and do from the rendered page. "
        "Return valid JSON only."
    )
    labels_a, images_a = _pairwise_image_paths(candidate_a)
    labels_b, images_b = _pairwise_image_paths(candidate_b)
    image_labels = labels_a + labels_b
    user_text = f"""
BLIND PAIRWISE JUDGMENT

INTAKE SUMMARY:
```
{cfg.intake_summary}
```

STRATEGIC DIAGNOSIS HANDOFF:
```json
{_format_strategic_handoff_for_prompt(cfg.strategic_diagnosis, cfg.validator_result)}
```

Candidate A label: {candidate_a.strategy}
Candidate B label: {candidate_b.strategy}

SCREENSHOT ATTACHMENT ORDER:
{chr(10).join(f"{i + 1}. {label}" for i, label in enumerate(image_labels))}

Return ONLY valid JSON in this exact shape:
{{
  "candidate_a": "{candidate_a.strategy}",
  "candidate_b": "{candidate_b.strategy}",
  "winner": "A|B|tie",
  "confidence": 0.0,
  "perception": {{
    "who_is_this_for_a": "...",
    "who_is_this_for_b": "...",
    "primary_action_clearer": "A|B|tie",
    "first_viewport_clearer": "A|B|tie",
    "trust_more_visible": "A|B|tie",
    "mobile_more_usable": "A|B|tie",
    "diagnosis_fit_from_screenshots": "A|B|tie"
  }},
  "reasoning": "...",
  "blocking_visual_issue_a": "... or none",
  "blocking_visual_issue_b": "... or none"
}}
""".strip()
    raw = await evaluator.evaluate(system, user_text, images_a + images_b)
    parsed = _extract_json_object(raw)
    parsed.setdefault("candidate_a", candidate_a.strategy)
    parsed.setdefault("candidate_b", candidate_b.strategy)
    parsed.setdefault("winner", "tie")
    parsed.setdefault("confidence", 0.0)
    return parsed


async def run_blind_pairwise_tournament(
    evaluator: EvaluatorProvider,
    cfg: RunConfig,
    candidates: list[Candidate],
) -> list[dict[str, Any]]:
    eligible = [c for c in candidates if c.eligible_for_final_ranking]
    pool = _sort_candidates(eligible if eligible else list(candidates))
    if cfg.pairwise_top_k > 0:
        pool = pool[: cfg.pairwise_top_k]
    if len(pool) < 2:
        return []
    print(f"\n=== BLIND PAIRWISE SCREENSHOT TOURNAMENT on {len(pool)} candidates ===")
    results: list[dict[str, Any]] = []
    for a, b in itertools.combinations(pool, 2):
        print(f"  [{a.strategy} vs {b.strategy}] blind screenshot judging")
        try:
            result = await _call_blind_pairwise_evaluator(evaluator, cfg, a, b)
        except Exception as exc:
            result = {
                "candidate_a": a.strategy,
                "candidate_b": b.strategy,
                "winner": "tie",
                "confidence": 0.0,
                "error": str(exc),
            }
        results.append(result)
        safe_a = re.sub(r"[^a-z0-9_-]+", "-", a.strategy.lower())
        safe_b = re.sub(r"[^a-z0-9_-]+", "-", b.strategy.lower())
        (cfg.out_dir / f"blind_pairwise.{safe_a}_vs_{safe_b}.json").write_text(
            json.dumps(result, indent=2), encoding="utf-8"
        )
        winner = str(result.get("winner", "tie")).lower()
        if winner == "a":
            a.blind_pairwise_points += 1
            a.blind_pairwise_record["wins"] += 1
            b.blind_pairwise_record["losses"] += 1
        elif winner == "b":
            b.blind_pairwise_points += 1
            b.blind_pairwise_record["wins"] += 1
            a.blind_pairwise_record["losses"] += 1
        else:
            a.blind_pairwise_points += 0.5
            b.blind_pairwise_points += 0.5
            a.blind_pairwise_record["ties"] += 1
            b.blind_pairwise_record["ties"] += 1
    tournament = {
        "blind_pairwise_enabled": True,
        "participants": [c.strategy for c in pool],
        "points": {c.strategy: c.blind_pairwise_points for c in pool},
        "records": {c.strategy: c.blind_pairwise_record for c in pool},
        "results": results,
    }
    (cfg.out_dir / "TOURNAMENT.blind.json").write_text(
        json.dumps(tournament, indent=2), encoding="utf-8"
    )
    return results


PANEL_JUDGES: dict[str, str] = {
    "strategy_fit": "Judge whether the candidate visibly follows the strategic diagnosis, audience/buyer split, business outcome, and assigned strategy.",
    "first_viewport": "Judge the first viewport only: can the intended user understand, trust enough, and act without scrolling?",
    "conversion_or_task_path": "Judge whether the rendered structure creates a credible conversion/task path for the diagnosed SaaS context.",
    "mobile_path": "Judge mobile-first usability, action reachability, stack priority, and whether mobile hides proof/action.",
    "anti_pattern_taste": "Judge generic SaaS trope risk, diagnosis-specific anti-pattern violations, and whether visual appropriateness fits the diagnosed beauty/function balance.",
}


async def _call_panel_judge(
    evaluator: EvaluatorProvider,
    cfg: RunConfig,
    candidate: Candidate,
    judge_name: str,
    judge_instruction: str,
) -> dict[str, Any]:
    system = (
        "You are one member of a harsh multi-judge SaaS design bench. "
        "Return valid JSON only. Use score 6 for competent median AI output, 8 for strong, and 9+ only for rare exceptional work."
    )
    labels, images = _pairwise_image_paths(candidate)
    user_text = f"""
JUDGE ROLE: {judge_name}
ROLE INSTRUCTION: {judge_instruction}

INTAKE SUMMARY:
```
{cfg.intake_summary}
```

STRATEGIC DIAGNOSIS HANDOFF:
```json
{_format_strategic_handoff_for_prompt(cfg.strategic_diagnosis, cfg.validator_result)}
```

CANDIDATE: {candidate.strategy}
PROGRAMMATIC CHECKS:
```json
{json.dumps(candidate.programmatic_results, indent=2)}
```

SCREENSHOT ATTACHMENT ORDER:
{chr(10).join(f"{i + 1}. {label}" for i, label in enumerate(labels))}

Return ONLY valid JSON:
{{
  "candidate": "{candidate.strategy}",
  "judge": "{judge_name}",
  "score": 0.0,
  "hard_fail": false,
  "hard_fail_reason": "... or none",
  "top_strength": "...",
  "top_failure": "...",
  "revision_directive": "..."
}}
""".strip()
    raw = await evaluator.evaluate(system, user_text, images)
    parsed = _extract_json_object(raw)
    parsed.setdefault("candidate", candidate.strategy)
    parsed.setdefault("judge", judge_name)
    parsed.setdefault("score", 0.0)
    parsed.setdefault("hard_fail", False)
    return parsed


async def run_judge_panel(
    evaluator: EvaluatorProvider,
    cfg: RunConfig,
    candidates: list[Candidate],
) -> dict[str, Any]:
    print(f"\n=== JUDGE PANEL on {len(candidates)} candidates ===")
    panel_results: dict[str, Any] = {"judges": list(PANEL_JUDGES.keys()), "candidates": {}}
    for candidate in candidates:
        candidate.panel_scores = {}
        candidate.panel_hard_failures = []
        raw_results: list[dict[str, Any]] = []
        for judge_name, instruction in PANEL_JUDGES.items():
            print(f"  [{candidate.strategy}] panel judge: {judge_name}")
            try:
                result = await _call_panel_judge(
                    evaluator, cfg, candidate, judge_name, instruction
                )
            except Exception as exc:
                result = {
                    "candidate": candidate.strategy,
                    "judge": judge_name,
                    "score": 0.0,
                    "hard_fail": True,
                    "hard_fail_reason": f"judge_error: {exc}",
                }
            raw_results.append(result)
            try:
                score = max(0.0, min(10.0, float(result.get("score", 0.0))))
            except (TypeError, ValueError):
                score = 0.0
            candidate.panel_scores[judge_name] = score
            if result.get("hard_fail"):
                candidate.panel_hard_failures.append(
                    f"{judge_name}: {result.get('hard_fail_reason', 'hard fail')}"
                )
        if candidate.panel_scores:
            candidate.panel_average = sum(candidate.panel_scores.values()) / len(candidate.panel_scores)
            _apply_evaluator_scores(candidate, cfg.dimension_weights, cfg.panel_weight)
        if candidate.panel_hard_failures:
            candidate.hard_floor_violated = True
            candidate.eligible_for_final_ranking = False
        panel_results["candidates"][candidate.strategy] = {
            "panel_average": candidate.panel_average,
            "panel_scores": candidate.panel_scores,
            "hard_failures": candidate.panel_hard_failures,
            "raw_results": raw_results,
        }
    (cfg.out_dir / "PANEL.json").write_text(
        json.dumps(panel_results, indent=2), encoding="utf-8"
    )
    return panel_results


async def _call_synthesis_architect_cli(
    cfg: RunConfig,
    top_candidates: list[Candidate],
) -> dict[str, Any]:
    if shutil.which("claude") is None:
        raise RuntimeError("claude CLI not found on PATH.")

    synth_spec = cfg.out_dir / "UI_SPEC.synthesized.md"
    synth_wf = cfg.out_dir / "wireframe.synthesized.html"
    base = top_candidates[0]
    candidate_blocks = []
    for index, candidate in enumerate(top_candidates, 1):
        candidate_blocks.append(
            f"""
--- CANDIDATE {index}: {candidate.strategy} ---
PROGRAMMATIC_SCORE: {candidate.programmatic_score}
WEIGHTED_TOTAL: {candidate.weighted_total:.2f}
PAIRWISE_POINTS: {candidate.pairwise_points:.1f}
SPEC:
```
{_read(candidate.spec_path)}
```
WIREFRAME HTML:
```html
{_read(candidate.wireframe_path)}
```
"""
        )

    user_prompt = f"""
You are the ui-architect agent. Run a synthesis pass after Best-of-N search.

Use {base.strategy} as the base architecture. Borrow only explicitly better
structural moves from the runner-up candidates. Do not mash unrelated sections
together. Preserve spec-wireframe coherence and update Sections 4D, 4E, 5, 6,
11, and 12 so every included component and selector matches the HTML.

INTAKE SUMMARY:
```
{cfg.intake_summary.strip()}
```

TOP CANDIDATES:
{chr(10).join(candidate_blocks)}

Write exactly:
  Spec:      {synth_spec}
  Wireframe: {synth_wf}

After both files are written, output:
  STRATEGY=synthesized | SPEC={synth_spec} | WIREFRAME={synth_wf} | BASE={base.strategy}
""".strip()
    cmd = [
        "claude",
        "-p",
        user_prompt,
        "--allowedTools",
        "Read,Write,Edit,Bash,Glob,Grep",
        "--permission-mode",
        "acceptEdits",
        "--output-format",
        "json",
    ]
    if not cfg.use_installed_agent:
        cmd.extend(["--append-system-prompt", _build_architect_system_prompt(cfg)])
    env = {k: v for k, v in os.environ.items() if k != "ANTHROPIC_API_KEY"}
    proc = await asyncio.create_subprocess_exec(
        *cmd,
        stdin=asyncio.subprocess.DEVNULL,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
        env=env,
    )
    stdout, stderr = await proc.communicate()
    out_text = stdout.decode(errors="replace")
    if proc.returncode != 0 or "Credit balance is too low" in out_text:
        return {
            "error": f"claude -p synthesis exited {proc.returncode}",
            "stderr": stderr.decode(errors="replace")[:2000],
            "stdout": out_text[:2000],
        }
    try:
        return json.loads(out_text)
    except json.JSONDecodeError as exc:
        return {"error": f"Could not parse synthesis JSON output: {exc}"}


async def _maybe_run_synthesis(
    evaluator: EvaluatorProvider,
    cfg: RunConfig,
    candidates: list[Candidate],
) -> None:
    eligible = [c for c in candidates if c.eligible_for_final_ranking]
    if len(eligible) < 2:
        print("\n=== SYNTHESIS: skipped; fewer than two eligible candidates ===")
        return
    top_candidates = _sort_candidates(eligible)[: cfg.synthesize_top_k]
    if len(top_candidates) < 2:
        return
    print(f"\n=== SYNTHESIS: top {len(top_candidates)} candidates ===")
    result = await _call_synthesis_architect_cli(cfg, top_candidates)
    if "error" in result:
        print(f"  [synthesized] FAILED: {result['error']}")
        (cfg.out_dir / "_error.synthesized.json").write_text(
            json.dumps(result, indent=2), encoding="utf-8"
        )
        return

    synth = Candidate(
        strategy="synthesized",
        spec_path=cfg.out_dir / "UI_SPEC.synthesized.md",
        wireframe_path=cfg.out_dir / "wireframe.synthesized.html",
    )
    if not synth.spec_path.exists() or not synth.wireframe_path.exists():
        print("  [synthesized] FAILED: expected files were not written")
        return

    await _screenshot_wireframe(synth, cfg.out_dir)
    await run_programmatic_checks(synth, cfg.references_dir, cfg.reference_items, cfg.strategic_diagnosis)
    if synth.hard_floor_violated:
        print(
            f"  [synthesized] rejected: programmatic score {synth.programmatic_score:.1f}"
        )
        return

    synth.evaluator_verdict = await _call_evaluator(evaluator, cfg, synth)
    (cfg.out_dir / "verdict.synthesized.txt").write_text(
        synth.evaluator_verdict, encoding="utf-8"
    )
    synth.parsed_scores = _parse_verdict(synth.evaluator_verdict)
    _apply_evaluator_scores(synth, cfg.dimension_weights, cfg.panel_weight if cfg.judge_panel else 0.0)
    winner = _sort_candidates(eligible)[0]
    comparison = await _call_pairwise_evaluator(evaluator, cfg, synth, winner)
    (cfg.out_dir / f"pairwise.synthesized_vs_{winner.strategy}.json").write_text(
        json.dumps(comparison, indent=2), encoding="utf-8"
    )
    if comparison.get("winner") == "A" and synth.eligible_for_final_ranking:
        print("  [synthesized] accepted; beat original winner in pairwise comparison")
        synth.pairwise_points = winner.pairwise_points + 1
        candidates.append(synth)
    else:
        print("  [synthesized] rejected; did not beat original winner")


# ────────────────────────────────────────────────────────────────────────────
# Top-level orchestration
# ────────────────────────────────────────────────────────────────────────────


async def run(cfg: RunConfig) -> list[Candidate]:
    cfg.out_dir.mkdir(parents=True, exist_ok=True)
    if cfg.references_dir and not cfg.reference_items:
        cfg.reference_items = load_reference_library(cfg.references_dir)
        print(f"[references] loaded {len(cfg.reference_items)} curated references")
    evaluator = _make_evaluator(cfg.evaluator_provider, cfg.evaluator_model)

    print(
        f"\n=== STEP 1: Architect via Claude Code CLI for {len(cfg.strategies)} strategies ==="
    )
    architect_tasks = [_run_architect_for_strategy(cfg, s) for s in cfg.strategies]
    candidates_or_none = await asyncio.gather(*architect_tasks)
    candidates = [c for c in candidates_or_none if c is not None]
    total_arch_cost = sum(c.cli_cost_usd for c in candidates)
    print(
        f"  → {len(candidates)} candidates produced "
        f"(architect cost: ${total_arch_cost:.4f})"
    )
    if not candidates:
        print("All architect runs failed. Check error logs in output directory.")
        return []

    print(f"\n=== STEP 2: Screenshotting {len(candidates)} wireframes ===")
    await asyncio.gather(*[_screenshot_wireframe(c, cfg.out_dir) for c in candidates])

    print("\n=== STEP 3: Programmatic checks ===")
    for candidate in candidates:
        checks = await run_programmatic_checks(
            candidate, cfg.references_dir, cfg.reference_items, cfg.strategic_diagnosis
        )
        score = checks["score_derivation"]["score"]
        print(
            f"  [{candidate.strategy}] programmatic score = {score} "
            f"({checks['score_derivation']['reasoning'][:80]})"
        )
        if (
            (score < 9 or _category_failed(checks))
            and cfg.max_revisions > 0
            and candidate.revision_number < cfg.max_revisions
        ):
            directive = _build_revision_directive(checks)
            if directive:
                print(f"  [{candidate.strategy}] sending back for revision")
                await _call_architect_cli(cfg, candidate.strategy, directive)
                if candidate.spec_path.exists() and candidate.wireframe_path.exists():
                    candidate.revision_number += 1
                    await _screenshot_wireframe(candidate, cfg.out_dir)
                    await run_programmatic_checks(
                        candidate, cfg.references_dir, cfg.reference_items, cfg.strategic_diagnosis
                    )

    print(
        f"\n=== STEP 4: Evaluator ({cfg.evaluator_provider} / {cfg.evaluator_model}) "
        f"on {len(candidates)} candidates ==="
    )
    eval_tasks = [_call_evaluator(evaluator, cfg, c) for c in candidates]
    verdicts = await asyncio.gather(*eval_tasks, return_exceptions=True)
    for candidate, verdict in zip(candidates, verdicts):
        if isinstance(verdict, Exception):
            print(f"  [{candidate.strategy}] EVALUATOR FAILED: {verdict}")
            continue
        candidate.evaluator_verdict = verdict
        verdict_path = cfg.out_dir / f"verdict.{candidate.strategy}.txt"
        verdict_path.write_text(verdict, encoding="utf-8")
        candidate.parsed_scores = _parse_verdict(verdict)
        _apply_evaluator_scores(candidate, cfg.dimension_weights, cfg.panel_weight if cfg.judge_panel else 0.0)
        print(
            f"  [{candidate.strategy}] weighted_total={candidate.weighted_total:.2f} "
            f"programmatic={candidate.programmatic_score:.1f} "
            f"eligible={candidate.eligible_for_final_ranking}"
        )

    candidates = _sort_candidates(candidates)
    if cfg.judge_panel:
        await run_judge_panel(evaluator, cfg, candidates)
        candidates = _sort_candidates(candidates)
        (cfg.out_dir / "RANKING.txt").write_text(
            _format_final_report(candidates), encoding="utf-8"
        )
    if cfg.blind_pairwise:
        await run_blind_pairwise_tournament(evaluator, cfg, candidates)
        candidates = _sort_candidates(candidates)
        (cfg.out_dir / "RANKING.txt").write_text(
            _format_final_report(candidates), encoding="utf-8"
        )
    if cfg.pairwise:
        await run_pairwise_tournament(evaluator, cfg, candidates)
        candidates = _sort_candidates(candidates)
        (cfg.out_dir / "RANKING.txt").write_text(
            _format_final_report(candidates), encoding="utf-8"
        )
    if cfg.synthesize_top_k > 0:
        await _maybe_run_synthesis(evaluator, cfg, candidates)
        candidates = _sort_candidates(candidates)
    return candidates


def _format_final_report(candidates: list[Candidate]) -> str:
    lines = ["", "=" * 80, "FINAL RANKING", "=" * 80, ""]
    if candidates:
        winner = _sort_candidates(candidates)[0]
        lines.append(f"FINAL WINNER: {winner.strategy}")
        lines.append(
            "Why it won: highest final ranking after programmatic gate, "
            "pairwise points when available, absolute outcome-weighted score, "
            "and programmatic score tie-breakers."
        )
        if any(c.pairwise_points for c in candidates):
            runner_up = _sort_candidates(candidates)[1] if len(candidates) > 1 else None
            if runner_up:
                lines.append(
                    f"Runner-up note: {runner_up.strategy} scored "
                    f"{runner_up.pairwise_points:.1f} pairwise points and may contain reusable moves; "
                    "see TOURNAMENT.json for pairwise reasons."
                )
        synthesis_recommended = False
        tournament_path = candidates[0].spec_path.parent / "TOURNAMENT.json"
        if tournament_path.exists():
            try:
                tournament = json.loads(tournament_path.read_text(encoding="utf-8"))
                synthesis_recommended = any(
                    r.get("synthesis_recommended")
                    for r in tournament.get("results", [])
                )
            except json.JSONDecodeError:
                synthesis_recommended = False
        lines.append(
            "Synthesis: "
            + (
                "recommended by at least one pairwise judgment; accepted only if a synthesized candidate appears in this ranking."
                if synthesis_recommended
                else "not recommended/accepted in this run."
            )
        )
        lines.append("")
    for rank, c in enumerate(candidates, 1):
        marker = "BLOCKED" if c.hard_floor_violated else "OK"
        penalty = c.parsed_scores.get("trope_reversion_penalty", 0.0)
        lines.append(
            f"{marker:7s} #{rank} {c.strategy:30s} "
            f"total={c.weighted_total:5.2f} positive={c.weighted_positive_total:5.2f} "
            f"trope_penalty={penalty:4.1f}"
        )
        lines.append(
            f"     programmatic_gate={'pass' if c.programmatic_passed else 'fail'} "
            f"programmatic_score={c.programmatic_score:.1f} "
            f"hard_floor={c.hard_floor_violated} eligible={c.eligible_for_final_ranking} "
            f"pairwise_points={c.pairwise_points:.1f} record={c.pairwise_record} "
            f"blind_points={c.blind_pairwise_points:.1f} blind_record={c.blind_pairwise_record} "
            f"panel_avg={c.panel_average:.1f}"
        )
        if c.panel_scores:
            lines.append(f"     panel_scores={json.dumps(c.panel_scores, sort_keys=True)}")
        if c.panel_hard_failures:
            lines.append(f"     panel_hard_failures={c.panel_hard_failures}")
        for dim in (
            "business_outcome_fit",
            "objection_resolution",
            "wireframe_quality",
            "decision_map_fidelity",
            "mobile_conversion_path",
            "strategy_commitment",
            "structural_distinctiveness_diagnostic",
        ):
            v = c.parsed_scores.get(dim, "—")
            v_str = f"{v:.1f}" if isinstance(v, float) else str(v)
            lines.append(f"     {dim:32s} {v_str}")
        if c.programmatic_results:
            reasoning = c.programmatic_results.get("score_derivation", {}).get(
                "reasoning", ""
            )
            if reasoning and reasoning != "All checks passed.":
                lines.append(f"     gate_reason: {reasoning[:260]}")
        lines.append("")
    lines.append("=" * 80)
    total_arch_cost = sum(c.cli_cost_usd for c in candidates)
    lines.append(f"Architect cost (Claude Code CLI): ${total_arch_cost:.4f}")
    lines.append("Evaluator cost: tracked separately by your provider's dashboard.")
    return "\n".join(lines)


# ────────────────────────────────────────────────────────────────────────────
# CLI
# ────────────────────────────────────────────────────────────────────────────


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Best-of-N architect orchestrator + evaluator (hybrid edition)"
    )
    parser.add_argument("--intake", required=True, help="Path to intake summary file")
    parser.add_argument("--out", required=True, help="Output directory")
    parser.add_argument(
        "--strategies",
        default=",".join(DEFAULT_STRATEGIES),
        help="Comma-separated list of strategies",
    )
    parser.add_argument("--references", default=None)
    parser.add_argument(
        "--strategic-diagnosis",
        default=None,
        help="Path to validated strategic_diagnosis.v1 JSON from Agent 01.",
    )
    parser.add_argument(
        "--validator-result",
        default=None,
        help="Optional semantic validator result JSON for the strategic diagnosis.",
    )
    parser.add_argument(
        "--use-diagnosis-strategies",
        action="store_true",
        help="Ignore --strategies and use candidate_strategy_seeds from strategic diagnosis.",
    )
    parser.add_argument("--architect-prompt", default="ui-architect.md")
    parser.add_argument("--evaluator-prompt", default="architect-evaluator.md")
    parser.add_argument("--knowledge-dir", default="ui-architect/knowledge")
    parser.add_argument(
        "--evaluator-provider",
        default="gemini",
        choices=EVALUATOR_PROVIDER_CHOICES,
        help="Vision/text provider for evaluation. CLI options (claude-cli, codex-cli) "
             "use local subscriptions instead of API credit (default: gemini)",
    )
    parser.add_argument(
        "--evaluator-model",
        default=None,
        help=(
            "Override evaluator model. If omitted, uses ARCH_EVAL_GEMINI_MODEL/"
            "ARCH_EVAL_OPENAI_MODEL/ARCH_EVAL_ANTHROPIC_MODEL, then harness fallback defaults."
        ),
    )
    parser.add_argument(
        "--pairwise",
        action="store_true",
        help="Run cross-candidate pairwise tournament after individual evaluation.",
    )
    parser.add_argument(
        "--pairwise-top-k",
        type=int,
        default=10,
        help="Maximum candidates to include in pairwise tournament (default: 10; <=0 means all).",
    )
    parser.add_argument(
        "--blind-pairwise",
        action="store_true",
        help="Run screenshot-only pairwise tournament with no spec/verdict anchoring.",
    )
    parser.add_argument(
        "--judge-panel",
        action="store_true",
        help="Run multi-judge diagnosis-aware panel and blend panel average into score.",
    )
    parser.add_argument(
        "--panel-weight",
        type=float,
        default=0.20,
        help="Weight of panel average in final absolute score when --judge-panel is enabled (default: 0.20).",
    )
    parser.add_argument(
        "--synthesize-top-k",
        type=int,
        default=0,
        help="Optional synthesis stage over top K candidates; off by default.",
    )
    parser.add_argument(
        "--no-synthesis",
        action="store_true",
        help="Disable synthesis even if --synthesize-top-k is provided.",
    )
    parser.add_argument(
        "--use-installed-agent",
        action="store_true",
        help="Skip inline system prompt; assume ui-architect installed in .claude/agents/",
    )
    args = parser.parse_args()

    evaluator_model = args.evaluator_model or _default_evaluator_model(
        args.evaluator_provider
    )
    references_dir = pathlib.Path(args.references) if args.references else None
    reference_items = load_reference_library(references_dir) if references_dir else []
    diagnosis_path = pathlib.Path(args.strategic_diagnosis) if args.strategic_diagnosis else None
    validator_path = pathlib.Path(args.validator_result) if args.validator_result else None
    strategic_diagnosis = _load_json_file(diagnosis_path)
    validator_result = _load_json_file(validator_path)
    strategy_seed_map = _build_strategy_seed_map(strategic_diagnosis)
    cli_strategies = [
        _normalize_strategy_name(s) for s in args.strategies.split(",") if s.strip()
    ]
    strategies = (
        _strategies_from_diagnosis(strategic_diagnosis, cli_strategies)
        if args.use_diagnosis_strategies
        else _dedupe_preserve_order(cli_strategies)
    )
    dimension_weights = _adapt_dimension_weights_from_diagnosis(strategic_diagnosis)

    cfg = RunConfig(
        intake_summary=pathlib.Path(args.intake).read_text(encoding="utf-8"),
        out_dir=pathlib.Path(args.out),
        strategies=strategies,
        references_dir=references_dir,
        architect_prompt_path=pathlib.Path(args.architect_prompt),
        evaluator_prompt_path=pathlib.Path(args.evaluator_prompt),
        knowledge_dir=pathlib.Path(args.knowledge_dir),
        evaluator_provider=args.evaluator_provider,
        evaluator_model=evaluator_model,
        use_installed_agent=args.use_installed_agent,
        pairwise=args.pairwise,
        pairwise_top_k=args.pairwise_top_k,
        blind_pairwise=args.blind_pairwise,
        judge_panel=args.judge_panel,
        panel_weight=args.panel_weight,
        synthesize_top_k=0 if args.no_synthesis else args.synthesize_top_k,
        strategic_diagnosis_path=diagnosis_path,
        validator_result_path=validator_path,
        strategic_diagnosis=strategic_diagnosis,
        validator_result=validator_result,
        strategy_seed_map=strategy_seed_map,
        dimension_weights=dimension_weights,
        reference_items=reference_items,
    )

    if shutil.which("claude") is None:
        print(
            "ERROR: claude CLI not found. Install: npm install -g @anthropic-ai/claude-code",
            file=sys.stderr,
        )
        return 2

    candidates = asyncio.run(run(cfg))
    report = _format_final_report(candidates)
    print(report)
    (cfg.out_dir / "RANKING.txt").write_text(report, encoding="utf-8")
    return 0


if __name__ == "__main__":
    sys.exit(main())
