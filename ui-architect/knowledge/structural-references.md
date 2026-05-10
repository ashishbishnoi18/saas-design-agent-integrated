# Structural References Library

This file is the index for the curated reference wireframes used to calibrate architect output. References are NOT for copying — they are taste calibration. The architect uses them to detect when its own output has drifted toward generic AI-trained patterns, and the evaluator uses them to score "structural family resemblance."

---

## How References Are Used

### By the architect
When the architect runs with `--references=<path>`, the harness loads curated `meta.json`, `notes.md`, and short wireframe excerpts into a compact reference pack and injects that text into the prompt. A local path string is not enough because API evaluators cannot read the filesystem. The architect uses the injected pack to perform the Reference Calibration step in Section 4C: confirming that its design either belongs to the same structural family as strong references OR has deliberately diverged with a stated reason.

The architect does NOT copy reference layouts. Copying produces homogenized output, which is the opposite of the goal. References answer the question: *am I in the right family of solutions?* — not *what's the right solution?*

### By the evaluator
The evaluator receives the same loaded reference pack in its prompt. It compares the candidate wireframe to the matched reference set on two dimensions:

- **Family resemblance** — does the candidate share structural moves with strong references for this domain/strategy? A landing page for technical APIs that has zero family resemblance to other strong technical-API landing pages is suspicious.
- **Trope avoidance** — does the candidate avoid the generic patterns that show up in weak references (the "AI SaaS landing page" trope, the "dashboard with sidebar + KPI cards + chart grid" trope, etc.)?

The scorer uses this as calibration. It does not reward novelty by itself and does not blindly reward resemblance. Strong references provide structural moves; weak-trope references provide anti-patterns to avoid.

---

## Reference Schema

Each reference is stored as a directory under `references/`:

```
references/
  marketing-landing/
    action-first/
      ref-001-stripe-payments-2024/
        wireframe.html         # Gray-box version of the original page
        screenshot-desktop.png # Original page at 1440x900
        screenshot-mobile.png  # Original page at 390x844
        meta.json              # See schema below
        notes.md               # Free-form notes on what makes this a strong example
      ref-002-linear-product-2024/
        ...
    evidence-first/
      ...
    problem-risk-first/
      ...
  marketing-pricing/
    ...
  internal-dashboard/
    sidebar-led/
      ...
    full-bleed/
      ...
  ...
```

### meta.json schema

```json
{
  "id": "ref-001-stripe-payments-2024",
  "domain": "marketing-landing",
  "strategy": "action-first",
  "audience": "technical-decision-maker",
  "industry": "fintech-developer-tool",
  "quality_tier": "exceptional",
  "captured_date": "2024-11-12",
  "source_url": "...",
  "what_works": [
    "Hero headline names a specific outcome, not a category",
    "Primary CTA paired with code-snippet preview, not isolated",
    "Logo strip placed below first scroll, not in hero",
    "Density steps up subtly toward feature grid"
  ],
  "structural_moves": [
    "split-hero-with-product-preview",
    "deferred-social-proof",
    "tiered-density-progression"
  ],
  "trope_index": 0.12
}
```

`quality_tier`: `exceptional` | `strong` | `competent` | `weak-trope` | `broken`

`trope_index`: 0.0 (highly distinctive) to 1.0 (pure trope). Used for the trope-avoidance scorer.

---

## Reference Set Requirements

For a v1 reference library, target this minimum coverage:

| Domain | Strategies (per domain) | Quality tiers (per strategy) |
|--------|------------------------|------------------------------|
| marketing-landing | action-first, evidence-first, split-action-evidence, problem-risk-first, audience-self-selection | 3 exceptional, 3 strong, 2 weak-trope |
| marketing-pricing | comparison-first, action-first, value-led | 2 exceptional, 2 strong, 2 weak-trope |
| marketing-product-page | workflow-first, evidence-first, action-first | 2 exceptional, 2 strong, 2 weak-trope |
| internal-dashboard | sidebar-led, full-bleed, density-led | 2 exceptional, 2 strong, 2 weak-trope |
| internal-list-detail | sidebar-led, master-detail, table-first | 2 exceptional, 2 strong, 2 weak-trope |
| internal-settings | sectioned-form, two-pane, search-first | 2 exceptional, 2 strong |
| auth-onboarding | progressive, single-screen, walkthrough | 2 exceptional, 2 strong |

Total minimum: ~85 references. This is unglamorous to build but is the single highest-leverage taste-encoding work in the entire system. The user should expect to spend real human time curating and tagging these.

The "weak-trope" tier is intentionally included. The evaluator needs negative examples to detect the patterns the system is supposed to avoid. Without weak-trope references, the trope detector has no signal.

---

## Curation Process (for the user, when populating)

For each reference:

1. **Capture the original page** — screenshot at desktop 1440x900 and mobile 390x844. Save with date.

2. **Translate to gray-box wireframe** — produce a `wireframe.html` per `wireframe-html-format.md` that captures the *structure* of the original, stripped of brand styling. This is a translation, not a recreation. Same components, same hierarchy, same density, same responsive behavior — gray boxes only. The point is to make the structural moves comparable across references regardless of brand differences.

3. **Tag with strategy** — which named strategy from the architect's strategy list does this page exemplify? If it's a hybrid, pick the dominant one and note the secondary.

4. **Score quality tier** — be honest. Most landing pages on the internet are `competent` at best and `weak-trope` is common. `exceptional` is rare. A library that's all "exceptional" is miscalibrated.

5. **Write the `what_works` notes** — this is where your taste enters the system. 3-6 specific structural moves that make this reference strong (or weak). The evaluator's structural-distinctiveness scorer reads these notes when comparing candidates.

6. **Tag structural moves** — short kebab-case names for the moves the page makes. These become the vocabulary the evaluator uses to describe candidate designs. Build the vocabulary as you go; aim for ~30-50 distinct moves total across the library.

---

## Initial Empty State (current)

This library is currently empty. The architect-evaluator's structural-distinctiveness scorer will operate in degraded mode (general-knowledge tropes only, no domain-specific calibration) until references are populated.

Calibration priority order:

1. Populate `marketing-landing/` with at least 12 references first (covers the most common case)
2. Add the user's actual top-3 domains based on their workload
3. Expand to the full v1 set above over time

The system works without references — it just doesn't have your taste calibrated into it yet. Each reference added measurably improves the evaluator's ability to distinguish strong from weak candidates in that domain.
