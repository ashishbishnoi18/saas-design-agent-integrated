# UI Spec — Pixiedining — comparison-ready-pro-strategy

---

## Section 1: Page Classification

TYPE: hybrid (marketing-dominant)

Marketing dominates — this is a pre-purchase selling page for Segment A (family planners) and Segment B (expert Disney users / Annual Passholders). The hybrid qualifier reflects that the performance/comparison section and tier table deliver internal-tool-grade information density for expert users. Marketing persuasion governs the page arc; expert comparison density is a deliberate section-level mode shift that activates mid-page for Segment B without gating Segment A's primary path.

---

## Section 2: Intake Summary

PURPOSE: Convert visitors into paying users — (a) free single-restaurant alert signups for one upcoming trip, and (b) paid Pro subscriptions ($14.99/mo or $99/yr) for unlimited restaurants, SMS, faster polling, multi-park bundles, and auto-resume. Establish credibility quickly for a skeptical audience whose trip is often once-a-year or once-in-a-lifetime.

AUDIENCE:
  Segment A — One-trip family planner: Parent or trip-planner, 6–12 months out, knows the 60-day window, has tried refreshing the Disney app, skeptical of third-party tools. Decides in under 2 minutes on legitimacy. Signs up free first, upgrades only after proof of service reality.
  Segment B — Disney superfan / Annual Passholder: Visits multiple times yearly, expert-level Disney knowledge, aware of competitors (MouseDining, DVC Reservation Finder, Touring Plans). Methodical comparison buyer. Will pay annual if convinced on polling latency, coverage breadth, and SMS support.
  Segment C — Travel agent / planner: Books dining for many client families monthly. Needs multi-trip reliability and management. Inquires before paying.

CONTEXT: Standalone marketing landing page, root of pixiedining.com. Entry: paid search ("disney dining reservation finder," "be our guest cancellation alert"), Reddit r/WaltDisneyWorld referrals, TikTok discovery. Exit: free alert signup (primary), Stripe Pro checkout (secondary), travel agent contact form (tertiary). Pre-purchase selling stage.

KEY ACTIONS:
  1. PRIMARY — Start a free single-restaurant alert (trip dates + party size + restaurant → email/push).
  2. SECONDARY — Upgrade to Pro for unlimited restaurants, SMS, faster polling, multi-park bundles.
  3. TERTIARY — Sample alert / coverage / how-it-works exploration; travel agent inquiry path.

---

## Section 3: Flow Map

FLOW: Single page (standalone), root of pixiedining.com.

```
Entry points:
  Paid search ──────────────┐
  Reddit referral ──────────┤──→  pixiedining.com  (this page)
  TikTok discovery ─────────┘
                                    │
            ┌───────────────────────┼───────────────────────┐
            ▼                       ▼                       ▼
  [/signup] Free alert       [/checkout] Pro          [/contact?agency]
  single restaurant          Stripe checkout          Travel agent inquiry
  (Primary)                  (Secondary)              (Tertiary)
                                    │
                                    ▼
                    [Disney's official reservation site]
                    (post-alert, user completes booking)
```

---

## Section 4: Decision Map

### 4A: User Decision Sequence

PAGE LEVEL:
  User's first question: "Can this safely and quickly alert me when the Disney dining reservation I want opens up?"
  Resolved by: Hero headline (task + problem clarity), no-login statement (safety), primary CTA (immediate action path), sample alert card (product proof)

SECTION LEVEL:
  Scanning for: "How does this work? Is it fast enough? Does it cover my restaurant?"
  Resolved by: How It Works 4-step flow (mental model + official handoff), trust strip (quick safety scan), coverage grid (restaurant-specific confidence), performance section (cadence numbers + notification channels)

COMPONENT LEVEL:
  Click-vs-skip decision: "Is the free alert worth signing up, and is Pro clearly worth $14.99/mo?"
  Resolved by: Inline form entry (low friction), tier comparison table with concrete rows (Pro value clarity), risk reducers adjacent to CTAs (no credit card, cancel anytime, 7-day refund)

Segment-specific decision paths:
  Segment A (Family Planner): Hero → trust strip → How It Works → Free CTA → possibly FAQ → /signup
  Segment B (Superfan): Hero scan → skims How It Works → jumps to Coverage → Performance/Comparison → Tier Table → Pro CTA or free-first
  Segment C (Travel Agent): Sees "Travel Agents" in nav → jumps to Agency section → Inquiry

### 4B: Asset And Evidence Inference

PRODUCT/OUTPUT ASSETS:
  - Real-time alert notifications (email, push, SMS on Pro)
  - Sample alert card showing restaurant, date, time slot, party size, booking link
  - Coverage list of 80+ restaurants across WDW and Disneyland parks
  - Monitoring criteria: restaurant + date range + party size + preferred time window

PROOF ASSETS:
  - Alert volume: "500,000+ alerts sent" (or accurate figure)
  - Success stories with restaurant-specific framing: "Got a Space 220 slot 3 days before our trip"
  - Polling cadence numbers: Free every 2 minutes; Pro every 30 seconds
  - Notification channels: email (Free + Pro), push (Free + Pro), SMS (Pro only)
  - Auto-resume: Pro only
  - Coverage breadth: named restaurants by park
  - Response window example: "Most cancellations on our platform are claimed within 4 minutes"

CONVERSION ASSETS:
  - Free single-restaurant alert (zero risk, no credit card)
  - Pro at $14.99/mo or $99/yr ("Save 45% annually")
  - 7-day money-back guarantee
  - Stripe payment badge
  - Visible support / contact path
  - Refund policy in FAQ and footer

NAVIGATION/SELF-SELECTION ASSETS:
  - Nav anchors: Coverage, Pricing, How It Works, Travel Agents
  - Tier comparison table rows for direct segment comparison
  - Travel agent section clearly anchored and segmented
  - Park tabs in coverage grid (WDW vs Disneyland self-select)

ACTION VS SIGNAL CLASSIFICATION:
  Actions:
    - Start free alert (primary)
    - Upgrade to Pro / Stripe checkout (secondary)
    - Inquire about travel agent tier (tertiary)
    - View sample alert (micro-action, supporting)
    - Filter coverage by park (micro-action, supporting)
  Signals:
    - No-login safety statement
    - Official Disney booking handoff explanation
    - Alert volume badge
    - Sample alert card (product proof)
    - Polling cadence numbers
    - Notification channel enumeration (email/push/SMS)
    - Restaurant coverage grid with named venues
    - Testimonials with restaurant-specific success framing
    - Payment security badge (Stripe)
    - Refund guarantee
    - "Not affiliated with Disney" disclaimer

### 4C: Strategy Defense (Search Mode)

ASSIGNED STRATEGY: comparison-ready-pro-strategy

WHY THIS STRATEGY FITS THIS INTAKE:
  The intake explicitly identifies Segment B (Annual Passholders, Reddit/Facebook users) as already knowing competitor tools — MouseDining, DVC Reservation Finder, Touring Plans. These users will not convert without specific, falsifiable performance claims: polling cadence in seconds, notification channel breakdown, restaurant coverage by name, and a direct tier comparison. The comparison-ready Pro strategy serves Segment B's methodical evaluation pattern while preserving the fast free-alert entry path for Segment A. Because the business requires paid Pro conversion and Segment B is the most likely segment to pay annual upfront, comparison-readiness maps directly to the highest-LTV revenue path, not just expert satisfaction.

  The strategy seed names "polling cadence clarity, notification channel differentiation, and coverage and unlimited monitoring value" as the three things to optimize — each maps directly to a stated Segment B decision criterion from the intake. The page leads with free alert + trust to capture Segment A, then provides a distinct expert zone (performance section + tier table) that Segment B can navigate to via anchor or natural scroll.

LOCAL OPTIMUM THIS STRATEGY RISKS:
  The shallow version of comparison-ready-Pro leads with a dense comparison table in the hero — expert mode from pixel one — which buries the free CTA, overwhelms Segment A family planners on mobile, violates hard floor hf_free_alert_visible, and makes the service look like a power-user-only tool. The comparison content becomes a wall of specs that nobody reads while the primary conversion opportunity (free signup) goes unnoticed.

HOW THIS DESIGN AVOIDS THAT LOCAL OPTIMUM:
  The page sequences: free alert + trust (first viewport) → How It Works → trust strip → coverage grid → performance comparison → tier table → testimonials → FAQ → agency. Expert comparison content lives in a dedicated section reachable via nav anchor — it is encountered naturally by Segment B after Segment A has already had their trust questions resolved. The hero contains the free CTA and safety proof; comparison content is secondary and below fold. On mobile, the performance section collapses to a 3-stat callout (expandable), so family planners on phones don't wade through cadence tables to reach the CTA.

REFERENCE CALIBRATION:
  No external references were provided. From trained structural knowledge: strong consumer utility SaaS pages in travel and alert categories (flight price trackers, appointment availability notifiers, parking spot finders) consistently place their primary task CTA in the first viewport, supported by a brief mechanism explanation and at least one trust/safety signal, before any comparison or pricing content. The weakest pages in this category either bury the free action under dense explanation or open with a comparison table that excludes casual visitors. This design targets the "clear action + layered depth" structural register: broad top of funnel (trust + free CTA) narrowing to expert detail (comparison + Pro) without abandoning family planners.

STRATEGIC DIAGNOSIS MAPPING:
  - Strategic axis: functional_immediacy: high → hero #primary-action (Start My Free Alert) visible in first viewport on all breakpoints; no gate before action
  - Strategic axis: trust_burden: high → #no-login-trust-statement inline with hero CTA; trust strip immediately below hero; FAQ first item defaults open with explicit no-login answer
  - Strategic axis: audience_sophistication: mixed → hero serves Segment A; performance + coverage sections serve Segment B; agency section serves Segment C; nav anchors enable direct jump for each
  - Strategic axis: visual_posture: polished_utility → warm but concrete; proof over decoration; comparison table uses numbers not vague checkmarks alone; sample alert card shows real product output
  - Strategic axis: content_depth: layered → hero is task + trust → how-it-works → trust strip → coverage → expert comparison → tier table → testimonials → FAQ → agency
  - Audience: Segment B methodical comparison buyer → dedicated #performance-section with cadence table and notification channels; #pro-comparison-table with row-level specificity
  - Audience: Segment A trust-first family planner → trust strip below hero; FAQ covering no-login, Disney handoff, no-guarantee
  - Design directive: proof_strategy → #sample-alert-card in hero right panel (desktop) or below CTA (mobile); alert volume badge; restaurant names used in coverage and testimonials
  - Design directive: explanation_strategy → How It Works 4-step (set criteria → monitor → alert fires → book on Disney's official site) positioned before expert content
  - Decision step 1 (product clarity) → hero headline + subhead names Disney dining cancellation problem and monitoring mechanism
  - Decision step 2 (safety) → no-login statement + official handoff both visible in hero subhead and trust strip
  - Decision step 3 (speed) → polling cadence table in #performance-section; 30s vs 2min vs competitors
  - Decision step 4 (free vs Pro) → #pro-comparison-table with concrete rows covering all stated Pro features
  - Decision step 5 (specialized use case) → #travel-agent-section with multi-client messaging + inquiry path

FIRST VIEWPORT OBLIGATION:
  Diagnosis requires: "Within seconds, visitors must understand that Pixiedining watches Disney dining cancellations, alerts them in real time, never needs their Disney login, and lets them start one free alert immediately."

  First-fold components satisfying this obligation (desktop 1440px):
    - Hero headline: task + problem statement (dominant, P)
    - Hero subhead: mechanism + no-login + official handoff (2 sentences, S)
    - #primary-action CTA button: "Start My Free Alert" (P, dark fill, large)
    - #no-login-trust-statement: "No credit card · No Disney login · You book on Disney's site" (inline below CTA)
    - #sample-alert-card: right panel — restaurant name, date, time, party size, "Book on Disney's site →" (product proof, S)
    - Alert volume badge: "500,000+ alerts sent" (in hero or below card, S)

  First-fold components satisfying this obligation (mobile 390px):
    - Hero headline (scaled, dominant, fills ~30% viewport height)
    - Hero subhead (2 lines max, S)
    - #primary-action CTA (full-width button, P)
    - #no-login-trust-statement (1 line, below CTA, S)
    - Alert volume badge or trust micro-stat (immediately below, within 1.2 viewports)
    - Sample alert card: below fold — accessible by short scroll

HARD FLOOR COVERAGE:
  - hf_free_alert_visible → #primary-action ("Start My Free Alert") visible in first viewport at all breakpoints; no explanatory gate before action
  - hf_no_login_trust → #no-login-trust-statement inline with hero CTA (first viewport); repeated in trust strip and FAQ first item; not buried in fine print
  - hf_no_guaranteed_booking → headlines, CTAs, and proof claims use "alert" / "notify" / "monitor" only; no "get your table," "secure," "guarantee," or "book for you"; FAQ item explicitly states "We don't guarantee reservations — we notify you when a slot appears"; copy review covers all headline and CTA text
  - hf_official_handoff → hero subhead + How It Works step 4 + footer disclaimer make explicit that users complete booking on Disney's official reservation site; "Book on Disney's site →" in sample alert card reinforces this
  - hf_segment_self_selection → Nav "Travel Agents" anchor for Segment C; coverage grid and performance section serve Segment B's research needs; agency section clearly separated late in page
  - hf_mobile_first_task → mobile: full-width #primary-action above fold, trust micro-copy below CTA, tier table renders as stacked cards (not horizontal overflow), performance section collapses to 3-stat callout with expand option
  - hf_pro_value_specificity → #pro-comparison-table has concrete rows: Restaurants (1 vs Unlimited), Polling cadence (2 min vs 30 sec), Email alerts (✓ vs ✓), Push notifications (✓ vs ✓), SMS alerts (— vs ✓), Auto-resume (— vs ✓), Multi-park bundles (— vs ✓), Price (Free vs $14.99/mo or $99/yr)

ANTI-PATTERN AVOIDANCE:
  - ap_magic_before_task → hero headline is task-specific ("Stop refreshing. Get alerted when your Disney table opens."); emotional warmth comes from trip-context framing in subhead, not whimsy-first opening; no sparkle, castle, or "magic" copy in first viewport
  - ap_disney_clone_branding → no castle imagery, no Disney blue/red/gold brand palette, no "officially" adjacent language; visual register is warm travel-utility with independent identity; "Not affiliated with Disney" in footer
  - ap_unsupported_speed_claims → cadence stated as specific intervals (30 seconds for Pro, 2 minutes for Free, 3–10 minutes for most alternatives); no "fastest" or "instant" without the number; claims grounded in what the product actually delivers
  - ap_hidden_safety_model → no-login statement appears in first viewport inline with CTA (not below fold, not in fine print); trust strip reinforces it immediately below hero; FAQ first item defaults open
  - ap_generic_saas_grid → proof section names specific Disney restaurants (Be Our Guest, Space 220, Cinderella's Royal Table); performance section gives actual cadence numbers; How It Works references Disney's 60-day window and cancellation pool by name; domain specificity is visible throughout
  - ap_pro_overpush → free alert CTA is primary and first; Pro is introduced in the tier comparison section only after trust strip and How It Works are resolved; Pro CTA appears in the comparison table, not competing with free CTA in hero
  - ap_agent_path_confusion → agency section appears after testimonials, never above fold; no agency language in hero or How It Works; Nav "Travel Agents" anchor provides direct access for Segment C without polluting primary flow
  - ap_guarantee_language → CTA text: "Start My Free Alert" (not "Get Your Table"); FAQ Q: "Do you guarantee I'll get a reservation? No — Pixiedining alerts you when a slot appears. You book it yourself on Disney's site. We cannot hold or secure tables."

### 4D: Component Justification

| Component | User Lens | Business Lens | Verdict |
|-----------|-----------|---------------|---------|
| Sticky nav bar | Lets expert users jump to Coverage/Pricing; lets agents jump to their section | Reduces bounce by providing fast navigation | Include — T; 4 anchors + Log In + CTA; low density |
| Hero headline | Answers "what is this" in 2 seconds; names the specific pain (refreshing for cancellations) | First impression drives 60-second decision | Include — P; must name Disney dining cancellation problem |
| Hero subhead | Explains mechanism + safety + official handoff in 2 sentences | Resolves primary trust blocker without requiring scroll | Include — S; must include no-login + official handoff explicitly |
| Primary CTA button | Clear low-risk entry point (free, no card) | Primary conversion event | Include — P; "Start My Free Alert" |
| Inline trust micro-copy | Reduces skepticism at CTA | Reduces free-alert abandonment | Include — S; 1 line max |
| Sample alert card | Shows what users actually receive; reduces uncertainty about product reality | Proof of product; increases free signup confidence | Include — S; right panel desktop; below fold mobile |
| Alert volume badge | Social proof of legitimacy | Trust signal for Segment A; reduces abandonment | Include — S; in hero or immediately adjacent |
| Trust strip (4 items) | Quick scan of key safety claims without scrolling | Reduces scroll requirement to resolve trust questions | Include — S; immediately below hero |
| How It Works (4 steps) | Builds correct mental model; resolves "what happens after alert" anxiety | Reduces support burden; sets accurate expectations; prevents overclaim | Include — S; step 4 must explicitly name Disney's official site |
| Restaurant coverage grid | Validates that user's specific restaurant is monitored | Search-intent match; motivates upgrade (unlimited restaurants in Pro) | Include — S; park-organized, named venues |
| Performance/comparison section | Answers Segment B's cadence and channel validation questions | Differentiates Pro vs competitors; drives annual subscription conversion | Include — S; core expert layer of this strategy |
| Polling cadence table | Gives Segment B the specific number they need to compare | 30-second Pro cadence is primary differentiator vs alternatives | Include — S; numbers, not adjectives |
| Notification channels grid | Segment B needs to know SMS is Pro-only | SMS is an explicit Pro differentiator; drives upgrade | Include — S; 3-column: Email / Push / SMS with tier labels |
| Tier comparison table | Lets all segments evaluate Free vs Pro in one view | Primary upgrade conversion tool; structured Pro justification | Include — P (in upgrade section); concrete feature rows |
| Pro CTA button | Secondary conversion action for ready-to-pay users | Pro revenue; annual plan LTV | Include — S; in comparison table only |
| Travel agent row/link in table | Segment C anchor to inquiry path | Agency inquiry → consultation → higher LTV | Include — T; tertiary row at table bottom |
| Testimonials (3 cards) | Emotional + specific proof; realistic framing | Social proof reduces final hesitation; restaurant-specific builds domain trust | Include — S; 3 cards; each names a restaurant and outcome |
| FAQ (6–8 items) | Resolves safety and process anxiety | Reduces tickets; addresses no-login, no-guarantee, and refund questions | Include — S; first item defaults open |
| Travel agent section | Segment C self-selection and inquiry path | Agency inquiry → consultation → team plan revenue | Include — T; after testimonials; clearly segmented |
| Final CTA section | Re-engagement after deep scroll | Second conversion opportunity for users who read thoroughly | Include — S; repeat free CTA + risk reducers |
| Footer | Legal, privacy, disclaimer, support contact | Legal compliance; non-affiliation disclaimer | Include — T; compact |

### 4E: Tension Map

TENSION: Expert comparison content vs. family planner clarity
  Business pull: Segment B needs polling cadence numbers, notification channels, and coverage breadth to justify paying — they are the highest-LTV segment
  User pull: Segment A will bounce if a complex comparison table is the first thing they see; they need trust and clarity before technical detail
  Resolution: Expert content is sequenced after trust strip + How It Works. It occupies its own anchored section. On mobile, the performance section collapses to 3 key stats with an expand toggle. Segment A encounters expert content only after their primary questions are resolved and can skip it entirely.

TENSION: No-login safety claim vs. restaurant name specificity
  Business pull: Naming Be Our Guest, Space 220, Cinderella's Royal Table creates search-intent match and proves domain depth
  User pull: Prominent use of Disney restaurant names could imply affiliation or privileged access
  Resolution: Restaurant names are accurate references to publicly bookable venues. Copy frames Pixiedining as "monitoring Disney's official availability feed." Footer disclaimer: "Not affiliated with or endorsed by The Walt Disney Company." No Disney logos or brand marks used.

TENSION: Pro upgrade urgency vs. "prove it first" free path
  Business pull: Annual revenue requires Pro conversion; Segment B is most likely to pay immediately
  User pull: Segment A will not pay before the service proves itself; pushing Pro too early is counterproductive
  Resolution: Free alert CTA is primary in hero and final CTA section. Pro is introduced only after trust strip and How It Works are resolved. The comparison table presents both options; Pro CTA does not dominate the free CTA position.

TENSION: Travel agent segment vs. primary conversion clarity
  Business pull: Agency tier is high LTV; Segment C deserves a credible inquiry path
  User pull: Agency language in the hero dilutes the family planner message
  Resolution: Agency section appears after testimonials. Nav "Travel Agents" anchor provides direct access for Segment C. No agency copy appears above the fold.

TENSION: Proof specificity vs. overclaim risk
  Business pull: Specific numbers (30-second polling, 500,000+ alerts) build expert confidence
  User pull: Any claim that sounds like a performance guarantee creates legal or trust risk
  Resolution: All performance claims are framed as operational specifications ("Pro checks every 30 seconds") not outcome guarantees. FAQ explicitly clarifies Pixiedining notifies but does not book.

---

## Section 5: Visual Hierarchy Map

PRIMARY (dominant visual weight):
  1. Hero headline — Most important text on the page; task clarity in seconds; largest type, highest contrast
  2. Primary CTA button ("Start My Free Alert") — Highest interactive priority; dark-fill large button in hero
  3. Tier comparison table header row (Free / Pro) — Dominant visual weight in the upgrade section

SECONDARY (supporting):
  4. Hero subhead — Mechanism + safety + handoff; scannable
  5. No-login trust statement — Inline with CTA; resolves primary trust blocker
  6. Sample alert card — Right-panel proof; shows product output
  7. How It Works step headers — 4 numbered steps; directional flow
  8. Polling cadence callout ("Pro: every 30 seconds") — Largest text in performance section; key expert differentiator
  9. Restaurant coverage section header — Signals domain breadth
  10. Trust strip items — 4 quick-scan claims; icon + text treatment
  11. Testimonial cards — Social proof; card-based; realistic restaurant framing
  12. Pro upgrade CTA — Secondary conversion; within comparison table

TERTIARY (present but recessive):
  13. Sticky nav links — Utility navigation; does not compete
  14. Alert volume badge — Supporting stat
  15. FAQ items (collapsed) — Accordion; present for seekers; recessive by default
  16. Travel agent section — Clearly segmented; low visual weight
  17. Risk reducer micro-copy under CTAs — Reduces friction; recessive
  18. Footer — Legal + disclaimer; minimum visual weight

---

## Section 6: Component Inventory

| Component | Class | Purpose | Content Direction |
|-----------|-------|---------|------------------|
| Sticky nav bar | T | Navigation + CTA shortcut | Logo left; anchors: Coverage · Pricing · How It Works · Travel Agents; Log In; "Start Free Alert" CTA right |
| Hero headline | P | Task + problem clarity in 2 seconds | 10–14 words; e.g., "Stop refreshing. Get alerted the moment your Disney table opens up." |
| Hero subhead | S | Mechanism + safety + official handoff | ~30–40 words; monitoring cadence, no-login, official Disney booking handoff |
| Primary CTA button | P | Start free alert signup | "Start My Free Alert" — dark fill, large (min 48px height) |
| Inline trust micro-copy | S | Reduce CTA hesitation | "No credit card · No Disney login · You book on Disney's site" |
| Sample alert card | S | Show product output | Card: restaurant (Be Our Guest), date, time, party size, "Book on Disney's site →" |
| Alert volume badge | S | Social proof of legitimacy | "500,000+ alerts sent" — specific number |
| Trust strip | S | Quick-scan safety claims | 4 icons + labels: "No Disney login" · "Official Disney booking" · "80+ restaurants" · "7-day guarantee" |
| How It Works header | S | Section orientation | "How Pixiedining works" |
| How It Works: Step 1 | S | Set criteria | "Tell us your restaurant, trip dates, party size, and preferred times." |
| How It Works: Step 2 | S | Monitoring explanation | "We check Disney's availability feed every 30–120 seconds, 24 hours a day." |
| How It Works: Step 3 | S | Alert fires | "The moment a matching slot appears, you get an instant alert — email, push, or SMS." |
| How It Works: Step 4 | S | Official handoff (critical) | "Click the link in your alert and complete your reservation on Disney's official site. We never book on your behalf." |
| Coverage section header | S | Coverage breadth signal | "We cover 80+ Disney restaurants — find yours" |
| Coverage park tabs | S | Park-level navigation | Tabs: Magic Kingdom · EPCOT · Hollywood Studios · Animal Kingdom · Disney Springs · Disneyland |
| Coverage restaurant grid | S | Specific venue confidence | Named cards: Be Our Guest, Space 220, Cinderella's Royal Table, Storybook Dining, Topolino's Terrace, Sci-Fi Dine-In, Oga's Cantina, Biergarten; 4-col desktop |
| Coverage expand link | T | Full restaurant list access | "View all 80+ restaurants →" |
| Performance section header | S | Expert validation zone signal | "Alert speed, coverage, and notifications — how we compare" |
| Polling cadence callout | S | Core expert differentiator | "Pro checks every 30 seconds. Free checks every 2 minutes. Most alternatives: every 3–10 minutes." |
| Polling cadence table | S | Comparison-ready data | 3-row: Pixiedining Pro / Pixiedining Free / Most alternatives; cadence column |
| Notification channels grid | S | Channel differentiation | 3 columns: Email (Free+Pro) / Push (Free+Pro) / SMS (Pro only) |
| Performance context note | T | Honest speed framing | "Cancellation slots typically close within 2–5 minutes. Faster polling gives you more time to act." |
| Pro comparison table | P | Upgrade conversion | 3-column: Feature / Free / Pro; rows: Restaurants, Polling cadence, Email, Push, SMS, Auto-resume, Multi-park, Price |
| Free plan column | S | Free value and limits | 1 restaurant, 2-min polling, email+push, no SMS, no auto-resume, no multi-park — Free |
| Pro plan column | S | Pro incremental value | Unlimited restaurants, 30-sec polling, email+push+SMS, auto-resume, multi-park — $14.99/mo or $99/yr |
| Free plan CTA in table | S | Free path within comparison | "Start Free Alert" — outline style |
| Pro plan CTA in table | S | Pro upgrade path | "Upgrade to Pro — $14.99/mo" — dark fill |
| Annual savings note | T | Annual plan motivation | "Or $99/yr — save 45%" |
| Travel agent row in table | T | Segment C anchor | "Managing multiple trips? Contact us about our Agency Plan →" |
| Testimonials header | S | Section orientation | "What Disney families are saying" |
| Testimonial card 1 | S | Segment A success | Family planner; Be Our Guest; alerted at 11pm, booked in 2 minutes |
| Testimonial card 2 | S | Segment B expert story | Annual Passholder; switched from competitor; Space 220; 30-second polling cited |
| Testimonial card 3 | S | Multi-restaurant user | Topolino's Terrace; Pro unlimited monitoring |
| FAQ header | S | Section orientation | "Common questions" |
| FAQ: no-login | S | Primary trust (defaults open) | Q: "Does Pixiedining log into my Disney account?" A: Explicit no |
| FAQ: legality | S | Safety question | Q: "Is this allowed?" A: Direct, honest |
| FAQ: no-guarantee | S | Hard floor compliance | Q: "Do you guarantee I'll get a reservation?" A: Explicit no |
| FAQ: miss alert | S | Practical concern | Q: "What if I miss the alert?" A: Response window + auto-resume |
| FAQ: auto-resume | S | Pro feature explanation | Q: "What is auto-resume?" A: Re-activates after firing |
| FAQ: refund | S | Commitment hesitation | Q: "What's the refund policy?" A: 7-day money-back |
| Travel agent section header | T | Segment C self-selection | "Managing dining for multiple Disney clients?" |
| Travel agent body copy | T | Agency value | Multi-trip monitoring, volume, reliability; 2–3 sentences |
| Travel agent inquiry CTA | T | Segment C path | "Inquire about the Agency Plan →" — outline, low weight |
| Final CTA header | S | Re-engagement | "Ready to stop refreshing?" |
| Final CTA button | S | Repeat primary action | "Start My Free Alert" — dark fill |
| Final CTA risk reducers | T | Reduce final hesitation | "No credit card · No Disney login · 7-day money-back guarantee" |
| Footer | T | Legal + disclaimer + security | Privacy · Terms · Contact · Refund · non-affiliation disclaimer · Stripe badge |

---

## Section 7: ASCII Wireframe

Desktop (1440px):

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [LOGO]  Coverage · Pricing · How It Works · Travel Agents  [Log In] [Start Free Alert] │
├─────────────────────────────────────────────────────────────────────────┤
│  HERO SECTION  (generous padding)                                       │
│  ┌──────────────────────────────────────┐  ┌───────────────────────┐  │
│  │                                      │  │  SAMPLE ALERT CARD    │  │
│  │  Stop refreshing. Get alerted the    │  │  ┌─────────────────┐  │  │
│  │  moment your Disney table opens up.  │  │  │ [🔔] Available  │  │  │
│  │                                      │  │  │ Be Our Guest    │  │  │
│  │  We check Disney's availability      │  │  │ Dec 14 · 6:30pm │  │  │
│  │  every 30–120 seconds and alert      │  │  │ Party of 4      │  │  │
│  │  you instantly — email, push, SMS.   │  │  │ [Book on →]     │  │  │
│  │  No Disney login. You book on        │  │  └─────────────────┘  │  │
│  │  Disney's official site.             │  │  500,000+ alerts sent │  │
│  │                                      │  └───────────────────────┘  │
│  │  [  Start My Free Alert  ]           │                             │
│  │  No credit card · No Disney login ·  │                             │
│  │  You book on Disney's site           │                             │
│  └──────────────────────────────────────┘                             │
├─────────────────────────────────────────────────────────────────────────┤
│  TRUST STRIP                                                            │
│  [✓] No Disney login   [✓] Book on Disney's  [✓] 80+ restaurants       │
│      required              official site          covered               │
│  [✓] 7-day money-back guarantee                                         │
├─────────────────────────────────────────────────────────────────────────┤
│  HOW IT WORKS                                                           │
│  ┌──────────┐ → ┌──────────┐ → ┌──────────┐ → ┌──────────┐          │
│  │1. Set    │   │2. We     │   │3. Alert  │   │4. Book on│          │
│  │criteria  │   │monitor   │   │fires:    │   │Disney's  │          │
│  │rest/dates│   │every     │   │email,    │   │official  │          │
│  │party/    │   │30–120s   │   │push,     │   │site —    │          │
│  │times     │   │24/7      │   │or SMS    │   │not by us │          │
│  └──────────┘   └──────────┘   └──────────┘   └──────────┘          │
├─────────────────────────────────────────────────────────────────────────┤
│  RESTAURANT COVERAGE                                                    │
│  We cover 80+ Disney restaurants — find yours                          │
│  [Magic Kingdom] [EPCOT] [Hollywood Studios] [Animal Kingdom]          │
│  [Disney Springs] [Disneyland]                                         │
│  ┌──────────┐┌──────────┐┌──────────┐┌──────────┐                    │
│  │Be Our    ││Space 220 ││Cinderella││Storybook │                    │
│  │Guest     ││          ││Royal Tbl ││Dining    │                    │
│  └──────────┘└──────────┘└──────────┘└──────────┘                    │
│  ┌──────────┐┌──────────┐┌──────────┐┌──────────┐                    │
│  │Topolino's││Sci-Fi    ││Oga's     ││Biergarten│                    │
│  │Terrace   ││Dine-In   ││Cantina   ││          │                    │
│  └──────────┘└──────────┘└──────────┘└──────────┘                    │
│                            [View all 80+ restaurants →]                │
├─────────────────────────────────────────────────────────────────────────┤
│  PERFORMANCE & COMPARISON                                               │
│  Alert speed, coverage, and notifications — how we compare             │
│                                                                         │
│  Pro checks every 30 seconds. Free checks every 2 minutes.             │
│  ┌──────────────────────┬────────────────────────────────┐            │
│  │ Pixiedining Pro      │ Every 30 seconds               │            │
│  │ Pixiedining Free     │ Every 2 minutes                │            │
│  │ Most alternatives    │ Every 3–10 minutes             │            │
│  └──────────────────────┴────────────────────────────────┘            │
│  Cancellation slots typically close in 2–5 min. Faster = more time.   │
│                                                                         │
│  NOTIFICATION CHANNELS                                                  │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐          │
│  │  Email         │  │  Push          │  │  SMS           │          │
│  │  Free + Pro    │  │  Free + Pro    │  │  Pro only      │          │
│  └────────────────┘  └────────────────┘  └────────────────┘          │
├─────────────────────────────────────────────────────────────────────────┤
│  TIER COMPARISON                                                        │
│  ┌──────────────────────┬──────────────────┬─────────────────────┐   │
│  │ Feature              │ Free             │ Pro                 │   │
│  ├──────────────────────┼──────────────────┼─────────────────────┤   │
│  │ Restaurants          │ 1                │ Unlimited           │   │
│  │ Polling cadence      │ Every 2 minutes  │ Every 30 seconds    │   │
│  │ Email alerts         │ ✓                │ ✓                   │   │
│  │ Push notifications   │ ✓                │ ✓                   │   │
│  │ SMS alerts           │ —                │ ✓                   │   │
│  │ Auto-resume          │ —                │ ✓                   │   │
│  │ Multi-park bundles   │ —                │ ✓                   │   │
│  ├──────────────────────┼──────────────────┼─────────────────────┤   │
│  │ Price                │ Free             │ $14.99/mo · $99/yr  │   │
│  │                      │[Start Free Alert]│[Upgrade to Pro]     │   │
│  └──────────────────────┴──────────────────┴─────────────────────┘   │
│  Agents & planners: multi-client monitoring  [Inquire about Agency →] │
├─────────────────────────────────────────────────────────────────────────┤
│  TESTIMONIALS  What Disney families are saying                          │
│  ┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐ │
│  │"Got a Be Our Guest │ │"Switched from Mouse│ │"Monitoring 6 client│ │
│  │ slot 3 days before │ │ Dining. 30-second  │ │ trips on Pro. It's │ │
│  │ trip. Alert 11pm,  │ │ polling made the   │ │ the only tool I    │ │
│  │ booked in 2 min."  │ │ difference on      │ │ use for dining."   │ │
│  │ — Sarah M., FL     │ │ Space 220."        │ │ — Travel Agent     │ │
│  └────────────────────┘ └────────────────────┘ └────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────┤
│  FAQ  Common questions                                                  │
│  ▼ Does Pixiedining log into my Disney account?  [defaults open]        │
│    No. We never request or store Disney credentials. We monitor         │
│    Disney's publicly available dining availability feed.                │
│  ► Is this allowed / against Disney's terms?                            │
│  ► Do you guarantee I'll get a reservation?                             │
│  ► What if I miss the alert?                                            │
│  ► What is auto-resume?                                                 │
│  ► What's the refund policy?                                            │
├─────────────────────────────────────────────────────────────────────────┤
│  TRAVEL AGENTS                                                          │
│  Managing dining for multiple Disney clients?                           │
│  [body: multi-trip monitoring, volume, reliability, 2-3 sentences]     │
│  [Inquire about the Agency Plan →]                                      │
├─────────────────────────────────────────────────────────────────────────┤
│  FINAL CTA  Ready to stop refreshing?                                   │
│  [ Start My Free Alert ]                                                │
│  No credit card · No Disney login · 7-day money-back guarantee         │
├─────────────────────────────────────────────────────────────────────────┤
│  FOOTER                                                                 │
│  [Logo]  Privacy Policy · Terms · Contact · Refund Policy              │
│  Not affiliated with or endorsed by The Walt Disney Company.           │
│  Restaurant names used for descriptive purposes only.                  │
│  [Stripe badge] [Secure badge]                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Section 8: Responsive Behavior

DESKTOP (1440px, default):
  - Sticky nav: logo left, 4 anchor links, Log In + CTA right
  - Hero: 60/40 split — left text block (headline, subhead, CTA, micro-copy), right sample alert card + badge
  - Trust strip: 4-column horizontal, icon + text each
  - How It Works: 4-column horizontal with directional arrows
  - Coverage: Park tabs above 4-column restaurant grid; "View all" link below
  - Performance: Cadence table (3 rows) + 3-column notification channels
  - Tier comparison: Full 3-column table with CTA row
  - Testimonials: 3-column card grid
  - FAQ: Accordion, first item expanded
  - Travel agent: Single contained column
  - Final CTA: Centered, constrained width
  - Footer: Single row

TABLET (768px):
  - Nav: Logo + collapsed or scrollable compact nav; CTA button persists
  - Hero: Stacked — text block full-width above; sample alert card below, reduced size
  - Trust strip: 2×2 grid
  - How It Works: 2+2 layout (2 steps per row)
  - Coverage: 3-column grid; park tabs remain
  - Performance: Cadence table remains (compressed); notification channels remain 3-column
  - Tier comparison: Full table, compressed columns; CTAs stacked within cells
  - Testimonials: 2-column grid, third card below
  - FAQ: Accordion unchanged; touch targets preserved
  - Footer: 2-row stacked

MOBILE (390px):
  - Nav: Logo left, hamburger right; CTA in drawer or persistent bottom bar
  - Hero: Full-width stacked; headline dominant; subhead 2–3 lines; CTA full-width; trust micro-copy 1 line; alert badge; sample alert card below fold
  - Trust strip: 2 items visible at top; remaining 2 below; compact
  - How It Works: Vertical stack of 4 steps with step numbers; compact cards
  - Coverage: Single-column list; park tabs scroll horizontally; "View all" link
  - Performance: Collapses to 3-stat callout (Pro 30s · SMS Pro only · 80+ restaurants); full table behind "See full comparison →" expand toggle; notification channels: 3 compact rows
  - Tier comparison: Stacked cards — Free card above, Pro card below; each has its CTA; no horizontal overflow
  - Testimonials: 2 cards visible; third via scroll
  - FAQ: Accordion; 44px tap targets minimum
  - Travel agent: Single-column compact — "Travel agent? Inquire →" minimal
  - Final CTA: Full-width button + 1-line risk reducer
  - Footer: Stacked, compact

---

## Section 9: Interaction Notes

- FAQ accordion: First item ("Does Pixiedining log into my Disney account?") defaults open on page load. All others collapsed. Click/tap toggles.
- Coverage park tabs: Client-side filter. Default: "All" or Magic Kingdom. No page reload.
- Performance section (mobile): "See full comparison →" expand toggle reveals cadence table from the 3-stat callout.
- Tier comparison table (mobile): Renders as two stacked cards (Free card above, Pro card below). Feature rows within each card; "View all features" disclosure for compact display.
- Sticky nav CTA: Smooth-scrolls to hero CTA and briefly highlights the button.
- "View all 80+ restaurants →": Inline expand via accordion or navigates to /coverage.
- Sample alert card: Static mockup. On mobile, renders below CTA and trust micro-copy.
- Alert volume badge: Static display, updated server-side.
- Travel agent inquiry CTA: Links to /contact?type=agency or triggers a contact modal.
- Pro CTA in comparison table: Links to /checkout?plan=pro (Stripe).
- Free alert CTAs (hero + final): Links to /signup or triggers inline form (restaurant + dates + party size + email/push).
- No dynamic interactions required for initial page state — all above-fold content visible on first paint.

---

## Section 10: Content Direction

OVERALL TONE: Warm, practical, reassuring. Trip-planning adjacent without vacation storytelling. Specific about what Pixiedining does (monitors, alerts) and explicit about what it does not do (book, log in, guarantee). Emotionally acknowledges the trip matters; functionally is direct and honest. Conversational, slightly urgent, grounded in real Disney specifics.

SECTION-BY-SECTION:

- Hero headline: 10–14 words. Names the user's specific pain (refreshing) and the solution (alert). Example: "Stop refreshing. Get alerted the moment your Disney table opens up." Avoid: "magical," "dreams," "pixie dust."

- Hero subhead: 30–40 words. Mechanism + no-login + official handoff. Specific about cadence and channels. Example: "We check Disney's availability feed every 30–120 seconds and alert you the moment your restaurant and time open up — by email, push, or SMS. No Disney login. You book on Disney's official site."

- Inline trust micro-copy: 10–15 words. Three facts separated by dots: no credit card, no Disney login, you book on Disney's site.

- Sample alert card: Utility style. Restaurant name (Be Our Guest preferred), date, time, party size, "Book on Disney's site →" CTA. No adjectives. This is proof of product output.

- Alert volume badge: Specific number. "500,000+ alerts sent." No vague quantifiers.

- Trust strip: 4 items, 5–7 words each. Order: safety first → booking flow → coverage → guarantee.

- How It Works: 4 steps, ~15–20 words each. Step 4 must name "Disney's official reservation site" and state Pixiedining does not book. No magic language. Procedural, accurate.

- Coverage section: Restaurant names are the content. Park groupings as tab labels. Tagline: "We cover 80+ Disney restaurants. Your table is probably on the list."

- Performance section: Lead with the number (30 seconds). Context (most tools: 3–10 minutes). Notification channels with tier labels. Factual. No "fastest" without the backing number. Include honest context note.

- Tier comparison table: Feature labels are concrete nouns. Price specific ($14.99/mo, $99/yr). Annual savings: "Save 45% with annual."

- Testimonials: 2–3 sentences each. Name the restaurant and outcome. Realistic framing. Include Segment B testimonial naming competitor switch. Include Segment C-adjacent multi-restaurant monitoring.

- FAQ answers: Direct, first-person, honest. First answer (no-login) unambiguous. No-guarantee answer equally explicit.

- Travel agent section: 2–3 sentences. Name multi-client monitoring, volume, reliability. No jargon.

- Footer disclaimer: "Pixiedining is not affiliated with, endorsed by, or sponsored by The Walt Disney Company. Restaurant names are used for descriptive purposes only to identify publicly available dining venues."

---

## Section 11: Visual Acceptance Spec

### 11A: Viewports & Scenarios

VIEWPORTS:
- Desktop: 1440x900
- Tablet: 768x1024
- Mobile: 390x844

### 11B: First Viewport Composition

FIRST VIEWPORT (desktop 1440x900):
- Hero headline visible, dominant, legible before scroll.
- #primary-action ("Start My Free Alert") visible before scroll.
- #no-login-trust-statement visible before scroll (inline under CTA).
- #sample-alert-card visible in right panel before scroll.
- At least one proof cue (alert volume badge or sample alert card) visible before scroll.
- Trust strip peeks below fold by moderate amount.
- Must not render as branding-only hero with no task clarity or CTA.

FIRST VIEWPORT (mobile 390x844):
- Hero headline visible and dominant; approximately 25–35% of viewport height.
- #primary-action CTA full-width, visible before scroll.
- #no-login-trust-statement visible before scroll (1 line below CTA).
- Alert volume badge or trust strip first item visible within 1.2 viewports.

### 11C: Layout Constraints

LAYOUT:
- Desktop hero: 60/40 column split — text block left (larger), sample alert card right.
- Trust strip: 4-column horizontal desktop; 2×2 tablet; 2-per-row mobile.
- How It Works: 4-column horizontal desktop; 2×2 tablet; single-column vertical mobile.
- Coverage grid: 4-column desktop; 3-column tablet; 1-column mobile.
- Tier comparison: Full 3-column table desktop and tablet; stacked Free/Pro cards mobile.
- Performance: Table + 3-col channels desktop; 3-stat callout + expand toggle mobile.
- #primary-action owns highest interactive visual weight in hero; Pro CTA appears only in comparison table.
- Travel agent section must appear below testimonials and never above the tier comparison.

### 11D: Density & Rhythm

DENSITY:
- Mode: moderate hybrid (marketing warmth + expert-detail sections)
- Hero: low-density marketing — generous padding, single idea per panel
- Trust strip: compact — 44–48px height per item; icon + label
- How It Works: moderate — step cards with comfortable padding and breathing room
- Coverage grid: moderate — named cards, comfortable but efficient
- Performance section: compact-to-moderate — cadence table tight (3 rows); channels comfortable
- Tier comparison: compact utility — efficient row height, clear column separation
- Testimonials: moderate — card-based, 2–3 lines, comfortable between cards
- FAQ: compact — 44px minimum tap target
- Major section breaks: generous separation between primary sections; expert sections (performance + tier table) use moderate separation — they read as a continuous expert zone

### 11E: Required Stable Selectors

REQUIRED SELECTORS:
- #page-root
- #primary-section
- #primary-action
- #no-login-trust-statement
- #sample-alert-card
- #trust-strip
- #how-it-works
- #coverage-section
- #performance-section
- #pro-comparison-table
- #pro-cta
- #testimonials-section
- #faq-section
- #travel-agent-section
- #final-cta-section
- #footer

### 11F: Non-Negotiables

- #primary-action visible in first viewport on all three breakpoints without scroll.
- #no-login-trust-statement inline with or immediately adjacent to #primary-action.
- No copy may use language implying guaranteed reservations, automatic booking, or Pixiedining completing the booking.
- How It Works Step 4 must explicitly name Disney's official reservation site and state Pixiedining does not book.
- Pro pricing must display both $14.99/mo and $99/yr with annual savings note.
- #travel-agent-section must appear after #testimonials-section and never above the fold.
- #pro-comparison-table must include as separate rows: restaurant count, polling cadence, SMS alerts, auto-resume, multi-park bundles, and price.
- Mobile tier comparison must render as stacked Free/Pro cards — not horizontal overflow.
- Polling cadence numbers (30 seconds Pro, 2 minutes Free) must be accessible on mobile without navigating away — the collapsible callout must include these numbers.

### 11G: Allowed Variation

- Hero headline copy may be A/B tested; task clarity and no-magic-before-task structure must be preserved.
- Sample alert card may show any qualifying Disney fine-dining restaurant; Be Our Guest preferred.
- Alert volume figure may be updated; must remain specific, not vague.
- Coverage grid may expand or contract as inventory changes.
- Testimonial names may be updated; restaurant-specific outcome framing required.
- Performance cadence values may update if product polling interval changes; must remain specific.
- Park tab order may vary by traffic (WDW vs Disneyland prominence).
- Annual savings percentage may update if pricing changes; must remain mathematically accurate.

### 11H: Not Allowed

- Removing #no-login-trust-statement from the first viewport.
- Using "guarantee," "secure," "hold," or "book" in CTA text or adjacent to primary CTA in a way implying Pixiedining completes the booking.
- Placing Pro checkout UI before trust strip and How It Works.
- Surfacing travel agent or agency content above the fold or before the tier comparison table.
- Replacing #pro-comparison-table with a vague benefits list lacking specific feature rows and pricing.
- Using Disney brand assets (castle, Mickey silhouette, official Disney color system, Waltograph fonts) in a way implying official affiliation.
- Hiding the 30-second Pro polling cadence behind navigation to a separate page.
- Rendering tier comparison as horizontal overflow table on mobile.

---

## Section 12: HTML Wireframe Artifact

HTML WIREFRAME ARTIFACT:
  File: wireframe.comparison-ready-pro-strategy.html
  Components: 48 (matching Section 6 row count)
  Selectors: 16 (matching Section 11E entry count)
  Status: written
