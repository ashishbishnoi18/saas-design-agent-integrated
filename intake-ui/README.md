# Strategist Intake UI

Conversational front-end that drives `integrated_pipeline.py` with a high-fidelity brief instead of a one-liner.

## What it does

End-to-end strategist surface. Three views in one app: **Intake → Pipeline → Results**.

### Intake
1. Chat with an **interviewer agent** that picks the next critical question from the *live* diagnosis preview — no hardcoded checklist.
2. Pushes back on vague answers, forces trade-offs, demands behaviors over opinions, sticks on one axis until it's strong.
3. Re-runs a lightweight **diagnosis preview** every two user messages (or on demand). The right-hand panel shows per-axis confidence and missing critical info.
4. Stops when the preview reports `ready_for_full_diagnosis: true`. Click **Finalize** — the brief is distilled into `runs/intake-<id>/input.json` and the view auto-switches to **Pipeline**.

### Pipeline
- A **Run pipeline** card in the right rail spawns `python3 integrated_pipeline.py` against the finalized brief.
- Configurable per-run: provider per stage (claude-cli / codex-cli / gemini / openai / anthropic), use-diagnosis-strategies, judge panel, blind pairwise, spec-aware pairwise, top-K synthesis.
- Live log streams from `runs/intake-<id>-pipeline-<runId>/run.log` (1.5s polling, last 64KB shown).
- Status badges, elapsed time, kill button. Survives browser refreshes — the run record lives on disk and rejoins on reload.

### Results
- Top-line winner with rationale, runner-up note.
- Candidate gallery with desktop hero thumbnail per strategy + total / panel / pairwise / blind / programmatic-gate badges.
- Click a candidate to open a detail view: all 6 screenshots (desktop/tablet/mobile × viewport/full), the gray-box wireframe HTML in an iframe, the evaluator verdict, the UI spec, and a panel-judge score footer.
- Aggregate tournament-points table (spec-aware vs blind vs panel avg) so you can see *why* the ranking landed where it did.

Switch between **Claude CLI** (`claude-opus-4-7`) and **Codex CLI** (`gpt-5.5`) per session in the header.

## Run

```bash
cd intake-ui
npm install
npm run dev
# open http://localhost:3000
```

Requires the `claude` and/or `codex` CLI on PATH. Sessions are persisted as JSON in `intake-ui/sessions/`.

## How it composes with the rest of the repo

- The interviewer and preview agents are configured in `prompts/interviewer.md` and `prompts/preview-diagnosis.md`. Both are policy prompts, not question lists.
- On finalize, the brief is distilled by `prompts/finalize.md` into the same shape as `strategic-diagnosis-agent/examples/input.utility-saas.json`.
- The output file lands at `../runs/intake-<session-id>/input.json` so the existing pipeline picks it up unmodified:

  ```bash
  python3 integrated_pipeline.py \
    --input runs/intake-<id>/input.json \
    --out runs/intake-<id>-pipeline \
    --diagnosis-provider openai \
    --evaluator-provider anthropic \
    --use-diagnosis-strategies
  ```

## Env knobs

| Var | Default | Notes |
| --- | --- | --- |
| `INTAKE_CLAUDE_MODEL` | `claude-opus-4-7` | Passed to `claude --model`. Use `sonnet`/`opus` aliases or any full model ID. |
| `INTAKE_CODEX_MODEL` | `gpt-5.5` | Passed to `codex exec -m`. |
| `INTAKE_CODEX_EFFORT` | `medium` | `model_reasoning_effort` config for codex. |
| `INTAKE_CLI_TIMEOUT_MS` | `180000` | Per-call timeout. |

`ANTHROPIC_API_KEY` is stripped before invoking `claude` so it uses the Pro/Max subscription auth, matching the Python harness behaviour. Same for `OPENAI_API_KEY` and `codex`.
