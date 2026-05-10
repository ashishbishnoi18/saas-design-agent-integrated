# Spatial Design Principles

First-principles layout knowledge. These are tools for reasoning about space, NOT templates to apply. Every layout decision must be justified by the specific page requirements gathered during intake.

---

## Visual Hierarchy

Hierarchy is how you tell the user what matters most. You have 5 tools:

1. **Size** — Larger elements are seen first. Headlines > body text. Primary CTA > secondary links.
2. **Contrast** — High contrast attracts attention. Dark on light (or reverse) for primary elements. Muted tones for tertiary.
3. **Whitespace** — Isolation draws the eye. An element surrounded by empty space feels more important than one packed among peers.
4. **Position** — Top-left (LTR languages) is scanned first. Above the fold gets first attention. Center alignment suggests importance.
5. **Density** — Sparse sections feel significant. Dense sections feel utilitarian. Vary density to signal purpose shifts.

**Scanning patterns:**
- **F-pattern:** Text-heavy pages (articles, docs, search results). Users scan the top horizontally, then down the left edge. Place key info on the left and in the first line.
- **Z-pattern:** Pages with fewer, larger elements (landing pages, hero sections). Eye moves: top-left → top-right → bottom-left → bottom-right. Place CTA at the terminal point (bottom-right).

Choose scanning pattern based on content type, not page type.

---

## Information Architecture Primitives

Every page is one of three archetypes (or a blend):

### Navigation-Heavy
Purpose: Route users to the right place. The page itself is a waypoint, not a destination.
- Examples: homepages, category pages, app shells with sidebar
- Key principle: Minimize cognitive load per option. Grouping and labeling do the heavy lifting.
- Layout: Clear sections/groups, descriptive labels, shallow hierarchy

### Content-Heavy
Purpose: Deliver information. The user came to read, watch, or learn.
- Examples: articles, documentation, product pages, reports
- Key principle: "Information scent" — every element either satisfies the user's goal or creates a clear path toward it. Remove anything that doesn't serve comprehension.
- Layout: Wide content column, minimal distractions, progressive depth

### Action-Heavy
Purpose: Get the user to DO something. Forms, flows, conversion pages.
- Examples: signup flows, checkout, onboarding, settings pages
- Key principle: Reduce friction between intent and completion. Every element either supports the action or gets out of the way.
- Layout: Focused, minimal navigation, clear progression

Most pages blend two archetypes. Identify the dominant one and let it drive layout decisions. The secondary archetype informs supporting elements.

---

## Spatial Composition

### Grids
Think in conceptual columns, not pixel-specific frameworks:
- **1-column:** Focused content, reading flow, mobile, forms
- **2-column:** Content + sidebar, main + supporting, comparison
- **3-column:** Dashboard with nav + content + detail/panel
- **4+ column:** Card grids, feature comparisons, galleries

The grid serves the content. Choose column count based on how many parallel pieces of information the user needs at once.

### Whitespace as Structure
Whitespace is not "empty" — it's a structural element:
- **Macro whitespace:** Space between major sections. Signals topic change.
- **Micro whitespace:** Padding within components. Creates breathing room.
- More whitespace = higher perceived quality and focus.
- Less whitespace = higher density and efficiency.

Match whitespace to page type: marketing pages get generous macro whitespace. Internal tools minimize it.

### Proximity = Grouping
Elements close together are perceived as related. This is the most powerful grouping tool — more effective than borders or backgrounds.

- Related controls go together (filter bar: search + dropdowns)
- Labels sit close to their fields
- Action buttons sit near the content they act on
- Separation (whitespace or dividers) signals "these are different groups"

### Alignment = Trust
Consistent alignment creates visual order, which creates trust.
- Pick an alignment system and stick to it
- Left-align body content (LTR languages)
- Center-align hero sections and CTAs when they need emphasis
- Misalignment feels broken, even if subtle

---

## Content Hierarchy

Classify every element on the page:

### Primary (P)
- Gets the most visual weight and space
- The reason the page exists
- 1-2 primary elements maximum
- Examples: hero headline, main data table, primary CTA

### Secondary (S)
- Supports or enables the primary elements
- Gets moderate visual weight
- Can be multiple secondary elements
- Examples: feature descriptions, filter bar, social proof, sidebar

### Tertiary (T)
- Present but should not compete for attention
- Gets minimal visual weight
- Often structural or utilitarian
- Examples: footer, breadcrumbs, pagination, fine print

**Rule:** If everything is primary, nothing is primary. Force ranking.

---

## Page Flow & Rhythm

### Sequencing Toward the Primary CTA
On marketing/conversion pages, the page must earn the primary action. That does not require a fixed sequence. Decide the order from the user's decision chain.

Common persuasion ingredients:
- hook: why should I care?
- proof: can this deliver?
- trust: is this safe, credible, or appropriate for me?
- action: what do I do next?
- orientation: which path, audience, or use case is mine?
- risk reduction: what happens if this is wrong, expensive, slow, or low quality?

These ingredients may be sequential, adjacent, combined, or deferred depending on the audience and context. Do not ask for commitment before the required belief is established, but do not hide the action when the action itself helps the user move forward with low risk.

### Avoiding Local Optima
Do not move directly from "business wants action" to "make the action the layout." First identify the belief, confidence, or understanding the user needs before the action feels worth taking.

Before choosing a major page region, especially the first viewport, compare multiple structural strategies:
- action-first: reduce friction and make the next step obvious
- evidence-first: resolve doubt before asking for action
- split action + evidence: pair the next step with the reason to trust it
- problem/risk-first: make the consequence or opportunity concrete
- navigation/choice-first: help different audiences self-select
- content-first: teach or explain when comprehension is the blocker

These are not templates. They are candidate strategies to test against the intake. The winning structure depends on audience intent, trust level, task urgency, available assets, business priority, and responsive constraints.

Separate actions from signals:
- Actions ask the user to do something: input, click, choose, submit, buy, contact, schedule, download.
- Signals help the user believe something: product output, proof, examples, metrics, guarantees, constraints, process, provenance, client evidence, screenshots, diagrams, copy tone, pricing clarity.

Do not reject a signal because it would be bad as an action. Consider passive/static versions before excluding it. Do not accept an action-first layout just because it is clean; name the user belief it resolves, or pick a structure that resolves the missing belief better.

For every major region, name the local optimum you avoided. Examples of local optima include over-centering the primary form, over-explaining before action, showing breadth without differentiation, making two audiences equal when one should lead, or using generic social proof when product-specific evidence would answer the real objection.

### Progressive Disclosure
Show only what's needed at each stage. Details available on demand.
- Expandable sections (FAQ, advanced settings)
- "Show more" patterns
- Drill-down from summary to detail
- Useful for complex pages — reduces initial overwhelm

### Long vs. Shallow Pages
- **Long scrolling pages:** Good for narrative flow (marketing, articles). User controls pace.
- **Shallow pages with navigation:** Good for task-oriented pages (dashboards, settings). User jumps to what they need.

Choose based on whether the user's journey is linear (long page) or non-linear (shallow + nav).

---

## Density Calibration

### Marketing = Low Density
- Generous whitespace between sections
- Large typography for headlines
- One idea per viewport
- Emotional tone: spacious, confident, premium
- Why: The user is being persuaded. Noise kills persuasion.

### Internal = High Density
- Compact spacing
- Smaller typography with clear hierarchy
- Multiple data points visible simultaneously
- Functional tone: efficient, utilitarian, scannable
- Why: The user has a task. Wasted space = wasted time.

### Hybrid Must Pick a Dominant Mode
- If the page mixes marketing and internal patterns, one must lead
- Common hybrid: product page with marketing top + feature comparison table below
- The transition between modes should be clearly marked (section break, background change)

---

## Multi-Page Flow Layout

When designing flows (onboarding, checkout, wizards):

### Consistent Shell
- Navigation, header, and overall frame stay consistent across pages
- Only the content area changes between steps
- This creates spatial memory — users know where they are

### Progress Indication
- Users must always know: where they are, how far they've come, how far they have to go
- Options: step indicators, progress bars, breadcrumbs, "Step 2 of 4"
- Progress indicator placement: top of content area, consistent position on every page

### Shared Visual Language
- Same typography, spacing, and component styles across all pages
- If page 1 uses cards, page 3 shouldn't switch to a totally different pattern without reason
- Consistency = trust and predictability

### Entry and Exit Clarity
- Entry point: clear starting action and expectation-setting ("This will take about 3 minutes")
- Exit/completion: clear confirmation that the flow is done and what happens next
- Early exit: always provide a way out (but it can be de-emphasized)
