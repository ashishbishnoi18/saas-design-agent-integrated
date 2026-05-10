# UI Spec — Dealer-Value-Forward with Consumer Fast Lane

## Section 1: Page Classification

```
TYPE: marketing
```

This is a hybrid pre-purchase landing page, but the dominant mode is marketing-conversion. Two transactional flows live on the page (one-time consumer checkout, dealer subscription inquiry), so a small slice is action-tool, but legitimacy persuasion is the page's primary job and marketing density rules the layout.

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
  Segment A — Individual buyer (one-time): person evaluating a specific used
    car, knows carfax.com costs ~$40, decides in under 60 seconds, bounces if
    site reads as scammy. Trust signals close the gap.
  Segment B — Dealer (continuous): expert, methodical, already paying for
    Carfax/AutoCheck, wants volume pricing, terms, legitimacy proof, and
    ideally to talk to a person.

CONTEXT: Standalone landing page (single page, root of the site).
  Entry: word-of-mouth referrals (warm) and social media (cold).
  Exit: checkout flow (individuals) or contact/signup flow (dealers).
  User journey stage: SELLING. Trust establishment is the primary blocker.

KEY ACTIONS:
  1. PRIMARY — Buy a report now (VIN → pay → PDF, single-flow).
  2. SECONDARY — Set up dealer access (volume plan inquiry).
  3. TERTIARY — See a sample report (low-commitment proof CTA).
```

---

## Section 3: Flow Map

```
FLOW: Single page (root). Two terminal exits:
  → CONSUMER CHECKOUT (VIN entered in fast lane → /checkout?vin=...)
  → DEALER INQUIRY (dealer signup form → /dealer-onboarding or sales contact)
  Tertiary exit: → /sample-report (proof viewer, returns to landing).
```

---

## Section 4: Decision Map

### 4A: User Decision Sequence

```
PAGE LEVEL (segment A — individual buyer):
  First question: "Is this a real way to get an actual Carfax for less than $40?"
  Resolved by: Hero left side ("Volume Carfax reports") + Hero right side
    Consumer Fast Lane card with explicit "Official Carfax · PDF in 60 seconds
    · Money-back guarantee" microcopy + immediately-visible trust bar.

PAGE LEVEL (segment B — dealer):
  First question: "Is this a serious B2B option, or am I on a consumer coupon
    site that happens to mention dealers?"
  Resolved by: Hero LEFT column leads with dealer language ("Volume Carfax
    reports, built for dealers"), explicit "See dealer pricing" CTA, dealer
    pricing tiers visible without scrolling on tall desktop, business identity
    proof in trust bar.

SECTION LEVEL (both segments, scanning):
  Scanning for: legitimacy proof, price specifics, path that fits me
  Resolved by: Left/right hero split that gives dealers the headline weight
    and individuals a self-contained purchase card; trust bar immediately under
    hero; pricing tiers section that shows dealer economics; sample report
    section that works for both.

COMPONENT LEVEL (consumer fast lane card):
  Click-vs-skip decision: "Will this VIN field actually deliver a real Carfax
    PDF, and will I get my money back if it doesn't?"
  Resolved by: Price comparison ($14.99 vs $44.99 direct) inline above the
    button, trust microcopy directly under the button (not in footer), and a
    "View sample report" tertiary link inside the same card.

COMPONENT LEVEL (dealer pricing tier cards):
  Click-vs-skip decision: "Is the savings real at my volume, and are the terms
    transparent enough to justify a sales call?"
  Resolved by: Per-report price visible on each tier, monthly volume bracket
    explicit, included terms (no contract, cancel anytime, dedicated rep)
    listed in the tier, "Talk to sales" or "Set up access" CTA inside each tier.
```

### 4B: Asset and Evidence Inference

```
PRODUCT/OUTPUT ASSETS:
  Official Carfax PDF report (the actual deliverable). Sample report (redacted
    VIN, authentic Carfax format). Dealer dashboard preview (where dealers
    access reports continuously).

PROOF ASSETS:
  Authorized reseller status (assumed legitimate per diagnosis assumption).
  Reports-delivered counter (e.g., "412,000+ reports delivered to 1,800+
    dealers since 2018"). Refund guarantee with explicit terms. Stripe / payment
    provider security badge. Business registration / EIN footer disclosure.
  Dealer testimonials with full name + dealership + city. BBB profile (if
    genuine). Sample report (high-leverage proof for both segments).

CONVERSION ASSETS:
  Per-report price clarity (individual: $14.99). Volume-tier pricing table
    (dealer: $9.99/$7.49/$5.99 by volume). 100% money-back guarantee. PDF
    delivery time stated ("in 60 seconds"). VIN-to-purchase one-step flow.
    Dealer pricing visible without form-gate.

NAVIGATION/SELF-SELECTION ASSETS:
  Top nav segmentation ("For Dealers" / "Buy a report"). Hero split (dealer
    left, individual right). Repeated dual-CTA at page bottom. Dealer pricing
    tiers section anchor. Sample report link reachable from 3 places.

ACTION VS SIGNAL CLASSIFICATION:
  Actions:
    - VIN input field (consumer fast lane)
    - "Buy report now" button (consumer)
    - "See dealer pricing" anchor button (dealer)
    - "Talk to sales" / "Set up dealer access" form CTA (dealer)
    - "View sample report" link (tertiary, both segments)
  Signals:
    - Reports-delivered counter
    - Refund guarantee block
    - Authorized reseller statement
    - Stripe / secure payment badge
    - Sample report preview (passive form: thumbnail + caption)
    - Dealer testimonials
    - Business identity in footer
    - Direct Carfax vs CarFaxDeals comparison table
    - Volume pricing table (presented as evidence of real economics, not just
      as a price list — terms and bracket math are the trust payload)
```

### 4C: Strategy Defense

```
ASSIGNED STRATEGY: dealer-value-forward-with-consumer-fast-lane

WHY THIS STRATEGY FITS THIS INTAKE:
  Dealer LTV is substantially higher than individual LTV (intake states this
  explicitly), and the diagnosis weights the dealer path as a hard floor with a
  7.0 score cap if buried. A dealer-value-forward layout treats volume access
  as a serious B2B offer — visible pricing tiers, business legitimacy proof,
  human contact path — rather than the typical consumer-discount-page footnote.
  At the same time, individuals decide in under 60 seconds and the consumer
  purchase remains the primary stated key action; the "fast lane" is therefore
  not a footnote either — it is a self-contained, hero-resident VIN-to-purchase
  card with its own trust signals. Both audiences see themselves named within
  the first viewport. The fit is strong on dealer prominence and individual
  immediacy; the fit is moderate on warm-referral consumer traffic, who may
  briefly wonder if they're "in the right place" before the right-side card
  resolves them — that is the cost we accept for elevating the dealer channel.

LOCAL OPTIMUM THIS STRATEGY RISKS:
  The shallow dealer-value-forward page reads as B2B-only: a dealer-targeted
  hero that pushes individuals to a "for individual buyers" tab or a small
  link in the corner, producing a clean enterprise-feeling layout that quietly
  loses 70% of social-media traffic. The diagnosis flags this exact pattern
  via candidate strategy seed's main_risk: "Individual buyers may perceive the
  page as not meant for them if the one-time purchase path is not immediately
  obvious."

HOW THIS DESIGN AVOIDS THAT LOCAL OPTIMUM:
  (1) The hero is a 60/40 split, not 100/sidebar. The right-side Consumer Fast
  Lane card is hero-resident, not below-fold or behind a tab — its VIN input,
  price ($14.99 vs $44.99), and "Buy report now" button are all in the first
  viewport on desktop. (2) The mobile order is REVERSED so individual buyers
  arriving from social see the fast lane first; dealer headline drops to the
  second screen but stays prominent. (3) The trust bar under the hero serves
  both segments equally, with reports-delivered metric phrased to credit both
  individual and dealer use. (4) The page never makes individuals click "I'm
  an individual" before seeing prices or trust signals.

REFERENCE CALIBRATION:
  No external references injected for this run. Working from general taste:
  the design family it belongs to is "transactional dual-path conversion with
  proof-led trust" — closer to a high-trust ecommerce checkout marketing page
  (Stripe Checkout marketing, Plaid for consumers landing) than to a generic
  SaaS hero. It deliberately diverges from "automotive coupon site" tropes
  (no urgency timers, no exaggerated discount badges, no neon-yellow accents)
  and from "B2B SaaS hero" tropes (no abstract product gradient illustration,
  no waitlist form). The structural move borrowed is the Stripe-style
  side-by-side hero (proposition left, working tool right) adapted to a
  segment-split rather than a feature-demo split.

STRATEGIC DIAGNOSIS MAPPING:
  - Strategic axis "market_type: hybrid" → Hero 60/40 split; dual-CTA footer
    section; mobile reflow that preserves both paths.
  - Strategic axis "buyer_user_relationship: multiple_stakeholders" → Dealer
    pricing tiers visible without form-gate so a manager can shop and forward
    a link to a buyer/owner without losing context.
  - Strategic axis "trust_burden: high" → Trust bar pinned directly under
    hero, refund guarantee block adjacent to checkout card, business identity
    in footer with specific entity name.
  - Strategic axis "functional_immediacy: high" → Consumer fast lane card
    resolves to a pre-filled checkout in one click; VIN input lives in the
    hero, not behind a "Get started" button.
  - Strategic axis "audience_sophistication: mixed" → Dealer copy uses
    domain language (volume, per-report, no contract); consumer copy uses
    plain language ("Get an official Carfax report").
  - Decision-sequence step 1 ("Is this relevant to my need?") → Hero dual
    headline + segment-named CTAs.
  - Decision-sequence step 2 ("Is this legitimate?") → Trust bar; authorized
    reseller statement in hero; sample report link in fast lane card.
  - Decision-sequence step 3 ("Are the economics worth it?") → Inline price
    comparison in fast lane; dealer tier table with per-report math.
  - Decision-sequence step 4 ("Choose the correct path") → Hero split +
    dual-CTA bottom block; nothing forces an audience through irrelevant copy.
  - Decision-sequence step 5 ("Commit or seek proof?") → Sample-report CTA
    inside fast lane card AND in the proof section; dealer "Talk to sales"
    button alongside "Set up access".
  - Decision-sequence step 6 ("Recourse if it goes wrong?") → Refund
    guarantee block adjacent to checkout, expanded in FAQ, summarized in
    fast-lane microcopy.
  - Audience need "Receiving an actual official Carfax report" → "Official
    Carfax" wording in hero, fast lane, sample section, FAQ — never just
    "vehicle report".
  - Audience need "For dealers, enough pricing context to justify contacting"
    → Pricing tier table fully readable without form submission.
  - Design directive "polished_utility" → Grayscale-ready layout, no
    coupon-site decoration, no fake urgency.
  - Design directive "cta_strategy: trust-adjacent rather than isolated" →
    Every commitment CTA in this design has a trust microcopy line within
    24px of it.

FIRST VIEWPORT OBLIGATION:
  Diagnosis requires the first viewport to deliver: discounted official Carfax
  identification, credible legitimacy/safety signal, individual buyer path,
  dealer/volume path, savings cue, low-commitment proof option.

  Desktop first-fold components that satisfy it:
    1. Top nav with "For Dealers" link, "Sample report" link, mini "Buy a
       report" button (dealer + consumer + proof navigation reachable).
    2. Hero LEFT — "Volume Carfax reports, built for dealers" headline +
       "Save up to 80% on official Carfax reports" subhead (savings cue +
       official-report identification + dealer path).
    3. Hero LEFT — "See dealer pricing" primary CTA + "Talk to sales"
       secondary CTA (dealer path action).
    4. Hero RIGHT — Consumer Fast Lane card with VIN input, "$14.99 (was
       $44.99)" inline price comparison, "Buy report now" button, "Official
       Carfax · PDF in 60 seconds · Money-back guarantee · View sample"
       microcopy (individual path, savings cue, legitimacy proof, sample
       proof access — all four).
    5. Trust bar IMMEDIATELY under hero, before any other section: "Authorized
       Carfax reseller · 412,000+ reports delivered · Stripe-secured payment
       · 100% money-back guarantee" (legitimacy proof; designed to peek into
       the first viewport on a 1440x900 laptop).

  Mobile first-fold components that satisfy it:
    1. Top mini-nav with "Dealers" link visible.
    2. Compact dual-segment headline: "Official Carfax reports, $14.99.
       Volume pricing for dealers." (both audiences named, savings cue,
       official-product identification — in one screen).
    3. Consumer Fast Lane card (REORDERED to lead on mobile because urgent
       individual buyers arrive on mobile from marketplaces).
    4. Trust strip (compact: "Authorized reseller · Money-back · Sample
       report") — pinned just below the fast lane card, fits in viewport on
       a 390x844 device.
    5. "For dealers" anchor button at the bottom of the first screen routes
       to the dealer section without scrolling away from individual context.

HARD FLOOR COVERAGE:
  - hf_first_viewport_legitimacy_and_self_selection → Section 11B + Section
    12 (HTML wireframe) encode all six required first-fold elements.
  - hf_early_legitimacy_proof → Trust bar + authorized-reseller statement +
    fast-lane microcopy all sit before any second-section CTA.
  - hf_segment_self_selection → Hero 60/40 split + dual top-nav CTA + dual
    bottom CTA section.
  - hf_individual_purchase_immediacy → Consumer Fast Lane card with
    hero-resident VIN input.
  - hf_dealer_path_prominence → Hero LEFT leads visually; dealer pricing
    tier section gets P-class weight; dealer signup form is a major page
    section, not a footer afterthought.
  - hf_official_report_clarity → "Official Carfax" phrase appears in hero,
    fast lane, sample section, comparison table, FAQ; never just "vehicle
    report".
  - hf_transparent_terms_and_safety → Pricing visible without form gate;
    refund guarantee block; FAQ with delivery and recourse details.
  - hf_proof_for_skeptics → Sample report CTA in three locations (fast lane
    card, dedicated section, FAQ); requires no form submission.
  - hf_mobile_conversion_path → Mobile reflow puts fast lane first; trust
    strip pinned compact; dealer path remains discoverable via anchor.

ANTI-PATTERN AVOIDANCE:
  - ap_coupon_scam_aesthetic → No urgency timers, no flashing discount
    badges; price comparison rendered as quiet typography ($14.99 next to
    a strikethrough $44.99), not as a coupon banner.
  - ap_buried_trust → Trust bar appears IN or directly under first viewport;
    refund guarantee adjacent to checkout card, not in footer.
  - ap_individual_only_bias → Strategy explicitly elevates the dealer path
    to LEFT-of-hero with primary visual weight.
  - ap_dealer_overeducation → Dealer section assumes the audience knows
    what a Carfax report is; copy focuses on price, terms, business identity,
    not on "what is a Carfax".
  - ap_ambiguous_product_naming → "Official Carfax" phrasing required in
    every product reference; no use of "vehicle history report" alone.
  - ap_unsubstantiated_authority_claims → Trust bar items each have a
    specific anchor (named entity, named processor, specific count) — no
    generic "as seen on" badges or vague "trusted by thousands".
  - ap_long_brand_story_before_task → No "About us" or origin-story section
    above the trust bar; business identity is concise and lives in footer.
  - ap_hidden_or_vague_refund_terms → Refund block states the actual policy
    ("Full refund within 7 days if the report is not delivered or is not the
    official Carfax"), not "satisfaction guaranteed".
  - ap_generic_saas_visual_formula → Layout treats VIN input as the active
    UI element (not a feature card with checkmarks); dealer tier table
    presents real economics, not abstract benefit bullets.
```

### 4D: Component Justification

| Component | User Lens | Business Lens | Verdict |
|-----------|-----------|---------------|---------|
| Top nav with For Dealers, Sample report, mini Buy CTA | Lets each audience see themselves before scrolling | Routes traffic to highest-LTV path early | Include — split paths from frame 1 |
| Hero dealer headline (LEFT) | Dealer feels site is for them, not an afterthought | Anchors dealer-forward strategy; supports higher-LTV channel | Include |
| Hero dealer subhead with savings cue | Resolves "is this real value?" question | Frames discount as legitimate (volume → savings) | Include |
| "See dealer pricing" primary CTA | Dealers can scan tiers without committing | Unblocks methodical dealer evaluation | Include |
| "Talk to sales" secondary CTA | Methodical dealers want a person | Creates a high-quality lead path | Include |
| Consumer Fast Lane card (RIGHT) | Individual sees a complete purchase tool, not a "for individuals" link | Captures sub-60-second decisions before they bounce | Include — non-negotiable counterweight to dealer-forward layout |
| VIN input field in fast lane | Lets the buyer commit to their specific car immediately | Reduces drop-off between intent and checkout | Include |
| Inline price comparison ($14.99 vs $44.99) | Resolves "is it actually cheaper?" instantly | Anchors the discount as specific and verifiable | Include |
| Fast lane trust microcopy | Closes legitimacy gap at the moment of decision | Reduces fear-driven bounce | Include |
| "View sample report" link in fast lane | Low-commitment proof for the not-quite-ready | Recovers skeptical traffic | Include |
| Trust bar | Immediate legitimacy proof for both segments | Floors the score-cap risk for trust hard floors | Include |
| Authorized reseller statement | Resolves "is this a knockoff?" | Enables truthful product naming | Include (dependent on assumption) |
| Reports-delivered counter | Volume-of-users social proof | Reinforces business legitimacy | Include — only with real number |
| Stripe / secure payment badge | Reduces payment anxiety | Reduces checkout abandonment | Include |
| Money-back guarantee badge | Reduces purchase risk | Lowers refund inquiry cost via clarity | Include |
| Dealer pricing tier table | Lets dealers self-evaluate the economics | Generates qualified leads (vs cold form fills) | Include — must be readable without gating |
| Dealer process steps | Shows operational reality (signup, invoice, dashboard) | Reduces "is this even running?" uncertainty | Include |
| Dealer testimonials | Peer proof | Closes the methodical-dealer trust gap | Include |
| Dealer signup form | Business-grade lead capture | Higher-LTV conversion event | Include |
| Consumer how-it-works (3 steps) | Sets expectation for the urgent buyer | Reduces support load | Include |
| Sample report preview | Strongest single-asset proof | Recovers cold-traffic skeptics | Include |
| Refund guarantee details block | Resolves recourse question | Reduces refund disputes via clarity | Include |
| Customer reviews | Peer proof for individuals | Reinforces volume claim | Include |
| Direct vs CarFaxDeals comparison | Anchors discount in a known reference (carfax.com) | Validates value at a glance | Include |
| FAQ accordion | Long-tail trust questions | Deflects support load | Include |
| Final dual CTA block | Last-chance segment self-selection | Captures bottom-of-page committers | Include |
| Footer business identity | Resolves "who am I buying from?" | Required for trust + legal | Include |
| Carousel of dealer logos | "Trusted by" decoration | Generic; no specific belief moved | EXCLUDE — would trip ap_unsubstantiated_authority_claims |
| Live chat widget | Could help dealers | Adds visual noise; can replace human-contact step poorly | EXCLUDE — replaced by "Talk to sales" button + scheduled call |
| Urgency timer ("offer expires in 12:00") | Pressure tactic | Trips ap_coupon_scam_aesthetic | EXCLUDE |

### 4E: Tension Map

```
TENSION: Dealer-forward hero vs intake's "Buy a report" stated as PRIMARY
  Business pull (dealer side): Higher LTV justifies elevating dealer path.
  Business pull (individual side): Volume of consumer transactions is what the
    discount story is built on.
  User pull: Individual buyer decides in 60s; cannot afford to feel the page is
    "for someone else" even for 5 seconds.
  Resolution: 60/40 hero split. Dealer takes the headline weight (left, larger
    type, leading subhead). Individual gets a self-contained tool (right card)
    with its own micro-trust signals so it functions as a parallel primary,
    not a subordinate. On mobile, the order INVERTS — fast lane leads, dealer
    headline becomes second screen — because mobile traffic skews individual.

TENSION: Legitimacy proof density vs sub-60-second decision
  Business pull: More proof = more conversion among skeptics.
  User pull: Urgent individual buyers will not read three paragraphs of trust.
  Resolution: Trust signals are decomposed into dense, scannable atoms (4-icon
    trust bar, 3-line fast-lane microcopy) rather than long paragraphs. Long-
    form proof (dealer testimonials, FAQ, comparison table) lives below the
    fold for those who scroll.

TENSION: Dealer pricing visibility vs lead quality
  Business pull: Gating pricing behind a form increases form fills.
  User pull: Dealers are skeptical of any reseller and will not fill a form
    without seeing whether the economics are real.
  Resolution: Pricing tiers fully visible without gating. The form is for
    "Set up dealer access" (post-decision), not for "see pricing". This
    reduces form volume but raises lead quality — the diagnosis explicitly
    wants qualified dealer leads, not unqualified contacts.

TENSION: Consumer fast lane VIN input vs dealer-feeling visual register
  Business pull: VIN input makes individual purchase ergonomic.
  User pull (dealer): A consumer-facing VIN box could read as B2C-coded and
    reduce dealer credibility.
  Resolution: VIN input lives in a card that is visually equal to (not above)
    the dealer headline column, with subdued utility styling (gray border,
    no neon, no consumer-marketing decoration). The card looks like a tool,
    not a coupon — which a dealer respects rather than dismisses.

TENSION: "Authorized Carfax reseller" claim vs legal exposure
  Business pull: Strongest legitimacy claim available.
  User pull: Resolves the #1 trust question for both segments.
  Resolution: This claim is gated on the diagnosis assumption that authorization
    is legally supportable. The wireframe places it in the trust bar with the
    expectation that legal will validate the exact wording before launch. If
    the assumption fails, the design degrades gracefully — the claim is
    replaced with "Direct Carfax data partner" or similar legally-safe phrasing
    in the same slot, no other component changes.
```

---

## Section 5: Visual Hierarchy Map

```
PRIMARY (dominant visual weight):
  1. Hero dealer headline ("Volume Carfax reports, built for dealers.") —
     largest type on the page, sets dealer-forward strategy.
  2. Consumer Fast Lane card (VIN input + price comparison + Buy button) —
     equal visual weight via card prominence, contrasts with hero left
     through bordered surface and inline interactivity. The card must read
     as a peer of the dealer headline, not subordinate to it.
  3. "See dealer pricing" primary CTA — solid filled button, hero-resident,
     dealer path commit point.
  4. "Buy report now" button in fast lane — solid filled button, parallel
     weight to dealer CTA.
  5. Dealer pricing tiers (3 cards) — large, scannable, with per-report
     price as the typographic anchor of each card.
  6. Sample report preview — full-width visual asset, P-class because it
     is the highest-leverage single proof artifact.

SECONDARY (supporting):
  7. Hero dealer subhead ("Save up to 80% on official Carfax reports.").
  8. Hero "Talk to sales" secondary CTA (outlined button).
  9. Trust bar (4 atoms below hero).
  10. Inline price comparison in fast lane.
  11. Fast lane trust microcopy line.
  12. Dealer how-it-works 3-step.
  13. Dealer testimonials (3 cards).
  14. Dealer signup form CTA section.
  15. Consumer how-it-works 3-step.
  16. Refund guarantee detail block.
  17. Customer review block (4 reviews).
  18. Direct Carfax vs CarFaxDeals comparison table.
  19. FAQ accordion (8 questions).
  20. Final dual CTA block.

TERTIARY (recessive):
  21. Top nav logo.
  22. Top nav links (Dealers / Sample / Pricing / FAQ).
  23. Top nav mini "Buy a report" pill.
  24. Footer business identity (entity name, EIN, address).
  25. Footer legal links (Terms, Privacy, Refund Policy, Contact).
  26. Footer copyright + non-affiliation disclaimer.
```

---

## Section 6: Component Inventory

| Component | Class | Purpose | Content Direction |
|-----------|-------|---------|-------------------|
| logo | T | Brand mark | Wordmark "CarFaxDeals" or icon+text, neutral |
| primary-nav | T | Desktop main nav | "For Dealers · Pricing · Sample report · FAQ" |
| nav-buy-pill | S | Persistent consumer CTA in nav | "Buy a report" (small filled button) |
| hero-dealer-headline | P | Lead with dealer-forward proposition | "Volume Carfax reports, built for dealers." (~7-9 words, declarative) |
| hero-dealer-subhead | S | Frame savings cue + audience expansion | "Save up to 80% on official Carfax reports — for dealers buying at volume, and for individuals checking one car." (~22-28 words) |
| hero-dealer-cta-primary | P | Anchor dealer path | "See dealer pricing" (filled, anchor scrolls to #dealer-pricing-tiers) |
| hero-dealer-cta-secondary | S | Alternate dealer path | "Talk to sales" (outlined, anchor or modal) |
| hero-authorized-statement | S | Inline legitimacy in hero left | "Authorized Carfax reseller · serving 1,800+ dealerships since 2018" |
| consumer-fast-lane-card | P | Self-contained individual purchase tool | Card with title "Need just one report?" |
| fast-lane-vin-input | P | Capture VIN and unlock checkout | Placeholder "Enter VIN (17 characters)", inline validation |
| fast-lane-price-line | P | Inline price comparison | "$14.99 today · $44.99 direct from carfax.com" |
| fast-lane-cta | P | Commit to consumer purchase | "Buy report now →" filled button |
| fast-lane-trust-microcopy | S | Reduce risk at decision moment | "Official Carfax PDF · Delivered in under 60 seconds · 100% money-back guarantee" (3 atoms separated by middots) |
| fast-lane-sample-link | T | Tertiary proof escape hatch | "View a sample report →" (text link inside card) |
| trust-bar | S | Cross-segment legitimacy proof | 4 atoms: "Authorized Carfax reseller · 412,000+ reports delivered · Stripe-secured checkout · 100% money-back guarantee" |
| value-section-headline | S | Section anchor for dealer value | "Built for dealers running volume." |
| dealer-volume-explainer | S | Specific savings logic | 2-3 sentences: "Per-report cost drops with volume. Dealers running 50+ reports/month pay $7.49/report — 83% off direct pricing." |
| dealer-pricing-tiers | P | 3-tier dealer pricing table | Tier 1 "Independent" 1-49/mo $9.99; Tier 2 "Dealer" 50-249/mo $7.49; Tier 3 "Volume" 250+/mo $5.99. Each tier lists: per-report price, monthly bracket, included terms, CTA |
| dealer-tier-cta | S | Per-tier conversion | "Set up access" button on each tier |
| dealer-process-steps | S | 3-step dealer onboarding explainer | "1. Verify dealership · 2. Get dashboard access · 3. Pull reports unlimited within plan" |
| dealer-proof-block | S | Specific business legitimacy for dealers | Authorized reseller details, business entity info, account rep contact |
| dealer-testimonials | S | Peer proof, full attribution | 3 testimonials: name, dealership, city/state, quote (~30-40 words each) |
| sample-report-section | P | High-leverage proof for both segments | Section with thumbnail/preview of an actual redacted Carfax PDF page + "View full sample" button |
| sample-report-preview | P | Visual artifact of a real report | Image placeholder representing a Carfax PDF first page |
| sample-report-cta | S | Open the full sample | "View full sample report" button |
| consumer-how-it-works | S | 3-step individual flow | "1. Enter VIN · 2. Pay $14.99 · 3. Get PDF in 60 seconds" |
| refund-guarantee-block | S | Recourse clarity | Header "100% money-back guarantee" + 2-sentence explicit policy + link to full refund terms |
| customer-reviews | S | Peer proof for individuals | 4 short reviews with name + city + star count + verified-purchase tag |
| comparison-table | S | Anchor discount in carfax.com pricing | Rows: price/report, official Carfax, refund window, dealer plan, sample available, delivery time. Cols: carfax.com / CarFaxDeals individual / CarFaxDeals dealer |
| faq-accordion | S | Long-tail objections | 8 Qs covering: official-Carfax authenticity, refund policy, delivery time, dealer terms, payment security, what data is included, business identity, how the discount works |
| dealer-signup-form | P | Qualified dealer lead capture | Fields: dealership name, contact name, email, phone, est. monthly volume, message. Header "Set up dealer access". Below form: "We respond within 1 business day." |
| final-dual-cta | P | Last-chance dual self-selection | Two-column block: LEFT "Dealers — Set up access" with form re-anchor; RIGHT "Buying one report? — Enter VIN" with mini fast lane |
| footer-business-identity | T | Entity transparency | Legal entity name, EIN, address, phone, email |
| footer-legal-links | T | Required legal navigation | Terms · Privacy · Refund Policy · Contact · Affiliate Disclosure |
| footer-disclaimer | T | Non-affiliation / trademark notice | "Carfax® is a registered trademark of Carfax, Inc. CarFaxDeals operates as an authorized reseller / partner. We are not Carfax, Inc." |

Component count: 35. Every row appears in Section 7 (ASCII) and Section 12 (HTML wireframe) with matching `data-component` and `data-class` attributes.

---

## Section 7: ASCII Wireframe (Desktop, 1440px)

```
+----------------------------------------------------------------------+
| [logo]   For Dealers · Pricing · Sample · FAQ      [Buy a report]   |  <- nav (T)
+======================================================================+
|                                                                      |
|  HERO LEFT (60%)                  |  HERO RIGHT (40%)                |
|                                   |                                  |
|  Volume Carfax reports,           |  +---------------------------+   |
|  built for dealers.               |  | Need just one report?     |   |
|  ============================     |  |                           |   |
|  (P, large headline)              |  | [ Enter VIN (17 chars)  ] |   |
|                                   |  |                           |   |
|  Save up to 80% on official       |  | $14.99 today              |   |
|  Carfax reports — for dealers     |  | $44.99 direct from carfax |   |
|  buying at volume, and for        |  |                           |   |
|  individuals checking one car.    |  | [   Buy report now  →   ] |   |
|  (S subhead)                      |  |                           |   |
|                                   |  | Official Carfax PDF ·     |   |
|  [ See dealer pricing  → ]        |  | Delivered in 60s · 100%   |   |
|  [ Talk to sales ]                |  | money-back guarantee      |   |
|  (P + S CTAs)                     |  |                           |   |
|                                   |  | View a sample report →    |   |
|  Authorized Carfax reseller ·     |  +---------------------------+   |
|  serving 1,800+ dealerships       |   (P card; VIN input is the      |
|  since 2018  (S statement)        |    active surface)               |
|                                                                      |
+----------------------------------------------------------------------+
| TRUST BAR                                                            |
| ✓ Authorized reseller  ✓ 412,000+ delivered  ✓ Stripe-secured        |
| ✓ 100% money-back guarantee                                          |
+======================================================================+
|                                                                      |
| VALUE-SECTION (anchor: dealer-pricing-tiers)                         |
| "Built for dealers running volume."                                  |
|                                                                      |
| Per-report cost drops with volume. Dealers running 50+ reports/month |
| pay $7.49/report — 83% off direct pricing. (S explainer)             |
|                                                                      |
| +--------------------+  +--------------------+  +-------------------+|
| | Independent        |  | Dealer             |  | Volume            ||
| | 1–49 reports/mo    |  | 50–249/mo          |  | 250+/mo           ||
| |                    |  |                    |  |                   ||
| | $9.99 / report     |  | $7.49 / report     |  | $5.99 / report    ||
| | (P anchor in card) |  | (P anchor)         |  | (P anchor)        ||
| |                    |  |                    |  |                   ||
| | • No contract      |  | • Dedicated rep    |  | • Custom invoicing||
| | • Cancel anytime   |  | • Priority support |  | • API access      ||
| | • Stripe billing   |  | • Bulk VIN upload  |  | • SLA             ||
| |                    |  |                    |  |                   ||
| | [ Set up access ]  |  | [ Set up access ]  |  | [ Talk to sales ] ||
| +--------------------+  +--------------------+  +-------------------+|
|                                                                      |
+----------------------------------------------------------------------+
| DEALER PROCESS                                                       |
|  1. Verify dealership   2. Get dashboard   3. Pull reports unlimited |
+----------------------------------------------------------------------+
| DEALER PROOF: Authorized reseller · Entity: CFD Reports LLC · EIN    |
| visible · Direct account rep · 1,800+ dealerships since 2018         |
+----------------------------------------------------------------------+
| DEALER TESTIMONIALS                                                  |
|  [Quote 1]            [Quote 2]            [Quote 3]                 |
|  Name, Dealership,    Name, Dealership,    Name, Dealership,         |
|  City, State          City, State          City, State               |
+======================================================================+
|                                                                      |
| SAMPLE REPORT SECTION (P)                                            |
|  "See exactly what you get."                                         |
|  +--------------------------------------------+                      |
|  |   [Carfax-format PDF preview thumbnail]   |                       |
|  |   (P preview asset, full-width)           |                       |
|  +--------------------------------------------+                      |
|  [ View full sample report ]                                         |
|                                                                      |
+----------------------------------------------------------------------+
| CONSUMER HOW-IT-WORKS                                                |
|  1. Enter VIN   2. Pay $14.99   3. Get PDF in 60 seconds             |
+----------------------------------------------------------------------+
| REFUND GUARANTEE                                                     |
| 100% money-back guarantee                                            |
| Full refund within 7 days if the report is not delivered or is not   |
| the official Carfax. → Read full refund terms                        |
+----------------------------------------------------------------------+
| CUSTOMER REVIEWS                                                     |
|  [★★★★★] [★★★★★] [★★★★★] [★★★★★]                                     |
|  Verified-purchase reviews, name + city                              |
+----------------------------------------------------------------------+
| COMPARISON TABLE                                                     |
|              | carfax.com | CarFaxDeals (ind.) | CarFaxDeals (dealer)|
| Price/report |   $44.99   |     $14.99         |   $5.99–$9.99       |
| Official     |     ✓      |       ✓            |       ✓             |
| Refund win.  |    none    |     7 days         |    7 days           |
| Volume plan  |     —      |       —            |    1–250+/mo        |
| Delivery     |   60 sec   |     60 sec         |    instant          |
| Sample       |     —      |     ✓              |       ✓             |
+----------------------------------------------------------------------+
| FAQ                                                                  |
|  ▸ Are these official Carfax reports?                                |
|  ▸ How is the price so much lower?                                   |
|  ▸ How fast is delivery?                                             |
|  ▸ How does the dealer plan work?                                    |
|  ▸ Is the payment secure?                                            |
|  ▸ What's in the report?                                             |
|  ▸ Who runs this site?                                               |
|  ▸ What's the refund policy?                                         |
+======================================================================+
| FINAL DUAL CTA                                                       |
|  +--- DEALERS ----------+   +--- BUYING ONE REPORT? -------------+   |
|  | Set up dealer access |   | [ Enter VIN ]  [ Buy now → ]      |   |
|  | [ form fields ]      |   | $14.99 · Official Carfax · 7-day  |   |
|  | [ Submit ]           |   |   money-back                      |   |
|  +----------------------+   +-----------------------------------+   |
+----------------------------------------------------------------------+
| FOOTER                                                               |
| CFD Reports LLC · EIN · Address · Contact                            |
| Terms · Privacy · Refund · Affiliate Disclosure                      |
| Carfax® is a registered trademark of Carfax, Inc. CarFaxDeals        |
| operates as an authorized reseller. We are not Carfax, Inc.         |
+----------------------------------------------------------------------+
```

---

## Section 8: Responsive Behavior

```
DESKTOP (≥1025px):
  - Hero: 60/40 split (dealer left, consumer fast lane right) inside a
    1280px container.
  - Trust bar: 4-atom horizontal row.
  - Dealer pricing: 3 columns side by side.
  - Comparison table: full 4-column table.
  - Final dual CTA: 2 columns side by side.

TABLET (641-1024px):
  - Hero: stacks vertically. ORDER PRESERVED — dealer headline first, then
    fast lane card immediately below. Both remain in the first 1.2 viewports.
  - Trust bar: wraps to 2 rows of 2 atoms.
  - Dealer pricing: 3 columns reflow to 1 column stacked.
  - Comparison table: scrolls horizontally inside its container.
  - Final dual CTA: stacks vertically (dealer first, consumer second).

MOBILE (≤640px):
  - Hero: stacks vertically. ORDER REVERSED — Consumer Fast Lane card FIRST,
    dealer headline + CTAs second. Reasoning: individual buyers arrive on
    mobile from social/marketplaces in the urgent <60s decision window. The
    dealer audience is willing to scroll. This is the only place mobile order
    diverges from desktop order.
  - Compact dual-segment headline appears above the fast lane card on mobile
    only ("Official Carfax reports, $14.99. Volume pricing for dealers.") to
    preserve the first-fold dual-segment hard floor without showing the full
    desktop dealer headline.
  - Trust bar: 2x2 grid of compact atoms.
  - Dealer pricing: 1 column, full width, swipeable carousel optional but not
    required for v1.
  - Dealer process steps: 3-step vertical list.
  - Sample report preview: full-width image, no side margin.
  - Comparison table: TRANSFORM to stacked card list (each row of the desktop
    table becomes a labeled card pair: "carfax.com vs CarFaxDeals individual"
    and "carfax.com vs CarFaxDeals dealer").
  - FAQ: collapsed accordion items (one expanded at a time).
  - Final dual CTA: stacks. Dealer signup form first (already-scrolled users
    are more likely dealer-curious), consumer mini-fast-lane second as
    fallback.
  - Mobile footer: collapsed legal accordion + visible business identity.
  - Sticky bottom bar: optional NOT v1. The fast-lane card pinned at top
    of mobile is sufficient.
```

---

## Section 9: Interaction Notes

```
- VIN input validation: client-side check for 17-character length and
  Carfax-eligible characters. On invalid input, inline message under the
  input ("VINs are 17 characters; this looks like 14"). Submit button stays
  enabled (do not block clicks; route to an error state in checkout instead
  of locking the user in the hero).

- "Buy report now" click: submits VIN to /checkout with VIN pre-filled.
  Page itself does not handle payment — Stripe Checkout owns it.

- "See dealer pricing" click: smooth-scroll anchor to #dealer-pricing-tiers.

- "Talk to sales" click: opens dealer contact modal OR scrolls to dealer
  signup form (implementer choice; either preserves the user without a
  page change). Default in wireframe is anchor-scroll to #dealer-signup-form.

- "Set up access" tier CTA click: scrolls to dealer signup form with
  ?tier= query param to pre-select the tier.

- "View a sample report" / "View full sample report" click: opens
  /sample-report.pdf in a new tab. Tracking event fires.

- FAQ accordion: one item expanded at a time on mobile; multiple allowed
  on desktop. Click expands inline (no page change).

- Dealer signup form submit: validates required fields, posts to backend,
  shows inline confirmation ("We'll respond within 1 business day. A
  confirmation has been sent to {email}.").

- No urgency timers, no auto-popups, no exit-intent modals. The page
  earns conversion through clarity, not pressure.

- prefers-reduced-motion: smooth-scroll anchors fall back to instant jumps;
  no decorative animations exist on this page anyway.
```

---

## Section 10: Content Direction

```
OVERALL TONE: Direct, credible, businesslike. Confident without hype. Reads
like a working tool rather than a marketing campaign. Dealer-section copy is
denser and uses domain language; consumer-section copy is plain and short.
Avoid superlatives, exclamation points, fake urgency, and any phrasing that
implies the offer is too good to be true.

SECTION-BY-SECTION:
- Top nav: 4-5 plain labels. No marketing copy.
- Hero dealer headline: 7-9 words. Declarative ("Volume Carfax reports,
  built for dealers."). NOT "Save big!" or "The smarter way to..."
- Hero dealer subhead: 22-28 words. Names the savings cue and explicitly
  acknowledges both segments. ("Save up to 80% on official Carfax
  reports — for dealers buying at volume, and for individuals checking
  one car.")
- Hero CTAs: action verbs. "See dealer pricing" / "Talk to sales".
- Hero authorized statement: one sentence. Specific count and year.
- Consumer fast lane card title: 4-5 words. ("Need just one report?")
- Fast lane price line: 9-13 words. Both prices with carfax.com name.
- Fast lane CTA: 3-4 words plus arrow. ("Buy report now →")
- Fast lane trust microcopy: 3 atoms separated by middots. Each atom is
  3-7 words.
- Sample link: 5 words plus arrow.
- Trust bar: 4 atoms, 3-6 words each. Each atom is a verifiable claim,
  not a generic badge.
- Value-section headline: 5-8 words.
- Volume explainer: 2-3 sentences. Numeric specificity is required —
  no "save lots" or "drastically lower"; always cite a tier.
- Dealer pricing tiers: tier name (one word), volume bracket (precise
  numeric range), per-report price (single number with "/report"),
  3-4 included-term bullets (5-8 words each), CTA (3-4 words).
- Dealer process steps: 3 imperative phrases, 4-7 words each.
- Dealer proof: entity name, EIN reference, account rep mention. No
  marketing language.
- Dealer testimonials: 30-40 words each. Real names, real dealerships,
  real cities. No generic "great service!" quotes — quotes must mention
  a specific operational benefit (volume, support response, billing).
- Sample report section headline: 5-7 words ("See exactly what you get.").
- Sample report CTA: 4-5 words.
- Consumer how-it-works: 3 numbered phrases, 4-7 words each.
- Refund guarantee block: header (4-5 words), policy sentence (15-25
  words), link to full terms.
- Customer reviews: ~25-35 words each, name + city + verified-purchase
  tag, no testimonial-farm vibes.
- Comparison table: column headers explicit (carfax.com / CarFaxDeals
  Individual / CarFaxDeals Dealer); row labels concrete; cells show
  numbers or ✓/—, never "varies" or "ask".
- FAQ: questions phrased as the user phrases them ("Are these real
  Carfax reports?" not "Report authenticity"). Answers 25-60 words.
- Final dual CTA: dealer side reuses signup form copy; consumer side
  reuses fast-lane copy. No new claims.
- Footer: legal precision. Specific entity name. Trademark
  acknowledgment. Non-affiliation statement.
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
- Top nav must be fully visible at top, including "For Dealers" link and
  "Buy a report" pill.
- Hero dealer headline must be visible (left column).
- Hero dealer subhead must be visible.
- "See dealer pricing" primary CTA must be visible.
- Consumer Fast Lane card must be entirely visible (right column),
  including VIN input, price comparison, "Buy report now" button, and
  trust microcopy.
- Trust bar must peek into the first viewport (at minimum, the top edge
  of the bar visible — full visibility on 1440x900 with 64px nav and
  600px hero is achievable and is the target).
- Must NOT render as a single dealer-only viewport (consumer fast lane
  must be on screen).
- Must NOT render as a single consumer-only viewport (dealer headline
  + dealer CTA must be on screen).

FIRST VIEWPORT (tablet, 768x1024):
- Top nav visible.
- Compact dual-segment headline visible (hero is stacked).
- Dealer headline + dealer primary CTA visible without scroll.
- Consumer Fast Lane card visible without scroll (this is the tightest
  constraint and drives hero density at this breakpoint).

FIRST VIEWPORT (mobile, 390x844):
- Top mini-nav with "Dealers" link visible.
- Compact dual-segment headline visible.
- Consumer Fast Lane card (VIN input + price line + Buy button) fully
  visible — this is the FIRST card on mobile by design.
- Trust strip visible at the bottom of the first viewport (compact 3-atom
  version: "Authorized reseller · Money-back · Sample report").
- "For dealers" link/anchor visible (in trust strip or as a small below-
  card pill) so dealer self-selection is reachable without scroll.
```

### 11C: Layout Constraints

```
LAYOUT:
- Desktop: 60/40 hero split. Dealer left (~640px content width within
  1280px container). Consumer card right (~440px). 24px gap minimum.
- Trust bar: full-width below hero, spans the 1280px container.
- Dealer pricing tiers: 3-column grid, equal widths.
- Comparison table: 4-column (label + 3 sources).
- Final dual CTA: 2-column 50/50.
- Tablet: hero stacks. Dealer FIRST, fast lane SECOND. Trust bar wraps
  to 2x2.
- Mobile: hero stacks. Fast lane FIRST. Compact dual-segment headline
  ABOVE fast lane. Dealer headline + CTAs SECOND. All grids → single
  column.
- Hero left dealer headline owns the largest typographic weight on the
  page. Consumer fast lane card carries equal informational weight via
  surface treatment (bordered card, denser content) — neither column is
  visually subordinated to the other.
- Primary actions ("See dealer pricing", "Buy report now") use solid-fill
  buttons. Secondary actions ("Talk to sales") use outlined buttons.
  Tertiary links use plain underline.
- No element above the trust bar may use solid red, solid yellow, or
  high-saturation accent colors. Grayscale + neutral primary accent only.
```

### 11D: Density & Rhythm

```
DENSITY:
- Mode: moderate hybrid. Marketing macro-rhythm (generous section
  separation) combined with dense atom-level information in the consumer
  fast lane card and dealer pricing tiers (where every line earns its
  place).
- Major sections use generous separation (96px desktop / 48px mobile
  between section boundaries).
- Hero internal density: generous on left (one idea, breathing room),
  moderate on right (card with 5-6 elements stacked).
- Trust bar: compact (4 atoms in one row, 24px between atoms).
- Dealer pricing tiers: moderate (each card has 7-9 elements with
  comfortable spacing).
- FAQ: compact (collapsed items, expand on click).
- Footer: moderate.
- Consumer fast lane card MUST NOT visually compete with the dealer
  headline through size — the hierarchy is "equal partners", expressed
  via card surface (bordered, slightly recessed background) on the right
  vs typographic dominance on the left.
- Buttons: primary CTA in the hero is no larger than the primary CTA in
  the fast lane (parity is required).
```

### 11E: Required Stable Selectors

```
REQUIRED SELECTORS (must exist as id attributes in the HTML wireframe):
- #page-root
- #primary-section          (hero section wrapper)
- #primary-action           (hero "See dealer pricing" CTA — the
                             dealer-forward primary action; strategy-aligned)
- #consumer-fast-lane       (the right-side card on desktop, hero-resident)
- #consumer-action          (the "Buy report now" button inside fast lane)
- #fast-lane-vin            (the VIN input field)
- #trust-bar
- #dealer-pricing-tiers
- #dealer-signup-form
- #sample-report-section
- #refund-guarantee
- #faq
- #final-dual-cta
- #footer-business-identity
```

### 11F: Non-Negotiables

```
- Hero MUST contain BOTH the dealer headline + dealer primary CTA AND
  the consumer fast lane card (with VIN input + Buy button) on desktop
  in the first viewport.
- On mobile, the consumer fast lane is the FIRST hero card (above dealer
  content). This inversion is intentional and must not be reverted.
- Trust bar MUST appear before any second-section CTA. No section may
  be inserted between the hero and the trust bar.
- Dealer pricing tiers MUST be readable without form submission, login,
  or "request pricing" gating.
- "Official Carfax" wording MUST appear in: hero subhead, fast lane
  trust microcopy, sample report section, comparison table, FAQ. Removal
  from any of these is a verification failure.
- Refund guarantee terms MUST be specific (delivery + authenticity
  conditions named). Generic "satisfaction guaranteed" wording fails.
- Footer MUST contain a specific legal entity name and a non-affiliation
  disclaimer regarding Carfax, Inc.
- No urgency timers, no auto-popups, no exit-intent modals.
- No element on the page may use a "carfax.com"-imitating color palette
  (no Carfax orange/red as primary brand) — implementation must respect
  trademark constraints.
```

### 11G: Allowed Variation

```
- Specific button copy may vary within the action verb ("See dealer
  pricing" / "View dealer plans" / "See volume pricing" all acceptable).
- Trust bar atom order may vary; the four atoms themselves are fixed.
- Dealer testimonial count may vary (2-4 acceptable; 3 is canonical).
- FAQ count may vary (6-10 acceptable).
- Sample report section may use a thumbnail OR a 2-page mosaic.
- Final dual CTA may use a single full-width form with a tabbed selector
  instead of side-by-side, IF on mobile both audiences remain visible
  without selecting a tab.
- Comparison table mobile transform may use accordions or stacked cards.
- Tier "Independent" name may be renamed ("Starter", "Solo Buyer") if
  intake feedback suggests it.
```

### 11H: Not Allowed

```
- A hero that omits either the dealer headline OR the consumer fast lane.
- A hero where the consumer fast lane is a "Get started" button that
  expands a form on click (must be hero-resident as input).
- A "For Individuals / For Dealers" segment-tab that hides one audience
  behind the other above the fold.
- A dealer pricing section gated behind a form ("contact us for pricing").
- A trust bar pushed below a feature section.
- An urgency timer or "limited time" badge.
- "As seen on" generic logo strip.
- A live-chat widget that overlaps the consumer fast lane on mobile.
- An exit-intent popup.
- Use of orange/red Carfax brand colors as primary site color.
- Any wording that implies the reports are something other than official
  Carfax (e.g., "vehicle history report" used alone with no Carfax
  qualifier).
- A footer that lacks a specific entity name or non-affiliation
  disclaimer.
```

---

## Section 12: HTML Wireframe Artifact

```
HTML WIREFRAME ARTIFACT:
  File: wireframe.dealer-value-forward-with-consumer-fast-lane.html
  Components: 35
  Selectors: 14
  Status: written
```

The HTML wireframe is rendered as a separate file alongside this spec. It encodes every component listed in Section 6 with `data-component` and `data-class` attributes, every required selector from Section 11E as `id` attributes, the responsive behavior described in Section 8 via CSS media queries (1024px and 640px breakpoints), and the density modes from Section 11D via `data-density` and `data-section-pad` attributes. The mobile hero-order inversion (consumer fast lane first) is implemented via CSS flexbox `order` properties so the document order remains semantically correct (dealer-led on desktop) while the mobile rendering inverts it.
