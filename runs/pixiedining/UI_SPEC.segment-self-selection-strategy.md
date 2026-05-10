# Pixiedining Landing Page — Segment Self-Selection Strategy

---

## Section 1: Page Classification

```
TYPE: marketing (conversion-dominant)
```

Dominant mode: marketing. The page is entirely pre-purchase for all three segments — it sells a free alert (Segment A), a Pro subscription (Segment B), and an agency inquiry (Segment C). No logged-in state, no internal tool patterns. Hybrid lean: the superfan proof block and pricing comparison use compact, data-dense internal-tool density, but only in a sub-section, not as the dominant register.

---

## Section 2: Intake Summary

```
PURPOSE: Convert visitors into paying users for two concrete outcomes —
  (a) free signups for a single-restaurant alert during one upcoming trip, and
  (b) paid Pro subscriptions ($14.99/mo or $99/yr) for unlimited restaurants,
  multi-park bundles, push + SMS notifications, faster polling cadence, and
  auto-resume after the alert fires. Must establish credibility quickly because
  users are skeptical of third-party Disney reservation tools and emotionally
  invested in a once-a-year or once-in-a-lifetime trip expense.

AUDIENCE: Three segments that should self-select.
  Segment A — One-trip family planner: parent/planner organizing a 5-10 day
    Disney vacation. Decides in under 2 minutes whether the site is legitimate.
    Signs up free first; upgrades only after proof.
  Segment B — Disney superfan/Annual Passholder: expert user who visits
    multiple times per year, participates in Disney Reddit/Facebook communities,
    already knows competitor tools (MouseDining, DVC Reservation Finder,
    Touring Plans). Compares methodically. Will pay annual if convinced on
    latency, coverage breadth, and SMS.
  Segment C — Travel agent/planner: Disney-specialized agent booking dining
    for many client families per month. Needs multi-client reliability and an
    inquiry path before paying.

CONTEXT: Standalone marketing landing page at pixiedining.com root.
  Entry: paid search ("disney dining reservation finder", "be our guest
    cancellation alert"), Reddit r/WaltDisneyWorld referral threads, TikTok
    discovery videos.
  Exit: free alert signup flow (primary), Stripe Pro checkout (secondary),
    travel agent contact form (tertiary).
  User journey stage: SELLING. Pre-purchase for both free and paid tiers.

KEY ACTIONS:
  1. PRIMARY — Start a free single-restaurant alert
     (enter trip dates + party size + restaurant → email/push).
  2. SECONDARY — Upgrade to Pro ($14.99/mo or $99/yr) for unlimited
     restaurants, SMS, faster polling.
  3. TERTIARY — See sample alert / coverage / travel agent inquiry.
```

---

## Section 3: Flow Map

```
FLOW: Single page (standalone)

Entry sources:
  Paid search ──────────────────────────┐
  Reddit r/WaltDisneyWorld referral ────┤
  TikTok discovery ─────────────────────┤
                                        ▼
                           [pixiedining.com root]
                                        │
                    ┌───────────────────▼────────────────────┐
                    │  HERO + TRUST (universal, all segments) │
                    └───────────────────┬────────────────────┘
                                        │
                    ┌───────────────────▼────────────────────┐
                    │        HOW IT WORKS (universal)        │
                    └───────────────────┬────────────────────┘
                                        │
                    ┌───────────────────▼────────────────────┐
                    │     SEGMENT GUIDE (optional routing)   │
                    │  [Family Planner] [Superfan] [Agent]   │
                    └────┬──────────────┬────────────────┬───┘
                         │              │                │
                         ▼              ▼                ▼
               #family-planner   #superfan-section  #agency-section
               -section          (Pro comparison)   (inquiry form)
                    └──────────────────┬────────────────┘
                                        │
                    ┌───────────────────▼────────────────────┐
                    │         PRICING (universal)            │
                    └───────────────────┬────────────────────┘
                                        │
                    ┌───────────────────▼────────────────────┐
                    │       TESTIMONIALS (universal)         │
                    └───────────────────┬────────────────────┘
                                        │
                    ┌───────────────────▼────────────────────┐
                    │      AGENCY INQUIRY SECTION            │
                    └───────────────────┬────────────────────┘
                                        │
                                     FOOTER

Exit paths:
  Free alert signup flow ← Primary CTA (hero + pricing free card)
  Stripe Pro checkout    ← Secondary CTA (superfan section + pricing Pro card)
  Agent inquiry form     ← Tertiary CTA (agent segment card + agency section)
```

---

## Section 4: Decision Map

### 4A: User Decision Sequence

```
PAGE LEVEL:
  User's first question:
    "Will this watch the specific Disney dining reservation I missed and alert
     me fast enough to actually grab it?"
  Resolved by:
    Hero headline naming the exact problem (Disney dining cancellations) +
    inline free-alert form entry + "never requires your Disney account" trust
    badge immediately adjacent to the CTA.

SECTION LEVEL:
  Scanning for:
    "Is this safe? Does it cover my restaurant? How fast? What does Pro add?"
  Resolved by:
    Official handoff strip (no-guarantee safety model),
    trust strip (volume + speed + legitimacy signals),
    how-it-works 3-step (mental model),
    segment guide (optional routing to relevant depth),
    coverage section (restaurant-specific proof),
    segment-specific proof blocks (tailored evidence per audience),
    pricing comparison (Pro specifics with concrete numbers).

COMPONENT LEVEL:
  Click-vs-skip decision:
    "Does this look real and does it cover the restaurant I care about?"
  Resolved by:
    Named restaurant recognition in coverage list,
    sample alert notification mock showing a realistic-looking alert,
    alert volume count ("X,XXX alerts sent this month") near the trust strip.

AUDIENCE SEGMENT DIFFERENCES:
  Segment A (family planner):
    Decision path: hero → start free alert → [optional] family planner FAQ.
    Will NOT engage with superfan comparison tables unless curious.
    Trust proof (no-login, handoff) must be visible before form fields.

  Segment B (superfan/passholder):
    Decision path: hero → segment guide superfan card → superfan proof block
    (cadence table, competitor comparison) → Pro pricing → annual checkout.
    Methodical. Will not pay without seeing concrete cadence numbers and
    coverage breadth vs. MouseDining.

  Segment C (travel agent):
    Decision path: hero → segment guide agent card → agency inquiry section.
    Will not use Stripe checkout — needs direct contact path.
    Agency language must not appear in the hero, which would dilute Segment A.
```

### 4B: Asset And Evidence Inference

```
PRODUCT/OUTPUT ASSETS:
  The user receives a real-time notification (email, push notification, or SMS
  on Pro) containing: restaurant name, date available, time slot, party size
  match, and a direct link to the Disney dining reservation page on Disney.com
  to complete booking immediately. The alert is the product — everything on
  the page should make the alert feel real, fast, and relevant.

PROOF ASSETS:
  - Alert volume: "X,XXX alerts sent in the last 30 days" — signals active
    monitoring and service health
  - Sample alert preview: rendered notification mock showing a real-looking
    alert (restaurant name, date, time, party size, "Book on Disney.com →" CTA)
    — labeled "Example alert" to avoid overclaiming
  - Average alert speed: "Avg. X min from cancellation to alert" if
    substantiated — makes the time-to-alert visible
  - Restaurant coverage list with park groupings: named venues (Be Our Guest,
    Cinderella's Royal Table, Space 220, Topolino's Terrace, etc.) aligned with
    search query intent
  - Pro polling cadence: specific numbers (every 2 min vs. every 15 min) for
    Segment B validation
  - Competitor comparison table: concrete column comparison vs. MouseDining and
    Touring Plans Finder — for Segment B methodical evaluation
  - Success framing: realistic short quotes naming specific restaurants, without
    guarantee language

CONVERSION ASSETS:
  - Free single-restaurant alert as zero-risk, no-credit-card entry point
  - "No credit card required" adjacent to free CTA
  - Pro pricing displayed clearly ($14.99/mo or $99/yr; ~44% savings on annual)
  - 7-day refund guarantee near Pro CTA
  - Stripe payment processor logo near checkout
  - "No Disney login required" as primary trust signal

NAVIGATION/SELF-SELECTION ASSETS:
  - Segment guide section: three audience path cards
    Card 1: "Planning my Disney trip" → anchors to #family-planner-section
    Card 2: "Annual Passholder or frequent visitor" → anchors to #superfan-section
    Card 3: "Booking for clients?" → anchors to #agency-section
  - Named restaurant coverage for search-intent matching
  - How it works for users unfamiliar with third-party alert tools

ACTION VS SIGNAL CLASSIFICATION:
  Actions:
    - Free alert setup (form: restaurant + dates + party size + email/push)
    - Pro subscription Stripe checkout
    - Travel agent inquiry form submission
    - "See sample alert" — optional expand
    - "View full coverage list" — optional expand

  Signals:
    - Alert volume count (ambient credibility)
    - Sample alert notification preview (proof of product tangibility)
    - No-login badge and explanation (safety trust)
    - Official handoff strip ("you book on Disney.com")
    - Pro polling cadence numbers (performance proof for experts)
    - Competitor comparison table (differentiation proof for experts)
    - Success quotes (social proof, realistic framing)
    - Payment processor logos (transactional trust)
    - Refund guarantee (risk reduction)
    - Non-affiliation disclaimer (legal safety + trust transparency)
```

### 4C: Strategy Defense

```
ASSIGNED STRATEGY: segment-self-selection-strategy

WHY THIS STRATEGY FITS THIS INTAKE:
  The intake describes three genuinely distinct audiences with fundamentally
  different proof needs and different conversion paths. Family planners need
  immediate trust and a fast path to the free alert. Superfans need concrete
  performance data and competitor comparison to justify paying annually. Travel
  agents need a multi-client capability inquiry path, not a consumer checkout.
  A single-message page cannot serve all three without either under-serving
  experts (too much reassurance language dilutes comparison credibility) or
  overwhelming family planners (too much latency and comparison data creates
  confusion). The segment self-selection strategy resolves this by leading with
  universal content that fully satisfies the family planner's first decision
  (is this safe? can I start free right now?) and then inviting optional
  segment-specific depth for those who need it. This is structurally appropriate
  for the genuinely mixed-intent traffic (paid search, Reddit, TikTok, and
  professional planner referrals) described in the intake.

LOCAL OPTIMUM THIS STRATEGY RISKS:
  The shallow version of segment self-selection is the three-card hero fork:
  a "Who are you?" modal or gating mechanism that intercepts all visitors before
  showing any content and forces them to identify their segment before proceeding.
  This produces decision paralysis for the family planner who arrived with a
  specific reservation anxiety and wants to know immediately if this is safe
  and can be started now. The secondary shallow version is equal-weight tabs for
  "Family Planner / Superfan / Agent" where content is hidden behind tabs —
  especially damaging on mobile where tabs are often missed entirely.

HOW THIS DESIGN AVOIDS THAT LOCAL OPTIMUM:
  The segment guide is positioned below the hero and trust strip — after the
  universal primary conversion path is already established. A family planner
  can enter their free alert criteria and start without ever engaging the
  segment guide section. The guide is framed as "Find what fits your situation"
  — an optional depth aid, not a mandatory routing gate. The three segment
  cards anchor-link to deeper sections of the same page; they do not replace
  or gate the primary CTA. On mobile, the primary CTA remains full-width in the
  first viewport, and the segment guide appears well below it.

REFERENCE CALIBRATION:
  No external references injected. Structural family calibration via
  general-knowledge patterns:
  - The "universal primary action + optional audience depth" structure is used
    effectively by utility products serving mixed-sophistication audiences (e.g.,
    Flightradar24, Privacy.com, Backblaze). These share the family: task entry
    first, segment-specific validation secondary. The segment guide cards
    resemble a "use case router" common in developer tools (Stripe, Twilio)
    but scaled down to three consumer-adjacent segments.
  - Deliberately avoiding the "three equal paths from the hero" pattern common
    in B2B SaaS hub-and-spoke landing pages (e.g., "For Teams / For Agencies /
    For Enterprise" as the first decision). That pattern assumes the audience
    does not already share a universal entry product — here, the free alert
    is the same product for all three segments.

STRATEGIC DIAGNOSIS MAPPING:
  - Strategic axis mapped: audience_sophistication: mixed →
    Segment guide delivers tiered depth (family planner reassurance, superfan
    comparison, agent inquiry) without requiring all visitors to navigate expert
    content. The page is traversable at three levels of depth.
  - Strategic axis mapped: trust_burden: high →
    No-login trust signal (#no-login-trust) placed in hero alongside primary
    CTA; official handoff strip (#official-handoff) immediately adjacent; both
    appear before the segment guide or any depth content.
  - Strategic axis mapped: functional_immediacy: high →
    Free alert form fields (restaurant, dates, party size) accessible in first
    viewport on desktop; one-tap reveal on mobile preserving CTA visibility.
  - Strategic axis mapped: content_depth: layered →
    Universal hero → how it works → optional segment guide → segment-specific
    proof blocks → pricing → testimonials → agency inquiry. Each layer is
    accessible but not required.
  - Audience/buyer implication: mixed sophistication →
    Segment guide is positioned as optional depth after the primary CTA is
    visible. Family planners never need to touch it. Superfans and agents use
    it to navigate to their relevant section.
  - Design directive implication: "Support three audience segments without making
    agency content dominate" → Agency path card is visually tertiary in the
    segment guide. Agency inquiry section is at the bottom of the page, below
    pricing and testimonials.

FIRST VIEWPORT OBLIGATION:
  Diagnosis requires: Within seconds, visitors must understand that Pixiedining
  watches Disney dining cancellations, alerts them in real time, never needs
  their Disney login, and lets them start one free alert immediately.

  First-fold components on desktop:
    - Nav bar: Logo + Coverage + How it Works + Pricing + Log In
    - Hero headline: Names the problem and the alert outcome (primary, P)
    - Hero subhead: One-sentence description of the monitoring-alert-book flow (S)
    - No-login trust badge (#no-login-trust): "Never requires your Disney account
      or password" — inline with or immediately below the headline group (P)
    - Free alert form fields: Restaurant + dates + party size + notification
      channel — inline on desktop (P)
    - Free alert CTA button (#primary-action): "Start Free Alert" — prominent,
      dark-filled (P)
    - Risk reducer text: "No credit card required · Free for 1 restaurant" (S)
    - Sample alert preview: Right column, gray-box notification mock showing
      a restaurant alert with "Book on Disney.com →" (S)
    - Official handoff strip (#official-handoff): "When an opening appears, we
      alert you instantly — you complete the booking on Disney's official site."
      This either appears at the bottom of the hero or as an immediate
      sub-section below, still in the first viewport group. (P/trust)

  First-fold components on mobile:
    - Nav: Logo + hamburger
    - Hero headline (scaled to fit single column)
    - No-login trust badge inline or immediately below headline
    - Free alert CTA button (full-width)
    - Risk reducer text
    - Official handoff strip may peek at fold bottom

HARD FLOOR COVERAGE:
  - hf_free_alert_visible → Hero section (#primary-section): free alert CTA
    button (#primary-action) visible in first viewport on all breakpoints;
    desktop form fields visible inline; mobile CTA full-width above fold.
  - hf_no_login_trust → Hero section: #no-login-trust badge/text positioned
    within the first viewport, adjacent to or within 2 visual rows of
    #primary-action; also present in #how-it-works step 1 caption.
  - hf_no_guaranteed_booking → All copy placeholders use "alert", "notify",
    "monitor" — never "book", "secure", "guarantee", "hold"; #official-handoff
    strip explicitly states user books on Disney's site; CTA says "Start Free
    Alert" not "Get My Table".
  - hf_official_handoff → #official-handoff strip in or immediately below hero;
    how-it-works step 3 explicitly names "Disney's official reservation site";
    no language in any section implies Pixiedining controls or guarantees
    the booking outcome.
  - hf_segment_self_selection → #segment-guide section with three clearly
    labeled audience path cards; each card includes a 2-line description of the
    segment and an anchor link to the relevant depth section; all three segments
    have a functional conversion path.
  - hf_mobile_first_task → Mobile hero: headline, no-login badge, and full-width
    CTA visible before scroll; risk reducer below CTA; segment guide stacks to
    single column; coverage accordion collapsed; no dense form fields blocking
    the primary CTA.
  - hf_pro_value_specificity → #pricing-section: Pro benefits listed as
    specific, comparison-ready items: unlimited restaurants, Email+Push+SMS,
    polling every 2 min, WDW + Disneyland, auto-resume, multi-park bundles.
    Free tier limitations also stated specifically (1 restaurant, email only,
    every 15 min). Prices: $14.99/mo or $99/yr.

ANTI-PATTERN AVOIDANCE:
  - ap_magic_before_task → Hero headline is task-functional: names the
    specific problem (Disney dining cancellations) and the outcome (alert when
    the table opens). No sparkle/castle/magic as the primary message. Subhead
    explains the monitoring-alert-book flow, not a vacation dream.
  - ap_disney_clone_branding → Visual identity is warm-neutral utility brand.
    No Disney castle imagery as primary visual. Footer includes explicit
    non-affiliation disclaimer. Copy uses official venue names for search-intent
    relevance without implying partnership.
  - ap_unsupported_speed_claims → Polling cadence stated with specific numbers
    in the superfan proof block and pricing comparison (Pro: every 2 min, Free:
    every 15 min). No "fastest alerts anywhere" superlative without evidence.
  - ap_hidden_safety_model → No-login explanation is in the hero (#no-login-trust)
    and in the how-it-works section (#how-it-works). Not buried in FAQ. Official
    handoff strip (#official-handoff) is inline with the hero — not deferred.
  - ap_generic_saas_grid → Feature and proof sections use Disney-specific
    restaurant names (Be Our Guest, Space 220, Cinderella's Royal Table),
    booking mechanics (60-day window, cancellation pool), and Disney-specific
    competitor names. Not abstract "fast, easy, reliable."
  - ap_pro_overpush → Free alert CTA is primary throughout. Pro is positioned
    as an upgrade path for users who need more restaurants or faster alerts.
    Pricing section appears below how-it-works and proof sections. Pro CTA in
    the hero is absent — only the secondary Pro mention is in the segment guide
    superfan card.
  - ap_agent_path_confusion → Agency path card in segment guide is visually
    tertiary (narrower, lighter weight). Agency inquiry section is below
    pricing and testimonials. No agency language ("multi-client", "team seats")
    in the hero or how-it-works.
  - ap_guarantee_language → CTA label: "Start Free Alert" (not "Get My Table").
    How it works step 3: "tap the link and complete your booking on Disney's
    official site." No "we secure", "we guarantee", "your reservation" copy.
    Sample alert labeled "Example alert" not "Your upcoming alert."
```

### 4D: Component Justification

| Component | User Lens | Business Lens | Verdict |
|-----------|-----------|---------------|---------|
| nav-bar | Orientation, quick access to Coverage and Pricing | Brand presence, login path | Include — tertiary; standard utility |
| hero-headline | Names the specific reservation problem; confirms relevance | Paid search keyword alignment; emotional resonance | Include — primary |
| hero-subhead | Explains what Pixiedining does in one sentence | Sets accurate expectations; no-guarantee risk management | Include — secondary |
| no-login-trust | Removes primary skepticism blocker before form entry | Reduces bounce and false disqualification | Include — primary (trust) |
| free-alert-cta | Immediate low-risk entry; most users start free | Primary conversion event | Include — primary |
| free-alert-form-fields | Captures restaurant + dates + party size + notification channel | Starts signup funnel | Include — primary |
| risk-reducer-text | "No credit card required" reduces form commitment anxiety | Reduces form abandonment | Include — secondary |
| official-handoff-strip | Clarifies what Pixiedining does not do (book) | Legal/trust safety; no-guarantee compliance | Include — primary (trust) |
| sample-alert-preview | Makes the product tangible; reduces "will I actually get an alert?" doubt | Proof of product existence; reduces skepticism | Include — secondary |
| alert-volume-count | Signals active, live service | Ambient credibility and social proof | Include — secondary |
| trust-strip | Cluster of legitimacy signals in one compact row | Efficient trust establishment below hero | Include — secondary |
| how-it-works | Mental model: set criteria → monitor → alert → book | Reduces misuse and support queries | Include — secondary |
| segment-guide | Routes family planners, superfans, and agents to relevant depth without gating | Improves per-segment conversion rates | Include — secondary |
| coverage-section | Restaurant-specific relevance; matches search query intent | SEO alignment; drives Pro upgrade motivation (1 vs. unlimited) | Include — secondary |
| family-planner-proof-block | "Is it safe?" FAQ; realistic success framing for Segment A | Completes Segment A trust; reduces abandonment at the cusp | Include — secondary (Segment A depth) |
| superfan-proof-block | Polling cadence table; competitor comparison; Pro differentiation for Segment B | Expert-segment Pro conversion; annual plan motivation | Include — secondary (Segment B depth) |
| pricing-comparison | Clear free vs. Pro feature distinction with concrete specs | Pro subscription conversion; sets upgrade expectation | Include — secondary |
| pro-upgrade-cta | Upgrade path after trust and value are established | Secondary revenue conversion event | Include — secondary |
| testimonials-strip | Social proof: realistic success quotes naming specific restaurants | Trust depth; reduces late-funnel doubt | Include — tertiary |
| agency-inquiry-section | Multi-client path for Segment C; inquiry form | High-LTV agency tier lead capture | Include — tertiary |
| footer | Legal, non-affiliation disclaimer, support, privacy | Compliance; trust transparency | Include — tertiary |

### 4E: Tension Map

```
TENSION: Segmentation section placement
  Business pull: Segment B and C users convert better with segment-specific
    content; showing relevant paths earlier increases their engagement.
  User pull: Segment A (largest segment) has a 2-minute decision window.
    Forcing self-identification before seeing the primary CTA or trust proof
    increases drop-off.
  Resolution: Segment guide positioned after hero and trust strip — after the
    universal primary conversion path is already visible. Guide is framed as
    optional depth ("find what fits your situation"), not a routing gate.
    Family planners can complete the primary action without engaging it.

TENSION: Sample alert preview vs. no-guarantee positioning
  Business pull: A realistic-looking alert preview is compelling proof that
    drives signups — the product "feels real."
  User pull: If the preview looks too staged or too perfectly timed, skeptical
    users may distrust it and infer overclaiming.
  Resolution: Alert preview is explicitly labeled "Example alert." The
    notification mock shows realistic content (restaurant, date, time, party
    size, "Book on Disney.com →") in gray-box wireframe style without
    overclaiming specific timing. Proximity to the official handoff strip
    reinforces the "we alert, you book" model.

TENSION: Expert performance data vs. family planner clarity
  Business pull: Superfans need concrete cadence numbers (2 min vs. 5 min vs.
    15 min) and a competitor comparison table to commit to Pro. Vague claims
    lose them to MouseDining.
  User pull: Family planners do not know or care about polling cadence. Seeing
    a comparison table early creates confusion ("what is a polling cadence?")
    and signals this is more complex than expected.
  Resolution: Cadence numbers and competitor comparison live exclusively in
    #superfan-section, reached via the segment guide anchor. Not in the hero,
    how-it-works, or pricing table summary.

TENSION: Agency path visibility vs. primary conversion focus
  Business pull: Travel agents are high-LTV. A clear, prominent inquiry path
    improves Segment C conversion rates.
  User pull: Agency language ("multi-client monitoring," "team seats," "per-trip
    management") in the hero or near the primary CTA dilutes Segment A's
    relevance signal and may confuse family planners about the product's scope.
  Resolution: Agency card in segment guide is the narrowest and most visually
    recessive of the three cards. Agency inquiry section is placed at the bottom
    of the page, below pricing and testimonials. No agency copy appears in the
    hero, how-it-works, or pricing section.

TENSION: Pro push timing vs. free-first trust sequence
  Business pull: Earlier Pro mention could increase Pro conversions, especially
    for superfans who arrive with intent to pay.
  User pull: Segment A converts better if they trust the free tier first.
    Premature paid push before trust is established reads as predatory.
  Resolution: Pro is mentioned secondary in pricing section (well below the
    hero and proof sections). The superfan segment block has a Pro-specific
    comparison table and direct Pro CTA. The hero CTA is free-only.
```

---

## Section 5: Visual Hierarchy Map

```
PRIMARY (dominant visual weight):
  1. hero-headline — The reason the page exists; must read immediately on load.
     Names the specific Disney dining cancellation problem and the alert outcome.
  2. free-alert-cta — The primary conversion event. Must be the most visually
     prominent interactive element on the page in every viewport.
  3. no-login-trust — Primary trust blocker for Segment A. Must be visible
     adjacent to the CTA in the first viewport. Not decorative — removes the
     single largest stated reason for abandonment.

SECONDARY (supporting):
  4. official-handoff-strip — Clarifies what Pixiedining does not do. Must
     appear in the hero group. Prevents overclaiming and builds safe expectations.
  5. sample-alert-preview — Proof of product tangibility. Right column on
     desktop, stacked below form on mobile. Labeled "Example alert."
  6. hero-subhead — One-sentence product description establishing the
     monitoring-alert-book flow.
  7. how-it-works — Three-step mental model for new users. After hero.
  8. segment-guide — Three audience path cards. After how-it-works. Optional.
  9. coverage-section — Restaurant list by park. Relevance proof and SEO.
  10. family-planner-proof-block — FAQ and success framing for Segment A.
  11. superfan-proof-block — Cadence table and competitor comparison for Segment B.
  12. pricing-comparison — Free vs. Pro feature grid with specific numbers.
  13. pro-upgrade-cta — Secondary conversion action. Below pricing.

TERTIARY (present but recessive):
  14. nav-bar — Orientation. Standard header weight.
  15. trust-strip — Alert volume, speed signal, legitimacy cues. Below hero,
      above how-it-works. Compact and ambient.
  16. risk-reducer-text — "No credit card required" below primary CTA.
  17. alert-volume-count — Integrated into trust-strip.
  18. testimonials-strip — Social proof depth. Below pricing.
  19. agency-inquiry-section — Segment C path. Bottom of page.
  20. footer — Legal, disclaimer, support. Recessive.
```

---

## Section 6: Component Inventory

| Component | Class | Purpose | Content Direction |
|-----------|-------|---------|-------------------|
| nav-bar | T | Orientation, section links, login | Logo + "Coverage" + "How It Works" + "Pricing" + "Log In" — max 5 items |
| hero-headline | P | Name the problem and the alert outcome | 10-14 words. "Watch Disney dining cancellations. Get alerted the second your table opens." |
| hero-subhead | S | One-sentence product description | "Pixiedining monitors availability and sends a real-time alert — you tap the link and book on Disney's official site." ~25-30 words |
| no-login-trust | P | Remove primary skepticism blocker | "Never requires your Disney account or password" — lock icon + text, prominent, adjacent to CTA |
| free-alert-cta | P | Primary conversion action | "Start Free Alert" — large button, dark fill, full-width on mobile |
| free-alert-form-fields | P | Capture alert criteria | Restaurant name (autocomplete) + travel dates (date range) + party size (stepper) + notification channel (email/push) — inline on desktop, modal/sheet on mobile |
| risk-reducer-text | S | Reduce form entry anxiety | "No credit card required · Free for 1 restaurant" — muted text immediately below CTA |
| official-handoff-strip | P | Safety model: no-booking, official site | "When an opening appears, we alert you instantly — you complete the booking on Disney's official reservation site." One sentence, callout style |
| sample-alert-preview | S | Proof of product tangibility | Gray-box notification mock: restaurant name, date, time, party size, "Book on Disney.com →" button. Labeled "Example alert." |
| alert-volume-count | S | Ambient credibility signal | "12,400+ alerts sent in the last 30 days" or similar concrete number |
| trust-strip | S | Compact legitimacy cluster | 4 items: alert volume + avg alert speed + "No Disney login" + "U.S.-based service" — horizontal row below hero |
| how-it-works | S | Mental model for new users | 3 numbered steps: (1) Set your criteria, (2) We monitor 24/7, (3) Alert arrives → you book on Disney.com. 2-3 sentences each. Step 3 must name Disney's official site. |
| segment-guide | S | Audience self-selection routing | Section headline: "Which kind of Disney planner are you?" 3 path cards with anchor links. Card 1: Family planner (warm, reassurance). Card 2: Superfan (direct, comparison-ready). Card 3: Agent (professional, brief). |
| coverage-section | S | Restaurant relevance + search alignment | Restaurant names grouped by park: Magic Kingdom, EPCOT, Hollywood Studios, Animal Kingdom, Disneyland. Named venues including Be Our Guest, Space 220, Cinderella's Royal Table, Topolino's Terrace. "View full list" expand. |
| family-planner-proof-block | S | Segment A trust depth | 3-4 FAQ items: no login, official handoff, cancellation mechanics, refund terms. 1-2 realistic success quotes naming specific restaurants. No guarantee language. |
| superfan-proof-block | S | Segment B expert validation | Polling cadence table (Pro: 2 min, Free: 15 min). Notification channels table. Competitor comparison: Pixiedining vs. MouseDining vs. Touring Plans Finder (SMS, coverage, free tier, Pro cadence). Pro annual CTA at bottom. |
| pricing-comparison | S | Tier distinction with concrete specs | Two-column: Free ($0) vs. Pro ($14.99/mo or $99/yr). Free: 1 restaurant, email only, 15-min polling, 1 park, no auto-resume. Pro: unlimited restaurants, Email+Push+SMS, 2-min polling, WDW+DL, auto-resume, multi-park bundles. |
| pro-upgrade-cta | S | Secondary conversion action | "Upgrade to Pro" — below Pro pricing card; "7-day refund guarantee" as risk reducer |
| testimonials-strip | T | Social proof depth | 2-3 short quotes naming specific restaurants. "We got our Be Our Guest reservation on a Tuesday morning." No guarantee echoes. Realistic framing. |
| agency-inquiry-section | T | Segment C multi-client inquiry path | Headline: "Managing dining for multiple trips or clients?" Brief paragraph about agency use case. Simple contact form: name, email, agency name, "Request Agency Plan Info" submit. |
| footer | T | Legal, disclaimer, support | "Not affiliated with The Walt Disney Company · Privacy · Terms · Support · © Pixiedining" — non-affiliation disclaimer mandatory |

---

## Section 7: ASCII Wireframe

```
┌──────────────────────────────────────────────────────────────────────┐
│ [PIXIEDINING]        Coverage  How It Works  Pricing    [Log In]     │
├──────────────────────────────────────────────────────────────────────┤
│                                           ┌────────────────────────┐ │
│  Watch Disney dining cancellations.       │    [EXAMPLE ALERT]     │ │
│  Get alerted the second                   │  ──────────────────   │ │
│  your table opens.                        │  🔔 Be Our Guest       │ │
│                                           │  Tue May 14 · 7:00pm  │ │
│  Pixiedining monitors availability        │  Party of 4            │ │
│  every few minutes and sends a            │  ─────────────────     │ │
│  real-time alert — you tap the            │  [Book on Disney.com→] │ │
│  link and book on Disney's                │  ──────────────────   │ │
│  official site.                           │  Example alert         │ │
│                                           └────────────────────────┘ │
│  🔒 Never requires your Disney account                               │
│                                                                      │
│  ┌────────────────────────────────────┐                             │
│  │ Restaurant name...                 │                             │
│  │ Travel dates...     Party size...  │                             │
│  │ Alert me via: [Email] [Push]       │                             │
│  │                                    │                             │
│  │     [  Start Free Alert  ]         │                             │
│  │                                    │                             │
│  │  No credit card required ·         │                             │
│  │  Free for 1 restaurant             │                             │
│  └────────────────────────────────────┘                             │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ When an opening appears, we alert you instantly — then you   │   │
│  │ complete the booking on Disney's official reservation site.  │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│  12,400+ alerts sent   Avg 4 min alert   No Disney login required   │
│  U.S.-based service    Stripe-secured payments                       │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  HOW IT WORKS                                                        │
│                                                                      │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │  1               │  │  2               │  │  3               │  │
│  │  SET YOUR        │  │  WE MONITOR      │  │  ACT ON YOUR     │  │
│  │  CRITERIA        │  │  24/7            │  │  ALERT           │  │
│  │                  │  │                  │  │                  │  │
│  │  Choose your     │  │  Pixiedining     │  │  Tap the link    │  │
│  │  restaurant,     │  │  scans Disney    │  │  in your alert   │  │
│  │  travel dates,   │  │  availability    │  │  and complete    │  │
│  │  party size,     │  │  every few       │  │  your booking    │  │
│  │  and how you     │  │  minutes, round  │  │  on Disney's     │  │
│  │  want to be      │  │  the clock.      │  │  official        │  │
│  │  notified.       │  │  No action       │  │  reservation     │  │
│  │                  │  │  needed from     │  │  site.           │  │
│  │                  │  │  you.            │  │                  │  │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘  │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  WHICH KIND OF DISNEY PLANNER ARE YOU?                               │
│                                                                      │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌───────────┐ │
│  │ Planning my Disney   │  │ Annual Passholder    │  │ Booking   │ │
│  │ trip                 │  │ or frequent visitor  │  │ for       │ │
│  │                      │  │                      │  │ clients?  │ │
│  │ New to dining        │  │ Know the system.     │  │           │ │
│  │ alerts. Want to      │  │ Comparing tools      │  │ Travel    │ │
│  │ know if this is safe │  │ on speed, coverage,  │  │ agent or  │ │
│  │ and easy to set up.  │  │ and SMS alerts.      │  │ planner.  │ │
│  │                      │  │                      │  │           │ │
│  │ [See safety info ↓]  │  │ [Compare Pro →]      │  │ [Learn ↓] │ │
│  └──────────────────────┘  └──────────────────────┘  └───────────┘ │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  RESTAURANTS WE MONITOR                                              │
│                                                                      │
│  MAGIC KINGDOM  ─────────────────────────────────────────────────   │
│  Be Our Guest · Cinderella's Royal Table · Crystal Palace           │
│  Liberty Tree Tavern · Skipper Canteen                              │
│                                                                      │
│  EPCOT  ─────────────────────────────────────────────────────────   │
│  Space 220 · Topolino's Terrace · Le Cellier · Coral Reef          │
│  Garden Grill · Biergarten · Akershus Royal Banquet Hall            │
│                                                                      │
│  HOLLYWOOD STUDIOS  ─────────────────────────────────────────────   │
│  Sci-Fi Dine-In · 50's Prime Time Cafe · Hollywood & Vine           │
│                                                                      │
│  ANIMAL KINGDOM  ─────────────────────────────────────────────────  │
│  Tiffins · Tusker House Restaurant                                  │
│                                                                      │
│  DISNEYLAND  ─────────────────────────────────────────────────────  │
│  Blue Bayou · Carthay Circle · Oga's Cantina                        │
│  Plaza Inn · Wine Country Trattoria                                 │
│                                                                      │
│  [View full coverage list — 60+ restaurants]                         │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│  id=family-planner-section                                           │
│                                                                      │
│  IS IT SAFE? COMMON QUESTIONS FROM FIRST-TIME USERS                 │
│                                                                      │
│  Q: Do I need to give you my Disney account login?                   │
│  A: No. Pixiedining never asks for your Disney username, password,   │
│     or any Disney account credentials. We monitor publicly           │
│     available dining availability data — no account access needed.   │
│                                                                      │
│  Q: What happens after I receive an alert?                           │
│  A: You get an email (or push notification, or SMS on Pro). Tap     │
│     the link, log into your own Disney account, and complete the     │
│     reservation yourself on Disney's official site.                  │
│                                                                      │
│  Q: What if someone else grabs the table first?                      │
│  A: We alert you the moment a slot appears — it's first-come,       │
│     first-served on Disney's end. Alerts can go to multiple users    │
│     monitoring the same restaurant. We cannot hold or reserve.       │
│                                                                      │
│  Q: Is there a refund if it doesn't work for my trip?               │
│  A: Pro has a 7-day full refund policy, no questions asked.          │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ "We'd been refreshing Be Our Guest every day for three weeks.│   │
│  │  Got the Pixiedining alert at 6am — it was ours 30 seconds   │   │
│  │  later."                          — Sarah K., Orlando family  │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                      │
│              [Start Your Free Alert Now]                             │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│  id=superfan-section                                                 │
│                                                                      │
│  FOR ANNUAL PASSHOLDERS AND FREQUENT VISITORS                       │
│                                                                      │
│  ┌────────────────────┬────────────────────┬────────────────────┐   │
│  │                    │ Free               │ Pro ($14.99/mo)    │   │
│  ├────────────────────┼────────────────────┼────────────────────┤   │
│  │ Polling cadence    │ Every 15 min       │ Every 2 min        │   │
│  │ Restaurants        │ 1                  │ Unlimited          │   │
│  │ Notifications      │ Email only         │ Email + Push + SMS │   │
│  │ Parks covered      │ 1 (WDW or DL)      │ WDW + Disneyland   │   │
│  │ Auto-resume        │ ✗                  │ ✓                  │   │
│  │ Multi-park bundle  │ ✗                  │ ✓                  │   │
│  └────────────────────┴────────────────────┴────────────────────┘   │
│                                                                      │
│  How Pixiedining compares                                            │
│                                                                      │
│  ┌──────────────────┬────────────────┬──────────────┬──────────┐   │
│  │                  │ Pixiedining Pro│ MouseDining  │ TP Finder│   │
│  ├──────────────────┼────────────────┼──────────────┼──────────┤   │
│  │ SMS alerts       │ ✓              │ ✗            │ ✗        │   │
│  │ WDW + Disneyland │ ✓              │ WDW only     │ WDW only │   │
│  │ Free tier        │ ✓              │ ✗            │ Limited  │   │
│  │ Pro polling      │ Every 2 min    │ ~5 min       │ ~5 min   │   │
│  │ Auto-resume      │ ✓              │ ✗            │ ✗        │   │
│  └──────────────────┴────────────────┴──────────────┴──────────┘   │
│                                                                      │
│  Note: Competitor data based on publicly stated features as of       │
│  January 2025. Subject to change.                                    │
│                                                                      │
│              [Start Annual Pro — $99/yr · Save 44%]                  │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│  id=pricing-section                                                  │
│                                                                      │
│  PLANS                                                               │
│                                                                      │
│  ┌────────────────────────────┐  ┌────────────────────────────────┐ │
│  │ FREE                       │  │ PRO                            │ │
│  │ $0                         │  │ $14.99 / month                 │ │
│  │                            │  │ or $99 / year (save 44%)       │ │
│  │ • 1 restaurant             │  │ • Unlimited restaurants        │ │
│  │ • Email alerts only        │  │ • Email + Push + SMS           │ │
│  │ • Check every 15 minutes   │  │ • Check every 2 minutes        │ │
│  │ • Walt Disney World        │  │ • WDW + Disneyland             │ │
│  │   or Disneyland (not both) │  │ • Multi-park bundles           │ │
│  │ • No auto-resume           │  │ • Auto-resume after alert      │ │
│  │                            │  │ • Priority support             │ │
│  │                            │  │                                │ │
│  │  [Start Free Alert]        │  │ [Upgrade to Pro]               │ │
│  │                            │  │                                │ │
│  │  No credit card required   │  │ 7-day refund guarantee         │ │
│  └────────────────────────────┘  └────────────────────────────────┘ │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌────────────────────┐  ┌──────────────────────┐  ┌─────────────┐ │
│  │ [Avatar]           │  │ [Avatar]             │  │ [Avatar]    │ │
│  │ "We got our        │  │ "Switched from       │  │ "Got Space  │ │
│  │ Topolino's         │  │ MouseDining. The     │  │ 220 on our  │ │
│  │ Terrace breakfast  │  │ SMS alert at 6:47am  │  │ first alert.│ │
│  │ after 6 weeks of   │  │ was the difference." │  │ Annual Pro  │ │
│  │ trying. Worth it." │  │  — M.R., Annual AP   │  │ for life."  │ │
│  │  — J.T., family    │  └──────────────────────┘  │  — L.S.    │ │
│  └────────────────────┘                             └─────────────┘ │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│  id=agency-section                                                   │
│                                                                      │
│  MANAGING DINING FOR MULTIPLE TRIPS OR CLIENTS?                     │
│                                                                      │
│  The Pixiedining Agency Plan gives Disney-specialized travel agents  │
│  and planners a multi-client monitoring dashboard, team seats, and   │
│  priority support. Used by agencies booking 20+ Disney dining        │
│  reservations per month.                                             │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ Your name     [ _________________________________ ]           │   │
│  │ Email         [ _________________________________ ]           │   │
│  │ Agency name   [ _________________________________ ]           │   │
│  │                                                               │   │
│  │               [ Request Agency Plan Info ]                    │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│ Not affiliated with The Walt Disney Company · Privacy · Terms       │
│ Support · © 2025 Pixiedining                                         │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Section 8: Responsive Behavior

```
DESKTOP (1440px — default):
  - Nav: full horizontal bar, logo left, links center-right
  - Hero: two-column split (left 55%: headline + subhead + trust badge +
    form fields + CTA + risk reducer; right 45%: sample alert preview)
  - Official handoff strip: full-width callout below hero columns
  - Trust strip: four-item horizontal row below hero
  - How it works: three-column card grid
  - Segment guide: three-column equal-width cards with anchor links
  - Coverage: accordion by park; restaurant names in 2-column grid within each
    park group; "View full list" expand
  - Family planner proof: single-column prose + blockquote
  - Superfan proof: full-width comparison tables side by side
  - Pricing: two-column side-by-side plan cards
  - Testimonials: three-column quote cards
  - Agency: single-column centered form (max-width 560px)
  - Footer: horizontal links row

TABLET (768px):
  - Nav: logo + 3 primary links (Coverage, Pricing, Log In) + hamburger for
    remaining
  - Hero: single column — headline + trust badge + form + CTA; sample alert
    preview moves below the form group, above the official handoff strip
  - Trust strip: 2×2 grid (two items per row)
  - How it works: three-column retained (fits 768px); cards compress slightly
  - Segment guide: three-column retained; card descriptions truncate to 1 line
  - Coverage: single-column accordion by park (lists expanded)
  - Superfan proof tables: full-width, scroll container if needed
  - Pricing: two-column retained
  - Testimonials: two-column
  - Agency: single-column form

MOBILE (390px):
  - Nav: logo + hamburger → full-screen drawer with all navigation links
  - Hero: single column
    Headline: scaled to ~1.875rem
    No-login trust badge: inline below headline, full-width
    Form fields: hidden behind full-width "Set My Alert Criteria" button →
      bottom-sheet drawer with restaurant autocomplete, date picker, party
      size stepper, notification channel selector
    Primary CTA: "Start Free Alert" full-width button
    Risk reducer: one line below CTA
    Official handoff strip: below CTA group, stacked
    Sample alert preview: below official handoff strip
  - Trust strip: horizontal scrolling pill row (no line breaks)
  - How it works: single-column stacked cards, numbered circles
  - Segment guide: single-column stacked — 3 cards full-width, each with
    segment name, 1-line description, and anchor link button
  - Coverage: single-column accordion collapsed by default; park headers
    expand to show restaurant list
  - Family planner proof: FAQ accordion — questions expand to reveal answers
  - Superfan proof: cadence/comparison tables use horizontal scroll container;
    table columns narrow; comparison vs. competitors shows 2 columns at a time
  - Pricing: single-column stacked — free card above Pro card; both full-width
  - Testimonials: single-column, stacked
  - Agency: single-column form, full-width inputs
  - Footer: stacked links

COMPONENT TRANSFORMS:
  Navigation: top bar → hamburger/drawer on mobile
  Free alert form: inline multi-field grid → single CTA button → bottom-sheet
    form on mobile (data-viewport transform)
  Comparison tables (superfan section): full-width → horizontal scroll
    container on mobile
  Coverage lists: expanded grouped list → collapsed accordion on mobile
  Segment guide: three-column → single-column on mobile
```

---

## Section 9: Interaction Notes

1. **Free alert form (desktop):** Inline multi-field form below the hero CTA button.
   Restaurant field: text autocomplete against monitored restaurant list.
   Date range: standard date picker (start/end trip dates).
   Party size: stepper (1–10).
   Notification channel: email or push (radio or toggle).
   Submitting begins account creation or redirects to signup flow.

2. **Free alert form (mobile):** The form fields are hidden behind a full-width
   "Start Free Alert" button which triggers a bottom-sheet or modal containing
   the same form fields. The primary CTA remains the dominant element in the
   first viewport without form complexity cluttering mobile.

3. **Sample alert preview:** Static by default. If interactivity is added
   post-wireframe, it could toggle between email preview and push notification
   preview. The wireframe shows only the static state.

4. **Segment guide cards:** Plain anchor-link scroll to the corresponding
   depth section on the same page. No page navigation, no modal, no JS
   requirement beyond scroll behavior. Card clicks jump to:
     Card 1 → #family-planner-section
     Card 2 → #superfan-section
     Card 3 → #agency-section

5. **Coverage section:** "View full coverage list" expands an accordion showing
   all monitored restaurants. On mobile, park groups are collapsed by default
   and expand on tap. No search interaction in the wireframe.

6. **Family planner proof FAQ:** On mobile, FAQ items collapse to question-only
   with chevron expand. On desktop, all answers visible.

7. **Pro upgrade CTA in superfan section:** Links directly to Stripe checkout
   pre-selected on annual plan.

8. **Agency inquiry form:** Submits to a contact/CRM endpoint, not Stripe.
   No payment step.

9. **No carousels, auto-advancing sliders, or hover-only interactions.**
   All content is accessible without hover states (mobile safety).

---

## Section 10: Content Direction

```
OVERALL TONE:
  Warm, practical, and specific. The voice of a knowledgeable Disney trip
  veteran who genuinely wants to help. Not magical or child-targeted.
  Not clinical SaaS. Not affiliate-scammy. Concrete about what Pixiedining
  does (monitors, alerts) and specifically does not do (book, guarantee, log in).
  No superlatives without evidence. No guarantee language anywhere.

SECTION-BY-SECTION:

Hero headline:
  Emotional register: Direct, problem-naming, slightly urgent.
  Must name the specific problem: Disney dining cancellations.
  Must imply speed and real-time alerting.
  Target: 10-14 words.
  Must NOT say "dream dining," "magical reservation," or anything that
  echoes Disney's own marketing.
  Sample: "Watch Disney dining cancellations. Get alerted the second your
  table opens."

Hero subhead:
  Emotional register: Reassuring, specific.
  Key message: monitoring → alert → book on Disney.com.
  Include "official site" language. ~25-30 words.
  Sample: "Pixiedining monitors Disney dining availability and sends a
  real-time alert the moment a slot opens — you tap the link and complete
  the booking on Disney's official reservation site."

No-login trust:
  Very short. One line. Must include "Disney account" and a negative
  ("never," "no," "never asks for").
  Sample: "Never requires your Disney account or password."
  Pair with a lock icon or shield icon.

Official handoff strip:
  One sentence. Must include "Disney's official" + "you complete" or
  "you book." Must not say "we will book" or "we secure."
  Sample: "When an opening appears, we alert you instantly — then you
  complete the booking on Disney's official reservation site yourself."

How it works steps:
  Step 1 (Set criteria): 2-3 sentences. Mention restaurant, dates,
    party size, notification channel. Warm and simple.
  Step 2 (We monitor): 2-3 sentences. Mention availability monitoring,
    frequency, 24/7, no action needed. No cadence number here (belongs in
    superfan section).
  Step 3 (Act on alert): 2-3 sentences. Must name "Disney's official site."
    Must say "you book" not "you get." "It's first-come, first-served on
    Disney's end" can appear here to set expectations.

Segment guide:
  Section headline: "Which kind of Disney planner are you?" (direct,
    non-judgmental, inclusive of all three)
  Card 1 (Family planner): Warm, reassuring tone. Mention safety and ease.
    "New to dining alerts? Find out if Pixiedining is right for your trip."
  Card 2 (Superfan/AP): Direct, technical-leaning. "Annual Passholder or
    frequent visitor? See how Pixiedining's polling speed and coverage
    compare."
  Card 3 (Agent): Professional, brief. "Booking for multiple client trips?
    The Agency Plan gives you multi-client monitoring."

Coverage:
  Section headline: "Restaurants we monitor" (not "we cover everything")
  Include specific restaurant names for search-intent alignment.
  Add a total count: "60+ restaurants across Walt Disney World and
  Disneyland" — honest and credible.
  Do not use Disney's official logo or trademarks beyond restaurant names
  for identification.

Family planner proof block:
  Section headline: "Is it safe? Common questions from first-time users."
  FAQ items: plain language, honest answers. No legal jargon.
  Include FAQ on: Disney login (no), what happens after alert (you book),
  what if someone else grabs it first (first-come, first-served — honest),
  refund policy (7-day Pro).
  Success quote: specific, realistic. Name a restaurant. No guarantee.
  "We got our Be Our Guest reservation after three weeks of trying" is
  good. "We guaranteed a table" is not.

Superfan proof block:
  Section headline: "For Annual Passholders and frequent visitors."
  No intro copy — go straight to the comparison table.
  Table note: "Competitor data based on publicly stated features as of
  [date]. Subject to change." — honest and legally safe.

Pricing:
  No tier names beyond "Free" and "Pro."
  Free: "$0 · No credit card required"
  Pro: "$14.99/month or $99/year · Save 44%"
  Feature lists: specific, concrete, comparison-ready.
  Risk reducer on Pro: "7-day refund guarantee."

Testimonials:
  1-3 sentences each. Specific restaurant named. Realistic framing.
  No "it worked every time" language.
  Attribution: first name + last initial + brief context (family, AP, etc.)

Agency section:
  Headline: "Managing dining for multiple trips or clients?"
  1-2 sentences about the agency use case: multi-client, monthly volume.
  No pricing in this section — inquiry-only.

Footer non-affiliation:
  MANDATORY: "Not affiliated with The Walt Disney Company or its
  subsidiaries. Pixiedining is an independent service. Walt Disney World,
  Disneyland, and all restaurant names mentioned are trademarks of
  The Walt Disney Company."
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
- Hero headline must be visible before scroll, positioned in the upper
  left quadrant of the content area, after the nav bar.
- No-login trust badge (#no-login-trust) must be visible before scroll,
  positioned within 2 visual rows of the hero headline.
- Free alert CTA button (#primary-action) must be visible before scroll.
- Free alert form fields or their container must be visible before scroll.
- Sample alert preview must be visible in the right column before scroll.
- Risk reducer text ("No credit card required") must be visible before scroll.
- Official handoff strip (#official-handoff) must be visible before scroll
  or visible as an immediate sub-section that does not require more than a
  minor scroll (< 1 viewport height below hero fold).
- Nothing outside the hero group should visually compete with the hero
  headline and primary CTA in the first viewport.
- The segment guide must NOT appear in the first viewport.

FIRST VIEWPORT (mobile, 390x844):
- Hero headline must be fully visible before scroll.
- No-login trust badge (#no-login-trust) must be visible before scroll,
  inline below or immediately adjacent to the headline.
- Free alert CTA button (#primary-action) must be full-width and visible
  before scroll.
- Risk reducer text visible before scroll (may be very compact).
- Segment guide must NOT appear above the fold on mobile.
- Sample alert preview may appear below the fold; it need not be visible
  before scroll on mobile.
```

### 11C: Layout Constraints

```
LAYOUT:
- Desktop: Two-column hero (content left ~55%, alert preview right ~45%).
  All sections below hero: single full-width section with max-width container.
- How it works: 3-column grid at desktop and tablet (768px+).
  Single column stack on mobile.
- Segment guide: 3-column equal cards at desktop and tablet.
  Single column on mobile. Family planner card may have slightly greater
  visual weight than the agent card (border emphasis or padding).
- Coverage: accordion grouped by park at all breakpoints.
  2-column restaurant name grid within each park on desktop.
  Single-column list on mobile.
- Superfan proof tables: full-width with defined column widths.
  Horizontal scroll container on mobile (never truncated).
- Pricing: 2-column side-by-side cards at desktop and tablet.
  Single column stacked (free above pro) on mobile.
- Agency inquiry form: centered, max-width 560px at all breakpoints.
- Hero form fields: inline multi-field at desktop.
  Hidden behind primary CTA → bottom-sheet on mobile.

HIERARCHY ENFORCEMENT:
- The free alert CTA (#primary-action) must be the most visually dominant
  button on the page in every viewport.
- The Pro upgrade CTA (#pro-upgrade-cta) must be visually secondary to
  the free alert CTA.
- The agency inquiry form submit must be visually tertiary compared to
  both primary and pro CTAs.
- The family-planner-proof-block and superfan-proof-block must have equal
  section-level visual weight — neither dominates the other.
- The agency-inquiry-section must not gain comparable visual dominance
  to the pricing-section.
```

### 11D: Density & Rhythm

```
DENSITY:
- Mode: moderate hybrid (marketing warmth + task utility density)
- Hero section: generous whitespace around headline group;
  form fields compact within their container but not cramped.
- Official handoff strip: compact callout — single sentence, no excess padding.
- Trust strip: compact — 4 items, low height, ambient.
- How it works: moderate — cards have comfortable internal padding;
  section has generous top/bottom margin.
- Segment guide: moderate — cards have comfortable padding, 3 items
  scannable without crowding.
- Coverage: compact — restaurant names list-style, park headers slightly
  larger; readable without generous spacing.
- Family planner proof: moderate — FAQ items clearly spaced; blockquote
  has offset left margin for visual distinction.
- Superfan proof: compact-dense — tables use tight row height matching
  expert-tool expectations; no excess whitespace between rows.
- Pricing: moderate — plan cards have comfortable padding, feature list
  readable, enough whitespace to feel considered.
- Testimonials: compact — quote cards, not oversized.
- Agency inquiry: moderate — form fields have standard input height.
- Footer: compact.

Major sections separated by generous vertical spacing (visible breathing
room between thematic blocks; sections should feel distinct, not merged).
Repeated items within sections (FAQ lines, restaurant names, table rows)
use compact spacing.
The primary action zone (hero form + CTA) must have enough surrounding
whitespace that the CTA does not feel visually crowded.
```

### 11E: Required Stable Selectors

```
REQUIRED SELECTORS:
- #page-root
- #primary-section        (hero section)
- #primary-action         (free alert CTA button)
- #no-login-trust         (no Disney account required statement)
- #official-handoff       (official site booking handoff strip)
- #trust-strip            (compact legitimacy cluster below hero)
- #how-it-works           (3-step how it works section)
- #segment-guide          (audience self-selection section)
- #family-planner-section (Segment A depth: FAQ + quotes)
- #superfan-section       (Segment B depth: cadence + comparison tables)
- #coverage-section       (restaurant coverage list)
- #pricing-section        (Free vs. Pro pricing comparison)
- #pro-upgrade-cta        (Pro subscription upgrade button)
- #agency-section         (travel agent inquiry form)
- #footer                 (footer with non-affiliation disclaimer)
```

### 11F: Non-Negotiables

- The no-login trust statement (#no-login-trust) must appear in the hero
  section (#primary-section), within visual proximity to the primary CTA.
- The official handoff explanation (#official-handoff) must appear in or
  immediately adjacent to the hero section.
- The free alert CTA (#primary-action) must be the most visually prominent
  button on the page at every viewport width.
- The Pro upgrade CTA (#pro-upgrade-cta) must be visually secondary to
  #primary-action.
- The agency inquiry section (#agency-section) must appear below the pricing
  section (#pricing-section) in the document order and visual sequence.
- No language implying guaranteed reservations, automatic booking, or Disney
  account access anywhere on the page.
- The footer (#footer) must include a non-affiliation disclaimer naming
  The Walt Disney Company.
- The segment guide (#segment-guide) must not appear above the how-it-works
  section (#how-it-works) in the document order.

### 11G: Allowed Variation

- The sample alert preview can be positioned to the right of the hero form
  (desktop two-column) or below (single-column tablet/mobile) — both are
  acceptable as long as it is visible somewhere in the first viewport group
  on desktop.
- The official handoff strip can be styled as a banner, callout box, or
  inline text — any format is acceptable as long as it is in the hero section
  or immediately below it.
- Coverage section park order can be reordered by prominence or user traffic
  data (e.g., EPCOT first if Space 220 drives the most search volume).
- Segment guide cards can use iconography or color-coded borders to visually
  differentiate segments — visual treatment is downstream.
- Testimonial count can range from 2 to 4.
- The "View full coverage list" interaction can be an accordion, a modal, or
  a dedicated page — the wireframe shows accordion.
- Trust strip item ordering can vary based on which credibility signals are
  best substantiated at launch.

### 11H: Not Allowed

- Segment guide section appearing above or inside the hero section.
- Agency language ("multi-client," "team seats," "per-trip management") in
  the hero or how-it-works sections.
- Carousels, auto-advancing sliders, or auto-playing video.
- Pro CTA as the primary or equal-weight CTA in the hero section.
- Coverage list appearing above the how-it-works section.
- Guarantee language in any CTA, headline, subhead, or feature description
  ("Get your table," "Guaranteed booking," "We secure your reservation").
- Disney logo, castle imagery, or official Mickey Mouse ears as the primary
  visual identity element.
- Any form field requesting a Disney account username or password.
- The agency inquiry form appearing with Stripe checkout language or
  suggesting payment is required to inquire.

---

## Section 12: HTML Wireframe Artifact

```
HTML WIREFRAME ARTIFACT:
  File: wireframe.segment-self-selection-strategy.html
  Components: 22 (matching Section 6 component inventory)
  Selectors: 15 (matching Section 11E required selectors)
  Status: written
```
