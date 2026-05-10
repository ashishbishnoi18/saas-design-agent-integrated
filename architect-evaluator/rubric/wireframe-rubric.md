# Wireframe Quality Rubric

Vision-based evaluation of the rendered wireframe screenshots. Eight axes. Each is scored 0–10 with specific reasoning naming the element or relationship.

The harness captures both viewport screenshots and full-page screenshots. First-viewport composition must use viewport screenshots only. Whole-page rhythm, density progression, and section sequence may use full-page screenshots. Mobile above-fold path must use the mobile viewport screenshot. Full-page screenshots must not excuse a bad first fold.

This rubric is what defines "good" at the wireframe stage. It is intentionally narrower than a full visual rubric — at this stage there is no color, typography, or brand. We can only score *spatial* and *structural* properties. Color, typography, and visual register are scored downstream by the visual-architect-evaluator (not in scope for this document).

---

## Scoring Calibration

Use this anchor table for every axis. The anchors describe the *quality of the property*, not the difficulty of producing it.

| Score | Meaning |
|-------|---------|
| 10 | Exceptional. Specifically excellent in a way that is rare and worth studying. The kind of thing that distinguishes a strong page from a competent one. |
| 8–9 | Strong. The property is clearly well-handled, with intentionality visible. No issues that a skilled designer would call out. |
| 6–7 | Competent. The property is acceptable. A skilled designer might make different choices but couldn't call it broken. This is the median for trained-data-average AI output. |
| 4–5 | Marginal. The property has visible issues that compromise the design but don't break it. |
| 2–3 | Failing. The property is broken in a way that affects the user's ability to use the page or perceive its intent. |
| 0–1 | Severely broken or absent. The property is missing entirely or causes the page to be unusable. |

**Important calibration note:** The default for AI-generated wireframes is 6–7. If you find yourself giving 8s and 9s consistently, recalibrate downward. Strong work earns 8+. Median work earns 6–7. Anything below 6 is a real problem.

---

## Axis 1: Hierarchy Match

**Question:** Does the rendered visual weight of each component match the hierarchy declared in Section 5 (Visual Hierarchy Map) and the `data-class` attributes in the wireframe?

**What to look at in the screenshot:**
- The element ranked #1 in Section 5 should be the most visually dominant element on the page (size, position, contrast against surrounding space).
- Elements with `data-class="primary"` should be visibly larger or more prominent than those with `data-class="secondary"`, which in turn should be more prominent than `data-class="tertiary"`.
- Hierarchy must hold *across the page*, not just within a single section. A primary element in a recessive position can still be primary if it has compensating size; a primary element that's both small AND in a recessive position is failing.

**Common failure modes:**
- A "primary" element rendered the same size as a "secondary" element → the tier collapses
- A primary CTA rendered with the same visual weight as a secondary CTA → action hierarchy is broken
- Heading sizes that descend by less than 1.3x → the steps are too small to read as hierarchy
- The visually largest element on the page is something that was ranked #4 or lower in Section 5 → declared and rendered hierarchy disagree

**Specific scoring:**
- 10: Hierarchy is unmistakable, intentional, and rewards the eye in the order Section 5 declared.
- 7: Hierarchy is correct in declaration but visually flat — the steps are too small to perceive without reading the spec.
- 4: Two adjacent tiers visually collapse into each other (primary and secondary indistinguishable).
- 1: The visually largest element is something Section 5 ranked tertiary or omitted.

---

## Axis 2: Density Match

**Question:** Does the perceived density of the rendered page match the mode declared in Section 11D (Density & Rhythm)?

**What to look at:**
- "low-density marketing" should look spacious. Generous padding, large whitespace between sections, a feeling of room.
- "compact internal tool" should look efficient. Tight spacing, multiple data points visible in one viewport, minimal whitespace per element.
- "moderate hybrid" should look intentional in its mode mixing — sections should be clearly demarcated as either marketing-mode or tool-mode, not a soup.

**Common failure modes:**
- Marketing pages with so much whitespace that the page feels empty rather than spacious (this is different from being *correctly* spacious).
- Marketing pages with internal-tool density (everything packed tight) — the page feels stressed and untrusted.
- Internal tools with marketing-page whitespace — feels wasteful, slows the user down.
- Hybrid pages that don't visually distinguish the marketing-mode sections from the tool-mode sections.

**Specific scoring:**
- 10: The page reads as its declared mode at a glance, without reading any text.
- 7: The page reads as its declared mode after a moment, but some sections leak the wrong mode.
- 4: The page reads as the *opposite* of its declared mode, OR reads as no mode in particular.
- 1: The page is so densely or sparsely arranged that the declared mode is impossible.

---

## Axis 3: Whitespace and Rhythm

**Question:** Is whitespace used as a structural element with rhythm, or is it random/uniform?

**What to look at:**
- Vertical rhythm between sections — do major sections have more space between them than internal section content does?
- Whitespace around primary elements — is there breathing room that signals importance?
- Macro vs micro whitespace — is the distinction respected (large gaps signal section change, small gaps signal grouping)?
- Repeating intervals — does the page have a consistent spacing scale (8/12/24/48 progression) or arbitrary gaps?

**Common failure modes:**
- Uniform whitespace everywhere — no rhythm, just evenly spaced elements with no signal of importance or grouping.
- Whitespace concentrated only in one section — the rest of the page is dense and the contrast feels accidental.
- Whitespace used decoratively — large empty regions with no element to highlight.
- Whitespace inconsistent within tiers — primary elements have different amounts of breathing room from each other for no reason.

**Specific scoring:**
- 10: Whitespace is clearly doing structural work — the rhythm tells you where you are in the page.
- 7: Whitespace is reasonable but doesn't actively signal structure.
- 4: Whitespace is uniform or random; no rhythm visible.
- 1: Whitespace is inverted — dense around important elements, generous around unimportant ones.

---

## Axis 4: Grouping Coherence

**Question:** Do related elements appear close together (proximity = grouping), and are unrelated elements visually separated?

**What to look at:**
- Form fields and their labels — are they close together?
- A CTA button and its risk-reducer text — adjacent or visually separated?
- Logos in a logo strip — equal spacing, single group? Or scattered?
- Section headers and their content — clearly attached to the section below?
- Footer links — grouped by category, or strewn?

**Common failure modes:**
- A primary CTA with a risk-reducer placed in a different section entirely (Section 11D's "near every CTA" rule violated).
- Form labels separated from inputs by inconsistent gaps.
- Section headers floating with equal whitespace above and below — they don't visually attach to either section.
- Cards in a grid with inconsistent gaps — some pairs feel paired, others feel orphaned.

**Specific scoring:**
- 10: Every element's grouping is unambiguous from spacing alone.
- 7: Most groupings are clear; one or two are ambiguous.
- 4: Several groupings are visually wrong (related elements separated, unrelated elements adjacent).
- 1: The page reads as a flat list of elements with no grouping discernible.

---

## Axis 5: First Viewport Composition

**Question:** Does the desktop first viewport (top 900px) satisfy what Section 11B declared, and avoid the "empty hero-only" anti-pattern?

**What to look at in the desktop viewport screenshot, 1440x900 only:**
- Are all elements declared as "must be visible before scroll" actually visible?
- Is the primary action visible?
- Does the next section peek below the fold (a sliver of section 2 visible at the bottom)?
- Or does the entire viewport contain only a centered headline + CTA + nothing else?

**Common failure modes:**
- "Empty hero-only" — the most common AI-generated landing page failure: a centered headline, a centered subhead, a centered CTA, vast empty space below, no peek.
- Elements declared in 11B as required-visible are actually below the fold.
- Multiple peek-elements crammed into the first viewport so it doesn't feel like a hero at all.
- Hero with no peek but also no clear "this is a hero" signal — looks like a layout mistake.

**Specific scoring:**
- 10: First viewport has the hook + the primary action + a clear peek inviting scroll. Confident composition.
- 7: First viewport is correct but predictable — every required element is there but the composition is bog-standard.
- 4: First viewport renders as empty hero-only OR misses one of the required-visible elements.
- 1: First viewport renders as either completely empty above the fold OR so packed that there's no hierarchy.

---

## Axis 6: Action Prominence Calibration

**Question:** Is the primary CTA prominent enough for the strategy assigned to this candidate, AND avoiding the local optimum named in Section 4C?

**What to look at:**
- For `action-first` strategy: the primary CTA should be a dominant visual element early in the page. But it should NOT be over-centered with no surrounding context — that's the local optimum action-first is supposed to avoid.
- For `evidence-first` strategy: the primary CTA may be smaller / later but must still be present; it should not be missing or buried.
- For `split-action-evidence`: the action and the proof should be co-located and visually balanced; neither should subordinate the other.
- For `audience-self-selection`: the primary CTAs are the audience-segment chooser elements, not a single bottom-line action.

The local optimum named in Section 4C of the spec tells you what to specifically avoid for THIS candidate's strategy. Read it.

**Common failure modes:**
- Action-first with primary CTA isolated in the center of an empty hero with no context (the local optimum).
- Evidence-first with no CTA visible in the first viewport at all (over-correcting).
- Split-action-evidence with the action visually winning so the "evidence" feels like ornamentation.
- Audience-self-selection with three equal-weight options producing decision paralysis.

**Specific scoring:**
- 10: Action prominence is calibrated to the strategy *and* the named local optimum is visibly avoided.
- 7: Action prominence is correct but the local-optimum avoidance is not visibly executed (the architect *says* it avoided it but the wireframe doesn't show how).
- 4: Action prominence is miscalibrated for the strategy (too prominent for evidence-first, too buried for action-first).
- 1: The candidate has fallen directly into the named local optimum, OR the primary CTA is missing entirely.

---

## Axis 7: Responsive Viability

**Question:** Does the mobile screenshot (390x844) show coherent stacking and not break the design's intent?

**What to look at in the mobile screenshot:**
- Elements stacked in priority order — most important on top?
- Components that should transform (table → cards, sidebar → drawer) actually transformed?
- Components flagged `data-mobile="hide"` actually hidden, with their access path still visible somewhere?
- No horizontal scroll, no overflow, no broken multi-column layouts that didn't collapse?
- Touch targets readable / tappable at mobile size?

Also check the tablet screenshot (768x1024) for the intermediate state — is it a smooth transformation between desktop and mobile, or does it look like an awkward in-between?

**Common failure modes:**
- Multi-column desktop layouts that didn't collapse — content overflows or text shrinks unreadably.
- Sidebars still visible on mobile, eating 30% of the screen.
- Mobile primary CTA below the fold of the mobile viewport.
- Hidden mobile elements with no access path.
- Tablet looks like a poorly-cropped desktop, not a real intermediate.

**Specific scoring:**
- 10: Mobile and tablet are first-class, intentional, with clear priority ordering.
- 7: Mobile works but the order or transforms are debatable.
- 4: Mobile has visible problems — overflow, broken column collapse, missing access path.
- 1: Mobile is broken — horizontal scroll, unreadable, or fundamental layout failure.

---

## Axis 8: Spatial Polish

**Question:** Are alignments consistent, sizes consistent within a class, and does the wireframe look intentional rather than assembled?

**What to look at:**
- Alignment grid — do elements snap to consistent column edges?
- Within a class (all primary buttons, all card heights), are sizes consistent?
- Are there off-by-small-amounts misalignments that suggest the wireframe was assembled rather than designed?
- Borders, dividers, gaps — do they form a coherent system?

**Common failure modes:**
- Buttons with inconsistent sizes for no functional reason.
- Cards in a grid with different internal padding.
- Section centers that drift left or right.
- Elements that align to nothing in particular.

**Specific scoring:**
- 10: Every element snaps to a clear grid; consistency within tiers is visible.
- 7: Mostly aligned but a few small drifts.
- 4: Multiple visible alignment issues; the page looks assembled.
- 1: No alignment system visible; chaos.

---

## Weighting

Default weights for the eight axes (sum to 1.0):

```
hierarchy_match:              0.18
density_match:                0.10
whitespace_rhythm:            0.10
grouping_coherence:           0.10
first_viewport_composition:   0.15
action_prominence:            0.18
responsive_viability:         0.12
spatial_polish:               0.07
```

These weights reflect: hierarchy and action prominence are the most diagnostic (a wireframe that nails these is almost always good); first-viewport composition is the most failable (the empty-hero trope is the #1 AI fail); spatial polish is the least diagnostic at the wireframe stage because the visual-architect downstream will refine it.

Tune these for your domain — a documentation site weights hierarchy higher and action prominence lower; a checkout flow weights action prominence higher.
