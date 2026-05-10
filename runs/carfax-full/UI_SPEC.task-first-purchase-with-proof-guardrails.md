# UI Spec — task-first-purchase-with-proof-guardrails

## Section 1: Page Classification

```
TYPE: marketing (hybrid leaning marketing)
```

This is a pre-purchase landing page that drives a transactional self-serve action (one-time report buy) and a B2B contact action (dealer subscription). Marketing dominates because both audiences are pre-purchase and trust must be sold before either action feels safe; the page borrows two internal-tool moves (a foreground transactional widget and a transparent pricing comparison) to honor the "polished utility" posture from the diagnosis.

---

## Section 2: Intake Summary

```
PURPOSE: Convert visitors into paying customers for discounted official Carfax
reports — driving (a) one-time report purchases from individual used-car buyers
and (b) recurring dealer subscriptions for continuous report access. The page
must establish credibility as a legitimate reseller before either action feels
safe. Business intent: revenue from both channels, with dealer LTV being
substantially higher than individual LTV.

AUDIENCE:
  Segment A — Individual buyer (one-time):
    Person evaluating a specific used car. Knows carfax.com (~$40), price-
    sensitive, decides in <60 seconds whether the site is real. Bounces hard
    on scam smell. Closed by trust signals: refund, secure payment, official-
    Carfax wording, sample report, volume served.
  Segment B — Dealer (continuous):
    Already paying for Carfax/AutoCheck. Wants per-report cost reduction at
    scale. Methodical; wants volume pricing, terms, business legitimacy,
    ideally a human contact before committing.

CONTEXT: Standalone landing page (root of site).
  Entry: word-of-mouth (warm, partial trust) and social media (cold, full
    skepticism). Mixed desktop and mobile, with mobile share elevated by
    marketplace browsing context.
  Exit: individual checkout (VIN → pay → PDF) or dealer signup/contact form.
  Stage: SELLING. Trust establishment is the primary blocker.

KEY ACTIONS:
  1. PRIMARY  — Buy a report now (VIN → pay → PDF).
  2. SECONDARY — Set up dealer access (volume plan).
  3. TERTIARY  — See a sample report (low-commitment proof for skeptics).
```

---

## Section 3: Flow Map

```
FLOW: Single page (standalone, root of site)

  [traffic: word-of-mouth | social] ──▶ [LANDING (this page)]
                                              │
                          ┌───────────────────┼───────────────────┐
                          ▼                   ▼                   ▼
                  [individual checkout]  [dealer signup/    [sample report
                  (VIN→pay→PDF)           contact form]      preview - same
                                                              page or modal]
```

---

## Section 4: Decision Map

### 4A: User Decision Sequence

```
PAGE LEVEL:
  User's first question (Individual): "Can I get a real Carfax for less than $40?"
  User's first question (Dealer):     "Is there a legit volume option here?"
  Resolved by: Hero headline (names "official Carfax" + price), VIN widget
    (proves transactional readiness), Dealer card (peer-visible, names
    volume), Sample link (low-commitment proof escape hatch).

SECTION LEVEL:
  Scanning for (Individual): "What does this cost, when do I get it, what
    if it's fake?"
  Scanning for (Dealer):     "What's the volume price, who runs this, can I
    talk to a person?"
  Resolved by: inline trust strip under CTA, legitimacy band spanning hero
    foot, transparent pricing-comparison section, dealer section with
    explicit per-tier savings and contact path, refund/delivery section.

COMPONENT LEVEL:
  Click-vs-skip decision (Individual on the buy button): "Do I trust these
    18 characters of input enough to enter my VIN here?"
  Resolved by: refund + secure + official wording immediately under the
    button (not in footer); legitimacy band visible without scrolling;
    "Sample report" link offered as a no-cost branch right next to the
    primary CTA.

  Click-vs-skip decision (Dealer on the dealer card): "Is this a real B2B
    offer or a marketing wrapper around a consumer site?"
  Resolved by: dealer card names a concrete monthly volume threshold
    (10+ reports/month), shows a per-report savings tier teaser, links to a
    dealer section with terms and a real contact form (not just an email
    address).
```

### 4B: Asset And Evidence Inference

```
PRODUCT/OUTPUT ASSETS:
  - Sample Carfax report PDF (low-friction inline preview — page 1 + page 2
    thumbnails, plus full-PDF view).
  - VIN-decoded preview after VIN entry (vehicle make/model/year confirmed
    before payment — proves the system is wired to real data, reduces
    "scam form" feeling).
  - Confirmation email + delivered PDF as the post-purchase artifact.

PROOF ASSETS:
  - Authorized reseller / partner status (assumed legally supportable; if
    not, replaced with "We pull reports directly from the Carfax system on
    your behalf — same data, same PDF").
  - Counter: total reports delivered (real number, e.g., "47,392 reports
    delivered to drivers and dealers since 2019").
  - BBB rating, Stripe-secure-payment badge, business registration number,
    physical business address, named founder/owner.
  - Refund guarantee with explicit conditions ("Full refund if the PDF
    isn't in your inbox within 10 minutes — no questions, no support
    ticket required").
  - Customer review count + average rating (Trustpilot or equivalent).

CONVERSION ASSETS:
  - Direct vs. discounted price side-by-side: "$39.99 at carfax.com →
    $9.99 here. Same report. Same PDF."
  - Dealer volume tiers (e.g., 10/mo, 50/mo, 200/mo) with per-report rate.
  - Sample report link (no payment, no email gate).
  - Live chat / scheduled call link in dealer section.

NAVIGATION/SELF-SELECTION ASSETS:
  - Top-nav "Dealers" link AND in-hero dealer card (redundant by design —
    self-selection must not depend on a single entry point).
  - Anchor jumps from hero to sample, dealer, FAQ.

ACTION VS SIGNAL CLASSIFICATION:
  Actions: VIN input, "Get my report" button, "View sample report" link,
    "Get dealer access" button, dealer contact form, FAQ expanders.
  Signals: legitimacy band counters and badges, official-Carfax wording,
    refund/delivery guarantee text, price-comparison row, vehicle-decoded
    confirmation after VIN entry, sample report thumbnails, founder photo
    + business registration in footer, dealer terms summary.
```

### 4C: Strategy Defense

```
ASSIGNED STRATEGY: task-first-purchase-with-proof-guardrails

WHY THIS STRATEGY FITS THIS INTAKE:
  Individual buyers — the higher-volume traffic segment — decide in under
  60 seconds and arrive with a specific VIN in hand or in a tab. Their
  blocker is not "what is this site," it is "is this real, and can I do
  the thing?" A task-first hero answers both questions simultaneously: the
  VIN widget IS the demonstration that the site is wired to a real
  fulfillment pipeline, and the proof guardrails wrapped around it (refund,
  secure, official, legitimacy band, sample link, dealer card) resolve
  scam fear without making the buyer scroll. This strategy is honest about
  the audience's urgency and price-sensitivity. The only segment it puts
  pressure on is dealers, who are methodical and may feel rushed — handled
  by giving the dealer path a co-visible, peer-weighted card in the first
  viewport and a dedicated, B2B-grade section below.

LOCAL OPTIMUM THIS STRATEGY RISKS:
  Naked-form hero: a giant VIN input with a price and a button, and proof
  shoved into a footer FAQ or a "Why us" section three scrolls down. This
  is the "looks fast, feels scammy" failure — the form converts the
  already-trusting and bounces everyone else. The other risk is dealer-
  invisibility: making the dealer card a small "for businesses, click here"
  link instead of a peer-weight component, sacrificing the highest-LTV
  channel for hero cleanliness.

HOW THIS DESIGN AVOIDS THAT LOCAL OPTIMUM:
  1. Proof guardrails are physically adjacent to the VIN form, not below
     it. The trust strip ("Refund if late · Secure checkout · Official
     Carfax data") sits under the button. The legitimacy band ("47,392
     reports delivered · BBB A+ · Stripe Verified · Reg# ABC123") spans
     the hero foot. The sample-report link sits inside the hero card.
  2. The dealer card is a peer of the VIN form in the hero — not a
     subordinate. On desktop it occupies ~38% of the hero width; on mobile
     it sits immediately below the VIN form, before any explanatory
     content. It carries its own price hook (per-report rate at volume) so
     it competes for dealer attention as seriously as the VIN widget
     competes for individual attention.
  3. The hero card has visible "no payment yet" framing. Buying happens on
     a checkout page, not inline — so VIN entry is a low-commitment first
     step. This is why the form can lead.

REFERENCE CALIBRATION:
  No reference pack was loaded for this run. Strategy was defended against
  the negative-reference traits in the diagnosis ("scammy coupon landing
  page", "vehicle report knockoff", "buried pricing") by enforcing all
  three of: businesslike visual restraint (no badges-of-fortune wall, no
  countdown timers), price stated as a flat number (no struck-through
  hype), and refund/delivery details stated in plain prose adjacent to
  the action.

STRATEGIC DIAGNOSIS MAPPING:
  - functional_immediacy: high → VIN entry widget is the dominant first-
    fold component; price and delivery promise are stated in the hero
    headline/subhead.
  - trust_burden: high → inline trust strip under CTA, legitimacy band
    spanning hero foot, "Why this is legitimate" section as the FIRST
    below-fold section (not feature grid, not testimonial wall).
  - market_type: hybrid + buyer_user_relationship: multiple_stakeholders
    → dual-path hero (VIN card + dealer card as peers), dedicated dealer
    section, top-nav "Dealers" link, dealer-specific trust signals.
  - decision_risk: high → refund guarantee with explicit conditions,
    transparent pricing comparison vs. carfax.com, sample report link
    available without payment or email.
  - aesthetic_stakes: medium + visual_posture: polished_utility →
    grayscale-leaning palette (downstream visual agent decides), clean
    typographic hierarchy, no gradients, no hero illustrations, no badge
    soup, no fake urgency.
  - audience_sophistication: mixed → individual-friendly headline ("Buy
    a Carfax report") paired with dealer-grade economics card ("As low
    as $4.50/report at 200/mo"); FAQ has tracks for both.
  - content_depth: layered → hero is task + proof; below-fold sections
    deliver explanation, comparison, dealer detail, refund terms, FAQ in
    a sequence the reader can stop at any time.

FIRST VIEWPORT OBLIGATION:
  Diagnosis: "Within the first viewport, the page must make visitors
  understand that they can buy discounted official Carfax reports safely,
  verify legitimacy enough to continue, and choose between individual
  purchase and dealer access."

  Components on first fold (desktop, 1440x900):
    - Top nav (logo, Sample, Dealers, Help)
    - Hero headline: "Official Carfax reports — $9.99"
    - Hero subhead: "Same report. PDF in your inbox in 2 minutes."
    - VIN entry card: input + primary CTA + inline trust strip + sample link
    - Dealer access card: peer to VIN card, with volume-rate teaser + CTA
    - Legitimacy band: counter + BBB + Stripe + business reg

  Components on first fold (mobile, 390x844):
    - Top nav (collapsed: logo, hamburger). Dealers link surfaced as a
      one-line strip immediately under the nav so it is visible without
      opening the menu.
    - Hero headline + subhead (compressed)
    - VIN entry card: input + primary CTA + inline trust strip
    - Dealer access card stacked directly below VIN card
    - Sample report link
    - Legitimacy band (compact: counter + BBB + Stripe inline)

HARD FLOOR COVERAGE:
  - hf_first_viewport_legitimacy_and_self_selection → satisfied by the
    dual-card hero (#vin-input + #primary-action, #dealer-access),
    #legitimacy-proof band, sample link inside hero card, and price stated
    in headline.
  - hf_early_legitimacy_proof → inline trust strip under #primary-action
    plus #legitimacy-proof band in hero foot, BEFORE any commitment.
  - hf_segment_self_selection → peer-weighted hero cards, top-nav Dealers
    link, dedicated #dealer-section below.
  - hf_individual_purchase_immediacy → VIN form is the visual anchor of
    the hero, single-step entry, price visible in headline AND on button.
  - hf_dealer_path_prominence → dealer card occupies ~38% of hero width
    on desktop, immediately under VIN card on mobile, owns its own value
    proposition (volume rate), and links to a full #dealer-section with
    tiered pricing, terms, and contact form.
  - hf_official_report_clarity → headline says "Official Carfax", inline
    trust strip says "Official Carfax data", #pricing-comparison shows
    a header row identifying the product as the same report as
    carfax.com.
  - hf_transparent_terms_and_safety → inline trust strip + #refund-
    guarantee section + #pricing-comparison + #faq.
  - hf_proof_for_skeptics → "View sample report" link in hero card,
    #sample-report section below the fold with a thumbnail preview AND
    a "view full sample" expansion.
  - hf_mobile_conversion_path → mobile stack ordering keeps trust strip
    and VIN form on the first screen; dealer card immediately below;
    legitimacy band kept compact but present.

ANTI-PATTERN AVOIDANCE:
  - ap_coupon_scam_aesthetic → no countdown timers, no struck-through
    prices, no flame/lightning iconography, no "ONLY TODAY" language.
    Price is a flat number; savings are stated once, in prose, in the
    pricing-comparison section.
  - ap_buried_trust → trust strip is a primary-tier component, not a
    footer afterthought. Legitimacy band is in the hero, not below.
  - ap_individual_only_bias → dealer card is peer to VIN card; dealer
    section is a full section with its own subheadings, pricing tiers,
    and form (not a one-line "Dealers? Email us.").
  - ap_dealer_overeducation → dealer section assumes the reader knows
    Carfax. It opens with the per-report rate, not "What is a Carfax
    report?". Education is consumer-facing only.
  - ap_ambiguous_product_naming → "Official Carfax report" appears in
    headline, button, trust strip, sample section, and pricing
    comparison. The word "Carfax" is never replaced with a generic
    "vehicle report" except in legal copy where required.
  - ap_unsubstantiated_authority_claims → legitimacy band only carries
    items that can be verified: a public BBB profile link, a public
    Stripe-payment-secure indicator (live, not a logo dump), and a
    business registration number that maps to a real entity. Sample
    report shows a real Carfax-format PDF (not a stock template).
  - ap_long_brand_story_before_task → VIN widget is the first
    interactive element. There is no "Our story" section above it.
    Brand identity lives in the footer.
  - ap_hidden_or_vague_refund_terms → refund line in trust strip says
    "Refund if late"; full refund section names the trigger, the
    timeline (10 minutes), the recourse path (one-click refund button
    in the order email), and the contact path.
  - ap_generic_saas_visual_formula → no abstract "feature card" grid,
    no isometric illustration, no gradient hero. The hero is a form;
    the proof is data; the dealer pitch is numbers.
```

### 4D: Component Justification

| Component | User Lens | Business Lens | Verdict |
|-----------|-----------|---------------|---------|
| Top nav (logo, Sample, Dealers, Help) | Lets dealers self-identify before reading consumer copy; lets skeptics jump to sample | Cheap dual-path entry; dealer link surfaces highest-LTV path | Include — minimal nav, no marketing menu |
| Hero headline | Answers "is this real Carfax and what does it cost" in under 2 seconds | Names the product and the price — sets discount as a fact, not a hype claim | Include |
| Hero subhead | Resolves delivery anxiety and reinforces savings | Reduces refund/support load by setting expectations | Include |
| VIN entry input (#vin-input) | Lets the user start the task immediately | Demonstrates the system is real (decodes vehicle on submit) | Include — large, single-focus input |
| Primary CTA button (#primary-action) | Single, obvious next step | Drives the primary conversion event | Include — price on the button removes hidden-cost suspicion |
| Inline trust strip | Resolves "what if it's fake / what if I get charged twice" right at the action point | Reduces cart abandonment | Include — adjacent to button, not below it |
| Sample report link (in hero card) | Escape hatch for skeptics — no payment, no email | Preserves skeptical-traffic conversion (assisted) | Include — present in hero card AND below fold |
| Dealer access card (#dealer-access) | Lets dealers self-identify and skip consumer content | Highest-LTV channel — hero-prominence is non-negotiable | Include — peer to VIN card |
| Legitimacy band (#legitimacy-proof) | Specific, verifiable proof — answers scam fear before scroll | Conversion lift + reduces support load | Include — hero foot, full width |
| Why-it's-legitimate section | Goes deeper for buyers who need more than the band | Closes the cold-traffic skepticism gap | Include — first below-fold section |
| How it works (#how-it-works) | Removes uncertainty about post-purchase flow | Reduces refund/support load | Include — 3 steps, compact |
| Sample report deep section (#sample-report) | Lets the user verify the report is real before paying | Critical for cold traffic conversion | Include |
| Pricing comparison (#pricing-comparison) | Validates the discount is real, not a too-good-to-be-true trap | Frames discount as factual, not promotional | Include |
| Dealer section detail (#dealer-section) | Volume tiers, terms, contact — what dealers actually need | LTV channel — needs B2B-grade depth | Include |
| Refund & delivery guarantee (#refund-guarantee) | Resolves "what if it goes wrong" | Reduces support load + chargebacks | Include — explicit conditions, no vagueness |
| FAQ (#faq) | Answers long-tail questions without bloating the main flow | Reduces support load | Include — collapsed by default |
| Final CTA (mirror of hero) | Re-offers the primary action after proof | Recovers users who needed proof before action | Include |
| Footer | Legal, business identity, contact, address | Trust signal + compliance | Include |
| Hero illustration / brand graphic | Would compete with VIN widget for first-fold attention | Adds nothing — proof is the brand here | EXCLUDE |
| Customer testimonial carousel | Generic SaaS pattern; specific anti-pattern in diagnosis | Less effective than counter + BBB + sample | EXCLUDE — replace with review COUNT + link to Trustpilot in legitimacy band |
| Countdown / urgency timer | Triggers scam aesthetic anti-pattern | Negative effect on cold-traffic trust | EXCLUDE |
| "Featured in TechCrunch" press strip | Not relevant to this audience | Wastes hero-adjacent real estate | EXCLUDE |

### 4E: Tension Map

```
TENSION 1: VIN form prominence vs. proof prominence
  Business pull: Make the VIN form impossible to miss — it is the
    conversion event. Maximize first-fold weight.
  User pull (Individual cold traffic): Don't ask me to enter a VIN
    until I know this isn't a scam. I need proof before I commit.
  Resolution: VIN form leads, but proof guardrails are physically
    adjacent (inline trust strip under CTA, legitimacy band in hero
    foot, sample link inside hero card). The form is dominant in
    visual weight; proof is dominant in proximity. Both are first-
    fold.

TENSION 2: Individual speed vs. dealer seriousness
  Business pull (Individual): Strip the page down. Don't slow the
    60-second decision with B2B content.
  Business pull (Dealer): Give dealers a serious, B2B-grade path.
    Their LTV is substantially higher.
  User pull: Each segment wants the page to be FOR them.
  Resolution: Two visually peer cards in the hero, each owning its
    own value proposition and CTA. Below the fold, the consumer
    journey (legitimacy → how-it-works → sample → pricing) and the
    dealer journey (#dealer-section: tiers, terms, contact) live as
    parallel tracks, not interleaved. A dealer who sees the hero card
    can click straight to #dealer-section and never read consumer
    content; an individual buyer scrolls past #dealer-section as a
    skim.

TENSION 3: Discount visibility vs. scam aesthetic
  Business pull: The discount is the hook. Make it loud.
  User pull: Loud discounts on a name-brand product trigger scam
    fear ("if it's $9.99 it must be fake").
  Resolution: Price stated as a flat number ("$9.99") in the
    headline and on the button. Savings stated ONCE in the subhead
    ("Save $30 vs. carfax.com") and reinforced in the dedicated
    pricing-comparison section. No struck-through prices, no
    percentage-off badges, no "limited time" language. The discount
    is presented as a fact about how the business operates, not a
    promotion.

TENSION 4: Sample report friction vs. sample report distraction
  Business pull: Don't let the sample compete with the buy action —
    it could become an off-ramp.
  User pull: Cold traffic needs proof before payment; without an
    easy sample, it bounces.
  Resolution: Sample is a tertiary CTA in the hero (small text link
    inside the hero card, not a button), and a full section below
    the fold. Anyone who needs it can find it in 1-2 seconds; nobody
    is led to it as the primary action.

TENSION 5: Legitimacy proof specificity vs. visual restraint
  Business pull: Show every trust signal we have.
  User pull: A wall of badges reads as scam aesthetic.
  Resolution: Legitimacy band carries 4-5 items, max. Each is
    verifiable (counter is a real number; BBB and Stripe are live;
    business reg maps to a real entity). The "Why this is
    legitimate" section provides depth for buyers who want it,
    without crowding the hero.
```

---

## Section 5: Visual Hierarchy Map

```
PRIMARY (dominant visual weight):
  1. Hero headline ("Official Carfax reports — $9.99") — first thing the
     eye lands on; carries product, authenticity, and price simultaneously.
  2. VIN entry input (#vin-input) — the largest interactive element on
     the page; the form factor itself communicates "you can do this here,
     now."
  3. Primary CTA button (#primary-action) — high-contrast filled button,
     price stated on the button.
  4. Dealer access card (#dealer-access) — peer-weighted with the VIN
     card on desktop; immediately below on mobile. Visually distinct
     (different card treatment) but equally substantial.

SECONDARY (supporting):
  5. Hero subhead — sets delivery and savings expectation.
  6. Inline trust strip (under CTA) — small but high-importance proof.
  7. Legitimacy band (#legitimacy-proof) — full-width, hero foot.
  8. Sample report deep section (#sample-report) and link in hero.
  9. Pricing comparison (#pricing-comparison) — the discount-legitimacy
     section.
  10. Why-it's-legitimate section.
  11. Dealer section (#dealer-section) — dealer-track depth.
  12. Refund guarantee (#refund-guarantee).
  13. How it works (#how-it-works).
  14. Final CTA (mirror).

TERTIARY (present but recessive):
  15. Top nav.
  16. FAQ (#faq).
  17. Footer (business identity, legal).
  18. Risk-reducer microcopy ("No subscription · No spam").
```

---

## Section 6: Component Inventory

| Component | Class | Purpose | Content Direction |
|-----------|-------|---------|-------------------|
| Top navigation | T | Self-selection entry + utility | Logo · "Sample report" · "Dealers" · "Help". 4 items max. |
| Mobile dealer strip | T | Surface Dealers link without hamburger | Single line: "Dealer? Volume access →". Mobile only. |
| Hero headline | P | Name product + price | "Official Carfax reports — $9.99". 6-8 words. |
| Hero subhead | S | Delivery + savings cue | "Same report. PDF in your inbox in 2 minutes. Save $30 vs. carfax.com." 15-20 words. |
| VIN entry input | P | Start the task | Placeholder: "Enter 17-digit VIN". Single field, large. |
| Primary CTA button | P | Submit VIN to checkout | "Get my report — $9.99". Price on the button. |
| Inline trust strip | S | Adjacency proof at action point | "Refund if late · Secure checkout · Official Carfax data". Single line. |
| Sample report link (hero) | T | Skeptic escape hatch | "View a sample report →". Small text link inside hero card. |
| Dealer access card | P | Peer entry for B2B | Headline "Dealer access". Body: "Volume reports for 10+/month. As low as $4.50/report at 200/mo." CTA: "See dealer pricing →". |
| Legitimacy band | S | Hero-foot specific proof | 4 items: "47,392 reports delivered · BBB A+ rated · Stripe-secured payments · Reg# ABC123 (Delaware)". |
| Why this is legitimate | S | Below-fold proof depth | 4 cards: authorized data access, business identity, payment security, refund guarantee. 30 words each. |
| How it works | S | 3-step process | "1. Enter VIN. 2. Pay $9.99. 3. PDF in your inbox in 2 minutes." Visual step indicator. |
| Sample report section | S | Visible proof of product | Page-1 thumbnail, page-2 thumbnail, "View full sample (PDF)" link, "What's in your report" 3-line summary. |
| Pricing comparison | S | Discount-as-fact | Two-column: carfax.com $39.99 / This site $9.99. Same row of features, both checkmarked. Footnote: "Yes, it's the same report." |
| Dealer section | P | B2B depth | Section headline: "Volume access for dealers". Tier table (10/mo, 50/mo, 200/mo). Terms summary (no contract, monthly billing, API on 200+ tier). Contact form (name, dealership, monthly volume estimate, phone) + "Schedule a 15-min call" link. |
| Refund guarantee | S | Explicit recourse | "If your PDF isn't delivered in 10 minutes, click the refund button in your order email. No call. No support ticket. No questions." |
| FAQ | T | Long-tail objections | 6-8 collapsed Q&A. Tracks: consumer (4) and dealer (3-4). |
| Final CTA (repeat) | S | After-proof re-offer | Mirror of hero VIN form, with one-line reminder: "Same Carfax report. $9.99. Refund if late." |
| Footer | T | Identity + legal | Business name, address, registration #, named owner, support email, support phone, terms, privacy, refund policy, sitemap. |

---

## Section 7: ASCII Wireframe (desktop)

```
+---------------------------------------------------------------------+
|  [LOGO]                       Sample report   Dealers   Help        |
+---------------------------------------------------------------------+
|                                                                     |
|             Official Carfax reports — $9.99                         |
|             Same report. PDF in your inbox in 2 minutes.            |
|             Save $30 vs. carfax.com.                                |
|                                                                     |
|  +------------------------------------+  +-----------------------+  |
|  | Enter 17-digit VIN                 |  | Dealer access         |  |
|  | [___________________________]      |  |                       |  |
|  | [    Get my report — $9.99    ]    |  | Volume reports for    |  |
|  | Refund if late · Secure · Official |  | 10+/mo. As low as     |  |
|  | View a sample report →             |  | $4.50/report at       |  |
|  +------------------------------------+  | 200/mo.               |  |
|                                          | [See dealer pricing →]|  |
|                                          +-----------------------+  |
|                                                                     |
|  47,392 reports delivered · BBB A+ · Stripe-secured · Reg# ABC123   |
+---------------------------------------------------------------------+
|                                                                     |
|              Why this is legitimate                                 |
|                                                                     |
|  +-----------+ +-----------+ +-----------+ +-----------+            |
|  | Authoriz. | | Real      | | Stripe    | | 10-minute |            |
|  | data      | | business  | | secured   | | refund    |            |
|  | access    | | (Reg#)    | | payments  | | guarantee |            |
|  +-----------+ +-----------+ +-----------+ +-----------+            |
+---------------------------------------------------------------------+
|                                                                     |
|              How it works                                           |
|                                                                     |
|     [1] Enter VIN  →  [2] Pay $9.99  →  [3] PDF in inbox (2 min)    |
+---------------------------------------------------------------------+
|                                                                     |
|              Your report — see a real sample                        |
|                                                                     |
|  +----------------+ +----------------+    What's in your report:   |
|  |  [page 1 IMG]  | |  [page 2 IMG]  |    · Title history          |
|  |                | |                |    · Accident records       |
|  +----------------+ +----------------+    · Odometer readings      |
|       View full sample (PDF) →             · Service history       |
+---------------------------------------------------------------------+
|                                                                     |
|              The same report, $30 less                              |
|                                                                     |
|              | carfax.com  | This site                              |
|   Price      | $39.99      | $9.99                                  |
|   Same data  | ✓           | ✓                                      |
|   Official   | ✓           | ✓                                      |
|   Delivery   | Instant     | Under 2 minutes                        |
|   Refund     | Limited     | 10-minute guarantee                    |
+---------------------------------------------------------------------+
|                                                                     |
|              Volume access for dealers                              |
|                                                                     |
|     Tier         Reports/mo    Per-report rate                      |
|     Starter      10+           $7.99                                |
|     Growth       50+           $5.99                                |
|     Volume       200+          $4.50                                |
|                                                                     |
|     No contract · Monthly billing · API access on Volume tier       |
|                                                                     |
|  +----------------------------+  +-----------------------------+    |
|  | Dealership name [_______]  |  |  Schedule a 15-min call →   |    |
|  | Your name       [_______]  |  +-----------------------------+    |
|  | Monthly volume  [_______]  |                                     |
|  | Phone           [_______]  |                                     |
|  | [   Get dealer access  ]   |                                     |
|  +----------------------------+                                     |
+---------------------------------------------------------------------+
|              10-minute delivery guarantee                           |
|              [explicit refund language]                             |
+---------------------------------------------------------------------+
|              Frequently asked                                       |
|              [collapsed Q&A list, consumer + dealer tracks]         |
+---------------------------------------------------------------------+
|              Buy a Carfax report — $9.99                            |
|              [VIN input] [Get my report — $9.99]                    |
|              Same report. Refund if late.                           |
+---------------------------------------------------------------------+
|  Footer: business name, address, reg#, owner, support, legal links  |
+---------------------------------------------------------------------+
```

ASCII wireframe (mobile, abbreviated):

```
+-------------------------+
| [LOGO]            [☰]   |
+-------------------------+
| Dealer? Volume access → |   <- mobile dealer strip
+-------------------------+
| Official Carfax reports |
| — $9.99                 |
| PDF in 2 min · Save $30 |
+-------------------------+
| [VIN field          ]   |
| [Get my report —$9.99]  |
| Refund · Secure · Off.  |
| View a sample report →  |
+-------------------------+
| Dealer access           |
| Volume reports 10+/mo   |
| As low as $4.50/report  |
| [See dealer pricing →]  |
+-------------------------+
| 47,392 delivered        |
| BBB A+ · Stripe · Reg#  |
+-------------------------+
| (sections continue:     |
|  Why legit · How it     |
|  works · Sample · ...)  |
+-------------------------+
```

---

## Section 8: Responsive Behavior

```
DESKTOP (default, 1440x900):
  - Hero: 2-column grid. VIN card ~62%, dealer card ~38%. Headline +
    subhead span the grid above the cards.
  - Legitimacy band: full-width, single line, 4 items.
  - Why-legit cards: 4-up grid.
  - How it works: 3 steps in a horizontal row with arrows.
  - Sample: 2 page thumbnails side-by-side + summary on right.
  - Pricing comparison: 2-column table.
  - Dealer section: tier table (3 rows) + 2-column form + scheduling link.
  - Final CTA: centered, narrow container.

TABLET (768x1024):
  - Hero: STACK. VIN card on top, dealer card below. Both full width
    of a 720px content container.
  - Legitimacy band: 2x2 grid (4 items, two rows).
  - Why-legit cards: 2x2 grid.
  - How it works: still horizontal (steps shrink, arrows persist).
  - Sample: thumbnails stacked above summary.
  - Pricing comparison: 2-column table (unchanged — table semantics
    survive at this width).
  - Dealer section: tier table preserved; form below tiers, single
    column.

MOBILE (390x844):
  - Hero: STACK. Mobile dealer strip below nav (single line).
    Headline + subhead. VIN card. Dealer card. Sample link as
    standalone line. Legitimacy band as compact stack (2x2 → 4x1
    if width too tight).
  - Why-legit cards: 1-column stack.
  - How it works: vertical step list (1, 2, 3).
  - Sample: single thumbnail, "View full sample" link beneath.
  - Pricing comparison: TRANSFORM — 2-column table becomes a
    "carfax.com vs. this site" stacked card, one row per attribute.
  - Dealer tier table: TRANSFORM — table becomes 3 stacked tier
    cards (Starter, Growth, Volume).
  - Form: single column, large touch targets (min 48px).
  - FAQ: collapsed accordion, full-width.
  - Final CTA: full-width VIN input + button.

NEVER HIDDEN ON ANY VIEWPORT:
  - VIN input + primary CTA + inline trust strip.
  - Dealer access card.
  - Legitimacy band (compacted on mobile, never removed).
  - Sample report link.
  - Refund guarantee.
  - Pricing comparison.
```

---

## Section 9: Interaction Notes

```
- VIN input: inline format validation (17 chars, alphanumeric, no I/O/Q).
  On focus, an inline helper reads "We'll decode the vehicle before you
  pay." On valid VIN, an inline preview ("2017 Honda Civic LX detected")
  appears below the input WITHOUT advancing — the user still clicks the
  CTA to proceed. This is a critical proof signal: the form decoded the
  VIN, so the system is real.
- Primary CTA: submits VIN to a checkout page in a new tab/screen. No
  payment is taken on the landing page itself.
- "View a sample report" links: open the sample inline (modal on
  desktop, full-page section anchor on mobile). No payment, no email,
  no gate.
- Dealer card CTA: anchor-jumps to #dealer-section (does not leave the
  page).
- Dealer form: standard form submit; on success, the page swaps the
  form for a confirmation message and a calendar embed for booking a
  call.
- FAQ items: click-to-expand. Only one open at a time on mobile to
  conserve scroll.
- Legitimacy band items: BBB and Stripe items are clickable and open
  verification in a new tab.
- Refund button (post-purchase, in order email — not on this page,
  but referenced): mentioned in copy.
- All interactive elements: keyboard-reachable, focus-visible, 44x44px
  minimum touch target on mobile, 48x48px preferred.
- Reduced motion: VIN-decoded preview fade is instant when prefers-
  reduced-motion is set.
```

---

## Section 10: Content Direction

```
OVERALL TONE: Direct, credible, practical, transparent. No hype, no
hedging. Confident but not loud. Reads like a small business that
respects the buyer's time.

SECTION-BY-SECTION:

- Hero headline: 6-8 words. Names "Official Carfax", names price.
  Active. Not aspirational. NEVER "Get peace of mind for your next
  purchase" — that's noise.

- Hero subhead: 15-20 words. Delivery time + savings as a single
  factual sentence. NEVER an exclamation point.

- Inline trust strip: 6-9 words total, three items. Telegraphic.
  "Refund if late · Secure checkout · Official Carfax data". Each
  item carries a verb or a concrete noun.

- Sample report link: "View a sample report →" — the arrow is part
  of the brand voice, not decoration.

- Dealer access card: 25-35 words. Names volume threshold, names
  per-report rate at scale, single CTA. NO marketing adjectives
  ("powerful", "seamless"). Numbers carry the weight.

- Legitimacy band: 4 items. Each ≤6 words. Each is verifiable.

- Why-legit cards: 4 cards, ~30 words each. Each card opens with the
  proof point and closes with how to verify it.

- How it works: 3 steps, 5-8 words each. Imperative voice.

- Sample section: "Your report — see a real sample". Then a 3-4 line
  bullet list of what's in the report.

- Pricing comparison: minimal copy. Numbers and checkmarks. Footnote:
  "Yes, it's the same report. We pull from the Carfax system on your
  behalf."

- Dealer section: B2B register. Numbers first. Terms in plain English
  ("No contract. Monthly billing. Cancel anytime."). Form labels are
  blunt: "Dealership name", "Monthly volume estimate", not "Tell us
  about your business".

- Refund guarantee: explicit and short. "If your PDF isn't delivered
  in 10 minutes, click the refund button in your order email. No
  call. No support ticket. No questions."

- FAQ: questions phrased as the user would ask them. Answers ≤60
  words. NEVER "Great question!" or marketing softening.

- Final CTA: 8-12 words. Mirror of hero, slightly more reassuring
  ("Same Carfax report. $9.99. Refund if late.").

- Footer: business identity is full and unhedged. No "© Acme — A
  Trusted Vehicle Reports Provider". Just the legal entity, address,
  registration, owner, contacts.
```

---

## Section 11: Visual Acceptance Spec

### 11A: Viewports & Scenarios

```
VIEWPORTS:
- Desktop: 1440x900
- Tablet:  768x1024
- Mobile:  390x844

SCENARIOS to evaluate:
1. Cold-traffic individual: arrives from social, has never heard of
   the brand. Must, in <60s, see the price, judge legitimacy, and
   either start the task or branch to sample.
2. Warm-referral individual: has trust pre-seeded. Must complete
   VIN entry without friction.
3. Cold-traffic dealer: must self-identify and route to dealer
   section without reading consumer content.
4. Mobile-marketplace individual: arrives from Facebook
   Marketplace tab; must see the offer and start VIN entry without
   horizontal scroll.
```

### 11B: First Viewport Composition

```
FIRST VIEWPORT (desktop, 1440x900):
- Top nav visible.
- Hero headline visible above the fold.
- Hero subhead visible.
- VIN input field visible.
- Primary CTA button visible, with price on the button.
- Inline trust strip visible.
- Sample-report link visible in the hero card.
- Dealer access card visible (peer-weight to VIN card).
- Legitimacy band visible at the foot of the hero.
- Next section ("Why this is legitimate") peeks below the fold by
  a moderate amount (top of section title visible).
- Must NOT render as a single empty hero-only viewport.
- Must NOT push the dealer card below the fold.
- Must NOT push the legitimacy band below the fold.

FIRST VIEWPORT (mobile, 390x844):
- Top nav visible (logo + hamburger).
- Mobile dealer strip visible (single line).
- Hero headline visible.
- Hero subhead visible.
- VIN input visible.
- Primary CTA visible.
- Inline trust strip visible.
- Sample link visible (may be the last visible element before scroll;
  acceptable).
- Dealer access card SHOULD be visible or peek; absolute hard floor
  is that it appears within one short scroll (within ~1.2 viewport
  heights) and is not gated by accordion or hamburger.
- Legitimacy band may sit at edge of fold or just below — must
  appear within one short scroll.
```

### 11C: Layout Constraints

```
LAYOUT:
- Desktop hero: 2-column grid. VIN card ~62% width, dealer card
  ~38%. Both cards share a common top edge. VIN card is visually
  taller (more content) — this is correct, do not pad the dealer
  card to match.
- Tablet hero: stacked. Both cards full width within a 720px
  container.
- Mobile hero: stacked. Mobile dealer strip is its own row above the
  hero headline.
- VIN card owns primary visual weight. Dealer card has substantial
  but secondary weight (lighter background, no filled CTA — outline
  CTA).
- Legitimacy band: full-width, single line on desktop, 2x2 or 4x1
  on tablet, compact stack on mobile.
- Section spacing on desktop: generous (the hero needs room to
  breathe; subsequent sections moderate).
- Below-fold sections sit in a 1280px wide container with internal
  padding; dealer section uses a wider container (full-bleed
  background for separation) to signal "this is a different
  audience track".
```

### 11D: Density & Rhythm

```
DENSITY:
- Mode: moderate hybrid (polished utility — leans low-density in
  hero/marketing sections, leans moderate in dealer pricing/comparison
  tables).
- Hero section: GENEROUS spacing. The VIN form must feel uncrowded.
- Legitimacy band: COMPACT inside (single line), but with generous
  padding above and below.
- Why-legit + How-it-works + Sample: MODERATE spacing.
- Pricing comparison: COMPACT inside (table), MODERATE spacing
  outside.
- Dealer section: COMPACT inside (tier table is dense by design,
  signals B2B seriousness), MODERATE spacing outside.
- FAQ: COMPACT (collapsed by default, dense when expanded).
- Footer: COMPACT.

RHYTHM:
- The page rhythm is: HERO (task + proof) → PROOF DEPTH (why-legit) →
  PROCESS (how-it-works) → PRODUCT PROOF (sample) → ECONOMICS
  (pricing comparison) → DEALER TRACK (full B2B section) → SAFETY
  (refund guarantee) → LONG-TAIL (FAQ) → RE-OFFER (final CTA) →
  IDENTITY (footer).
- Density steps up at the dealer section (signaling shift to B2B
  audience), down again at the refund guarantee.
- Visual primary action (filled button) does NOT compete with any
  other filled button on the page until the final CTA. Dealer card
  CTA, sample link, and FAQ controls are all lower-contrast forms.
```

### 11E: Required Stable Selectors

```
REQUIRED SELECTORS:
- #page-root
- #primary-section          (hero)
- #primary-action           (the filled "Get my report — $9.99" button)
- #vin-input                (VIN entry field)
- #dealer-access            (dealer card in hero)
- #sample-report            (sample report deep section)
- #legitimacy-proof         (legitimacy band in hero foot)
- #pricing-comparison       (carfax.com vs. this site section)
- #dealer-section           (full B2B section below fold)
- #refund-guarantee         (explicit refund section)
- #how-it-works             (3-step section)
- #faq                      (FAQ section)
- #final-cta                (mirrored CTA above footer)
```

### 11F: Non-Negotiables

```
- VIN input + primary CTA + inline trust strip MUST be on the first
  fold on every viewport.
- Dealer access card MUST be on the first fold on desktop and tablet,
  and within one short scroll on mobile (peer-weight, never a one-line
  "for businesses, click here").
- Legitimacy band MUST be in the hero zone, not after the fold.
- "Official Carfax" wording MUST appear in the headline AND the
  inline trust strip AND the pricing comparison.
- Price MUST be stated as a flat number on the button.
- Refund terms MUST state the trigger (10-minute SLA), the recourse
  (one-click refund), and the contact path.
- Sample report MUST be reachable without payment, email, or
  account creation.
- Pricing comparison MUST show the same checkmarks for "official"
  and "same data" rows for both columns.
- No countdown timer. No struck-through prices. No percentage-off
  badges. No fake-urgency language.
- Business identity (legal entity, address, registration, named
  owner) MUST appear in the footer.
```

### 11G: Allowed Variation

```
- Exact copy of the headline, subhead, and CTA may be tuned by the
  content team within the word-count and tone constraints in
  Section 10.
- Specific legitimacy-band counter values (e.g., the reports-
  delivered count) may be updated as the real number changes.
- Dealer tier values (10/50/200, $7.99/$5.99/$4.50) may be tuned by
  business; the structure of three tiers and the per-report-rate
  framing must be preserved.
- The decision of whether to use a modal or a same-page anchor for
  the sample report is implementer's choice; both must work.
- Footer can be a single row or a multi-column block; identity
  fields are required either way.
- Background color, accent color, typography choices are downstream
  visual-agent decisions — this spec only constrains layout,
  hierarchy, density, and rhythm.
```

### 11H: Not Allowed

```
- Hero illustration, lifestyle image, or animated graphic competing
  with the VIN form for first-fold attention.
- Carousel of testimonials or feature slides anywhere on the page.
- Replacing the dealer card with a "Dealers? Email us at..." link.
- Replacing the legitimacy band with a generic "Trusted by 1000+
  customers" claim with no specifics.
- Hover-only proof (e.g., refund details that only appear on hover).
- A multi-step VIN form (year-make-model dropdowns instead of a
  single VIN field).
- Auto-advancing the user to checkout without an explicit click.
- A pop-up email-capture overlay on first scroll.
- Any "Limited time" or countdown element.
- Generic stock-art shield/lock icons replacing real Stripe / BBB
  marks (subject to brand-permission verification).
- Imitating the Carfax logo or visual identity in a way that could
  be misleading. The site's own brand identity must be visually
  distinct.
```

---

## Section 12: HTML Wireframe Artifact

```
HTML WIREFRAME ARTIFACT:
  File: wireframe.task-first-purchase-with-proof-guardrails.html
  Components: 19 (matches Section 6 row count)
  Selectors: 13 (matches Section 11E entry count)
  Status: written
```
