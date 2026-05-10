# Pipeline Contract for Agent 01

## Purpose

Agent 01 converts a raw website brief into a validated strategic diagnosis. It is the decision foundation for every later agent.

This layer should be treated as a hard gate:

```text
No valid strategic diagnosis → no architecture generation.
```

## Inputs

```json
{
  "raw_brief": "string",
  "optional_business_context": "string",
  "optional_known_constraints": "string",
  "optional_user_preferences": "string",
  "optional_existing_site_or_brand_notes": "string"
}
```

## Outputs

```json
{
  "strategic_diagnosis": {},
  "schema_validation": {},
  "extra_deterministic_checks": {},
  "semantic_validator_result": {}
}
```

Only pass downstream if:

```text
schema_validation.passed == true
extra_deterministic_checks.passed == true
semantic_validator_result.passed == true
semantic_validator_result.safe_to_pass_downstream == true
```

## Downstream handoff to Website Architect

The architect receives:

```json
{
  "raw_brief": "...",
  "strategic_diagnosis": {},
  "validator_result": {},
  "reference_pack": {},
  "architect_task": "Generate multiple website architecture candidates that obey the strategic diagnosis."
}
```

The architect must map each primary component to:

```text
- strategic axis
- design priority
- decision-sequence step
- first-viewport obligation or hard floor
- user/buyer need
- anti-pattern avoided
```

The architect may challenge the diagnosis only explicitly. It must not silently ignore it.

## Downstream handoff to Visual Designer

The visual designer receives:

```json
{
  "selected_architecture": {},
  "strategic_diagnosis": {},
  "visual_posture": "...",
  "beauty_function_balance": {},
  "anti_patterns": [],
  "hard_floors": []
}
```

The visual designer must interpret beauty contextually. For example:

```text
utility beauty = speed, clarity, low friction
enterprise beauty = restraint, credibility, precision
lifestyle beauty = desirability, richness, emotional fit
```

## Downstream handoff to Evaluator

The evaluator receives:

```json
{
  "candidate": {},
  "strategic_diagnosis": {},
  "dynamic_evaluator_policy": {},
  "viewport_screenshots": {},
  "full_page_screenshots": {},
  "programmatic_checks": {}
}
```

The evaluator must apply:

```text
- dynamic weights
- hard floors
- absolute score caps
- first viewport obligation
- anti-pattern penalties
- pairwise judging priorities
```

## Non-negotiable rule

Do not let later agents optimize for generic beauty. The diagnosis defines the right kind of beauty and functionality for the specific website.
