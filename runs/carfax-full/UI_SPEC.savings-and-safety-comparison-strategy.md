# UI Spec — Savings-and-Safety Comparison Strategy

## Section 1: Page Classification

```
TYPE: hybrid (marketing dominates — pre-purchase trust establishment for both segments,
              with embedded transactional elements: VIN entry, dealer inquiry)
```

This is a marketing landing page whose conversion event is transactional. Marketing posture (low-density, persuasion-led) governs hierarchy and rhythm; the transactional elements (VIN field, dealer form trigger, sample link) are integrated into that hierarchy rather than dominating it.

---

## Section 2: Intake Summary

```
PURPOSE: Convert visitors into paying customers for discounted official Carfax
  reports — driving (a) one-time report purchases from individual used-car
  buyers and (b) recurring dealer subscriptions for continuous report access.
  The page must establish credibility as a legitimate reseller before either
  action feels safe. Business intent: revenue from both channels, with dealer
  LTV being substantially higher than individual LTV.

AUDIENCE: Two distinct segments that must self-select.
  Segment A — Individual buyer (one-time): vetting a specific car;
    price-sensitive but bounces fast on scam signals; decides in <60s.
  Segment B — Dealer (continuous): expert; methodical; cost-reduction at scale;
    wants volume pricing, terms, business legitimacy proof, and human contact.

CONTEXT: Standalone landing page (root of site).
  Entry: word-of-mouth (warm, partial trust) + social media (cold, full
    skepticism).
  Exit: Individual checkout flow OR dealer contact/signup flow.
  Stage: SELLING (pre-purchase for both segments). Trust establishment is the
    primary conversion blocker.

KEY ACTIONS:
  1. PRIMARY — Buy a report now (VIN → pay → PDF, single flow).
  2. SECONDARY — Set up dealer access (volume plan inquiry/signup).
  3. TERTIARY — See a sample report (low-commitment proof for both segments).
```

---

## Section 3: Flow Map

```
FLOW: Single page (standalone, root of site). Three possible exits:
  (a) Individual checkout flow — initiated by VIN form submission
  (b) Dealer access flow — initiated by dealer CTA (form or contact)
  (c) Sample report PDF — opens in new tab, returns to landing page

  ┌─────────────────────────────┐
  │  Landing (this page)        │
  │  ─ self-selection ─         │
  └──┬───────────┬───────────┬──┘
     │           │           │
     ▼           ▼           ▼
  Checkout    Dealer      Sample
  (1-time     inquiry/    PDF
   purchase)  signup      (returns)
```

---

## Section 4: Decision Map

### 4A: User Decision Sequence

```
PAGE LEVEL:
  User's first question (Individual): "Is this a real way to get the actual
    Carfax report cheaper, or is it a scam?"
  User's first question (Dealer): "Are these legitimate reports at real volume
    savings, and is there a serious business path?"
  Resolved by: Hero block that pairs an explicit price comparison
    ($44.99 → $24.99, official Carfax report) with an inline trust strip
    (secure payment, refund guarantee, business identity, sample link), AND a
    visible dealer pivot in the hero itself.

SECTION LEVEL:
  Scanning for (Individual): "How fast can I buy this for the car I'm looking
    at right now?"
  Scanning for (Dealer): "What does this cost at 30/100/300 reports a month,
    and who do I talk to?"
  Resolved by: A self-selection strip immediately after the hero, then
    parallel sections — a 3-step VIN-to-PDF flow for individuals and a volume
    savings calculator + tiered pricing for dealers — neither subordinated.

COMPONENT LEVEL:
  Click-vs-skip decision: "Will the price comparison be undermined by hidden
    terms or vague guarantees?"
  Resolved by: Every comparison surface (hero card, dealer calculator,
    comparison matrix) sits adjacent to a specific, verifiable safeguard —
    refund terms with conditions, named payment processor, registered business
    identity, delivery SLA. The discount is never shown alone.
```

### 4B: Asset and Evidence Inference

```
PRODUCT/OUTPUT ASSETS:
  - The PDF Carfax report itself — identical content to carfax.com delivery
  - VIN input → instant report retrieval flow (sub-60-second SLA)
  - Dealer dashboard / API for recurring access (recurring product)

PROOF ASSETS:
  - Sample report PDF (the actual format buyers receive)
  - Refund guarantee with stated conditions
  - Stripe payment processor (named, logoed, link-verifiable)
  - Registered business identity (legal name, address, EIN reference)
  - Cumulative reports-delivered counter (volume-served stat)
  - Customer testimonials — segregated individual / dealer
  - Reseller / partner status statement (subject to legal review)

CONVERSION ASSETS:
  - Direct-Carfax price ($44.99) vs. our price ($24.99) — repeated comparison
  - Dealer per-report tiered pricing (e.g., $19 / $16 / $13 at 30/100/300 vol)
  - Monthly savings calculator for dealers
  - "60 seconds or refund" delivery commitment

NAVIGATION/SELF-SELECTION ASSETS:
  - In-hero dealer pivot link
  - Two-card path selector immediately under hero
  - Dealer-specific section anchor in nav
  - Sample report link reachable from hero, mid-page, and final CTA

ACTION VS SIGNAL CLASSIFICATION:
  Actions: VIN input, "Get my report" button, "Talk to a dealer specialist"
    button, "Open sample PDF" link, dealer pricing form trigger.
  Signals: price comparison card, trust strip, sample PDF preview,
    comparison matrix (Us / Carfax direct / Knockoffs), safeguards block,
    testimonials, volume-served stat, FAQ, business identity in footer,
    discount-rationale explainer.
```

### 4C: Strategy Defense

```
ASSIGNED STRATEGY: savings-and-safety-comparison-strategy

WHY THIS STRATEGY FITS THIS INTAKE:
  Both segments are price-aware in opposite ways: individuals know carfax.com
  charges ~$40 and the discount IS the hook; dealers compute per-report
  economics across hundreds of monthly reports. Both experience the discount
  as a trust trigger ("why is this cheaper?"). Leading with a specific
  comparison ($44.99 → $24.99 + dealer per-report tiers), and immediately
  threading safeguards through every comparison surface, lets the discount
  carry conversion weight without inflaming scam suspicion. The diagnosis's
  combined first-viewport obligation — official-Carfax clarity + legitimacy
  proof + individual path + dealer path + savings cue + sample/proof option —
  is naturally satisfied by a comparison-led hero where the comparison itself
  IS the savings cue and demands the safeguard pairing as its load-bearing
  partner. Confidence on fit: high. The risk (price emphasis without enough
  proof) is exactly the local optimum we name and avoid below.

LOCAL OPTIMUM THIS STRATEGY RISKS:
  A coupon-aesthetic hero — giant strikethrough number, screaming
  percentage-off, urgency timer, four floating discount badges. The shallow
  version of this strategy converts the legitimacy concern into MORE doubt
  because the visual register matches the scam pages users are scanning to
  avoid. A second adjacent local optimum: the comparison appears once in the
  hero and never returns, so the safeguards section feels disconnected from
  the offer it is supposed to underwrite.

HOW THIS DESIGN AVOIDS THAT LOCAL OPTIMUM:
  (1) The hero comparison is rendered as a businesslike side-by-side card with
  restrained typography — no strikethrough scream, no urgency timer, no
  exploding discount badge. Polished utility, not coupon-bin. (2) Every
  comparison surface carries an inline safeguard companion: the hero
  comparison card sits inside a trust strip; the dealer volume calculator
  embeds business-identity and terms cues; the page-mid comparison matrix
  explicitly compares Us vs. Carfax direct vs. Knockoffs and shows where each
  proof point lives. (3) A dedicated "Why we can offer this price" block
  (discount-explainer) gives the discount a rational mechanism — the price
  appears reasoned, not magical.

REFERENCE CALIBRATION:
  No reference pack was injected for this run. The architect's structural
  family targets are: high-trust transactional ecommerce (Stripe-style
  product page polish; not luxury, not affiliate), automotive-service
  conversion pages (immediate VIN/plate input as task affordance), and
  dual-path B2C/B2B pages (clean two-card self-selection — Linear/Shopify
  Plus model). The design deliberately diverges from generic SaaS landing
  formula (no abstract benefit-card grid) and from coupon/affiliate
  aggregator visuals (no badge soup). Where there is no reference signal,
  the design errs toward the polished-utility posture named in the
  diagnosis.

STRATEGIC DIAGNOSIS MAPPING:
  - Strategic axis (market_type: hybrid) → self-selection strip + dual final CTA + dealer-prominent block
  - Strategic axis (sales_motion: hybrid) → self-serve VIN form + dealer-specialist contact path
  - Strategic axis (decision_risk: high) → safeguards block + per-CTA risk reducers + comparison matrix
  - Strategic axis (trust_burden: high) → hero trust strip placed BEFORE VIN submit + business identity in hero + sample link in hero
  - Strategic axis (functional_immediacy: high) → VIN input visible in first viewport on desktop AND mobile
  - Strategic axis (audience_sophistication: mixed) → discount-explainer for skeptics; dealer block skips Carfax 101
  - Strategic axis (visual_posture: polished_utility) → grayscale wireframe registers as restrained, comparison cards bordered not painted
  - Strategic axis (content_depth: layered) → progressive disclosure: hero summary → flow steps → sample → discount mechanism → safeguards → FAQ
  - Decision step 1 (relevant?) → hero-eyebrow + hero-headline ("official Carfax reports — discounted")
  - Decision step 2 (legitimate?) → hero-trust-strip + sample-pdf-preview + comparison-matrix + safeguards-section
  - Decision step 3 (economics?) → hero-comparison-card + dealer-volume-calculator + discount-explainer-body
  - Decision step 4 (which path?) → path-individual-card + path-dealer-card + dealer-section anchor
  - Decision step 5 (commit or proof first?) → hero-vin-form (commit) + hero-sample-link (proof) + dealer-primary-cta (commit) + sample-open-cta (proof)
  - Decision step 6 (recourse?) → safeguard-refund + safeguard-delivery + safeguard-support + footer-contact
  - Audience need (individual: <60s decision) → VIN field above the fold, single-screen flow visualization
  - Audience need (dealer: methodical evaluation) → tiered pricing visible without contact, calculator, named account-manager path
  - Buyer fear (knockoff substitute) → "official Carfax report" wording in headline, eyebrow, sample callout, comparison matrix column
  - Buyer fear (hidden terms) → safeguards-section enumerates refund conditions, delivery SLA, payment, support
  - Buyer fear (unverifiable claim) → footer-business-identity surfaces legal name + address; only specific named processors used

FIRST VIEWPORT OBLIGATION:
  Diagnosis: "Within the first viewport, the page must make visitors understand
    that they can buy discounted official Carfax reports safely, verify
    legitimacy enough to continue, and choose between individual purchase and
    dealer access."
  Desktop first-fold components (1440x900, no scroll):
    - hero-eyebrow ("Official Carfax® reports — authorized resale")
    - hero-headline (savings claim with official-Carfax wording)
    - hero-comparison-card (Carfax direct $44.99 vs. ours $24.99)
    - hero-subhead (one-line explainer)
    - hero-trust-strip (4 chips: secure payment / refund / business ID / sample)
    - hero-vin-form (VIN input + "Get my report — $24.99" submit)
    - hero-dealer-pivot ("Run a dealership? Volume access →")
    - hero-sample-link ("See a real sample report (PDF, no signup)")
  Mobile first-fold components (390x844, no scroll past initial screen):
    - hero-eyebrow (compressed)
    - hero-headline (single short line)
    - hero-comparison-card (stacked vertical: Carfax $44.99 / Ours $24.99)
    - hero-trust-strip (horizontal-scroll chip row OR 2x2 grid)
    - hero-vin-form (VIN input + button — primary action visible)
    - hero-dealer-pivot (subordinated link, but visible)
    - hero-sample-link (visible at bottom of first screen as tertiary)

HARD FLOOR COVERAGE:
  - hf_first_viewport_legitimacy_and_self_selection → hero block carries
    official Carfax wording (eyebrow, headline), trust strip (legitimacy),
    hero-vin-form (individual path), hero-dealer-pivot (dealer path),
    hero-comparison-card (savings cue), hero-sample-link (low-commitment proof)
  - hf_early_legitimacy_proof → hero-trust-strip placed BETWEEN
    hero-comparison-card and hero-vin-form, so trust evidence appears before
    the first commitment-oriented action
  - hf_segment_self_selection → hero-dealer-pivot in hero + path-individual-card
    + path-dealer-card immediately after hero + dedicated dealer-section
  - hf_individual_purchase_immediacy → hero-vin-form in first viewport;
    flow-step cards visualize the 3-step path; nothing dealer-specific
    interrupts the individual flow
  - hf_dealer_path_prominence → dealer-section is full-bleed, includes
    volume calculator, tiered pricing, business proof, named contact path —
    not a footer afterthought
  - hf_official_report_clarity → "official Carfax report" wording in
    hero-eyebrow, hero-headline, sample-authenticity-callout, comparison-matrix
  - hf_transparent_terms_and_safety → safeguards-section enumerates refund
    conditions, delivery SLA, payment processor, support; appears before
    final CTA; per-CTA risk reducers ("No charge until report ready")
  - hf_proof_for_skeptics → hero-sample-link + sample-pdf-preview block +
    sample-open-cta + final-cta-sample (sample reachable in 3 separate
    page locations)
  - hf_mobile_conversion_path → mobile first-fold preserves trust strip,
    VIN form, comparison card; safeguards-section uses single-column stack;
    sample-pdf-preview compresses to portrait orientation

ANTI-PATTERN AVOIDANCE:
  - ap_coupon_scam_aesthetic → no urgency timers, no exploding discount
    badges, no strikethrough scream typography; comparison rendered as
    a bordered card with equal-weight columns
  - ap_buried_trust → trust strip in hero (not footer); refund language at
    every CTA; safeguards-section above final CTA, not after it
  - ap_individual_only_bias → dealer-section is a major page region, not
    a footer line; dealer-pivot in hero; dealer-specific testimonial
  - ap_dealer_overeducation → dealer-section opens with volume math, not
    "What is a Carfax report"; assumes expertise
  - ap_ambiguous_product_naming → "official Carfax report" is the product
    name throughout; comparison-matrix column header is "Official Carfax
    report (carfax.com)" vs. "Official Carfax report (us)" vs. "Generic
    knockoff report"
  - ap_unsubstantiated_authority_claims → only specific, verifiable proof:
    named payment processor, registered business name + address, real
    refund terms; reseller status appears only if legally supportable per
    diagnosis assumption
  - ap_long_brand_story_before_task → no "About us" before action; first
    company-identity content appears in footer
  - ap_hidden_or_vague_refund_terms → safeguard-refund states conditions
    (delivery failure, report mismatch), timeframe, and contact path
  - ap_generic_saas_visual_formula → vehicle-specific affordances (VIN
    input, sample PDF preview, per-report pricing); no abstract
    benefit-card grid
```

### 4D: Component Justification

| Component | User Lens | Business Lens | Verdict |
|-----------|-----------|---------------|---------|
| logo + nav | Orientation; signals real business | Brand recall, repeat-visit | Include — minimal nav (sample / dealer / sign-in) |
| hero-eyebrow | Resolves "what kind of site is this" | Sets product category clearly | Include — short, official-Carfax wording |
| hero-headline | Answers "is this a real cheaper way to get the report" | Hooks both segments on price | Include — comparison-led, names savings |
| hero-comparison-card | Makes savings concrete, not vague | Differentiates from full-price direct | Include — STRATEGY CORE |
| hero-subhead | Resolves "what exactly do I receive" | Reduces post-click confusion | Include — short, names PDF + delivery |
| hero-trust-strip | Resolves "is this safe before I enter VIN" | Reduces bounce on cold traffic | Include — STRATEGY GUARDRAIL |
| hero-vin-form | Direct task affordance for individual | Primary individual revenue event | Include — primary action |
| hero-dealer-pivot | Lets dealers know they aren't on wrong page | Dealer LTV is high | Include — visible in first viewport |
| hero-sample-link | Low-commitment proof for skeptics | Converts hesitant visitors later | Include — tertiary in hero |
| path-individual-card | Reinforces self-selection after hero | Reduces dealer/individual confusion | Include — paired secondary |
| path-dealer-card | Reinforces dealer path is real | Surfaces dealer LTV channel | Include — paired secondary |
| flow-step cards (3) | Resolves "how fast / how" | Reduces abandonment in checkout | Include — minimal, scannable |
| sample-pdf-preview | Resolves "is this the same PDF" | Single highest-leverage proof asset | Include — STRATEGY GUARDRAIL |
| sample-authenticity-callout | Names the equivalence explicitly | Closes legitimacy gap | Include |
| sample-open-cta | Lets skeptics actually open sample | Recovers hesitant visitors | Include |
| dealer-volume-calculator | Resolves "is it worth at my volume" | Dealer qualification | Include — STRATEGY CORE for dealer |
| dealer-pricing-tiers | Resolves "show me terms before I contact" | Reduces unqualified leads | Include |
| dealer-trust-row | Business identity for B2B buyer | Dealer LTV protection | Include |
| dealer-primary-cta | Direct B2B conversion event | Higher LTV channel | Include — primary in dealer block |
| discount-explainer | Resolves "why is this cheaper" rationally | Defuses scam suspicion | Include — STRATEGY GUARDRAIL |
| comparison-matrix | Distinguishes us from knockoffs explicitly | Reseller-vs-knockoff differentiation | Include |
| safeguards (5) | Resolves "what if it goes wrong" | Reduces refund anxiety, support tickets | Include — pre-final-CTA |
| volume-stat | "Many others trusted this" | Social proof — credible if real | Include if numbers verifiable |
| testimonial-individual | Peer endorsement for cold traffic | Conversion lift on hesitant | Include |
| testimonial-dealer | Peer endorsement for B2B | Dealer conversion lift | Include |
| faq-block | Resolves residual objections | Reduces support load | Include |
| final-cta-individual + dealer | Last-chance conversion both segments | Both revenue channels | Include — dual-action |
| final-cta-sample | Last-chance proof for non-buyers | Recovers exit traffic | Include |
| footer-business-identity | Final accountability proof | Legal compliance | Include |
| footer-legal + contact | Standard | Standard | Include |

Excluded by design:
- Urgency timer, "limited time offer" badge → coupon-aesthetic anti-pattern
- "About us" hero / brand story → long-brand-story-before-task anti-pattern
- Generic "trusted by 10,000+ users" without specifics → unsubstantiated-authority anti-pattern
- "What is a Carfax report" 101 explainer → dealer-overeducation anti-pattern; individuals already know

### 4E: Tension Map

```
TENSION: Hero comparison-card visual prominence
  Business pull: Make the savings POP — that's what hooks both segments.
  User pull: A loud discount visual reads as scammy in this category.
  Resolution: Comparison rendered as a businesslike, equal-weight,
    bordered side-by-side card. Numbers are large but typography is
    restrained. The visual partner is the trust strip, not a discount badge.
    The savings register as a verifiable fact, not a marketing claim.

TENSION: Hero VIN-form prominence vs. trust-first sequencing
  Business pull: VIN field above the fold = highest individual conversion.
  User pull: Cold traffic won't enter a VIN before legitimacy is established.
  Resolution: VIN form is in first viewport, but the trust strip is rendered
    BETWEEN the comparison card and the VIN form (vertical stacking).
    Visual flow: claim → proof → action. The action is reachable without
    scrolling, but the proof is encountered first.

TENSION: Dealer prominence vs. individual flow speed
  Business pull: Dealer LTV is substantially higher; dealer must be
    materially visible.
  User pull: Individual urgent buyers will bounce if dealer content
    interrupts their VIN-to-PDF path.
  Resolution: Dealer content appears in TWO modes. (1) A small in-hero
    pivot link ("Run a dealership? →") — subordinate, doesn't interrupt.
    (2) A full dealer-section AFTER the individual flow steps, BEFORE
    the comparison matrix. Dealer block is full-bleed and visually
    distinct, but doesn't block the individual flow above it.

TENSION: Discount-explainer length vs. avoiding long brand story
  Business pull: Explaining why we're cheaper defuses suspicion.
  User pull: Long explainers before action waste decision-time.
  Resolution: Discount-explainer is 2-3 short lines + a 3-column comparison
    matrix. Total height is under one viewport. It appears mid-page, AFTER
    the individual flow and dealer block, where users who got that far are
    actually evaluating the rationale.

TENSION: Sample report prominence vs. distracting from purchase
  Business pull: Sample is the strongest proof asset; should be prominent.
  User pull: Easy sample access could divert motivated buyers.
  Resolution: Sample appears as a tertiary link (not a button) in the hero,
    a dedicated mid-page proof block, and a tertiary link in final CTA.
    The dedicated block uses a preview placeholder that itself acts as the
    open-sample affordance, but the surrounding section recapitulates the
    primary CTAs immediately after, recovering motivated buyers who scrolled.
```

---

## Section 5: Visual Hierarchy Map

```
PRIMARY (dominant visual weight):
  1. hero-headline — the single largest type on the page; resolves the
     core "is this real and cheaper" question in one line
  2. hero-comparison-card — strategy-core visual; large numbers, equal
     left/right columns, businesslike border, no decoration
  3. hero-vin-form — primary CTA + input field, full-width on desktop
  4. dealer-volume-calculator — STRATEGY CORE for dealer audience;
     equal visual weight to hero-comparison-card for dealer segment
  5. sample-pdf-preview — large gray-box PDF preview with overlay CTA
  6. final-cta-individual + final-cta-dealer (paired) — repeated dual
     primary action at page end

SECONDARY (supporting):
  7. hero-trust-strip — strategy guardrail; visually quiet but always
     adjacent to comparison and CTA
  8. path-individual-card / path-dealer-card — equal-weight split cards
  9. flow-step cards (3) — small numbered cards, subordinate to dealer
     and sample blocks
  10. dealer-pricing-tiers
  11. dealer-trust-row
  12. comparison-matrix — 3-column table, mid-page
  13. discount-explainer-body
  14. safeguards-section (5 safeguard items)
  15. faq-block
  16. testimonial-individual / testimonial-dealer
  17. volume-stat

TERTIARY (recessive):
  18. logo + nav-sample-link + nav-dealer-link + nav-signin-link
  19. hero-eyebrow — small label above headline
  20. hero-dealer-pivot — small in-hero link
  21. hero-sample-link — small in-hero link
  22. final-cta-sample
  23. footer-business-identity
  24. footer-legal-links
  25. footer-contact
```

---

## Section 6: Component Inventory

| Component | Class | Purpose | Content Direction |
|---|---|---|---|
| logo | T | Site identity | Wordmark, no tagline |
| nav-sample-link | T | Sample report shortcut | "Sample report" |
| nav-dealer-link | T | Dealer section shortcut | "For dealers" |
| nav-signin-link | T | Returning customer | "Sign in" |
| hero-eyebrow | T | Product-category clarity | "OFFICIAL CARFAX® REPORTS — AUTHORIZED RESALE" (or legal-safe equivalent) |
| hero-headline | P | Core savings + product claim | 8-12 words, names price savings AND "official Carfax report" |
| hero-comparison-card | P | Make savings concrete | Two columns: "Carfax.com $44.99" / "Through us $24.99 — same official report"; numbers large, restrained |
| hero-subhead | S | Explainer | 1 sentence, ≤20 words: what they receive, when |
| hero-trust-strip | S | Inline legitimacy | 4 chips: "Stripe-secured payment" / "Refund if not delivered" / "Registered U.S. business" / "See sample report ↗" |
| hero-vin-form | P | Primary action | VIN input field + "Get my report — $24.99" submit |
| hero-dealer-pivot | S | Dealer recognition in hero | "Run a dealership? See volume access →" |
| hero-sample-link | T | Low-commitment proof | "Or open a real sample (PDF, no signup) ↗" |
| path-individual-card | S | Reinforce self-selection | "I'm buying ONE report" + 1-line summary + button |
| path-dealer-card | S | Reinforce self-selection | "I need recurring access (30+/mo)" + 1-line summary + button |
| flow-heading | S | Frame the 3-step flow | "How a single purchase works" |
| flow-step-card-1 | S | Step 1 | "Enter VIN" — 1-line description |
| flow-step-card-2 | S | Step 2 | "Pay securely (Stripe)" — 1-line description |
| flow-step-card-3 | S | Step 3 | "Receive PDF in 60 seconds" — 1-line description; or refund |
| sample-heading | S | Frame the sample | "See exactly what you get" |
| sample-pdf-preview | P | Authenticity proof | Tall portrait gray box rendered as PDF page; overlay CTA |
| sample-authenticity-callout | S | Equivalence claim | "Identical to the PDF carfax.com delivers — same data, same format, same source." |
| sample-open-cta | S | Action on sample | "Open full sample report (2 pages, PDF)" |
| dealer-section-heading | P | Frame dealer block | "For dealerships and recurring buyers" |
| dealer-volume-calculator | P | Volume savings logic | Slider or tiered table: monthly volume → monthly savings vs. carfax.com; 3 visible tiers |
| dealer-pricing-tiers | S | Concrete per-report pricing | 3-tier card row: 30/mo $19, 100/mo $16, 300/mo $13 |
| dealer-trust-row | S | Business legitimacy for B2B | Reg'd business + named account manager + monthly invoicing terms + W-9 available |
| dealer-primary-cta | P | Dealer action | "Talk to a dealer specialist" — opens contact form |
| dealer-secondary-cta | S | Lower-friction dealer action | "See full dealer pricing (PDF)" |
| discount-explainer-heading | S | Frame the rationale | "Why we can sell official Carfax reports cheaper" |
| discount-explainer-body | S | Mechanism, 2-3 short lines | Volume reseller relationship, lower margin, no advertising spend; specific |
| comparison-matrix | P | Differentiate from knockoffs | 3-column table: Carfax direct / Us / Generic knockoff — rows: report source, price, delivery, refund, dealer terms |
| safeguards-heading | S | Frame the safeguards | "What you're protected by" |
| safeguard-refund | S | Refund terms | "Full refund within 24h if report fails to deliver or doesn't match VIN. Email support@…" |
| safeguard-delivery | S | Delivery SLA | "60-second delivery on 99.4% of orders. If your report takes >5 min, automatic refund." |
| safeguard-payment | S | Payment processor | "All payments processed by Stripe. We never see your card number." |
| safeguard-identity | S | Business identity | "Registered Delaware C-corp, EIN 00-0000000, 123 Example St. (See footer.)" |
| safeguard-support | S | Support reachability | "Email + phone support, 7 days/week. Avg first response: 14 min." |
| volume-stat | S | Volume served | "Reports delivered since 2021: 412,318" — number must be real |
| testimonial-individual | T | Individual peer proof | 1 quote, 1 attribution (first name + city), 1 line context |
| testimonial-dealer | T | Dealer peer proof | 1 quote, 1 attribution (named dealership), 1 line context |
| faq-block | S | Pre-purchase objections | 6 Q&As: Is this an official Carfax report? Why is it cheaper? What if delivery fails? Dealer-specific terms? Refund process? Report sample? |
| final-cta-heading | S | Recap | "Ready to buy?" |
| final-cta-individual | P | Individual close | VIN input + button; restates price and trust chips |
| final-cta-dealer | P | Dealer close | "Talk to a dealer specialist" with phone + email shown |
| final-cta-sample | T | Last-chance proof | "Or open a sample report first ↗" |
| footer-business-identity | T | Accountability | Legal name, address, EIN, contact email |
| footer-legal-links | T | Compliance | Terms / Privacy / Refund policy / Carfax trademark notice |
| footer-contact | T | Reachability | Phone, email, hours |

Total: 47 components.

---

## Section 7: ASCII Wireframe

### Desktop (1440x900 baseline)

```
┌────────────────────────────────────────────────────────────────────┐
│ [logo]   For dealers · Sample report · Sign in                     │  Header
├────────────────────────────────────────────────────────────────────┤
│ OFFICIAL CARFAX® REPORTS — AUTHORIZED RESALE                       │  hero-eyebrow
│                                                                    │
│ Save $20 on every official Carfax report.                          │  hero-headline (P)
│                                                                    │
│ ┌──────────────────────┐    ┌──────────────────────┐               │
│ │ carfax.com           │    │ Through us            │               │  hero-comparison-card (P)
│ │ $44.99 / report      │    │ $24.99 / report       │               │
│ │                      │    │ same official report  │               │
│ └──────────────────────┘    └──────────────────────┘               │
│                                                                    │
│ The same PDF carfax.com delivers, in under 60 seconds.             │  hero-subhead
│                                                                    │
│ [Stripe-secured] [Refund if not delivered] [Registered US biz]     │  hero-trust-strip
│ [See sample report ↗]                                              │
│                                                                    │
│ ┌─────────────────────────────────────────────────┐ ┌───────────┐  │
│ │ VIN: [ 17-character VIN _______________ ]       │ │ Get my    │  │  hero-vin-form (P)
│ │                                                 │ │ report    │  │
│ │                                                 │ │ — $24.99  │  │
│ └─────────────────────────────────────────────────┘ └───────────┘  │
│                                                                    │
│ Run a dealership? → See volume access     Or open a real sample ↗  │  hero-dealer-pivot + sample
├────────────────────────────────────────────────────────────────────┤
│ ┌───────────────────────────┐     ┌───────────────────────────┐   │
│ │ I'm buying ONE report     │     │ I need recurring access   │   │  path-individual /
│ │ for a specific car.       │     │ (30+ reports/month)       │   │  path-dealer
│ │ → buy now                 │     │ → see dealer pricing      │   │
│ └───────────────────────────┘     └───────────────────────────┘   │
├────────────────────────────────────────────────────────────────────┤
│ How a single purchase works                                        │  flow-heading
│                                                                    │
│ ┌────────────┐   ┌────────────┐   ┌────────────────────────┐      │
│ │ 1. Enter   │ → │ 2. Pay     │ → │ 3. Receive PDF in      │      │  flow-step cards
│ │    VIN     │   │    via     │   │    60 sec — or refund  │      │
│ │            │   │    Stripe  │   │                        │      │
│ └────────────┘   └────────────┘   └────────────────────────┘      │
├────────────────────────────────────────────────────────────────────┤
│ See exactly what you get                                           │  sample-heading
│                                                                    │
│ ┌──────────────────────┐   Identical to the PDF carfax.com        │  sample-pdf-preview (P)
│ │                      │   delivers — same data, same format,      │  sample-authenticity-callout
│ │   [PDF preview —     │   same source.                            │
│ │    page 1 of 2]      │                                           │
│ │                      │   ┌───────────────────────────────┐      │
│ │                      │   │ Open full sample report (PDF) │      │  sample-open-cta
│ │                      │   └───────────────────────────────┘      │
│ └──────────────────────┘                                           │
├────────────────────────────────────────────────────────────────────┤
│ For dealerships and recurring buyers                               │  dealer-section-heading (P)
│                                                                    │
│ ┌──────────────────────────────────────────────────────────────┐  │
│ │ Volume savings calculator                                    │  │  dealer-volume-calculator (P)
│ │ Reports per month: [────●──────] 100                         │  │
│ │   At carfax.com:           $4,499/mo                         │  │
│ │   Through us (100/mo):     $1,600/mo                         │  │
│ │   You save:                $2,899/mo  •  $34,788/yr          │  │
│ └──────────────────────────────────────────────────────────────┘  │
│                                                                    │
│ ┌────────────┐   ┌────────────┐   ┌────────────┐                  │
│ │ 30/mo      │   │ 100/mo     │   │ 300+/mo    │                  │  dealer-pricing-tiers
│ │ $19/report │   │ $16/report │   │ $13/report │                  │
│ │ Monthly inv│   │ Net 15     │   │ Net 30     │                  │
│ └────────────┘   └────────────┘   └────────────┘                  │
│                                                                    │
│ Registered US business · Named account manager · Monthly inv.      │  dealer-trust-row
│                                                                    │
│ ┌────────────────────────────┐  ┌──────────────────────────┐      │
│ │ Talk to a dealer specialist│  │ See full dealer pricing  │      │  dealer-primary + secondary
│ └────────────────────────────┘  └──────────────────────────┘      │
├────────────────────────────────────────────────────────────────────┤
│ Why we can sell official Carfax reports cheaper                    │  discount-explainer
│ We're a volume reseller. Lower margin per report, no ad spend,     │
│ no aggressive marketing. The reports are unchanged.                │
│                                                                    │
│ ┌─────────────────┬─────────────────┬─────────────────────┐       │
│ │ carfax.com      │ Through us      │ Generic knockoff    │       │  comparison-matrix (P)
│ ├─────────────────┼─────────────────┼─────────────────────┤       │
│ │ Source: Carfax  │ Source: Carfax  │ Source: ?           │       │
│ │ Price: $44.99   │ Price: $24.99   │ Price: $5–10        │       │
│ │ Delivery: 60s   │ Delivery: 60s   │ Delivery: varies    │       │
│ │ Refund: standard│ Refund: 24h     │ Refund: ?           │       │
│ │ Dealer: yes     │ Dealer: yes     │ Dealer: no          │       │
│ └─────────────────┴─────────────────┴─────────────────────┘       │
├────────────────────────────────────────────────────────────────────┤
│ What you're protected by                                           │  safeguards-heading
│                                                                    │
│ Refund      Delivery SLA   Payment    Business ID    Support       │  safeguard cards (5)
│ 24h        99.4% in 60s   Stripe     Reg'd Del.     14-min avg    │
├────────────────────────────────────────────────────────────────────┤
│ 412,318 reports delivered since 2021                               │  volume-stat
│                                                                    │
│ "Bought one for a Civic I almost bought — saved me $4k."           │  testimonial-individual
│ — Jamie, Austin TX                                                 │
│                                                                    │
│ "We pull ~150 reports/mo. Saves us about $32k/yr — same report."   │  testimonial-dealer
│ — Allen Motors, Tucson AZ                                          │
├────────────────────────────────────────────────────────────────────┤
│ Frequently asked                                                   │  faq-block
│ ▸ Is this really an official Carfax report? …                      │
│ ▸ Why is it cheaper? …                                             │
│ ▸ What if delivery fails? …                                        │
│ ▸ How does dealer access work? …                                   │
│ ▸ How does the refund process work? …                              │
│ ▸ Can I see a sample first? …                                      │
├────────────────────────────────────────────────────────────────────┤
│ Ready to buy?                                                      │  final-cta-heading
│                                                                    │
│ ┌──────────────────────────────────┐ ┌──────────────────────────┐  │
│ │ VIN: [_____________________]     │ │ Talk to a dealer         │  │  final-cta-individual /
│ │ [Get my report — $24.99]         │ │ specialist               │  │  final-cta-dealer
│ │ Stripe secured · 24h refund      │ │ (555) 555-1234           │  │
│ └──────────────────────────────────┘ └──────────────────────────┘  │
│                                                                    │
│ Or open a real sample report first ↗                              │  final-cta-sample
├────────────────────────────────────────────────────────────────────┤
│ Example Co., 123 Example St., Wilmington DE  EIN 00-0000000        │  footer-business-identity
│ Terms · Privacy · Refund policy · Trademark notice                 │  footer-legal-links
│ support@example.com · (555) 555-1234 · Mon–Sun 8a–10p ET           │  footer-contact
└────────────────────────────────────────────────────────────────────┘
```

---

## Section 8: Responsive Behavior

```
DESKTOP (1440 baseline):
  - Single content column constrained to ~1100px max width, centered
  - Hero: comparison-card uses 2-col side-by-side, VIN form full row
  - Self-selection: 2 path cards side-by-side
  - Flow steps: 3-card horizontal row
  - Sample: 2-col (preview left, callout right)
  - Dealer pricing tiers: 3-card horizontal row
  - Comparison matrix: 3-col table
  - Safeguards: 5-col row OR 5-card grid
  - Final CTA: individual + dealer side-by-side

TABLET (~768):
  - Hero comparison-card: stays 2-col but slightly tighter
  - Self-selection: 2-col preserved
  - Flow steps: 3-col preserved (smaller)
  - Sample: 1-col stack (preview above callout)
  - Dealer pricing tiers: 3-col preserved (tighter)
  - Comparison matrix: 3-col preserved (smaller text)
  - Safeguards: 2x3 grid (refund/delivery/payment row 1; identity/support row 2)
  - Final CTA: individual + dealer stacked (single col)

MOBILE (≤640):
  - Hero comparison-card: STACK vertical (Carfax above, Us below) —
    preserve "compare two prices" reading; trust strip becomes 2x2 grid
  - hero-vin-form: full-width input above full-width button
  - hero-dealer-pivot + hero-sample-link: stacked tertiary links
  - Self-selection: 1-col stack — individual card above dealer card
  - Flow steps: 1-col stack with vertical connectors
  - Sample: 1-col stack; preview height ~480px
  - Dealer volume calculator: simplified — slider + 2 numbers
  - Dealer pricing tiers: 1-col stack
  - Dealer trust-row: 1-col stack
  - Comparison matrix: TRANSFORM — 3 vertically-stacked column groups,
    each labeled with the column header (carfax.com / us / knockoff);
    rows become labeled lines within each group
  - Safeguards: 1-col stack
  - Testimonials: 1-col stack
  - FAQ: accordion (one open at a time, native <details>)
  - Final CTA: stacked — individual VIN form, then dealer button,
    then sample link
  - Footer: 1-col stack

NAVIGATION:
  - Desktop: top nav bar — logo left, 3 links right
  - Tablet: same as desktop
  - Mobile: logo left, hamburger menu right (For dealers / Sample / Sign in)
```

---

## Section 9: Interaction Notes

```
hero-vin-form:
  - VIN input validates on blur (17 chars, alphanumeric except I/O/Q)
  - On invalid VIN, inline error below input ("VIN must be 17 characters
    excluding I, O, Q") — does NOT block decision-making about the offer
  - On submit with valid VIN, transitions to checkout flow with VIN
    pre-populated
  - Per-CTA risk reducer "Stripe secured · 24h refund" stays visible

hero-trust-strip:
  - "See sample report ↗" chip opens sample PDF in new tab; click also
    triggers a one-time "you can come back" toast at top of returning page
    (not implemented in static wireframe)

hero-sample-link / sample-open-cta / final-cta-sample:
  - All open the same canonical sample PDF in new tab

dealer-volume-calculator:
  - Slider (30 → 500 reports/month) updates 3 numbers live: monthly
    carfax.com cost, monthly through-us cost, monthly + annual savings
  - On mobile, slider replaced by 3-pill selector (30/100/300)

dealer-primary-cta:
  - Opens contact form modal (or inline form on mobile) — name, email,
    phone, dealership name, est. monthly volume
  - On submit, success state with named account manager assigned

faq-block:
  - Native HTML5 <details>/<summary> accordion — first item open by default
    on desktop, all closed on mobile

comparison-matrix mobile:
  - Each column header is a sticky group label as user scrolls through
    that column's rows

ALL CTAs:
  - Keyboard accessible, visible focus ring
  - 44x44px minimum touch target on mobile
  - Per accessibility: focus order matches visual order top-to-bottom
```

---

## Section 10: Content Direction

```
OVERALL TONE:
  Direct, credible, practical, transparent, reassuring; confident without
  hype. Read like a trustworthy specialist explaining a real offer, not a
  marketer pitching a deal. Numbers always carry units and qualifiers
  ("$24.99 / report"). No exclamation points. No "amazing." No
  "limited time." No countdown framing.

SECTION-BY-SECTION:

Hero:
  - hero-eyebrow: small caps; product-category clarity; "OFFICIAL CARFAX®
    REPORTS — AUTHORIZED RESALE" or legal-safe equivalent
  - hero-headline: 8-12 words; specific savings claim with "official Carfax
    report" wording; no hype; e.g., "Save $20 on every official Carfax
    report" or "Official Carfax reports — $20 less than carfax.com"
  - hero-comparison-card: terse — "carfax.com · $44.99 / report" |
    "Through us · $24.99 / report · same official report"; no decoration
    around the numbers
  - hero-subhead: 1 sentence ≤20 words; names PDF + delivery; e.g., "The
    same PDF carfax.com delivers, emailed in under 60 seconds."
  - hero-trust-strip: 4 chips, terse: "Stripe-secured payment" / "Refund
    if not delivered" / "Registered U.S. business" / "See sample report ↗"
  - hero-vin-form: button label "Get my report — $24.99"; risk reducer
    "Stripe secured · 24-hour refund" beneath
  - hero-dealer-pivot: "Run a dealership? See volume access →"
  - hero-sample-link: "Or open a real sample report (PDF, no signup) ↗"

Self-selection cards:
  - Individual: "I'm buying ONE report" + "For a specific used car you're
    considering. $24.99, 60-second delivery, full refund if delivery fails."
  - Dealer: "I need recurring access" + "30+ reports per month at volume
    pricing. Tiered rates, monthly invoicing, named account manager."

Flow steps:
  - 1-line each, action-led; "Enter your VIN" / "Pay through Stripe" /
    "Receive your PDF in 60 seconds — or refund"

Sample section:
  - Heading: "See exactly what you get"
  - Authenticity callout: "Identical to the PDF carfax.com delivers —
    same data, same format, same source. Compare for yourself."
  - Open CTA: "Open full sample report (2 pages, PDF)"

Dealer section:
  - Heading: "For dealerships and recurring buyers"
  - Volume calculator: numbers only; no marketing copy inside the calc
  - Pricing tiers: per-report price + minimum volume + invoicing terms;
    no marketing copy
  - Trust row: short, specific: "Registered U.S. business · Named account
    manager · Monthly invoicing · W-9 available · Net 15/Net 30 terms"
  - Primary CTA: "Talk to a dealer specialist" (not "Get started")

Discount explainer:
  - Heading: "Why we can sell official Carfax reports cheaper"
  - Body: 2-3 short lines; specific mechanism; e.g., "We're a volume
    reseller — lower per-report margin, no advertising spend, no
    aggressive cross-sell. The reports themselves are unchanged."

Comparison matrix:
  - Column headers: "carfax.com" / "Through us" / "Generic knockoff"
  - Rows: Source · Price · Delivery · Refund · Dealer terms · Brand
  - Cells: short, factual, no marketing language

Safeguards:
  - Heading: "What you're protected by"
  - Each item is one short sentence with a specific number where possible
    (24 hours, 60 seconds, 14 minutes, etc.)

Volume stat: "Reports delivered since 2021: {real number}"

Testimonials:
  - Individual: 1-line quote, first-name + city attribution
  - Dealer: 1-line quote, named dealership + city attribution
  - Both should reference SPECIFIC outcomes (savings, delivery speed)

FAQ:
  - 6 Q&As; questions in user voice; answers terse, specific, no hype

Final CTA:
  - Heading: "Ready to buy?"
  - Individual: VIN form repeats hero treatment
  - Dealer: button + visible phone number
  - Sample link: "Or open a real sample first ↗"

Footer:
  - Business identity is plain text, not decorated
  - Trademark notice: "Carfax® is a registered trademark of Carfax, Inc.
    {Company} is an authorized reseller and not affiliated with Carfax,
    Inc. except as a reseller."
```

---

## Section 11: Visual Acceptance Spec

### 11A: Viewports & Scenarios

```
VIEWPORTS:
  - Desktop: 1440x900
  - Tablet:  768x1024
  - Mobile:  390x844

SCENARIOS (visual-only — no JS in wireframe, but spec-bound for downstream):
  - Cold-traffic individual: lands; sees hero; first instinct is skepticism;
    must reach trust strip + sample link before scrolling
  - Warm-referral individual: lands; ready to enter VIN; must reach VIN
    form without scrolling on desktop
  - Dealer: lands; recognizes hero is consumer-facing but sees dealer pivot
    immediately; jumps to dealer-section via nav OR self-selection card
  - Mobile social-traffic: lands; first screen must contain comparison
    card + trust strip + VIN form OR clear scroll cue toward them
```

### 11B: First Viewport Composition

```
DESKTOP FIRST VIEWPORT (1440x900):
  - Header (logo + 3 nav links) visible
  - hero-eyebrow visible
  - hero-headline visible (largest type on page)
  - hero-comparison-card visible — both columns intact
  - hero-subhead visible
  - hero-trust-strip visible — all 4 chips
  - hero-vin-form visible — input + button
  - hero-dealer-pivot visible
  - hero-sample-link visible
  - Next section (path-individual / path-dealer cards) PEEKS below the fold
    by a clear amount (top edge of cards visible)

MOBILE FIRST VIEWPORT (390x844):
  - Header (compressed) visible
  - hero-eyebrow visible
  - hero-headline visible
  - hero-comparison-card visible — stacked vertical, both prices intact
  - hero-trust-strip visible (may use 2x2 grid or horizontal scroll)
  - hero-vin-form visible — input + button
  - hero-dealer-pivot OR hero-sample-link visible at bottom of first screen
    (one or both, depending on density tuning)

MUST NOT:
  - Render as an empty hero with only headline + CTA visible
  - Hide the dealer pivot or sample link below the fold on either viewport
  - Cover the comparison card with a popup, modal, or cookie banner
```

### 11C: Layout Constraints

```
LAYOUT:
  Desktop:
    - Single content column, max-width ~1100px, centered
    - Hero internal: comparison-card 2-col; trust-strip horizontal;
      VIN form full row; pivot + sample-link as inline tertiary links
    - dealer-section visually full-bleed (background tint OK in production —
      grayscale in wireframe) to register as a major page region
    - Comparison matrix as 3-col table
    - Safeguards as 5-col row
  Tablet:
    - Same column structure; spacing tightens; some 3-col rows compress
  Mobile:
    - 1-column throughout
    - Hero comparison-card stacks vertical (preserves comparison reading)
    - Comparison matrix transforms to vertically-grouped column blocks

VISUAL WEIGHT:
  - hero-headline owns largest type on page (~48px desktop, ~30px mobile)
  - hero-comparison-card owns largest non-text visual element in first
    viewport
  - dealer-volume-calculator owns equivalent visual weight in dealer block
  - hero-trust-strip and dealer-trust-row are visually QUIET (small chips,
    muted color) but always present adjacent to the comparison/calculator
  - sample-pdf-preview is a tall portrait gray box, ~480-560px tall
```

### 11D: Density & Rhythm

```
DENSITY:
  Mode: low-density marketing (top of page through dealer block) →
        moderate density (comparison matrix, safeguards, FAQ) →
        low-density marketing (final CTA, footer)

  - Hero: generous (data-density="generous", data-section-pad="generous")
  - Self-selection: moderate
  - Flow steps: moderate
  - Sample: generous (let the PDF preview breathe)
  - Dealer block: moderate (calculator + tiers benefit from density to
    feel businesslike, not luxury-marketing)
  - Discount explainer + comparison matrix: moderate
  - Safeguards: moderate (5 items in row demand tight rhythm)
  - Testimonials: moderate
  - FAQ: compact (accordion)
  - Final CTA: generous
  - Footer: compact

RHYTHM:
  - Major sections separated by clear macro-whitespace
  - Within sections, secondary items use moderate spacing
  - Repeated items (pricing tiers, safeguards, FAQ) use compact spacing
  - hero-trust-strip uses dense chip rhythm (4 chips in close proximity
    signals "evidence cluster," not "decoration")
  - Primary CTAs (VIN form, dealer CTA, calculator) NEVER share row density
    with a competing primary
```

### 11E: Required Stable Selectors

```
REQUIRED SELECTORS (must appear as id attributes on the corresponding
elements in the HTML wireframe):
  - #page-root
  - #primary-section            (the hero <section>)
  - #primary-action             (the hero VIN form submit button)
  - #vin-input                  (the hero VIN input field)
  - #path-individual            (the individual path-selection card)
  - #path-dealer                (the dealer path-selection card)
  - #sample-report-section      (the sample-pdf-preview <section>)
  - #dealer-section             (the dealer block <section>)
  - #comparison-matrix          (the 3-col comparison matrix)
  - #safeguards-section         (the safeguards block <section>)
  - #faq-section                (the faq-block <section>)
  - #final-cta-section          (the final CTA <section>)
```

### 11F: Non-Negotiables

```
- "Official Carfax report" wording must appear in the hero (eyebrow OR
  headline), the sample callout, and the comparison matrix
- The hero-comparison-card must show both prices in equal-weight columns
  (no strikethrough scream, no decorative discount badge)
- The hero-trust-strip must appear BETWEEN the comparison card and the
  VIN form in document order
- Both individual and dealer CTAs must be present in: hero, self-selection
  strip, and final-cta-section (3 placements each)
- Sample report access must be present in: hero (link), sample section
  (preview + open CTA), final-cta-section (link) — 3 placements
- Safeguards section must appear BEFORE the final CTA
- No urgency timers, no countdown UI, no exploding badges
- No imitation of official Carfax visual branding (logos, colors, marks)
  beyond the lawful product-name reference
```

### 11G: Allowed Variation

```
- Exact copy may be tuned within tone/length constraints in Section 10
- Specific testimonial names + cities may be substituted for real customers
- Volume-stat number must be replaced with a real, verifiable figure
- Refund timeframe (24h) and delivery SLA (60s) may be tuned to the
  real operational SLA — but the safeguard cards must always state
  specific numbers
- Pricing ($44.99 / $24.99 / dealer tiers) may be replaced with current
  real pricing — but the comparison structure is fixed
- Visual treatment (color palette, brand typography, illustration) is
  delegated to the visual-architect agent — this spec is grayscale
- Hero-eyebrow exact wording may be replaced with the legally permissible
  reseller-status statement
- Volume calculator may use slider OR tier pills — implementer's choice
  (mobile transforms to tier pills regardless)
```

### 11H: Not Allowed

```
- Replacing the hero-comparison-card with a generic "$X off" banner
- Removing the hero-trust-strip or moving it below the VIN form
- Burying dealer-section into the footer or a single contact line
- Using "vehicle history report" without specifying official Carfax
- Generic "trusted by 10,000+" claims without a verifiable number
- Generic trust badges (BBB, McAfee Secure, etc.) unless specifically
  earned and verifiable
- Removing the comparison matrix (knockoff differentiation is required)
- Moving safeguards to after the final CTA
- Coupon-bin visual treatment: bright unrelated accent colors, exploding
  badges, urgency timers, fake "X people viewing" widgets, popup
  intercepts demanding email before content
- Imitating Carfax brand colors, logo, or visual identity beyond lawful
  product-name reference and trademark notice
- Long brand-story / "About us" content above the dealer-section
- "What is a Carfax report" 101 educational copy in the dealer block
```

---

## Section 12: HTML Wireframe Artifact

```
HTML WIREFRAME ARTIFACT:
  File:       wireframe.savings-and-safety-comparison-strategy.html
  Components: 47 (matches Section 6 row count)
  Selectors:  12 (matches Section 11E entry count)
  Status:     written
```

The renderable gray-box HTML wireframe is written as a separate file at the path declared above. It encodes all 47 components with `data-component` and `data-class` attributes, all 12 required selectors as `id` attributes, and the responsive transforms described in Section 8 via CSS media queries at 1024px and 640px breakpoints. No color decisions, no brand styling, no JavaScript — gray-box only, per `wireframe-html-format.md`.
