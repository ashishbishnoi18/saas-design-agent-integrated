#!/usr/bin/env python3
"""Integrated SaaS design-agent pipeline.

This wires Agent 01 (strategic diagnosis) into the UI architect/evaluator harness:

raw brief/input JSON
→ strategic diagnosis generation or supplied diagnosis
→ schema + deterministic validation
→ semantic validation / repair loop
→ architecture best-of-N search using diagnosis strategy seeds
→ screenshots, programmatic gates, judge panel, blind pairwise, pairwise tournament

The script uses the provider adapters in architect-evaluator/harness.py. It does
not require API keys when you pass --diagnosis and --skip-architect for local
validation/scaffolding tests; API calls require the provider-specific env vars.
"""
from __future__ import annotations

import argparse
import asyncio
import importlib.util
import json
import os
import pathlib
import sys
from typing import Any

try:
    import jsonschema
except ImportError as exc:  # pragma: no cover
    raise SystemExit("Missing dependency: jsonschema. Run: pip install -r strategic-diagnosis-agent/requirements.txt") from exc

ROOT = pathlib.Path(__file__).resolve().parent
HARNESS_PATH = ROOT / "architect-evaluator" / "harness.py"
SPEC = importlib.util.spec_from_file_location("integrated_harness", HARNESS_PATH)
harness = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
sys.modules["integrated_harness"] = harness
SPEC.loader.exec_module(harness)

DIAG_ROOT = ROOT / "strategic-diagnosis-agent"
DIAG_SCHEMA = DIAG_ROOT / "schemas" / "strategic-diagnosis.v1.schema.json"
VALIDATOR_SCHEMA = DIAG_ROOT / "schemas" / "strategic-diagnosis-validator.v1.schema.json"
DIAG_PROMPT = DIAG_ROOT / "agents" / "01-strategic-website-diagnoser.md"
VALIDATOR_PROMPT = DIAG_ROOT / "agents" / "01-strategic-diagnosis-validator.md"
REPAIR_PROMPT = DIAG_ROOT / "agents" / "01-strategic-diagnosis-repair.md"

# Import extra deterministic checks without making the package installable.
sys.path.insert(0, str(DIAG_ROOT / "src"))
from extra_checks import run_extra_deterministic_checks  # type: ignore  # noqa: E402


def read_json(path: pathlib.Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: pathlib.Path, value: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, indent=2, ensure_ascii=False), encoding="utf-8")


def extract_raw_brief(input_payload: dict[str, Any]) -> str:
    raw = input_payload.get("raw_brief")
    if raw:
        return str(raw)
    # Useful fallback for old intake-only files.
    return json.dumps(input_payload, ensure_ascii=False, indent=2)


def schema_validate(instance: dict[str, Any], schema_path: pathlib.Path) -> dict[str, Any]:
    schema = read_json(schema_path)
    validator = jsonschema.Draft202012Validator(schema)
    errors = [
        {"path": "/" + "/".join(str(p) for p in error.path), "message": error.message}
        for error in sorted(validator.iter_errors(instance), key=lambda e: list(e.path))
    ]
    return {"passed": not errors, "errors": errors}


def deterministic_validate_diagnosis(diagnosis: dict[str, Any]) -> dict[str, Any]:
    schema_result = schema_validate(diagnosis, DIAG_SCHEMA)
    extra_result = (
        run_extra_deterministic_checks(diagnosis)
        if schema_result["passed"]
        else {
            "passed": False,
            "errors": [{"field": "schema", "error": "extra checks skipped because schema failed"}],
            "warnings": [],
            "summary": {"hard_error_count": 1, "warning_count": 0},
        }
    )
    return {
        "passed": bool(schema_result["passed"] and extra_result["passed"]),
        "schema_validation": schema_result,
        "extra_deterministic_checks": extra_result,
    }


async def _call_openai_structured_json(
    model: str,
    system_prompt: str,
    payload: dict[str, Any],
    schema_path: pathlib.Path,
    schema_name: str,
    *,
    out_raw_path: pathlib.Path | None = None,
) -> dict[str, Any]:
    """Optional OpenAI Responses API structured-output path.

    This is opt-in because real-world JSON schemas sometimes use features outside
    a provider's strict subset. Enable with INTEGRATED_OPENAI_JSON_SCHEMA=1.
    Set INTEGRATED_OPENAI_STRICT_SCHEMA=1 after confirming your schema is accepted.
    """
    try:
        from openai import AsyncOpenAI
    except ImportError as exc:  # pragma: no cover
        raise RuntimeError("openai not installed. Run: pip install openai") from exc
    if not os.environ.get("OPENAI_API_KEY"):
        raise RuntimeError("OPENAI_API_KEY not set in environment.")

    schema = read_json(schema_path)
    client = AsyncOpenAI()
    text_config: dict[str, Any] = {
        "format": {
            "type": "json_schema",
            "name": schema_name,
            "schema": schema,
            "strict": os.environ.get("INTEGRATED_OPENAI_STRICT_SCHEMA") == "1",
        }
    }
    if model.startswith("gpt-5"):
        text_config["verbosity"] = os.environ.get("INTEGRATED_OPENAI_VERBOSITY", "low")

    kwargs: dict[str, Any] = {
        "model": model,
        "input": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": json.dumps(payload, indent=2, ensure_ascii=False)},
        ],
        "max_output_tokens": int(os.environ.get("INTEGRATED_OPENAI_MAX_OUTPUT_TOKENS", "20000")),
        "text": text_config,
    }
    if model.startswith("gpt-5"):
        kwargs["reasoning"] = {
            "effort": os.environ.get("INTEGRATED_OPENAI_REASONING_EFFORT", "high")
        }
    if os.environ.get("ARCH_EVAL_PROMPT_CACHE_KEY"):
        kwargs["prompt_cache_key"] = os.environ["ARCH_EVAL_PROMPT_CACHE_KEY"]

    response = await client.responses.create(**kwargs)
    raw = getattr(response, "output_text", None) or str(response)
    if out_raw_path:
        out_raw_path.parent.mkdir(parents=True, exist_ok=True)
        out_raw_path.write_text(raw, encoding="utf-8")
    return harness._extract_json_object(raw)


_PARSE_RETRY_HINT = (
    "\n\nIMPORTANT: A prior attempt produced malformed JSON (truncated or "
    "syntactically invalid). Return ONLY a single complete, valid JSON object "
    "that fully closes every string, array, and object. Do not include "
    "markdown code fences, commentary, or chain-of-thought. If the schema is "
    "long, be terse where possible to ensure the response fits in the output "
    "budget — but every required field must still be present."
)


async def call_json_provider(
    provider: str,
    model: str,
    system_prompt: str,
    payload: dict[str, Any],
    *,
    out_raw_path: pathlib.Path | None = None,
    schema_path: pathlib.Path | None = None,
    schema_name: str = "structured_output",
    max_parse_retries: int = 2,
) -> dict[str, Any]:
    if (
        provider == "openai"
        and schema_path is not None
        and os.environ.get("INTEGRATED_OPENAI_JSON_SCHEMA") == "1"
    ):
        return await _call_openai_structured_json(
            model, system_prompt, payload, schema_path, schema_name, out_raw_path=out_raw_path
        )

    evaluator = harness._make_evaluator(provider, model)
    user_text = json.dumps(payload, indent=2, ensure_ascii=False)
    attempt = 0
    last_err: Exception | None = None
    prompt_suffix = ""
    while True:
        attempt += 1
        try:
            raw = await evaluator.evaluate(system_prompt + prompt_suffix, user_text, [])
        except Exception as exc:
            # Provider-level failure (network, CLI exit nonzero, etc.). Surface
            # immediately rather than silently retrying — these aren't parse
            # issues and the LLM call has its own cost.
            raise

        if out_raw_path:
            suffix_path = (
                out_raw_path
                if attempt == 1
                else out_raw_path.with_suffix(out_raw_path.suffix + f".retry-{attempt - 1}")
            )
            suffix_path.parent.mkdir(parents=True, exist_ok=True)
            suffix_path.write_text(raw, encoding="utf-8")

        try:
            return harness._extract_json_object(raw)
        except (json.JSONDecodeError, ValueError) as exc:
            last_err = exc
            if attempt > max_parse_retries:
                # Persist the failing raw at a clearly named path so the user
                # can see what the model actually produced.
                if out_raw_path:
                    broken = out_raw_path.with_suffix(out_raw_path.suffix + ".broken")
                    broken.write_text(raw, encoding="utf-8")
                raise RuntimeError(
                    f"Failed to parse JSON from {provider}/{model} after {attempt} attempts. "
                    f"Last error: {exc}. Raw saved to {out_raw_path}"
                ) from exc

            print(
                f"  ⚠ JSON parse failed on attempt {attempt} ({exc.__class__.__name__}: "
                f"{str(exc)[:120]}); retrying with truncation hint..."
            )
            prompt_suffix = _PARSE_RETRY_HINT


async def generate_or_load_diagnosis(args, input_payload: dict[str, Any], out_dir: pathlib.Path) -> dict[str, Any]:
    if args.diagnosis:
        diagnosis = read_json(pathlib.Path(args.diagnosis))
        write_json(out_dir / "strategic_diagnosis.json", diagnosis)
        return diagnosis

    provider = args.diagnosis_provider or args.evaluator_provider
    model = args.diagnosis_model or harness._default_evaluator_model(provider)
    print(f"\n=== AGENT 01: Strategic diagnosis ({provider} / {model}) ===")
    diagnosis = await call_json_provider(
        provider,
        model,
        DIAG_PROMPT.read_text(encoding="utf-8"),
        input_payload,
        out_raw_path=out_dir / "raw_diagnosis_response.txt",
        schema_path=DIAG_SCHEMA,
        schema_name="strategic_diagnosis",
    )
    write_json(out_dir / "strategic_diagnosis.json", diagnosis)
    return diagnosis


async def semantic_validate_and_repair(
    args,
    input_payload: dict[str, Any],
    diagnosis: dict[str, Any],
    validation: dict[str, Any],
    out_dir: pathlib.Path,
) -> tuple[dict[str, Any], dict[str, Any], dict[str, Any]]:
    if args.validator_result:
        validator_result = read_json(pathlib.Path(args.validator_result))
        write_json(out_dir / "semantic_validator_result.json", validator_result)
        return diagnosis, validation, validator_result

    provider = args.validator_provider or args.diagnosis_provider or args.evaluator_provider
    model = args.validator_model or args.diagnosis_model or harness._default_evaluator_model(provider)
    raw_brief = extract_raw_brief(input_payload)

    validator_result: dict[str, Any] = {}
    for attempt in range(args.max_repairs + 1):
        print(f"\n=== SEMANTIC DIAGNOSIS VALIDATION attempt {attempt + 1} ({provider} / {model}) ===")
        validator_payload = {
            "raw_brief": raw_brief,
            "strategic_diagnosis": diagnosis,
            "schema_validation": validation["schema_validation"],
            "extra_deterministic_checks": validation["extra_deterministic_checks"],
        }
        validator_result = await call_json_provider(
            provider,
            model,
            VALIDATOR_PROMPT.read_text(encoding="utf-8"),
            validator_payload,
            out_raw_path=out_dir / f"raw_validator_response.attempt-{attempt + 1}.txt",
            schema_path=VALIDATOR_SCHEMA,
            schema_name="strategic_diagnosis_validator",
        )
        # Validator schema is intentionally strict but not allowed to block local use if a provider
        # returns a small extra field. The schema result is recorded for transparency.
        validator_schema = schema_validate(validator_result, VALIDATOR_SCHEMA)
        validator_result["schema_validation"] = validator_schema
        write_json(out_dir / "semantic_validator_result.json", validator_result)

        passed = bool(
            validator_result.get("passed")
            and validator_result.get("safe_to_pass_downstream")
            and validation.get("passed")
        )
        if passed:
            return diagnosis, validation, validator_result

        if attempt >= args.max_repairs:
            return diagnosis, validation, validator_result

        print("  validator failed; running diagnosis repair")
        repair_payload = {
            "raw_brief": raw_brief,
            "previous_strategic_diagnosis": diagnosis,
            "validator_result": validator_result,
            "deterministic_validation": validation,
        }
        diagnosis = await call_json_provider(
            provider,
            model,
            REPAIR_PROMPT.read_text(encoding="utf-8"),
            repair_payload,
            out_raw_path=out_dir / f"raw_repair_response.attempt-{attempt + 1}.txt",
            schema_path=DIAG_SCHEMA,
            schema_name="strategic_diagnosis",
        )
        write_json(out_dir / "strategic_diagnosis.json", diagnosis)
        validation = deterministic_validate_diagnosis(diagnosis)
        write_json(out_dir / "diagnosis_deterministic_validation.json", validation)

    return diagnosis, validation, validator_result


def build_run_config(args, input_payload: dict[str, Any], out_dir: pathlib.Path, diagnosis: dict[str, Any], validator_result: dict[str, Any]) -> Any:
    raw_brief = extract_raw_brief(input_payload)
    references_dir = pathlib.Path(args.references) if args.references else None
    reference_items = harness.load_reference_library(references_dir) if references_dir else []
    cli_strategies = [
        harness._normalize_strategy_name(s)
        for s in args.strategies.split(",")
        if s.strip()
    ]
    strategies = (
        harness._strategies_from_diagnosis(diagnosis, cli_strategies)
        if args.use_diagnosis_strategies
        else harness._dedupe_preserve_order(cli_strategies)
    )
    return harness.RunConfig(
        intake_summary=raw_brief,
        out_dir=out_dir,
        strategies=strategies,
        references_dir=references_dir,
        architect_prompt_path=pathlib.Path(args.architect_prompt),
        evaluator_prompt_path=pathlib.Path(args.evaluator_prompt),
        knowledge_dir=pathlib.Path(args.knowledge_dir),
        evaluator_provider=args.evaluator_provider,
        evaluator_model=args.evaluator_model or harness._default_evaluator_model(args.evaluator_provider),
        max_revisions=args.max_revisions,
        use_installed_agent=args.use_installed_agent,
        pairwise=args.pairwise,
        pairwise_top_k=args.pairwise_top_k,
        blind_pairwise=args.blind_pairwise,
        judge_panel=args.judge_panel,
        panel_weight=args.panel_weight,
        synthesize_top_k=0 if args.no_synthesis else args.synthesize_top_k,
        strategic_diagnosis_path=out_dir / "strategic_diagnosis.json",
        validator_result_path=out_dir / "semantic_validator_result.json",
        strategic_diagnosis=diagnosis,
        validator_result=validator_result,
        strategy_seed_map=harness._build_strategy_seed_map(diagnosis),
        dimension_weights=harness._adapt_dimension_weights_from_diagnosis(diagnosis),
        reference_items=reference_items,
    )


async def main_async(args) -> int:
    out_dir = pathlib.Path(args.out).resolve()
    out_dir.mkdir(parents=True, exist_ok=True)
    input_payload = read_json(pathlib.Path(args.input))
    write_json(out_dir / "pipeline_input.json", input_payload)

    diagnosis = await generate_or_load_diagnosis(args, input_payload, out_dir)
    validation = deterministic_validate_diagnosis(diagnosis)
    write_json(out_dir / "diagnosis_deterministic_validation.json", validation)
    print(f"Deterministic diagnosis validation: passed={validation['passed']}")

    diagnosis, validation, validator_result = await semantic_validate_and_repair(
        args, input_payload, diagnosis, validation, out_dir
    )
    safe = bool(
        validation.get("passed")
        and validator_result.get("passed")
        and validator_result.get("safe_to_pass_downstream")
    )
    write_json(
        out_dir / "pipeline_gate.json",
        {
            "deterministic_passed": validation.get("passed"),
            "semantic_passed": validator_result.get("passed"),
            "safe_to_pass_downstream": validator_result.get("safe_to_pass_downstream"),
            "architect_allowed": safe or args.allow_failed_diagnosis,
        },
    )
    if not safe and not args.allow_failed_diagnosis:
        print("Diagnosis gate failed. Use --allow-failed-diagnosis only for debugging.")
        return 3

    if args.skip_architect:
        print("Skipping architect/evaluator run by request.")
        return 0

    cfg = build_run_config(args, input_payload, out_dir, diagnosis, validator_result)
    print(f"\n=== ARCHITECT/EVALUATOR RUN: {len(cfg.strategies)} strategies ===")
    print("Strategies:", ", ".join(cfg.strategies))
    candidates = await harness.run(cfg)
    report = harness._format_final_report(candidates)
    print(report)
    (cfg.out_dir / "RANKING.txt").write_text(report, encoding="utf-8")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description="Run strategic diagnosis + architect/evaluator as one wired pipeline")
    parser.add_argument("--input", required=True, help="Raw brief input JSON. See strategic-diagnosis-agent/examples/.")
    parser.add_argument("--out", required=True, help="Output run directory")
    parser.add_argument("--diagnosis", default=None, help="Use an existing strategic_diagnosis.v1 JSON instead of generating one")
    parser.add_argument("--validator-result", default=None, help="Use an existing semantic validator result JSON")
    parser.add_argument("--diagnosis-provider", default=None,
                        choices=["gemini", "openai", "anthropic", "claude-cli", "codex-cli"])
    parser.add_argument("--diagnosis-model", default=None)
    parser.add_argument("--validator-provider", default=None,
                        choices=["gemini", "openai", "anthropic", "claude-cli", "codex-cli"])
    parser.add_argument("--validator-model", default=None)
    parser.add_argument("--max-repairs", type=int, default=2)
    parser.add_argument("--allow-failed-diagnosis", action="store_true")
    parser.add_argument("--skip-architect", action="store_true")

    parser.add_argument("--strategies", default=",".join(harness.DEFAULT_STRATEGIES))
    parser.add_argument(
        "--use-diagnosis-strategies",
        action="store_true",
        default=True,
        help="Use candidate_strategy_seeds from the strategic diagnosis (default).",
    )
    parser.add_argument(
        "--no-diagnosis-strategies",
        dest="use_diagnosis_strategies",
        action="store_false",
        help="Use the static --strategies list instead of diagnosis candidate_strategy_seeds.",
    )
    parser.add_argument("--references", default=None)
    parser.add_argument("--architect-prompt", default="ui-architect.md")
    parser.add_argument("--evaluator-prompt", default="architect-evaluator.md")
    parser.add_argument("--knowledge-dir", default="ui-architect/knowledge")
    parser.add_argument("--evaluator-provider", default="gemini",
                        choices=["gemini", "openai", "anthropic", "claude-cli", "codex-cli"])
    parser.add_argument("--evaluator-model", default=None)
    parser.add_argument("--max-revisions", type=int, default=1)
    parser.add_argument("--use-installed-agent", action="store_true")
    parser.add_argument("--pairwise", action="store_true")
    parser.add_argument("--blind-pairwise", action="store_true")
    parser.add_argument("--judge-panel", action="store_true")
    parser.add_argument("--panel-weight", type=float, default=0.20)
    parser.add_argument("--pairwise-top-k", type=int, default=10)
    parser.add_argument("--synthesize-top-k", type=int, default=0)
    parser.add_argument("--no-synthesis", action="store_true")
    args = parser.parse_args()
    return asyncio.run(main_async(args))


if __name__ == "__main__":
    raise SystemExit(main())
