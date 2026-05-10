# Integrated SaaS Design Agent

This repository wires the original **UI Architect v2 + Architect Evaluator** project together with the **Strategic Diagnosis Agent v1** package.

The integrated flow is:

```text
raw brief JSON
→ strategic diagnosis
→ deterministic schema + extra checks
→ semantic diagnosis validator / repair loop
→ diagnosis-driven architecture search
→ screenshots + deterministic gates
→ spec-aware evaluator
→ optional judge panel
→ optional blind screenshot pairwise tournament
→ optional pairwise tournament
→ optional top-K synthesis
→ final ranking
```

The system still produces architecture-grade specs and gray-box HTML wireframes. It does not claim to produce production frontend code by itself. The new scaffolds included here show how to extend it into visual design, frontend implementation, benchmarking, reference curation, and future fine-tuning.

## What was wired together

- `strategic-diagnosis-agent/` is now a first-class upstream stage.
- `integrated_pipeline.py` runs diagnosis generation/validation/repair and then launches the architect/evaluator harness.
- `architect-evaluator/harness.py` now accepts `--strategic-diagnosis` and `--validator-result`.
- Diagnosis fields are injected into the architect prompt and evaluator prompt.
- Candidate strategies can come from `candidate_strategy_seeds` instead of the static strategy list.
- Evaluator weights are adapted from `dynamic_evaluator_policy.weights`.
- Programmatic checks include a strategic-alignment gate when a diagnosis is present.
- The previous programmatic-gate inconsistency was fixed: a failed deterministic gate now blocks ranking eligibility.
- Evaluator provider adapters now include Gemini, OpenAI, and Anthropic.
- Optional blind screenshot pairwise judging was added to reduce spec/verdict anchoring.
- Optional diagnosis-aware multi-judge panel was added.

## Provider setup

Install local dependencies:

```bash
pip install -r requirements.txt
playwright install chromium
```

Install Claude Code for the architect generation step:

```bash
npm install -g @anthropic-ai/claude-code
```

Set whichever provider keys you want to use for diagnosis/evaluation:

```bash
export GOOGLE_API_KEY=...
export OPENAI_API_KEY=...
export ANTHROPIC_API_KEY=...
```

Model defaults live in `architect-evaluator/harness.py`. CLI `--*-model` flags override everything, then provider env vars are used, then fallback defaults:

```text
ARCH_EVAL_GEMINI_MODEL     fallback gemini-3.1-pro-preview
ARCH_EVAL_OPENAI_MODEL     fallback gpt-5.5
ARCH_EVAL_ANTHROPIC_MODEL  fallback claude-opus-4-7
```

Provider model IDs change. Keep these values current against official provider docs before production use.

Optional OpenAI structured-output mode for the diagnosis/validator/repair stages:

```bash
export INTEGRATED_OPENAI_JSON_SCHEMA=1
# Enable strict mode only after confirming the current schema subset is accepted:
# export INTEGRATED_OPENAI_STRICT_SCHEMA=1
```

The pipeline still performs local JSON Schema validation and deterministic extra checks even when provider-side structured output is disabled.

## Run the full integrated pipeline

```bash
python3 integrated_pipeline.py \
  --input strategic-diagnosis-agent/examples/input.utility-saas.json \
  --out runs/utility-saas-integrated \
  --diagnosis-provider openai \
  --validator-provider openai \
  --evaluator-provider anthropic \
  --use-diagnosis-strategies \
  --judge-panel \
  --blind-pairwise \
  --pairwise \
  --synthesize-top-k 3
```

Useful variations:

```bash
# Diagnosis-only local validation with a supplied diagnosis and validator result.
python3 integrated_pipeline.py \
  --input strategic-diagnosis-agent/examples/input.utility-saas.json \
  --diagnosis strategic-diagnosis-agent/examples/strategic_diagnosis.utility-saas.sample.json \
  --validator-result strategic-diagnosis-agent/examples/semantic_validator.utility-saas.pass.json \
  --out runs/local-diagnosis-test \
  --skip-architect

# Architect/evaluator only, using a validated diagnosis produced earlier.
python3 architect-evaluator/harness.py \
  --intake runs/local-diagnosis-test/pipeline_input.json \
  --out runs/architect-only-with-diagnosis \
  --strategic-diagnosis runs/local-diagnosis-test/strategic_diagnosis.json \
  --validator-result runs/local-diagnosis-test/semantic_validator_result.json \
  --use-diagnosis-strategies \
  --evaluator-provider gemini \
  --judge-panel \
  --blind-pairwise \
  --pairwise
```

## Added capabilities mapped to the eight recommendations

### 1. Benchmark/eval suite scaffold

See `benchmarks/`. It includes a task schema, starter SaaS tasks, and `benchmark_runner.py` for running the integrated pipeline across tasks.

### 2. Reference move library scaffold

See `references/REFERENCE_SCHEMA.md` and the upgraded `architect-evaluator/reference_ingest.py`. References are structured as design moves, not raw scraped pages.

### 3. Blind screenshot judging

Use `--blind-pairwise`. The judge sees the brief, strategic diagnosis, and screenshots, but not the spec or previous verdict. Results are written to `TOURNAMENT.blind.json`.

### 4. Multi-judge panel

Use `--judge-panel`. The harness runs separate judges for strategy fit, first viewport, conversion/task path, mobile path, and anti-pattern/taste. Results are written to `PANEL.json` and blended into final absolute score by `--panel-weight`.

### 5. Evolutionary search foundation

The harness already supports Best-of-N candidate search, pairwise ranking, and top-K synthesis. The diagnosis-driven strategy seeds and blind/panel feedback provide the selection pressure needed for future mutation rounds. A separate production-grade mutation loop still requires more human preference data.

### 6. Visual design and frontend implementation scaffolds

See `visual-design-agent/` and `frontend-implementer/`. These prompts define the next stages after architecture: design-token planning, high-fidelity visual direction, React/Tailwind implementation, and screenshot verification.

### 7. Fine-tuning/preference-data preparation

See `calibration/export_preference_data.py`. It converts human ranking records into pairwise preference JSONL. Actual fine-tuning or preference training requires your expert-labeled dataset.

### 8. Prompt caching settings

The OpenAI adapter supports `ARCH_EVAL_PROMPT_CACHE_KEY`. Static prompt/reference material is intentionally placed before variable candidate data in prompts where possible. Gemini/Anthropic prompt-cache-specific wiring should be finalized based on the provider account/features you use.

## Existing architect/evaluator commands

```bash
python3 architect-evaluator/harness.py \
  --intake ./intake.txt \
  --out ./runs/carfaxsavings-integrated \
  --strategies "audience-self-selection,split-action-evidence,evidence-first,problem-risk-first,action-first,workflow-walkthrough-first,unconventional" \
  --evaluator-provider gemini \
  --references ./references \
  --pairwise
```

Re-evaluate an existing run:

```bash
python3 architect-evaluator/eval_only.py \
  --run runs/carfaxsavings-integrated \
  --rescreenshot \
  --strategic-diagnosis runs/local-diagnosis-test/strategic_diagnosis.json \
  --validator-result runs/local-diagnosis-test/semantic_validator_result.json \
  --evaluator-provider openai \
  --judge-panel \
  --blind-pairwise \
  --pairwise
```

## Outputs

Typical run outputs:

- `pipeline_input.json`
- `strategic_diagnosis.json`
- `diagnosis_deterministic_validation.json`
- `semantic_validator_result.json`
- `pipeline_gate.json`
- `UI_SPEC.{strategy}.md`
- `wireframe.{strategy}.html`
- `programmatic.{strategy}.json`
- `shot.{strategy}.{viewport}.viewport.png`
- `shot.{strategy}.{viewport}.full.png`
- `verdict.{strategy}.txt`
- `PANEL.json`
- `TOURNAMENT.blind.json`
- `TOURNAMENT.json`
- `RANKING.txt`

## Human calibration

Record expert rankings after reviewing generated candidates:

```bash
python3 architect-evaluator/record_human_ranking.py \
  --run runs/utility-saas-integrated \
  --human-ranking workflow-walkthrough-first,audience-self-selection,unconventional \
  --reason "Workflow version made the buyer path concrete earlier." \
  --failure-tags over_rewarded_novelty,missed_mobile_friction
```

Export pairwise preference data:

```bash
python3 calibration/export_preference_data.py \
  --input calibration/human_rankings.jsonl \
  --out calibration/pairwise_preferences.jsonl
```

## Tests

```bash
python3 -m pytest -q
python3 -m py_compile integrated_pipeline.py architect-evaluator/harness.py architect-evaluator/eval_only.py
```
