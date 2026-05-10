# Steps That Still Require You

These items cannot be completed inside this offline repository-editing session because they require external accounts, production data, expert judgment, or actual design/engineering decisions.

## 1. Add provider API keys and verify model IDs

Set keys for the providers you want to use:

```bash
export GOOGLE_API_KEY=...
export OPENAI_API_KEY=...
export ANTHROPIC_API_KEY=...
```

Then run a small diagnosis-only and one full architect/evaluator test. Model names change over time, so verify the fallback IDs in `architect-evaluator/harness.py` against official docs before production use.

## 2. Build the real benchmark set

The repo now includes `benchmarks/`, but the benchmark set needs your business judgment.

Recommended initial target:

- 50 public SaaS pages
- 30 pricing/comparison/security/docs pages
- 50 internal SaaS product pages
- 20 onboarding/setup flows
- 20 intentionally weak/trope examples

Each task should include first-viewport obligations, success criteria, and forbidden patterns.

## 3. Curate a reference move library

Do not scrape random SaaS pages into RAG. Create structured reference records using `references/REFERENCE_SCHEMA.md` and `architect-evaluator/reference_ingest.py`.

Recommended process:

1. Pick a high-quality SaaS page.
2. Screenshot desktop and mobile first viewports.
3. Translate it into a gray-box wireframe.
4. Write 3–8 reusable structural moves.
5. Add what to copy and what to avoid.
6. Assign quality tier: `exceptional`, `strong`, `competent`, `weak-trope`, or `broken`.

## 4. Add expert/human rankings

Run the pipeline, review candidates, and record rankings:

```bash
python3 architect-evaluator/record_human_ranking.py \
  --run runs/your-run \
  --human-ranking best,second,third \
  --reason "why the winner is better" \
  --failure-tags missed_mobile_path,score_inflation
```

Then export pairwise data:

```bash
python3 calibration/export_preference_data.py \
  --input calibration/human_rankings.jsonl \
  --out calibration/pairwise_preferences.jsonl
```

## 5. Calibrate evaluator score anchors

Create a small set of accepted/rejected examples and teach the evaluator:

- 10 exceptional references
- 10 strong references
- 10 competent-but-not-great references
- 10 weak trope examples
- 10 broken examples

Use these to prevent 9+ score inflation.

## 6. Decide frontend implementation stack

The repo includes scaffolds for visual design and frontend implementation, but production code generation needs your stack decisions:

- Next.js or another framework
- Tailwind/shadcn or another component system
- design-token format
- routing/data conventions
- testing and deployment environment

## 7. Run real fine-tuning only after labels exist

Fine-tuning is premature until you have stable labels. Once you have expert rankings and failure tags, use them first for evaluator calibration and then consider fine-tuning smaller classifier/evaluator models.
