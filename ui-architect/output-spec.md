# Output Format Contract

Every design output from ui-architect MUST follow this exact section order. No sections may be omitted. No "TBD" is allowed anywhere — make a decision and note the reasoning if uncertain.

`ui-architect` is a layout, wireframe, and UX reasoning agent. It does not produce final visual design, brand styling, production CSS, or pixel-perfect specs. It must, however, produce enough visual acceptance constraints for downstream implementation and verification agents to avoid guessing — AND it must produce a renderable HTML wireframe that the architect-evaluator can screenshot and score.

---

## Section 1: Page Classification

```
TYPE: marketing | internal | hybrid
```

One line. If hybrid, state which mode dominates and why.

---

## Section 2: Intake Summary

Reproduce the 4 confirmed intake fields exactly as the user approved them:

```
PURPOSE: {specific verb + measurable outcome + business intent}
AUDIENCE: {user segment, technical level, motivation, decision behavior}
CONTEXT: {standalone/flow, entry point, exit point, user journey stage}
KEY ACTIONS: {ranked 1-3 CTAs with priority}
```

In search mode, this section is reproduced from the orchestrator-provided intake. The architect does not modify it.

---

## Section 3: Flow Map (multi-page only)

ASCII diagram showing page relationships, navigation paths, and flow direction. Include entry point and completion state.

For single pages, write: `FLOW: Single page (standalone)` or `FLOW: Single page (part of {context})`.

---

## Section 4: Decision Map

The strategic reasoning behind every component choice. The bridge between intake and design.

### 4A: User Decision Sequence

Map the user's decision chain from page-level to component-level. For each level, state the decision, what resolves it, and note differences between audience segments.

```
PAGE LEVEL:
  User's first question: "{what they're trying to figure out when they land}"
  Resolved by: {element(s) that answer this question}

SECTION LEVEL:
  Scanning for: "{what they're looking for as they browse}"
  Resolved by: {element(s) that support scanning}

COMPONENT LEVEL:
  Click-vs-skip decision: "{what makes them engage with a specific item}"
  Resolved by: {specific component attributes that resolve this micro-decision}
```

### 4B: Asset And Evidence Inference

Infer useful assets and signals from the product, audience, business model, and objections.

```
PRODUCT/OUTPUT ASSETS:
  {what the user ultimately receives, uses, reads, configures, or evaluates}

PROOF ASSETS:
  {evidence of capability, quality, reliability, outcomes, provenance, client fit}

CONVERSION ASSETS:
  {price clarity, risk reducers, demo paths, comparison aids, examples, guarantees}

NAVIGATION/SELF-SELECTION ASSETS:
  {ways roles, audiences, use cases, or intent levels choose the right path}

ACTION VS SIGNAL CLASSIFICATION:
  Actions: {inputs, buttons, links, submissions, choices}
  Signals: {assets that help the user believe something before acting}
```

### 4C: Strategy Defense (search mode) OR Candidate Structure Search (interactive mode)

**Interactive mode** — generate competing structural strategies and score them in a comparison table. Then state CHOSEN STRUCTURE, WHY IT WINS, LOCAL OPTIMUM AVOIDED. (Identical to original behavior — see prior version of this spec.)

**Search mode** — the strategy is assigned. Defend it:

```
ASSIGNED STRATEGY: {strategy name}

WHY THIS STRATEGY FITS THIS INTAKE:
  {2-4 sentences linking the assigned strategy to specific intake elements:
   the user's first question, the audience's decision behavior, the business intent,
   and the available assets. Make this an honest defense, not a rationalization.
   If the fit is weak in some respect, name that — the orchestrator wants to know.}

LOCAL OPTIMUM THIS STRATEGY RISKS:
  {The shallow/generic version of this strategy that you are deliberately avoiding.
   For action-first: over-centering the form. For evidence-first: proof without
   action visible at all. For audience-self-selection: equal-weight options that
   produce decision paralysis. Name yours specifically.}

HOW THIS DESIGN AVOIDS THAT LOCAL OPTIMUM:
  {1-3 sentences pointing to specific decisions in this design that prevent the
   shallow version.}

REFERENCE CALIBRATION (if --references provided):
  {Which 1-3 reference patterns from the injected library you considered, and
   how your design relates: same family, deliberate divergence, or independent
   answer. Do not name reference URLs — describe the structural pattern.}

STRATEGIC DIAGNOSIS MAPPING (required if a strategic diagnosis is provided):
  - Strategic axis mapped: {axis/key from diagnosis} → {component or section decision}
  - Audience/buyer implication: {diagnosis field} → {decision}
  - Design directive implication: {diagnosis field} → {decision}

FIRST VIEWPORT OBLIGATION (required if a strategic diagnosis is provided):
  {Quote or paraphrase the diagnosis first_viewport_obligation, then list the exact
   first-fold components that satisfy it on desktop and mobile.}

HARD FLOOR COVERAGE (required if a strategic diagnosis is provided):
  - {diagnosis hard floor} → {selector/component/section that satisfies it}

ANTI-PATTERN AVOIDANCE (required if a strategic diagnosis is provided):
  - {diagnosis anti-pattern} → {specific design choice that avoids it}
```

These diagnosis-mapping blocks are parsed by the harness. Do not rename them when the orchestrator passes a strategic diagnosis.

### 4D: Component Justification

For every component you plan to include in the wireframe, justify it through both lenses.

```
| Component | User Lens | Business Lens | Verdict |
|-----------|-----------|---------------|---------|
| {name}    | {what user decision this resolves} | {how this serves conversion/retention} | Include / Exclude / Modify — {reasoning} |
```

If a component serves one lens but hurts the other, it must appear in the Tension Map (4E).

### 4E: Tension Map

Where business intent and user needs pull in opposite directions. Each tension gets a named resolution.

```
TENSION: {component or design decision}
  Business pull: {what business wants and why}
  User pull: {what user needs and why}
  Resolution: {your call and reasoning}
```

If there are no tensions, re-examine your component list. Real design always involves tradeoffs.

---

## Section 5: Visual Hierarchy Map

Numbered list of every element on the page, ranked by visual importance (1 = highest). Group by classification.

```
PRIMARY (dominant visual weight):
  1. {element} — {why it's #1}
  2. {element} — {why}

SECONDARY (supporting):
  3. {element} — {role}

TERTIARY (present but recessive):
  4. {element} — {role}
```

This ranking will be checked by the evaluator against the rendered HTML wireframe — visual weight in the rendered output must match this stated ranking.

---

## Section 6: Component Inventory

Every component that appears in the wireframe must be listed here.

```
| Component          | Class | Purpose                        | Content Direction                |
|--------------------|-------|--------------------------------|----------------------------------|
| Hero headline      | P     | Communicate core value prop    | 8-12 words, action-oriented     |
| Primary CTA        | P     | Drive trial signups            | "Start Free Trial" or similar   |
| Feature grid       | S     | Support value prop with proof  | 3 items, benefit-led, 15w each  |
| Footer nav         | T     | Legal + secondary navigation   | Standard footer links            |
```

Class: P = Primary, S = Secondary, T = Tertiary.

Each row must correspond to an element in Section 12 (HTML wireframe) with matching `data-component` and `data-class` attributes.

---

## Section 7: ASCII Wireframe(s)

(Unchanged from prior spec — kept for human reasoning. The vision-evaluable artifact is the HTML wireframe in Section 12, not this.)

One wireframe per page. Box-drawing characters. Max width: 72 characters.

---

## Section 8: Responsive Behavior

Describe how the layout adapts at conceptual breakpoints. Use named breakpoints, not pixel values (the HTML wireframe in Section 12 will encode the actual breakpoint behavior in CSS).

```
DESKTOP (default):
  {layout description}

TABLET:
  {what changes}

MOBILE:
  {what stacks, collapses, hides, or transforms}
```

---

## Section 9: Interaction Notes

Non-static behavior. If the page is entirely static, write "No dynamic interactions." (The HTML wireframe is intentionally static — it does not implement these interactions, only annotates them.)

---

## Section 10: Content Direction

Per-section tone and messaging guidance for downstream content agents.

```
OVERALL TONE: {description}

SECTION-BY-SECTION:
- Hero: {key message, emotional register, word count}
- Features: {proof style, length per item}
- Social proof: {type, placement reasoning}
- CTA: {urgency level, friction reducers, action verb}
```

---

## Section 11: Visual Acceptance Spec

Implementation-grade layout constraints for downstream agents. Falsifiable.

### 11A: Viewports & Scenarios

```
VIEWPORTS:
- Desktop: 1440x900
- Tablet: 768x1024
- Mobile: 390x844
```

### 11B: First Viewport Composition

```
FIRST VIEWPORT (desktop):
- {element} must be visible before scroll.
- {primary action} must be visible before scroll.
- Next section must peek below the fold by {small/moderate/clear} amount.
- Must not render as a single empty hero-only viewport.
```

### 11C: Layout Constraints

```
LAYOUT:
- Desktop: {column structure and relative priority}
- Tablet: {reflow/collapse behavior}
- Mobile: {single-column order and transformed components}
- {component} owns primary visual weight; {component} remains secondary.
```

### 11D: Density & Rhythm

```
DENSITY:
- Mode: low-density marketing | moderate hybrid | compact internal tool
- Major sections use {generous/moderate/compact} separation.
- Repeated items use {comfortable/compact/dense} spacing.
- Controls must not visually compete with the primary action.
```

### 11E: Required Stable Selectors

```
REQUIRED SELECTORS:
- #page-root
- #primary-section
- #primary-action
- #important-component
```

Each required selector MUST appear as an `id` on the corresponding element in the HTML wireframe (Section 12).

### 11F: Non-Negotiables

Layout decisions that must not be changed by implementers.

### 11G: Allowed Variation

What implementers may adapt without violating the spec.

### 11H: Not Allowed

Common drift patterns that would fail verification.

---

## Section 12: HTML Wireframe Artifact

A renderable HTML file that encodes the spatial decisions in this spec as gray-box semantic HTML. The architect MUST produce this as a separate file (`wireframe.html` or `wireframe.{strategy}.html` in search mode), not inline in the spec.

Format strictly per `knowledge/wireframe-html-format.md`.

The wireframe must:
1. Render correctly in any browser with no errors
2. Display three responsive states at 1440px, 768px, 390px viewport widths
3. Contain every component from Section 6 with matching `data-component` and `data-class` attributes
4. Contain every selector from Section 11E as `id` attributes
5. Use grayscale only (no color decisions — those come from a downstream agent)
6. Use semantic HTML5 elements where possible (`<header>`, `<main>`, `<section>`, `<aside>`, `<footer>`, `<nav>`)
7. Make hierarchy visible through size, weight, position, and density — NOT through color or branding

This artifact is what the architect-evaluator screenshots and scores. It is the ground truth for visual evaluation at the architecture stage.

The spec section MUST include a stub block stating the artifact's filename and confirming it has been written:

```
HTML WIREFRAME ARTIFACT:
  File: wireframe.{strategy}.html  (or wireframe.html in interactive mode)
  Components: {count, must equal Section 6 row count}
  Selectors: {count, must equal Section 11E entry count}
  Status: written
```

---

## Multi-Page Flow Additions

(Unchanged from prior spec — Sections 3, 5, 6, 7, 12 multiply per page. Section 12 produces one HTML file per page, named `wireframe.{strategy}.{page-key}.html`.)
