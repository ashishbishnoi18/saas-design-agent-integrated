# UI_SPEC — trust-first-dual-path-conversion

## Section 1: Page Classification

```
TYPE: hybrid
DOMINANT MODE: marketing (selling, pre-purchase, two skeptical audiences) with
  embedded transactional surface (VIN-to-pay card on the hero). The page is a
  conversion landing page with a built-in entry point to checkout, not an app.
```

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
  Segment A — Individual buyer (one-time): used-car buyer evaluating a specific
    VIN. Knows carfax.com costs ~$40, doesn't know if discounted resellers are
    legitimate. Decides in <60 seconds; price-sensitive but bounces hard on
    scam signals. Closes on volume served, refund guarantee, payment processor
    legitimacy, sample report.
  Segment B — Dealer (continuous): used-car dealer or independent buyer
    needing reports as a regular cost of business. Expert; knows official
    pricing and product. Methodical; wants volume pricing, terms, business
    legitimacy, often a human contact.

CONTEXT: Standalone landing page, root of the site. Entry: warm word-of-mouth
  referrals + cold social media. Exit: individual checkout flow OR dealer
  contact/signup flow. Stage: SELLING (pre-purchase, both segments). Trust
  establishment is the primary blocker.

KEY ACTIONS:
  1. PRIMARY — Buy a report now (VIN → pay → receive PDF).
  2. SECONDARY — Set up dealer access (volume plan inquiry/signup).
  3. TERTIARY — See a sample report (low-commitment proof for both segments).
```

---

## Section 3: Flow Map

```
FLOW: Single page (standalone, root of site)

      ┌─────────────────────────────┐
      │  Entry: warm referral OR    │
      │  cold social/marketplace    │
      └──────────────┬──────────────┘
                     │
                     ▼
      ┌─────────────────────────────┐
      │  This page (hero +          │
      │  trust + dual paths)        │
      └──┬──────────┬──────────┬────┘
         │          │          │
         ▼          ▼          ▼
   [Checkout]  [Dealer       [Sample
   (individual) signup/      report
    PDF flow)   contact)      modal/page]
                              │
                              ▼
                  loops back, more confident
```

---

## Section 4: Decision Map

### 4A: User Decision Sequence

```
PAGE LEVEL (first 5 seconds):
  User's first question: "Is this a real way to get a real Carfax report
    cheaper, or is this a scam dressed up to look real?"
  Resolved by: hero headline naming "Official Carfax reports", visible
    legitimacy strip (secure-payment partner mark, refund guarantee, reports-
    served counter), and the absence of coupon-site visual tropes.

SECTION LEVEL (5-30 seconds, scanning):
  Individual buyer scanning for: "What does it cost? How fast? Will I really
    get the report? Where do I enter the VIN?"
    Resolved by: VIN-to-pay card placed adjacent to the headline with explicit
    price (vs. carfax.com strike-through), delivery time, refund line directly
    under the CTA, and a "see sample" link.
  Dealer scanning for: "Is there a path for me? Volume terms? A human?"
    Resolved by: equal-weight dealer panel placed beside the individual card,
    with one-line value framing ("X% lower per report at volume") and dealer
    proof ("Used by 200+ dealerships").

COMPONENT LEVEL (the click-vs-skip moment):
  Individual click-vs-skip: "If I type a VIN here, am I committing to anything?
    Is the price final? What's the catch?"
    Resolved by: VIN field with helper text, visible final price + total,
    refund-and-secure-payment microcopy directly under the button, and the
    sample-report fallback link visible from the same card.
  Dealer click-vs-skip: "If I click 'Set up dealer access', do I get a sales
    pitch or actual terms?"
    Resolved by: dealer panel reads "See volume pricing & terms" not "Talk to
    sales", and the dealer detail section below shows tiered pricing publicly
    before any form.
```

### 4B: Asset And Evidence Inference

```
PRODUCT/OUTPUT ASSETS:
  - The official Carfax PDF report itself (sample or redacted preview is the
    single highest-leverage asset on this page).
  - The VIN-entry → checkout → PDF download flow as a UI surface that can be
    previewed via "How it works" steps.
  - Dealer dashboard / volume access mechanism (mentioned, not pictured —
    treat as a tier table + setup flow).

PROOF ASSETS:
  - Reports served counter (specific number, recent timeframe).
  - Refund / money-back guarantee with explicit conditions.
  - Secure payment partner mark (Stripe, Visa/MC/Amex, etc. — whichever is
    real per assumption).
  - Business identity block (legal entity, address, EIN if appropriate, state
    of incorporation).
  - BBB or equivalent verification IF genuinely held.
  - Dealer logos / dealer count IF cleared for use.
  - Customer review aggregate (Trustpilot/Google) IF real.
  - Sample report preview (annotated screenshot of a real report with VIN
    redacted).

CONVERSION ASSETS:
  - Explicit price ($X.XX) and side-by-side carfax.com price as comparative
    anchor.
  - Delivery SLA ("Delivered in under 5 minutes" or similar — only if real).
  - Refund window and conditions, plainly stated.
  - Sample report path (no form gate).
  - Dealer pricing tiers visible without contact gating.
  - Direct support email / phone for dealers.

NAVIGATION/SELF-SELECTION ASSETS:
  - Dual-card hero pattern (one card per audience, equal visual treatment but
    one is primary by size and color weight).
  - Anchor link "For dealers" in the header for repeat dealer visitors.
  - Dedicated dealer section deep-linkable (#dealers).

ACTION VS SIGNAL CLASSIFICATION:
  Actions: VIN input field, "Buy report now" primary button, "Set up dealer
    access" secondary button, "See sample report" tertiary link, dealer
    contact form, FAQ expanders.
  Signals: official-Carfax product naming, payment partner mark, refund
    guarantee text, reports-served counter, sample report preview image,
    business identity block, dealer count, pricing comparison, delivery SLA,
    dealer-tier table, customer reviews.
```

### 4C: Strategy Defense

```
ASSIGNED STRATEGY: trust-first-dual-path-conversion

WHY THIS STRATEGY FITS THIS INTAKE:
  The diagnosis is unambiguous: trust_burden is high (0.95 weight), both
  segments name "scam" as the primary fear, and conversion is gated on
  legitimacy before either path is rational. Simultaneously, market_type is
  hybrid and dealer LTV is the higher-value channel, so a single-audience-led
  layout would leak qualified dealer leads. Trust-first does not mean trust
  BEFORE action — it means trust EQUAL-WEIGHT-WITH action: the action surfaces
  appear in the first viewport, but each is wrapped in adjacent proof
  (refund guarantee under the CTA, dealer count beside the dealer CTA, secure-
  payment mark on the trust strip). Dual-path is non-negotiable because both
  segments must self-select on arrival; collapsing them later is the named
  individual-only-bias anti-pattern. The fit is strong; the only weakness is
  that visitors arriving with already-high trust (warm referrals) must not be
  slowed by proof — addressed by keeping the VIN card itself fast and not
  forcing users to read the proof strip.

LOCAL OPTIMUM THIS STRATEGY RISKS:
  The shallow version of trust-first-dual-path is "two equal-weight CTAs above
  a wall of trust badges." That layout looks balanced, scores well on a naive
  rubric, but produces:
    1. Decision paralysis (two visually identical primary CTAs = neither
       feels primary).
    2. Generic-badge overload (a row of 8 trust marks that look like every
       other landing page = trope-index spike, scam paradox).
    3. A dealer path that reads as a button but has no actual content depth
       below — making dealers click and bounce.

HOW THIS DESIGN AVOIDS THAT LOCAL OPTIMUM:
  1. The two paths are NOT equal-weight. The individual VIN card is the
     dominant primary (full-feature card with input, price, CTA, refund line).
     The dealer panel is a secondary primary — same card system, smaller
     footprint, headline + one-line proof + textual CTA — large enough that
     a dealer cannot miss it but small enough that one-time buyers know the
     individual path is the "default."
  2. Trust signals are SPECIFIC and INLINE, not a badge wall. The refund
     guarantee text sits directly under the buy button, not in a separate
     row. The reports-served counter is one number, not five logos. Payment
     security is named ("Stripe-secured checkout") rather than a generic
     padlock.
  3. Dealer path has real content depth — a dedicated section with tiered
     volume pricing visible without a form, dealer-specific guarantees, and
     a contact path that reads "Get a setup quote" not "Contact sales."

REFERENCE CALIBRATION:
  No reference library injected for this run. Calibrating against general
  knowledge of the family: high-trust transactional ecommerce (Stripe Atlas,
  Carvana checkout-first marketing, TurboTax) and dual-audience B2B/B2C
  landing pages (Shopify's merchant/customer split, Square's seller/buyer
  framing). The structural moves used here — split-hero with primary-dominant
  card + secondary-balanced panel, inline-proof under CTA, deferred badge
  strip — belong to that family. The deliberate divergence from typical
  Carfax-discount competitors is the absence of "save 70%!" coupon framing
  and the visible dealer tier table; most competitors hide dealer terms.

STRATEGIC DIAGNOSIS MAPPING:
  - market_type: hybrid → dual-card hero with individual-primary, dealer-
    secondary placement; dedicated #dealers section below.
  - trust_burden: high (0.95) → inline refund + secure-payment + reports-
    served signals at three specific points (header strip, under primary CTA,
    inside legitimacy section); sample-report path always visible.
  - functional_immediacy: high → VIN field present in first viewport with no
    intermediate steps; price visible adjacent to input.
  - decision_risk: high → "Official Carfax report" wording explicit in
    headline and on every CTA microcopy line.
  - audience_sophistication: mixed → individual side uses plain comparison
    framing; dealer side uses volume-economics framing (per-report cost at
    100 / 500 / 1000 reports) without re-explaining what Carfax is.
  - decision_sequence step 1 (relevance) → hero headline + dual-card.
  - decision_sequence step 2 (legitimacy) → trust strip + inline proof under
    CTA + legitimacy section.
  - decision_sequence step 3 (economics) → price comparison + dealer tier
    table.
  - decision_sequence step 4 (path) → dual cards in hero, anchor link in
    header.
  - decision_sequence step 5 (commit or proof) → primary CTA OR sample-report
    link (both visible).
  - decision_sequence step 6 (recourse) → refund guarantee section + visible
    support contact in footer and dealer section.
  - audience_model "what they need before action" → every named requirement
    (official-product confirmation, legitimacy proof, price/delivery/refund
    clarity, sample, dealer-vs-individual distinction, dealer terms context)
    maps to a component listed in Section 6.
  - design_directive primary priorities (1-4) → all four are addressed by
    the four primary components: dual-card hero, trust strip, sample-report
    section, dealer detail section.

FIRST VIEWPORT OBLIGATION:
  Diagnosis requires the first viewport to: (1) identify discounted official
  Carfax, (2) show credible legitimacy, (3) present individual purchase path,
  (4) present dealer access path, (5) show savings cue, (6) expose sample/
  proof option.

  Desktop first-fold components (1440x900) that satisfy this:
    1. Trust utility bar (top, full-width): "Stripe-secured checkout · Money-
       back guarantee · 250,000+ reports delivered" — covers (2) and partly
       (5) via implied scale.
    2. Hero headline: "Official Carfax reports — $X off retail. Delivered in
       minutes." — covers (1) and (5).
    3. Hero subhead: one line clarifying "the same official Carfax report you
       buy at carfax.com, at a lower price." — reinforces (1).
    4. Individual VIN card (left/dominant): VIN input, "$X (vs $39.99)" price
       line, primary "Get my report" CTA, refund + secure-payment microcopy
       under CTA, sample-report link in same card. — covers (3), (5), (6).
    5. Dealer panel (right/secondary): "Buying for a dealership? Volume
       pricing for 100+ reports/month → Set up dealer access" with dealer
       count proof. — covers (4).
  All six first-viewport requirements satisfied without scrolling.

  Mobile first-fold (390x844) that satisfies this:
    1. Trust utility bar collapses to two lines: secure-payment line +
       refund/reports line.
    2. Hero headline (compressed font size, same text).
    3. VIN card is full-width with tap-friendly input and CTA.
    4. Dealer panel reflows directly below the VIN card and remains in or
       just at the fold edge — visible enough to be discovered without deep
       scrolling. The dealer-link in the sticky header is also tappable.
    5. Sample-report link is visible inside the VIN card.
  All six requirements satisfied within the first 1.0–1.2 viewport heights;
  the dealer panel may peek-below at very small screens but is reachable in
  one swipe and signaled by the header dealer link.

HARD FLOOR COVERAGE:
  - hf_first_viewport_legitimacy_and_self_selection → satisfied by the
    five-component first fold above on both desktop and mobile.
  - hf_early_legitimacy_proof → trust utility bar + inline refund/secure
    line under the primary CTA, both BEFORE the buy button is pressed.
  - hf_segment_self_selection → dual-card hero, header dealer link, anchored
    #dealers section.
  - hf_individual_purchase_immediacy → VIN field is the first interactive
    element, no narrative precedes it.
  - hf_dealer_path_prominence → dealer panel in hero + full dealer section
    with tiered pricing visible without form gating.
  - hf_official_report_clarity → "Official Carfax report" appears in
    headline, primary CTA microcopy, FAQ, and sample-report section labels.
  - hf_transparent_terms_and_safety → price, refund window, delivery SLA, and
    secure-payment provider all surfaced before checkout.
  - hf_proof_for_skeptics → sample-report link in hero card + dedicated
    sample-report section with annotated preview, no form gate.
  - hf_mobile_conversion_path → VIN card is the first full-width interactive
    block on mobile; trust strip is preserved; dealer link is in the sticky
    header.

ANTI-PATTERN AVOIDANCE:
  - ap_coupon_scam_aesthetic → no flashing discount, no countdown timer, no
    "70% OFF!!" treatment. Discount framing is "$X (vs $39.99)" — specific
    numbers, no exclamation, no banner.
  - ap_buried_trust → trust signals appear in the utility bar (above hero)
    and inline under the CTA, not in a footer FAQ.
  - ap_individual_only_bias → dealer panel is in the first viewport with
    parallel card system, full dealer section deep on page, header link.
  - ap_dealer_overeducation → dealer section uses volume-economics framing
    (per-report cost at tiered volume) and skips "what is Carfax" content.
  - ap_ambiguous_product_naming → "Official Carfax report" in the headline,
    every CTA microcopy, sample section title, and FAQ.
  - ap_unsubstantiated_authority_claims → only specific, real signals. The
    spec marks every proof asset with the source assumption ("Stripe-secured"
    only if Stripe; reports-served only if accurate; BBB only if held). No
    generic mystery badges.
  - ap_long_brand_story_before_task → no "About us" or company mission
    section; the page leads with the offer and the action.
  - ap_hidden_or_vague_refund_terms → refund line under the CTA AND a
    dedicated refund-policy card in the legitimacy section with explicit
    conditions ("Full refund within 24h if report fails to deliver or is not
    the official Carfax report you ordered").
  - ap_generic_saas_visual_formula → the page is built around a VIN-input
    transactional surface and a real-report preview, not abstract benefit
    cards.
```

### 4D: Component Justification

| Component | User Lens | Business Lens | Verdict |
|---|---|---|---|
| Trust utility bar | Resolves scam/legitimacy fear in <2s | Reduces bounce on cold social traffic; lifts both segments' downstream actions | Include — sticky-feeling header strip |
| Site header (logo + dealer link) | Repeat dealers go straight to dealer section; baseline brand identity | Captures dealer self-selection traffic | Include |
| Hero headline | Confirms relevance + product authenticity in one line | Converts cold traffic from "what is this?" to "is this real?" | Include |
| Hero subhead | Disambiguates "is this the same report" question | Reduces refund/support load by managing expectations | Include |
| Individual VIN card | Lets individual buyer act without scrolling | Directly drives primary revenue event | Include — dominant primary |
| VIN input field | Concrete first interactive surface, signals "this is real" | Reduces friction to checkout entry | Include |
| Primary CTA "Get my report" | Single decisive action | Conversion event for individual | Include |
| Price comparison ($X vs $39.99) | Anchors discount as specific, not vague | Makes savings credible (not "too good to be true") | Include |
| Refund + secure-payment microcopy | Resolves payment-fear right at click moment | Reduces cart abandon at the click | Include — directly under CTA |
| Sample-report link in hero card | Escape hatch for the skeptical buyer | Recovers visitors who would otherwise bounce | Include |
| Dealer access panel (hero) | Dealer recognizes the page is for them too | Captures higher-LTV dealer leads early | Include — secondary primary |
| Dealer panel proof | Dealer-specific legitimacy ("200+ dealerships") | Increases qualified-lead share | Include |
| How it works (3 steps) | Resolves "what happens after I pay?" | Reduces support load + refund risk | Include |
| Sample report section | Single highest-leverage proof asset | Single highest-leverage conversion lift for skeptics | Include — visible full preview, no gate |
| Legitimacy proof section | Resolves business-identity, payment, refund, volume questions in one place | Closes trust gap for skeptical cold visitors | Include |
| Business identity card | Resolves "is this a real company" | Required for dealer compliance buyers | Include |
| Payment partner card | Resolves "is my card safe" | Reduces checkout-stage abandons | Include |
| Refund policy card | Resolves "what if it fails" | Reduces chargeback exposure | Include |
| Reports-served counter | Quantifies legitimacy | Strongest proof for individual segment | Include |
| Dealer detail section | Dealer needs tier pricing, terms, contact | Dealer LTV; lead qualification | Include |
| Dealer pricing tiers (visible) | Dealer can self-qualify before contact | Filters out unqualified leads, captures qualified | Include — public, no gate |
| Dealer contact form | Final dealer conversion surface | Conversion event for dealer | Include |
| Dealer testimonial / logos | Dealer-specific proof | Dealer LTV signal | Include if real (else omit, anti-pattern) |
| FAQ section | Answers residual specific objections | Reduces support tickets | Include |
| Final dual CTA | Re-presents both paths after proof for un-decided visitors | Recovers scroll-to-bottom visitors | Include |
| Footer | Legal, support contact, business identity | Compliance + support visibility | Include |

Excluded by deliberate decision (with reasoning):
- Hero carousel — anti-pattern (ux-heuristics).
- Countdown timer / urgency banner — anti-pattern (coupon scam aesthetic).
- Long "About us" / mission section — anti-pattern (long brand story before
  task).
- Generic 8-badge trust strip — anti-pattern (generic SaaS visual formula).

### 4E: Tension Map

```
TENSION 1: Speed for warm referrals vs. proof for cold skeptics
  Business pull: Warm referral traffic converts fastest if VIN-to-pay is
    one-click — slowing them with proof loses revenue.
  User pull: Cold social traffic bounces on any unproven page; needs proof
    visible before VIN entry.
  Resolution: Layer proof beside-and-under the action, not before it. Trust
    strip is one thin row above the hero (skip-able for warm visitors).
    Inline refund + secure-payment microcopy sits under the CTA — a warm
    visitor reads only the button, a cold visitor reads two more lines. The
    full proof section lives mid-page, easily skipped on scroll. Warm
    visitors lose ~1 second; cold visitors gain trust without a scroll.

TENSION 2: Dealer prominence vs. individual primacy
  Business pull: Dealer LTV is higher; dealer path must not be footer-
    relegated.
  User pull: ~75-90% of traffic is individuals; making the page feel "for
    dealers" loses them.
  Resolution: Asymmetric dual-card hero. Individual card is full-feature and
    visually larger (~60% of horizontal space, full input + CTA + microcopy).
    Dealer panel is the same card system, smaller (~40%), one-line value +
    textual CTA. Both are above-the-fold, neither is buried, but the
    individual is unambiguously the "default" path. A dedicated #dealers
    section deeper on the page satisfies the methodical dealer browser.

TENSION 3: Discount visibility vs. scam-aesthetic risk
  Business pull: The discount is the hook — visitors are here for the price.
  User pull: Loud discount framing triggers scam pattern-matching.
  Resolution: Specific, numeric, paired comparison ($X vs $39.99) replaces
    percentage shouting. Use system typography weight, not promotional color
    or banner treatment. The savings cue is information, not advertisement.

TENSION 4: Sample-report visibility vs. checkout cannibalization
  Business pull: A sample link too prominent might cannibalize purchases.
  User pull: Skeptical visitors need a no-cost proof path or they bounce.
  Resolution: Sample link is a tertiary text link inside the hero card (not
    a button), and the dedicated sample-report section sits AFTER the hero,
    not beside it. Motivated buyers scroll past; skeptics scroll into proof
    and re-encounter the CTA at section end.

TENSION 5: Dealer pricing transparency vs. negotiation flexibility
  Business pull: Sales typically wants pricing gated to qualify leads.
  User pull: Methodical dealer buyers want to see the math before contact;
    gating reads as evasive.
  Resolution: Public tiered pricing (100/500/1000+ reports/month) with
    "starting at" framing per tier; volume-specific quotes still go through
    contact. Sales gets qualified leads who already self-quoted; dealers feel
    respected.
```

---

## Section 5: Visual Hierarchy Map

```
PRIMARY (dominant visual weight):
  1. Hero headline — anchors the whole page; states "Official Carfax reports"
     + savings + delivery in one line.
  2. Individual VIN card — the conversion surface; full-feature, visually
     dominant in the dual-card hero.
  3. Primary CTA "Get my report" — the single most important click on the
     page; high contrast button, visible in first viewport.
  4. Sample report preview image — the strongest proof asset; section anchor
     for the legitimacy stretch.
  5. Dealer detail section heading — anchors the second revenue channel;
     primary in the lower half of the page.

SECONDARY (supporting):
  6. Hero subhead — disambiguates the headline.
  7. Dealer access panel (hero) — equal hierarchy with individual card on the
     audience-recognition axis but smaller in spatial weight.
  8. Trust utility bar — small but always-present.
  9. Price comparison line — supports the headline savings claim.
  10. How it works (3 steps) — supports purchase decision.
  11. Legitimacy proof cards (4) — supports trust resolution.
  12. Dealer tier pricing table — supports dealer decision.
  13. FAQ list — supports residual objection handling.
  14. Final dual CTA — repeats the paths for late-page visitors.

TERTIARY (present but recessive):
  15. Site header (logo, dealer link) — navigation utility.
  16. Sample report link in hero card — escape hatch, not promoted.
  17. Refund / secure-payment microcopy — visible, never dominant.
  18. FAQ expander affordances.
  19. Footer (legal, support, address).
```

The rendered HTML wireframe encodes this ranking via `data-class`, font sizes,
button styles, container padding, and position on the page.

---

## Section 6: Component Inventory

| Component | Class | Purpose | Content Direction |
|---|---|---|---|
| trust-utility-bar | T | Above-fold legitimacy strip | 3 inline items: "Stripe-secured checkout · Money-back guarantee · 250,000+ reports delivered" — specific, no generic badges |
| site-header | T | Brand + nav utility | Logo (left), "For dealers" anchor link (right), small "Sign in" link |
| header-dealer-link | S | Repeat-dealer fast path | Plain text link, sized like other nav |
| hero-headline | P | Core value prop + product auth + savings | "Official Carfax reports — $X off retail. Delivered in minutes." 10-14 words |
| hero-subhead | S | Disambiguates "same report?" | "The same official Carfax vehicle history report you'd buy at carfax.com — at our negotiated price." 18-25 words |
| individual-vin-card | P | Container for the primary conversion surface | Card with input + price + CTA + microcopy + sample link |
| vin-input | P | Begin the purchase flow | Label "Enter VIN", helper "17 characters, found on dashboard or door jamb" |
| price-line | S | Specific savings anchor | "$X.XX (carfax.com: $39.99)" — strikethrough on $39.99, not on the new price |
| primary-cta | P | Conversion click | Button: "Get my Carfax report" |
| inline-refund-microcopy | S | Risk reduction at click moment | "Full refund if not delivered. Stripe-secured payment." — directly under button |
| sample-report-link | T | Skeptic escape hatch | Text link: "Or see a sample report first →" inside the same card, recessive |
| dealer-access-panel | P | Secondary primary; dealer self-selection in hero | Smaller card with title, one-line value, dealer-count proof, textual CTA |
| dealer-panel-headline | S | Recognizes the dealer audience | "Running a dealership?" or "Buying for a dealership?" |
| dealer-panel-value | S | Volume framing in one line | "Volume pricing for 100+ reports/month — get per-report rates as low as $X." |
| dealer-panel-proof | S | Dealer-specific credibility | "Used by 200+ used-car dealerships" (only if accurate) |
| dealer-panel-cta | S | Audience-recognition click | "See dealer pricing →" — anchors to #dealers, not to a form |
| how-it-works-section | S | Purchase-process clarity | 3 steps |
| step-card-1 | S | Step 1 | "Enter the VIN" |
| step-card-2 | S | Step 2 | "Pay with card or wallet" |
| step-card-3 | S | Step 3 | "Get the official Carfax PDF — usually under 5 minutes" |
| sample-report-section | P | Strongest proof asset | Section with annotated preview image |
| sample-report-image | P | Visible report preview | Annotated screenshot of an official Carfax report (VIN/owner redacted) |
| sample-report-callouts | S | Labels what's in the report | 3-4 callouts: "Title history", "Accidents", "Service records", "Owner count" |
| sample-report-cta | S | Re-present primary CTA after proof | "Get the report for your VIN" — opens the same VIN card or scrolls to it |
| legitimacy-section | P | Trust resolution centerpiece | Header + 4 proof cards |
| legitimacy-card-business | S | Business identity proof | Legal name, address, EIN/state if available |
| legitimacy-card-payment | S | Payment safety proof | "Stripe-secured" with what that means |
| legitimacy-card-refund | S | Refund policy proof | Explicit conditions and window |
| legitimacy-card-volume | S | Scale proof | Reports-served counter with timeframe |
| dealer-section | P | Full dealer detail | Anchored at #dealers |
| dealer-section-headline | S | Recognizes the audience | "For dealerships and high-volume buyers" |
| dealer-tier-table | S | Public volume pricing | 3 tiers (e.g., 100/500/1000+ reports/mo) with per-report rate |
| dealer-terms-line | S | Reassurance | "Month-to-month. Cancel any time. No setup fee." |
| dealer-contact-form | P | Dealer conversion surface | Fields: business name, email, est. monthly volume; "Get a setup quote" button |
| dealer-support-line | S | Human-contact reassurance | Phone number + email + business hours |
| faq-section | S | Residual objection handling | 6-8 expandable Q/A |
| faq-item | T | Single Q/A | Default-collapsed |
| final-dual-cta | P | Last-chance dual path | Two cards mirroring hero; same CTAs |
| footer | T | Legal, support, identity | Standard footer with legal links, support contact, address |

(The HTML wireframe contains exactly these `data-component` values with
matching `data-class` attributes.)

---

## Section 7: ASCII Wireframe (Desktop, 1440px)

```
┌──────────────────────────────────────────────────────────────────────┐
│ Stripe-secured checkout · Money-back guarantee · 250k+ reports done  │ trust-utility-bar (T)
├──────────────────────────────────────────────────────────────────────┤
│ [LOGO]                                       For dealers   Sign in   │ site-header (T)
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   Official Carfax reports — $X off retail.                           │ hero-headline (P)
│   Delivered in minutes.                                              │
│                                                                      │
│   The same official Carfax vehicle history report you'd buy          │ hero-subhead (S)
│   at carfax.com — at our negotiated price.                           │
│                                                                      │
│   ┌─────────────────────────────────────────┐ ┌──────────────────┐   │
│   │  Enter the VIN of the car you're       │ │ Running a         │   │ individual-vin-card (P)
│   │  considering:                          │ │ dealership?       │   │ + dealer-access-panel (P)
│   │                                        │ │                   │   │
│   │  [____________________________]        │ │ Volume pricing    │   │ vin-input (P)
│   │  17 chars, on dash or door jamb        │ │ for 100+ reports  │   │
│   │                                        │ │ /mo — per-report  │   │
│   │  $X.XX  (carfax.com: $̶3̶9̶.̶9̶9̶)            │ │ rates as low as   │   │ price-line (S)
│   │                                        │ │ $X.                │   │
│   │  ┌─────────────────────────────────┐  │ │                   │   │
│   │  │   Get my Carfax report          │  │ │ Used by 200+      │   │ primary-cta (P)
│   │  └─────────────────────────────────┘  │ │ dealerships       │   │ dealer-panel-proof (S)
│   │                                        │ │                   │   │
│   │  Full refund if not delivered.         │ │ See dealer        │   │ inline-refund-microcopy (S)
│   │  Stripe-secured payment.               │ │ pricing →         │   │ dealer-panel-cta (S)
│   │                                        │ │                   │   │
│   │  Or see a sample report first →        │ └──────────────────┘   │ sample-report-link (T)
│   └─────────────────────────────────────────┘                          │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                       How it works                                   │ how-it-works-section (S)
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                           │
│  │ 1. VIN   │→ │ 2. Pay   │→ │ 3. PDF   │                           │ step-cards (S x3)
│  │          │  │          │  │ <5 min   │                           │
│  └──────────┘  └──────────┘  └──────────┘                           │
├──────────────────────────────────────────────────────────────────────┤
│                  See exactly what you'll get                         │ sample-report-section (P)
│  ┌────────────────────────────────────────┐                          │
│  │  [annotated Carfax PDF preview image]  │ ← Title history          │ sample-report-image (P)
│  │                                        │ ← Accidents              │ sample-report-callouts (S)
│  │                                        │ ← Service records        │
│  │                                        │ ← Owner count            │
│  └────────────────────────────────────────┘                          │
│              [ Get the report for your VIN ]                         │ sample-report-cta (S)
├──────────────────────────────────────────────────────────────────────┤
│                Why this is legitimate                                │ legitimacy-section (P)
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐                    │
│  │Business │ │Payment  │ │Refund   │ │250k+    │                    │ legitimacy-cards (S x4)
│  │identity │ │partner  │ │policy   │ │reports  │                    │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘                    │
├──────────────────────────────────────────────────────────────────────┤
│  #dealers   For dealerships and high-volume buyers                   │ dealer-section (P)
│                                                                      │
│  ┌───────────────┬───────────────┬───────────────┐                  │
│  │ 100/mo        │ 500/mo        │ 1000+/mo      │                  │ dealer-tier-table (S)
│  │ $X/report     │ $X/report     │ $X/report     │                  │
│  └───────────────┴───────────────┴───────────────┘                  │
│  Month-to-month. Cancel any time. No setup fee.                      │ dealer-terms-line (S)
│                                                                      │
│  ┌──────────────────────────────────────────┐                       │
│  │ Business name   [_______________]        │                       │ dealer-contact-form (P)
│  │ Work email      [_______________]        │                       │
│  │ Est. monthly    [_______________]        │                       │
│  │ volume                                   │                       │
│  │  [ Get a setup quote ]                   │                       │
│  └──────────────────────────────────────────┘                       │
│  Or call (XXX) XXX-XXXX · sales@____ · M-F 9-6 ET                   │ dealer-support-line (S)
├──────────────────────────────────────────────────────────────────────┤
│                Frequently asked questions                            │ faq-section (S)
│  ▸ Is this the same report carfax.com sells?                        │ faq-item (T)
│  ▸ How is it discounted?                                             │
│  ▸ How fast is delivery?                                             │
│  ▸ What happens if it fails?                                         │
│  ▸ Do you offer AutoCheck or other reports?                          │
│  ▸ Are dealer plans contracts?                                       │
├──────────────────────────────────────────────────────────────────────┤
│   ┌────────────────────────┐  ┌────────────────────────┐            │
│   │ Get one report now     │  │ Set up dealer access   │            │ final-dual-cta (P)
│   │  [ Buy a report → ]    │  │  [ See dealer plans → ] │            │
│   └────────────────────────┘  └────────────────────────┘            │
├──────────────────────────────────────────────────────────────────────┤
│  © Co · Address · EIN · Terms · Privacy · Refund · Support           │ footer (T)
└──────────────────────────────────────────────────────────────────────┘
```

(Mobile and tablet layouts described in Section 8 and encoded in Section 12.)

---

## Section 8: Responsive Behavior

```
DESKTOP (≥1025px, default):
  - Hero is two-column: individual-vin-card (60% width) + dealer-access-panel
    (40% width), separated by a moderate gap.
  - How-it-works is a 3-column grid.
  - Legitimacy section is a 4-column grid of cards.
  - Dealer tier table is a 3-column grid.
  - Final dual CTA is a 2-column grid.
  - Generous section padding; controlled body width (max ~1200px).

TABLET (641-1024px):
  - Hero stacks: individual-vin-card on top (full width), dealer-access-panel
    below (full width but reduced padding so it stays in or near the fold).
    The dealer panel is intentionally short on this breakpoint so it peeks
    visibly above the fold.
  - How-it-works collapses to 3-column → still 3-column at this breakpoint
    but tightens; falls to single column only on mobile.
  - Legitimacy cards: 4-col → 2-col grid.
  - Dealer tier table: 3-col → 3-col (compact); falls to single column on
    mobile only (cards stack).
  - Section padding moderate.

MOBILE (≤640px):
  - All multi-column grids collapse to single column.
  - Hero stack order: trust-utility-bar (compact, 2 lines) → site-header
    (sticky, with "For dealers" link) → hero-headline → hero-subhead →
    individual-vin-card → dealer-access-panel.
  - The dealer panel is the very next thing after the VIN card; together
    they fit within ~1.0–1.2 viewport heights so the dealer path is
    discoverable in a single swipe and signaled by the sticky-header dealer
    link.
  - VIN input is full-width with 56px tap-friendly height.
  - Primary CTA is full-width.
  - Inline refund microcopy stays directly under the CTA.
  - Sample-report link remains in-card.
  - How-it-works steps stack vertically.
  - Sample report image scales to fit width; callouts move below the image
    rather than beside it.
  - Legitimacy cards stack 1-col.
  - Dealer tier "table" becomes 3 stacked cards.
  - Dealer contact form remains usable; fields full width.
  - Final dual CTA stacks vertically (individual CTA first, dealer CTA
    second), preserving the primacy ranking.
  - Footer collapses to a single accordion or stacked column list.

DENSITY:
  - Marketing-leaning, low-to-moderate density. Generous macro whitespace
    between sections. Inside cards, density is moderate (not coupon-like
    cluttered, not enterprise-empty).

NO COMPONENT IS HIDDEN ON MOBILE without an alternative path. The dealer
section has the header dealer link as a fast access path; nothing requires
hiding.
```

---

## Section 9: Interaction Notes

```
- VIN input: as the user types, light client-side validation (length = 17,
  alphanumeric, no I/O/Q). Errors appear inline below the field; do not block
  the page.
- Primary CTA: enabled at 17 chars; otherwise visibly disabled with helper
  text (no aggressive red error state pre-submit).
- Sample-report link: opens an in-page section anchor (smooth scroll) OR a
  modal — implementer choice; the wireframe encodes the section approach.
- Dealer panel CTA: anchors to #dealers section.
- Header "For dealers" link: anchors to #dealers section.
- Sample-report-cta button: scrolls back up to and focuses the VIN input.
- FAQ items: native <details>/<summary> expand/collapse, single-open is
  optional.
- Sticky behavior: site-header is sticky on mobile; trust-utility-bar is
  static (scrolls away naturally).
- No carousels. No auto-advancing anything.
- All animations respect prefers-reduced-motion.
```

---

## Section 10: Content Direction

```
OVERALL TONE: Direct, credible, practical, transparent, reassuring. No hype,
  no exclamation marks, no urgency theater. Specifics over slogans.

SECTION-BY-SECTION:
- Trust utility bar: 3 atomic claims, comma/dot-separated, ~12-15 words total.
- Hero headline: 10-14 words. MUST contain "Official Carfax". State savings
  with a specific dollar number, not a percentage.
- Hero subhead: 18-25 words. Resolve the "same report?" question explicitly.
- VIN card price line: side-by-side comparison "$X.XX (carfax.com: $39.99)".
- Primary CTA label: "Get my Carfax report" — not "Buy now", not "Submit".
- Inline refund microcopy: ≤14 words, two short clauses.
- Sample-report link: ≤8 words, ends with arrow or →.
- Dealer panel: headline ≤4 words ("Running a dealership?"), value line
  ≤20 words, proof line ≤8 words, CTA "See dealer pricing →".
- How-it-works: each step ≤8 words; concrete verbs.
- Sample-report section: heading ≤8 words ("See exactly what you'll get").
  Callouts label real report sections.
- Legitimacy section: heading ≤6 words ("Why this is legitimate"). Each card
  is a specific, verifiable claim — no generic "trusted" / "secure" /
  "verified" language. If a claim cannot be backed, OMIT the card rather
  than fill space.
- Dealer section: heading "For dealerships and high-volume buyers". Tier
  labels: "100 / mo", "500 / mo", "1000+ / mo". Per-report rate as a number.
- Dealer terms line: ≤14 words; address the typical dealer fear of lock-in.
- FAQ Q-side ≤12 words each; A-side ≤60 words; specific not platitudinal.
- Final dual CTA: short headers ("Get one report now" / "Set up dealer
  access"), button labels matching primary and dealer-panel CTAs.
- Footer: legal name, address, terms/privacy/refund links, support email.
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
- Cold visitor (full skepticism): scrolls past hero, reads legitimacy and
  sample report sections, returns to top to convert.
- Warm referral (partial trust): enters VIN immediately and clicks CTA.
- Dealer visitor: clicks "For dealers" header link OR scrolls to #dealers,
  reads tier table, fills contact form.
- Skeptical-but-curious: clicks sample-report link from hero card; lands in
  the sample-report section; clicks sample-report-cta to return to VIN.
```

### 11B: First Viewport Composition

```
FIRST VIEWPORT (desktop, 1440x900):
- trust-utility-bar visible (top, full-width, single line).
- site-header visible.
- hero-headline visible and is the largest text element in the viewport.
- hero-subhead visible.
- individual-vin-card visible with VIN input + price-line + primary-cta +
  inline-refund-microcopy + sample-report-link all rendered without scroll.
- dealer-access-panel visible to the right of the VIN card with headline +
  value line + dealer-panel-proof + dealer-panel-cta.
- how-it-works section MUST peek a small amount below the fold — enough to
  signal "more below" without competing for hero attention.
- The hero MUST NOT render as a single empty viewport with only a centered
  headline; the VIN card and dealer panel are mandatory in fold-1.

FIRST VIEWPORT (mobile, 390x844):
- trust-utility-bar visible (compact, may be 2 lines).
- site-header visible (sticky).
- hero-headline visible.
- hero-subhead visible.
- individual-vin-card visible with VIN input + primary-cta visible.
  (Inline refund and sample-link may sit just at the fold edge.)
- dealer-access-panel: the panel header line MUST be visible or peeking above
  the fold, OR if not, the "For dealers" link in the sticky header is the
  guaranteed fallback. In the wireframe, the panel sits directly under the
  card and is reachable in one swipe.
```

### 11C: Layout Constraints

```
LAYOUT:
- Desktop hero: 2-column. individual-vin-card occupies ~60% width;
  dealer-access-panel occupies ~40% width. Vertical alignment: top.
- Tablet: hero stacks; individual-vin-card full width on top, dealer panel
  full width directly below.
- Mobile: single-column for the entire page. Stack order: trust-utility-bar,
  site-header (sticky), hero-headline, hero-subhead, individual-vin-card,
  dealer-access-panel, how-it-works, sample-report-section, legitimacy-section,
  dealer-section, faq-section, final-dual-cta, footer.
- individual-vin-card owns primary visual weight throughout the hero. The
  dealer-access-panel is a card of the same family but smaller in spatial
  weight.
- The dealer-access-panel must NOT be visually equal to or larger than the
  individual-vin-card on any viewport.
- Maximum content width on desktop ≈ 1200px, centered.
- Sections are full-bleed background-wise but content is centered within the
  container.
```

### 11D: Density & Rhythm

```
DENSITY:
- Mode: low-to-moderate density marketing with embedded transactional
  surface. NOT high-density internal-tool. NOT zero-density single-message
  hero.
- Major sections use generous separation (large vertical padding between
  sections).
- Inside the VIN card, density is moderate: VIN input, price line, CTA,
  microcopy, sample link in a single visually grouped stack — not airy, not
  cramped.
- The trust-utility-bar is compact (single-line, small type).
- Legitimacy proof cards have moderate internal padding; they should not feel
  like generic "feature cards" but like factual claim panels.
- Dealer tier table cells are moderate density — each cell has the tier name,
  per-report rate, and one supporting line.
- Controls (CTAs, links) MUST NOT visually compete with the primary CTA.
  The primary CTA is the highest-contrast button on the page; dealer-panel-
  cta is a tier below; sample-report-link is a text link.
```

### 11E: Required Stable Selectors

```
REQUIRED SELECTORS (must exist as `id` on the matching element):
- #page-root
- #trust-utility-bar
- #site-header
- #header-dealer-link
- #hero
- #hero-headline
- #individual-vin-card
- #vin-input
- #primary-action          (the primary "Get my Carfax report" button)
- #sample-report-link
- #dealer-access-panel
- #dealer-panel-cta
- #how-it-works
- #sample-report-section
- #sample-report-image
- #sample-report-cta
- #legitimacy-section
- #dealers                 (the dedicated dealer section anchor)
- #dealer-tier-table
- #dealer-contact-form
- #dealer-contact-submit
- #faq-section
- #final-dual-cta
- #footer
```

### 11F: Non-Negotiables

```
- "Official Carfax" wording in the hero headline.
- VIN input, primary CTA, dealer panel ALL visible in the first viewport on
  desktop.
- Inline refund + secure-payment microcopy directly under the primary CTA
  (not in a separate section).
- Sample-report path with no form gate.
- Dealer pricing tiers visible before the dealer contact form.
- No coupon-aesthetic treatment: no countdown timer, no flashing/animated
  discount, no exclamation-heavy copy, no "limited time" framing.
- No generic trust-badge wall (no row of 6+ unspecific badges).
- No carousel anywhere on the page.
- No "About us" or company-mission section above the dealer detail section.
- The dealer-access-panel is present in the first viewport on desktop and
  reachable within one swipe + a header link on mobile.
```

### 11G: Allowed Variation

```
- Exact ratio of the dual-card hero (60/40 may move to 55/45 or 65/35).
- Exact button radius, internal spacing values within the Section 11D ranges.
- Whether sample-report opens as an in-page section anchor or as a modal
  (both satisfy the proof requirement).
- Order of legitimacy-cards (business / payment / refund / volume can be
  permuted).
- Exact number of FAQ items (6-8 acceptable).
- Whether dealer tier table has 3 or 4 tiers.
- Sticky vs static behavior of site-header on desktop (must be sticky on
  mobile).
- Whether trust-utility-bar uses dot, pipe, or bullet separators.
- Whether step icons are used (plain numbered chips are fine; if iconized,
  use abstract / non-brand icons).
```

### 11H: Not Allowed

```
- Hiding the dealer panel below the fold on desktop.
- Replacing specific proof claims with generic badges.
- Adding a hero carousel or multi-message rotator.
- Making the dealer CTA a primary-style button equal to the buy-report CTA.
- Adding promotional banners ("LIMITED TIME!", countdown, % off shouting).
- Gating the sample report behind an email or VIN form.
- Gating the dealer pricing tiers behind the contact form.
- Mimicking carfax.com brand colors, marks, or layout in ways that could
  read as official-Carfax impersonation.
- Adding a long "About us" or mission section above the legitimacy section.
- Adding hover-only interactions that have no touch equivalent.
- Auto-advancing or animating any element in a way that violates prefers-
  reduced-motion.
- Reducing primary CTA contrast to match dealer CTA contrast.
- Replacing the VIN input with a multi-step "wizard" that hides the price.
```

---

## Section 12: HTML Wireframe Artifact

```
HTML WIREFRAME ARTIFACT:
  File: wireframe.trust-first-dual-path-conversion.html
  Components: 38 (matches Section 6 row count)
  Selectors: 24 (matches Section 11E entry count)
  Status: written
```

The HTML file is a self-contained gray-box wireframe per
`knowledge/wireframe-html-format.md`. It encodes:

- All 38 components from Section 6 with `data-component` and `data-class`
  attributes.
- All 24 required selectors from Section 11E as `id` attributes.
- Three responsive states at 1440 / 768 / 390 px viewport widths via CSS
  media queries — no JavaScript.
- The dual-card hero with individual-vin-card visually dominant and
  dealer-access-panel as a parallel-but-smaller card.
- Inline refund + secure-payment microcopy directly under the primary CTA.
- Sample-report link inside the VIN card (tertiary text link).
- A full sample-report-section with annotated preview placeholder.
- A 4-card legitimacy section.
- A dealer section with public tier table and contact form, both ungated.
- A sticky-on-mobile site-header with the "For dealers" link.

The vision evaluator screenshots this file at the three viewports and scores
hierarchy, density, rhythm, structure, and trust-first compliance.
