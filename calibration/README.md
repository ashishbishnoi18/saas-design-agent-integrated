# Calibration and Preference Data

The evaluator will not become elite without human/expert feedback. Use this folder to store rankings and exported preference data.

1. Run the integrated pipeline.
2. Review screenshots and specs.
3. Record a human ranking with `architect-evaluator/record_human_ranking.py`.
4. Export pairwise preferences with `export_preference_data.py`.
5. Use the exported data for evaluator calibration, internal evals, or future fine-tuning.

Human ranking input:

```bash
python3 architect-evaluator/record_human_ranking.py \
  --run runs/utility-saas-integrated \
  --human-ranking candidate-a,candidate-b,candidate-c \
  --reason "candidate-a resolved the risk and action path earlier" \
  --failure-tags evaluator_score_inflation,missed_first_viewport
```

Preference export:

```bash
python3 calibration/export_preference_data.py \
  --input calibration/human_rankings.jsonl \
  --out calibration/pairwise_preferences.jsonl
```
