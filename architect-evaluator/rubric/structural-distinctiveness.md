# Structural Distinctiveness Rubric

This rubric catches the failure mode that everything else misses: the candidate is internally coherent, faithful to its Decision Map, and visually polished, and also completely generic. The wireframe could be the wireframe for any of 10,000 AI-generated SaaS landing pages, and an experienced designer would dismiss it on sight.

This rubric is diagnostic and punitive, not a positive novelty reward. The evaluator must not add points merely because a layout is unusual. Unusual structure matters only when it improves business outcome, objection resolution, audience fit, task completion, mobile path, or strategy commitment. Generic trope patterns convert into `TROPE_REVERSION_PENALTY` from `0.0` to `-1.0`.

Three axes. The trope detector is the most important; it does not require references and runs always.

---

## Axis 1: Trope Avoidance

**Question:** Does the wireframe avoid the named generic patterns that signal training-data-average AI output?

**Process:**
1. Examine the desktop screenshot.
2. Check against the Trope Library below.
3. For each trope detected, name it in your critique.
4. Score by trope count and severity.

### Trope Library (V1)

#### Marketing Page Tropes

**T-001: Empty Hero Trope**
*Signature:* Centered headline + centered subhead + centered CTA, large empty space below, no peek into next section.
*Why it's a trope:* AI defaults to centered hero composition because training data over-represents it; the centered emptiness signals "I had nothing else to put here."
*Detection:* First viewport is >70% empty space, primary content is centered horizontally and vertically, no peek visible.

**T-002: Uniform Card-Row Trope** *(formerly "Hero + Three Feature Cards")*
*Signature:* Any horizontal row of 3+ cells (cards, columns, panels) where the cells share **equal width AND equal visual weight AND identical internal structure**. The internal structure can be any repeating pattern — `[icon + heading + body]`, `[number + label]`, `[quote + attribution]`, `[item-name + short description]`, `[step-number + step-name]`, etc. The trope is the *committee-of-equal-cards* move, regardless of what the cards contain.
*Why it's a trope:* Multi-up uniform card rows are the most over-trained pattern in AI marketing layouts. Identical cells signal "I generated N things and stopped." The pattern shows up as feature grids, testimonial grids, "what's included" rows laid as cards, stat-callout strips, and equal-weight step-by-step rows. The failure mode is the same in every guise: the architect chose committee-of-equals instead of committing to weight differences.
*Detection:* A row of 3+ visually identical cells anywhere on the page (not just after the hero), where the cells are interchangeable in role and rendered with no weight differentiation. Step-by-step rows count *if* all steps are equal weight; do NOT count if one step is visibly emphasized (e.g., a workflow where Step 1 hosts a real form and the others are smaller previews — that's a differentiated workflow, not a card row). A page that contains multiple instances of this trope (e.g., a feature grid AND a testimonial grid AND a stat strip) still counts T-002 once for scoring purposes, but list every instance in your critique so the architect can see the pattern.

**T-003: Logo Strip Right After Hero Trope**
*Signature:* "Trusted by [logos]" strip immediately below the hero, before any value content.
*Why it's a trope:* Defaults to performing trust before earning it; signals "I know I'm supposed to have social proof but I don't know where to put it."
*Detection:* Logo strip in the first 100% of viewport scroll position, before any content explaining what the product does.

**T-004: Generic Benefit-Speak Trope**
*Signature:* Section headers like "Built for scale", "Made for teams", "Designed for developers", with body copy that's filler.
*Why it's a trope:* Pattern of empty-vessel headline phrases that reveal nothing specific.
*Detection:* This is content-level, not structure-level — note it if the placeholder text in the wireframe uses these exact patterns, but DO NOT penalize the wireframe for placeholder content (Section 10's content direction drives real copy). Only flag if the *structure* implies generic content (e.g., a "benefits" section with three feature cards positioned where specific outcome content should go).

**T-005: Pricing Table With Three Tiers Of Equal Width Trope**
*Signature:* Three pricing columns of equal width and equal visual weight, with a "Most Popular" highlight on the middle one.
*Why it's a trope:* Defaults to the SaaS pricing pattern without considering whether tiers should have different weights (recommended tier should dominate).
*Detection:* Pricing section with 3 equal-width cards.

**T-006: FAQ Accordion At The Bottom Trope**
*Signature:* Page ends with FAQ section as accordion, often answering questions no one asked.
*Why it's a trope:* Defaults to "and add an FAQ" without justifying which questions actually block the user.
*Detection:* FAQ section in the last 20% of the page with accordion structure.

**T-007: Footer With Five Equal Columns Trope**
*Signature:* Footer with [Product / Company / Resources / Legal / Social] as five identical columns.
*Why it's a trope:* SaaS-default footer that has no information about how the user actually uses the page.

**T-008: Single-Centered-Column Marketing Page Trope**
*Signature:* The entire page is one centered column with everything stacked vertically — no asymmetry, no horizontal interest, no use of width.
*Why it's a trope:* AI defaults to mobile-first stacking even at desktop because vertical stacking is the safest layout. Real strong marketing pages use horizontal composition deliberately.
*Detection:* Desktop screenshot has all elements horizontally centered with similar widths; no two-column compositions, no horizontal contrast.

#### Internal Tool Tropes

**T-101: Sidebar + KPI Cards + Chart Grid Trope**
*Signature:* Left sidebar nav, top row of 4 KPI metric cards, grid of 2-4 charts below, all in equal-width cards.
*Why it's a trope:* The "AI dashboard" pattern. Reveals nothing specific about the actual workflow.
*Detection:* Layout is sidebar + 4-up KPI row + chart grid with no other distinctive structure.

**T-102: Top Nav + Tabs + Table Trope**
*Signature:* Top nav, page title, row of tabs, big table below, no other visual interest.
*Why it's a trope:* Defaults to the admin-panel pattern even when the user's actual task isn't list-management.

**T-103: Settings Page With Sectioned Toggles Trope**
*Signature:* Settings page where every section is identical: header + body + toggle/dropdown.
*Why it's a trope:* Defaults to uniform settings rows even when some settings need much more visual weight (security, billing) than others.

#### Auth/Onboarding Tropes

**T-201: Centered Form In Empty Space Trope**
*Signature:* Login/signup is a centered form card on an otherwise empty page (often with a background gradient as the only visual element).
*Why it's a trope:* The auth-form-in-void pattern. Misses opportunities for context, brand, or product preview.

**T-202: Wizard With Progress Bar At Top Trope**
*Signature:* Multi-step flow with horizontal progress bar at top, each step being a centered form.
*Why it's a trope:* Defaults to wizard pattern even when the steps could be inline-progressed or branched.

#### Cross-Cutting Tropes

**T-901: Symmetric Equal-Weight Trope**
*Signature:* Multiple elements that should have hierarchy are rendered with identical sizes / weights.
*Why it's a trope:* AI struggles to commit to weight differences and defaults to equal-weight, which flattens hierarchy.

**T-902: Decorative Filler Box Trope**
*Signature:* Large image/illustration placeholder boxes in positions that don't serve any decision the user is making.
*Why it's a trope:* AI fills space with "[Image]" placeholders to make pages "feel more designed" without committing to specific content.
*Detection:* `[IMG]` placeholders that don't correspond to a specific asset named in 4B.

**T-903: Center-Everything Trope**
*Signature:* Every section header, every paragraph, every CTA — all centered.
*Why it's a trope:* Centered alignment signals "important" but if everything is centered nothing is. Real designers use left-alignment for body content and reserve center for emphasis.

### Scoring

Count distinct tropes detected and apply:

| Tropes detected | Score |
|----------------|-------|
| 0 tropes; design has clear distinguishing structural moves | 9–10 |
| 0 tropes; design is clean but unremarkable | 7–8 |
| 1 trope detected | 5–6 |
| 2 tropes detected | 3–4 |
| 3+ tropes detected | 1–2 |
| The candidate IS a trope (composed primarily of tropes) | 0 |

Name every trope detected in your critique. Use the trope ID (e.g., "T-002") AND the human name.

The trope library is incomplete by design. Add to it as you find new tropes. Tropes are domain-specific in part — the user should expect to add tropes for their specific domain over time.

---

## Axis 2: Family Resemblance (Reference-Conditional)

**Question:** When references are provided for the same domain + strategy, does this candidate share structural moves with strong references, without copying?

**Process:**
1. Check if `--references` was provided. If not, score this axis as `n/a` and redistribute its weight to the other two axes.
2. Look up the reference set matching the candidate's domain (Section 1) and strategy (Section 4C).
3. For each strong/exceptional reference: note the structural moves listed in its `meta.json`.
4. Examine the candidate wireframe for matching moves. NOT identical layouts — matching *moves*. A "split-hero-with-product-preview" move can be executed many different ways; we want to see that the candidate is making moves of the same kind, not that it has copied a layout.
5. Also check: does the candidate make any moves that none of the strong references make? These are not necessarily bad — distinctive new moves can be excellent — but they should be deliberate, named in 4C as deliberate divergence, and not just random additions.

**Distinguishing family resemblance from copying:**
- Family resemblance: "Like the Stripe payments reference, this candidate uses a split-hero with product preview adjacent to the action; but the candidate's product preview is a code snippet rather than a UI screenshot, and the proportions are reversed (action smaller, preview larger)."
- Copying: "This candidate has the exact same hero composition as the Stripe reference."

Family resemblance scores high. Copying scores low — copying produces homogenized output, the opposite of distinctiveness.

**Scoring:**
- 10: Candidate shares 2+ structural moves with strong references in the same family while making 1+ deliberately distinct move.
- 7: Candidate shares moves with strong references but doesn't make any distinctive moves of its own.
- 4: Candidate has minimal overlap with strong reference moves AND has not deliberately diverged — just unrelated.
- 1: Candidate is a near-copy of a specific reference, OR has zero family resemblance to ANY references in its domain (which suggests it doesn't belong to the strong-reference distribution at all).

**No-references mode:** When references are not provided, this axis is `n/a` and weighted at 0. The orchestrator should note this in the final verdict — the system is operating in degraded mode without taste calibration.

---

## Axis 3: Distinctiveness Diagnostic

**Question:** Does this candidate show specific structural moves, or does it collapse into generic layout tropes?

Cross-candidate distinctiveness is evaluated later by the pairwise tournament, where the evaluator can see multiple candidates. In the single-candidate pass, score only trope risk, family resemblance, and whether the candidate has named structural moves. Do not claim that it differs from unseen candidates.

**Scoring:**
- 10: Wireframe is unmistakably its assigned strategy with structural moves that other strategies wouldn't make.
- 7: Wireframe is its assigned strategy but the structural choices are mild — could be confused with a neighboring strategy.
- 4: Wireframe could be any of several strategies — no strong commitment visible.
- 1: Wireframe doesn't read as any strategy in particular, or reads as a different strategy than assigned.

**Note:** Strategy Commitment (Decision Map axis 5) and Strategy Distinctiveness (this axis) overlap by design. They check the same property from two angles: commitment asks "is the assigned strategy faithfully executed," distinctiveness asks "is the assigned strategy structurally visible vs a generic version of itself." Both are needed.

---

## Weighting

Default weights for the three axes (sum to 1.0):

```
trope_avoidance:           0.50
family_resemblance:        0.30  (or 0.0 with weight redistributed if references absent)
distinctiveness_diagnostic:  0.20
```

When references are absent, redistribute family_resemblance's weight: 0.65 trope, 0.35 diagnostic distinctiveness.

Trope avoidance is weighted highest because it is the most consistently-detectable taste signal even without references. Family resemblance is the strongest signal when references exist but degrades gracefully without them.

The orchestrator does not positively weight this score. It records `STRUCTURAL_DISTINCTIVENESS_DIAGNOSTIC_SCORE` and applies only `TROPE_REVERSION_PENALTY`.

---

## Hard Floor

If 3+ tropes are detected in the candidate, this dimension is capped at 3 regardless of family resemblance or strategy distinctiveness. A wireframe that is a soup of tropes cannot be saved by partial alignment with references — it's not distinctive, it's average.
