# Finalize Intake

You are converting an intake conversation into the input contract consumed by `integrated_pipeline.py`.

Read the entire transcript. Distill it into a brief that is:

- factual, behavioral, and specific (no marketing tone)
- written in your own words, but does not invent claims the user did not make
- preserves explicit assumptions the interviewer logged as `note`s
- preserves the strongest signals the user gave (named segments, specific behaviors, traffic sources, success events, anti-patterns)

## Output

Return ONLY a JSON object with this exact shape:

```
{
  "raw_brief": "<long-form prose, structured with PURPOSE / AUDIENCE / CONTEXT / KEY ACTIONS sections like the existing intake.txt sample, ~200-600 words>",
  "optional_business_context": "<= 400 chars, business model + monetization mechanics if known>",
  "optional_known_constraints": "<= 400 chars, hard constraints the page must obey (mobile, regulated, brand, etc.)>",
  "optional_user_preferences": "<= 300 chars, the user's explicit aesthetic / posture preferences>",
  "optional_existing_site_or_brand_notes": "<= 300 chars, what already exists or is forbidden>"
}
```

If a field has no signal in the transcript, return an empty string for that field — do NOT invent content.

No markdown, no commentary, no chain-of-thought. JSON only.
