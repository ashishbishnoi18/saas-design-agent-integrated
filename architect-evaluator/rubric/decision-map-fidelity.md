# Decision Map Fidelity Rubric

The Decision Map (Section 4 of the architect output) is the architect's strategic reasoning. Fidelity scoring asks: does the rendered wireframe actually instantiate the reasoning, or did the architect produce a beautiful Decision Map and then design something different?

This is the single most architect-specific dimension of evaluation. The other dimensions could apply to any visual design output — fidelity is what catches the failure mode where reasoning and execution diverge.

Five axes. Each scored 0–10 with reasoning naming the specific Decision Map element being checked.

---

## Axis 1: User Decision Sequence Resolution

**Source:** Section 4A.

**Question:** For each decision named in 4A, is the resolving element actually present in the wireframe, and is it visually weighted to actually resolve that decision?

**Process:**
1. Read 4A — it lists decisions at page, section, and component levels with their resolving elements.
2. For each decision, find the named resolving element in the wireframe (`data-component` attribute should match).
3. Assess whether that element, as rendered, can plausibly resolve the named decision. A "first question: is this for me?" decision resolved by a piece of body text in a tertiary section is a fidelity failure — the resolution is nominally present but visually too weak.

**Scoring:**
- 10: Every named decision has a resolving element present AND visually weighted to plausibly resolve it.
- 7: All decisions have resolving elements present but at least one is under-weighted relative to the decision's importance.
- 4: At least one named decision has no corresponding resolving element in the wireframe.
- 1: Multiple decisions are unresolved, OR the page-level decision (the user's first question) has no resolving element above the fold.

**Audience-specific check:** When 4A names different decisions per audience segment, and the page is supposed to serve multiple audiences, check that the wireframe contains resolving elements for all named segments, not just one.

---

## Axis 2: Asset and Signal Presence

**Source:** Section 4B.

**Question:** For each asset and signal inferred in 4B, is it present in the wireframe — or, if absent, is its absence justified in 4D?

**Process:**
1. Read 4B — it lists product/output assets, proof assets, conversion assets, and navigation/self-selection assets, plus the action-vs-signal classification.
2. For each asset, check the wireframe for a corresponding component.
3. If absent, check 4D's Component Justification — was this asset deliberately excluded with reasoning?
4. Pay attention to the action-vs-signal split: actions (forms, buttons) and signals (proof, examples, output) should both appear in the wireframe; if one category is entirely missing, that's a structural problem.

**Scoring:**
- 10: Every asset from 4B is either present or explicitly excluded in 4D with reasoning.
- 7: One asset is present but visually weak; or one asset is missing without explicit exclusion.
- 4: Multiple inferred assets are missing without justification, OR an entire category (signals or actions) is missing.
- 1: The wireframe contains only the actions, with no signals present at all (or vice versa) — the page is one-sided despite 4B inferring a balanced asset set.

**Common failure mode:** The architect infers proof assets in 4B (testimonials, case studies, metrics, output examples) and then produces a wireframe with only logos as proof. This is a fidelity failure — the architect *named* richer proof assets and didn't use them.

---

## Axis 3: Component Justification Adherence

**Source:** Section 4D.

**Question:** Does the wireframe contain exactly the components 4D justified for inclusion, and exclude exactly those 4D justified for exclusion?

**Process:**
1. Read 4D — every row has a Verdict: Include / Exclude / Modify.
2. For every Include row, verify the component is in the wireframe with matching `data-component`.
3. For every Exclude row, verify the component is *not* in the wireframe.
4. For every Modify row, verify the modified version is present.
5. Check for components in the wireframe that are NOT in 4D — these are unjustified additions.

**Scoring:**
- 10: Wireframe components exactly match 4D's Include set; no unjustified additions, no missing inclusions.
- 7: Wireframe matches 4D except for one minor unjustified addition (e.g., an extra footer link) or one missing inclusion.
- 4: Wireframe contains 1+ components that 4D marked Exclude, OR is missing 1+ components 4D marked Include.
- 1: Wireframe and 4D substantially disagree — multiple unjustified components or missing justifications.

**Why this matters:** Unjustified components are the classic "noise" failure — the architect adds a "trust badges" row or "as featured in" strip not because the Decision Map called for it, but because that's what AI-trained landing pages do. Catching this is the primary defense against trope reversion.

---

## Axis 4: Tension Resolution Presence

**Source:** Section 4E.

**Question:** For each tension named in 4E, is the named resolution actually visible in the wireframe?

**Process:**
1. Read 4E — each tension has a Resolution that names a specific design choice.
2. For each tension, find the resolution element(s) in the wireframe.
3. Assess whether the resolution is *executed* visually, not just *declared*. A resolution that says "show price prominently but in human-readable format" requires the price element to actually be prominent and human-readable in the wireframe — not just present somewhere.
4. The wireframe should ideally tag tension-resolving elements with `data-tension="{tension-name}"` for easy verification.

**Scoring:**
- 10: Every tension resolution is visibly executed in the wireframe.
- 7: All tensions resolved, but one or more resolutions are visible only on close inspection — the user wouldn't perceive the resolution from the rendered page.
- 4: At least one tension's resolution is missing or contradicts the spec.
- 1: 4E lists tensions but the wireframe ignores them — tensions are unresolved despite being named.

**Special case — empty Tension Map:** If 4E is empty or claims "no tensions," score this axis 1. Real design has tensions; "no tensions" means the architect didn't surface them, which is itself a failure of the Decision Map. This is ALSO a hard floor: an empty Tension Map drops the candidate's overall score regardless of other dimensions.

---

## Axis 5: Strategy Commitment (Search Mode)

**Source:** Section 4C (search mode).

**Question:** Does the wireframe instantiate the assigned strategy, or does it drift to a different strategy mid-design?

**Process (search mode only — skip in interactive mode):**
1. Read the assigned strategy from 4C.
2. Look at the wireframe and ask: if you didn't know the strategy, which strategy would you guess from the wireframe?
3. If your guess matches the assignment, the candidate committed. If not, it drifted.

**Strategy signatures to check:**
- `action-first` → primary CTA is in the first viewport, prominent, with proof support adjacent
- `evidence-first` → product output/proof leads, CTA appears mid-page or later
- `split-action-evidence` → first viewport has both action and proof, neither dominant
- `problem-risk-first` → first viewport names a problem/cost; CTA appears after the framing
- `audience-self-selection` → first viewport offers 2+ audience paths as primary choices
- `content-teaching-first` → first viewport teaches/explains; CTA is downstream of comprehension
- `comparison-first` → first viewport contains a comparison structure (us vs them, with vs without)
- `workflow-walkthrough-first` → first viewport shows the actual workflow/output, not abstract value prop
- `density-led` → first viewport has high information density signaling competence
- `unconventional` → first viewport breaks a common pattern; the broken pattern should be named in 4C

**Scoring:**
- 10: Wireframe is unmistakably the assigned strategy. A blind-test reader would identify it correctly.
- 7: Wireframe is the assigned strategy with mild drift toward another (e.g., evidence-first with a more-prominent-than-typical CTA).
- 4: Wireframe is plausibly read as the assigned strategy OR another strategy — the commitment is weak.
- 1: Wireframe is more recognizably a different strategy than the assigned one — the candidate has drifted.

**Why this matters:** In Best-of-N search, the orchestrator deliberately runs different strategies to explore the space. If all candidates collapse to action-first regardless of assignment (a common AI failure mode — action-first is the "safest" trope), the search has no diversity and Best-of-N degrades to Best-of-1.

---

## Weighting

Default weights for the five axes (sum to 1.0):

```
decision_sequence_resolution:        0.25
asset_signal_presence:               0.20
component_justification_adherence:   0.25
tension_resolution_presence:         0.15
strategy_commitment:                 0.15
```

In interactive mode (no assigned strategy), redistribute strategy_commitment's weight equally across the other four. In search mode, it's a key axis — strategy drift is the most common failure mode of N-candidate search.

---

## Hard Floor

If `tension_resolution_presence < 3` (i.e., empty Tension Map or unresolved tensions) OR `component_justification_adherence < 4` (multiple unjustified components), this dimension is capped at 5 regardless of other axes. These are diagnostic of architect failure, not minor issues.
