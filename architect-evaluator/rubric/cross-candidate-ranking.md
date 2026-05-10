# Cross-Candidate Ranking Rubric

Pairwise judging compares two candidates for the same brief after individual evaluation. It exists because absolute 0-10 scores drift and a single-candidate evaluator cannot honestly judge whether candidates collapsed into the same structure.

Compare candidates on:

1. Business outcome fit
2. User decision sequence
3. Objection resolution
4. First viewport effectiveness, using viewport screenshots
5. Mobile path
6. Strategy commitment
7. Avoidance of generic/trope layout without rewarding novelty by itself

Return JSON only:

```json
{
  "candidate_a": "workflow-walkthrough-first",
  "candidate_b": "unconventional",
  "winner": "A",
  "confidence": 0.82,
  "scores": {
    "business_outcome_fit": "A",
    "objection_resolution": "A",
    "first_viewport": "B",
    "mobile_path": "A",
    "strategy_commitment": "tie",
    "trope_risk": "B"
  },
  "reasoning": "...",
  "best_reusable_move_a": "...",
  "best_reusable_move_b": "...",
  "synthesis_recommended": true
}
```

Only eligible candidates participate in the final tournament by default. Pairwise points are a ranking signal, not a license to ignore the programmatic gate.
