# Strategist Intake UI

Conversational front-end that drives `integrated_pipeline.py` with a high-fidelity brief instead of a one-liner.

## What it does

1. Opens a chat with an **interviewer agent** that picks the next critical question from the *live* diagnosis preview — no hardcoded checklist.
2. Pushes back on vague answers, forces trade-offs, demands behaviors over opinions.
3. Re-runs a lightweight **diagnosis preview** every two user messages (or on demand). The right-hand panel shows per-axis confidence and missing critical info.
4. Stops when the preview reports `ready_for_full_diagnosis: true`. Click **Finalize** to write `runs/intake-<id>/input.json` ready for `python3 integrated_pipeline.py --input ...`.

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
