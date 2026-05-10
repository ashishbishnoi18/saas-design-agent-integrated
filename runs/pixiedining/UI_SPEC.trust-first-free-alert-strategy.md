# UI_SPEC — trust-first-free-alert-strategy — Pixiedining Landing Page

---

## Section 1: Page Classification

```
TYPE: marketing (dominant — 100% pre-purchase, selling mode)
```

All content serves conversion of cold visitors into free alert signups or paid Pro subscribers. No internal tool patterns apply. Dominant archetype: action-heavy (conversion) supported by content-heavy trust-building. Trust establishment is not a prerequisite phase that precedes action — it is co-located with action.

---

## Section 2: Intake Summary

```
PURPOSE: Convert visitors into paying users for two outcomes — (a) free signups
for a single-restaurant alert during one upcoming trip, and (b) paid Pro
subscriptions ($14.99/mo or $99/yr) for unlimited restaurants, multi-park
bundles, push + SMS notifications, faster polling cadence, and auto-resume.
The site must establish credibility quickly because users are skeptical of any
third-party that touches Disney's reservation system, and emotionally invested
because the trip is often a once-a-year or once-in-a-lifetime expense.

AUDIENCE:
  Segment A — One-trip family planner: Parent/trip-planner, 5-10 day Disney
    vacation, knows 60-day window, has tried refreshing, skeptical of
    third-party safety, decides in under 2 min, signs up free first, upgrades
    only after the free alert proves the service is real.
  Segment B — Disney superfan / Annual Passholder: Expert, knows competitors
    (MouseDining, DVC Reservation Finder, Touring Plans), cares about polling
    cadence, notification channels, coverage breadth. Methodical. Will pay
    annual upfront if convinced of clear differentiation.
  Segment C — Travel agent / planner: Disney-specialized agent, needs
    multi-client monitoring, will inquire before paying.

CONTEXT: Standalone marketing landing page, root of pixiedining.com. Entry from
  paid search ("disney dining reservation finder", "be our guest cancellation
  alert"), Reddit r/WaltDisneyWorld, TikTok. Exit to free alert signup (primary),
  Stripe Pro checkout (secondary), contact form for agent tier (tertiary).
  User journey stage: SELLING. Pre-purchase for both tiers. Trust establishment
  and emotional reassurance are the primary conversion blockers.

KEY ACTIONS:
  1. PRIMARY — Start a free single-restaurant alert (enter trip dates + party
     size + restaurant → email/push).
  2. SECONDARY — Upgrade to Pro for unlimited restaurants, SMS, faster polling.
  3. TERTIARY — See sample alert / how it works / coverage — also Travel Agent
     Plan inquiry path for Segment C.
```

---

## Section 3: Flow Map

```
FLOW: Single page (standalone, root of pixiedining.com)

Entry sources:
  Paid search ("disney dining reservation finder", "be our guest alert")
  Reddit r/WaltDisneyWorld referral threads
  TikTok discovery videos

pixiedining.com (this page)
  │
  ├─► [Free Alert Form] ──► Alert confirmation + account creation (off-spec)
  │                              └─► Pro upgrade prompt (off-spec)
  │
  ├─► [Pro CTA] ──► Stripe checkout (off-spec)
  │
  └─► [Agent Inquiry] ──► Contact / inquiry form (off-spec)
```

---

## Section 4: Decision Map

### 4A: User Decision Sequence

```
PAGE LEVEL:
  User's first question: "Will this actually watch for the table I missed and
    alert me when it opens — without me needing to give anyone my Disney login?"
  Resolved by: Hero headline (stakes clarity) + alert setup form (task path) +
    no-login badge (primary safety signal) + official-handoff note (role clarity)

SECTION LEVEL:
  Scanning for: "Is this service real and trustworthy? How fast are alerts?
    Does it cover my restaurant? What's the difference between free and Pro?"
  Resolved by: How-it-works flow (mechanism) + safety panels (extended trust) +
    sample alert (proof of reality) + proof stats (quantified credibility) +
    coverage section (restaurant validation) + pricing comparison (tier clarity)

COMPONENT LEVEL:
  Click-vs-skip decision for form: "The form only asks for restaurant, dates,
    party size, email — it's not asking for my Disney login." The inputs
    themselves are the trust demonstration.
  Resolved by: form field labels (benign, non-credential inputs visible)

SEGMENT DIVERGENCE:
  Segment A: Reads headline + trust trio + submits free form → scrolls to
    safety panels only if skeptical
  Segment B: Reads headline → scrolls to proof stats → coverage → pricing →
    expert card before deciding; may go directly to Pro CTA
  Segment C: Reads headline → scrolls to agent inquiry card → contacts
```

### 4B: Asset and Evidence Inference

```
PRODUCT/OUTPUT ASSETS:
  Real-time alert message (email, push, or SMS) containing: restaurant name,
  available date, time slot, party size match, and direct link to Disney.com
  reservations. The alert fires when a matching slot appears in Disney's
  official availability data. Users act on the alert by clicking through to
  Disney's own booking interface.

PROOF ASSETS:
  Alert volume (total alerts sent — quantified scale signal)
  Average latency (time from slot appearing to alert delivery — performance proof)
  Sample alert preview (concrete format of what users receive)
  Restaurant and park coverage count (breadth signal)
  Testimonials with specific outcomes ("booked in 3 minutes")
  Polling cadence comparison (Pro vs standard — for Segment B)

CONVERSION ASSETS:
  Free tier (zero commitment, no credit card — reduces entry barrier)
  Risk reducers near CTA: "No credit card required", "No Disney login required"
  Refund / cancellation language (support path)
  Payment processor logos (Stripe security signal)
  Annual plan savings ($99/yr — save $81 vs monthly — for committed subscribers)

NAVIGATION/SELF-SELECTION ASSETS:
  Coverage section with park tabs (WDW / Disneyland / Both) — restaurant
    validation for any Disney destination
  Expert segment card — performance details for Segment B
  Agent inquiry card — multi-client path for Segment C

ACTION VS SIGNAL CLASSIFICATION:
  Actions: free alert form (submit), primary CTA button, Pro CTA button,
    agent inquiry CTA, second CTA button
  Signals: no-login badge, official-handoff note, alert volume stat, sample
    alert preview, proof stats strip, testimonials, safety panels,
    payment logos, coverage tags, pricing comparison features
```

### 4C: Strategy Defense (Search Mode)

```
ASSIGNED STRATEGY: trust-first-free-alert-strategy

WHY THIS STRATEGY FITS THIS INTAKE:
The intake identifies trust skepticism as Segment A's primary conversion
blocker and free alert signup as the primary business event. The trust-first
strategy is the correct answer here because it co-locates the safety proof
(no-login badge, official-handoff note) WITH the primary action (form) in the
same viewport — rather than sequencing safety proof as a prerequisite before
any task path appears. The diagnosis confirms: "Trust proof must appear in
the first viewport or immediately adjacent to the first action path." The
form's benign inputs (restaurant, dates, party size, email) are themselves the
deepest trust signal: users see that Pixiedining never asks for Disney
credentials, which resolves the stated blocker through demonstration rather
than assertion. This aligns precisely with trust_burden: high and
functional_immediacy: high from the strategic axes — both must be satisfied
simultaneously, not sequentially.

LOCAL OPTIMUM THIS STRATEGY RISKS:
"Trust theater" — stacking safety logos, disclaimers, and "we're secure"
paragraphs before any action path, producing a high-friction flow where the
user must read a wall of trust content before ever reaching the form. The
shallow trust-first layout treats safety content as a gate before action,
which increases cognitive load and contradicts functional_immediacy: high.
It produces a page that feels defensive rather than confident.

HOW THIS DESIGN AVOIDS THAT LOCAL OPTIMUM:
The form is placed inside the hero's first viewport alongside (not after) the
trust signals — in a 2-column desktop layout where trust trio occupies the
left column and form occupies the right column simultaneously. The primary
trust mechanism is the form's own input requirements (benign, no credentials),
and the trust badges are compact inline elements adjacent to the form, not
a preceding content block. Extended safety content exists in a dedicated
section below the fold only for users who need deeper reassurance — it does
not block the primary task path.

REFERENCE CALIBRATION:
This design draws on the structural family of high-trust consumer utility SaaS
pages where the primary differentiator is "we don't touch your sensitive
credentials." The structural move — immediate task entry co-located with safety
proof, with extended trust available on scroll — appears in account-linked
monitoring services, price-tracking tools, and availability alert utilities
that must establish safety before task commitment. This is a deliberate
divergence from "safety-first explanatory" pages where a large hero block
explains the trust model before any task path is visible, which is the
ap_magic_before_task anti-pattern named in the diagnosis.
```

**STRATEGIC DIAGNOSIS MAPPING:**

| Strategic Axis | Axis Value | Component/Section Decision |
|---|---|---|
| trust_burden | high | no-login-badge and official-handoff-note co-located in hero first viewport alongside form |
| functional_immediacy | high | alert-setup-form in hero, all 4 fields visible before scroll on desktop |
| audience_sophistication | mixed | compact trust trio for Segment A in hero; expert detail card deep in page for Segment B |
| decision_risk | medium | payment logos, support contact, and refund language in safety section |
| visual_posture | polished_utility | form card bordered surface, clean badge styling, no castle imagery |
| content_depth | layered | trust signals in hero (surface); extended safety panels (medium); expert cadence (deep) |
| expected_session_duration | one_to_three_min | form requires 4 fields only; all required trust signals in first viewport |
| usage_pattern | short_repeated_utility | mobile form design with 48px touch targets; no dense scrolling required to act |

Audience/buyer implications:
- Segment A (family planner, quick decider, trust blocker primary) → trust signals precede or co-locate with form; form inputs are demonstrably non-threatening
- Segment B (methodical, comparative) → coverage section + expert card placed below pricing; proof stats include latency and polling cadence
- Segment C (agent, multi-client need) → agent-inquiry-card in dedicated lower section, not in primary conversion zone

Design directive implications:
- proof_strategy → alert volume + sample alert appear in first below-fold section after how-it-works
- explanation_strategy → 4-step how-it-works flow explicitly names "Book on Disney.com" as step 4
- cta_strategy → hero is free-alert-only; Pro CTA appears in nav (secondary) and pricing section; agent path is tertiary

**FIRST VIEWPORT OBLIGATION:**

Diagnosis: "Within seconds, visitors must understand that Pixiedining watches Disney dining cancellations, alerts them in real time, never needs their Disney login, and lets them start one free alert immediately."

First-fold components on desktop (1440px viewport):
- hero-headline: "Stop Refreshing. We'll Catch That Table the Second It Opens."
- hero-subhead: 2-sentence explanation of monitoring + alert + Disney.com booking handoff
- alert-setup-form: all 4 fields (restaurant, dates, party size, email) visible
- primary-cta: "Start My Free Alert →" button visible and actionable
- no-login-badge: "🔒 No Disney login required" co-located in hero left column
- official-handoff-note: "↗ You book on Disney.com after the alert fires"
- alert-volume-stat: "✓ 47,000+ alerts sent · avg. 4 min latency"

First-fold components on mobile (390px viewport):
- hero-headline (scaled to 1.875rem)
- no-login-badge + official-handoff-note (compact horizontal trust row)
- alert-setup-form (4 fields + submit, full width)
- free-tier-annotation ("Free · No credit card required")
- hero-subhead hidden on mobile (data-mobile="hide") — content covered by how-it-works section below fold

Failure condition: If a new visitor cannot identify the no-login safety model and begin free alert setup without scrolling, the page fails its core strategic job.

**HARD FLOOR COVERAGE:**

| Hard Floor ID | Rule | Satisfying Component/Selector |
|---|---|---|
| hf_free_alert_visible | Free single-restaurant alert action visible in first viewport | #alert-setup-form and #primary-action in hero; visible before scroll at all breakpoints |
| hf_no_login_trust | Page must state clearly that Pixiedining never logs into Disney account | #no-login-trust badge co-located in hero alongside form; reinforced in #safety-section |
| hf_no_guaranteed_booking | No claim or implication of guaranteed reservations or automatic booking | Copy uses "alert you when," "slot opens," "book on Disney.com" — audited throughout; no guarantee language anywhere |
| hf_official_handoff | Explain that users complete booking on Disney's official system after alert | #official-handoff in hero; step 4 in #how-it-works; safety-panel-handoff in #safety-section |
| hf_segment_self_selection | Support all three segments without forcing same message | Segment A: hero + safety-section; Segment B: #coverage-section + expert-segment-card; Segment C: #agent-inquiry |
| hf_mobile_first_task | Mobile must preserve primary alert path, trust proof, tier comprehension | First mobile viewport: headline + trust badges + form; no CTA below fold |
| hf_pro_value_specificity | Pro benefits specific: unlimited restaurants, SMS, 2× faster, multi-park, auto-resume | #pricing-section lists all 5 named differentiators with $14.99/mo and $99/yr |

**ANTI-PATTERN AVOIDANCE:**

| Anti-Pattern ID | Anti-Pattern | Avoidance Decision |
|---|---|---|
| ap_magic_before_task | Opening with whimsical vacation storytelling before the alert utility | Hero headline leads with the task ("Stop Refreshing") and outcome ("Catch That Table") not vacation mood; form immediately visible |
| ap_disney_clone_branding | Visuals or copy that imitate Disney's official brand | No castle imagery, no Disney color palette, no "magic" in product copy; "Disney.com" referenced as a destination link; non-affiliation disclaimer in footer |
| ap_unsupported_speed_claims | "Fastest alerts" or "instant" without evidence | Alert latency shown as "avg. 4 min" — specific, measurable; polling cadence shown in expert card as actual interval (60s Pro vs 3 min standard) |
| ap_hidden_safety_model | No-login and handoff only after several scrolls or in small print | No-login badge in hero first viewport, adjacent to form; not in FAQ or footer |
| ap_generic_saas_grid | Generic 3-benefit SaaS grid that could describe any alert product | How-it-works uses Disney-specific context (step 4: "Book on Disney.com"); coverage section names actual restaurants (Be Our Guest, Space 220, Cinderella's Royal Table) |
| ap_pro_overpush | Pushing paid Pro before visitor trusts the service | Hero is entirely free-alert focused; Pro appears as secondary link in nav and in pricing section below the fold |
| ap_agent_path_confusion | Agency messaging competing with family planner's primary path | Agent inquiry card is in a dedicated lower section labeled "For Power Users & Professionals"; not visible in primary conversion zone |
| ap_guarantee_language | Language implying guaranteed reservation or automatic booking | Copy audited: "alert you when," "slot just opened," "book it on Disney.com"; no "get your table," "guaranteed," or "we book it" language |

### 4D: Component Justification

| Component | User Lens | Business Lens | Verdict |
|---|---|---|---|
| nav-bar | Brand orientation; Pro discovery path for Segment B | Lightweight upsell surface; login access for returning users | Include — minimal: logo left, Pro link + Log In right |
| hero-headline | Answers "what does this do and why should I care?" in one read | Hooks visitors from search and social before they bounce | Include — Primary; 9 words, action + outcome |
| hero-subhead | Explains monitoring mechanism and official handoff in plain terms | Sets accurate expectations; reduces support requests from confused users | Include — Secondary; 2 sentences, ~40 words |
| alert-setup-form | Starts the primary task with non-threatening inputs | Primary conversion event: free alert signup creates account and upgrade path | Include — Primary; in hero, all fields visible before scroll |
| primary-cta | Clear single action with active verb | Drives free alert signups | Include — Primary; "Start My Free Alert →", full-width in form panel |
| free-tier-annotation | Removes commitment anxiety; reinforces "no credit card" | Reduces abandonment at the form submission step | Include — Secondary; below submit button |
| no-login-badge | Resolves stated primary trust blocker before any credentials are requested | Converts skeptical family planners who otherwise abandon | Include — Primary; co-located in hero with form |
| official-handoff-note | Clarifies that Pixiedining monitors and alerts; user books on Disney.com | Prevents overclaim support risk; builds accurate mental model | Include — Secondary; in hero trust trio |
| alert-volume-stat | Proves the service is real, active, and has scale | Social proof of traction; differentiates from fly-by-night competitors | Include — Secondary; in hero trust trio |
| how-it-works-steps | 4-step mental model: set → monitor → alert → book | Reduces setup friction and post-signup confusion | Include — Secondary; below hero |
| safety-panel-no-login | Extended "no credential" explanation for skeptics who need more than a badge | Converts users who read before acting; reduces abandonment for Segment A | Include — Secondary; dedicated safety section |
| safety-panel-handoff | Extended booking handoff explanation | Manages expectations; reduces post-alert support questions | Include — Secondary; dedicated safety section |
| payment-logos | Payment trust for users approaching Stripe checkout | Reduces drop-off at paid checkout; signals legitimate business | Include — Secondary; in safety section |
| support-contact | Contact path for unresolved doubts | Reduces abandonment; provides customer support signal | Include — Tertiary; in safety section |
| sample-alert-preview | Concrete proof of what users actually receive | Resolves "will it actually work?" doubt better than any copy can | Include — Secondary; phone mockup with realistic content |
| proof-stats-numbers | Quantified credibility (alerts sent, latency, coverage) | Differentiates from vague competitor claims; grounds performance promises | Include — Secondary |
| testimonial-1 | Social proof for Segment A (family planner outcome) | Converts fence-sitters who need peer validation | Include — Secondary; specific outcome attribution |
| testimonial-2 | Social proof for Segment B (superfan / AP endorsement) | Converts expert users considering annual subscription | Include — Secondary; technical credibility signal |
| coverage-tabs | Park filter for Disney World vs Disneyland — validates geographic relevance | Prevents bounce from users whose park isn't immediately named | Include — Tertiary; WDW / Disneyland / Both |
| coverage-tags | Named restaurants validate specific trip planning relevance | Upgrade motivation: "I need more than 1 restaurant" drives Pro consideration | Include — Secondary; most-wanted restaurants named |
| pricing-comparison | Drives tier decision with specific feature differentiation | Converts free users to Pro; captures annual subscription revenue | Include — Secondary; 2-column clear comparison |
| annual-pricing-note | Motivates annual commitment over monthly | Higher LTV; reduces monthly churn | Include — Tertiary; "$99/yr — save $81" |
| expert-segment-card | Polling cadence, SMS, coverage depth for Segment B | Converts Annual Passholders to annual Pro subscribers | Include — Tertiary; below pricing |
| agent-inquiry-card | Multi-client path for Segment C | Agency tier inquiry; future revenue stream | Include — Tertiary; in segments section with expert card |
| second-cta-button | Final conversion opportunity for users who scrolled without acting | Catches decision-ready users before they reach the footer | Include — Secondary; condensed form link |
| footer-nav | Legal links, support access | Compliance; trust signal (real company with legal pages) | Include — Tertiary |
| footer-disclaimer | Non-affiliation statement | Legal protection; prevents Disney trademark confusion | Include — Tertiary; must be present |

### 4E: Tension Map

```
TENSION: Trust content depth vs. Action immediacy
  Business pull: Get users to the form immediately (functional_immediacy: high)
  User pull: Family planners need to feel safe before submitting any information
    (trust_burden: high)
  Resolution: Co-locate compact trust badges (no-login, handoff, volume stat)
    adjacent to the form in the hero — neither precedes the other. Extended
    safety content lives below the fold for users who need more, without
    blocking users who are ready to act. The form's benign inputs are the
    primary trust mechanism.

TENSION: Free-first vs. Pro revenue pressure
  Business pull: Pro subscription is the primary revenue driver
  User pull: Segment A explicitly stated in intake: they sign up free first
    and upgrade only after the free alert proves the service is real
  Resolution: Hero is 100% free-alert focused. Pro is visible as a secondary
    nav link ("↑ Go Pro") and appears in full detail only in the pricing
    section below the fold. This sequences trust → utility proof → upgrade
    consideration, which matches Segment A's decision behavior.

TENSION: Family planner simplicity vs. Superfan detail hunger
  Business pull: Superfans are high-LTV annual subscribers; they require
    specific performance data (polling cadence, SMS channel, coverage count)
  User pull: Technical detail would slow family planners and add cognitive load
    before they've committed to the free signup
  Resolution: Primary flow is optimized for Segment A. Expert content (cadence
    intervals, comparison data, notification channels) is placed in a dedicated
    card below the pricing section. Superfans will scroll there; family planners
    complete the free signup before reaching it.

TENSION: Agent inquiry visibility vs. Primary conversion focus
  Business pull: Travel agents represent multi-account ARR and should have a
    clear path
  User pull: Agency messaging would signal "this is a B2B tool" and confuse
    family planners about whether the service is for them
  Resolution: Agent inquiry card is co-located with the expert card in a single
    section labeled "For Power Users & Professionals" — visually separated from
    the primary conversion zone, tertiary visual weight.

TENSION: Restaurant specificity (SEO/conversion value) vs. Disney trademark caution
  Business pull: Paid search traffic uses exact restaurant names; specificity
    drives higher-intent conversion
  User pull: Users need to see their target restaurant named to confirm coverage
  Resolution: Restaurant names are used in functional context only (form
    dropdown, coverage list, sample alert content) without Disney brand visual
    elements. Non-affiliation disclaimer in footer. "Monitor availability"
    language, never "access" or "partner with."
```

---

## Section 5: Visual Hierarchy Map

```
PRIMARY (dominant visual weight):
  1. Hero headline ("Stop Refreshing. We'll Catch That Table the Second It
     Opens.") — largest type on the page; answers the primary user question;
     first thing the eye lands on
  2. Alert setup form — largest interactive surface; position and bordered card
     treatment give it authority; primary task entry
  3. Primary CTA button ("Start My Free Alert →") — darkest, largest button on
     the page; only element at this visual weight
  4. No-login badge — positioned adjacent to form; its proximity to the action
     makes it the first trust signal the eye connects with

SECONDARY (supporting, moderate visual weight):
  5. Hero subhead — explains mechanism and handoff; visible but subordinate to
     headline
  6. Official handoff note + alert volume stat — trust trio items below headline;
     supporting evidence for the primary trust claim
  7. How-it-works 4-step flow — mental model section below hero; gets attention
     from scrollers
  8. Safety panels (2 cards) — extended trust for skeptics; card treatment gives
     them authority without competing with hero
  9. Sample alert preview — phone mockup; concrete proof; visually distinct
     (simulated device border)
  10. Proof stats strip — quantified credibility; bold numbers draw the eye
  11. Testimonials — supporting social proof; secondary after stats
  12. Coverage tag cloud — named restaurants; scan-friendly
  13. Pricing comparison — 2-column; medium visual weight; Pro column slightly
      more prominent

TERTIARY (present but recessive):
  14. Nav bar — minimal; logo + 2 links; does not compete
  15. Coverage filter tabs — functional; below section headline
  16. Annual pricing note — small, below pricing grid
  17. Expert segment card — muted card; for Segment B who seeks it
  18. Agent inquiry card — equal weight to expert card; tertiary both
  19. Second CTA section — isolated whitespace, secondary button or link
  20. Footer nav + disclaimer — standard footer weight
```

---

## Section 6: Component Inventory

| Component | Class | Purpose | Content Direction |
|---|---|---|---|
| nav-bar | T | Brand anchor + Pro/login access | Logo wordmark left; "↑ Go Pro" text link + "Log In" button right; no heavy nav items |
| hero-headline | P | Immediate task + emotional hook | 9 words: "Stop Refreshing. We'll Catch That Table the Second It Opens." |
| hero-subhead | S | Mechanism + handoff in 2 sentences | ~40 words: Disney dining sells out in seconds; Pixiedining monitors 24/7; alerts when slot opens; user books on Disney.com |
| alert-setup-form | P | Primary conversion entry point — all 4 fields visible in hero | 4 fields: restaurant selector (autocomplete), trip date range, party size, email |
| primary-cta | P | Submit free alert criteria; drive signup | "Start My Free Alert →" — full-width, dark fill, hero form card |
| free-tier-annotation | S | Remove commitment friction at point of action | "Free · No credit card required · 1 restaurant alert" — below submit button |
| no-login-badge | P | Resolve primary trust blocker in first viewport | "🔒 No Disney login required" — badge style, adjacent to form |
| official-handoff-note | S | Clarify post-alert user action and Pixiedining's scope | "↗ You book on Disney.com after the alert fires" |
| alert-volume-stat | S | Prove service is active and has scale | "✓ 47,000+ alerts sent · avg. 4 min latency" |
| how-it-works-steps | S | 4-step linear mental model of alert flow | Step 1: Set criteria; Step 2: We monitor 24/7; Step 3: Get alerted; Step 4: Book on Disney.com |
| safety-panel-no-login | S | Extended no-credential explanation for skeptics | ~50 words: no Disney account access, no credential storage, monitoring only |
| safety-panel-handoff | S | Extended booking handoff explanation | ~50 words: alert fires → direct link → user lands on Disney reservation page → user books |
| payment-logos | S | Payment trust signal near upgrade path | Visa, Mastercard, PayPal, Stripe; "Payments secured by Stripe" annotation |
| support-contact | T | Reduce abandonment from unresolved concerns | "Questions? support@pixiedining.com" |
| sample-alert-preview | S | Concrete proof of alert format and content | Phone mockup: "Be Our Guest — July 15 · 7:30 PM · Party of 4 · Slot just opened → Open Disney.com Reservations" |
| proof-stats-numbers | S | Quantified credibility with 3 specific stats | 47,000+ alerts sent; avg. 4 min latency; 65+ restaurants monitored |
| testimonial-1 | S | Social proof for Segment A (family planner) | "Got the alert and booked Be Our Guest in under 3 minutes." — Sarah T., WDW July 2024 |
| testimonial-2 | S | Social proof for Segment B (Annual Passholder) | "Best alert latency of any tool I've tried. The SMS sealed it." — Marcus R., Annual Passholder since 2022 |
| coverage-tabs | T | Park filter for geographic relevance | Pill tabs: "Walt Disney World" / "Disneyland" / "Both" |
| coverage-tags | S | Named restaurant validation; upgrade motivation ("I need more than 1") | Be Our Guest, Cinderella's Royal Table, Space 220, Storybook Dining, Topolino's Terrace, Oga's Cantina, Skipper Canteen, California Grill, Flying Fish, +40 more |
| pricing-comparison | S | Drive tier decision with specific feature differentiation | 2 columns: Free (1 restaurant, email, standard) vs Pro ($14.99/mo or $99/yr: unlimited, SMS+push, 2× faster, multi-park, auto-resume) |
| annual-pricing-note | T | Motivate annual commitment | "$99/yr — save $81 vs monthly" — below pricing grid |
| expert-segment-card | T | Polling cadence + notification detail for Segment B | "Polling every 60s (Pro) vs 3 min standard · SMS via Twilio · Push via web and app · All WDW + Disneyland restaurants" |
| agent-inquiry-card | T | Multi-client path for Segment C | "Booking Disney dining for multiple client families? Ask about our Travel Agent plan → Contact for Agent Plan" |
| second-cta-button | S | Final conversion before footer for scrolled users | "Start My Free Alert →" — secondary button style or scroll anchor; "Takes 30 seconds" annotation |
| footer-nav | T | Legal links, support, secondary navigation | About · Coverage · Pricing · FAQ · Terms · Privacy · Contact |
| footer-disclaimer | T | Non-affiliation statement — legally required | "Pixiedining is an independent monitoring service. Not affiliated with, endorsed by, or connected to The Walt Disney Company." |

---

## Section 7: ASCII Wireframe (Desktop — 72 chars wide)

```
┌──────────────────────────────────────────────────────────────────────┐
│ [PIXIEDINING]                         [↑ Go Pro]  [Log In]          │
└──────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────┐
│  HERO  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│  ┌──────────────────────────┐   ┌──────────────────────────────┐    │
│  │                          │   │ ┌──────────────────────────┐ │    │
│  │  Stop Refreshing.        │   │ │ Restaurant               │ │    │
│  │  We'll Catch That Table  │   │ │ [Be Our Guest          ▼]│ │    │
│  │  the Second It Opens.    │   │ ├──────────────────────────┤ │    │
│  │                          │   │ │ Trip dates               │ │    │
│  │  Disney dining sells out │   │ │ [Jul 12 – Jul 24, 2025 📅]│ │    │
│  │  in seconds and comes    │   │ ├──────────────────────────┤ │    │
│  │  back unpredictably.     │   │ │ Party size               │ │    │
│  │  Pixiedining monitors    │   │ │ [4 guests              ▼]│ │    │
│  │  24/7 and alerts you the │   │ ├──────────────────────────┤ │    │
│  │  instant a slot opens —  │   │ │ Email                    │ │    │
│  │  then you book it on     │   │ │ [you@email.com         ] │ │    │
│  │  Disney.com.             │   │ ├──────────────────────────┤ │    │
│  │                          │   │ │ [Start My Free Alert → ] │ │    │
│  │  🔒 No Disney login      │   │ │  Free · No credit card   │ │    │
│  │     required             │   │ └──────────────────────────┘ │    │
│  │  ↗  You book on          │   └──────────────────────────────┘    │
│  │     Disney.com after     │                                        │
│  │     the alert fires      │                                        │
│  │  ✓  47,000+ alerts ·     │                                        │
│  │     avg. 4 min latency   │                                        │
│  └──────────────────────────┘                                        │
└──────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────┐
│  HOW IT WORKS                                                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────┐│
│  │ 1            │  │ 2            │  │ 3            │  │ 4        ││
│  │ Set your     │→ │ We monitor   │→ │ Get alerted  │→ │ Book on  ││
│  │ criteria     │  │ 24/7         │  │ instantly    │  │ Disney   ││
│  │              │  │              │  │              │  │ .com     ││
│  │ Restaurant,  │  │ Pixiedining  │  │ Email, push, │  │ Click the││
│  │ trip dates,  │  │ checks the   │  │ or SMS the   │  │ link in  ││
│  │ party size,  │  │ official     │  │ moment a     │  │ your     ││
│  │ notification │  │ feed — no    │  │ matching     │  │ alert to ││
│  │ channel      │  │ refreshing   │  │ slot opens   │  │ complete ││
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────┘│
└──────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────┐
│  WHY PIXIEDINING IS SAFE TO USE                                      │
│  ┌──────────────────────────────┐  ┌──────────────────────────────┐ │
│  │ 🔒 We never log into your   │  │ ↗ You complete the booking   │ │
│  │ Disney account or store your│  │ on Disney's official site.   │ │
│  │ credentials. Pixiedining    │  │ When a slot opens we send a  │ │
│  │ monitors public dining      │  │ direct link. You click, land │ │
│  │ availability and sends      │  │ on Disney's reservation page,│ │
│  │ alerts. Nothing else.       │  │ and book it yourself.        │ │
│  └──────────────────────────────┘  └──────────────────────────────┘ │
│  [Visa] [MC] [PayPal] [Stripe]    Questions? support@pixiedining.com │
└──────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────┐
│  PROOF  ┌──────────────────────────┐  ┌──────────────────────────┐  │
│         │ 47,000+ alerts sent      │  │ ╔═══════════════════════╗ │  │
│         │ avg. 4 min latency       │  │ ║ 📱 PIXIEDINING        ║ │  │
│         │ 65+ restaurants monitored│  │ ╠═══════════════════════╣ │  │
│         │                          │  │ ║ Be Our Guest          ║ │  │
│         │ "Got the alert and       │  │ ║ July 15 · 7:30 PM     ║ │  │
│         │ booked Be Our Guest in   │  │ ║ Party of 4            ║ │  │
│         │ under 3 minutes."        │  │ ║ Slot just opened      ║ │  │
│         │ — Sarah T., WDW Jul 2024 │  │ ╠═══════════════════════╣ │  │
│         │                          │  │ ║ [Open Disney.com →]   ║ │  │
│         │ "Best latency of any     │  │ ╚═══════════════════════╝ │  │
│         │ tool I've tried. SMS     │  └──────────────────────────┘  │
│         │ sealed it."              │                                  │
│         │ — Marcus R., AP 2022     │                                  │
│         └──────────────────────────┘                                  │
└──────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────┐
│  RESTAURANTS WE MONITOR                                              │
│  [ Walt Disney World ]  [ Disneyland ]  [ Both Parks ]              │
│  [Be Our Guest] [Cinderella's Royal Table] [Space 220] [Storybook]  │
│  [Topolino's Terrace] [Oga's Cantina] [California Grill] [+40 more] │
└──────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────┐
│  FREE vs PRO                                                         │
│  ┌─────────────────────────────┐  ┌─────────────────────────────┐  │
│  │ FREE                        │  │ PRO                         │  │
│  │                             │  │ $14.99/mo  or  $99/yr       │  │
│  │ ✓ 1 restaurant alert        │  │ ✓ Unlimited restaurants      │  │
│  │ ✓ Email notifications       │  │ ✓ SMS + push notifications   │  │
│  │ ✓ Standard monitoring       │  │ ✓ 2× faster polling          │  │
│  │   (3-min cadence)           │  │ ✓ Multi-park bundles         │  │
│  │                             │  │ ✓ Auto-resume after alert    │  │
│  │ [Start Free →]              │  │ [Upgrade to Pro →]          │  │
│  └─────────────────────────────┘  └─────────────────────────────┘  │
│                   Annual plan saves $81 vs monthly                   │
└──────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────┐
│  FOR POWER USERS & PROFESSIONALS                                     │
│  ┌─────────────────────────────┐  ┌─────────────────────────────┐  │
│  │ Annual Passholders &        │  │ Travel Agents & Planners    │  │
│  │ Expert Planners             │  │                             │  │
│  │ Polling every 60s (Pro)     │  │ Booking dining for multiple │  │
│  │ vs 3 min standard · SMS     │  │ client families? Ask about  │  │
│  │ via Twilio · Push via web   │  │ our Travel Agent plan with  │  │
│  │ and app · 65+ restaurants   │  │ multi-trip monitoring.      │  │
│  │ across both parks           │  │ [Contact for Agent Plan →]  │  │
│  └─────────────────────────────┘  └─────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────┐
│  Ready to stop refreshing? Start your free alert — takes 30 seconds.│
│                      [Start My Free Alert →]                         │
└──────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────┐
│  About · Coverage · Pricing · FAQ · Terms · Privacy · Contact       │
│  Pixiedining is not affiliated with The Walt Disney Company.         │
└──────────────────────────────────────────────────────────────────────┘
```

**Mobile wireframe (390px — key first viewport):**

```
┌─────────────────────────────────────┐
│ [PIXIEDINING]              [Go Pro] │
├─────────────────────────────────────┤
│                                     │
│  Stop Refreshing. We'll Catch       │
│  That Table the Second It Opens.    │
│                                     │
│  [🔒 No Disney login] [↗ Disney.com]│
│                                     │
│  ┌───────────────────────────────┐  │
│  │ Restaurant                    │  │
│  │ [Be Our Guest               ▼]│  │
│  │ Trip dates                    │  │
│  │ [Jul 12 – Jul 24, 2025     📅]│  │
│  │ Party size                    │  │
│  │ [4 guests                   ▼]│  │
│  │ Email                         │  │
│  │ [you@email.com              ] │  │
│  │ [  Start My Free Alert →    ] │  │
│  │  Free · No credit card        │  │
│  └───────────────────────────────┘  │
│                                     │
│  ✓ 47,000+ alerts · avg. 4 min      │
│                                     │
└─────────────────────────────────────┘
[ HOW IT WORKS — vertical steps below ]
```

---

## Section 8: Responsive Behavior

```
DESKTOP (1440px, default):
  Nav: full width, logo left, Pro link + Log In right
  Hero: 2-column grid (55% content column | 45% form card column)
    Left column: headline → subhead → trust trio (3-item vertical list)
    Right column: form card (bordered surface, full fields visible)
  How it works: 4-column horizontal step flow with step numbers
  Safety: 2-column panels side by side
  Proof: 2-column (stats + testimonials left | phone mockup right)
  Coverage: Tag cloud with 3-tab park filter above
  Pricing: 2-column Free vs Pro, aligned tops
  Expert/Agent: 2-column segment cards
  Second CTA: centered, max-width 640px, generous whitespace
  Footer: single horizontal link row + disclaimer below

TABLET (768px):
  Nav: condensed, logo left, Pro link + Log In remain visible
  Hero: 1-column stack — headline → subhead → trust trio → form card
    Trust trio moves below subhead, above form (maintains trust-before-form order)
  How it works: 2×2 grid (steps 1-2 top row | steps 3-4 bottom row)
  Safety: 2-column panels remain (width comfortable at 768px)
  Proof: 1-column stack — stats + testimonials above | phone mockup below
  Coverage: tag cloud wraps naturally; tabs remain as pills
  Pricing: 2-column remains; columns may be narrower
  Expert/Agent: 2-column remains
  Footer: links wrap to 2 rows

MOBILE (390px):
  Nav: logo left, "Go Pro" text right (no hamburger needed — nav is minimal)
  Hero: full-width 1-column
    hero-subhead: hidden (data-mobile="hide") — content covered by how-it-works below
    Order: headline → trust badges row → form card → volume stat
    Trust badges: no-login + official-handoff displayed as 2 compact horizontal pills
    Form card: full-width, 48px minimum touch targets for all inputs
    Primary CTA: full-width button
    Free annotation: below button
  How it works: vertical 4-step list with connector line
  Safety: stacked panels (no-login panel above handoff panel)
  Proof: stacked (stats strip → phone mockup → testimonials)
  Coverage: tags wrap; filter tabs as scrollable pill row
  Pricing: stacked (Free above Pro); Pro column gets highlighted border
  Expert/Agent: stacked cards
  Second CTA: full-width button
  Footer: links in 2 rows; disclaimer below

TRANSFORMS:
  hero-subhead: visible (desktop/tablet) → hidden (mobile, data-mobile="hide")
  How-it-works: 4-col horizontal flow → 2×2 grid (tablet) → vertical list (mobile)
  Proof section: 2-col → stacked (tablet/mobile)
  Pricing: 2-col → stacked (mobile only)
  Segment cards: 2-col → stacked (mobile only)
  Trust trio: vertical list in hero (desktop) → 2-badge horizontal row before form (mobile)
```

---

## Section 9: Interaction Notes

```
Restaurant selector: Autocomplete dropdown with Disney restaurants pre-listed,
  ordered by demand (Be Our Guest, Cinderella's Royal Table, Space 220 at top).
  Searchable. Pro users see all 65+ options; free tier limits selection to 1.

Date picker: Date range input (trip start to end). Alert fires for any
  matching slot within the range. Native date picker on mobile; calendar widget
  on desktop.

Party size: Select field, values 1–20, with common values (2, 4, 6) prominent.

Email: Standard email input with inline validation. Single opt-in.

Form submission: Inline validation on blur. On success, form replaces with:
  "Your free alert is set! Check your inbox for confirmation."
  Below: "Want faster alerts, SMS, and unlimited restaurants? See Pro →"

Alert volume stat: Can be a live-updating counter refreshed via static build
  or lightweight API call. Displayed as plain text, no animation in gray-box.

Coverage tabs: WDW / Disneyland / Both filter the visible restaurant tags
  in-place. Static tab appearance in wireframe; JavaScript toggle in production.

Second CTA button: Smooth-scroll anchor to #alert-setup-form on click.
  No duplicate form in production — anchor approach preferred.

No dynamic interactions in the gray-box wireframe. All interactivity described
above is for production reference only.
```

---

## Section 10: Content Direction

```
OVERALL TONE: Warm, practical, reassuring. Specific to Disney dining problem.
  Language of a knowledgeable friend who's been through the 60-day dining
  window frustration and found a reliable solution. Never cutesy or
  magic-themed first. Direct about what Pixiedining does (monitor and alert)
  and does not do (book, guarantee, log in).

SECTION-BY-SECTION:

Hero headline: High urgency + empathy. "Stop Refreshing." addresses the behavior.
  "We'll Catch That Table the Second It Opens" states the outcome. Not
  "Disney dining alerts" (generic) or "Never miss a cancellation" (implies
  guaranteed outcome). ~9 words, direct imperative. Emotional + functional.

Hero subhead: Mechanism + handoff in 2 sentences, ~40 words.
  "Disney dining reservations fill in seconds and return unpredictably.
  Pixiedining monitors the official availability feed and sends a real-time
  alert the moment a slot matching your criteria opens — then you book it
  directly on Disney.com." Active voice throughout. No magic language.

No-login badge: Terse and factual. "🔒 No Disney login required."
  The absence of credential request is the trust signal — do not soften it
  into "we protect your credentials" (implies credentials are collected).

Official handoff: "↗ You book on Disney.com after the alert fires."
  Active subject is the user. "After the alert fires" is specific about timing.

Alert volume: Specific number + latency. "47,000+ alerts sent · avg. 4 min
  latency." Not "thousands of happy users" (vague) or "near-instant" (untested).

How-it-works copy: 4 steps, label + 1-sentence explanation.
  1. "Set your criteria — Pick your restaurant, trip dates, party size,
     and notification channel."
  2. "We monitor 24/7 — Pixiedining checks Disney's availability feed
     continuously. No refreshing required."
  3. "Get alerted instantly — Email, push, or SMS the moment a matching
     slot appears."
  4. "Book on Disney.com — Click the link in your alert and complete the
     reservation on Disney's official site."
  Step 4 is the critical phrase — it disambiguates Pixiedining's scope.

Safety panels: Factual, not defensive. Avoid "don't worry" framing.
  Panel 1: "Pixiedining monitors public dining availability data. We never
  ask for, store, or use your Disney account credentials."
  Panel 2: "When a matching slot opens, we send you a direct link. You
  complete the booking on Disney's official reservation system — the same
  site you'd use without us."

Sample alert: Realistic content — specific restaurant, date, time, party size,
  urgency, Disney.com link. Format mirrors actual push notification content.
  Not "you have a new alert" — the actual alert text.

Testimonials: 2 short. Attribution: first name + last initial + context
  (trip month/year or AP status). Focus on outcome, not emotion.
  Avoid "amazing service" or "life-changing."

Coverage: Lead with most-wanted restaurants by full name. Include quantity:
  "+40 more across both parks." No Disney logos or trademark visual elements.

Pricing — Free column: Frame what's included without apologizing for limits.
  "Enough for most single-trip planners." Do not undersell it.

Pricing — Pro column: Lead with biggest differentiators per audience.
  Segment A: unlimited restaurants (for a big trip with multiple must-eats).
  Segment B: SMS, 2× faster polling. Price prominent. Annual savings specific.

Expert card: Technical specifics welcome here. "Polling every 60 seconds
  on Pro vs. 3 minutes on standard. SMS via Twilio. Push via web and app.
  Coverage includes all signature restaurants at Walt Disney World and
  Disneyland."

Agent card: Professional, not salesy. "Managing Disney dining for multiple
  client families? Ask about our Travel Agent plan."

Footer disclaimer: "Pixiedining is an independent monitoring service and is
  not affiliated with, endorsed by, or connected to The Walt Disney Company
  or its affiliates."
```

---

## Section 11: Visual Acceptance Spec

### 11A: Viewports & Scenarios

```
VIEWPORTS:
- Desktop: 1440x900
- Tablet: 768x1024
- Mobile: 390x844
```

### 11B: First Viewport Composition

```
FIRST VIEWPORT (desktop, 1440x900):
- Hero headline visible before scroll.
- Hero subhead visible before scroll.
- All 4 alert setup form fields visible before scroll.
- Primary CTA button visible and fully rendered before scroll.
- No-login badge (#no-login-trust) visible before scroll.
- Official handoff note (#official-handoff) visible before scroll.
- Alert volume stat visible before scroll.
- How-it-works section must NOT be visible before scroll.
- Hero must not appear sparse — headline, subhead, trust trio, and form
  fill the viewport with comfortable density.
- Next section peeks by a small amount at default 1440x900.

FIRST VIEWPORT (mobile, 390x844):
- Hero headline visible before scroll.
- No-login badge visible before scroll (compact pill form).
- Official handoff note visible before scroll (compact pill form).
- Alert setup form — at minimum the first 2 fields and CTA button — visible
  before scroll. All 4 fields preferred.
- Free-tier annotation visible before scroll.
- Hero subhead: hidden on mobile (data-mobile="hide").
- Alert volume stat visible below form or at bottom of first viewport.
- No pricing or Pro content in mobile first viewport.
```

### 11C: Layout Constraints

```
LAYOUT:
- Desktop hero: 2-column CSS grid; left content column ~55% width; right
  form card ~45% width; aligned at top.
- Left column content order: headline (dominant) → subhead → trust trio.
- Right column content: form card only (bordered surface, white/surface bg).
- Tablet: hero collapses to 1-column; trust trio between subhead and form.
- Mobile: 1-column; subhead hidden; trust badges as horizontal row before form.
- Alert setup form owns its entire right panel — no other primary content
  competes in the right column.
- Pricing: 2-column side by side always; Pro column gets slightly stronger
  border weight (border-strong) to signal preferred tier without color.
- Safety section: 2-column panels on desktop and tablet; stacked on mobile.
- Form fields must not appear cramped — 48px minimum effective height per field
  on mobile; comfortable padding on desktop.
- Primary CTA owns the largest dark-fill element on the page. No other element
  at this visual weight before the pricing section.
```

### 11D: Density & Rhythm

```
DENSITY MODE: low-density marketing with functional form zone

Hero section: generous section padding; form card has moderate internal padding
  (comfortable but not cramped); trust trio items compact (no large gaps between them).

How it works: moderate section padding; step cards have moderate internal
  padding; horizontal flow with consistent card heights.

Safety section: moderate section padding; panels have comfortable internal
  padding — text must breathe; not dense.

Proof section: moderate section padding; stats strip is compact (numbers
  larger than labels); phone mockup is centered, isolated by whitespace.

Coverage section: moderate section padding; tag cloud is compact (small pills
  with tight gaps); tabs above have comfortable padding.

Pricing section: generous section padding; feature lists within cards are
  compact (tight line spacing acceptable — it's a list); CTA buttons at bottom
  of each card, aligned.

Expert/Agent section: compact section padding; these are supplementary cards
  and should feel lower-weight than pricing.

Second CTA: generous isolation — significant whitespace above and below —
  creates a "pause before exit" moment.

Major section separations: generous (equivalent to var(--gap-xl) on desktop;
  var(--gap-lg) on tablet; var(--gap-md) on mobile).

Form fields: minimum 48px effective height on all viewports for touch targets.
```

### 11E: Required Stable Selectors

```
REQUIRED SELECTORS:
- #page-root (root div)
- #primary-section (hero section)
- #primary-action (primary CTA button: "Start My Free Alert →")
- #alert-setup-form (free alert setup form element)
- #no-login-trust (no-login badge in hero trust trio)
- #official-handoff (official handoff note in hero trust trio)
- #how-it-works (how it works section)
- #safety-section (safety deep-dive section)
- #sample-alert (sample alert phone mockup card)
- #proof-stats (proof section wrapper)
- #coverage-section (restaurant coverage section)
- #pricing-section (pricing comparison section)
- #agent-inquiry (travel agent inquiry card)
- #second-cta (second CTA section)
```

### 11F: Non-Negotiables

1. Alert setup form (#alert-setup-form) must be in the hero section, visible before first scroll on desktop and largely visible on mobile.
2. No-login badge (#no-login-trust) must be co-located in the hero viewport with the form — not in a safety section below the fold only.
3. Primary CTA must use an active verb phrase: "Start My Free Alert" or equivalent. Not "Sign Up", "Get Started", or "Try Free".
4. Pricing section must show specific prices: $14.99/mo and $99/yr. No "contact for pricing."
5. Pro benefits must name all 5 differentiators: unlimited restaurants, SMS notifications, 2× faster polling, multi-park bundles, auto-resume after alert.
6. "Book on Disney.com" or equivalent must appear in: (a) the hero trust trio or subhead, (b) how-it-works step 4, and (c) the safety handoff panel.
7. Footer must include non-affiliation disclaimer naming The Walt Disney Company.
8. Agent inquiry card must not appear in the primary hero or how-it-works zone.
9. No guarantee language anywhere: no "get your table", "guaranteed reservation", "we'll book it", "secure your spot."
10. Coverage section must name at least 5 Disney restaurants by their full official names.

### 11G: Allowed Variation

- Exact alert volume number may be updated to reflect real data (any number >10,000).
- Exact latency claim may be updated to match real P50 latency with evidence.
- Restaurant dropdown order may be alphabetical or demand-ranked.
- Testimonial attributions may use real user data (first name + last initial + context required).
- Second CTA may be a smooth-scroll anchor to #alert-setup-form or a condensed form.
- Payment logos may reflect actual processors used.
- Expert polling cadence numbers (60s vs 3 min) may be updated to match actual implementation.
- Trust trio icons (🔒, ↗, ✓) may be replaced with custom icon components in production.

### 11H: Not Allowed

- Moving the alert setup form below the hero section or below the fold.
- Replacing the 4-field hero form with a single-email capture (removes the trust signal of benign inputs).
- Making Pro CTA the visually dominant action before free option is seen.
- Using carousels or auto-advancing sliders for any content.
- Using Disney trademark visual elements: castle silhouette, Mickey ears, official Disney color palette.
- Labeling any plan as "Enterprise" or "Business" in the primary pricing comparison.
- Using hover-only states to reveal trust content — trust must be readable without interaction.
- Hiding the no-login badge (#no-login-trust) on any viewport.
- Copy implying Disney.com integration, API access to Disney's booking system, or official partnership status.
- Removing the non-affiliation footer disclaimer.

---

## Section 12: HTML Wireframe Artifact

```
HTML WIREFRAME ARTIFACT:
  File: wireframe.trust-first-free-alert-strategy.html
  Components: 27 (matching Section 6 inventory)
  Selectors: 14 (matching Section 11E required selectors)
  Status: written
```
