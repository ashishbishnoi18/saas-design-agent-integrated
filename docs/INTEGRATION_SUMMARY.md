# Integration Summary

## Completed in this package

1. **Strategic diagnosis wired into architect/evaluator**
   - `integrated_pipeline.py` runs diagnosis → validation → repair → architecture search.
   - `architect-evaluator/harness.py` accepts `--strategic-diagnosis` and `--validator-result`.
   - Strategy seeds, evaluator weights, first-viewport obligations, hard floors, and anti-patterns are passed downstream.

2. **Provider adapters for evaluator/judge bench**
   - Gemini via `google-genai`.
   - OpenAI via the Responses API path where available.
   - Anthropic via the Messages API.
   - Model defaults are centralized and overrideable by CLI/env vars.

3. **Deterministic strategic-alignment gate**
   - Candidates are checked for diagnosis mapping, first-viewport obligation coverage, hard-floor coverage, anti-pattern avoidance, and strategy-seed alignment.
   - A failed programmatic gate blocks final ranking eligibility.

4. **Blind screenshot pairwise judging**
   - `--blind-pairwise` runs screenshot-only judging with no spec/verdict anchoring.
   - Output: `TOURNAMENT.blind.json`.

5. **Diagnosis-aware judge panel**
   - `--judge-panel` runs separate judges for strategy fit, first viewport, conversion/task path, mobile path, and anti-pattern/taste.
   - Output: `PANEL.json`.

6. **Benchmark suite scaffold**
   - `benchmarks/task.schema.json`.
   - Starter public SaaS and internal SaaS benchmark tasks.
   - `benchmarks/benchmark_runner.py`.

7. **Reference move library scaffold**
   - `references/REFERENCE_SCHEMA.md`.
   - Upgraded `architect-evaluator/reference_ingest.py` for page type, archetype, visual posture, structural moves, what works, and what to avoid.

8. **Human calibration and future fine-tuning prep**
   - Existing human ranking recorder retained.
   - Added `calibration/export_preference_data.py` to produce pairwise preference JSONL.

9. **Visual/frontend/internal SaaS scaffolds**
   - `visual-design-agent/` for design-system plan generation.
   - `frontend-implementer/` for production implementation prompts and Playwright checks.
   - `internal-saas/` for task-modeling internal product pages.

10. **Validation artifacts**
    - Added `strategic-diagnosis-validator.v1.schema.json`.
    - Added a sample semantic validator pass file.
    - Local tests pass: `8 passed, 1 skipped`.

## Still intentionally not completed

The repo cannot include real expert labels, real customer-specific benchmark judgments, production reference screenshots, production frontend code, or actual fine-tuned models. Those require your API keys, data curation, expert review, and project-specific stack decisions. See `docs/USER_TODO_NEXT_STEPS.md`.
