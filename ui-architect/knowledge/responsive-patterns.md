# Responsive Behavior Principles

Stack-agnostic responsive knowledge. No framework code, no pixel values — conceptual breakpoints and behavioral strategies that translate to any implementation.

---

## Breakpoint Philosophy

Think in device contexts, not pixel values:

| Breakpoint  | Context                        | Typical Use                    |
|-------------|--------------------------------|--------------------------------|
| **Mobile**  | Single hand, small screen      | One column, stacked, essential |
| **Tablet**  | Two hands, medium screen       | Hybrid — some multi-col OK     |
| **Desktop** | Keyboard + mouse, large screen | Full layout, multi-column      |
| **Large**   | Wide monitors, high res        | Max-width content, side panels |

**Mobile-first for content priority:** Design the mobile version first — not visually, but in terms of content hierarchy. Mobile forces you to decide what's truly essential because there's no room for "nice to have." This priority list then informs all breakpoints.

**Desktop is additive, not the default:** Don't design desktop first and then figure out what to cut on mobile. Start with the essential content stack (mobile), then add layout sophistication (columns, sidebars, visible panels) as screen space allows.

---

## Responsive Strategies

Five ways layouts adapt. Use the right one for each component:

### Stack
Multi-column → single-column.
- When: Grid items, side-by-side sections, content + sidebar
- Spec language: "3-col grid → 1-col stack on mobile"
- Rule: Stack in priority order — most important item on top

### Collapse
Visible section → expandable/collapsible section.
- When: Secondary content that shouldn't disappear entirely
- Spec language: "Sidebar collapses to drawer on mobile" / "Filters collapse to expandable panel"
- Rule: Must have a clear trigger (button, icon, swipe) to expand

### Reflow
Re-order content by priority at smaller breakpoints.
- When: Desktop layout order doesn't match mobile priority
- Spec language: "CTA moves above feature list on mobile" / "Price reflows to top on tablet"
- Rule: Use sparingly — too much reflow confuses users who resize their browser

### Hide
Remove from view entirely, with an access path noted.
- When: Tertiary content that adds noise on small screens
- Spec language: "Team workload panel: hidden on mobile — accessible via Reports page"
- Rule: ALWAYS note where the hidden content can be found. Never hide without an alternative path.

### Transform
Component changes form entirely.
- When: A component's desktop form doesn't work at smaller sizes
- Spec language: "Navigation → hamburger menu on mobile" / "Data table → card list on mobile"
- Common transforms:
  - Top nav → hamburger / bottom tab bar
  - Data table → card list / accordion
  - Multi-column form → single-column form
  - Sidebar nav → bottom nav / drawer
  - Horizontal tabs → dropdown / accordion
  - Tooltip → inline text

---

## Content Priority Shifting

What's visually primary on desktop may need different mobile treatment:

### Desktop sidebar → Mobile secondary
A sidebar that's always visible on desktop often needs to collapse or move. It can't take 30% of a mobile screen.

### Desktop data table → Mobile cards
Tables with 5+ columns don't work on mobile screens. Transform to cards showing the 2-3 most important fields, with "view details" for the rest.

### Desktop hover interactions → Mobile tap/long-press
Hover doesn't exist on touch. Every hover-revealed element needs a touch equivalent:
- Hover tooltip → Tap to reveal / inline text
- Hover menu → Tap menu / long-press
- Hover preview → Tap to expand

### Desktop multi-pane → Mobile drill-down
Side-by-side panes (list + detail) become sequential on mobile: list → tap → detail view (with back navigation).

---

## Spec Language Guide

How to express responsive behavior in the output spec without writing framework code:

### Layout changes
```
Desktop: 3-column grid (nav | content | panel)
Tablet: 2-column (nav collapses to rail | content + panel stacked)
Mobile: 1-column (nav → bottom tabs | content | panel hidden)
```

### Component transforms
```
Navigation:
  Desktop: Sidebar, always visible, icon + label
  Tablet: Sidebar rail, icon only, expand on hover
  Mobile: Bottom tab bar, 4 items max, icon + small label
```

### Visibility changes
```
Team workload panel:
  Desktop: Visible beside main table
  Tablet: Below table, collapsible
  Mobile: Hidden — accessible via Reports nav item
```

### Interaction changes
```
Table row actions:
  Desktop: Hover to reveal action buttons
  Mobile: Swipe row left to reveal actions, or long-press for context menu
```

### Spacing changes
```
Section spacing:
  Desktop: Generous (64px between major sections)
  Tablet: Moderate (48px)
  Mobile: Compact (32px)
```

Use conceptual terms (generous, moderate, compact) or relative terms (halved, tightened) rather than exact pixels. The implementation team will map these to their spacing system.

---

## Navigation Responsive Patterns

Navigation is the component that changes most across breakpoints. Standard patterns:

| Desktop Pattern    | Tablet Adaptation       | Mobile Adaptation       |
|-------------------|------------------------|------------------------|
| Top nav bar       | Top nav, fewer items    | Hamburger menu          |
| Sidebar (full)    | Sidebar rail (icons)    | Bottom tab bar or drawer|
| Tab bar           | Tab bar (scrollable)    | Dropdown or accordion   |
| Breadcrumbs       | Truncated breadcrumbs   | Back button only        |
| Footer nav (wide) | Footer nav (stacked)    | Accordion footer        |

Choose the pattern that preserves the user's ability to navigate without requiring them to learn a new navigation paradigm between breakpoints.

---

## Responsive Typography

Don't specify exact font sizes — specify the scaling behavior:

```
Headline:
  Desktop: Large (dominant, above-the-fold anchor)
  Mobile: Medium-large (still dominant, but fits single-column width)

Body:
  All breakpoints: Base size (no change — readability is constant)

Labels/captions:
  Desktop: Small
  Mobile: Small (minimum readable size — never go below)
```

Key principle: body text size should be comfortable for reading at every breakpoint. Headlines scale down. Captions have a floor. Line length should stay within 50-75 characters for readability — on wide screens, this means constraining the content width, not stretching text edge-to-edge.
