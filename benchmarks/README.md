# Benchmark Suite Scaffold

This directory is the start of the real eval suite needed to move the agent beyond average model output.

A benchmark task should contain:

- a raw brief
- page family / page type
- expected strategic obligations
- first-viewport success criteria
- forbidden anti-patterns
- optional expert notes
- optional accepted/reference screenshots
- optional human ranking data after runs

Use `task.schema.json` to keep tasks consistent. Use `benchmark_runner.py` to run the integrated pipeline across every JSON task in `benchmarks/tasks/`.

Example:

```bash
python3 benchmarks/benchmark_runner.py \
  --tasks-dir benchmarks/tasks \
  --out runs/benchmarks \
  --diagnosis-provider openai \
  --validator-provider openai \
  --evaluator-provider anthropic \
  --judge-panel \
  --blind-pairwise \
  --pairwise
```

For quick local validation without API calls, use `--dry-run`.
