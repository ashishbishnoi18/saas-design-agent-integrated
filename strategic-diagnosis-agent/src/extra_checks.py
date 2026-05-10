"""Extra deterministic checks for Strategic Diagnosis v1.

These checks complement JSON Schema validation. They catch issues that are
technically schema-valid but strategically unsafe to pass downstream.
"""

from __future__ import annotations

import json
import re
from collections import Counter
from typing import Any, Dict, List

GENERIC_PHRASES = [
    "modern and clean",
    "clean and modern",
    "user-friendly",
    "intuitive experience",
    "intuitive",
    "clear cta",
    "engaging visuals",
    "seamless experience",
    "professional design",
    "build trust",
    "show value",
    "easy to use",
]

LAYOUT_WORDS = [
    "hero section",
    "features section",
    "testimonial section",
    "pricing section",
    "faq section",
    "footer",
    "three cards",
    "card grid",
]


def _err(field: str, error: str, severity: str = "error") -> Dict[str, str]:
    return {"field": field, "error": error, "severity": severity}


def _flatten_text(value: Any) -> str:
    return json.dumps(value, ensure_ascii=False).lower()


def _weights_sum_check(diagnosis: Dict[str, Any], errors: List[Dict[str, str]]) -> None:
    try:
        weights = diagnosis["dynamic_evaluator_policy"]["weights"]
        total = sum(float(v) for v in weights.values())
    except Exception as exc:  # noqa: BLE001
        errors.append(_err("dynamic_evaluator_policy.weights", f"could not compute weight sum: {exc}"))
        return

    if abs(total - 1.0) > 0.001:
        errors.append(
            _err(
                "dynamic_evaluator_policy.weights",
                f"weights_sum_is_{total:.6f}, expected 1.0",
            )
        )


def _unknown_confidence_check(diagnosis: Dict[str, Any], errors: List[Dict[str, str]]) -> None:
    axes = diagnosis.get("strategic_axes", {})
    conf = diagnosis.get("confidence", {})
    overall = float(conf.get("overall", 0))

    if axes.get("primary_archetype") == "unknown" and overall > 0.5:
        errors.append(
            _err(
                "strategic_axes.primary_archetype",
                "primary archetype is unknown despite non-low confidence",
            )
        )

    if axes.get("market_type") == "unknown" and overall > 0.5:
        errors.append(
            _err(
                "strategic_axes.market_type",
                "market type is unknown despite non-low confidence",
            )
        )


def _generic_phrase_check(diagnosis: Dict[str, Any], errors: List[Dict[str, str]]) -> None:
    serialized = _flatten_text(diagnosis)
    for phrase in GENERIC_PHRASES:
        if phrase in serialized:
            errors.append(_err("global", f"generic phrase detected: {phrase}", "warning"))


def _layout_leak_check(diagnosis: Dict[str, Any], errors: List[Dict[str, str]]) -> None:
    """This layer should not design sections/layouts.

    Layout terms are allowed as anti-pattern examples, but repeated layout language
    in directives often means the diagnoser is acting as architect too early.
    """
    directive_text = _flatten_text(diagnosis.get("design_directive", {}))
    hits = [word for word in LAYOUT_WORDS if word in directive_text]
    if len(hits) >= 3:
        errors.append(
            _err(
                "design_directive",
                f"diagnosis appears to design layout too early; layout terms found: {hits}",
                "warning",
            )
        )


def _first_viewport_hard_floor_check(diagnosis: Dict[str, Any], errors: List[Dict[str, str]]) -> None:
    hard_floor_text = _flatten_text(diagnosis.get("hard_floors", []))
    if "first viewport" not in hard_floor_text and "above the fold" not in hard_floor_text:
        errors.append(_err("hard_floors", "missing first viewport / above-the-fold hard floor"))

    caps = [float(hf.get("score_cap_if_violated", 10)) for hf in diagnosis.get("hard_floors", [])]
    if caps and not any(cap <= 6 for cap in caps):
        errors.append(_err("hard_floors", "no strict hard-floor cap found; at least one cap should be <= 6"))


def _decision_sequence_order_check(diagnosis: Dict[str, Any], errors: List[Dict[str, str]]) -> None:
    sequence = diagnosis.get("decision_context", {}).get("primary_user_decision_sequence", [])
    steps = [item.get("step") for item in sequence]
    if steps != sorted(steps):
        errors.append(_err("decision_context.primary_user_decision_sequence", "decision steps are not ordered"))
    if steps and steps[0] != 1:
        errors.append(_err("decision_context.primary_user_decision_sequence", "decision sequence should start at step 1"))
    if len(set(steps)) != len(steps):
        errors.append(_err("decision_context.primary_user_decision_sequence", "duplicate decision sequence steps"))


def _candidate_strategy_diversity_check(diagnosis: Dict[str, Any], errors: List[Dict[str, str]]) -> None:
    strategies = diagnosis.get("candidate_strategy_seeds", [])
    names = [str(item.get("strategy_name", "")).strip().lower() for item in strategies]
    counts = Counter(names)
    duplicates = [name for name, count in counts.items() if count > 1]
    if duplicates:
        errors.append(_err("candidate_strategy_seeds", f"duplicate strategy names: {duplicates}"))

    # Require at least 4 meaningfully different prefixes/frames.
    stems = set(re.split(r"[-_\s]", name)[0] for name in names if name)
    if len(stems) < 4 and len(names) >= 5:
        errors.append(_err("candidate_strategy_seeds", "candidate strategies appear insufficiently diverse", "warning"))


def _archetype_policy_consistency_check(diagnosis: Dict[str, Any], errors: List[Dict[str, str]]) -> None:
    axes = diagnosis.get("strategic_axes", {})
    weights = diagnosis.get("dynamic_evaluator_policy", {}).get("weights", {})
    archetype = axes.get("primary_archetype")
    functional_immediacy = axes.get("functional_immediacy")
    trust_burden = axes.get("trust_burden")
    aesthetic_stakes = axes.get("aesthetic_stakes")

    if functional_immediacy in {"high", "extreme"}:
        if weights.get("functional_clarity", 0) < 0.15:
            errors.append(_err("dynamic_evaluator_policy.weights.functional_clarity", "functional immediacy is high but functional_clarity weight is low"))
        if weights.get("first_viewport_fit", 0) < 0.15:
            errors.append(_err("dynamic_evaluator_policy.weights.first_viewport_fit", "functional immediacy is high but first_viewport_fit weight is low"))

    if trust_burden in {"high", "extreme"} and weights.get("trust_and_proof", 0) < 0.18:
        errors.append(_err("dynamic_evaluator_policy.weights.trust_and_proof", "trust burden is high but trust_and_proof weight is low"))

    if aesthetic_stakes in {"high", "taste_critical", "luxury_or_brand_critical"} and weights.get("visual_appropriateness", 0) < 0.12:
        errors.append(_err("dynamic_evaluator_policy.weights.visual_appropriateness", "aesthetic stakes are high but visual_appropriateness weight is low"))

    if archetype in {"enterprise_consultative", "enterprise_platform", "sales_led_b2b_saas"}:
        if diagnosis.get("audience_model", {}).get("stakeholder_complexity") == "low":
            errors.append(_err("audience_model.stakeholder_complexity", "enterprise/sales-led diagnosis usually requires medium/high stakeholder complexity unless justified", "warning"))


def run_extra_deterministic_checks(diagnosis: Dict[str, Any]) -> Dict[str, Any]:
    """Run deterministic checks and return a structured validation result."""
    errors: List[Dict[str, str]] = []

    _weights_sum_check(diagnosis, errors)
    _unknown_confidence_check(diagnosis, errors)
    _generic_phrase_check(diagnosis, errors)
    _layout_leak_check(diagnosis, errors)
    _first_viewport_hard_floor_check(diagnosis, errors)
    _decision_sequence_order_check(diagnosis, errors)
    _candidate_strategy_diversity_check(diagnosis, errors)
    _archetype_policy_consistency_check(diagnosis, errors)

    hard_errors = [e for e in errors if e.get("severity") != "warning"]
    warnings = [e for e in errors if e.get("severity") == "warning"]

    return {
        "passed": len(hard_errors) == 0,
        "errors": hard_errors,
        "warnings": warnings,
        "summary": {
            "hard_error_count": len(hard_errors),
            "warning_count": len(warnings),
        },
    }
