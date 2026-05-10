# UI Spec — Pixiedining — Workflow-First Reservation Rescue Strategy

---

## Section 1: Page Classification

```
TYPE: hybrid (marketing dominant)
```

The page is primarily marketing — it must convert pre-purchase visitors into free-alert signups and Pro subscribers. The embedded alert-setup widget introduces a light internal-tool pattern (form entry, restaurant search, date picker), but it serves conversion, not session management. Marketing principles govern density, trust-sequencing, and persuasion structure. The internal-tool widget is a focused action island within that marketing shell.

---

## Section 2: Intake Summary

```
PURPOSE: Convert visitors into paying and free users for two outcomes —
  (a) free single-restaurant alert signup (primary conversion),
  (b) Pro subscription at $14.99/mo or $99/yr (secondary conversion).
  Establish credibility quickly because users distrust third-party Disney
  reservation tools. Emotionally reassure users who face once-a-year trip
  anxiety over missed dining reservations.

AUDIENCE: Three segments that should self-select.
  Segment A — One-trip family planner: Knows the 60-day window; has tried
    refreshing. Decides in under 2 minutes whether the service is legitimate.
    Needs: no-login trust, sample proof, refund guarantee. Likely starts free.
  Segment B — Disney superfan / Annual Passholder: Expert. Compares
    competitor tools. Evaluates polling cadence, coverage breadth, SMS
    support, alert latency. Will pay annual if convinced of superiority.
  Segment C — Travel agent / planner: Expert. Needs multi-client management,
    reliability, and an agency tier inquiry path before paying.

CONTEXT: Standalone marketing landing page at pixiedining.com root.
  Entry: paid search, Reddit r/WaltDisneyWorld referrals, TikTok discovery.
  Exit: free alert signup flow (primary), Stripe Pro checkout (secondary),
    travel agent contact form (tertiary).
  Journey stage: SELLING. Pre-purchase. Trust establishment and emotional
    reassurance are the primary conversion blockers.

KEY ACTIONS:
  1. PRIMARY — Start a free single-restaurant alert (enter restaurant +
     trip dates + party size + notification channel).
  2. SECONDARY — Upgrade to Pro for unlimited restaurants, SMS + push,
     faster polling, auto-resume, multi-park bundles.
  3. TERTIARY — Explore coverage list, view sample alert, or submit a
     travel agent plan inquiry.
```

---

## Section 3: Flow Map

```
FLOW: Single page (standalone) — pixiedining.com

Entry sources:
  [Paid search]  [Reddit r/WDW]  [TikTok discovery]
         ↓              ↓               ↓
  ┌─────────────────────────────────────────┐
  │        pixiedining.com (this page)      │
  └─────────────────────────────────────────┘
         ↓              ↓               ↓
  [Free alert    [Pro Stripe     [Travel agent
   signup flow]   checkout]       inquiry form]
         ↓              ↓               ↓
  [Alert active] [Subscription  [Sales contact]
                  active]
```

---

## Section 4: Decision Map

### 4A: User Decision Sequence

```
PAGE LEVEL:
  User's first question: "Can this service safely watch for the Disney
    dining cancellation I care about, and will it alert me fast enough
    to actually get the table?"
  Resolved by: Hero headline (names the problem), hero trust trio
    (no-login signal, official-site handoff), alert widget (immediate
    free path), proof bar (credibility volume).

SECTION LEVEL (scanning questions):
  "Is this legitimate and safe?" →
    Resolved by: trust-trio in hero, trust safety section,
    no-login pillar, payment logos.

  "How does this actually work?" →
    Resolved by: workflow section (5-step visual sequence confirming
    mental model AFTER the CTA is visible, not before it).

  "What will I actually receive?" →
    Resolved by: sample alert mockup (tangible preview of the notification).

  "Is my restaurant covered?" →
    Resolved by: proof bar (named restaurants), coverage section
    (200+ restaurants, park filter).

  "Should I start free or pay now?" →
    Resolved by: plan comparison (explicit tier table with concrete
    feature delta and pricing).

  "Is this right for my specific situation?" →
    Resolved by: segment callouts (families / passholders / agents).

COMPONENT LEVEL:
  Click-vs-skip decision (alert widget):
    "Should I fill this in now or keep reading?"
    Resolved by: Inline risk reducer ("Free. No credit card.") placed
    directly below the primary CTA removes the commitment barrier before
    the user hesitates.

  Click-vs-skip decision (Pro CTA):
    "Is $14.99/mo worth it for my trip?"
    Resolved by: Plan comparison table listing specific Pro advantages
    (faster polling cadence number, SMS, unlimited count, auto-resume)
    in plain language, adjacent to free tier for direct comparison.
```

### 4B: Asset and Evidence Inference

```
PRODUCT / OUTPUT ASSETS:
  — Real-time availability alerts (push, SMS, email) tied to specific
    restaurant + date + party-size criteria.
  — Continuous polling of Disney's official availability feed.
  — Alert notification with direct link to Disney's reservation page.
  — Free tier: 1 restaurant, email, standard cadence.
  — Pro tier: unlimited restaurants, SMS + push + email, faster cadence,
    multi-park bundles, auto-resume.
  — Agency tier: multi-client management (inquiry-gated).

PROOF ASSETS:
  — Alert volume counter (e.g., "47,000+ alerts sent this year").
  — Named restaurant coverage list (Be Our Guest, Cinderella's Royal
    Table, Space 220, Topolino's Terrace, Storybook Dining, etc.).
  — Sample alert notification mockup (phone notification preview).
  — User success stories with realistic framing (named restaurant,
    realistic timeline, outcome — not guarantee language).
  — Polling cadence specification (30s Pro / 90s free) as concrete
    technical proof rather than vague "fastest" claims.

CONVERSION ASSETS:
  — Free alert: no credit card, no commitment, instant setup.
  — Pro pricing transparency: $14.99/mo or $99/yr (saves 44%).
  — Refund guarantee (terms TBD) named as trust signal near Pro CTA.
  — Payment processor logos (Stripe badge) near checkout.
  — Support contact link near pricing.

NAVIGATION / SELF-SELECTION ASSETS:
  — Segment callout cards (families / passholders / agents) in mid-page.
  — Coverage filter (WDW / DLR tabs) for restaurant-specific searchers.
  — FAQ section for objection handling.
  — Travel agent inquiry link in segment card and footer.

ACTION VS SIGNAL CLASSIFICATION:
  Actions:
    — Alert widget form entry (restaurant, dates, party size, channel)
    — "Start Free Alert" button
    — "Get Pro" button / annual link
    — "Contact us about agency plans" link
    — FAQ accordion items
    — Coverage filter tabs

  Signals:
    — Hero trust trio bullets (no-login, official site, cadence)
    — Sample alert mockup
    — Proof bar (alert count + restaurant name strip)
    — Workflow 5-step diagram
    — Trust safety pillars (3 cards)
    — Coverage restaurant list
    — Plan comparison table (feature-level delta)
    — Success stories (realistic)
    — Segment callout cards
    — Footer disclaimer (non-affiliation)
    — Payment logos
```

### 4C: Strategy Defense (Search Mode)

```
ASSIGNED STRATEGY: workflow-first-reservation-rescue-strategy

WHY THIS STRATEGY FITS THIS INTAKE:
  The Pixiedining product has an inherent sequential logic that maps
  perfectly to a workflow presentation: Disney closes bookings at 60 days
  → cancellations trickle back unpredictably → user misses them by seconds
  → Pixiedining monitors → alert fires → user books on Disney's site. This
  sequence answers all three primary user objections simultaneously: "Is
  this legitimate?" (no-login in step 2), "Will it work?" (continuous
  polling in step 3), and "What do I actually do?" (official handoff in
  step 5). For Segment A (family planners unfamiliar with third-party
  alert tools), establishing mental model clarity reduces the trust gap
  that is the stated primary conversion blocker. The workflow is not
  explanatory padding — it is the trust mechanism. However, the strategy's
  main risk (over-explanation before action) is real and must be managed.

LOCAL OPTIMUM THIS STRATEGY RISKS:
  A numbered "How It Works" section that reads like a product manual,
  placed BEFORE the primary CTA, requiring users to absorb 4–5 steps
  before they can begin the free alert. This produces comprehension but
  kills urgency and abandons users who arrived ready to act. It is the
  canonical workflow-first failure: the page teaches rather than converts.

HOW THIS DESIGN AVOIDS THAT LOCAL OPTIMUM:
  The free alert widget and primary CTA are placed in the HERO, above
  the workflow section. The workflow section appears BELOW the fold as
  a confirmation and trust layer — it answers "what happens after I set
  up my alert?" rather than "what must I understand before I can act?"
  Users who are ready to act (Segment B experts, high-intent search
  traffic) can go straight to the hero widget and never scroll through
  the workflow. Users who need to understand first (Segment A planners,
  TikTok discovery traffic) get the workflow as reassurance, with the
  CTA still accessible. The workflow diagram includes an inline reference
  ("You already set this up above ↑") at step 2, reinforcing that action
  and understanding are parallel, not sequential.

REFERENCE CALIBRATION:
  No external reference pack provided. General-knowledge calibration:
  — Strong family resemblance to high-trust consumer SaaS landing pages
    that lead with an embedded utility form (weather alert apps, flight
    price trackers, parking reservation finders) — immediate task entry
    with credibility proof adjacent, not preceding.
  — Deliberately diverges from generic three-card SaaS "How It Works"
    patterns that use abstract icons and category copy without Disney-
    specific restaurant names, timing data, or sample output.
  — Independent structural answer compared to pure action-first layouts
    that hide the workflow entirely and rely on pure CTA prominence —
    the workflow here is load-bearing trust infrastructure, not a
    secondary "learn more" section.

STRATEGIC DIAGNOSIS MAPPING:
  - Strategic axis: functional_immediacy: high → Alert widget embedded
    in hero; restaurant + date + party size form visible without scroll.
  - Strategic axis: trust_burden: high → Trust trio inline with CTA;
    trust safety section immediately below the fold; no-login language
    in hero and trust pillar.
  - Strategic axis: audience_sophistication: mixed → Workflow section
    serves Segment A comprehension; coverage detail + polling cadence
    serve Segment B expert validation; segment callout cards provide
    three-way self-selection for all segments.
  - Strategic axis: visual_posture: polished_utility → Embedded form
    card is clean and task-focused; overall page uses generous spacing
    but avoids decorative whimsy in favor of concrete proof elements.
  - Strategic axis: content_depth: layered → First viewport: task +
    trust. Below fold: workflow + safety + sample. Mid-page: coverage +
    pricing + segments. Lower page: social proof + FAQ.
  - Decision sequence step 1 (product category + parks/restaurants
    covered + free path) → Hero headline + alert widget + proof bar.
  - Decision sequence step 2 (safety / no-login) → Hero trust trio +
    trust safety section (no-login pillar).
  - Decision sequence step 3 (alert speed) → Hero trust trio cadence
    bullet + workflow step 3 (polling interval) + plan comparison.
  - Decision sequence step 4 (free vs Pro) → Plan comparison section.
  - Decision sequence step 5 (specialized use cases) → Segment callouts
    + coverage section + FAQ items.
  - Business goal (free alert signup) → Primary CTA in hero widget.
  - Business goal (Pro conversion) → Secondary CTA in plan comparison.
  - Business goal (agency inquiry) → Tertiary card in segment callouts.

FIRST VIEWPORT OBLIGATION:
  The diagnosis requires: product category, free alert action, no-login
  trust signal, official Disney booking handoff, and at least one proof
  cue in the first viewport.

  Desktop first-fold components satisfying this:
    — nav-bar (wayfinding context)
    — hero-headline ("Missed [Be Our Guest]? We'll alert you the moment
      a cancellation opens.") — product category + problem frame
    — hero-subhead (one-sentence product description + "no Disney login")
    — hero-trust-trio (No Disney login · You book on Disney's site ·
      Alerts every 30–90s) — trust signals + handoff clarification
    — alert-widget (restaurant + dates + party size + CTA) — free alert
      action immediately visible and actionable
    — hero-risk-reducer ("Free for 1 restaurant. No credit card.") —
      commitment reduction
    — hero-sample-preview (small alert notification preview) — proof cue

  Mobile first-fold components satisfying this:
    — hero-headline (stacked, full width)
    — hero-subhead (short version)
    — trust-badge-strip (compact: "No Disney login" + "You book on
      Disney's site" as 2-chip horizontal strip)
    — alert-widget (restaurant input first, below the fold peek visible
      showing date + party inputs to signal more below)
    — primary-cta-button visible on first scroll stop

HARD FLOOR COVERAGE:
  - hf_free_alert_visible → alert-widget (#alert-widget) and
    primary-cta-button (#primary-action) are in the hero section
    (#primary-section), visible without scrolling on desktop. On mobile,
    restaurant input is visible; CTA is one thumb-scroll away.
  - hf_no_login_trust → trust trio bullet "No Disney login required"
    appears inline in the hero left column. Repeated as full pillar in
    trust-safety-section (#trust-section). Available without scrolling
    on desktop.
  - hf_no_guaranteed_booking → All copy uses alert/notification language
    ("alert you," "notify you," "you book on Disney's site"). "Get your
    table" and "book for you" language is absent. The official-handoff
    pillar explicitly states "We alert; you book."
  - hf_official_handoff → workflow-step-booking (step 5 in workflow
    section) and trust-official-handoff pillar both state plainly that
    users complete booking through Disney's official reservation system.
    Footer disclaimer reinforces non-affiliation.
  - hf_segment_self_selection → segment-callouts (#segment-callouts)
    provides three distinct cards for families, passholders, and agents.
    Coverage section serves search-intent users. Pricing section serves
    comparison-minded Segment B.
  - hf_mobile_first_task → Mobile layout stacks hero headline → trust
    badges → alert widget (restaurant visible, date + party below) →
    CTA. Trust and action are preserved in first two screens on mobile.
  - hf_pro_value_specificity → plan-comparison (#plan-comparison)
    lists concrete Pro advantages: unlimited restaurants, SMS + push +
    email, 30s polling (vs 90s free), multi-park bundles, auto-resume,
    priority support. $14.99/mo and $99/yr prices are explicit.

ANTI-PATTERN AVOIDANCE:
  - ap_magic_before_task → Hero opens with a specific problem statement
    naming actual Disney dining context ("Missed [Be Our Guest]?"), not
    vacation mood copy. Alert widget is in the hero, not below a
    storytelling section.
  - ap_disney_clone_branding → No castle imagery, no Disney font
    imitation, no "official" language. Color palette is warm but
    independent. Footer disclaimer makes non-affiliation explicit.
  - ap_unsupported_speed_claims → Polling cadence is stated as specific
    numbers (30s Pro / 90s free) rather than "fastest" or "instant."
    Sample alert shows a realistic notification, not a guaranteed outcome.
  - ap_hidden_safety_model → No-login language appears in the hero
    (trust trio bullet) and in the trust section (full pillar). It is
    visible without scrolling on desktop.
  - ap_generic_saas_grid → Benefits reference specific Disney
    restaurants by name, cite actual cadence intervals, and include a
    sample alert mockup. Coverage list names Be Our Guest, Cinderella's
    Royal Table, Space 220, Topolino's Terrace, Storybook Dining.
  - ap_pro_overpush → Pro CTA appears in the plan comparison section,
    which follows the workflow, trust, sample alert, and coverage
    sections. The first visible CTA is always "Start Free Alert."
  - ap_agent_path_confusion → Agent content is confined to a single
    tertiary card in the segment-callouts section and a footer link.
    It does not appear in the hero or workflow sections.
  - ap_guarantee_language → CTA copy: "Start Free Alert." Proof copy:
    "47,000+ alerts sent." Outcome copy: "We alert; you book on
    Disney's site." No "get your table," "reserve now," or "guaranteed."
```

### 4D: Component Justification

| Component | User Lens | Business Lens | Verdict |
|-----------|-----------|---------------|---------|
| nav-bar | Wayfinding: Coverage, Pricing, How It Works links let users jump to what they need | Keeps branding visible; Login link for returning users | Include — minimal height, no competing CTAs |
| hero-headline | Names the exact problem ("Missed [Be Our Guest]?") so users recognize themselves immediately | Hooks the right audience; Disney restaurant names improve search relevance | Include — the page's primary hook |
| hero-subhead | One sentence describing the product and no-login promise | Provides category clarity for cold traffic | Include — must stay under 25 words |
| hero-trust-trio | Three inline bullets resolving top three objections before the user has to ask | Removes conversion friction at the precise moment of first CTA consideration | Include — placed left of the widget, scannable |
| alert-widget | Immediate task entry for users arriving with intent | Primary conversion driver; reduces steps to free signup | Include — centerpiece of hero right column |
| primary-cta-button | Clear next action with no ambiguity | Direct entry to signup flow | Include — "Start Free Alert →" |
| hero-risk-reducer | Eliminates the "do I have to pay?" hesitation | Reduces signup abandonment before payment concern arises | Include — one line below the CTA |
| hero-sample-preview | Makes the product tangible before commitment | Reduces "what will I get?" uncertainty that delays free signups | Include — compact, below trust trio |
| proof-bar | Establishes scale and restaurant coverage at a glance | Credibility signal for skeptical cold traffic; covers breadth | Include — scrolling strip below hero |
| workflow-section | Explains the 5-step sequence for Segment A; confirms the mental model for Segment B | Reduces support burden; reduces churn from misaligned expectations | Include — after the fold, not before the CTA |
| workflow-step-problem | Validates the user's frustration as a known, solvable problem | Emotional hook; positions the product as the solution to a real gap | Include — step 1 |
| workflow-step-criteria | Confirms what they just did in the hero widget | Connects the CTA action to the mental model | Include — step 2, with "↑ set above" note |
| workflow-step-monitoring | States the core mechanism: continuous polling | Provides technical proof for Segment B; builds realistic expectations for Segment A | Include — step 3, with cadence stated |
| workflow-step-alert | Shows what the alert looks like | Makes the product promise concrete | Include — step 4 |
| workflow-step-booking | Official Disney handoff clarification | Satisfies hf_official_handoff; removes "does it book for me?" concern | Include — step 5 |
| trust-section | Three-pillar trust architecture | Converts high-skepticism visitors who scrolled past the hero without signing up | Include — immediately below workflow |
| trust-no-login | Most critical safety signal for Segment A | Resolves the largest stated conversion blocker | Include — pillar 1 |
| trust-official-handoff | Clarifies role boundary | Satisfies hf_official_handoff; prevents guaranteed-booking misreading | Include — pillar 2 |
| trust-real-team | Legitimacy proof (payment logos, support link, refund note) | Reduces payment hesitation near the Pro section | Include — pillar 3, tertiary weight |
| sample-alert-section | Makes the product output visible | Proof of concept; reduces "is this real?" doubt | Include — after trust pillars |
| coverage-section | Validates that target restaurants are monitored | Handles search-intent traffic and Segment B validation | Include — with park filter and named list |
| plan-comparison | Free vs Pro explicit feature delta | Primary mechanism for paid conversion | Include — concrete, no vague descriptors |
| segment-callouts | Three audience paths for self-selection | Prevents single-message dilution across three very different segments | Include — post-pricing, tertiary weight |
| success-stories | Realistic social proof from real use cases | Builds trust for hesitant visitors still in consideration | Include — specific restaurant + outcome framing |
| faq-section | Preemptive objection handling | Reduces support load and addresses non-affiliation / no-booking concerns | Include — accordion, tertiary weight |
| final-cta-bar | Bottom-of-page re-entry to conversion | Re-captures users who read fully but didn't act at the hero | Include — "Still need that table?" |
| footer-nav | Standard navigation + legal | Required for credibility and legal compliance | Include — includes disclaimer |
| footer-disclaimer | Non-affiliation statement | Satisfies ap_disney_clone_branding avoidance; legal protection | Include — visible but non-dominant |

### 4E: Tension Map

```
TENSION: Alert widget in hero vs. trust establishment
  Business pull: Get users to start the form immediately — every extra
    step before the CTA increases abandonment.
  User pull: Segment A must verify legitimacy before entering any
    personal information (email, phone).
  Resolution: Split-hero layout. Left column: headline + trust trio +
    sample preview (establishes legitimacy in 5 seconds of scanning).
    Right column: alert widget (ready to receive input from users who
    feel ready after the left-column scan). Trust and action are
    co-located, not sequential.

TENSION: Workflow section depth vs. conversion urgency
  Business pull: Keep users moving toward the CTA; every additional
    explanation creates a reason to pause or leave.
  User pull: Segment A genuinely does not know how cancellation
    monitoring works and needs the mental model before trusting the
    service.
  Resolution: Workflow appears BELOW the fold as post-CTA reinforcement,
    not as a prerequisite gate. The widget reference ("You set your
    criteria in the form above ↑") at Step 2 confirms that action and
    understanding are parallel, converting the workflow from a blocker
    into a reward for users who scroll.

TENSION: Segment B expert detail vs. Segment A simplicity
  Business pull: Both segments are valuable; neither should be alienated.
  User pull: Superfans want polling cadence, coverage breadth, SMS specs,
    and comparison data. Family planners want reassurance and simplicity.
  Resolution: Layered content depth. First viewport: simple language.
    Workflow section: plain process steps. Coverage section: named
    restaurants for both experts (validation) and planners (recognition).
    Plan comparison: cadence numbers, channel list, and feature names are
    specific enough for Segment B without being jargon-heavy for Segment A.
    Segment callouts: explicit "For Annual Passholders" card validates
    expert users without dominating the primary family-planner path.

TENSION: Agency tier visibility vs. primary path dilution
  Business pull: Travel agents represent high LTV; they need a clear
    path.
  User pull: Family planners are the volume conversion target; agency
    messaging can confuse or alienate them.
  Resolution: Agency path is confined to a tertiary segment callout
    card and a footer link. Agency copy does not appear in the hero,
    workflow, or trust sections. The card uses inquiry-gated language
    ("Contact us") rather than a direct CTA that could dilute the
    "Start Free Alert" primary action.

TENSION: Disney brand recognition vs. non-affiliation requirement
  Business pull: Naming Disney restaurants directly (Be Our Guest,
    Space 220) drives search relevance and user recognition.
  User pull: The service must not imply official affiliation, which
    would be misleading and potentially legally problematic.
  Resolution: Restaurant names appear as covered venues, not as
    endorsements. Copy is always framed as "we monitor" / "check
    availability at" rather than "official partner of" or "powered by
    Disney." Footer disclaimer makes non-affiliation explicit.
```

---

## Section 5: Visual Hierarchy Map

```
PRIMARY (dominant visual weight — first to be seen):
  1. Hero headline — Largest text on page; names the exact problem.
     Seen first in every viewport. Anchors the page's purpose.
  2. Alert widget — The highest-density action island; bordered card
     with form inputs and the primary CTA button. Visual weight from
     box boundary, size, and isolation against the hero background.
  3. Primary CTA button ("Start Free Alert →") — Filled, high-contrast
     button inside the widget. Visual weight from fill and proximity
     to the inputs that precede it.
  4. Plan comparison section — Two-column feature table with CTA buttons.
     Primary weight in its section; competes only with itself.

SECONDARY (supporting, moderate visual weight):
  5. Hero subhead — Supports the headline; shorter, lower weight.
  6. Hero trust trio — Three scannable bullets; moderate weight from
     check-mark prefix and placement adjacent to the widget.
  7. Proof bar — Full-width strip; moderate weight from scrolling
     restaurant names and alert count.
  8. Workflow section — 5-step horizontal diagram; moderate weight from
     numbered sequence and directional connectors.
  9. Trust safety section — 3-card grid; moderate weight from card
     boundaries and section headline.
  10. Sample alert mockup — Phone notification frame; moderate weight
      from visual distinctiveness of the mockup format.
  11. Coverage section — Named list with park filter; moderate weight
      for Segment B users scanning for their restaurant.
  12. Segment callout cards — 3-card row; moderate weight from card
      boundaries; lower than plan comparison.
  13. Success stories — 3-quote grid; moderate weight from attribution.
  14. Final CTA bar — Repeats primary action; secondary weight from
      repetition and stripped-down format.

TERTIARY (present but recessive — structural or utility):
  15. Nav bar — Wayfinding; tertiary weight from reduced height and muted links.
  16. Hero risk reducer — Small text below CTA; deliberately low-weight.
  17. Coverage park filter — Utility tabs; low weight.
  18. Plan annual note — Fine print below Pro CTA; intentionally small.
  19. Segment agent card — Inquiry path; lower weight than family/passholder cards.
  20. Trust real-team pillar — Payment logos + refund note; low weight.
  21. FAQ section — Accordion; tertiary weight; expands on demand.
  22. Footer nav — Standard links; lowest weight on page.
  23. Footer disclaimer — Non-affiliation legal text; visible but minimal.
```

---

## Section 6: Component Inventory

| Component | Class | Purpose | Content Direction |
|---|---|---|---|
| nav-bar | T | Wayfinding; secondary access to Coverage, Pricing, How It Works | Logo · Coverage · Pricing · How It Works · Log In link |
| hero-headline | P | Name the problem; anchor user recognition | "Missed [Be Our Guest]? We'll alert you the moment a cancellation opens." (~14 words) |
| hero-subhead | P | One-sentence product description with no-login promise | "Pixiedining monitors Disney dining availability around the clock and sends real-time alerts — no Disney account access needed." (~18 words) |
| hero-trust-trio | S | Inline trust bullets resolving top three objections | ✓ No Disney login required · ✓ You book on Disney's official site · ✓ Alerts every 30–90s |
| hero-sample-preview | S | Compact alert notification preview to make product tangible | Small phone notification mockup: "Be Our Guest · Dec 14 · Party of 4 — Available! Tap to book on Disney →" |
| alert-widget | P | Immediate free alert setup form (embedded action island) | Card header: "Set Up Your Free Alert" |
| alert-restaurant-input | P | Restaurant selection; primary widget input | Autocomplete field: "Restaurant name..." placeholder |
| alert-date-input | P | Trip date range input | Date range picker: "Visit dates" label |
| alert-party-size-input | P | Party size selector | Dropdown: "Party size" 1–10+ |
| alert-channel-input | S | Notification channel selection | "Alert me by" — Email (default) toggle; SMS note "(Pro)" |
| primary-cta-button | P | Submit form to start free alert | "Start Free Alert →" filled button |
| hero-risk-reducer | T | Remove commitment hesitation directly below CTA | "Free for 1 restaurant · No credit card · Cancel anytime" |
| proof-bar | S | Credibility through alert volume and named restaurants | "47,000+ alerts sent · Be Our Guest · Space 220 · Cinderella's Royal Table · Topolino's Terrace →" scrolling |
| workflow-section-headline | S | Frame the workflow as post-signup sequence, not prerequisite | "Here's what happens after you save your alert" |
| workflow-step-problem | S | Validate the user's frustration; establish product necessity | Step 1: "Disney's 60-day window closes in seconds. Cancellations trickle back over weeks — and vanish just as fast." |
| workflow-step-criteria | S | Confirm the form action; connect hero to workflow | Step 2: "You enter your restaurant, dates, and party size. (You already did this above ↑)" |
| workflow-step-monitoring | S | Explain the core mechanism with specific proof | Step 3: "We poll Disney's availability feed continuously — every 30 seconds on Pro, every 90 seconds on Free." |
| workflow-step-alert | S | Show what the alert experience looks like | Step 4: "The moment a match opens, you get a push notification, SMS, or email — your choice." |
| workflow-step-booking | S | Official handoff clarification; no-booking disclaimer | Step 5: "You click through to Disney's official reservation site and book directly. We alert; we never book for you." |
| trust-section-headline | S | Introduce trust proof section | "Your account. Your booking. Always." |
| trust-no-login | S | Primary safety assurance — most important trust pillar | "We never log into or ask for your Disney account credentials. Pixiedining only reads publicly available availability data." |
| trust-official-handoff | S | Role-boundary clarification; no-booking disclaimer | "Every reservation is completed on Disney's official site. We alert you to the opening; you do the booking." |
| trust-real-team | T | Legitimacy indicators: payment logos, support, refund | "U.S.-based · [Stripe badge] · Money-back guarantee · [Support link]" |
| sample-alert-section-headline | S | Frame the proof section | "This is what you'll receive" |
| sample-alert-mockup | S | Visual proof of product output | Phone notification frame: "Be Our Guest · Dec 14 · Party of 4 · Available! · Tap to book on Disney's site →" |
| sample-alert-caption | T | Honest expectation setting | "Cancellations are first-come, first-served. We alert you immediately — the rest is up to you." |
| coverage-section-headline | S | Headline for coverage section | "200+ restaurants monitored across Walt Disney World and Disneyland" |
| coverage-park-filter | T | Park filter tabs for coverage browsing | [Walt Disney World] [Disneyland] [Both] tabs |
| coverage-restaurant-list | S | Named restaurant list for Segment B validation | Featured: Be Our Guest, Cinderella's Royal Table, Space 220, Topolino's Terrace, Storybook Dining, California Grill, Napa Rose, and 190+ more |
| plan-comparison-headline | S | Introduce tier decision | "Free or Pro — pick what your trip needs" |
| plan-free-column | P | Free tier feature list and CTA | "Free · 1 restaurant · Email alerts · Standard polling (90s)" |
| plan-pro-column | P | Pro tier feature list and CTA | "Pro · $14.99/mo or $99/yr · Unlimited restaurants · SMS + Push + Email · Fast polling (30s) · Multi-park bundles · Auto-resume · Priority support" |
| plan-free-cta | P | Free tier conversion button | "Start Free Alert" |
| plan-pro-cta | S | Pro checkout button | "Get Pro — $14.99/mo" |
| plan-annual-note | T | Annual plan savings callout | "Or $99/yr — save 44%. Cancel anytime." |
| segment-callouts-headline | S | Frame segment self-selection section | "Built for every kind of Disney diner" |
| segment-families-card | S | Family planner path | "Planning one trip? Start free — one restaurant, no commitment, instant alerts." |
| segment-passholders-card | S | Passholder / superfan path | "Visit often? Pro pays for itself in two trips. Annual plan saves $80." |
| segment-agents-card | T | Travel agent inquiry path | "Booking for clients? Agency plans include multi-client management. Contact us." |
| success-story-1 | S | Family planner testimonial | Quote referencing specific restaurant, realistic timeline, booking outcome |
| success-story-2 | S | Passholder / superfan testimonial | Annual plan value, multiple restaurants covered |
| success-story-3 | T | Travel agent or multi-trip testimonial | Multi-client or complex itinerary outcome |
| faq-section-headline | T | FAQ section header | "Common questions" |
| faq-no-login | T | FAQ: account access | "Does Pixiedining need my Disney login?" → No. |
| faq-speed | T | FAQ: polling frequency | "How fast will I get alerted?" → cadence specifics |
| faq-miss | T | FAQ: missed alert handling | "What if I miss the alert?" → Auto-resume on Pro |
| faq-affiliation | T | FAQ: Disney affiliation | "Is Pixiedining affiliated with Disney?" → No. |
| faq-guarantee | T | FAQ: reservation guarantee | "Can you guarantee I'll get the reservation?" → No; honest framing |
| final-cta-bar | S | Bottom-of-page conversion repeat | "Still need that table? [Set Up Free Alert] [Compare Plans]" |
| footer-nav | T | Standard footer navigation | Coverage · Pricing · Support · Privacy · Terms · Agency |
| footer-disclaimer | T | Non-affiliation legal statement | "Pixiedining is not affiliated with, authorized by, or endorsed by The Walt Disney Company or any of its subsidiaries." |

**Component count: 46**

---

## Section 7: ASCII Wireframe

```
Desktop (1440px) — max 72 chars wide (schematic representation)

┌──────────────────────────────────────────────────────────────────┐
│ NAV [nav-bar]                                                    │
│ [Pixiedining]  Coverage · Pricing · How It Works     [Log In]   │
└──────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────┐
│ HERO [primary-section] — split 55/45                            │
│                                                                  │
│  ┌──────────────────────────┐  ┌──────────────────────────────┐  │
│  │ [hero-headline]          │  │ Set Up Your Free Alert       │  │
│  │ Missed [Be Our Guest]?   │  │ [alert-widget]               │  │
│  │ We'll alert you the      │  │ ┌──────────────────────────┐ │  │
│  │ moment a cancellation    │  │ │ Restaurant name...       │ │  │
│  │ opens.                   │  │ └──────────────────────────┘ │  │
│  │                          │  │ ┌───────────────┐ ┌───────┐  │  │
│  │ [hero-subhead]           │  │ │ Visit dates   │ │Party  │  │  │
│  │ Monitors Disney dining   │  │ └───────────────┘ └───────┘  │  │
│  │ around the clock — no    │  │ ┌──────────────────────────┐ │  │
│  │ Disney account needed.   │  │ │ Email or phone number    │ │  │
│  │                          │  │ └──────────────────────────┘ │  │
│  │ [hero-trust-trio]        │  │                              │  │
│  │ ✓ No Disney login        │  │ [● Start Free Alert →]       │  │
│  │ ✓ You book on Disney's   │  │ [primary-cta-button]         │  │
│  │   official site          │  │                              │  │
│  │ ✓ Alerts every 30–90s    │  │ [hero-risk-reducer]          │  │
│  │                          │  │ Free · 1 rest. · No CC       │  │
│  │ [hero-sample-preview]    │  └──────────────────────────────┘  │
│  │ ┌──────────────────────┐ │                                    │
│  │ │ 🔔 Be Our Guest      │ │                                    │
│  │ │ Dec 14 · Party of 4  │ │                                    │
│  │ │ Available → Book now │ │                                    │
│  │ └──────────────────────┘ │                                    │
│  └──────────────────────────┘                                    │
└──────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────┐
│ PROOF BAR [proof-bar]                                           │
│ 47,000+ alerts sent · Be Our Guest · Space 220 ·                │
│ Cinderella's Royal Table · Topolino's Terrace ·→                │
└──────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────┐
│ WORKFLOW [workflow-section]                                      │
│ "Here's what happens after you save your alert"                 │
│                                                                  │
│  ①──────→②──────→③──────→④──────→⑤                            │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                  │
│  │ 60-  │ │Enter │ │ We   │ │Alert │ │ You  │                  │
│  │ day  │ │crit- │ │ poll │ │fires:│ │ book │                  │
│  │window│ │eria  │ │ Dis- │ │push/ │ │ on   │                  │
│  │closes│ │above↑│ │ney   │ │SMS/  │ │Disney│                  │
│  │fast. │ │      │ │every │ │email │ │'s    │                  │
│  │Canc- │ │Rest- │ │30–90 │ │      │ │off.  │                  │
│  │ella- │ │aur., │ │ secs │ │Incl. │ │site. │                  │
│  │tions │ │dates,│ │      │ │link  │ │We    │                  │
│  │trickl│ │party │ │Based │ │to    │ │never │                  │
│  │back  │ │size  │ │on    │ │Disney│ │book  │                  │
│  │slowly│ │      │ │plan  │ │page  │ │for   │                  │
│  │      │ │      │ │      │ │      │ │you   │                  │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘                  │
└──────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────┐
│ TRUST [trust-section]                                           │
│ "Your account. Your booking. Always."                           │
│                                                                  │
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐    │
│ │ [trust-no-login]│ │[trust-official  │ │[trust-real-team]│    │
│ │                 │ │ -handoff]       │ │                 │    │
│ │ We never log    │ │ Every res-      │ │ U.S.-based      │    │
│ │ into or ask for │ │ ervation is     │ │ [Stripe logo]   │    │
│ │ your Disney     │ │ completed on    │ │ Money-back      │    │
│ │ account. We     │ │ Disney's        │ │ guarantee       │    │
│ │ read publicly   │ │ official site.  │ │ [Support link]  │    │
│ │ available data. │ │ We alert; you   │ │                 │    │
│ │                 │ │ book.           │ │                 │    │
│ └─────────────────┘ └─────────────────┘ └─────────────────┘    │
└──────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────┐
│ SAMPLE ALERT [sample-alert]                                     │
│ "This is what you'll receive"                                   │
│                                                                  │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │  [Phone mockup — notification frame]                     │  │
│   │  ┌────────────────────────────────────┐                  │  │
│   │  │ 🔔 Pixiedining Alert               │                  │  │
│   │  │ Be Our Guest · Dec 14 · Party of 4 │                  │  │
│   │  │ is now available!                  │                  │  │
│   │  │ [Tap to book on Disney's site →]   │                  │  │
│   │  └────────────────────────────────────┘                  │  │
│   └──────────────────────────────────────────────────────────┘  │
│   [sample-alert-caption]                                        │
│   Cancellations are first-come, first-served.                   │
│   We alert you immediately — the rest is up to you.             │
└──────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────┐
│ COVERAGE [coverage-section]                                     │
│ "200+ restaurants monitored across WDW and Disneyland"          │
│                                                                  │
│ [Walt Disney World] [Disneyland] [Both] ← park filter tabs      │
│                                                                  │
│ Be Our Guest · Cinderella's Royal Table · Space 220 ·           │
│ Topolino's Terrace · Storybook Dining · California Grill ·      │
│ Napa Rose · Spice Road Table · Oga's Cantina · +190 more        │
└──────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────┐
│ PLAN COMPARISON [plan-comparison]                               │
│ "Free or Pro — pick what your trip needs"                       │
│                                                                  │
│ ┌──────────────────────────┬───────────────────────────────────┐│
│ │ FREE                     │ PRO                               ││
│ ├──────────────────────────┼───────────────────────────────────┤│
│ │ 1 restaurant             │ Unlimited restaurants             ││
│ │ Email alerts             │ SMS + Push + Email                ││
│ │ Standard polling (90s)   │ Fast polling (30s)                ││
│ │ —                        │ Multi-park bundles                ││
│ │ —                        │ Auto-resume after alert fires     ││
│ │ —                        │ Priority support                  ││
│ ├──────────────────────────┼───────────────────────────────────┤│
│ │ [Start Free Alert]       │ [Get Pro — $14.99/mo]             ││
│ │ [plan-free-cta]          │ [plan-pro-cta]                    ││
│ │                          │ [plan-annual-note]                ││
│ │                          │ Or $99/yr — save 44%              ││
│ └──────────────────────────┴───────────────────────────────────┘│
└──────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────┐
│ SEGMENTS [segment-callouts]                                     │
│ "Built for every kind of Disney diner"                          │
│                                                                  │
│ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐  │
│ │[segment-families]│ │[segment-passhold]│ │[segment-agents]  │  │
│ │                  │ │                  │ │                  │  │
│ │ Planning one     │ │ Visit often?     │ │ Booking for      │  │
│ │ trip? Start      │ │ Pro pays for     │ │ clients? Agency  │  │
│ │ free — no        │ │ itself in two    │ │ plans include    │  │
│ │ commitment.      │ │ trips. Save $80  │ │ multi-client     │  │
│ │                  │ │ with annual.     │ │ management.      │  │
│ │ [Start Free →]   │ │ [Get Annual →]   │ │ [Contact Us →]   │  │
│ └──────────────────┘ └──────────────────┘ └──────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────┐
│ SUCCESS STORIES                                                  │
│                                                                  │
│ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐  │
│ │[success-story-1] │ │[success-story-2] │ │[success-story-3] │  │
│ │ "Got alerted at  │ │ "Annual plan     │ │ "Saved three     │  │
│ │ 2am. Grabbed     │ │ paid for itself  │ │ client trips     │  │
│ │ Be Our Guest in  │ │ in two trips.    │ │ this month."     │  │
│ │ 4 minutes."      │ │ Cinderella's +   │ │ — T.H., Disney  │  │
│ │ — M.R., Florida  │ │ Space 220."      │ │ travel agent     │  │
│ │                  │ │ — A.P., Annual   │ │                  │  │
│ └──────────────────┘ └──────────────────┘ └──────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────┐
│ FAQ [faq-section]                                               │
│ "Common questions"                                              │
│ + Does Pixiedining need my Disney login? ─────────────────────  │
│ + How fast will I be alerted? ────────────────────────────────  │
│ + What if I miss the alert? ──────────────────────────────────  │
│ + Is Pixiedining affiliated with Disney? ─────────────────────  │
│ + Can you guarantee I'll get the reservation? ────────────────  │
└──────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────┐
│ FINAL CTA BAR [final-cta]                                       │
│ "Still need that table?"                                        │
│ [Set Up Free Alert]        [Compare Plans]                      │
└──────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────┐
│ FOOTER [footer-nav]                                             │
│ [Pixiedining]  Coverage · Pricing · Support · Privacy · Terms   │
│ Agency Plans · Contact                                          │
│ [footer-disclaimer]                                             │
│ Not affiliated with or endorsed by The Walt Disney Company.     │
└──────────────────────────────────────────────────────────────────┘
```

---

## Section 8: Responsive Behavior

```
DESKTOP (1440px — default):
  Hero: Two-column split (55/45). Left: headline + subhead + trust trio
    + sample preview. Right: alert widget card (restaurant, dates, party
    size, channel, CTA, risk reducer).
  Proof bar: Scrolling ticker strip, full width.
  Workflow: 5-step horizontal flow with numbered circles and connectors.
  Trust section: 3-column card grid.
  Sample alert: Centered phone mockup, constrained width (640px max).
  Coverage: Restaurant list in multi-column grid (3-col) with park tabs.
  Plan comparison: 2-column table, side by side.
  Segment callouts: 3-column card row.
  Success stories: 3-column card row.
  FAQ: Full-width accordion, 2/3-width content column centered.
  Final CTA bar: Full-width, centered text + two buttons.
  Footer: 4-column links + disclaimer below.

TABLET (768px):
  Hero: Stacks to single column. Headline and trust trio above; alert
    widget below (full width). Sample preview moves below trust trio.
  Workflow: 5 steps collapse to 2-column + 1 grid (3 / 2 or scrollable
    horizontal). Step connectors remain but reduce to directional icons.
  Trust section: 3-column collapses to 1-column stack.
  Plan comparison: Remains 2-column but tightens column widths.
  Segment callouts: 2-column grid; agent card wraps to row 2.
  Success stories: 2-column grid; third story wraps.
  Coverage: 2-column restaurant list; park filter remains.
  Footer: 2-column link grid.

MOBILE (390px):
  Nav: Logo left, hamburger menu right. Coverage/Pricing/How-It-Works
    links collapse into drawer.
  Hero: Full-width single column. Headline → short subhead → trust badge
    strip (2 chips: "No Disney login" + "Official site only") → alert
    widget card (restaurant input first, dates + party below, CTA visible
    after one short scroll). Risk reducer below CTA.
  Sample preview: Hidden in hero on mobile; remains in sample-alert
    section below. [data-mobile="hide"] on hero-sample-preview.
  Proof bar: Scrolling strip preserved, slightly smaller text.
  Workflow: 5 steps stack vertically with step number and title.
    Horizontal connectors transform to vertical line. Compact padding.
  Trust section: 3 pillars stack vertically.
  Sample alert: Full-width phone mockup, smaller device frame.
  Coverage: 1-column restaurant list; park filter tabs scroll horizontally.
  Plan comparison: 2-column table remains but text compresses. On very
    narrow screens, Free column on top / Pro column below (transform to
    stacked cards).
  Segment callouts: 3 cards stack vertically.
  Success stories: 1 card per row, stacked.
  FAQ: Full-width accordion.
  Final CTA: Two buttons stack vertically.
  Footer: 1-column stacked links + disclaimer.
```

---

## Section 9: Interaction Notes

```
ALERT WIDGET:
  — Restaurant input: autocomplete against known Pixiedining restaurant
    database. Typing "Be Our" should suggest "Be Our Guest Restaurant."
    Selected restaurant name populates as a tag/chip.
  — Date range picker: opens calendar modal on click. Both start and
    end date required. Past dates disabled.
  — Party size: dropdown with options 1–10+ or numeric input.
  — Channel input: Email (default). SMS toggle labeled "(Pro — upgrade
    after signup)". Toggling SMS can surface a tooltip explaining Pro.
  — CTA button: On submit → redirect to signup/criteria confirmation
    flow (out of scope for this spec). Button shows loading state on
    submit.

PROOF BAR:
  — Scrolling/marquee animation of restaurant names. Respects
    prefers-reduced-motion: static display on reduced-motion setting.

WORKFLOW SECTION:
  — Step circles are numbered, static. No click behavior.
  — On mobile, steps are vertically stacked; a vertical connector line
    runs between them.

COVERAGE SECTION:
  — Park filter tabs: WDW / Disneyland / Both. Clicking a tab filters
    the visible restaurant list. Default: Both.
  — "Show all" link reveals full list beyond the initial 20 visible.

FAQ SECTION:
  — Accordion: each item expands to reveal the answer. One item can
    be open at a time (or multiple — TBD by implementer). Smooth
    expand/collapse animation. Arrow icon rotates on expand.

SEGMENT CARDS:
  — "Start Free →" on families card: scrolls to hero alert widget
    (smooth scroll anchor) or triggers the signup flow.
  — "Get Annual →" on passholders card: navigates to Pro/annual
    Stripe checkout.
  — "Contact Us →" on agents card: opens contact/inquiry form modal
    or navigates to a dedicated contact page.

FINAL CTA BAR:
  — "Set Up Free Alert" button: smooth scroll to hero widget (#alert-widget).
  — "Compare Plans" button: smooth scroll to plan comparison section.
```

---

## Section 10: Content Direction

```
OVERALL TONE: Warm, practical, and reassuring. The voice is that of a
  knowledgeable friend who's navigated Disney dining stress many times.
  Not Disney-clone whimsy. Not cold SaaS utility. Specific over generic;
  empathetic over transactional; honest over promotional.

SECTION-BY-SECTION:

HERO HEADLINE:
  Key message: Name the exact problem the user is experiencing.
  Emotional register: Empathetic recognition ("you know this feeling").
  Constraint: Must name a real Disney restaurant; keep to ~14 words.
  Example: "Missed Be Our Guest? We'll alert you the moment a
    cancellation opens."

HERO SUBHEAD:
  Key message: One sentence: product description + core safety promise.
  Register: Plain and factual. No superlatives.
  Word count: 16–22 words.
  Example: "Pixiedining monitors Disney dining availability around the
    clock and sends real-time alerts — no Disney account access ever needed."

HERO TRUST TRIO:
  Key message: No login · Official site booking · Alert cadence.
  Register: Short declarative bullets. No marketing language.
  Format: ✓ check prefix, max 10 words each.

PROOF BAR:
  Key message: Scale (alerts sent) + restaurant name breadth.
  Register: Matter-of-fact. Numbers are specific, not rounded.
  Format: "{X,XXX}+ alerts sent this year · [Restaurant names] →"
  Note: Alert count should be real or conservatively estimated. Do not
    inflate. Use "this year" or "in 2024" for temporal specificity.

WORKFLOW SECTION:
  Key message: Mental model confirmation — 5 steps from problem to booking.
  Register: Explanatory but concise. Each step: one headline (4–6 words)
    + one supporting sentence (15–20 words).
  Constraint: Step 2 must reference the hero form ("you set this above ↑").
    Step 5 must use "book on Disney's official site" phrasing.

TRUST SECTION:
  Key message: Account safety + role clarity + team legitimacy.
  Register: Formal reassurance. Pillar 1 is the most important; it gets
    the strongest language. Pillar 2 uses plain role-boundary language.
    Pillar 3 uses brevity (logos speak louder than copy here).
  Constraint: No "we promise" language — say what you do, not what you
    promise. No "we would never" — say "we never."

SAMPLE ALERT:
  Key message: Here is exactly what the alert looks like.
  Register: Demonstration, not promotion. The caption manages expectations:
    "first-come, first-served... the rest is up to you."
  Constraint: Alert mockup text must match realistic format. Do not show
    a confirmation of booking — show only the alert notification.

COVERAGE SECTION:
  Key message: Breadth and specificity. The user's restaurant is probably here.
  Register: Factual list. Headline uses a specific count ("200+"), not
    "hundreds" or "all." Featured restaurants are listed by full name.

PLAN COMPARISON:
  Key message: Free is real and useful; Pro is worth paying for.
  Register: Parallel, comparison-ready. Each feature is named specifically
    (not "more alerts" but "unlimited restaurants"). Polling cadence is
    stated in seconds, not "faster" or "real-time." Price is exact.
  Constraint: No "best value" flag; no "most popular" badge unless
    supported by real data. Annual note uses exact savings amount ($80 or
    44% — use whichever is accurate).

SEGMENT CALLOUTS:
  Key message: Which type of Disney diner are you? Here's your path.
  Register: Slightly warmer than the plan comparison. Uses second-person
    ("Visit often?" not "For frequent visitors").
  Constraint: Agent card is the only place agency language appears. It
    uses inquiry framing, not checkout framing.

SUCCESS STORIES:
  Key message: Real people, real restaurants, realistic outcomes.
  Register: Authentic and specific. Quote should name the restaurant, the
    timing, and the outcome (without guarantee language).
  Constraint: No "I got my reservation because of Pixiedining!" framing.
    Use: "I got the alert and booked it within 5 minutes." — not "they
    got me the table."

FAQ:
  Key message: Pre-answer every objection before it creates abandonment.
  Register: Honest, direct, plain. The Disney affiliation question gets
    the clearest "no" answer on the page.
  Priority order: Login → Speed → Missed alert → Affiliation → Guarantee

FINAL CTA BAR:
  Key message: Re-engage the user who read the whole page.
  Register: Warm callback to the opening problem statement.
  Copy: "Still need that table?" — mirrors the hero's empathetic framing.

FOOTER DISCLAIMER:
  Key message: Non-affiliation statement. Legal-friendly.
  Copy: "Pixiedining is not affiliated with, authorized by, or endorsed
    by The Walt Disney Company or any of its subsidiaries."
  Placement: Below footer nav links. Small text, fully visible.
```

---

## Section 11: Visual Acceptance Spec

### 11A: Viewports & Scenarios

```
VIEWPORTS:
  - Desktop:  1440 × 900
  - Tablet:   768 × 1024
  - Mobile:   390 × 844

SCENARIOS:
  - New visitor (cold traffic): first viewport must answer product
    category, safety, and provide free alert action without scroll.
  - Expert user (Segment B): coverage section and plan comparison must
    be reachable and comparison-ready without ambiguity.
  - Mobile discovery (TikTok/Reddit): first viewport on 390px must
    preserve restaurant input field and CTA without requiring horizontal
    scroll or pinch-zoom.
  - Agent inquiry: tertiary path must be discoverable without competing
    with primary or secondary CTAs.
```

### 11B: First Viewport Composition

```
FIRST VIEWPORT (desktop — 1440 × 900):
  — Hero headline must be visible before scroll.
  — Primary alert widget (#alert-widget) must be visible before scroll.
  — "Start Free Alert" button (#primary-action) must be visible before scroll.
  — At least two trust trio bullets must be visible before scroll.
  — Hero risk reducer ("Free · No credit card") must be visible before scroll.
  — Hero sample preview (compact alert notification) must be visible
    before scroll or immediately adjacent to the fold.
  — Next section (proof bar) must peek below the fold by a moderate amount
    to signal scrollable content.
  — Nav bar must be present and non-dominant.

FIRST VIEWPORT (mobile — 390 × 844):
  — Hero headline must be visible as the dominant element.
  — Trust badge strip (minimum: "No Disney login" chip) must be visible.
  — Restaurant name input (#alert-restaurant-input) must be visible.
  — Primary CTA button must be within one short scroll stop.
  — Proof bar or partial workflow must be visible or peekable below.
  — Must not require horizontal scroll.

FAILURE CONDITION: If a new visitor cannot identify the free alert action
  and the no-login safety promise from the first viewport, the page fails
  its core strategic job.
```

### 11C: Layout Constraints

```
LAYOUT:
  Desktop: Split-column hero (55% left copy / 45% right widget). Widget
    is a bordered card with 4 inputs and one primary CTA. Left column
    contains headline, subhead, trust trio, and sample preview.
  Tablet: Hero stacks to single column (headline → subhead → trust trio
    → sample preview → widget). Plan comparison remains 2-column.
    Workflow collapses from 5-col horizontal to a 2+3 or scrollable row.
  Mobile: Full single-column stack throughout. Hero widget card reduces
    to restaurant input + CTA immediately visible; date + party inputs
    visible just below first scroll stop. Proof bar persists.
    Plan comparison: 2 columns preferred; collapses to stacked cards
    at the narrowest breakpoint (< 400px).
  Hierarchy constraint: alert-widget and primary-cta-button own the
    highest visual weight in the hero section. Hero headline anchors
    the left column and the eye's entry point. Trust trio is secondary
    to the widget but must not be hidden or visually merged with body text.
  Trust section: 3-pillar grid, equal width, equal visual weight within
    the section. trust-no-login gets the first/leftmost position.
```

### 11D: Density & Rhythm

```
DENSITY:
  Mode: moderate hybrid — marketing density for the hero; moderate
    for the workflow and trust sections; slightly compact for the plan
    comparison table and FAQ.

  Hero section: generous inter-element spacing. Widget card has
    comfortable internal padding. Hero headline gets generous leading.

  Proof bar: compact — single-line ticker, tight padding.

  Workflow section: moderate — step cards have comfortable padding;
    connector space between steps is minimal but readable.

  Trust section: moderate — card padding is generous; text within
    pillars is comfortable, not dense.

  Sample alert: generous — centered, whitespace-framed mockup to
    give the proof element space to be "seen" clearly.

  Coverage section: moderate-to-compact — restaurant list is denser
    than prose sections but not table-density.

  Plan comparison: compact — table rows are tight. Features are one
    line each. No paragraph text within the table.

  Segment callouts: moderate — cards have comfortable padding; not
    as sparse as the trust pillars.

  FAQ: compact — accordion items are tightly spaced; answers expand
    within the item boundary.

  Major section separation: generous (64px equiv on desktop).
  Minor internal spacing: moderate (24px equiv).
  Table row height: compact (tight).
  Controls must not visually compete with primary-cta-button.
```

### 11E: Required Stable Selectors

```
REQUIRED SELECTORS:
  #page-root           — root wrapper for the entire page
  #primary-section     — hero section containing headline + widget
  #primary-action      — the "Start Free Alert" CTA button in hero widget
  #alert-widget        — the free alert setup form card in the hero
  #alert-restaurant    — the restaurant name input field
  #workflow-section    — the 5-step how-it-works section
  #trust-section       — the 3-pillar trust and safety section
  #no-login-pillar     — the no Disney login trust pillar
  #sample-alert        — the sample alert notification section
  #coverage-section    — the restaurant coverage section
  #plan-comparison     — the Free vs Pro plan comparison section
  #plan-free-cta       — the "Start Free Alert" CTA in the plan comparison
  #plan-pro-cta        — the "Get Pro" CTA in the plan comparison
  #segment-callouts    — the 3-segment self-selection section
  #agent-inquiry       — the travel agent inquiry card/CTA
  #final-cta           — the bottom-of-page CTA bar
  #footer-disclaimer   — the non-affiliation footer statement
```

### 11F: Non-Negotiables

```
  — "Start Free Alert" must be the first CTA a new visitor encounters.
    No Pro CTA, no checkout CTA may appear above or visually equal to it
    in the hero section.
  — No Disney login language must appear in the hero section, within the
    first viewport, as a visible bullet or statement — not only in a
    trust section below the fold.
  — The official Disney booking handoff must be stated at least twice:
    once in the workflow section (step 5) and once in the trust section
    (official-handoff pillar).
  — The footer disclaimer (#footer-disclaimer) must appear on every page
    state and must not be hidden by overflow, collapsed, or removed.
  — Pro pricing must be shown as exact amounts ($14.99/mo, $99/yr).
    No "starting at" or "from" language.
  — Polling cadence must be stated as specific numbers (30s / 90s),
    not as "fast" or "real-time" without the specific figure.
  — Restaurant names in coverage and proof bar must be real Disney
    restaurant names (Be Our Guest, Cinderella's Royal Table, etc.),
    not placeholder names.
```

### 11G: Allowed Variation

```
  — The hero split ratio may shift from 55/45 to 50/50 or 60/40 based
    on visual balance at implementation.
  — The sample preview in the hero may be removed on mobile if the full
    sample alert section provides sufficient proof below.
  — The success story count may change from 3 to 4 if additional
    testimonials are available and specific.
  — The restaurant count in the coverage section headline ("200+") may
    be updated to reflect actual coverage at launch.
  — The proof bar alert count ("47,000+") must be updated to reflect
    actual sent alerts; the format may be weekly, monthly, or annual
    depending on what is most accurate.
  — FAQ item count may expand from 5 to 7 if additional high-frequency
    objections are identified.
  — Segment callout card order may change based on traffic composition
    analysis after launch.
  — The annual savings framing ("save 44%" vs. "save $80") may be
    adjusted based on legal or marketing preference, provided the
    saving is accurate.
```

### 11H: Not Allowed

```
  — DO NOT place Pro pricing or a "Get Pro" CTA above the hero alert
    widget or before the trust section.
  — DO NOT use language implying guaranteed reservations, automatic
    booking, or privileged Disney system access.
  — DO NOT use Disney's official logo, wordmark, castle silhouette, or
    trademarked visual elements in the page design.
  — DO NOT describe Pixiedining as "official," "authorized," "partnered
    with," or "endorsed by" Disney.
  — DO NOT use vague performance claims ("fastest," "instant," "always")
    without the specific cadence number (30s / 90s) adjacent.
  — DO NOT hide the footer disclaimer behind a "legal" accordion or
    render it in a color that fails WCAG AA contrast.
  — DO NOT remove or collapse the trust trio from the hero section at
    any viewport. It may compact but must remain visible.
  — DO NOT make the agent inquiry card visually equal to or larger than
    the family planner or passholder segment cards.
  — DO NOT use a carousel or slider for success stories, workflow steps,
    or trust pillars.
```

---

## Section 12: HTML Wireframe Artifact

```
HTML WIREFRAME ARTIFACT:
  File:       wireframe.workflow-first-reservation-rescue-strategy.html
  Components: 46 (matching Section 6 component inventory)
  Selectors:  17 (matching Section 11E required selectors)
  Status:     written
```
