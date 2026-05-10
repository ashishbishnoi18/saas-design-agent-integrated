# UI Spec — Discount Carfax Reseller Landing — Strategy: sample-report-proof-led-path

---

## Section 1: Page Classification

```
TYPE: hybrid
DOMINANT MODE: marketing (pre-purchase, trust establishment is the primary blocker; checkout-style VIN entry is embedded but conversion design dominates)
```

The page is hybrid: it must perform marketing-grade trust-building for cold/warm visitors AND host a transactional VIN-to-pay micro-flow for individuals AND a B2B contact-style path for dealers. Marketing dominates because no audience will use the transactional path until legitimacy is established.

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
  Segment A — Individual buyer (one-time): Person evaluating a specific used
    car. Triggered by Craigslist / Marketplace / private seller / lot. Knows
    Carfax exists at ~$40 direct. Price-sensitive. Decides in <60s whether
    this is real. Bounces hard on scammy signals.
  Segment B — Dealer (recurring): Used-car dealer or independent buyer paying
    for Carfax/AutoCheck already. Looking for cost reduction at scale. Expert.
    Skeptical of knockoffs. Wants volume pricing, terms, legitimacy proof, and
    typically a human contact path before committing.

CONTEXT: Standalone landing page, single page, root of the site.
  Entry: warm word-of-mouth (partial trust) + cold social (full skepticism).
  Exit: individual checkout flow OR dealer contact/signup flow.
  Stage: pre-purchase / SELLING for both segments.

KEY ACTIONS:
  1. PRIMARY — Buy a report now (VIN → pay → receive PDF).
  2. SECONDARY — Set up dealer access (volume plan inquiry).
  3. TERTIARY — See a sample report (works for both segments).
```

---

## Section 3: Flow Map

```
FLOW: Single page (standalone). External entries: warm referral, cold social.
  External exits:
    [Individual]  → checkout (VIN → payment → PDF delivery)
    [Dealer]      → dealer contact form / volume signup
    [Skeptic]     → full sample report viewer (deep link to /sample, returns
                     to landing with "Buy Now" persistent CTA)
```

---

## Section 4: Decision Map

### 4A: User Decision Sequence

```
PAGE LEVEL:
  User's first question: "Is this a real way to get an actual official Carfax
    report cheaper, or is this a scam dressed up as a deal?"
  Resolved by: Headline naming "official Carfax reports" explicitly +
    immediately-visible sample report artifact (not a button — the report's
    structure is rendered next to the headline) + trust microbar above the
    fold (refund / secure payment / business identity).

SECTION LEVEL:
  Individual scanning for: "How much does it cost, how fast do I get it, what
    happens if it fails, and where do I enter my VIN?"
  Resolved by: VIN form in hero with price-on-button ($9.99 vs $44.99 direct,
    delta visible), delivery-time microcopy under the button ("PDF in your
    inbox in ~60 seconds"), refund guarantee chip adjacent.

  Dealer scanning for: "Is there a real volume program, what's the
    per-report price at my volume, and can I talk to someone before
    committing?"
  Resolved by: Dedicated dealer band with named volume tiers (50/250/1000+
    reports/mo), per-report price at each tier, dealer-specific proof
    (business identity, accounts active), and a contact-a-human action — not
    just a self-serve form.

  Skeptic scanning for: "Is this report actually the same thing carfax.com
    sells, or a knockoff?"
  Resolved by: Visible sample report preview in hero showing the actual
    Carfax sections (accident records, title, ownership, service, mileage)
    with "Open full sample" link to a complete report.

COMPONENT LEVEL:
  Click-vs-skip on the sample report: "Will viewing this slow me down, or
    will it tell me what I need in 5 seconds?"
  Resolved by: Sample is rendered inline as a structural artifact (visible
    sections + realistic mock data) — viewer can scan it without clicking.
    Full-sample link is tertiary, not the lead action.

  Click-vs-skip on the VIN form: "Is entering my VIN here safe, and what
    happens after?"
  Resolved by: Refund chip + "secure payment" chip + delivery-time microcopy
    sit within 50px of the input. Button shows price, not "Continue".

  Click-vs-skip on dealer CTA: "Is this a real B2B program or a marketing
    bucket?"
  Resolved by: Volume tiers shown BEFORE the CTA, with concrete savings math
    at each tier; "Talk to a human" microcopy under the CTA.
```

### 4B: Asset And Evidence Inference

```
PRODUCT/OUTPUT ASSETS:
  - Actual Carfax PDF report (the lead asset — its structure is the proof)
  - Report sections: accident history, title records, ownership history,
    service records, mileage timeline, recall data
  - VIN entry → PDF email delivery flow

PROOF ASSETS:
  - Sample report (structural proof of report identity)
  - Refund / satisfaction guarantee with explicit terms
  - Secure payment processor logos (Stripe / PayPal — real, not generic
    "secure" badges)
  - Business registration / company identity (legal entity, address)
  - Reports-served counter if accurate (e.g., "over 2.4M reports delivered")
  - BBB or similar third-party verification IF genuine
  - Reseller / partner status if legally supportable
  - Customer testimonials with full names (avoid initials-only)

CONVERSION ASSETS:
  - Direct price comparison vs carfax.com ($9.99 vs $44.99)
  - Dealer volume tiers with per-report price math
  - Delivery time commitment (~60 seconds)
  - "View sample" as low-commitment proof

NAVIGATION/SELF-SELECTION ASSETS:
  - Headline subline that names both audiences ("for buyers and dealers")
  - Dual CTA in hero (Buy Now + For Dealers)
  - Distinct dealer band mid-page

ACTION VS SIGNAL CLASSIFICATION:
  Actions:  VIN input, Buy Now button, "Open full sample" link, Dealer
            contact CTA, dealer email/phone capture
  Signals:  Sample report artifact, trust microbar, payment/BBB logos,
            refund-guarantee chip, business identity in footer, volume tier
            table, reports-served counter, testimonials, FAQ, delivery-time
            microcopy, price-comparison block
```

### 4C: Strategy Defense

```
ASSIGNED STRATEGY: sample-report-proof-led-path

WHY THIS STRATEGY FITS THIS INTAKE:
  The brief identifies "scam perception" as the dominant blocker for both
  segments. The diagnosis weights trust at 0.95 — the highest of any
  dimension — and the sample report is named as a tertiary CTA that "works
  for both segments." The structural insight this strategy commits to is
  stronger: a sample report is the only proof artifact that simultaneously
  resolves the THREE distinct skepticisms on this page —
    (1) "Is the report official?" (a knockoff can't fake the real
        Carfax structure),
    (2) "Will I actually receive what I'm paying for?" (the artifact IS
        what they receive), and
    (3) "Is this site a scam?" (a scam site couldn't render a structurally
        accurate report).
  No other single asset answers all three. By making the sample VISIBLE in
  the first viewport rather than gated behind a CTA, we give cold social
  visitors — the most skeptical cohort — the proof they need before they
  decide whether to engage at all. The risk surfaced by the strategy seed
  ("sample viewing distracts motivated buyers from purchase") is real, and
  is mitigated below by keeping the VIN form co-located and primary.

LOCAL OPTIMUM THIS STRATEGY RISKS:
  The shallow version of "proof-led" is to add a "View Sample Report" button
  in the hero next to the VIN form. That treats the sample as a CTA, not as
  proof. A skeptic doesn't click it (high friction), and a motivated buyer
  doesn't click it (irrelevant to their task) — so the asset converts neither
  cohort. The proof-led claim becomes cosmetic.

HOW THIS DESIGN AVOIDS THAT LOCAL OPTIMUM:
  The sample is rendered AS A STRUCTURAL ARTIFACT in the hero — a visible
  card with the actual report sections (Accident Records / Title /
  Ownership / Service / Mileage) populated with realistic mock data, taking
  ~50% of the desktop hero width. The skeptic gets the proof passively
  (zero clicks). The motivated buyer's eye still lands on the VIN form
  first (it's positioned at the visual entry point — top-left in
  Z-pattern). "Open full sample" is a tertiary link inside the artifact,
  not a competing primary CTA.

REFERENCE CALIBRATION:
  No reference library injected for this run. Working from general taste
  calibration: the design borrows the structural move of "show the product
  output beside the action" from strong fintech and developer-tool landing
  pages (where the API/dashboard preview anchors trust the way the report
  preview does here), while deliberately diverging from "discount/coupon
  aggregator" tropes — no urgency timers, no flashing badges, no oversized
  percentage-off treatments.

STRATEGIC DIAGNOSIS MAPPING:
  - Strategic axis mapped: trust_burden=high → Sample report rendered as
    visible artifact in first viewport (not gated behind a CTA) AND trust
    microbar visible above headline.
  - Strategic axis mapped: market_type=hybrid → Hero has dual CTAs (VIN-buy
    + For Dealers); a dedicated full-width dealer band sits mid-page; both
    paths receive distinct trust framing.
  - Strategic axis mapped: functional_immediacy=high → VIN form is the
    visual anchor of the hero left column; price is on the button; no
    explanatory content separates landing from action.
  - Strategic axis mapped: pricing_or_value_sensitivity=high → Price
    comparison ($9.99 vs $44.99 direct) appears in hero subline AND as a
    structural block mid-page with the math shown explicitly.
  - Strategic axis mapped: decision_risk=high → Refund guarantee + secure
    payment + delivery-time chips sit within the action zone, not in a
    footer or FAQ.
  - Strategic axis mapped: audience_sophistication=mixed → Sample artifact
    serves novices (proof of legitimacy) and experts (proof of report
    parity); dealer section uses expert language without re-explaining
    Carfax basics.
  - Strategic axis mapped: visual_posture=polished_utility → Grayscale,
    structured, businesslike rhythm; no coupon/promo aesthetic; trust
    microbar uses understated chips.
  - Audience/buyer implication: Individual buyer needs <60s decision →
    VIN form + price + delivery time + refund chip all in first viewport.
  - Audience/buyer implication: Dealer needs methodical evaluation →
    Volume tier table with per-report math, business identity, "Talk to
    a human" CTA, named account manager pattern.
  - Design directive implication: cta_strategy ("trust-adjacent, not
    isolated hype buttons") → Every CTA on the page sits within ~80px of a
    trust signal (refund chip, payment logos, business identity, or proof
    callout).
  - Design directive implication: proof_strategy (sample-led + reinforced
    with refund/security/identity) → Sample is the lead proof; reinforcing
    proof appears in a trust band, in pricing transparency, and in the
    dealer band's "verified business" cue.

FIRST VIEWPORT OBLIGATION:
  Diagnosis quote: "Within the first viewport, the page must make visitors
  understand that they can buy discounted official Carfax reports safely,
  verify legitimacy enough to continue, and choose between individual
  purchase and dealer access."

  Desktop first-fold components (visible at 1440x900 before scroll):
    1. Top nav (logo, "Sample", "For Dealers", "Sign in")
    2. Trust microbar (refund · secure payment · 2.4M+ reports delivered)
    3. Hero headline ("Official Carfax reports for $9.99 — see exactly
       what you're buying.")
    4. Hero subhead naming both audiences
    5. VIN input + "Get report — $9.99" button (#primary-action)
    6. Price comparison microcopy ($9.99 vs $44.99 — Save $35)
    7. Refund / delivery / secure-payment chips inside action zone
    8. Sample report preview card (#sample-report-preview) with visible
       section labels and realistic data
    9. "For Dealers — volume pricing" tertiary CTA in nav (#dealer-action
       full version below the fold but link is in nav)

  Mobile first-fold components (visible at 390x844 before scroll):
    1. Compact sticky header with logo + "For Dealers" link
    2. Trust microbar (single line, condensed)
    3. Hero headline (sized down)
    4. VIN input + price-on-button
    5. Refund + secure-payment chips
    6. Top edge of sample report preview card visible (peeks below fold to
       signal "scroll for proof")
  Note: full sample card is tall; mobile-first viewport shows the card's
  header band ("SAMPLE Carfax Report — VIN: 1FTFW1ET5DKD12345") to anchor
  legitimacy; full content unfolds on scroll.

HARD FLOOR COVERAGE:
  - hf_first_viewport_legitimacy_and_self_selection → satisfied by hero
    components 1-9 above (desktop) and 1-6 (mobile). Sample preview is
    visible (proof option), VIN form is visible (individual path), dealer
    nav link + tertiary "For Dealers →" subline link is visible (dealer
    path), price comparison microcopy is visible (savings cue), trust
    microbar is visible (legitimacy proof), headline names "official
    Carfax reports" (offer clarity).
  - hf_early_legitimacy_proof → trust microbar above headline +
    refund/payment chips inside hero action zone, all rendered before any
    commitment-oriented CTA fires (#legitimacy-proof, #refund-guarantee).
  - hf_segment_self_selection → dual CTA pattern: VIN form (primary,
    individual) + "For Dealers — volume pricing" (secondary, dealer) both
    visible in hero context; full dealer band (#dealer-section) mid-page.
  - hf_individual_purchase_immediacy → VIN form is the first interactive
    element after the headline; no explanatory content gates it.
  - hf_dealer_path_prominence → #dealer-section is a full-width band
    with its own headline, volume tier table, dealer-specific trust
    signals, and a #dealer-action CTA. NOT relegated to footer.
  - hf_official_report_clarity → headline contains "official Carfax
    reports" verbatim; sample artifact shows actual Carfax report
    structure; "What's in your report" section names Carfax-specific
    sections (accident records, title brand, owner count) rather than
    generic "vehicle history."
  - hf_transparent_terms_and_safety → #pricing-comparison shows $9.99
    vs $44.99 with savings math; #refund-guarantee shows specific terms
    ("Full refund if PDF doesn't arrive in 24h or report is incomplete");
    secure-payment logos displayed (Stripe, PayPal — real providers,
    not generic).
  - hf_proof_for_skeptics → #sample-report-preview is the lead component
    (visible artifact, not a button); also "Open full sample →" tertiary
    link for visitors who want the complete file.
  - hf_mobile_conversion_path → mobile first-fold preserves trust microbar,
    headline, VIN form, price-on-button, and refund chip. Sample preview
    peeks below fold so structural proof is reachable in <1 swipe.

ANTI-PATTERN AVOIDANCE:
  - ap_coupon_scam_aesthetic AVOIDED → no urgency timers, no flashing
    discount badges, no oversized percentage-off treatment. Savings shown
    as quiet comparison ($9.99 vs $44.99 direct), not as hype.
  - ap_buried_trust AVOIDED → trust microbar sits ABOVE the headline;
    refund/payment chips sit WITHIN the action zone; sample artifact is
    the single largest component beside the VIN form.
  - ap_individual_only_bias AVOIDED → dealer band is a full-width section
    with the same visual weight as the hero (not a footer link). Dealer
    nav link sits in the top nav. Volume tier table makes the dealer offer
    concrete, not aspirational.
  - ap_dealer_overeducation AVOIDED → dealer section uses expert language
    ("250 reports/mo at $4.50 ea", "API access available", "Net-30 terms")
    rather than re-explaining what Carfax is.
  - ap_ambiguous_product_naming AVOIDED → "official Carfax reports" appears
    verbatim in headline; sample artifact shows actual Carfax section
    headers; comparison block names "carfax.com direct" specifically.
  - ap_unsubstantiated_authority_claims AVOIDED → trust microbar uses only
    verifiable claims (refund guarantee terms, named payment processors,
    reports-delivered count if accurate). No generic "trusted" badges.
    BBB / reseller status placeholder noted for fact-check before launch.
  - ap_long_brand_story_before_task AVOIDED → no company story above the
    fold or in the first three sections. "About us" content is in footer.
  - ap_hidden_or_vague_refund_terms AVOIDED → refund chip in hero links
    to a one-line specific guarantee ("Full refund if PDF doesn't arrive
    in 24h or report data is incomplete"), expanded in FAQ.
  - ap_generic_saas_visual_formula AVOIDED → page is anchored by a
    domain-specific artifact (a real-looking Carfax report). No abstract
    benefit cards in the lead position; no decorative hero illustration.
```

### 4D: Component Justification

| Component | User Lens | Business Lens | Verdict |
|-----------|-----------|---------------|---------|
| Top nav (logo, Sample, For Dealers, Sign in) | Lets user route to the right path; "Sample" link signals proof is available | Persistent dealer surfacing; sign-in supports repeat individuals (rare but exists) | Include — minimal, no dropdowns |
| Trust microbar (refund / secure payment / volume served) | Resolves "is this real" before reading headline | Reduces bounce on cold traffic | Include |
| Hero headline ("Official Carfax reports for $9.99 — see exactly what you're buying") | Names product, price, and proof promise in one line | Anchors offer; "see exactly" hooks the proof artifact below | Include |
| Hero subhead | Names both audiences ("Used-car buyers and dealers") | Self-selection signal pre-CTA | Include |
| VIN input + price-on-button (#primary-action) | Direct path from intent to action; no extra clicks | Primary revenue event | Include |
| Action-zone chips (refund / secure / delivery) | Reduces commitment risk inline | Increases form-completion rate | Include |
| Tertiary "For Dealers — volume pricing →" link in hero | Dealer self-routing without disrupting individual flow | Dealer segment recognition | Include |
| Sample report preview (#sample-report-preview) — STRUCTURAL ARTIFACT, not a button | Single largest proof for all three skepticisms; passive (zero-click) | Doubles as "this is what you're paying for" — converts viewers without distracting motivated buyers | Include — primary proof component |
| "Open full sample →" tertiary link inside artifact | Path for hardest skeptics | Recovers traffic that otherwise bounces | Include |
| What's in your report (4-up section grid) | Resolves "what do I get" without reading the full sample | Reinforces report parity with carfax.com direct | Include |
| Trust band (payment logos / BBB / business id / refund guarantee terms) | Specific verifiable proof, not generic badges | Reduces scam-rate perception in checkout abandonment | Include |
| How it works (3 steps) | Sets delivery expectation | Reduces post-purchase support tickets | Include |
| Pricing comparison block | Resolves "is the discount real" with explicit math | Justifies the discount as rational, not suspicious | Include |
| Dealer section (#dealer-section) — full band | Volume tiers + business identity + human contact path | Higher-LTV revenue channel; signals B2B seriousness | Include |
| Dealer volume tier table | Concrete per-report math at 50/250/1000+ vols | Qualifies dealer leads pre-contact | Include |
| Dealer "Talk to a human" CTA (#dealer-action) | Methodical buyers want a human, not a form | Higher conversion than self-serve for dealer cohort | Include |
| Testimonials | Social proof, audience-segmented (one buyer, one dealer) | Reinforces both paths | Include — limit 2-3, full names |
| FAQ | Resolves residual objections (refund mechanics, delivery, legitimacy, dealer terms) | Reduces support load | Include |
| Footer (full business identity, legal, support contact) | Final legitimacy reassurance for skeptics | Legal compliance | Include |
| ~~Hero video / animated explainer~~ | Slows page; doesn't resolve any decision | Cost without conversion lift | Exclude |
| ~~Urgency countdown~~ | Increases scam perception | Negative-EV per anti-pattern | Exclude |
| ~~Generic "trusted by 1000s" badge cluster~~ | Generic = ignorable or actively suspicious | ap_unsubstantiated_authority_claims | Exclude |
| ~~Newsletter signup~~ | Off-task | Pulls focus from primary actions | Exclude |
| ~~Blog teaser / content marketing block~~ | Off-task for pre-purchase visitors | Pulls focus | Exclude |

### 4E: Tension Map

```
TENSION 1: Sample report visibility vs. individual purchase immediacy
  Business pull: Skeptics need proof; sample is the strongest proof asset.
  User pull (individual buyer): Has a VIN, has a car they're about to look
    at, wants to pay in 30 seconds. Doesn't want to read a sample.
  Resolution: Sample is rendered as a STRUCTURAL ARTIFACT (passive proof)
    beside the VIN form, not as a CTA that competes with it. The motivated
    buyer's eye lands on the VIN form (top-left, larger headline anchor);
    the skeptic's eye scans right to the sample. Both audiences served in
    the same first fold without either having to act on the other's path.

TENSION 2: Dealer prominence vs. individual focus
  Business pull: Dealer LTV >> individual LTV; dealer path must feel
    serious, not afterthought.
  User pull (individual buyer): A page that opens with B2B language reads
    as "not for me" and bounces.
  Resolution: Hero is individual-led (VIN form, $9.99 price). Dealer
    presence in hero is limited to (a) nav link, (b) tertiary subline
    link, and (c) "buyers and dealers" mention in subhead. Full dealer
    treatment is a dedicated mid-page band — large enough to feel like a
    real B2B program, not a footer link.

TENSION 3: Trust proof density vs. cognitive load
  Business pull: Cold social traffic needs heavy proof; under-proving
    means bounce.
  User pull: Too many trust badges = "what are they hiding?" (anti-pattern
    ap_unsubstantiated_authority_claims).
  Resolution: ONE proof per channel — refund (terms, not badge), secure
    payment (named processor logos, not generic), business identity (legal
    entity, not a vague "trusted"), reports-delivered count (specific
    number, not a range). Sample artifact is the master proof; everything
    else is corroborating.

TENSION 4: Discount visibility vs. scam perception
  Business pull: Discount is the hook — has to be visible.
  User pull: Loud discount = scam.
  Resolution: Price is shown as a quiet comparison ($9.99 vs $44.99 direct)
    in microcopy form, not a giant "75% OFF" badge. Savings math is shown
    in a calm pricing-comparison block. No urgency, no countdown, no
    "limited time."

TENSION 5: Sample artifact realism vs. legal/brand exposure
  Business pull: Sample needs to look real to function as proof.
  User pull: A sample that looks identical to carfax.com risks being
    confused with the real Carfax brand (legal exposure: ap_ambiguous_
    product_naming and downstream brand-imitation concerns).
  Resolution: Sample uses Carfax-style report structure (real section
    headers, real data fields) but is clearly labeled "SAMPLE — VIN:
    1FTFW1ET5DKD12345" in the artifact's header band. Branding deferred
    to downstream visual-architect agent with a constraint note: structural
    similarity OK, brand-mark replication NOT OK. Architect specifies
    the constraint; visual designer enforces it.
```

---

## Section 5: Visual Hierarchy Map

```
PRIMARY (dominant visual weight):
  1. Hero headline ("Official Carfax reports for $9.99 — see exactly what
     you're buying.") — largest type on page, anchors the first read.
  2. Sample report preview (#sample-report-preview) — single largest
     non-text element; occupies ~50% of desktop hero. THIS IS THE
     STRATEGIC ANCHOR. Visual weight via size + structural detail
     (visible section labels, mock data).
  3. VIN input + Buy button (#primary-action) — primary interactive
     element; visual weight via button fill + size.

SECONDARY (supporting):
  4. Hero subhead — second-tier type; names both audiences.
  5. Price comparison microcopy ($9.99 vs $44.99 — Save $35) — visible
     under VIN form.
  6. Trust microbar (above headline) — quiet but always visible.
  7. Dealer section (#dealer-section) headline + volume tier table —
     full-width band, second-tier visual prominence below the fold.
  8. Pricing comparison block (#pricing-comparison) — structured table.
  9. "What's in your report" 4-up grid.
  10. How-it-works 3-step strip.

TERTIARY (present but recessive):
  11. Top nav links.
  12. Action-zone chips (refund / secure / delivery time) — present but
      small; classified tertiary because they support primary CTA without
      competing for attention.
  13. "Open full sample →" link inside sample artifact.
  14. "For Dealers — volume pricing →" subline link in hero.
  15. Testimonials.
  16. FAQ.
  17. Footer.
```

---

## Section 6: Component Inventory

| Component | Class | Purpose | Content Direction |
|-----------|-------|---------|-------------------|
| Top nav | T | Routing + dealer surfacing | Logo · Sample · For Dealers · Sign in (compact) |
| Trust microbar | T | Pre-headline legitimacy cue | "Full refund guarantee · Secure payment via Stripe · 2.4M+ reports delivered" — single line, muted |
| Hero headline | P | Anchor offer + proof promise | "Official Carfax reports for $9.99 — see exactly what you're buying." (12-14 words) |
| Hero subhead | S | Audience self-selection cue | "For used-car buyers and dealers. Discounted access to the same official Carfax reports sold at carfax.com." (~25 words) |
| VIN input | P | Primary action input | Single text input, placeholder: "Enter VIN (17 characters)", inline validation |
| Primary CTA button | P | Trigger checkout | "Get report — $9.99" (price on button) |
| Action-zone chips | T | Inline trust at point of action | 3 chips: "Refund guaranteed" · "Stripe-secured payment" · "PDF in ~60 seconds" |
| For-Dealers subline link | T | Dealer self-routing without disrupting individual flow | "Buying for a dealership? See volume pricing →" |
| Sample report preview | P | Structural proof of report identity (LEAD PROOF — anchors the entire strategy) | Card with header band ("SAMPLE — Carfax-style Report — VIN: 1FTFW1ET5DKD12345"), 5 sections rendered with realistic mock data: Accident Records (2 entries), Title Brand (clean), Ownership History (3 owners), Service Records (12 entries), Mileage Timeline (sparkline). Bottom: "Open full sample report →" tertiary link. |
| What-you-get section | S | Reinforces report parity with carfax.com direct | 4-up grid: Accident Records · Title History · Ownership · Service Records. Each: icon + label + 1-line description. |
| Trust band | S | Specific verifiable proof | Row 1: payment logos (Stripe, PayPal — real, not generic). Row 2: refund-guarantee terms (one sentence). Row 3: business identity ("Operated by [Legal Entity], registered in [State]"). |
| How-it-works strip | S | Set delivery expectation | 3 steps horizontal: 1. Enter VIN · 2. Pay $9.99 · 3. PDF in your inbox. Each step: numeric badge + 1-line copy. |
| Pricing comparison block | S | Resolve "is the discount real" with math | 2-column comparison: "carfax.com direct: $44.99 per report" vs "Our price: $9.99 per report — save $35 (78%)". Below: "Why are we cheaper? [one-paragraph explanation]." |
| Dealer section | P | Full-band B2B treatment | Headline: "Built for dealers." Subhead: "Cut your monthly Carfax cost by up to 80% at volume." Volume tier table (3 tiers). Dealer-specific trust ("Net-30 terms · API available · Dedicated account contact"). |
| Dealer volume tier table | S | Concrete per-report math | 3 columns: 50 reports/mo @ $7.50 ea · 250 reports/mo @ $4.50 ea · 1000+ reports/mo @ custom. Each tier: monthly cost · vs direct savings. |
| Dealer CTA | P | Human contact, not self-serve | "Talk to a dealer specialist →" button + microcopy: "We'll get back within 1 business day." |
| Testimonials | T | Audience-segmented social proof | 2 cards: one individual buyer (full name, city, vehicle context), one dealer (full name, dealership name, monthly volume). 2-3 sentences each. |
| FAQ | T | Residual objection handling | 7 collapsibles: (1) Are these really official Carfax reports? (2) Why are you cheaper than carfax.com? (3) How fast is delivery? (4) What if my report is missing data? (5) What's your refund policy? (6) How does dealer pricing work? (7) Is my payment information safe? Each: 2-3 sentence answer. |
| Footer | T | Full business identity + legal | Legal entity name, registered address, support email, support phone, sitemap (Sample · For Dealers · Refund Policy · Privacy · Terms · Contact). |

---

## Section 7: ASCII Wireframe (Desktop)

```
+----------------------------------------------------------------------+
| LOGO              Sample   For Dealers          [Sign in]            |  <-- top nav (T)
+----------------------------------------------------------------------+
| Refund guarantee · Stripe-secured payment · 2.4M+ reports delivered  |  <-- trust microbar (T)
+----------------------------------------------------------------------+
|                                                                      |
|  Official Carfax reports for $9.99 —     |  +------------------+    |
|  see exactly what you're buying.         |  | SAMPLE Carfax    |    |
|                                          |  | VIN: 1FTFW1ET5...|    |
|  For used-car buyers and dealers.        |  +------------------+    |
|  Discounted access to the same           |  | Accident Records |    |
|  official Carfax reports sold at         |  |   2 incidents    |    |
|  carfax.com.                             |  +------------------+    |
|                                          |  | Title Brand      |    |
|  +-----------------------------+         |  |   Clean          |    |
|  | Enter VIN (17 chars)        |         |  +------------------+    |
|  +-----------------------------+         |  | Ownership Hist.  |    |
|  [   Get report — $9.99   ]              |  |   3 owners       |    |
|                                          |  +------------------+    |
|  ✓ Refund guaranteed                     |  | Service Records  |    |
|  ✓ Stripe-secured payment                |  |   12 entries     |    |
|  ✓ PDF in ~60 seconds                    |  +------------------+    |
|                                          |  | Mileage Timeline |    |
|  $9.99 vs $44.99 direct — save $35       |  |   ~~~~~~~~~~~~   |    |
|                                          |  +------------------+    |
|  Buying for a dealership?                |    Open full sample →    |
|  See volume pricing →                    |                          |
|                                                                      |
+----------------------------------------------------------------------+
|             What's in every official Carfax report                   |
|  +----------+  +----------+  +----------+  +----------+              |
|  | Accident |  | Title    |  | Owner-   |  | Service  |              |
|  | Records  |  | History  |  | ship     |  | Records  |              |
|  +----------+  +----------+  +----------+  +----------+              |
+----------------------------------------------------------------------+
|                            Trust band                                |
|     [Stripe]  [PayPal]  [BBB if real]   Operated by ACME Inc.        |
|     Full refund if PDF doesn't arrive in 24h or report is incomplete |
+----------------------------------------------------------------------+
|                            How it works                              |
|   (1) Enter VIN  →  (2) Pay $9.99  →  (3) PDF in your inbox          |
+----------------------------------------------------------------------+
|                       Why we're cheaper                              |
|  +----------------------+   +----------------------+                 |
|  | carfax.com direct    |   | Our price            |                 |
|  | $44.99 per report    |   | $9.99 per report     |                 |
|  |                      |   | Save $35 (78%)       |                 |
|  +----------------------+   +----------------------+                 |
|  Brief paragraph: bulk reseller arrangement, etc.                    |
+----------------------------------------------------------------------+
|                       Built for dealers.                             |
|  Cut your monthly Carfax cost by up to 80% at volume.                |
|                                                                      |
|  +----------+  +-----------+  +------------+                         |
|  | 50 / mo  |  | 250 / mo  |  | 1000+ / mo |                         |
|  | $7.50 ea |  | $4.50 ea  |  | custom     |                         |
|  | save 83% |  | save 90%  |  | ——         |                         |
|  +----------+  +-----------+  +------------+                         |
|                                                                      |
|  Net-30 terms · API access · Dedicated account contact               |
|         [   Talk to a dealer specialist →   ]                        |
|         We'll get back within 1 business day.                        |
+----------------------------------------------------------------------+
|                          Testimonials                                |
|  +----------------------+   +----------------------+                 |
|  | Individual buyer     |   | Dealer               |                 |
|  | testimonial copy     |   | testimonial copy     |                 |
|  +----------------------+   +----------------------+                 |
+----------------------------------------------------------------------+
|                               FAQ                                    |
|   ▸ Are these really official Carfax reports?                        |
|   ▸ Why are you cheaper than carfax.com?                             |
|   ▸ How fast is delivery?                                            |
|   ▸ ... (4 more)                                                     |
+----------------------------------------------------------------------+
|  Footer: business id, address, support, legal, sitemap               |
+----------------------------------------------------------------------+
```

---

## Section 8: Responsive Behavior

```
DESKTOP (default, ≥1025px):
  - Hero: 2-column split, ~50/50. Left: text + VIN form. Right: sample
    preview card.
  - "What's in" grid: 4-up.
  - Pricing comparison: 2-column.
  - Dealer tier table: 3-column.
  - Testimonials: 2-up.
  - Section padding: generous (96px top/bottom on hero, 64px on others).

TABLET (641-1024px):
  - Hero: STACK to single column. Text + VIN form on top, sample preview
    below. Sample preview retains full structural detail (this is the
    proof anchor — must not collapse to a thumbnail).
  - "What's in" grid: 4-up → 2-up.
  - Pricing comparison: 2-column → stacked.
  - Dealer tier table: 3-column → 2-up + 1 below, OR horizontal scroll
    if all three fit at narrow tablet widths.
  - Section padding: moderate (48px).

MOBILE (≤640px):
  - Hero stack order:
      1. Trust microbar (single line, condensed)
      2. Headline
      3. Subhead (truncated to ~15 words)
      4. VIN input
      5. "Get report — $9.99" button (full-width)
      6. Action-zone chips (vertical stack, small)
      7. Price comparison microcopy
      8. "For Dealers →" subline link
      9. Sample preview card (top of card peeks before fold; full card
         visible on scroll — DO NOT hide; this is the proof anchor)
  - "What's in" grid: 1-column stack.
  - Pricing comparison: stacked.
  - Dealer tier table: stacked (each tier as a card).
  - Dealer CTA: full-width.
  - Testimonials: 1-column stack.
  - FAQ: 1-column accordion.
  - Top nav: hamburger collapse; persistent "For Dealers" link in nav
    bar (do not collapse this — dealer path prominence).
  - Section padding: compact (24px).

DO-NOT-HIDE COMPONENTS (mobile):
  - Sample report preview (proof anchor — must remain accessible)
  - Trust microbar (legitimacy)
  - Refund-guarantee chip (commitment risk)
  - Dealer section (must remain a full mid-page band, not collapsed
    behind a link)
  - Pricing comparison (transparent terms hard floor)
```

---

## Section 9: Interaction Notes

```
- VIN input: 17-char limit, alphanumeric only (no I, O, Q per VIN spec).
  Inline validation: green check on valid format, red border on invalid.
  Errors do not block scrolling or comprehension.
- "Get report" button: disabled state until VIN is 17 valid chars.
  On click: route to checkout (out of scope for this page).
- "Open full sample →" link inside sample card: opens /sample as new
  page or modal. Modal preferred (keeps user on landing).
- Sample preview card: NOT clickable as a whole — only the "Open full
  sample" link is. (Prevents accidental navigation that interrupts a
  motivated buyer mid-VIN-entry.)
- Dealer CTA: opens lead form (modal or routes to /dealers contact page).
- FAQ: accordion-style, click to expand. Multiple can be open at once.
- Top nav: "Sample" link scrolls to sample preview (anchor scroll).
  "For Dealers" scrolls to #dealer-section.
- All scroll-anchor behaviors should use smooth-scroll with respect for
  prefers-reduced-motion.
- No animations beyond hover state changes and accordion expand.
- No urgency timers, no auto-popup modals, no exit-intent popups.
```

---

## Section 10: Content Direction

```
OVERALL TONE: Direct, credible, practical, transparent. Confident without
hype. The voice of a legitimate reseller who is unbothered by being
questioned because they have nothing to hide. Specific numbers everywhere.
No marketing fluff. No "transform your" language. No exclamation marks.

SECTION-BY-SECTION:

- Trust microbar:
  Three concrete claims separated by interpuncts. No badges, no logos here
  — just text. Each claim must be specific enough that a skeptic can
  verify it. ("Refund guarantee" is OK because it links to terms;
  "Trusted" alone is not OK.)
  Word count target: 12-15 words total.

- Hero headline:
  Must contain the words "official Carfax" verbatim. Must contain a
  price. Must hint at the proof asset (the "see exactly" framing).
  Word count: 12-14 words.
  Bad versions to avoid: "Get vehicle reports cheaper" (vague product),
  "75% off Carfax" (coupon aesthetic), "The smart way to check used cars"
  (off-topic).

- Hero subhead:
  Names both audiences. Names "carfax.com" specifically. Asserts product
  parity ("the same official Carfax reports").
  Word count: 20-30 words.

- VIN form button:
  Price MUST be on the button: "Get report — $9.99". Not "Continue,"
  not "Get started." The button's job is to make the cost transparent
  at the moment of commitment.

- Action-zone chips:
  3 max. Each chip = one verb-phrase or noun-phrase, 3-5 words.
  Order matters: refund (recourse) → payment security (transaction
  safety) → delivery time (immediate gratification).

- Sample report preview (LEAD PROOF):
  Header band: "SAMPLE — Report for VIN 1FTFW1ET5DKD12345" (clearly
  labeled as a sample; uses a real-world-style VIN).
  Each section uses Carfax-accurate field names: "Accident Records,"
  "Title Brand," "Ownership History," "Service Records," "Odometer
  Readings." Mock data must look real but be obviously a sample (e.g.,
  dates from 2018-2023, plausible service records, plausible mileage
  trajectory). Avoid using a real VIN that resolves to a real vehicle
  in carfax.com — use a known-fictional VIN pattern.
  IMPORTANT for downstream visual designer: structural similarity to
  carfax.com report layout is OK; brand-mark replication (Carfax logo,
  exact carfax.com colors, exact typography) is NOT OK due to legal
  exposure (ap_unsubstantiated_authority_claims and brand
  imitation concerns).

- What's-in-your-report section:
  Section headline: "What's in every official Carfax report" — uses
  "official Carfax" verbatim again to reinforce product clarity.
  Each card: icon + 2-word label + 12-15-word description.

- Trust band:
  Use only verifiable claims. Refund terms must be specific ("Full
  refund if PDF doesn't arrive within 24 hours, or if report data is
  incomplete"). Business identity must include legal entity name and
  registered state. Payment processors must be named (Stripe, PayPal),
  not generic "secure payment."

- How it works:
  3 steps, each ≤8 words. No marketing copy. Pure functional.

- Pricing comparison:
  Show the math. "$44.99 - $9.99 = $35 saved per report (78%)." The
  math is the proof — don't hide it.
  "Why we're cheaper" paragraph: 2-3 sentences. Honest explanation of
  the bulk-reseller model. Avoid claims that imply official partnership
  unless legally supportable. If true, name partner status; if not, say
  "bulk-purchasing reseller" or similar accurate language.

- Dealer section:
  Headline: "Built for dealers." (3 words. Confident.)
  Subhead: ≤20 words, names the savings outcome ("up to 80% off").
  Tier table: pure numbers. No fluff text inside cells.
  Trust line: 3 dealer-specific signals separated by interpuncts.
  CTA: "Talk to a dealer specialist →" (human contact framing, not
  "Get started" or "Sign up"). Microcopy: response-time commitment
  ("within 1 business day").

- Testimonials:
  2 cards. Each: full name, location/dealership name, vehicle/volume
  context, 2-3 sentences. AVOID initials-only (reads as fake) and
  AVOID generic "great service" copy. Each testimonial must reference
  a specific use case.

- FAQ:
  7 questions in this order: legitimacy → pricing → delivery → data
  completeness → refund → dealer pricing → payment safety. Each
  answer 2-3 sentences. Must directly answer; no marketing pivot.

- Footer:
  Legal entity name, registered address (real, not P.O. box), support
  email, support phone, sitemap. Not a place for marketing copy.
```

---

## Section 11: Visual Acceptance Spec

### 11A: Viewports & Scenarios

```
VIEWPORTS:
- Desktop: 1440x900
- Tablet: 768x1024
- Mobile: 390x844

SCENARIOS:
- Cold social visitor lands on hero (highest skepticism)
- Warm referral visitor lands on hero (partial trust pre-seeded)
- Dealer lands on hero, scrolls to dealer band
- Skeptic clicks "Open full sample" → returns to landing
- Mobile individual buyer enters VIN and submits
```

### 11B: First Viewport Composition

```
FIRST VIEWPORT (desktop, 1440x900):
- Top nav with logo, "Sample" link, "For Dealers" link, sign-in MUST
  be visible.
- Trust microbar MUST be visible above the headline.
- Hero headline MUST be visible and contain "official Carfax" verbatim
  and a price.
- VIN input MUST be visible.
- Primary CTA button (#primary-action) with price on it MUST be visible.
- Action-zone chips (refund / secure payment / delivery time) MUST be
  visible within ~80px of the button.
- Sample report preview (#sample-report-preview) MUST be visible with
  AT LEAST the header band and 3 of its 5 internal sections rendered
  in-view.
- Price comparison microcopy ($9.99 vs $44.99) MUST be visible.
- "For Dealers — volume pricing →" subline link MUST be visible.
- Page MUST NOT render as text-only or as an empty hero with no proof
  artifact.
- Page MUST NOT render with the VIN form hidden behind a "Get Started"
  CTA that requires a click to reveal the input.

FIRST VIEWPORT (mobile, 390x844):
- Compact header with logo + "For Dealers" link MUST be visible.
- Trust microbar MUST be visible (single line, condensed).
- Headline MUST be visible.
- VIN input + price-on-button MUST both be visible.
- AT LEAST one action-zone chip (refund) MUST be visible.
- Top edge of sample report preview MUST peek below the fold (header
  band visible) so the proof artifact is reachable in <1 swipe.
- Page MUST NOT require >1 scroll to find proof or action.
```

### 11C: Layout Constraints

```
LAYOUT:
- Desktop hero: 2-column split, ~50/50 ratio. Left column owns the
  headline + VIN form (text-led action zone). Right column owns the
  sample report preview (proof artifact). Neither column dominates
  visually — they are co-equal (this is core to the strategy).
- Tablet hero: stack vertically. Text + VIN form on top, sample
  preview below. Sample retains full structural detail.
- Mobile hero: same stack as tablet but tighter spacing.
- Sample report preview owns approximately as much visual real estate
  as the entire text+form column combined on desktop. This is the
  strategic anchor.
- Dealer section is a full-width band with its own background tint
  (light gray or similar — actual color delegated to visual designer).
  Width must equal hero width — NOT a small card or sidebar.
- Trust microbar spans full width above the hero, single line.
- Footer is full-width.
```

### 11D: Density & Rhythm

```
DENSITY:
- Mode: moderate hybrid (marketing register dominates; transactional
  density inside the VIN action zone and the dealer tier table).
- Hero section: generous separation (96px top/bottom desktop; 48px
  tablet; 24px mobile).
- Mid-page sections (what's-in, trust band, how-it-works, pricing
  comparison, dealer section, testimonials, FAQ): moderate separation
  (64px desktop; 48px tablet; 24px mobile).
- Within sample report preview: compact separation between report
  rows (12px) — this MIMICS a real document and reinforces the proof
  function.
- Within dealer tier table: moderate separation between tiers; compact
  within each tier card.
- Trust microbar and footer: dense (single-line, small type).
- Repeated items (FAQ accordions, testimonials, what's-in cards):
  comfortable spacing — never dense. Cognitive ease > efficiency
  in proof-reinforcing sections.
- Controls (VIN button, dealer CTA) MUST NOT visually compete with
  each other. They live in different sections separated by ≥200px
  vertical scroll on desktop.
```

### 11E: Required Stable Selectors

```
REQUIRED SELECTORS (must appear as `id` attributes on the corresponding
elements in the HTML wireframe):

- #page-root            (root container)
- #primary-section      (hero section)
- #primary-action       (the "Get report — $9.99" button)
- #sample-report-preview (the sample report artifact)
- #legitimacy-proof     (trust microbar)
- #refund-guarantee     (refund chip / refund terms element)
- #pricing-comparison   (the $9.99 vs $44.99 comparison block)
- #how-it-works         (the 3-step delivery section)
- #dealer-section       (the full-width dealer band)
- #dealer-action        (the "Talk to a dealer specialist" button)
- #faq                  (the FAQ section)
- #footer               (the footer)
```

### 11F: Non-Negotiables

```
NON-NEGOTIABLES (implementers must not change):
- Sample report preview MUST be a structural artifact (visible report
  sections + realistic mock data), NOT a button or thumbnail. Replacing
  it with a "View Sample" CTA breaks the strategy.
- Trust microbar MUST sit above the headline. Moving it below breaks
  hf_early_legitimacy_proof.
- Action-zone chips MUST sit within ~80px of the primary CTA button.
- Price MUST appear on the CTA button itself ("Get report — $9.99"),
  not in adjacent copy alone.
- Dealer section MUST be a full-width band with its own headline and
  volume tier table. Collapsing it into a link or a footer entry
  violates hf_dealer_path_prominence.
- "Official Carfax" MUST appear verbatim in the hero headline and in
  the "What's in" section headline (hf_official_report_clarity).
- Refund terms MUST be specific ("within 24h, full refund"), not vague
  ("guaranteed satisfaction").
- Payment processors MUST be named (Stripe, PayPal), not represented
  as generic "secure payment" badges.
- Sample preview MUST NOT use Carfax brand marks (logo, exact carfax
  .com typography, exact carfax.com primary color). Structural
  similarity OK; brand replication NOT OK.
- No urgency timers, no countdown clocks, no exit-intent popups, no
  "limited time" badges anywhere on the page.
```

### 11G: Allowed Variation

```
ALLOWED VARIATION:
- Exact pixel spacing within the qualitative bands (generous /
  moderate / compact).
- Order of action-zone chips (refund / secure / delivery) — the three
  must be present and inline with the action; their internal order
  is flexible.
- Specific testimonial copy and faces, as long as full names and
  segment context are present.
- Specific FAQ wording (the 7 question topics are fixed; phrasing is
  flexible).
- Volume tier breakpoints (50/250/1000+) can be tuned to match actual
  business pricing.
- Visual treatment of trust microbar: text-only, or text + small icon.
- Sample report preview: number of internal sections shown (4-6 OK);
  exact mock VIN (any clearly fictional VIN OK).
- Footer link list ordering.
- Top nav can be sticky or non-sticky; sticky preferred for mobile.
```

### 11H: Not Allowed

```
NOT ALLOWED:
- Removing the sample report preview, replacing it with a "View Sample"
  button, or shrinking it to a thumbnail.
- Putting any CTA (primary or secondary) above the trust microbar.
- Hiding refund terms in the FAQ only (must also be visible at the
  point of action).
- Using only generic trust badges (e.g., a stock "100% Secure" shield
  with no named processor).
- Treating the dealer path as a footer link or a single hero CTA
  without a dedicated section.
- Adding urgency mechanics: countdown timers, "only X left," "offer
  expires," exit-intent popups.
- Replicating Carfax's exact brand marks (logo, color palette, exact
  typography) in the sample preview.
- Auto-playing video, animated hero illustrations, or carousels.
- Newsletter signup, blog teasers, or other off-task content blocks.
- Initials-only or unattributed testimonials.
- Vague language ("vehicle reports," "history reports") in place of
  "official Carfax reports" in any heading or CTA.
- Hiding the sample preview on mobile, or replacing it with a link.
- Burying the dealer section below the FAQ or footer.
```

---

## Section 12: HTML Wireframe Artifact

```
HTML WIREFRAME ARTIFACT:
  File: wireframe.sample-report-proof-led-path.html
  Components: 19 (one row per Section 6 entry)
  Selectors: 12 (per Section 11E)
  Status: written
```

The renderable HTML wireframe is at `wireframe.sample-report-proof-led-path.html` (sibling file). It encodes every component from Section 6 with `data-component` and `data-class` attributes, every required selector from Section 11E as `id` attributes, and three viewport behaviors via CSS media queries. The wireframe is gray-box only — no color, brand, or typography decisions. Visual treatment is delegated to the downstream visual-architect agent.
