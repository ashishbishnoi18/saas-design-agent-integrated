#!/usr/bin/env python3
"""Eval-only re-run: skip architect/screenshot, reuse existing artifacts in --run dir."""
from __future__ import annotations

import argparse
import asyncio
import json
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from harness import (  # type: ignore
    Candidate,
    RunConfig,
    ScreenshotBundle,
    _apply_evaluator_scores,
    _make_evaluator,
    _call_evaluator,
    _parse_verdict,
    _default_evaluator_model,
    _screenshot_wireframe,
    _sort_candidates,
    run_programmatic_checks,
    _format_final_report,
    load_reference_library,
    run_pairwise_tournament,
    run_blind_pairwise_tournament,
    run_judge_panel,
    _load_json_file,
    _build_strategy_seed_map,
    _adapt_dimension_weights_from_diagnosis,
)


def discover_candidates(run_dir: pathlib.Path, rescreenshot: bool = False) -> list[Candidate]:
    candidates: list[Candidate] = []
    for spec in sorted(run_dir.glob("UI_SPEC.*.md")):
        strategy = spec.stem.removeprefix("UI_SPEC.")
        wf = run_dir / f"wireframe.{strategy}.html"
        if not wf.exists():
            print(f"[{strategy}] missing wireframe, skipping")
            continue
        c = Candidate(strategy=strategy, spec_path=spec, wireframe_path=wf)
        for vp in ("desktop", "tablet", "mobile"):
            viewport = run_dir / f"shot.{strategy}.{vp}.viewport.png"
            full = run_dir / f"shot.{strategy}.{vp}.full.png"
            legacy = run_dir / f"shot.{strategy}.{vp}.png"
            if viewport.exists() and full.exists():
                c.screenshots[vp] = ScreenshotBundle(viewport=viewport, full=full)
            elif legacy.exists() and not rescreenshot:
                print(
                    f"[{strategy}] WARNING: using legacy full-page {vp} screenshot; "
                    "first-viewport scoring is degraded. Use --rescreenshot to upgrade."
                )
                c.screenshots[vp] = ScreenshotBundle(
                    viewport=None,
                    full=None,
                    legacy=legacy,
                )
            elif not rescreenshot:
                print(f"[{strategy}] missing {vp} screenshot, skipping")
                c = None
                break
        if c:
            candidates.append(c)
    return candidates


async def main_async(args) -> int:
    run_dir = pathlib.Path(args.run).resolve()
    intake_path = pathlib.Path(args.intake) if args.intake else (run_dir / "intake.txt")
    references_dir = pathlib.Path(args.references) if args.references else None
    reference_items = load_reference_library(references_dir) if references_dir else []
    diagnosis_path = pathlib.Path(args.strategic_diagnosis) if args.strategic_diagnosis else None
    validator_path = pathlib.Path(args.validator_result) if args.validator_result else None
    strategic_diagnosis = _load_json_file(diagnosis_path)
    validator_result = _load_json_file(validator_path)
    cfg = RunConfig(
        intake_summary=intake_path.read_text(encoding="utf-8") if intake_path.exists() else "",
        out_dir=run_dir,
        strategies=[],
        references_dir=references_dir,
        architect_prompt_path=pathlib.Path(args.architect_prompt),
        evaluator_prompt_path=pathlib.Path(args.evaluator_prompt),
        knowledge_dir=pathlib.Path(args.knowledge_dir),
        evaluator_provider=args.evaluator_provider,
        evaluator_model=args.evaluator_model,
        pairwise=args.pairwise,
        pairwise_top_k=args.pairwise_top_k,
        blind_pairwise=args.blind_pairwise,
        judge_panel=args.judge_panel,
        panel_weight=args.panel_weight,
        synthesize_top_k=0,
        strategic_diagnosis_path=diagnosis_path,
        validator_result_path=validator_path,
        strategic_diagnosis=strategic_diagnosis,
        validator_result=validator_result,
        strategy_seed_map=_build_strategy_seed_map(strategic_diagnosis),
        dimension_weights=_adapt_dimension_weights_from_diagnosis(strategic_diagnosis),
        reference_items=reference_items,
    )
    candidates = discover_candidates(run_dir, rescreenshot=args.rescreenshot)
    if not candidates:
        print(f"No candidates discovered in {run_dir}")
        return 1
    print(f"Discovered {len(candidates)} candidates: {[c.strategy for c in candidates]}")

    if args.rescreenshot:
        print("\n=== Rescreenshot ===")
        await asyncio.gather(*[_screenshot_wireframe(c, run_dir) for c in candidates])

    print("\n=== Programmatic checks ===")
    for c in candidates:
        await run_programmatic_checks(c, references_dir, reference_items, cfg.strategic_diagnosis)
        s = c.programmatic_results["score_derivation"]
        print(f"  [{c.strategy}] programmatic={s['score']} ({s['reasoning'][:80]})")

    evaluator = _make_evaluator(cfg.evaluator_provider, cfg.evaluator_model)
    print(f"\n=== Evaluator ({cfg.evaluator_provider} / {cfg.evaluator_model}) ===")
    eval_tasks = [_call_evaluator(evaluator, cfg, c) for c in candidates]
    verdicts = await asyncio.gather(*eval_tasks, return_exceptions=True)
    for c, v in zip(candidates, verdicts):
        if isinstance(v, Exception):
            print(f"  [{c.strategy}] EVALUATOR FAILED: {v}")
            continue
        c.evaluator_verdict = v
        (run_dir / f"verdict.{c.strategy}.txt").write_text(v, encoding="utf-8")
        c.parsed_scores = _parse_verdict(v)
        _apply_evaluator_scores(c, cfg.dimension_weights, cfg.panel_weight if cfg.judge_panel else 0.0)
        print(
            f"  [{c.strategy}] weighted_total={c.weighted_total:.2f} "
            f"programmatic={c.programmatic_score:.1f} eligible={c.eligible_for_final_ranking}"
        )

    candidates = _sort_candidates(candidates)
    if args.judge_panel:
        await run_judge_panel(evaluator, cfg, candidates)
        candidates = _sort_candidates(candidates)
    if args.blind_pairwise:
        await run_blind_pairwise_tournament(evaluator, cfg, candidates)
        candidates = _sort_candidates(candidates)
    if args.pairwise:
        await run_pairwise_tournament(evaluator, cfg, candidates)
        candidates = _sort_candidates(candidates)
    report = _format_final_report(candidates)
    print(report)
    (run_dir / "RANKING.txt").write_text(report, encoding="utf-8")
    return 0


def main() -> int:
    p = argparse.ArgumentParser(description="Re-run evaluator only against existing artifacts")
    p.add_argument("--run", required=True, help="Run directory with existing UI_SPEC/wireframe/shot files")
    p.add_argument("--intake", default=None)
    p.add_argument("--architect-prompt", default="ui-architect.md")
    p.add_argument("--evaluator-prompt", default="architect-evaluator.md")
    p.add_argument("--knowledge-dir", default="ui-architect/knowledge")
    p.add_argument("--evaluator-provider", default="gemini",
                   choices=["gemini", "openai", "anthropic", "claude-cli", "codex-cli"])
    p.add_argument("--evaluator-model", default=None)
    p.add_argument("--references", default=None)
    p.add_argument("--strategic-diagnosis", default=None)
    p.add_argument("--validator-result", default=None)
    p.add_argument("--rescreenshot", action="store_true")
    p.add_argument("--pairwise", action="store_true")
    p.add_argument("--blind-pairwise", action="store_true")
    p.add_argument("--judge-panel", action="store_true")
    p.add_argument("--panel-weight", type=float, default=0.20)
    p.add_argument("--pairwise-top-k", type=int, default=10)
    args = p.parse_args()
    args.evaluator_model = args.evaluator_model or _default_evaluator_model(
        args.evaluator_provider
    )
    return asyncio.run(main_async(args))


if __name__ == "__main__":
    sys.exit(main())
