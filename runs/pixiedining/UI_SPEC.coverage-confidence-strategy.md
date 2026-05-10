# Pixiedining — UI Spec: Coverage-Confidence Strategy

---

## Section 1: Page Classification

```
TYPE: marketing
```

Single dominant mode: consumer-facing conversion page. Pre-purchase for both free and paid tiers. No internal tool patterns — everything optimizes for first-session trust establishment and alert setup initiation.

---

## Section 2: Intake Summary

```
PURPOSE: Convert visitors into paying users for two concrete outcomes —
  (a) free signups for a single-restaurant alert during one upcoming trip, and
  (b) paid Pro subscriptions ($14.99/mo or $99/yr) for unlimited restaurants,
  multi-park bundles, push + SMS notifications, faster polling cadence, and
  auto-resume after the alert fires. The site must establish credibility quickly
  because users are skeptical of third-party Disney reservation tools, and
  emotionally invested because the trip is often a once-a-year or
  once-in-a-lifetime expense.

AUDIENCE: Three segments that self-select:
  Segment A — One-trip family planner: parent/trip-organizer, 5-10 day WDW vacation,
    knows the 60-day window, unsure if third-party tools are safe, decides in under
    two minutes, signs up free first and upgrades only after proof.
  Segment B — Disney superfan / Annual Passholder: expert user, compares competitors
    (MouseDining, DVC Reservation Finder, Touring Plans), cares about cadence,
    coverage breadth, and SMS. Pays annually if convinced of advantage.
  Segment C — Travel agent / planner: manages multiple simultaneous client trips,
    needs multi-account/multi-trip management, inquires before paying.

CONTEXT: Standalone marketing landing page, root of pixiedining.com.
  Entry: paid search ("be our guest cancellation alert", "space 220 availability
    notifier"), Reddit r/WaltDisneyWorld referrals, TikTok discovery.
  Exit: free alert signup (primary), Stripe Pro checkout (secondary), or
    travel agent inquiry form (tertiary).
  Journey stage: SELLING — pre-purchase, trust establishment required.

KEY ACTIONS:
  1. PRIMARY — Start a free single-restaurant alert
     (restaurant + trip dates + party size → email/push opt-in).
  2. SECONDARY — Upgrade to Pro for unlimited restaurants, SMS, faster polling.
  3. TERTIARY — Sample alert / coverage list / Travel Agent Plan inquiry.
```

---

## Section 3: Flow Map

```
FLOW: Single page (standalone) — root of pixiedining.com

Entry points:
  Paid search → landing page → [free alert form] → signup confirmation
  Reddit referral → landing page → [free alert form] → signup confirmation
  TikTok discovery → landing page → [coverage grid → free alert form] → signup confirmation

Primary exit path:
  Free alert form submit → email/push confirmation screen (not on this page)

Secondary exit path:
  Pro CTA → Stripe checkout (not on this page)

Tertiary exit path:
  Travel Agent inquiry → contact/inquiry form (not on this page)
  Sample alert link → in-page scroll / modal
  Coverage list → in-page scroll
```

---

## Section 4: Decision Map

### 4A: User Decision Sequence

```
PAGE LEVEL:
  User's first question: "Does this service actually cover the specific restaurant
    I'm trying to get — Be Our Guest, Space 220, or wherever I'm stuck?"
  Resolved by: Hero headline naming specific high-demand restaurants by name;
    restaurant coverage grid immediately below the fold.

  Second question: "Is this safe — do I have to give them my Disney login?"
  Resolved by: No-login trust badge in hero viewport, adjacent to primary CTA;
    official handoff note explaining Disney-site booking.

  Third question: "Will I actually hear about a cancellation before it's gone?"
  Resolved by: Proof stats (polling cadence, avg. alert latency, total alerts sent);
    sample alert preview showing the notification format and speed.

  Fourth question: "Is one free alert enough, or do I need more?"
  Resolved by: Tier comparison — Free (1 restaurant, email) vs Pro (unlimited,
    SMS, faster polling, auto-resume). Coverage grid itself creates natural
    upgrade motivation: "I want Be Our Guest AND Space 220."

  Fifth question: "Does this work for my specific situation?"
  Resolved by: Expert section for Segment B (cadence comparison vs. competitors);
    travel agent inquiry bar for Segment C.

SECTION LEVEL:
  Scanning for: "Do I recognize these restaurants? Is mine on the list?"
  Resolved by: Named restaurant cards in coverage grid with high-demand labels
    for Be Our Guest, Space 220, Cinderella's Royal Table, Topolino's Terrace,
    Storybook Dining. Search-intent terms appear visually in the grid.

  Scanning for: "What do I actually do here?"
  Resolved by: Alert setup form in hero (desktop right panel), with restaurant
    as the first field — immediate and legible.

COMPONENT LEVEL:
  Click-vs-skip decision on restaurant grid: "Is my restaurant listed?"
  Resolved by: Cards named by restaurant (not by category), park labels (WDW/DL),
    demand tier indicator ("High demand" badge on top venues).

  Click-vs-skip on tier comparison: "Do I need Pro or is free enough?"
  Resolved by: Specific Pro benefits paired with coverage motivation —
    "Unlimited restaurants. If you want more than one table, you need Pro."

  Click-vs-skip on expert section: "Is this better than MouseDining?"
  Resolved by: Explicit polling cadence comparison (Pixiedining: every 60s,
    competitors: 3-5 min), SMS channel availability, coverage count.
```

### 4B: Asset and Evidence Inference

```
PRODUCT/OUTPUT ASSETS:
  - Real-time alert notification (SMS, email, or push) naming the restaurant,
    date, time, and party size availability
  - Coverage across 160+ WDW and Disneyland dining venues
  - Alert criteria matching: restaurant + date range + party size + channel
  - Pro: unlimited active alerts, multi-park bundles, auto-resume

PROOF ASSETS:
  - Alert volume: total alerts sent (e.g., 2.4M)
  - Latency proof: average time from availability event to alert delivery
  - Coverage breadth: 160+ restaurants, both parks
  - Sample alert: concrete mock notification (Be Our Guest example)
  - Success testimonial: family planner story with realistic framing
  - Named restaurants as domain credibility signal

CONVERSION ASSETS:
  - Free tier: zero friction entry (no credit card)
  - No-login trust: "No Disney login required. Ever."
  - Official handoff explanation: book on Disney's site, not through Pixiedining
  - Risk reducers: "Cancel anytime · Money-back guarantee"
  - Pro pricing: $14.99/mo or $99/yr — transparent, no upsell surprise
  - Sample alert preview: makes product feel real before signup

NAVIGATION/SELF-SELECTION ASSETS:
  - Park tab toggle on coverage grid (WDW | DL) — routes by park
  - Expert section with comparison table — routes Segment B
  - Travel agent inquiry bar — routes Segment C without diluting primary path
  - FAQ accordion — async objection handling without page interruption

ACTION VS SIGNAL CLASSIFICATION:
  Actions:
    - Free alert form submission (restaurant, dates, party, email/phone)
    - Pro CTA click → Stripe checkout
    - Travel agent inquiry link
    - FAQ accordion expand
    - Park tab toggle on coverage grid
    - "See all 160+ restaurants" link

  Signals (passive):
    - Restaurant coverage grid (coverage breadth + named recognition)
    - No-login trust badge (safety reassurance)
    - Official handoff note (expectation setting)
    - Sample alert preview (product concreteness)
    - Proof stats strip (volume + latency)
    - Success testimonial (emotional validation)
    - Expert comparison callout (cadence, SMS, coverage vs. competitors)
    - Payment reassurance (refund, cancel anytime)
```

### 4C: Strategy Defense

```
ASSIGNED STRATEGY: coverage-confidence-strategy

WHY THIS STRATEGY FITS THIS INTAKE:

The primary entry path named in the brief is paid search on queries like
"be our guest cancellation alert" and "space 220 availability notifier."
These are restaurant-specific, not category-specific queries. The user
arrived with a named restaurant in mind. A coverage-confidence strategy
answers their first question at the moment they land: "Yes, we monitor the
exact restaurant you searched for." This is a faster resolution of search
intent than an alternative trust-first or workflow-first strategy that
front-loads explanation before showing coverage.

The natural upgrade motivation is also coverage-driven. The free tier gives
one restaurant alert. The moment a user recognizes multiple target restaurants
in the coverage grid — "I want Be Our Guest for dinner AND Space 220 for
lunch" — the Pro tier's unlimited restaurants becomes immediately compelling.
Coverage is both the credibility signal and the upsell mechanism.

For Segment B (expert users), named restaurant coverage alongside specific
polling cadence numbers is the primary comparison criteria. Coverage-confidence
delivers this without requiring them to hunt for it in a separate section.

The fit is slightly weaker for Segment A family planners who may not know
restaurant names yet (they know "that castle restaurant," not "Cinderella's
Royal Table"). This design mitigates by using well-known colloquial names and
"High demand" labels that help less-expert users recognize relevant venues.

LOCAL OPTIMUM THIS STRATEGY RISKS:
Dense tabular coverage list that reads like a database export — a wall of
restaurant names with no visual hierarchy, warmth, or demand signal, turning
the proof section into a chore to scan rather than a credibility moment.

HOW THIS DESIGN AVOIDS THAT LOCAL OPTIMUM:
(1) The coverage grid uses named cards, not rows, with park and land labels
    for spatial orientation — it reads like a curated menu, not a spreadsheet.
(2) The top 8-10 venues carry an explicit "High demand" badge, creating a
    priority layer that helps Segment A recognize the restaurants that matter.
(3) A WDW / DL park toggle prevents the grid from becoming an undifferentiated
    mass; users filter to their park and the grid stays legible.
(4) A "See all 160+ restaurants →" link handles the long tail without
    rendering it inline — the grid stays scannable.
(5) Emotional reassurance ("Stop refreshing. We're watching.") anchors the
    section head, so coverage lands in an emotional context, not a data dump.

REFERENCE CALIBRATION:
No external references were injected. Based on general knowledge:
— Strong consumer utility SaaS landing pages (travel-adjacent, subscription,
   free-to-paid) place product proof at the first meaningful scroll, not buried
   below extensive explanation. This design puts the coverage grid as the first
   sub-fold section, matching that structural family.
— Reservation and availability tool pages that name specific venues
   (concert ticket alerts, flight price trackers) consistently outperform
   generic category descriptions in search-intent conversion. Named restaurants
   follow this pattern.
— The design deliberately diverges from Disney-adjacent fan sites and
   lifestyle travel inspiration pages that lead with emotion/story. Instead,
   the hero is task-first with emotional reassurance as supporting context.
```

**STRATEGIC DIAGNOSIS MAPPING:**

| Strategic axis | Axis value | Component / section decision |
|---|---|---|
| functional_immediacy: high | → | Alert setup form is in the hero viewport; restaurant field is form field #1 |
| trust_burden: high | → | No-login trust badge and official handoff note appear in hero viewport, adjacent to primary CTA |
| audience_sophistication: mixed | → | Coverage grid uses demand labels for Segment A; expert section provides cadence data for Segment B; agent bar routes Segment C |
| visual_posture: polished_utility | → | Coverage cards are clean, labeled, and specific — not decorative tiles |
| content_depth: layered | → | Hero answers step 1–2 of decision sequence; coverage + proof answer steps 3–4; expert section answers step 5 |
| decision_risk: medium | → | Payment reassurance ("Cancel anytime · Refund guarantee") near Pro CTA; no-login near free CTA |
| usage_pattern: short_repeated_utility | → | Form is compact, restaurant is the first field, no mandatory account creation before alert start |
| expected_session_duration: one_to_three_min | → | Primary decision path (hero → coverage → form submit) requires no scrolling past 3 sections |

**FIRST VIEWPORT OBLIGATION:**

The diagnosis requires: within seconds, visitors must understand that Pixiedining watches Disney dining cancellations, alerts them in real time, never needs their Disney login, and lets them start one free alert immediately.

Desktop first-fold components that satisfy this:
- `hero-headline` — names Be Our Guest, Space 220, Cinderella's Royal Table; states "real-time dining alerts"
- `alert-setup-form` — visible right panel, restaurant as first field; primary CTA "Start My Free Alert →" is above the fold
- `no-login-badge` — "No Disney login required. Ever." with lock icon, left panel below subheadline
- `official-handoff-note` — "You book on Disney's official site — we alert you first" below trust badge
- `hero-subheadline` — explains monitoring → alert → book flow in 25 words

Mobile first-fold components:
- `hero-headline` (scaled)
- `hero-subheadline` (shortened to 20 words)
- `no-login-badge` (compact, icon + text)
- `primary-cta` button ("Start My Free Alert →") — full width, above first scroll
- `official-handoff-note` — one-line version below CTA
- Form fields appear below CTA (restaurant → dates → party size → email)

**HARD FLOOR COVERAGE:**

| Hard floor ID | Satisfied by | Selector / component |
|---|---|---|
| hf_free_alert_visible | Alert setup form in hero viewport (desktop right panel); CTA button above mobile fold | `#primary-action`, `#primary-section` |
| hf_no_login_trust | `no-login-badge` with lock icon in hero, adjacent to CTA; "No Disney login required. Ever." | `#trust-badge` |
| hf_no_guaranteed_booking | Headline and all CTAs reviewed for guarantee language; official-handoff-note clarifies user books on Disney | copy review, `official-handoff-note` |
| hf_official_handoff | `official-handoff-note` in hero viewport: "You book directly on DisneyWorld.com — we alert you first" | `official-handoff-note` data-component |
| hf_segment_self_selection | Coverage grid (A+B), expert section with comparison detail (B), agent inquiry bar (C) | `#restaurant-coverage`, `#expert-section`, `#agent-inquiry` |
| hf_mobile_first_task | Mobile hero: headline → trust badge → CTA → form fields in scrollable stack | `#primary-section` at ≤640px |
| hf_pro_value_specificity | Tier comparison lists: unlimited vs 1, SMS+push+email vs email only, 60s vs 5min polling, auto-resume, multi-park | `#tier-comparison`, `#pro-cta` |

**ANTI-PATTERN AVOIDANCE:**

| Anti-pattern ID | Design choice that avoids it |
|---|---|
| ap_magic_before_task | Hero headline is task-first: names restaurants and states "real-time alert." No opening with vacation storytelling. |
| ap_disney_clone_branding | No castle imagery, no official-seeming language, no Disney color palette. Independent visual identity. |
| ap_unsupported_speed_claims | Proof stats name specific cadence: "every 60 seconds" not "fastest." Latency stated as avg, not minimum. |
| ap_hidden_safety_model | No-login badge is in the first viewport, not in FAQ or footer. Official handoff note is hero-level, not buried. |
| ap_generic_saas_grid | Benefits name Disney-specific details: Be Our Guest, Space 220, 60-day window, cancellation trickle, WDW/DL parks. |
| ap_pro_overpush | Pro tier is below coverage proof and free alert form. Free is primary; Pro is positioned as natural next step after coverage discovery. |
| ap_agent_path_confusion | Agent inquiry is a single compact bar after expert section — late in page, visually tertiary, no competing with hero. |
| ap_guarantee_language | Headlines reviewed: no "get your table," no "guaranteed reservation," no "we book it." All CTAs say "alert" not "reserve." |

### 4D: Component Justification

| Component | User Lens | Business Lens | Verdict |
|---|---|---|---|
| nav-bar | Orientation, sign-in access for returning users | Brand presence, Pro plan link | Include — compact, non-competing |
| hero-headline | Immediate restaurant-specific recognition; confirms search intent | Search intent match drives paid search quality score | Include — names Be Our Guest, Space 220, CRT by name |
| hero-subheadline | Explains what Pixiedining does in one sentence | Reduces support load by setting correct expectations | Include — 25 words max, monitoring → alert → book |
| alert-setup-form | Primary conversion path; zero friction to start | Direct free signup metric; email list growth | Include — compact 4-field form in hero |
| primary-cta | Irreducible — the conversion action | Primary KPI | Include — "Start My Free Alert →" |
| no-login-badge | Eliminates primary trust blocker before commitment | Reduces abandonment on skepticism | Include — in hero viewport, adjacent to CTA |
| official-handoff-note | Sets correct expectation; prevents disappointment | Reduces chargeback risk from misunderstood product | Include — 1-2 sentences in hero panel |
| restaurant-coverage-grid | Confirms "my restaurant is covered"; creates multi-alert motivation | Differentiates from competitors; drives Pro upgrade | Include — named cards, demand labels, park toggle |
| restaurant-coverage-headline | Anchors coverage section emotionally | Coverage breadth as competitive claim | Include — "160+ Disney dining locations monitored" |
| park-tabs | Segments WDW vs. DL users for efficient scanning | Signals both-park coverage | Include — toggle, WDW default |
| how-it-works steps | Explains monitoring → alert → book flow for Segment A | Reduces refund disputes from expectation mismatches | Include — 3 steps, compact icons |
| sample-alert | Makes product concrete; reduces "is this real?" skepticism | The single strongest proof-of-concept asset | Include — mock SMS/push, Be Our Guest example |
| proof-stats-strip | Volume (2.4M alerts) and speed (avg 4 min) as credibility | Quantified proof differentiates from vague competitors | Include — 3 stats in compact bar |
| success-testimonial | Emotional validation with realistic framing (no guarantee) | Social proof drives conversion lift | Include — 1 quote, name, trip context |
| tier-comparison | Explains Free vs. Pro clearly; helps users self-select | Drives paid conversion by naming specific Pro advantages | Include — side-by-side cards |
| free-tier-card | Shows free value; reduces anxiety about commitment | Enables low-risk entry; email acquisition | Include |
| pro-tier-card | Specific Pro advantages mapped to coverage motivation | $14.99/mo or $99/yr revenue | Include — unlimited, SMS, 60s polling, auto-resume |
| free-tier-cta | Complements primary hero CTA for mid-page converters | Mid-page conversion recovery | Include |
| pro-cta-button | Paid conversion for ready-to-pay Segment B | Primary revenue action | Include |
| expert-section | Segment B comparison needs: cadence, SMS, coverage vs. competitors | Retains expert users who'd otherwise compare-shop away | Include — specific numbers, not vague claims |
| agent-inquiry-bar | Segment C routing without disrupting primary path | Agency tier pipeline | Include — compact bar, late in page |
| faq-section | Resolves lingering objections asynchronously | Reduces support contacts; improves conversion | Include — 5 items, accordion |
| footer-nav | Legal, privacy, support access | Trust signal; legal compliance | Include |

### 4E: Tension Map

```
TENSION: Coverage list density vs. emotional warmth
  Business pull: Maximum restaurant coverage breadth signals product completeness
    and domain expertise; long list proves we monitor the exact venue.
  User pull: Segment A is anxious and time-pressed; a wall of restaurant
    names feels like homework, not reassurance.
  Resolution: Named cards for top 10-12 high-demand venues with demand labels;
    "See all 160+ →" link handles the long tail. Section opens with emotional
    anchor headline, not a count/table.

TENSION: Free-first messaging vs. Pro revenue pressure
  Business pull: Pro at $14.99/mo or $99/yr is the primary revenue event;
    emphasize it early.
  User pull: Segment A explicitly will not pay before free proves legitimacy.
    Pushing paid too early causes abandonment.
  Resolution: Free CTA is primary in hero; Pro appears after coverage grid
    and proof stats — positioned as "natural next step when you need more
    restaurants," not as default. Coverage grid creates the motivation organically.

TENSION: Restaurant name specificity vs. Disney affiliation concern
  Business pull: Naming "Be Our Guest," "Space 220," "Cinderella's Royal Table"
    directly matches high-value search queries and proves domain knowledge.
  User pull: Names that sound too official could imply Disney affiliation,
    which creates trust confusion or legal exposure.
  Resolution: Restaurant names are used descriptively (the restaurants exist,
    naming them is not a trademark claim), paired with clear independent-brand
    positioning and no Disney visual identity imitation. Disclaimer in footer
    stating no Disney affiliation.

TENSION: Expert depth for Segment B vs. simplicity for Segment A
  Business pull: Expert users (Segment B) have high annual contract value
    and will pay pro upfront; they need comparison-ready data.
  User pull: Segment A is overwhelmed by polling cadence tables and
    competitor comparisons; it signals "this is complicated."
  Resolution: Expert comparison section appears late in page (after tier
    comparison), is clearly headed "For Annual Passholders & Power Users,"
    and uses specific but brief metrics — not a full competitive matrix.

TENSION: Travel agent routing vs. primary conversion focus
  Business pull: Agency tier is a high-value segment with potentially
    high contract values.
  User pull: B2B agency messaging dilutes the family-planner primary path
    and can make the page feel enterprise-heavy.
  Resolution: Agency path is a single compact bar with one headline and
    one link, placed after all primary and secondary content — Segment C
    self-selects; no one else sees it as dominant.
```

---

## Section 5: Visual Hierarchy Map

```
PRIMARY (dominant visual weight):
  1. hero-headline — The first and largest text on the page. Names specific
     restaurants. Search-intent match at a glance. Font size: ~2.75rem.
  2. alert-setup-form / primary-cta — The conversion action. Form on desktop
     right panel; CTA button above fold. Highest contrast fill on the page.
  3. restaurant-coverage-grid — The core strategy proof element. Named cards
     create a visual anchor below the fold that validates the headline claim.
  4. no-login-badge — Adjacent to primary CTA. High-priority trust signal.
     Styled to stand out within the hero without competing with the CTA.

SECONDARY (supporting):
  5. hero-subheadline — Explains the product in one sentence, just below headline.
  6. official-handoff-note — Expectation-setting, below trust badge.
  7. sample-alert — Concrete proof mock-up; high visual distinctiveness.
  8. tier-comparison cards — Side-by-side Free vs. Pro; structured, scannable.
  9. proof-stats-strip — Volume and speed; compact but quantified.
  10. how-it-works steps — 3-column workflow explanation.
  11. success-testimonial — Emotional social proof.
  12. pro-cta-button — Secondary conversion CTA; lower contrast than primary.
  13. expert-section — Late-page comparison detail for Segment B.

TERTIARY (present but recessive):
  14. nav-bar — Minimal: logo + two links. Does not compete with hero.
  15. park-tabs — WDW / DL toggle; useful but not dominant.
  16. restaurant-coverage-headline — Section anchor; moderate weight.
  17. free-tier-cta — Mid-page free CTA; secondary to hero form.
  18. agent-inquiry-bar — Single compact bar; minimal visual weight.
  19. faq-section — Accordion; text-weight only.
  20. footer-nav — Standard footer; fully recessive.
```

---

## Section 6: Component Inventory

| Component | Class | Purpose | Content Direction |
|---|---|---|---|
| nav-bar | T | Brand orientation, sign-in access, Pro nav link | Logo mark + "Pixiedining" wordmark · "Pro Plans" link · "Sign In" link |
| hero-headline | P | Restaurant-named hook; confirms search intent | "Stop missing Be Our Guest, Space 220, and Cinderella's Royal Table." (~10 words) |
| hero-subheadline | P | One-sentence product explanation | "Pixiedining monitors Disney's dining availability 24/7 and sends real-time alerts the moment your table opens — so you can book it on Disney's official site first." (~30 words) |
| no-login-badge | P | Primary trust signal — eliminates Disney account fear | Lock icon + "No Disney login required. Ever." — styled as a trust chip |
| official-handoff-note | S | Sets post-alert expectation; no booking claim | "When a table opens, you click the alert and book directly on DisneyWorld.com or Disneyland.com — we never touch your account." |
| alert-setup-form | P | Primary conversion action container | 4 fields: (1) Restaurant (search/dropdown), (2) Trip dates (date range), (3) Party size (stepper), (4) Email address. Submit = primary-cta |
| primary-cta | P | Free alert signup submission | "Start My Free Alert →" — dark fill, full-width in form panel |
| no-cc-note | T | Remove financial commitment anxiety near CTA | "No credit card required" — text below CTA |
| restaurant-coverage-headline | S | Section emotional anchor + breadth claim | "160+ Disney dining locations monitored — including the ones that sell out in seconds." |
| park-tabs | S | WDW / Disneyland filter on coverage grid | Tab: "Walt Disney World · 120+ restaurants" \| "Disneyland · 40+ restaurants" |
| restaurant-coverage-grid | P | Domain knowledge proof; search-intent validation; Pro upsell trigger | Named cards: Be Our Guest, Space 220, Cinderella's Royal Table, Topolino's Terrace (breakfast), Storybook Dining at Artist Point, Ohana, California Grill, Skipper Canteen, Akershus, EPCOT World Showcase, and more. Each card: restaurant name + park/land label + "High demand" badge on top venues |
| see-all-link | T | Long-tail coverage access | "See all 160+ restaurants →" — text link below grid |
| how-it-works-headline | S | Section anchor | "How Pixiedining works" |
| step-set-criteria | S | Step 1: user action | Icon + "Choose your restaurant, trip dates, party size, and notification channel" |
| step-we-monitor | S | Step 2: service action | Icon + "We check Disney's availability feed every 60 seconds, around the clock" |
| step-you-book | S | Step 3: post-alert action | Icon + "Alert arrives → open the link → book on Disney's official reservation page" |
| sample-alert | S | Concrete product proof | Mock notification: restaurant name "Be Our Guest", date "July 14", party size "4", time slot "6:30 PM", "Tap to book on DisneyWorld.com →". Styled as SMS/push notification card. |
| proof-stats-strip | S | Quantified trust via volume, speed, coverage | Stat 1: "2.4M alerts sent" · Stat 2: "Avg. 4 min from cancellation to alert" · Stat 3: "160+ restaurants · WDW + Disneyland" |
| success-testimonial | S | Emotional social proof, realistic framing | "I finally got Topolino's Terrace breakfast for my daughter's birthday — the alert came through at 6:14 AM and I had the reservation by 6:16." — Sarah K., Walt Disney World 2024 |
| tier-comparison-headline | S | Free vs. Pro framing | "One alert free. Unlimited when you need more." |
| free-tier-card | S | Free tier definition and entry CTA | 1 restaurant · Email alerts · Standard polling (5 min) · Single trip · Free forever for one alert |
| free-tier-cta | S | Mid-page free signup | "Start Free Alert" — outline style, below free card |
| pro-tier-card | S | Pro tier benefits and pricing | Unlimited restaurants · Email + SMS + Push · Faster polling (60 sec) · Multi-park bundles · Auto-resume · $14.99/mo or $99/yr |
| pro-cta-button | S | Paid conversion CTA | "Go Pro — $14.99/mo" with "$99/yr — save 45%" as secondary option |
| payment-reassurance | T | Risk reduction near Pro CTA | "Cancel anytime · Money-back guarantee · Stripe-secured checkout" |
| expert-section | S | Segment B: comparison-ready performance detail | "For Annual Passholders & Power Users" heading; Polling cadence comparison (Pixiedining 60s vs competitors 3-5 min); SMS delivery; coverage count vs. MouseDining, DVC Reservation Finder |
| expert-comparison-note | S | Competitive differentiation copy | Short copy on speed, SMS, coverage breadth — specific numbers, no vague "fastest" claims |
| agent-inquiry-bar | T | Segment C routing | "Managing dining reservations for multiple Disney families? Our Agency Plan handles unlimited concurrent trips. Contact us →" |
| faq-section | T | Async objection resolution | 5 accordion items: (1) Is this safe / official? (2) How fast are alerts? (3) What if a table never opens? (4) Can I use this for Disneyland? (5) How is Pixiedining different from MouseDining? |
| footer-nav | T | Legal, links, disclaimer | Privacy Policy · Terms · Contact · Supported Parks · "Pixiedining is not affiliated with or endorsed by The Walt Disney Company." |

---

## Section 7: ASCII Wireframe

```
Desktop (1440px) — 72-char representation

┌──────────────────────────────────────────────────────────────────────┐
│ [≈] Pixiedining           [Pro Plans]  [Sign In]                     │ NAV
├──────────────────────────────────────────────────────────────────────┤
│                                         ┌──────────────────────────┐ │
│  Stop missing Be Our Guest,             │  Start a free alert       │ │
│  Space 220, and Cinderella's            │ ─────────────────────     │ │
│  Royal Table.                           │  Restaurant               │ │
│                                         │  [Search restaurant... ▼] │ │
│  Pixiedining monitors Disney's dining   │                           │ │
│  availability 24/7 and alerts you the  │  Trip dates               │ │
│  moment your table opens — so you can  │  [Jul 10 → Jul 17      ]  │ │
│  book it on Disney's official site.    │                           │ │
│                                         │  Party size               │ │
│  [🔒 No Disney login required. Ever.]  │  [─  4  +              ]  │ │
│                                         │                           │ │
│  When a table opens, you click the      │  Your email               │ │
│  alert and book on DisneyWorld.com —    │  [you@example.com      ]  │ │
│  we never touch your account.           │                           │ │
│                                         │  [Start My Free Alert →]  │ │
│                                         │  No credit card required  │ │
│                                         └──────────────────────────┘ │
├──────────────────────────────────────────────────────────────────────┤
│     160+ Disney dining locations monitored —                         │ COV
│     including the ones that sell out in seconds.                     │ ERAGE
│                                                                      │
│  [Walt Disney World · 120+] [Disneyland · 40+]  ← tabs              │
│                                                                      │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │
│  │ Be Our Guest│ │  Space 220  │ │ CRT         │ │ Topolino's  │   │
│  │ Magic Kingdom│ │ EPCOT       │ │ Magic Kingdom│ │ Hollywood   │   │
│  │ ★ High demand│ │ ★ High demand│ │ ★ High demand│ │ ★ High demand│   │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘   │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │
│  │ Storybook   │ │ Ohana       │ │ California  │ │ Skipper     │   │
│  │ Dining      │ │ Polynesian  │ │ Grill · MK  │ │ Cantina     │   │
│  │ ★ High demand│ │             │ │             │ │             │   │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘   │
│                                          [See all 160+ restaurants→] │
├──────────────────────────────────────────────────────────────────────┤
│                  How Pixiedining works                               │ HOW IT
│                                                                      │ WORKS
│  ┌────────────────────┐ ┌────────────────────┐ ┌─────────────────┐  │
│  │ [1] Set criteria   │ │ [2] We monitor     │ │ [3] You book    │  │
│  │                    │ │                    │ │                 │  │
│  │ Restaurant, trip   │ │ We check Disney's  │ │ Alert arrives → │  │
│  │ dates, party size, │ │ availability feed  │ │ click to open   │  │
│  │ and notification   │ │ every 60 seconds,  │ │ Disney's site   │  │
│  │ channel.           │ │ 24/7.              │ │ and book the    │  │
│  │                    │ │                    │ │ table yourself. │  │
│  └────────────────────┘ └────────────────────┘ └─────────────────┘  │
│                                                                      │
│  ┌── Sample alert ────────────────────────────────────────────────┐  │
│  │ 🔔 Pixiedining Alert                              6:14 AM     │  │
│  │ Be Our Guest — Party of 4 · July 14               ·  ·  ·    │  │
│  │ A 6:30 PM slot just opened up!                              │  │
│  │ [Book now on DisneyWorld.com →]                              │  │
│  └────────────────────────────────────────────────────────────────┘  │
├──────────────────────────────────────────────────────────────────────┤
│  2.4M alerts sent   ·   Avg. 4 min latency   ·   160+ restaurants   │ PROOF
│                                                                      │
│  "I finally got Topolino's Terrace breakfast for my daughter's       │
│   birthday — the alert came at 6:14 AM and I had it by 6:16."       │
│   — Sarah K., Walt Disney World 2024                                 │
├──────────────────────────────────────────────────────────────────────┤
│              One alert free. Unlimited when you need more.           │ TIER
│                                                                      │
│  ┌──────────────────────────┐   ┌──────────────────────────────┐    │
│  │  FREE                    │   │  PRO · $14.99/mo or $99/yr   │    │
│  │                          │   │                              │    │
│  │  ✓ 1 restaurant          │   │  ✓ Unlimited restaurants     │    │
│  │  ✓ Email alerts          │   │  ✓ Email + SMS + Push        │    │
│  │  ✓ Standard polling      │   │  ✓ Faster polling (60 sec)   │    │
│  │    (every 5 min)         │   │  ✓ Multi-park bundles        │    │
│  │  ✓ Single trip           │   │  ✓ Auto-resume after alert   │    │
│  │                          │   │  ✓ WDW + Disneyland          │    │
│  │  [Start Free Alert]      │   │  [Go Pro — $14.99/mo →]      │    │
│  │  No credit card          │   │  Cancel anytime · Refund     │    │
│  └──────────────────────────┘   └──────────────────────────────┘    │
├──────────────────────────────────────────────────────────────────────┤
│       For Annual Passholders & Power Users                           │ EXPERT
│                                                                      │
│  Pixiedining polls every 60 seconds. Most competitors check every   │
│  3-5 minutes. SMS delivery ensures you don't miss an alert while    │
│  your phone is silenced. We monitor 160+ restaurants across both    │
│  parks — more than any comparable service.                          │
│  [Compare with MouseDining and DVC Reservation Finder →]            │
├──────────────────────────────────────────────────────────────────────┤
│  Managing reservations for multiple Disney families? See Agency Plan→│ AGENT
├──────────────────────────────────────────────────────────────────────┤
│  Frequently Asked Questions                                          │ FAQ
│  Is this safe and official? ▼                                        │
│  How fast are the alerts? ▼                                          │
│  What if a table never opens up? ▼                                   │
│  Does this work for Disneyland? ▼                                    │
│  How is Pixiedining different from MouseDining? ▼                    │
├──────────────────────────────────────────────────────────────────────┤
│  Privacy · Terms · Contact · Supported Parks                         │ FOOTER
│  Not affiliated with or endorsed by The Walt Disney Company.         │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Section 8: Responsive Behavior

```
DESKTOP (1440px, default):
  Nav: Full logo + wordmark left; "Pro Plans" and "Sign In" links right. Fixed top.
  Hero: 2-column split (55% left headline/trust, 45% right form panel).
    Form panel uses card treatment; all 4 fields + CTA visible without scrolling.
  Restaurant coverage grid: 4-column named card grid, park tab toggle above.
  How it works: 3-column equal-width steps, horizontal flow.
  Sample alert: centered, max-width 560px, mimics notification UI.
  Proof stats: 3-column stat strip, full width.
  Testimonial: centered, max-width 640px.
  Tier comparison: 2-column side-by-side cards (Free left, Pro right).
  Expert section: single-column prose block, max-width 720px, centered.
  Agent inquiry: full-width bar.
  FAQ: single-column accordion, max-width 720px, centered.
  Footer: 2-row — links then disclaimer.

TABLET (768px):
  Nav: Logo + wordmark; links collapse to icon-only or remain if they fit.
  Hero: Single column — headline, subheadline, trust badge, official handoff
    note, then form below (full-width form, all fields stacked). CTA full-width.
  Restaurant coverage grid: 3-column, park tabs remain.
  How it works: 3-column stays (steps are short enough).
  Sample alert: full width.
  Proof stats: 3-column stays.
  Tier comparison: 2-column side-by-side stays; cards narrow but legible.
  Expert section: single-column prose, full-width.
  Agent inquiry: full-width bar.
  FAQ: single-column accordion.

MOBILE (390px):
  Nav: Logo left, hamburger menu right (menu: Pro Plans, Sign In, Coverage).
    Navigation transforms to drawer on tap.
  Hero: Single column, compact spacing.
    Order: hero-headline → hero-subheadline → no-login-badge → primary-cta
    (full-width button) → official-handoff-note → then form fields below.
    CTA button appears above form fields — users tap CTA first, then form
    expands or scrolls to fields. Alternative: CTA is inline "Start alert →"
    that scrolls to the form; form fields are in the next visible block.
  Restaurant coverage grid: 2-column, scrollable. Park tabs remain.
    "See all 160+ →" link prominent.
  How it works: single-column stacked steps (1 → 2 → 3 vertically).
  Sample alert: full-width notification mock.
  Proof stats: single-column or 3-column compact (numbers stay readable).
  Tier comparison: single-column stacked — Free first, Pro below.
    Pro card has highlighted border to signal premium.
  Expert section: single-column prose, abbreviated — "Compare plans →" link.
  Agent inquiry: single-line bar, text abbreviated.
  FAQ: accordion, full-width.
  Footer: stacked links, then disclaimer.
```

---

## Section 9: Interaction Notes

```
Alert setup form:
  - Restaurant field: search-as-you-type with dropdown suggestions.
    Pre-seeded with high-demand venues. "Type a restaurant name..."
    placeholder. Selecting a restaurant highlights its card in the
    coverage grid below (visual confirmation of coverage).
  - Trip dates: date range picker. Min = tomorrow, Max = 60 days ahead
    (reflecting Disney's booking window). Range capped at 14 days.
  - Party size: stepper (−/+), range 1–12.
  - Email: standard email input with validation.
  - CTA: submitting navigates to signup/confirmation screen (not on this page).
    On error: inline field validation without page reload.

Park tab toggle (coverage grid):
  - Toggle between WDW and DL restaurant sets.
  - Animates grid content swap; no page reload.
  - Selected state: active tab has stronger border weight.

Sample alert:
  - Static preview. No interaction.
  - On mobile: full-width card; on desktop: centered max-width card.

FAQ accordion:
  - Click/tap row header to expand/collapse.
  - One item open at a time (collapse others on open).
  - Chevron icon rotates on open.

Expert comparison link:
  - "Compare with MouseDining and DVC Reservation Finder →" expands
    an in-page detail block or links to a dedicated comparison page.
  - Not implemented in wireframe — placeholder link only.

Travel agent inquiry:
  - "Contact us →" opens a contact/inquiry form (separate page or modal).

No dynamic interactions:
  - Sample alert preview is static.
  - Coverage grid cards are informational; clicking one pre-fills the
    restaurant field in the alert setup form (progressive enhancement).
```

---

## Section 10: Content Direction

```
OVERALL TONE: Warm, practical, Disney-trip-adjacent but independent.
  Specific about restaurant names and Disney mechanics. Honest about what
  Pixiedining does (alerts) and does not do (book, guarantee, affiliate).
  Reassuring without being sentimental. Direct without being cold.

SECTION-BY-SECTION:

Hero headline: (~10–14 words)
  Register: Direct, high-information, search-intent match.
  Key message: Names the specific restaurants users search for.
  Avoid: Generic "never miss a reservation again" without restaurant names.
  Example tone: "Stop missing Be Our Guest, Space 220, and Cinderella's Royal Table."

Hero subheadline: (~25–35 words)
  Register: Plain-language explanation, calm, specific.
  Key message: Monitoring → real-time alert → book on Disney's site.
  Avoid: Magical hyperbole. "Pixiedining watches dining availability for you..."

No-login badge: (~8 words + icon)
  Register: Assertive trust statement.
  Key message: No Disney account access. Ever.
  Language: "No Disney login required. Ever." — period, not a softened promise.

Official handoff note: (~20–25 words)
  Register: Precise, matter-of-fact.
  Key message: You complete the booking on Disney's official site.
  Avoid: Any language suggesting Pixiedining holds or secures the table.

Restaurant coverage section: (~12 words headline + card labels)
  Register: Confident, domain-specific.
  Key message: Named restaurants + breadth claim.
  Restaurant card labels: Use exact restaurant names + park/land location.
  Demand badge: "High demand" — not "popular," not "exclusive."

How it works: (~15 words per step)
  Register: Clear, mechanical, trust-building through specificity.
  Step 1: User-controlled setup language.
  Step 2: Specificity — "every 60 seconds" not "constantly" or "frequently."
  Step 3: Clarify user agency — "you book" not "we complete."

Sample alert: (~20 words total in notification)
  Register: Mimics actual notification format.
  Must include: restaurant name, party size, date, time slot, booking link.
  Avoid: Guarantee language. "A 6:30 PM slot opened up" not "Your table is ready."

Proof stats: (~4 words each stat)
  Register: Quantified, minimal.
  Format: Number · context phrase.
  Example: "2.4M alerts sent" / "Avg. 4 min latency" / "160+ restaurants"

Success testimonial: (~40–50 words)
  Register: Personal, specific, realistic (no guarantee framing).
  Must include: restaurant name, specific timing detail, outcome.
  Avoid: "They got us a reservation!" — Pixiedining sends alerts, users book.

Tier comparison: (feature list format, ~8 items per tier)
  Register: Functional, comparison-friendly.
  Free tier: Clearly enough for a single-restaurant trip.
  Pro tier: Each benefit named with specificity (60 sec not "faster"; SMS not "more alerts").
  Pro headline: "Unlimited when you need more" not "the best plan."

Expert section: (~50–80 words)
  Register: Technical, honest, comparison-ready.
  Must include: specific polling cadence (60 sec vs. 3-5 min), SMS channel,
  coverage count vs. named competitors.
  Avoid: "Fastest," "best," "superior" without data.

Agent inquiry bar: (~20 words)
  Register: Direct, professional.
  Key message: Multi-client capability, contact path.

FAQ: (~40–80 words per item)
  Q1: Is this safe / official? A: No Disney login, independent service, book on official site.
  Q2: How fast are alerts? A: Availability event → alert in avg. 4 min; Pro polls every 60 sec.
  Q3: What if nothing opens? A: Alert runs until you cancel it; no charge if no alert.
  Q4: Disneyland? A: Yes, 40+ Disneyland dining locations covered.
  Q5: vs. MouseDining? A: Specific comparison — polling cadence, SMS, coverage count.

Footer disclaimer:
  "Pixiedining is an independent service and is not affiliated with,
  sponsored by, or endorsed by The Walt Disney Company, Walt Disney
  Parks and Resorts, or any of their subsidiaries or affiliates."
```

---

## Section 11: Visual Acceptance Spec

### 11A: Viewports & Scenarios

```
VIEWPORTS:
  Desktop: 1440x900
  Tablet:  768x1024
  Mobile:  390x844
```

### 11B: First Viewport Composition

```
FIRST VIEWPORT — DESKTOP (1440x900):
  - hero-headline must be the largest text element visible.
  - alert-setup-form (right panel) must be fully visible with all 4 fields
    and primary-cta button above the fold.
  - no-login-badge must be visible in the left panel, below subheadline.
  - official-handoff-note must be visible in the left panel, below trust badge.
  - The restaurant coverage grid must peek at the bottom edge of the viewport,
    signaling scroll content.
  - Must not render as a hero-only full-bleed with no form visible.

FIRST VIEWPORT — MOBILE (390x844):
  - hero-headline must be the largest text element visible.
  - no-login-badge must be visible above the primary-cta button.
  - primary-cta button must be visible and full-width above or at the bottom
    of the first screen.
  - official-handoff-note must appear within the first scroll (no more than
    one thumb-scroll below the CTA).
  - Form fields may appear below the fold on mobile — the CTA scrolls to them.
```

### 11C: Layout Constraints

```
LAYOUT:
  Desktop: 2-column split hero (55/45). Restaurant coverage grid: 4-column.
    How it works: 3-column equal. Tier comparison: 2-column equal.
    All content max-width 1280px, centered.
  Tablet: Single-column hero (form stacks below headline content).
    Coverage grid: 3-column. Tier comparison: 2-column stays.
  Mobile: Single-column throughout. Coverage grid: 2-column.
    Tier comparison: Free card above Pro card (vertically stacked).

  hero-headline owns primary visual weight; alert-setup-form panel is
    a distinct visual container (card) on desktop — strong enough to
    register as a standalone action zone.
  no-login-badge must not be below the primary-cta in any viewport.
  restaurant-coverage-grid must appear above the how-it-works section.
  tier-comparison must appear after proof-stats-strip.
  expert-section must appear after tier-comparison.
  agent-inquiry-bar must appear after expert-section.
```

### 11D: Density & Rhythm

```
DENSITY:
  Mode: Low-density marketing with two compact utility zones
    (alert form panel, tier comparison cards).

  Nav: Compact — no padding waste.
  Hero section: Generous vertical padding (96px top/bottom desktop, 64px tablet,
    48px mobile). Low density — the split layout breathes.
  Restaurant coverage grid: Moderate density. Cards have internal padding;
    grid gap is visible. Section has generous top/bottom padding.
  How it works + sample alert: Moderate density. Step columns breathe;
    sample alert card is isolated with generous surrounding whitespace.
  Proof stats + testimonial: Compact strip above, generous testimonial below.
  Tier comparison: Moderate density. Cards are readable, not cramped.
  Expert section: Compact prose block — slightly higher density to signal
    technical register without breaking page rhythm.
  Agent inquiry bar: Very compact — single horizontal line.
  FAQ: Compact — accordion rows, moderate padding per item.

  Major sections use generous separation (48–96px desktop).
  Tier comparison cards use comfortable internal padding.
  Coverage grid cards use compact internal padding with clear label hierarchy.
```

### 11E: Required Stable Selectors

```
REQUIRED SELECTORS:
  #page-root            — root container
  #primary-section      — hero section
  #primary-action       — primary CTA button ("Start My Free Alert →")
  #trust-badge          — no-login trust chip
  #restaurant-coverage  — coverage grid section
  #how-it-works         — how it works section
  #sample-alert         — sample alert section / preview card
  #proof-stats          — proof stats strip
  #tier-comparison      — Free vs. Pro comparison section
  #pro-cta              — Pro CTA button
  #expert-section       — Annual Passholder / power user section
  #agent-inquiry        — travel agent inquiry bar
  #faq-section          — FAQ accordion section
```

### 11F: Non-Negotiables

- The no-login trust badge must appear in the hero viewport, not below the fold.
- The official handoff note must use explicit "DisneyWorld.com or Disneyland.com" language — not vague "official site" alone.
- Primary CTA must say "Start My Free Alert" or equivalent — not "Sign Up" or "Get Started" (must name the action).
- No guarantee language in any CTA, headline, or benefit claim.
- Restaurant names in the hero headline must be real, specific Disney dining venues.
- Coverage grid must use named restaurant cards — not generic category tiles.
- Pro pricing must state both $14.99/mo and $99/yr explicitly (not hidden behind a CTA).
- Footer disclaimer must explicitly state non-affiliation with The Walt Disney Company.

### 11G: Allowed Variation

- Exact restaurant names in the hero headline may be adjusted for legal review.
- Number of restaurants in coverage grid may vary (6–12 high-demand venues visible, more behind "see all" link).
- Proof stats figures (2.4M, 4 min, 160+) are placeholders — real data replaces them.
- The testimonial may be replaced with a different realistic user story.
- Form field order may adjust based on UX testing (restaurant first is the stated priority).
- Mobile nav may use a bottom tab bar instead of hamburger if preferred.

### 11H: Not Allowed

- A hero that leads with emotional storytelling before naming the product category and primary action.
- Hiding the no-login trust signal below the fold on any viewport.
- Using Disney's official color palette, castle imagery, or character names.
- Implying that Pixiedining can book, hold, secure, or guarantee a reservation.
- Displaying the Pro tier as visually dominant before the free tier is established.
- Placing the travel agent inquiry path before the tier comparison section.
- A coverage section that uses plain text lists or data tables instead of named visual cards.
- Any "fastest" or "best" superlative without a specific, cited benchmark.

---

## Section 12: HTML Wireframe Artifact

```
HTML WIREFRAME ARTIFACT:
  File: wireframe.coverage-confidence-strategy.html
  Components: 30 (matches Section 6 component inventory)
  Selectors: 13 (matches Section 11E required selectors)
  Status: written
```
