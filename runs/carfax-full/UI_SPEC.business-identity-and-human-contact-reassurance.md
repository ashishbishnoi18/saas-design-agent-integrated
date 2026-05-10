# UI Spec — Strategy: Business-Identity And Human-Contact Reassurance

## Section 1: Page Classification

```
TYPE: hybrid
```

This is a transactional ecommerce landing page (B2C one-time purchase) fused with a B2B inquiry/onboarding page (dealer subscriptions). Marketing-page conventions (clear value, generous proof, clean composition) coexist with internal-tool conventions (form-first VIN entry, transparent pricing, terms readability). The strategy collapses the perceived gap between "anonymous discount site" and "accountable business" by making the company's real identity and named humans the dominant proof system. Marketing-mode dominates the first viewport; functional-mode dominates the individual purchase path; B2B sales-page conventions dominate the dealer path.

---

## Section 2: Intake Summary

```
PURPOSE: Convert visitors into paying customers for discounted official Carfax
  reports — driving (a) one-time report purchases from individual used-car
  buyers and (b) recurring dealer subscriptions for continuous report access.
  The page must establish credibility as a legitimate reseller before either
  action feels safe. Business intent: revenue from both channels, with dealer
  LTV being substantially higher than individual LTV.

AUDIENCE:
  Segment A — Individual buyer (one-time):
    Specific used-car evaluator, price-sensitive, decides in under 60 seconds,
    bounces hard if the page reads as scammy.
  Segment B — Dealer (continuous):
    Expert, methodical, wants volume pricing + terms + legitimacy proof, and
    ideally to talk to a person before committing.

CONTEXT: Standalone landing page (root of site). Entry: warm word-of-mouth +
  cold social. Exit: individual checkout OR dealer signup/contact. SELLING
  stage — pre-purchase for both segments. Trust is the primary blocker.

KEY ACTIONS:
  1. PRIMARY — Buy a report now (VIN → pay → receive PDF).
  2. SECONDARY — Set up dealer access (form / call / contact path).
  3. TERTIARY — See a sample report (low-commitment proof).
```

---

## Section 3: Flow Map

```
FLOW: Single page (standalone, root of site)

  [Warm referral traffic] ──┐
                            ├──> [Landing page (this spec)]
  [Cold social traffic]   ──┘            │
                                         ├─> [Individual checkout flow]  (PRIMARY)
                                         ├─> [Dealer signup / contact]   (SECONDARY)
                                         └─> [Sample-report viewer]      (TERTIARY)
```

---

## Section 4: Decision Map

### 4A: User Decision Sequence

```
PAGE LEVEL:
  User's first question:
    "Is this a real business that will actually deliver an official Carfax
     report, or is it a scam that's about to take my $9.99 (or my dealership's
     monthly contract)?"
  Resolved by:
    (1) A persistent business-identity strip at the very top — company legal
        name, established year, registered business address, US-based phone
        with staffed hours.
    (2) A hero where one column is the fast individual purchase path and the
        adjacent column is "Talk to our dealer team" with named, photographed
        humans — making the business unmistakably real before any commitment.

SECTION LEVEL:
  Individual segment scanning for:
    "How fast can I get out of here with the report I need, and is checkout
     safe?"
  Resolved by:
    Inline VIN entry in the hero with price visible, followed by
    delivery/refund/secure-payment microcopy beneath the button. No scrolling
    required to reach the action.

  Dealer segment scanning for:
    "Is there a real human I can talk to who will own my account, and is
     this a real company I can put on a PO?"
  Resolved by:
    A dealer panel in the hero showing two named account managers (face,
    name, role, direct line, calendar booking link) plus a clearly labeled
    business identity proof bar directly below the hero (registration #, BBB,
    payment processor, address, support hours).

  Skeptical visitor (either segment) scanning for:
    "Can I see what I'm actually buying without paying?"
  Resolved by:
    A persistent "See a sample report" tertiary CTA in the hero, repeated
    near pricing and near the refund-terms block.

COMPONENT LEVEL:
  Click-vs-skip on primary CTA:
    "Will I actually get the official Carfax PDF and can I get a refund if
     I don't?"
  Resolved by:
    Microcopy directly under the button: "Official Carfax report · Delivered
    in under 90 seconds · 100% refund if not delivered." Adjacent secure-
    payment lock + processor name.

  Click-vs-skip on dealer CTA:
    "Is this a sales pitch from a stranger, or am I actually going to reach
     a real account manager?"
  Resolved by:
    Two named, photographed AMs with direct phone, email, and "Book a 15-min
    call" calendar link — no contact form-wall before seeing their faces.
```

### 4B: Asset And Evidence Inference

```
PRODUCT/OUTPUT ASSETS:
  - Official Carfax report PDF (the literal deliverable)
  - Sample report PDF (real Carfax, redacted/sanitized) — proves authenticity
    AND format AND completeness in one asset
  - Dealer dashboard (continuous access — screenshot for dealer panel)

PROOF ASSETS:
  - Legal company name, state of registration, registration number
  - Physical office address (US)
  - Established year (longer = more credibility)
  - Named, photographed team members (founder, support lead, dealer AMs)
  - Direct US phone number with staffed hours
  - BBB accreditation (if real) — with link to BBB profile
  - Payment processor logo (Stripe / authorize.net) — visible at hero level
  - Refund guarantee with specific terms (not "satisfaction guaranteed" but
    "100% refund if report not delivered within 5 minutes — automated")
  - Volume served counter ("147,000+ reports delivered since 2014") — only
    if accurate
  - Named dealer testimonials with dealership name, role, photo, location —
    not anonymous quotes
  - SSL/HTTPS lock indicator near payment fields
  - Authorized-reseller language ONLY if legally supportable; otherwise frame
    as "We purchase reports directly through a licensed Carfax account and
    pass the savings to you" — transparent rather than vague.

CONVERSION ASSETS:
  - Per-report price displayed as $X (was $44.99) — concrete, verifiable
    against carfax.com pricing
  - Dealer volume tiers with example math ("At 50 reports/mo: $XX/report,
    save $YY/mo vs. direct")
  - "First report free for verified dealers" — low-commitment dealer trial
  - "100% refund — automated" — refund cadence and trigger spelled out
  - Demo / sample report — low-commitment proof for both segments

NAVIGATION/SELF-SELECTION ASSETS:
  - Audience tabs in hero: ┌ For Buyers │ For Dealers ┐ — but BOTH paths
    visible simultaneously by default on desktop (no tab interaction needed
    above the fold for either segment); tabs only become a switch on mobile
  - Persistent "Talk to dealer team" link in top utility bar
  - Anchor jumps from hero to relevant deeper sections

ACTION VS SIGNAL CLASSIFICATION:
  Actions:
    - VIN input + "Get my Carfax report" purchase button (primary)
    - "Book a 15-min call" + "Call (XXX) XXX-XXXX" + "Email AM directly"
      (dealer contact — three modalities, all human-facing)
    - "See a sample report" PDF link (tertiary)
    - "Start a free dealer trial" inline form (dealer-segment secondary)

  Signals:
    - Business-identity strip (legal name, address, phone, hours)
    - Identity proof bar (BBB, payment processor, registration, established)
    - Named team grid with photos and bios
    - Named dealer testimonials with photos
    - Refund terms as a structured block with concrete triggers
    - Volume served counter (if accurate)
    - Sample report (signal AND action — see-without-paying)
    - Press / partner mentions (if real)
```

### 4C: Strategy Defense

```
ASSIGNED STRATEGY: business-identity-and-human-contact-reassurance

WHY THIS STRATEGY FITS THIS INTAKE:
  The diagnosis identifies trust as the highest-weighted dimension (0.95) and
  names "scam perception" as the primary conversion blocker for both
  segments. Every other strategy in the seed list optimizes for one piece of
  trust (sample-led optimizes proof-of-product, savings-led optimizes
  price-rationalization, task-first optimizes purchase friction). This
  strategy attacks the *generative source* of scam suspicion: the absence of
  an accountable entity behind the discount. A discount on Carfax reports is
  rational ONLY if a real, named, contactable business is the one offering
  it. By making business identity and human contact the dominant proof
  system, every secondary trust signal (refund, sample, volume, payment
  processor) inherits credibility from the identified business rather than
  having to bootstrap trust independently.

  Audience fit: Dealers are explicitly described as wanting to "talk to a
  person before committing" — this strategy gives them named AMs with direct
  contact in the first viewport. Cold social-traffic individuals are
  described as needing protection from "scam perception" — a real address,
  real phone, real founder photo answers the unstated "is this a real
  business" question more directly than badges or guarantees.

  Honest weakness: For warm-referral individual buyers who already trust the
  site, this strategy spends layout real estate on reassurance they may not
  need. The design must therefore not let the reassurance crowd out the
  individual fast-purchase path. (Mitigated by giving the VIN form parity
  with the dealer-contact panel in the hero, not subordinating it.)

LOCAL OPTIMUM THIS STRATEGY RISKS:
  The shallow version of "business-identity reassurance" is an enterprise
  consulting page: long company-history paragraph, founder portrait with
  inspirational quote, "Schedule a consultation" as the only CTA, and the
  individual buyer feels the page wasn't built for them. The other shallow
  version is a contact-form wall — every action funnels through a "Tell us
  about your needs" gate, which annihilates the under-60-second individual
  purchase behavior.

HOW THIS DESIGN AVOIDS THAT LOCAL OPTIMUM:
  (1) The VIN purchase form is a PEER, not a consequence, of the dealer
      contact panel. They share the hero at equal visual weight. The
      individual buyer never has to "pass through" trust content to reach
      checkout — VIN entry is in the hero from the first pixel.
  (2) Human contact is presented as DIRECT REACH (named AMs with direct
      phone/calendar) not as a GATE (no contact form before info). Dealers
      can see the AMs without filling out anything.
  (3) Business identity is delivered as a PERSISTENT BAR (top utility strip
      + below-hero identity strip), not a long "About us" narrative section.
      It works as ambient signal, not as required reading.

REFERENCE CALIBRATION:
  No reference library was injected for this run. Operating on general taste
  calibration:
    - Same family as: high-trust transactional ecommerce (Stripe checkout
      pages, Square pricing pages — "real company, real address, real
      humans" as ambient trust signal rather than centerpiece content),
      and B2B dealer-acquisition pages where a named AM panel sits in the
      hero (common in fleet-services and insurance verticals).
    - Deliberate divergence from: generic "Contact Sales" SaaS pages where
      humans appear only after a form gate; coupon/affiliate sites that lean
      on badges instead of identity; consumer-trust pages where "About"
      content is back-loaded as a chapter.
    - Independent answer where: pairing a fast B2C purchase form with a
      named-AM dealer panel in the same hero is uncommon; most pages choose
      one or the other. The page assumes both audiences arrive simultaneously
      and lets each see itself reflected in the first viewport.

STRATEGIC DIAGNOSIS MAPPING:
  - Strategic axis mapped: trust_burden=high → Business-identity strip
    persists in top utility bar across full page.
  - Strategic axis mapped: market_type=hybrid → Hero is a 60/40 split with
    individual VIN form (left) + dealer human-contact panel (right);
    self-selection requires no clicks above the fold on desktop.
  - Strategic axis mapped: functional_immediacy=high → VIN input is the
    first focusable element after nav; placeholder "Enter VIN (17 chars)";
    submit button is the page's primary action.
  - Strategic axis mapped: decision_risk=high → Refund block with concrete
    triggers ("refund within 5 minutes if not delivered") is anchored
    adjacent to checkout, not buried in FAQ.
  - Strategic axis mapped: aesthetic_stakes=medium / visual_posture=
    polished_utility → Layout is restrained, businesslike, no neon discount
    treatment. White/light surfaces, clear borders, modest typographic scale.
  - Strategic axis mapped: audience_sophistication=mixed → Individual lane
    uses simple verbs ("Get my Carfax report"); dealer lane uses dealer-
    domain language ("Volume pricing", "Per-report cost", "Account manager")
    without re-explaining what Carfax is.
  - Strategic axis mapped: content_depth=layered → Page exposes
    identity → action → proof → terms → testimony → FAQ → footer in scannable
    layers, not a single flat narrative.
  - Audience/buyer implication: dealer wants to talk to a person → Two named
    AMs with photo, direct phone, calendar booking, and email visible above
    the fold (Section 6: dealer-contact-panel).
  - Audience/buyer implication: individual decides in <60s → VIN input,
    visible price, and one-line risk reducer all reachable without scroll.
  - Audience/buyer implication: cold social traffic is highly skeptical →
    Identity proof bar (registration, BBB, processor, address) appears
    immediately below the hero and contains no claim that cannot be clicked
    through and verified.
  - Design directive implication: cta_strategy: trust-adjacent CTAs → Every
    CTA is wrapped with proof microcopy (refund, secure payment, named human)
    rather than appearing as an isolated button.
  - Design directive implication: proof_strategy: lead with concrete
    legitimacy → Identity proof bar uses logos and verifiable data points,
    no generic "as seen on" claims.
  - Design directive implication: visual_posture: polished_utility →
    Wireframe density is moderate-to-comfortable; no decorative imagery
    competing with proof; no urgency timers.
  - Design directive implication: explanation_strategy: concise sequenced →
    "How it works" is a 3-step horizontal strip, not a long-form section.

FIRST VIEWPORT OBLIGATION:
  Diagnosis says: "Within the first viewport, the page must make visitors
  understand that they can buy discounted official Carfax reports safely,
  verify legitimacy enough to continue, and choose between individual
  purchase and dealer access."

  Desktop first-fold components that satisfy this:
    1. Top utility bar (#business-identity-bar): legal name + "Established
       2014" + US phone + "Talk to a real person" link + staffed hours.
    2. Hero left column: "Get an official Carfax report — $9.99" (was
       $44.99), VIN input field (#primary-action wraps form), submit CTA,
       and microcopy line "Official Carfax · Delivered <90s · 100% refund
       if not delivered."
    3. Hero right column (#dealer-contact-panel): "Talk to our dealer team"
       with two named AMs (photo, name, role, direct phone), "Book a
       15-min call" CTA (#dealer-action), and "First report free for
       verified dealers."
    4. Hero footer strip: "See a sample report" link (#sample-action),
       Stripe payment-processor logo, BBB logo, "Registered in [State] · EIN
       on file."
    5. Concise savings cue inside individual lane: "Save $35 vs. carfax.com."

  Mobile first-fold components that satisfy this:
    1. Top utility bar collapses to: company logo + phone icon (tap-to-call)
       + "Dealer?" link.
    2. Audience pill toggle: [Buy one report] [I'm a dealer] — defaults to
       Buy.
    3. VIN input + price + primary purchase button.
    4. Inline microcopy: "Official Carfax · 100% refund · Talk to a human."
    5. "See a sample report" link.
    6. "Real US business — tap for details" expandable strip linking to
       identity proof.

HARD FLOOR COVERAGE:
  - hf_first_viewport_legitimacy_and_self_selection → Hero (#primary-section)
    contains official-Carfax wording, BBB + processor logos and named-AM
    panel as legitimacy proof, individual VIN form as #primary-action,
    dealer #dealer-action, "$9.99 (was $44.99)" savings cue, and
    #sample-action — all visible above the fold on desktop and within first
    1.5 mobile screens.
  - hf_early_legitimacy_proof → #business-identity-bar precedes every CTA;
    #identity-proof-bar sits immediately under the hero before any further
    page content.
  - hf_segment_self_selection → Hero is split-column (desktop) / pill-toggle
    (mobile); each segment's primary action is unmistakable.
  - hf_individual_purchase_immediacy → VIN field is the first focusable
    interactive element after skip-to-content; no required scroll, no
    pre-checkout reading.
  - hf_dealer_path_prominence → Dealer panel occupies ~40% of hero with
    photographed humans, three contact modalities, and a named CTA. Section
    9 (#dealer-section) provides volume pricing, terms, and case studies.
  - hf_official_report_clarity → Hero headline contains "official Carfax
    report"; sub-line states "We purchase reports through a licensed Carfax
    account and pass the savings to you"; no "vehicle history report"
    ambiguity.
  - hf_transparent_terms_and_safety → #refund-terms block (Section 6)
    appears between pricing and FAQ; checkout adjacency confirmed by
    repeated "100% refund · delivered <90s" microcopy near every purchase
    CTA.
  - hf_proof_for_skeptics → #sample-action is in hero, repeats near pricing,
    repeats near refund-terms.
  - hf_mobile_conversion_path → Mobile hero stacks: phone-bar, segment
    toggle, VIN form, microcopy, sample link — within first ~700px.

ANTI-PATTERN AVOIDANCE:
  - ap_coupon_scam_aesthetic → No countdown timers, no flashing red price
    tags, no "TODAY ONLY" badges. Discount is shown as "$9.99 (was $44.99)"
    in monochrome typography. Visual register is "polished utility."
  - ap_buried_trust → #business-identity-bar is the very first element on
    the page (above the nav even in some mobile variants). Identity proof
    bar is immediately below the hero, not in a footer.
  - ap_individual_only_bias → Hero gives dealer panel ~40% of the visual
    weight with named humans (highest-attention element type). Section 9 is
    a full dealer detail block with pricing math.
  - ap_dealer_overeducation → Dealer copy assumes Carfax knowledge ("Per-
    report cost at your monthly volume", "Direct AM access") and never
    re-explains what Carfax is.
  - ap_ambiguous_product_naming → All product references say "official
    Carfax report"; the sample is labeled "Official Carfax report sample
    (redacted VIN)"; the section "How is this discounted?" answers the
    legitimacy question explicitly.
  - ap_unsubstantiated_authority_claims → Identity proof items only include
    verifiable claims: legal entity name, state of registration, BBB profile
    link (clickable to BBB), Stripe logo (verifiable processor), street
    address. No "industry-leading" or generic award badges.
  - ap_long_brand_story_before_task → No "About us" hero. The first
    informational beat is purchase + identity proof. Founder bio appears in
    Section 8 ("Meet the team") well below the action paths.
  - ap_hidden_or_vague_refund_terms → #refund-terms is its own labeled
    block listing: trigger ("if report not delivered in 5 minutes"), method
    ("automatic — no email required"), recourse ("contact (XXX) XXX-XXXX
    9am–9pm ET").
  - ap_generic_saas_visual_formula → No abstract benefit-card grid. Proof
    is photographic (named humans, real screenshots, sample PDF preview),
    not iconographic.
```

### 4D: Component Justification

| Component | User Lens | Business Lens | Verdict |
|-----------|-----------|---------------|---------|
| Business identity bar (top) | Resolves "is this a real business" before any other question | Conversion floor — without it, cold traffic bounces in <5s | Include — primary proof carrier; cheap to render, high signal |
| Top phone link | Direct contact reduces dealer + skeptic anxiety | Captures dealer call leads (highest LTV) and reassures consumers | Include — phone with hours, tap-to-call on mobile |
| Hero individual lane (VIN form) | Fastest path to outcome for under-60s decider | Drives B2C revenue and serves warm referral traffic | Include — primary action, hero parity |
| Hero dealer-contact panel (named AMs) | Methodical buyer wants to talk to a real person before committing | Captures dealer LTV; named AMs increase reply rate vs anonymous form | Include — primary proof + secondary action, hero parity |
| Inline microcopy under primary CTA | Resolves "will I get the report? what if I don't?" at the click moment | Reduces checkout abandonment from refund/delivery anxiety | Include — non-negotiable |
| Sample report link (hero) | Skeptic without budget commitment can verify product reality | Recovers visitors who would otherwise bounce; assisted conversion | Include — appears in hero, repeats near pricing and refund |
| Identity proof bar (below hero) | Specific verifiable trust signals (registration, BBB, processor, address) | Closes the legitimacy gap that single-channel proof can't close alone | Include — second-fold anchor |
| How it works (3 steps) | Dispels "what actually happens after I pay" uncertainty | Reduces support load; raises checkout confidence | Include — concise, sequenced, no overexplanation |
| Pricing block (B2C + dealer tiers) | Both segments compare against known carfax.com pricing | Direct savings rationalization; dealer math earns the conversation | Include — dual presentation |
| Refund/terms transparency | Resolves "what if it goes wrong" before checkout | Deflects pre-purchase support contacts; legitimizes the discount | Include — labeled block, not buried in FAQ |
| Meet the team grid | Real photographed humans confirm "real business" claim | Highest-credibility proof element; founder accountability signals | Include — strategic centerpiece for this strategy |
| Dealer detail section | Volume buyer needs terms + math + AM contact + case study | Highest-LTV revenue channel — must earn the contact | Include — dedicated section depth |
| Named dealer testimonials | "If real dealers trust them with their business, I can trust them with $9.99" | Cross-segment proof; high authenticity vs anonymous quotes | Include — photographed, named, dealership named |
| FAQ | Catches edge-case anxieties before they bounce | Last-line defense; reduces support tickets | Include — concise, 6–8 entries max |
| Final CTA + contact reassurance | Closing reaffirmation of "you can buy now or just call us" | Closes both paths; gives skeptics one more out | Include — restates phone + AM contact |
| Footer with full business info | Seals identity claim with full legal/contact data | Compliance + final accountability proof | Include — full address, EIN/registration, hours |
| Generic icon-grid benefit cards | Adds noise; doesn't answer real questions | None | EXCLUDE — replaced by photographic proof |
| Urgency countdown | Triggers scam-perception | Marginal lift, high bounce risk | EXCLUDE — explicit anti-pattern |
| Press logos without source | Generic "as seen on" without verifiability | Looks like other sites' fake badges | EXCLUDE — only include with source links |

### 4E: Tension Map

```
TENSION: Speed of individual purchase vs. weight of identity reassurance
  Business pull: Maximize trust signals to combat scam perception (high
    trust_weight 0.95).
  User pull: Individual buyers decide in <60s and bounce on noise; they
    don't want to read a company history.
  Resolution: Identity reassurance is delivered AMBIENTLY (persistent top
    bar, below-hero proof strip) rather than NARRATIVELY (no "About us"
    hero, no founder paragraph above the fold). The hero individual lane is
    a focused 3-element column: headline + price, VIN form, microcopy.
    Heavyweight identity proof (named team grid, founder bio, dealer case
    studies) lives below the fold — visible to skeptics who scroll, invisible
    to decisive buyers who don't need it.

TENSION: Human-contact emphasis vs. one-time-buyer simplicity
  Business pull: This strategy's core thesis is human-contact reassurance —
    so phones, AMs, schedule-a-call must be prominent.
  User pull: Individual buyers do NOT want to talk to anyone; they want a
    PDF in 90 seconds.
  Resolution: Human-contact assets (named AMs, calendar booking, dealer
    phone) live in the DEALER lane of the hero, not as a sitewide overlay.
    The individual lane gets one passive contact reassurance ("Real humans:
    (XXX) XXX-XXXX 9am–9pm ET" as a microcopy line, not a button).
    Top-bar phone is universal ambient signal — present, not pushed.

TENSION: Dealer-path prominence vs. individual-path-not-being-buried
  Business pull: Dealer LTV is "substantially higher" — must merit serious
    real estate.
  User pull: Individuals must see THEIR path immediately or assume the page
    is B2B-only.
  Resolution: Hero is a split-column with the individual VIN lane on the
    LEFT (LTR scanning advantage) and dealer panel on the RIGHT, ~60/40
    weighting visual mass. On mobile, audience pill toggle defaults to
    "Buy one report" — individual path is the default; dealer path is one
    tap away, never hidden behind scroll.

TENSION: "We are real and accountable" claims vs. legal restraint around
  Carfax brand marks
  Business pull: Strongest trust comes from official-Carfax-reseller
    framing.
  User pull: Visitors fear knockoffs; ambiguity intensifies suspicion.
  Resolution: We claim ONLY what is legally supportable. The frame is:
    "We are [Company Name], a real US business. We purchase official
     Carfax reports through a licensed Carfax account and pass the savings
     to you. Every report is the actual Carfax PDF — see sample." This
    sidesteps "authorized reseller" risk while preserving authenticity
    clarity. If "authorized" status is genuinely held, the bar swaps in
    "Authorized reseller — see Carfax confirmation [link]".

TENSION: Photographed real team (high credibility) vs. small-team optics
  Business pull: Real photos = highest credibility for "real business"
    strategy.
  User pull: Some users may judge a 4-person team as "too small to trust
    with my dealership."
  Resolution: Team grid foregrounds DEALER ACCOUNT MANAGERS and
    SUPPORT/OPERATIONS, not org chart depth. Volume served counter
    ("147,000+ reports delivered since 2014") provides scale credibility
    independent of headcount. Founder bio emphasizes years in the
    automotive-data industry, not company headcount.
```

---

## Section 5: Visual Hierarchy Map

```
PRIMARY (dominant visual weight):
  1. Hero headline + price ("Get an official Carfax report — $9.99
     (was $44.99)") — anchors the offer and the savings cue at the largest
     type size on the page.
  2. VIN input + Get-my-report button (#primary-action) — the page's job-
     to-be-done lives here; visually the most prominent interactive element.
  3. Dealer-contact panel (named AMs with photos + Book-call CTA
     #dealer-action) — equal-weight peer to the individual lane; the
     strategy's centerpiece.
  4. Business-identity bar (#business-identity-bar) — persistent across the
     full page, top-most position; reads first by document order even when
     visually subdued.

SECONDARY (supporting):
  5. Identity proof bar (#identity-proof-bar) — second-fold anchor with
     BBB, processor, registration, address.
  6. Refund / delivery / payment microcopy under both CTAs — adjacent to
     primary actions, slightly recessive in weight.
  7. Sample-report link (#sample-action) — present in hero, repeated near
     pricing and refund.
  8. Pricing section (B2C price card + dealer volume tiers).
  9. Meet the team (#meet-the-team) — photographed founder, support lead,
     two AMs.
  10. Dealer detail section (#dealer-section) — volume math, terms, case
      study, AM contact repetition.
  11. Refund / terms transparency block (#refund-terms).
  12. Named dealer testimonials.

TERTIARY (recessive):
  13. How-it-works strip.
  14. FAQ.
  15. Top nav (Home / How it works / Dealers / Sample / Contact).
  16. Footer (#footer-info) — full legal and contact info.
  17. Final CTA reaffirmation strip.
```

---

## Section 6: Component Inventory

| Component | Class | Purpose | Content Direction |
|-----------|-------|---------|-------------------|
| Business identity bar | P | Persistent ambient legitimacy: legal name, year, US phone, hours, "Talk to a real person" link | "[Company Legal Name] · Established 2014 · (XXX) XXX-XXXX · Mon–Fri 9am–9pm ET · Talk to a real person" — single line, monochrome |
| Top nav | T | Lightweight wayfinding | Logo · How it works · Dealers · Sample · Contact (5 items max) |
| Hero headline | P | State the offer with savings cue | "Get an official Carfax report — $9.99" (price as inline crossout: "was $44.99") |
| Hero sub | S | Disambiguate authenticity, set expectation | "Delivered as a PDF in under 90 seconds. We purchase official Carfax reports through a licensed account and pass the savings to you." (≤30 words) |
| VIN input form | P | The job. Single field + price line + button | Placeholder: "Enter VIN (17 characters)"; helper text: "We'll show your price before you pay" |
| Primary CTA (#primary-action) | P | Submit VIN, go to checkout | "Get my Carfax report → $9.99" |
| Primary microcopy | S | Refund + delivery + processor reassurance at click moment | "Official Carfax · Delivered in <90s · 100% refund if not delivered · Powered by Stripe" |
| Dealer contact panel (#dealer-contact-panel) | P | Named-AM B2B reassurance | Heading: "Talking to a person is part of the deal." Two AM cards: photo, name, role, direct phone, calendar link, email |
| Dealer CTA (#dealer-action) | P | Schedule a call OR start trial | "Book a 15-min call with [AM Name]" + secondary "Start a free dealer trial →" |
| Dealer microcopy | S | Risk reducers for B2B | "First report free · No card required · Real human onboarding" |
| Sample report link (#sample-action) | S | Low-commitment proof of authentic Carfax PDF | "See a sample report (real, redacted)" — opens PDF preview |
| Hero trust strip | S | Compact below-hero strip with BBB, Stripe, registration, address | 4 items, monochrome iconography, each clickable to source |
| Identity proof bar (#identity-proof-bar) | P | Full-width second-fold proof block | "A real US business, accountable to you": Legal entity, state of incorporation, EIN/registration #, BBB rating link, Stripe processor, physical address, support hours, founder name |
| Volume served counter | S | Scale credibility | "147,000+ reports delivered to drivers and dealers since 2014" — numeric, no animation |
| How it works strip | T | 3-step horizontal explanation | "1. Enter VIN — 2. Pay $9.99 — 3. Get the official PDF in <90s." |
| Pricing section | S | Transparent B2C price + dealer tiers | B2C card: $9.99/report, was $44.99 (link to carfax.com pricing reference). Dealer tiers: 25 / 100 / 500 reports/mo with per-report cost and example monthly savings |
| Refund / terms transparency block (#refund-terms) | P | Concrete refund triggers + delivery commitment + support recourse | 3 sub-blocks: Delivery commitment (90s SLA), Refund (auto, 5min trigger), Support (US phone + hours + email) |
| Meet the team (#meet-the-team) | S | Photographed founder + ops + AMs | 4 cards: photo, name, role, 2-line bio. Founder card includes years in automotive-data industry |
| Dealer detail section (#dealer-section) | P | Full B2B value: volume math, terms, AM repetition, case study | Subsections: Why dealers switch / Volume pricing math / Terms & onboarding / Named case study with dealership and AM photos / Repeated AM contact CTAs |
| Named dealer testimonials | S | Cross-segment authentic proof | 3 quotes, each with: photo, full name, dealership name, location, role, monthly volume, source link if public |
| Phone contact (#phone-contact) | S | Always-visible callable number | Click-to-call on mobile; static elsewhere; appears in top bar, hero microcopy, dealer panel, refund block, footer |
| FAQ | T | Edge anxieties | 6–8 entries: Is this an official Carfax? · Why discounted? · Refund? · Delivery? · Dealer terms? · Can I talk to someone? |
| Final CTA strip | S | Restate both paths + restate phone | "Buy now $9.99" + "Or call (XXX) XXX-XXXX" + "Dealers — book a call" |
| Footer (#footer-info) | T | Full legal/contact identity | Legal name, address, EIN, hours, support email, social, BBB link, Stripe attribution, copyright |

Component count: 25.

---

## Section 7: ASCII Wireframe (Desktop)

```
┌──────────────────────────────────────────────────────────────────────┐
│ [Co. Name LLC] Est.2014 · ☎(XXX) XXX-XXXX · 9–9 ET · Talk to a person│  ← business-identity-bar (P)
├──────────────────────────────────────────────────────────────────────┤
│ [Logo]      How it works · Dealers · Sample · Contact                │  ← top-nav (T)
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Get an official Carfax report — $9.99  (was $44.99)                 │  ← hero-headline (P)
│  Delivered as a PDF in under 90 seconds. We purchase official        │  ← hero-sub (S)
│  Carfax reports through a licensed account and pass the savings.     │
│                                                                      │
│  ┌──────────────────────────────┐  ┌──────────────────────────────┐  │
│  │ Enter VIN (17 chars) ______  │  │ Talking to a person is       │  │
│  │                              │  │ part of the deal.            │  │
│  │ [ Get my Carfax report → ]   │  │                              │  │
│  │  $9.99 — Powered by Stripe   │  │ ┌──────┐ ┌──────┐            │  │
│  │                              │  │ │photo │ │photo │            │  │
│  │ ✓ Official Carfax report     │  │ │ Name │ │ Name │            │  │
│  │ ✓ Delivered in <90s          │  │ │ AM   │ │ AM   │            │  │
│  │ ✓ 100% refund if not delivd  │  │ │ ☎ + 📅│ │ ☎ + 📅│            │  │
│  │ ✓ Real humans: (XXX)XXX-XXXX │  │ └──────┘ └──────┘            │  │
│  │                              │  │                              │  │
│  │ → See a sample report        │  │ [Book a 15-min call →]       │  │
│  └──────────────────────────────┘  │ Start a free dealer trial →  │  │
│                                    │ First report free · no card  │  │
│                                    └──────────────────────────────┘  │
│  ── BBB · Stripe · Registered in [State] · 123 [Street], [City] ──   │  ← hero trust strip (S)
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│  A real US business, accountable to you.                             │  ← identity-proof-bar (P)
│  [Co. Legal Name LLC] · State of incorporation: [State] · EIN ###### │
│  · BBB A+ (link) · Stripe payments · 123 [Street, City, State, ZIP]  │
│  · Mon–Fri 9am–9pm ET · Founder: [Name]                              │
├──────────────────────────────────────────────────────────────────────┤
│  147,000+ reports delivered to drivers and dealers since 2014.       │  ← volume-served (S)
├──────────────────────────────────────────────────────────────────────┤
│  How it works                                                        │  ← how-it-works (T)
│  [1. Enter VIN]  →  [2. Pay $9.99]  →  [3. PDF in <90s]              │
├──────────────────────────────────────────────────────────────────────┤
│  Pricing                                                             │  ← pricing (S)
│  ┌─────────────────────────┐  ┌─────────────────────────────────┐    │
│  │ ONE REPORT              │  │ DEALERS — VOLUME PRICING        │    │
│  │ $9.99 (was $44.99)      │  │ 25 / 100 / 500 reports/mo       │    │
│  │ Save $35 vs carfax.com  │  │ Per-report cost · Monthly save  │    │
│  │ [ Buy now → ]           │  │ [ Talk to dealer team ]         │    │
│  │ → See a sample report   │  │                                 │    │
│  └─────────────────────────┘  └─────────────────────────────────┘    │
├──────────────────────────────────────────────────────────────────────┤
│  Refund · Delivery · Support — the actual terms                      │  ← refund-terms (P)
│  ┌──── DELIVERY ────┐ ┌──── REFUND ─────┐ ┌──── SUPPORT ─────┐       │
│  │ <90s SLA. If we  │ │ Auto-refund if  │ │ Real US humans.  │       │
│  │ miss, refund     │ │ not delivered   │ │ ☎ (XXX) XXX-XXXX │       │
│  │ triggers at 5min │ │ within 5min. No │ │ Mon–Fri 9–9 ET   │       │
│  │ automatically.   │ │ email required. │ │ support@co.com   │       │
│  └──────────────────┘ └─────────────────┘ └──────────────────┘       │
│  → See a sample report                                               │
├──────────────────────────────────────────────────────────────────────┤
│  Meet the team running this business.                                │  ← meet-the-team (S)
│  ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐                             │
│  │ photo │ │ photo │ │ photo │ │ photo │                             │
│  │Founder│ │Support│ │Dealer │ │Dealer │                             │
│  │ 12yrs │ │ Lead  │ │ AM #1 │ │ AM #2 │                             │
│  └───────┘ └───────┘ └───────┘ └───────┘                             │
├──────────────────────────────────────────────────────────────────────┤
│  Dealers — the volume operators trust this discount.                 │  ← dealer-section (P)
│  ┌── Why dealers switch ─┐ ┌── Volume math at your tier ──┐          │
│  │ • Cost reduction      │ │ 25/mo: $X · save $Y          │          │
│  │ • Direct AM           │ │ 100/mo: $X · save $Y         │          │
│  │ • No quota / no lock  │ │ 500/mo: $X · save $Y         │          │
│  └───────────────────────┘ └──────────────────────────────┘          │
│  ┌── Case study ─────────┐ ┌── Talk to your AM ───────────┐          │
│  │ [Photo of dealership] │ │ [photo] [photo]              │          │
│  │ "We cut our report    │ │  Name    Name                │          │
│  │  spend by 60%."       │ │  ☎ ☎      ☎ ☎                │          │
│  │ — [Name], [Dealership]│ │ [Book a 15-min call →]       │          │
│  └───────────────────────┘ └──────────────────────────────┘          │
├──────────────────────────────────────────────────────────────────────┤
│  What customers say.                                                 │  ← testimonials (S)
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐      │
│  │[photo] Name      │ │[photo] Name      │ │[photo] Name      │      │
│  │ Dealership/Driver│ │ Dealership/Driver│ │ Dealership/Driver│      │
│  │ "Quote..."       │ │ "Quote..."       │ │ "Quote..."       │      │
│  └──────────────────┘ └──────────────────┘ └──────────────────┘      │
├──────────────────────────────────────────────────────────────────────┤
│  FAQ                                                                 │  ← faq (T)
│  Q: Is this an official Carfax?  ▾                                   │
│  Q: Why is this discounted?      ▾                                   │
│  Q: How does the refund work?    ▾                                   │
│  Q: Dealer terms?                ▾                                   │
│  Q: Can I talk to someone?       ▾                                   │
│  Q: Delivery delays?             ▾                                   │
├──────────────────────────────────────────────────────────────────────┤
│  Buy a report now — $9.99   ·   Or call (XXX) XXX-XXXX   ·           │  ← final-cta (S)
│  Dealers: book a 15-min call                                         │
├──────────────────────────────────────────────────────────────────────┤
│  [Co. Legal Name LLC] · 123 Street, City, State, ZIP · EIN ######   │  ← footer (T)
│  ☎ (XXX) XXX-XXXX  Mon–Fri 9–9 ET · support@co.com · BBB · Stripe    │
│  © 2014–2026 [Co.] · Privacy · Terms                                 │
└──────────────────────────────────────────────────────────────────────┘
```

Mobile reflow notes (full responsive spec in Section 8): hero column splits into stacked panels with an audience-pill toggle ("Buy one report" default / "I'm a dealer"); the dealer panel collapses to a sticky "Dealer? Talk to us" CTA when the buyer toggle is active; the top business-identity bar collapses to logo + tap-to-call icon.

---

## Section 8: Responsive Behavior

```
DESKTOP (1440px default):
  - Business-identity bar: full single-line strip across the top.
  - Top nav: logo left, 5-item nav right.
  - Hero: 60/40 split (individual lane left, dealer panel right). Both
    panels visible above the fold. Hero trust strip spans full hero width.
  - Identity proof bar: full-width single-line strip.
  - Pricing: 2-column (B2C card + dealer tiers).
  - Refund-terms: 3-column (Delivery / Refund / Support).
  - Meet the team: 4-column grid.
  - Dealer section: 2x2 grid (Why-switch / Volume math / Case study /
    AM contact).
  - Testimonials: 3-column.
  - Footer: 3-column (identity / contact / legal).

TABLET (768px):
  - Business-identity bar: shortens to "[Co.] · ☎ (XXX) XXX-XXXX · Talk".
  - Top nav: collapses 2 items into "More ▾"; 3 items + logo remain.
  - Hero: REFLOWS to a stacked single-column with audience switch becoming
    a horizontal pill toggle at the top of the hero. Default = individual
    lane visible. Dealer panel is one tap away (no scroll needed to find
    it). Hero trust strip stays full width.
  - Identity proof bar: wraps to 2 lines, stays full width.
  - Pricing: stacks vertically (B2C card on top, dealer tiers below).
  - Refund-terms: stacks to 1 column with section dividers.
  - Meet the team: 2-column grid.
  - Dealer section: stacks vertically with section subheadings.
  - Testimonials: 1-column carousel-style stack (no auto-rotate).
  - Footer: 2-column.

MOBILE (390px):
  - Business-identity bar: collapses to logo + tap-to-call icon + "Dealer?"
    link only. Hours and full company name move into a tap-expandable
    "Real US business — tap for details" strip immediately below.
  - Top nav: hamburger.
  - Hero: stacks
      [Audience pill toggle: Buy / I'm a dealer]
      [Headline + price]
      [Sub line — single sentence trim]
      [VIN input (full-width)]
      [Primary CTA button (full-width, 56px tall)]
      [Microcopy stacked vertical — refund · delivery · processor · phone]
      [→ See sample report]
      [↓ Talking to a person? — collapses dealer panel below]
    The dealer-panel is the next stack item, never hidden, but secondary
    to the active pill state. Pill toggle changes which panel renders
    expanded by default.
  - Identity proof bar: stacks each item on its own line, monochrome.
  - How it works: stacks 1-column, vertical step list.
  - Pricing: stacks B2C card; dealer tiers as a tap-expandable accordion
    ("Dealer pricing — tap to see tiers").
  - Refund-terms: stacks single column, each sub-block as its own card.
  - Meet the team: 1-column grid (or 2-up if photos are small).
  - Dealer section: stacks. AM contact panel becomes a sticky bottom CTA
    when scrolled past ("Dealer? Tap to call (XXX) XXX-XXXX").
  - Testimonials: 1-column stack.
  - FAQ: native accordion.
  - Final CTA strip: stacks 3 buttons (Buy / Call / Dealer-call).
  - Footer: 1-column, all info preserved.

ELEMENTS HIDDEN ON MOBILE: none — every component remains accessible.
The volume-served counter is preserved. The hero trust strip is preserved
but rendered as a tight 2x2 grid of small mono icons + label.

ELEMENTS TRANSFORMED ON MOBILE:
  - 60/40 hero columns → stacked sections with pill toggle
  - 4-AM grid → 1-col list
  - 2x2 dealer section → vertical stack
  - Top business-identity bar → collapsed strip + expandable
  - Phone link → tap-to-call with system dialer
  - Calendar booking link → opens scheduler in new tab/system
```

---

## Section 9: Interaction Notes

```
- VIN input: 17-character validation (length + alphanumeric, exclude I/O/Q
  per ISO 3779). Inline format error — "VIN must be 17 characters
  (no I, O, or Q)" — non-blocking; submit attempts trigger validation.
- Primary CTA (#primary-action): on submit, navigates to checkout with VIN
  prefilled. Network failure shows persistent retry banner with
  "(XXX) XXX-XXXX" callout — never silently fails.
- Sample report link (#sample-action): opens redacted PDF in a new tab;
  a "Buy this report's full version" CTA returns the user to the hero.
- Dealer "Book a 15-min call" CTA: opens calendar widget (e.g., Cal.com /
  Calendly) in modal. Modal must include AM photo + name + direct phone
  fallback for users who don't want to book a slot.
- Phone numbers: all clickable as tel: links. On desktop, also display
  staffed hours on hover ("Mon–Fri 9am–9pm ET").
- Audience pill toggle (mobile/tablet): aria-pressed states; smooth
  scroll-to-top on toggle so users see the relevant lane refreshed.
- FAQ: native <details>/<summary> accordion — no JS dependency.
- Sticky mobile dealer CTA: appears when user scrolls past the hero on
  the dealer pill state; dismissible.
- No urgency timers, no auto-rotating carousels, no auto-playing video,
  no popups, no exit-intent modals. The page does not interrupt.
- All trust badges (BBB, Stripe, registration, BBB profile) are clickable
  to source. Generic non-clickable badges are not used.
```

---

## Section 10: Content Direction

```
OVERALL TONE: Direct, calm, businesslike, transparent. Confident, never
hyped. The voice of a competent operator who has nothing to hide. No
exclamation points. No "amazing" or "best." No urgency manufactured. Numbers
and facts replace adjectives ("$9.99 (was $44.99)" not "incredible savings").

SECTION-BY-SECTION:
  - Business-identity bar: information-only, no marketing voice. Single
    declarative line. ~12 words.
  - Hero headline: states the offer with savings cue inline. Verb-led:
    "Get an official Carfax report — $9.99". 9 words including price.
  - Hero sub: 25–30 words. Two sentences. First disambiguates the
    deliverable, second states the legitimate sourcing.
  - VIN form helper: ≤8 words.
  - Primary CTA: "Get my Carfax report — $9.99". First-person possessive
    ("my") cues purchase psychology without being clever.
  - Primary microcopy: 4 short reassurances joined by middots, ≤20 total
    words. Refund + delivery + processor + phone.
  - Dealer panel headline: "Talking to a person is part of the deal." —
    single sentence, sets B2B tone, signals accountability.
  - Dealer CTA: "Book a 15-min call with [AM Name]" — name lock-in.
  - Identity proof bar: structured data, not prose. Each item is a label-
    value pair: "Registered: [State]" / "EIN: ######" / "Address: 123 ..."
  - How it works: 3 imperatives, ≤6 words each.
  - Pricing: facts and math. B2C: "$9.99/report. Direct from carfax.com:
    $44.99. You save $35." Dealer: "At 100 reports/month, your per-report
    cost drops to $X. That's $Y saved monthly vs. direct."
  - Refund-terms: each sub-block is a 2-sentence factual statement of the
    actual policy. No "we promise" — only triggers, methods, recourse.
  - Meet the team: each card has name, role, 2-line bio. Founder bio
    emphasizes years in automotive-data industry, prior employer if
    relevant, location.
  - Dealer detail: dealer-domain language. Volume math is concrete.
    Case study quote is dealer-business specific ("cut report spend by
    60%", not "great service").
  - Testimonials: each quote is operationally specific (volume, outcome),
    not generic praise. Include role + dealership/location.
  - FAQ: each answer ≤60 words. Direct answers, no hedging.
  - Final CTA strip: 3 short calls-to-action, factual: "Buy now — $9.99".
  - Footer: legal/contact. No marketing copy.

TONE TO AVOID: "Trusted by thousands", "Industry-leading", "We're not like
other resellers", "Don't get scammed elsewhere", "Limited time", "Lowest
prices guaranteed", any superlative without a number.
```

---

## Section 11: Visual Acceptance Spec

### 11A: Viewports & Scenarios

```
VIEWPORTS:
  - Desktop: 1440 x 900
  - Tablet:   768 x 1024
  - Mobile:   390 x 844

SCENARIOS:
  - Cold-traffic individual: lands from social, sees identity strip + hero,
    decides whether to enter VIN within 60s.
  - Warm-referral individual: trusts faster; needs to find VIN form
    immediately without scrolling.
  - Cold-traffic dealer: needs to recognize dealer panel and named AMs in
    first viewport without scroll.
  - Skeptical visitor: wants sample report without paying — must find
    sample link in hero.
  - Mobile cold-traffic: arrives from marketplace listing, must complete
    purchase or open dialer within first 2 stacked sections.
```

### 11B: First Viewport Composition

```
FIRST VIEWPORT (desktop 1440x900):
  - Business-identity bar (#business-identity-bar) renders at top, full-
    width, ≤48px tall.
  - Top nav renders below identity bar.
  - Hero (#primary-section) headline + price visible before scroll.
  - VIN input + primary CTA (#primary-action) visible before scroll, in
    left column.
  - Dealer-contact panel (#dealer-contact-panel) with at least 1 named-AM
    photo + the dealer CTA (#dealer-action) visible before scroll, in right
    column.
  - Sample-report link (#sample-action) visible before scroll, inside
    individual lane.
  - Hero trust strip (BBB / Stripe / registration / address) visible
    before scroll OR within the bottom 80px peek of the fold — must be at
    least partially visible to function as a fold-anchor.
  - Identity proof bar (#identity-proof-bar) MUST peek by ≥40px below the
    fold — signaling "more proof below" without consuming above-the-fold
    real estate.
  - Must NOT render as a single empty hero-only viewport.
  - Must NOT require interaction (tab toggle, accordion, hover) to expose
    either segment's primary path on desktop.

FIRST VIEWPORT (mobile 390x844):
  - Business-identity collapsed bar (logo + ☎ + Dealer?) at top, ≤56px.
  - Audience pill toggle visible immediately below, ≤56px.
  - Hero headline + price visible.
  - VIN input + primary CTA visible (full-width button ≥56px tall).
  - At least 2 lines of microcopy (refund + delivery + processor + phone)
    visible.
  - Sample-report link visible.
  - "Real US business — tap for details" expandable strip visible (≤40px).
  - Dealer panel must be reachable in ≤1 swipe from hero (≤700px scroll).
```

### 11C: Layout Constraints

```
LAYOUT:
  - Desktop: 60/40 hero columns. Individual lane on LEFT (LTR scanning
    primacy). Dealer panel on RIGHT.
  - Tablet: stacked single-column hero with audience pill toggle at top of
    hero region.
  - Mobile: stacked single-column with audience pill toggle, dealer panel
    appears as next stack item below the active lane (never hidden).
  - Hero height: tall enough to contain VIN form + microcopy + dealer
    panel above the fold on desktop ≥900px viewports. May extend below
    fold on shorter viewports but must show dealer panel partial peek.
  - #business-identity-bar owns top-of-page primacy (always rank 1 in
    document order after the optional skip-to-content link).
  - VIN input and dealer CTA share equal visual prominence — neither may
    visually subordinate the other on desktop.
  - #identity-proof-bar is a horizontal strip directly below the hero on
    desktop and tablet; full-width with internal padding ≥24px.
  - No element may overlap the hero's primary CTA or dealer CTA at any
    breakpoint.
  - The page uses a single content column at mobile; no horizontal scroll.
```

### 11D: Density & Rhythm

```
DENSITY:
  - Mode: moderate hybrid (polished-utility per diagnosis).
  - Major sections use moderate separation (24–48px above and below).
  - Hero uses generous internal whitespace around the headline (32–48px
    above, 24px below) but the VIN and dealer panels themselves use tighter
    grouping (8–16px between input/button/microcopy) so the action remains
    primary.
  - Identity proof bar uses compact grouping (12–16px between items) since
    it's a horizontal strip of structured data.
  - Refund-terms block uses moderate spacing between its 3 sub-blocks
    (24px) to imply they are peer concerns.
  - Pricing cards use moderate internal padding (24–32px) so the price
    typography breathes.
  - FAQ uses compact spacing (8px between items).
  - Footer uses moderate spacing.
  - Repeated items (testimonials, AM cards, team cards) use comfortable
    spacing (24px gap on desktop, 16px on mobile).
  - No section may render with so much whitespace that it reads as empty
    enterprise consulting (anti-pattern).
  - No section may render with so little whitespace that it reads as
    coupon-aggregator (anti-pattern).
  - Controls (form fields, buttons) must not visually compete with the
    primary action; secondary CTAs are outline-style or plain text in the
    grayscale wireframe; primary CTA is a filled solid block.
```

### 11E: Required Stable Selectors

```
REQUIRED SELECTORS (must appear as id attributes in the HTML wireframe):
  - #page-root
  - #business-identity-bar
  - #primary-section            (hero)
  - #primary-action             (VIN form / "Get my Carfax report" CTA)
  - #dealer-contact-panel
  - #dealer-action              (Book a 15-min call CTA)
  - #sample-action              (See a sample report link)
  - #identity-proof-bar
  - #refund-terms
  - #meet-the-team
  - #dealer-section
  - #phone-contact              (the canonical phone link, anchored)
  - #footer-info
```

### 11F: Non-Negotiables

```
- Business-identity bar persists at the top of the page across all
  breakpoints.
- VIN input is the first focusable interactive element in the hero on
  desktop and remains so on mobile.
- Dealer-contact panel includes at least 2 named, photographed humans
  with direct phone, calendar booking, and email — no generic "Contact
  Sales" form-wall.
- Sample-report link appears in at least 3 locations: hero, pricing
  block, refund-terms block.
- Refund terms are a labeled standalone block with concrete trigger
  ("if not delivered in 5 minutes"), method ("automatic"), and recourse
  (US phone + hours).
- Phone number is clickable (tel:) at every appearance.
- Identity proof items are clickable to source where applicable (BBB,
  state registration, processor).
- The page contains zero urgency timers, zero auto-rotating carousels,
  zero exit-intent modals, zero auto-playing media.
- The phrase "official Carfax report" appears in the hero. The phrase
  "vehicle history report" without "Carfax" qualification is forbidden.
- Sourcing language is transparent: "We purchase official Carfax reports
  through a licensed Carfax account and pass the savings to you" or
  "Authorized reseller — see [link]" if legally supportable.
- Founder is named and photographed in the team section.
- No element claims authorization, partnership, or status that cannot be
  cited via a clickable source.
```

### 11G: Allowed Variation

```
- Visual treatment of grayscale boxes (color, brand, typography) is
  determined downstream by the visual-architect.
- Exact phone number, AM names/photos, prices, savings figures, volume
  counter, founder bio, dealership case-study names — populated by
  content/data layer.
- Number of dealer tiers may be 2 or 3 depending on actual product.
- Founder photo may move between Team section and Identity proof bar at
  visual designer's discretion (must appear in at least one).
- FAQ count between 6–9 entries.
- Number of testimonials between 3–5.
- Sample-report viewer may be inline modal or new-tab PDF — implementer
  choice.
- Dealer pricing tier exact values are out of scope for layout (data
  binding).
- Sticky mobile dealer-CTA appearance threshold may be tuned (default:
  appears after hero scroll-out).
```

### 11H: Not Allowed

```
- A first viewport without one of: official-Carfax wording, legitimacy
  proof, individual purchase action, dealer access path, savings cue,
  sample-report path.
- A "Contact Sales" form-wall preceding any dealer information.
- Generic icon-only "trust" badges with no source link.
- A founder/team section preceding the action paths.
- An "About us" hero or company-history block above the fold.
- Discount typography that mimics coupon-site aesthetics (large red
  percentages, strike-through prices in alarming colors, "TODAY ONLY"
  banners, fake stock counters).
- Exit-intent popups, scroll-jacking, autoplay video, auto-rotating
  carousels.
- Anonymous testimonials.
- The phrase "vehicle history report" used as a substitute for "Carfax
  report".
- Authorization or partnership claims without a clickable source.
- Any layout that hides the dealer path behind a tab/accordion that
  defaults to closed on desktop.
- Hero VIN form being a click-through to a separate page (must be
  inline).
- Refund/delivery terms living only in FAQ or footer.
- Phone number rendered as image (must be selectable text + tel: link).
```

---

## Section 12: HTML Wireframe Artifact

```
HTML WIREFRAME ARTIFACT:
  File: wireframe.business-identity-and-human-contact-reassurance.html
  Components: 25
  Selectors: 13
  Status: written
```
