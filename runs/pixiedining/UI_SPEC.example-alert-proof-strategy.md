# Pixiedining — UI Architecture Spec
# Strategy: example-alert-proof-strategy

---

## Section 1: Page Classification

```
TYPE: marketing
```

Dominant mode: consumer conversion landing page. A single-page marketing surface tasked with establishing trust, demonstrating product value through a concrete sample alert, and routing three audience segments toward their optimal next action — free alert signup (primary), Pro subscription (secondary), travel agent inquiry (tertiary). No internal tool patterns. No hybrid mode.

---

## Section 2: Intake Summary

```
PURPOSE: Convert visitors into paying users for two concrete outcomes —
  (a) free signups for a single-restaurant alert during one upcoming trip,
  (b) paid Pro subscriptions ($14.99/mo or $99/yr) for unlimited restaurants,
      multi-park bundles, push + SMS notifications, faster polling cadence,
      and auto-resume. The site must establish credibility quickly because
      users are skeptical of any third-party that touches Disney's reservation
      system, and emotionally invested because the trip is often once-a-year
      or once-in-a-lifetime.

AUDIENCE:
  Segment A — One-trip family planner: Parent organizing a 5-10 day Disney
    vacation. Knows the 60-day window exists. Has tried refreshing the Disney
    app. Decides in under two minutes. Trust signals close the gap. Signs up
    free first, upgrades only after the free alert proves legitimacy.

  Segment B — Disney superfan / Annual Passholder: Expert. Already knows
    MouseDining, DVC Reservation Finder, Touring Plans. Cares about polling
    cadence, coverage breadth, alert latency, notification channels. Will pay
    annual upfront if convinced of clear advantage.

  Segment C — Travel agent / planner: Expert. Needs reliability and ability
    to monitor multiple simultaneous client trips. Will inquire via contact
    path before paying.

CONTEXT: Standalone marketing landing page, root of pixiedining.com.
  Entry: paid search ("disney dining reservation finder", "be our guest
    cancellation alert"), Reddit r/WaltDisneyWorld referrals, TikTok discovery.
  Exit: free alert signup flow (primary), Stripe Pro checkout (secondary),
    travel agent contact/inquiry form (tertiary).
  User journey stage: SELLING. Pre-purchase. Trust establishment and emotional
    reassurance are the primary blockers.

KEY ACTIONS:
  1. PRIMARY   — Start a free single-restaurant alert
                 (enter trip dates + party size + restaurant → email/push)
  2. SECONDARY — Upgrade to Pro for unlimited restaurants, SMS, faster polling
  3. TERTIARY  — See a sample alert / how it works / coverage list;
                 Travel agent inquiry path for Segment C
```

---

## Section 3: Flow Map

```
FLOW: Single page (standalone)

Entry:  ──────────────────────────────────────────────────────────
        Paid search → pixiedining.com (root)
        Reddit r/WaltDisneyWorld referral → pixiedining.com
        TikTok discovery → pixiedining.com

Exits:
  [PRIMARY]    Free alert setup flow ─────► email / push criteria entry
  [SECONDARY]  Stripe Pro checkout ──────► $14.99/mo or $99/yr
  [TERTIARY]   Travel agent contact form ► agency inquiry
  [PASSIVE]    Coverage list anchor ──────► in-page scroll
               How it works anchor ──────► in-page scroll
```

---

## Section 4: Decision Map

### 4A: User Decision Sequence

```
PAGE LEVEL:
  User's first question:
    "Will this actually watch Disney dining for MY restaurant, dates, and
     party size — and tell me the instant something opens up?"
  Resolved by:
    Hero headline (product category + specific promise) +
    Sample alert notification (concrete proof of what they'll receive) +
    Free alert CTA (immediate low-risk action)

  User's second question:
    "Is this safe? Do they need my Disney login?"
  Resolved by:
    No-login trust badge co-located with primary CTA +
    Official handoff note in hero subhead

SECTION LEVEL:
  Scanning for: "What do I actually get when this finds something?"
    → Resolved by sample alert mockup in hero (SMS format, real restaurant,
       real timestamp)

  Scanning for: "What notification channels are available?"
    → Resolved by alert channel showcase (SMS / Email / Push) below hero

  Scanning for: "Does it cover my restaurant and park?"
    → Resolved by named coverage list (Be Our Guest, Cinderella's Royal
       Table, Space 220, etc.)

  Scanning for: "How fast will the alert arrive?"
    → Resolved by stats bar (< 60 sec Pro typical) and how-it-works step 2
       (45-sec polling cadence)

  Scanning for: "Is this better than what I'm already doing?"
    → Resolved by pricing tier table showing Free vs Pro specifics and
       contrast with manual refresh

COMPONENT LEVEL:
  Click-vs-skip on primary CTA:
    "Is this actually free? Do I have to give anything risky?"
    Resolved by: "No credit card · No Disney login required" sub-label
    directly below the CTA button

  Click-vs-skip on sample alert:
    "Is this a real notification or a marketing prop?"
    Resolved by: Realistic SMS format (short code 33210), specific restaurant
    (Be Our Guest), specific date/time (Feb 28 · 6:30 PM), party size (4),
    timestamp showing 47-second latency, caveat line distinguishing it from
    a fake stock mockup

  Click-vs-skip on Pro pricing:
    "Why pay if free works?"
    Resolved by: Feature-differentiated tier table — SMS vs email-only,
    45-sec vs 3-min polling, unlimited vs 1 restaurant, auto-resume included
```

**Segment differences:**
- Segment A (family planner): Needs trust and simplicity first. Sample alert resolves "is this real?" before they commit to reading further.
- Segment B (superfan): Needs performance evidence. Alert timestamp, polling cadence numbers, and Pro feature specifics serve them in the second and third viewport.
- Segment C (agent): Needs a distinct multi-client path. Travel agent section below pricing handles this without polluting the primary conversion flow.

### 4B: Asset and Evidence Inference

```
PRODUCT/OUTPUT ASSETS:
  - The alert notification itself: SMS, email, or push containing
    restaurant name, available date/time, party size match, and a
    direct link to Disney's official reservation system
  - Saved criteria management (implied by "unlimited restaurants" Pro)
  - Auto-resume after a fired alert (Pro feature; differentiator vs
    some competitors that require manual re-setup)

PROOF ASSETS:
  - Concrete sample alert mockup — the strategy centerpiece
    SMS format: short code, restaurant, date/time, party size, link,
    timestamp showing 47-second post-cancellation latency
  - Alert volume stat: "847,000+ alerts sent since launch"
  - Average latency claim: "Pro alerts typically under 60 seconds"
    (mechanism-based: 45-second polling cadence, not a vague superlative)
  - Restaurant coverage list: named high-demand venues, 140+ total
  - User success stories: 3 realistic, trip-contextualized quotes
  - Payment processor logos and 30-day refund guarantee

CONVERSION ASSETS:
  - Free single-restaurant alert — no credit card required
  - Risk reducer: "No Disney login, ever. We monitor availability,
    you book on Disney's site."
  - Pro price: $14.99/mo or $99/yr (~34% annual saving)
  - 30-day money-back guarantee
  - Explicit "no guaranteed reservation" framing (protects trust;
    avoids chargeback and expectation risk)

NAVIGATION / SELF-SELECTION ASSETS:
  - Hero: sample alert and free CTA serve both Segment A and B
  - How-it-works section: mental model for Segment A
  - Coverage list + polling cadence: validation data for Segment B
  - Travel agent section: clearly segmented inquiry for Segment C

ACTION VS SIGNAL CLASSIFICATION:
  Actions:
    - Start free alert (primary CTA button)
    - Upgrade to Pro / Go Pro (secondary CTA in pricing)
    - Travel agent inquiry submit (tertiary)
    - FAQ accordion expand (engagement action)

  Signals (help user believe before acting):
    - Sample alert notification mockup (comprehension + proof)
    - No-login trust badge (safety)
    - Official handoff note (accuracy / boundary)
    - Alert volume stat (scale proof)
    - Latency stat (speed proof — mechanism-grounded)
    - Coverage list (scope proof)
    - Testimonials (social proof)
    - Payment / refund logos (credibility)
    - How-it-works 3-step sequence (comprehension)
    - "No guaranteed reservation" honest FAQ (trust through honesty)
```

### 4C: Strategy Defense (Search Mode)

```
ASSIGNED STRATEGY: example-alert-proof-strategy

WHY THIS STRATEGY FITS THIS INTAKE:
The diagnosis identifies skepticism ("is this real?") and uncertainty
("what will I actually receive?") as the primary blockers. Abstract
product descriptions cannot resolve these doubts — both Segment A and
Segment B need to SEE a concrete artifact of the product working. For
Segment A (family planners), a real-format SMS alert for Be Our Guest
at 6:30 PM with a 47-second latency timestamp answers the question
before they commit. For Segment B (superfans evaluating against
MouseDining and DVC Reservation Finder), the same artifact enables
immediate product evaluation without requiring them to sign up first.
The diagnosis explicitly lists "proof of usefulness" and "mobile
confidence" as this strategy's optimization targets — the sample alert
is inherently mobile-legible (it IS a mobile notification format) and
provides immediate proof without lengthy text explanation.

LOCAL OPTIMUM THIS STRATEGY RISKS:
The staged or vague sample — a visually polished but obviously fake-
looking notification with placeholder text ("Restaurant Name",
"Your Date Here", "Available!") that reads as a marketing prop rather
than real product output. This is the shallow version: the visual
structure of a proof element without the specific, believable detail
that actually builds trust. A too-perfect, too-generic alert mockup
can weaken credibility more than no alert at all.

HOW THIS DESIGN AVOIDS THAT LOCAL OPTIMUM:
The sample alert uses a named, high-demand, recognizable restaurant
(Be Our Guest), a specific plausible date/time (February 28, 6:30 PM),
a real SMS short-code format (33210), a party size (4), a precise
latency timestamp (47 seconds), and an action link that names the
destination ("Reserve Now on DisneyWorld.com"). A caveat line
("Example alert. Details changed for illustration.") distinguishes it
from a claim of guaranteed output while preserving its demonstrative
function. The channel showcase below the hero shows three distinct
notification formats, reinforcing that the product delivers across
channels rather than showing a single cherry-picked example.

REFERENCE CALIBRATION:
No external reference files injected. General-knowledge calibration:
strong consumer utility SaaS pages with proof centerpieces (Loom's
early homepage showing the recorded video, Calendly showing the
booking interface, Notion showing a real document) share these
structural moves — the actual product output is visible before signup,
explanation flows from what you see rather than what we claim, and the
free-entry action is paired with the proof rather than sequenced after
a long selling section. This design follows that structural family.
It deliberately diverges from travel-inspiration landing pages
(Airbnb, GetYourGuide style) that lead with mood imagery and defer
product evidence — that register would delay trust resolution for a
skeptical third-party-tool audience.

STRATEGIC DIAGNOSIS MAPPING:
  - trust_burden: high → sample alert in first viewport as primary proof;
    no-login badge co-located with CTA; FAQ entry explicitly denies
    Disney account access
  - functional_immediacy: high → free alert CTA visible in hero before
    scroll; sub-label removes credit card and login barriers; no long
    explanation gate before action
  - audience_sophistication: mixed → sample alert serves both segments
    (comprehension for A, evaluation for B); polling cadence and
    coverage counts serve Segment B in second/third viewport without
    cluttering the hero
  - product_complexity: moderate → 3-step how-it-works section explains
    monitoring → alert → official handoff sequence without front-loading
    complexity in the hero
  - Audience need (what_they_fear): giving Disney login to a third party
    → no-login badge in hero, detailed "never access your account" in
    FAQ accordion
  - Audience need (what_they_need_before_action): visible proof such as
    sample alerts → sample alert is the structural centerpiece of the
    first viewport; coverage list and stats bar are second-viewport proof
  - Design directive (proof_strategy): use early, concrete proof →
    sample alert in hero right panel; channel showcase, coverage, and
    stats bar in second viewport before pricing

FIRST VIEWPORT OBLIGATION:
  The diagnosis states: "Within seconds, visitors must understand that
  Pixiedining watches Disney dining cancellations, alerts them in real
  time, never needs their Disney login, and lets them start one free
  alert immediately."

  First-fold components satisfying this on desktop (1440x900):
    - hero-headline: names product category and Disney dining problem
    - sample-alert-notification: right panel — SMS format alert for Be
      Our Guest, Feb 28, 47-sec latency timestamp
    - free-alert-cta: "Start Watching Free" with no-credit-card sub-label
    - no-login-trust-badge: pill badge co-located with CTA
    - hero-subhead: "We monitor cancellations. You book on Disney's
      official site. We never log into your account."
    - Stats bar peeks below the fold (visual proof of scale)

  First-fold components satisfying this on mobile (390px):
    - hero-headline (full-width, stacked)
    - free-alert-cta (full-width, thumb-sized, ≥48px height)
    - No-login inline trust line directly below button
    - Sample alert notification card beginning to appear at viewport
      bottom (signals proof content below)

HARD FLOOR COVERAGE:
  hf_free_alert_visible → #primary-action in hero, above fold on all
    viewports; "Start Watching Free" label; "No credit card · No Disney
    login required" sub-text removes stated friction barriers

  hf_no_login_trust → #no-login-badge pill badge co-located with
    #primary-action in hero; also addressed explicitly in first FAQ
    entry ("Does Pixiedining ever log into my Disney account?")

  hf_no_guaranteed_booking → hero-subhead uses "alert you" not "book
    for you"; CTA is "Start Watching Free" not "Get Your Table"; FAQ
    entry "Will this guarantee I get the reservation?" answers "No"
    with explicit explanation; footer disclaimer states monitoring only

  hf_official_handoff → hero-subhead states "You book on Disney's
    official site"; sample alert mockup link reads "Reserve Now on
    DisneyWorld.com"; how-it-works step 3 is explicitly "You book on
    Disney's site (not through us)"

  hf_segment_self_selection → Hero + alert showcase serve Segments A
    and B jointly; coverage list and polling cadence data in coverage
    and stats sections serve Segment B's expert validation needs;
    travel-agent-section below pricing serves Segment C with a distinct,
    segmented inquiry path

  hf_mobile_first_task → Sample alert card compacts to full-width
    stacked card on mobile; CTA is full-width thumb button with ≥48px
    height; trust line is one sentence directly below CTA; pricing
    stacks vertically with both tiers fully readable

  hf_pro_value_specificity → pricing-table explicitly lists: unlimited
    restaurants, SMS + push + email, 45-second check interval (vs 3-min
    Free), multi-park bundles, auto-resume after alert fires, priority
    alert delivery; prices shown as $14.99/mo or $99/yr

ANTI-PATTERN AVOIDANCE:
  ap_magic_before_task → First viewport opens with product description
    headline ("Get alerted the instant that Disney dining table opens
    up again") not vacation mood or sparkle storytelling; sample alert
    is concrete utility output, not a lifestyle image

  ap_disney_clone_branding → Visual identity is Pixiedining's own;
    no castle imagery, no official Disney typeface imitation; restaurant
    names used factually in coverage context (not as brand signals);
    footer carries explicit non-affiliation disclaimer

  ap_unsupported_speed_claims → Polling cadence is specific and
    mechanism-grounded: "Pro checks every 45 seconds, Free every 3
    minutes"; sample alert shows "47 sec after availability appeared"
    as evidence, not assertion; no "fastest" superlative used

  ap_hidden_safety_model → No-login trust badge is in the hero,
    co-located with the primary CTA; not deferred to FAQ only; hero
    subhead states "We never log into your account" inline

  ap_generic_saas_grid → Coverage section names specific restaurants
    (Be Our Guest, Cinderella's Royal Table, Space 220, etc.); proof
    stats reference Disney-specific context; how-it-works names the
    60-day window mechanism; no generic "fast, easy, reliable" triad

  ap_pro_overpush → Pro upgrade is below the hero CTA, coverage list,
    testimonials, and stats; free CTA is visually dominant throughout
    pricing section; Pro CTA size is secondary to hero free CTA

  ap_agent_path_confusion → Travel agent section is a dedicated
    tertiary section below FAQ, not competing with hero or proof content

  ap_guarantee_language → All copy uses "alert," "notify," "watch,"
    "monitor" — never "book," "guarantee," "secure," "reserve for you,"
    "get your table"
```

### 4D: Component Justification

| Component | User Lens | Business Lens | Verdict |
|---|---|---|---|
| nav-bar | Orientation, brand credibility, page anchors | Soft navigation to pricing and coverage for scanners | Include — minimal: logo + 3 nav links + sign-in |
| hero-headline | Answers "what is this?" in under 5 sec | Category claim + search-intent match | Include — specific product language, not mood copy |
| hero-subhead | Sets honest expectations; explains handoff model | Reduces chargeback risk; frames product accurately | Include — "We monitor. You book on Disney's site." |
| free-alert-cta | Primary low-risk action path | Primary conversion event | Include — dominant, full-width on mobile |
| no-login-trust-badge | Resolves stated #1 objection before action | Reduces form abandonment from security fear | Include — co-located with CTA, above fold |
| official-handoff-note | Clarifies role boundary; removes confusion | Protects against "it didn't book for me" complaints | Include — in hero subhead + how-it-works step 3 |
| sample-alert-notification | Makes product tangible; resolves "is this real?" | The strategy centerpiece; reduces drop-off pre-signup | Include — hero right panel; specific, believable |
| alert-channel-showcase | Shows SMS/email/push formats; validates Pro channels | Demonstrates multi-channel Pro value; supports upgrade | Include — 3-card section below hero |
| how-it-works-steps | Resolves "how does this actually work?" anxiety | Builds mental model that leads to confident signup | Include — 3 steps: Set → Monitor → Book |
| coverage-headline | Signals domain knowledge about Disney dining | Creates search-intent resonance | Include — specific phrasing, not generic |
| coverage-list | Segment B validates their restaurants are supported | Justifies Pro for multi-restaurant monitoring | Include — named high-demand venues |
| stats-bar | Proof of scale and speed | Product-level social proof that converts wavering users | Include — 3 stats with honest framing |
| testimonials | Peer validation from real trip contexts | Social proof that closes wavering Segment A | Include — 3 realistic, trip-contextualized |
| pricing-headline | Frames free-first upgrade narrative | Sets expectations before commitment | Include — "Start free. Upgrade when you need more." |
| pricing-table | Enables free-vs-Pro comparison | Drives secondary paid conversion | Include — explicit feature differentiation |
| pro-cta | Secondary conversion action | Revenue-generating upgrade | Include — visually secondary to hero free CTA |
| pro-risk-reducer | Reduces Pro payment anxiety | Increases Pro conversion rate | Include — "30-day refund · Cancel anytime" |
| faq-accordion | Resolves detailed trust and safety questions | Reduces support load; addresses objections at scale | Include — 6 targeted entries, not generic |
| travel-agent-section | Validates Segment C relevance | Opens agency revenue channel | Include — tertiary, below pricing |
| footer | Contact, legal, disclaimers, navigation | Trust signal; non-affiliation disclaimer required | Include — with explicit Disney disclaimer |
| footer-disclaimer | Clarifies third-party status | Legal protection; trust through transparency | Include — explicit, in footer |

**Excluded components:**

| Excluded | Reason |
|---|---|
| Autoplay video / hero demo | Adds page weight, delays CTA, slows mobile load; not justified for 1-3 min session |
| Competitor comparison table | Segment B wants this but it adds page length and dilutes Segment A's fast-decision path |
| Inline pricing FAQ | FAQ accordion consolidates trust questions; inline pricing FAQ would fragment the section |

### 4E: Tension Map

```
TENSION: Proving alert speed vs. avoiding unsupported speed claims
  Business pull: Latency differentiation is the Pro selling point for
    expert users comparing against MouseDining and Touring Plans.
  User pull: Expert users distrust vague "fastest" claims; they've
    seen those before. Segment A doesn't care about the number, only
    whether it's fast enough to matter.
  Resolution: State the mechanism and specific cadence ("Pro checks
    every 45 seconds, Free every 3 minutes") not a superlative. The
    sample alert timestamp ("47 sec after availability appeared") implies
    speed through concrete evidence, not assertion.

TENSION: Sample alert specificity vs. risk of appearing staged
  Business pull: A compelling, realistic alert example increases product
    comprehension and converts skeptical visitors.
  User pull: A too-perfect, obviously fake sample weakens credibility
    more than no sample at all for users who distrust SaaS marketing.
  Resolution: Use a real-format SMS short code (33210), a recognizable
    high-demand restaurant (Be Our Guest), a specific plausible
    date/time (Feb 28, 6:30 PM), and a precise latency timestamp.
    Include a caveat: "Example alert. Details changed for illustration."
    Avoid stock-photo overlays or AI-generated perfection.

TENSION: Serving three segments without fragmenting the primary flow
  Business pull: Agency revenue matters; expert users need comparison
    data and coverage proof to pay annual Pro.
  User pull: Family planners need a clean, uncluttered path to start
    their free alert without wading through expert or B2B content.
  Resolution: Hero and first three sections serve Segments A and B
    jointly (sample alert is universal proof). Segment B expert signals
    (polling cadence, coverage breadth) appear in the second/third
    viewport as depth, not gatekeepers. Segment C gets its own clearly
    labeled section below pricing — visible to those who scroll, ignored
    by those who convert early.

TENSION: Trust establishment vs. CTA timing
  Business pull: High functional_immediacy requires the CTA to be
    immediately visible.
  User pull: Segment A won't click until they trust; placing the CTA
    before trust resolves may mean it gets ignored.
  Resolution: The sample alert IS the trust signal, and it is
    co-located with the CTA in the hero. Trust is not a separate section
    before action — it is the frame around the action. The "No Disney
    login · No credit card" sub-label beneath the CTA button functions
    as a micro-trust element directly attached to the action.

TENSION: Honest "no guarantee" language vs. emotional trip anxiety hook
  Business pull: Emotional hook on trip stakes drives urgency.
  User pull: Overclaiming reservation outcomes creates legal risk and
    destroys trust when expectations fail to be met.
  Resolution: Headline acknowledges the emotional stakes ("Get alerted
    the instant that Disney dining table opens up again") but uses
    "alerted," not "booked." CTA is "Start Watching Free" not "Get Your
    Table." Every proof claim describes what Pixiedining does (monitors,
    alerts) not what users will receive (a reservation).
```

---

## Section 5: Visual Hierarchy Map

```
PRIMARY (dominant visual weight):
  1. hero-headline — The page's anchor statement. Largest text on the
     page. Must be read before any other element. Establishes product
     category and core promise immediately.
  2. sample-alert-notification — The strategy centerpiece. Second only
     to the headline. Occupies the hero right panel; its visual weight
     must exceed every other element in the hero except the headline.
     This is the proof that earns the conversion.
  3. free-alert-cta — Primary action. High-contrast fill button, full-
     width on mobile. Visually distinct from all other buttons on the page.
  4. no-login-trust-badge — Adjacent to CTA. Small but high-contrast.
     Resolves the primary objection at the moment of action decision.

SECONDARY (supporting):
  5. hero-subhead — Clarifies the handoff model. Readable but not
     competing with headline.
  6. stats-bar — Three metrics. Compact proof of scale and speed.
     Secondary weight; reinforces hero proof.
  7. how-it-works-steps — Structural comprehension. Three-step flow.
     Moderate visual weight; builds confidence.
  8. coverage-list — Named restaurants. Scannable grid. Validates
     domain specificity for both Segment A and B.
  9. testimonials — Three cards. Social proof. Moderate weight;
     reinforces credibility before pricing.
  10. pricing-table — Free vs Pro comparison. Moderate-high weight.
      The upgrade decision section.
  11. pro-cta — Secondary action button. Visually secondary to hero
      free CTA at every scroll position.
  12. alert-channel-showcase — Three notification channel cards.
      Medium weight; supports sample alert and demonstrates Pro value.
  13. faq-accordion — Trust resolution content. Medium weight when
      collapsed; expanded items are primary content for that user.
  14. pro-risk-reducer — "30-day refund" near Pro CTA. Small but
      important for Pro conversion.

TERTIARY (present but recessive):
  15. nav-bar — Orientation and brand only. Must not compete with
      content at any scroll position.
  16. official-handoff-note — Inline with hero; important accuracy
      signal but secondary to the headline.
  17. coverage-headline — Section header. Recessive label, not action.
  18. pricing-headline — Section header. Frames the tier comparison.
  19. travel-agent-section — Clearly bounded; tertiary visual weight.
      Below pricing, not visible to users who convert early.
  20. footer — Legal, disclaimers, contact. Fully recessive.
  21. footer-disclaimer — Required legal text; smallest text on page.
```

---

## Section 6: Component Inventory

| Component | Class | Purpose | Content Direction |
|---|---|---|---|
| nav-bar | T | Brand anchor, page orientation, sign-in | Logo + "How it Works" / "Coverage" / "Pricing" + "Sign In" link |
| hero-headline | P | Product category + core promise in one statement | 10-14 words; action-oriented; names Disney dining context |
| hero-subhead | S | Explain handoff model and set honest expectations | 15-20 words; "We monitor cancellations. You book on Disney's official site. No login required." |
| free-alert-cta | P | Drive primary free signup conversion | "Start Watching Free"; sub-label: "No credit card · No Disney login required" |
| no-login-trust-badge | P | Resolve stated #1 trust blocker co-located with CTA | Pill badge: "We never access your Disney account — ever" |
| official-handoff-note | S | Clarify Pixiedining notifies; Disney books | One sentence below trust badge; "You tap the link and reserve through Disney's official site directly" |
| sample-alert-notification | P | Make product output tangible; prove usefulness | Realistic SMS mockup: Be Our Guest, Feb 28, 6:30 PM, party 4, short code 33210, timestamp "47 sec after availability appeared"; caveat line |
| alert-channel-showcase | S | Show SMS / email / push notification formats | 3 cards: SMS (PRO), Email (FREE), Push (PRO); each with realistic channel-format mockup; badge labels |
| how-it-works-steps | S | Explain monitoring → alert → handoff flow | 3 steps: "Set your criteria" → "We monitor every 45 sec" → "You book on Disney's site"; step 3 explicit about "not through us" |
| coverage-headline | S | Introduce coverage with domain-specific phrasing | "Works with the restaurants you actually want"; signals expert knowledge |
| coverage-list | S | Named high-demand venues validating scope | Grid: Be Our Guest, Cinderella's Royal Table, Space 220, Storybook Dining, Topolino's Terrace, California Grill, Oga's Cantina, Sci-Fi Dine-In, Chef Mickey's, Le Cellier, + 127 more |
| stats-bar | S | Product-level proof: scale, speed, scope | 3 stats: "847,000+ alerts sent" / "< 60 sec Pro latency (typical)" / "140+ restaurants across WDW & DLR" |
| testimonials | S | Social proof from real trip contexts | 3 cards; first-person; name + month/year; realistic specific outcome (restaurant + trip context) |
| pricing-headline | S | Frame the free-first narrative | "Start free. Upgrade when you need more." |
| pricing-table | S | Free vs Pro feature comparison; upgrade decision | 2-col: Free (1 restaurant, email, 3-min poll) vs Pro ($14.99/mo or $99/yr; unlimited, SMS+push+email, 45-sec, multi-park, auto-resume) |
| pro-cta | S | Secondary paid conversion action | "Go Pro"; visually secondary to hero free CTA |
| pro-risk-reducer | S | Reduce Pro payment anxiety | "30-day money-back guarantee · Cancel anytime" near Pro CTA |
| faq-accordion | S | Address trust, safety, and how-it-works questions | 6 entries: no-login model, no guaranteed reservation, alert speed, coverage, refund, what-to-do-when-alerted |
| travel-agent-section | T | Route Segment C to agency inquiry | "Planning Disney dining for multiple clients? Ask about our Agency Plan." + contact button |
| footer | T | Legal, disclaimers, nav, contact | Privacy / Terms / Refund Policy / Contact + copyright |
| footer-disclaimer | T | Explicit Disney non-affiliation statement | "Pixiedining is an independent service and is not affiliated with, authorized by, or connected to The Walt Disney Company..." |

---

## Section 7: ASCII Wireframe

```
┌─────────────────────────────────────────────────────────────────────────┐
│  NAV  [● Pixiedining]    How it Works   Coverage   Pricing   [Sign In]  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────┐  ┌──────────────────────────────┐ │
│  │  HERO — LEFT (55%)              │  │  SAMPLE ALERT MOCKUP  (45%) │ │
│  │                                 │  │                              │ │
│  │  [CATEGORY EYEBROW]             │  │  ┌──────────────────────────┐│ │
│  │  Disney Dining Reservation Alerts│  │  │  SMS · From: 33210       ││ │
│  │                                 │  │  │  Pixiedining Alert        ││ │
│  │  [HEADLINE — P]                 │  │  ├──────────────────────────┤│ │
│  │  Get alerted the instant that   │  │  │  🎉 Be Our Guest —       ││ │
│  │  Disney dining table opens up   │  │  │     Party of 4 AVAILABLE ││ │
│  │  again                          │  │  │                          ││ │
│  │                                 │  │  │  Feb 28  ·  6:30 PM      ││ │
│  │  [SUBHEAD — S]                  │  │  │  Magic Kingdom            ││ │
│  │  We monitor cancellations. You  │  │  ├──────────────────────────┤│ │
│  │  book on Disney's official site.│  │  │  [Reserve Now on         ││ │
│  │  We never log into your account.│  │  │   DisneyWorld.com →]     ││ │
│  │                                 │  │  │  Opens Disney's official  ││ │
│  │  ┌───────────────────────────┐  │  │  │  booking page             ││ │
│  │  │  ★  Start Watching Free  ★│  │  ├──────────────────────────┤│ │
│  │  └───────────────────────────┘  │  │  │ ⏱ 47 sec after          ││ │
│  │  No credit card · No Disney     │  │  │   availability appeared  ││ │
│  │  login required                 │  │  └──────────────────────────┘│ │
│  │                                 │  │                              │ │
│  │  ╰● We never access your Disney │  │  Example alert. Details      │ │
│  │    account — ever              │  │  changed for illustration.   │ │
│  │                                 │  │                              │ │
│  │  ↳ You tap the link and reserve │  │  SMS alerts require Pro.     │ │
│  │    through Disney's official    │  │  Email alerts are free.      │ │
│  │    site directly.               │  └──────────────────────────────┘ │
│  └─────────────────────────────────┘                                   │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ ░░░░░░░░░░░░░░░░░░░░  STATS BAR (section-bg-alt)  ░░░░░░░░░░░░░░░░░░░░ │
│                                                                         │
│     [ 847,000+ ]        |    [ < 60 sec ]      |    [ 140+ ]           │
│     Alerts sent         |  Pro alert latency   |   Restaurants          │
│     since launch        |      (typical)       |  across WDW & DLR     │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│               ALERT CHANNEL SHOWCASE                                    │
│  Get notified your way                                                  │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐     │
│  │ SMS Alert  [PRO] │  │ Email Alert [FREE]│  │ Push Notif [PRO] │     │
│  │ ┌──────────────┐ │  │ ┌──────────────┐ │  │ ┌──────────────┐ │     │
│  │ │From: 33210   │ │  │ │Subject: 🎉   │ │  │ │ Pixiedining  │ │     │
│  │ │Space 220 —   │ │  │ │ CRT is avail │ │  │ │ Topolino's — │ │     │
│  │ │Party 2 avail │ │  │ │Party 3 · Dec │ │  │ │ Party 4 open │ │     │
│  │ │Tap to reserve│ │  │ │Click →       │ │  │ │ Tap to act   │ │     │
│  │ └──────────────┘ │  │ └──────────────┘ │  │ └──────────────┘ │     │
│  │ Delivered in sec  │  │ Included free    │  │ Browser or app   │     │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘     │
├─────────────────────────────────────────────────────────────────────────┤
│ ░░░░░░░░░░░░░░░░░░  HOW IT WORKS (section-bg-alt)  ░░░░░░░░░░░░░░░░░░ │
│                                                                         │
│  How it works                                                           │
│  Three steps. No Disney login needed at any point.                      │
│                                                                         │
│  ┌──────────────┐        ┌──────────────┐        ┌──────────────┐     │
│  │ [ICON]       │        │ [ICON]       │        │ [ICON]       │     │
│  │ STEP 1       │   →    │ STEP 2       │   →    │ STEP 3       │     │
│  │              │        │              │        │              │     │
│  │ Set your     │        │ We monitor   │        │ You book on  │     │
│  │ criteria     │        │ availability │        │ Disney's     │     │
│  │              │        │              │        │ official site│     │
│  │ Restaurant,  │        │ Every 45 sec │        │ (not through │     │
│  │ dates, party │        │ (Pro) or 3   │        │  us)         │     │
│  │ size, channel│        │ min (Free)   │        │              │     │
│  └──────────────┘        └──────────────┘        └──────────────┘     │
├─────────────────────────────────────────────────────────────────────────┤
│                          COVERAGE                                       │
│  Works with the restaurants you actually want                           │
│  140+ restaurants across Walt Disney World and Disneyland Resort        │
│                                                                         │
│  [Walt Disney World ●]  [Disneyland Resort]                             │
│                                                                         │
│  ┌───────────────┐ ┌────────────────┐ ┌───────────┐ ┌──────────────┐  │
│  │ Be Our Guest  │ │ Cinderella's   │ │ Space 220 │ │ Storybook    │  │
│  │               │ │ Royal Table    │ │ Restaurant│ │ Dining       │  │
│  └───────────────┘ └────────────────┘ └───────────┘ └──────────────┘  │
│  ┌───────────────┐ ┌────────────────┐ ┌───────────┐ ┌──────────────┐  │
│  │ Topolino's    │ │ California     │ │ Oga's     │ │ + 127 more   │  │
│  │ Terrace Brkfst│ │ Grill          │ │ Cantina   │ │ restaurants →│  │
│  └───────────────┘ └────────────────┘ └───────────┘ └──────────────┘  │
├─────────────────────────────────────────────────────────────────────────┤
│ ░░░░░░░░░░░░░░░░░░░░  TESTIMONIALS (alt bg)  ░░░░░░░░░░░░░░░░░░░░░░░░ │
│                                                                         │
│  Families who stopped refreshing                                        │
│                                                                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐        │
│  │ "Got Be Our     │  │ "Nabbed CRT for │  │ "3 alerts fired │        │
│  │  Guest for our  │  │  Christmas week.│  │  in 2 days.     │        │
│  │  group of 4 for │  │  My daughter    │  │  Upgraded to    │        │
│  │  Valentine's    │  │  cried."        │  │  annual Pro the │        │
│  │  Day..."        │  │                 │  │  same day."     │        │
│  │  — Sarah K.     │  │  — Lisa M.      │  │  — Matt S.      │        │
│  │    Jan 2025     │  │    Dec 2024     │  │    Mar 2025     │        │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘        │
├─────────────────────────────────────────────────────────────────────────┤
│                           PRICING                                       │
│  Start free. Upgrade when you need more.                                │
│  No credit card required for free plan. Cancel Pro anytime.             │
│                                                                         │
│       ┌─────────────────────────┐  ┌─────────────────────────┐         │
│       │ FREE                    │  │ PRO                ★    │         │
│       │ $0                      │  │ $14.99/mo               │         │
│       │ No credit card needed   │  │ or $99/yr (save 34%)    │         │
│       ├─────────────────────────┤  ├─────────────────────────┤         │
│       │ ✓ 1 restaurant alert    │  │ ✓ Unlimited restaurants  │         │
│       │ ✓ Email notifications   │  │ ✓ SMS + push + email     │         │
│       │ ✓ Check every 3 minutes │  │ ✓ Check every 45 seconds │         │
│       │ ✓ 1 active trip         │  │ ✓ Multi-park bundles     │         │
│       │ — SMS and push alerts   │  │ ✓ Auto-resume after fire │         │
│       │ — Multiple restaurants  │  │ ✓ Priority alert delivery│         │
│       │                         │  │                          │         │
│       │ [Start Free Alert]      │  │ [Go Pro →]               │         │
│       │                         │  │ 30-day refund ·          │         │
│       └─────────────────────────┘  │ Cancel anytime           │         │
│                                    └─────────────────────────┘         │
├─────────────────────────────────────────────────────────────────────────┤
│ ░░░░░░░░░░░░░░░░░░  TRUST FAQ (accordion, alt bg)  ░░░░░░░░░░░░░░░░░░ │
│                                                                         │
│  Common questions                                                       │
│  ──────────────────────────────────────────────────────────────── [+]  │
│  Does Pixiedining ever log into my Disney account?                      │
│  ──────────────────────────────────────────────────────────────── [+]  │
│  Will this guarantee I get the reservation?                             │
│  ──────────────────────────────────────────────────────────────── [+]  │
│  How fast will I receive an alert?                                      │
│  ──────────────────────────────────────────────────────────────── [+]  │
│  What restaurants and parks are covered?                                │
│  ──────────────────────────────────────────────────────────────── [+]  │
│  What's your refund policy?                                             │
│  ──────────────────────────────────────────────────────────────── [+]  │
│  What do I do when I receive an alert?                                  │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│  TRAVEL AGENT SECTION                                                   │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  Managing Disney dining for multiple clients?                   │   │
│  │  Our Agency Plan offers bulk monitoring, priority support, and  │   │
│  │  multi-trip management for Disney-specialized travel planners.  │   │
│  │                         [Contact for Agency Plan]               │   │
│  └─────────────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────────┤
│  FOOTER (alt bg)                                                        │
│  [● Pixiedining]    Privacy · Terms · Refund Policy · Contact           │
│  ─────────────────────────────────────────────────────────────────────  │
│  Pixiedining is an independent service and is not affiliated with,      │
│  authorized by, or connected to The Walt Disney Company...              │
│  © 2025 Pixiedining                                                     │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Section 8: Responsive Behavior

```
DESKTOP (1440px, default):
  Two-column hero: headline/CTA/trust left (55%) | sample alert right (45%).
  Both columns visible above fold (900px). Stats bar peeks below fold.
  Stats bar: 3-column inline row.
  Alert channel showcase: 3-column card row.
  How-it-works: 3-column horizontal steps with arrow connectors.
  Coverage: 4-column card grid per park tab.
  Testimonials: 3-column card row.
  Pricing: 2-column side-by-side Free vs Pro, max-width 800px, centered.
  FAQ: full-width accordion, max-width 720px, centered.
  Nav: full horizontal nav, all items visible.

TABLET (768px):
  Hero: Stacks to 1-column. Headline/CTA/trust renders first; sample
    alert card renders below it (full-width).
  Stats bar: 3-column maintained; tighter padding.
  Alert channel showcase: 3-column maintained at tablet width.
  How-it-works: Collapses to 1-column vertical steps; arrows removed,
    downward numbering indicates sequence.
  Coverage: 2-column grid per park tab.
  Testimonials: 2-column grid (third card wraps to second row, centered).
  Pricing: 2-column maintained but narrower horizontal padding.
  Nav: full nav maintained; consider tightening padding.

MOBILE (390px):
  Hero: 1-column. Headline (full-width) → free alert CTA (full-width
    button, ≥48px, thumb-sized) → trust sub-label → no-login badge →
    handoff note → sample alert card (full-width, compact SMS format).
    Subhead compressed to 2 lines max.
  Stats bar: 3 stats in horizontal scroll row OR stacked 1-column.
  Alert channel showcase: Horizontal scroll or 1-column accordion.
  How-it-works: 1-column vertical numbered steps (no arrows).
  Coverage: 1-column list; park switcher tabs at top; "WDW" default.
  Testimonials: 1-column vertical stack; first 2 visible, 3rd "Show more."
  Pricing: 1-column stacked. Free above Pro; both fully visible on scroll.
    CTA buttons full-width on each card.
  FAQ: Full-width accordion; trigger height ≥48px; compact answer text.
  Travel agent: 1-column centered card.
  Nav: Logo left + hamburger right. Drawer: How it Works / Coverage /
    Pricing / Sign In.
```

---

## Section 9: Interaction Notes

```
1. FREE ALERT CTA → CRITERIA ENTRY
   Clicking "Start Watching Free" opens a modal overlay or scrolls to an
   inline criteria form collecting: restaurant (searchable dropdown),
   trip dates, party size, notification channel (email / push). This
   flow is downstream from this spec. The CTA must trigger it immediately
   with no intermediate page load.

2. SAMPLE ALERT CHANNEL SWITCHING (alert-channel-showcase)
   Three card-click or tab interactions switch between SMS, email, and
   push preview formats. Active channel is visually indicated. Instant
   swap — no animation required. Default: SMS card active.

3. COVERAGE PARK TAB SWITCH
   Two tabs (WDW / DLR) toggle the restaurant grid. Active tab indicated.
   No animation required. WDW is the default active tab.

4. FAQ ACCORDION
   Standard expand/collapse. Expandable on tap/click. Touch target ≥48px.
   Either single-open (recommended for mobile) or multi-open (implementer's
   call). Default state: all collapsed.

5. STICKY NAV (desktop, optional enhancement)
   Nav can become sticky on scroll for desktop. When the hero CTA scrolls
   out of view, a "Start Watching Free" link or button may appear in the
   sticky nav bar as a persistent conversion action. Not required for v1.

6. PRICING ANNUAL TOGGLE (optional enhancement)
   A monthly/yearly toggle in the pricing header switches between $14.99/mo
   and $99/yr display. Not required for v1 but the layout must support it.
```

---

## Section 10: Content Direction

```
OVERALL TONE:
  Warm, specific, honest, and practical. Pixiedining speaks like a
  knowledgeable friend who has figured out the Disney dining system —
  not a corporate entity, not a Disney imitation, not a breathless hype
  site. Every claim is substantiated. Every action is clear. The voice
  acknowledges trip anxiety without amplifying it; it resolves it.

SECTION-BY-SECTION:

Hero:
  Key message: You missed the 60-day window. That doesn't mean the
    table is gone forever. We'll tell you the instant it comes back.
  Emotional register: Calm reassurance + focused utility.
  Headline: Specific, active, direct. No magic metaphors.
    ~ "Get alerted the instant that Disney dining table opens up again"
  Subhead: One sentence per clause — what we do / what you do / why safe.
    ~ "We monitor cancellations. You book on Disney's official site.
       We never log into your account."
  CTA sub-label: "No credit card · No Disney login required"
  Trust badge: "We never access your Disney account — ever"
  Word counts: Headline 10-14 words; subhead 12-20 words.

Sample Alert Mockup:
  Restaurant: Be Our Guest (recognizable, high-demand)
  Date/time: February 28 · 6:30 PM · Magic Kingdom
  Party size: 4 (family-planner resonant)
  Link label: "Reserve Now on DisneyWorld.com →"
  Sub-label: "Opens Disney's official booking page"
  Timestamp: "⏱ 47 sec after availability appeared"
  Caveat: "Example alert. Details changed for illustration."
  Channel badge: "This is a Pro SMS alert. Free plan includes email."
  Tone: Technical enough to be credible; warm enough to be real.

Alert Channel Showcase:
  Section head: "Get notified your way"
  Sub: "SMS and push notifications require Pro. Email alerts are free."
  SMS card: From short code 33210, Space 220 example, Pro badge
  Email card: Subject line "🎉 Cinderella's Royal Table is available",
    party/date/link, Free badge
  Push card: Pixiedining notification chrome, Topolino's example, Pro badge
  Tone: Instructional; channel-specific framing for each card.

How It Works:
  Head: "How it works"
  Sub: "Three steps. No Disney login needed at any point."
  Step 1: "Set your criteria" — Restaurant, dates, party size, channel.
    Icon: sliders or form-field graphic.
  Step 2: "We monitor availability" — "Pixiedining checks Disney's
    availability feed every 45 seconds (Pro) or every 3 minutes (Free)
    — around the clock."
    Icon: radar or scan graphic.
  Step 3: "You book on Disney's site" — "The moment something opens,
    you get an instant alert. Tap the link to reserve directly on
    Disney's official reservation system — not through us."
    Icon: phone notification graphic.
  Tone: Instructional, concise. "Not through us" must appear in Step 3.

Coverage:
  Head: "Works with the restaurants you actually want" (domain-expert signal)
  Sub: "140+ restaurants across Walt Disney World and Disneyland Resort."
  Restaurant names: Named, specific. Domain-expert framing.
  Park switcher: WDW / DLR tabs.
  Overflow: "+ 127 more restaurants →" links to full list.
  Tone: Confident expertise. No vague "popular restaurants covered" language.

Stats Bar:
  "847,000+ alerts sent since launch" (scale proof)
  "< 60 sec Pro alert latency (typical)" (speed proof, mechanism-grounded)
  "140+ restaurants across WDW & DLR" (scope proof)
  Tone: Specific, honest. No superlatives. "Typical" qualifier on latency.

Testimonials:
  Head: "Families who stopped refreshing"
  Card 1: "Got Be Our Guest for our group of 4 for Valentine's Day —
    6 weeks before our trip. I genuinely thought it was impossible after
    missing the 60-day window." — Sarah K. · January 2025 · WDW trip
  Card 2: "Nabbed Cinderella's Royal Table for Christmas week. My
    daughter cried. The alert came through at 2am — so glad my phone
    buzzed." — Lisa M. · December 2024 · WDW trip
  Card 3: "Three alerts fired in two days for different restaurants.
    Used two of them. Upgraded to annual Pro the same day." 
    — Matt S. · March 2025 · Disneyland trip
  Tone: First-person. Trip-specific. Emotionally real but not
    over-dramatized. No "amazing service!" generic testimonials.

Pricing:
  Head: "Start free. Upgrade when you need more."
  Sub: "No credit card required for free plan. Cancel Pro anytime."
  Free: $0 · No credit card · 1 restaurant · Email · 3-min check ·
    1 active trip. CTA: "Start Free Alert"
  Pro: $14.99/mo or $99/yr (save 34%) · Unlimited restaurants ·
    SMS + push + email · 45-sec check · Multi-park bundles ·
    Auto-resume after alert fires · Priority delivery.
    CTA: "Go Pro" · Risk: "30-day money-back guarantee · Cancel anytime"
  Framing note: "Free is enough for most first trips. Pro is for
    passholders, complex itineraries, and anyone who needs the speed edge."

FAQ (6 entries):
  Q1: Does Pixiedining ever log into my Disney account or access my
      credentials?
  A1: No. Never. We monitor Disney's publicly available reservation feed,
      not your account. We never ask for your Disney login, password, or
      any credentials.
  Q2: Will this guarantee I get the reservation?
  A2: No — and we want to be clear about that. We alert you the instant
      availability appears. You need to act quickly and book through
      Disney's official site. We cannot hold or book tables.
  Q3: How fast will I receive an alert?
  A3: Pro accounts check every 45 seconds; Free accounts every 3 minutes.
      SMS and push typically arrive within seconds of detection. Exact
      delivery depends on device and carrier.
  Q4: What restaurants and parks are covered?
  A4: 140+ restaurants across Walt Disney World and Disneyland Resort,
      including all high-demand table-service dining. See the full list above.
  Q5: What's your refund policy?
  A5: 30-day money-back guarantee on Pro subscriptions, no questions asked.
  Q6: What do I do when I receive an alert?
  A6: Your alert includes a direct link to the booking page on Disney's
      official reservation site. Tap immediately — availability can
      disappear within seconds or minutes.

Travel Agent:
  Head: "Managing Disney dining for multiple clients?"
  Body: "Our Agency Plan offers bulk monitoring, priority support, and
    multi-trip management for Disney-specialized travel agents and
    planners. Contact us to learn more."
  CTA: "Contact for Agency Plan" → email / inquiry form
  Tone: Professional, brief, explicit about multi-client utility.

Footer:
  Brand: Pixiedining logo + text
  Links: Privacy Policy · Terms of Service · Refund Policy · Contact
  Disclaimer (required): "Pixiedining is an independent service and is
    not affiliated with, authorized by, or connected to The Walt Disney
    Company, Walt Disney World Resort, or Disneyland Resort. All
    restaurant names and park names are trademarks of their respective
    owners. Pixiedining monitors publicly available reservation
    information and does not guarantee the availability, booking, or
    securing of any dining reservation."
  Copyright: © 2025 Pixiedining
```

---

## Section 11: Visual Acceptance Spec

### 11A: Viewports & Scenarios

```
VIEWPORTS:
  - Desktop: 1440x900
  - Tablet:  768x1024
  - Mobile:  390x844
```

### 11B: First Viewport Composition

```
FIRST VIEWPORT (desktop, 1440x900):
  - Hero headline must be fully readable before scroll.
  - Sample alert notification must be visible in the hero right panel
    before scroll.
  - Primary free alert CTA must be visible and actionable before scroll.
  - No-login trust badge must appear immediately adjacent to or below
    the primary CTA before scroll.
  - Hero subhead must be visible stating the handoff model.
  - Stats bar or next section must peek below the fold — user must see
    there is more content below.
  - The hero must not be a full-screen mood/branding-only viewport.

FIRST VIEWPORT (mobile, 390x844):
  - Hero headline (full-width, stacked) must be visible.
  - Free alert CTA (full-width button, ≥48px height) must be visible
    without scroll.
  - No-login trust line must be visible directly below the CTA.
  - Sample alert card must begin to appear at the bottom of the first
    viewport, signaling proof content immediately below.
```

### 11C: Layout Constraints

```
LAYOUT:
  Desktop: Two-column hero (55/45 split: headline+CTA+trust left;
    alert mockup right). Single-column sections below.
  Tablet: One-column hero (headline → CTA → alert mockup stacked).
    2-column coverage and testimonials.
  Mobile: One-column throughout. CTA full-width. Alert mockup below CTA.

  Hero headline owns primary visual weight; sample alert notification
  owns secondary visual weight within the hero viewport.

  Free alert CTA button must be visually distinct from all other buttons
  on the page at every viewport (size, contrast, fill treatment).

  Pro CTA must be visually secondary to the free CTA at every scroll
  position on every viewport.

  Sample alert notification block must maintain a bordered, distinct card
  treatment — it must read as a product artifact, not as page background.
```

### 11D: Density & Rhythm

```
DENSITY:
  Mode: Low-density marketing in hero and how-it-works; moderate density
    in coverage, channel showcase, and pricing; compact in FAQ and footer.

  Hero section: Generous padding. Ample whitespace between headline,
    subhead, CTA, trust badge, and handoff note. Alert mockup card has
    internal padding that matches a real notification UI.

  Stats bar: Compact single-row display. Three statistics side by side
    with a light divider. No decorative elements.

  Alert channel showcase: Moderate spacing. Three equal-width cards.
    Channel mockup content inside each card is compact and realistic.

  How-it-works: Moderate spacing between steps. Connector arrows imply
    flow without adding noise.

  Coverage: Comfortable grid. Restaurant tags are scannable at a glance.
    No dense description text per tag.

  Testimonials: Moderate whitespace between cards. Quote text is the
    primary content; attribution is secondary.

  Pricing: Moderate density. Tier comparison is readable without cramming.
    Feature rows are compact but ≥40px per row for scannability.

  FAQ: Compact. Triggers are concise. Touch targets ≥48px on mobile.

  Controls must not visually compete with the primary CTA at any density.
```

### 11E: Required Stable Selectors

```
REQUIRED SELECTORS:
  #page-root              — Root container
  #primary-section        — Hero section
  #primary-action         — Free alert CTA button
  #sample-alert           — Sample notification mockup
  #no-login-badge         — Trust badge element
  #how-it-works           — How-it-works section
  #coverage-section       — Coverage section
  #stats-bar              — Stats bar section
  #pricing-section        — Pricing section
  #faq-section            — FAQ accordion section
  #travel-agent-section   — Travel agent segment section
```

### 11F: Non-Negotiables

```
1. The sample alert notification must appear in the first viewport on
   desktop — hero right panel. This is the structural commitment of this
   strategy. Moving it below the fold is a strategy failure.

2. The no-login trust signal must appear co-located with the primary CTA
   in the hero — not only in the FAQ.

3. The primary CTA must carry "free" or "free alert" language to signal
   zero-barrier entry.

4. The official handoff model (users book on Disney's site, not
   Pixiedining) must be stated explicitly in both the hero subhead and
   how-it-works step 3.

5. Pro must not be the visually dominant CTA in the first viewport.

6. The footer must contain the explicit Disney non-affiliation disclaimer.

7. The sample alert must reference a specific, named Disney restaurant —
   not a placeholder like "Restaurant Name" or "Your Restaurant."
```

### 11G: Allowed Variation

```
- The default notification channel in the hero mockup may be SMS, email,
  or push — the spec does not mandate which channel is shown at hero level.
- The specific restaurant, date, and party size in the sample alert may
  be updated to reflect seasonal relevance.
- A monthly/yearly pricing toggle may be added as an enhancement.
- The coverage list may be made searchable or filterable as an enhancement.
- Alert volume and latency stats may be updated dynamically.
- Testimonials may be replaced with verified user-submitted content.
- The sticky nav with persistent CTA may be added for desktop.
```

### 11H: Not Allowed

```
1. Placing the Pro CTA above or before the free alert CTA in the hero.
2. Using Disney brand colors, official fonts, or castle-dominant imagery
   as the primary visual identity.
3. Including copy that says "get your table," "reserve your spot,"
   "guaranteed," "we book it," "automatic booking," or any language
   implying Pixiedining completes the reservation.
4. Hiding the no-login trust signal below the fold on mobile.
5. Replacing the sample alert with a generic product screenshot that does
   not show a notification format.
6. Adding a carousel or slider to the hero — the alert mockup is static.
7. Placing the travel agent section before pricing or testimonials.
8. Omitting the non-affiliation disclaimer from the footer.
```

---

## Section 12: HTML Wireframe Artifact

```
HTML WIREFRAME ARTIFACT:
  File:       wireframe.example-alert-proof-strategy.html
  Components: 21 (matching Section 6 component inventory)
  Selectors:  11 (matching Section 11E required selectors)
  Status:     written
```
