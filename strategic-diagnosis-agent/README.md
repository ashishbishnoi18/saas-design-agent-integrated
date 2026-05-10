# Strategic Diagnosis Agent v1

This package contains the **first and most important layer** of the website-building harness:

```text
raw brief
→ Agent 01: Strategic Website Diagnoser
→ deterministic schema + semantic validation
→ repair loop if needed
→ strategic_diagnosis.json for downstream agents
```

This layer does **not** design the website. It diagnoses what kind of website should be built, who it is for, what the user/buyer needs, what the first viewport must accomplish, what beauty/functionality means for this context, and what downstream agents must optimize for.

## Files

```text
agents/
  01-strategic-website-diagnoser.md       # Main LLM agent prompt
  01-strategic-diagnosis-validator.md     # Semantic LLM validator prompt
  01-strategic-diagnosis-repair.md        # Repair prompt for failed diagnosis

schemas/
  strategic-diagnosis.v1.schema.json              # Strict diagnosis JSON schema
  strategic-diagnosis-validator.v1.schema.json    # Strict semantic-validator output schema

src/
  extra_checks.py                         # Deterministic checks not captured by JSON schema
  validate_diagnosis.py                   # CLI validator for generated diagnosis JSON

examples/
  input.utility-saas.json                 # Example raw input
  input.enterprise-consulting.json        # Example raw input
  strategic_diagnosis.utility-saas.sample.json # Valid deterministic-validation sample

docs/
  pipeline-contract.md                    # How downstream agents should consume this layer
```

## Recommended runtime loop

1. Send the raw brief to `agents/01-strategic-website-diagnoser.md`.
2. Parse model output as strict JSON.
3. Validate with `schemas/strategic-diagnosis.v1.schema.json`.
4. Run `src/extra_checks.py` or `src/validate_diagnosis.py`.
5. Send the diagnosis to `agents/01-strategic-diagnosis-validator.md` for semantic validation.
6. If validation fails, send the raw brief, previous diagnosis, and validator result to `agents/01-strategic-diagnosis-repair.md`.
7. Repeat repair at most 2 times.
8. Only pass to the Website Architect if both deterministic and semantic validation pass.

## Local deterministic validation

Install requirements:

```bash
pip install -r requirements.txt
```

Validate a diagnosis file:

```bash
python3 src/validate_diagnosis.py \
  --schema schemas/strategic-diagnosis.v1.schema.json \
  --diagnosis examples/strategic_diagnosis.utility-saas.sample.json
```

The included utility SaaS sample passes deterministic schema and extra checks. Real outputs should still come from the diagnoser agent for each new brief.

## Integrated pipeline command

From the repository root, the diagnosis agent is now wired into the architect/evaluator harness:

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
  --pairwise
```

For a local no-API smoke test, pass the included sample diagnosis and validator result with `--skip-architect`.

## Downstream principle

The Website Architect should not receive only the raw brief. It should receive:

```json
{
  "raw_brief": "...",
  "strategic_diagnosis": {},
  "validator_result": {},
  "reference_pack": {},
  "architect_task": "Generate multiple website architecture candidates that obey the strategic diagnosis."
}
```

Downstream agents may challenge the diagnosis only explicitly. They must not silently ignore it.
