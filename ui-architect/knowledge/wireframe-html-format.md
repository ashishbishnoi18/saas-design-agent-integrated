# HTML Wireframe Artifact Format

This document defines the format of the renderable HTML wireframe (Section 12 of the architect output). The wireframe is the visual ground truth that the architect-evaluator screenshots and scores. Format compliance is mandatory.

---

## Goals (Why this format exists)

The wireframe must satisfy three properties simultaneously:

1. **Visually evaluable.** A vision model looking at a screenshot must be able to assess hierarchy, density, rhythm, grouping, and structural distinctiveness. This means real CSS layout (flexbox/grid), not just a wall of text.

2. **Stylistically neutral.** It must not commit to colors, fonts, brand treatment, or visual register beyond what's needed to communicate spatial structure. The visual-architect agent owns those decisions downstream.

3. **Machine-checkable.** The required selectors from Section 11E must be present as `id`s. Component inventory from Section 6 must be present as `data-component` attributes. Class hierarchy (P/S/T) must be present as `data-class` attributes. This lets the programmatic checker verify spec-wireframe coherence without a vision model.

If a design choice would violate any of these three properties, the spec is wrong, not the format.

---

## Document Structure

The wireframe is a single self-contained HTML5 file. No external resources, no JavaScript, no images.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Wireframe — {strategy} — {page-name}</title>
  <style>
    /* Wireframe styles — see "Required CSS" section below */
  </style>
</head>
<body>
  <div id="page-root" data-strategy="{strategy}" data-page="{page-name}">
    <!-- Page structure here using semantic HTML5 elements -->
  </div>
</body>
</html>
```

---

## Required CSS

Every wireframe uses this exact stylesheet. Do not add visual decoration. Do not change colors. Do not pick fonts. The architect's job is structure; visual treatment is downstream.

```css
:root {
  --bg: #ffffff;
  --surface: #f3f4f6;
  --surface-alt: #e5e7eb;
  --border: #d1d5db;
  --border-strong: #9ca3af;
  --text: #1f2937;
  --text-muted: #6b7280;
  --text-faint: #9ca3af;
  --primary-fill: #374151;
  --primary-text: #ffffff;
  --secondary-fill: #d1d5db;
  --secondary-text: #1f2937;
  --gap-xs: 8px;
  --gap-sm: 12px;
  --gap-md: 24px;
  --gap-lg: 48px;
  --gap-xl: 96px;
  --radius: 6px;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

html, body {
  font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
  color: var(--text);
  background: var(--bg);
  font-size: 16px;
  line-height: 1.5;
}

#page-root {
  width: 100%;
  min-height: 100vh;
}

/* Class-based visual weight — these encode the hierarchy ranking from Section 5 */
[data-class="primary"]   { /* highest visual weight */ }
[data-class="secondary"] { /* moderate visual weight */ }
[data-class="tertiary"]  { /* recessive */ }

/* Gray-box element types — pick the one that matches the component */

.wf-text-primary   { font-size: 2.25rem; font-weight: 700; line-height: 1.15; color: var(--text); }
.wf-text-secondary { font-size: 1.125rem; font-weight: 500; color: var(--text); }
.wf-text-body      { font-size: 1rem; color: var(--text-muted); }
.wf-text-meta      { font-size: 0.875rem; color: var(--text-faint); }

.wf-button-primary {
  display: inline-block;
  padding: 14px 28px;
  background: var(--primary-fill);
  color: var(--primary-text);
  border-radius: var(--radius);
  font-weight: 600;
  font-size: 1rem;
}
.wf-button-secondary {
  display: inline-block;
  padding: 12px 22px;
  background: transparent;
  color: var(--secondary-text);
  border: 1.5px solid var(--border-strong);
  border-radius: var(--radius);
  font-weight: 500;
  font-size: 0.95rem;
}
.wf-button-tertiary {
  display: inline-block;
  padding: 8px 12px;
  color: var(--text-muted);
  text-decoration: underline;
  font-size: 0.9rem;
}

.wf-input {
  display: block;
  width: 100%;
  padding: 12px 14px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text-faint);
  font-size: 1rem;
}

.wf-image, .wf-media, .wf-video {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface-alt);
  border: 1px dashed var(--border-strong);
  color: var(--text-muted);
  font-size: 0.85rem;
  border-radius: var(--radius);
  min-height: 120px;
}

.wf-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: var(--gap-md);
}

.wf-divider {
  height: 1px;
  background: var(--border);
  width: 100%;
}

.wf-icon {
  width: 24px; height: 24px;
  background: var(--surface-alt);
  border-radius: 4px;
  display: inline-block;
}

/* Density modifiers — apply to sections to encode density mode from Section 11D */
[data-density="generous"]  > * + * { margin-top: var(--gap-lg); }
[data-density="moderate"]  > * + * { margin-top: var(--gap-md); }
[data-density="compact"]   > * + * { margin-top: var(--gap-sm); }
[data-density="dense"]     > * + * { margin-top: var(--gap-xs); }

/* Section padding modifier */
[data-section-pad="generous"] { padding: var(--gap-xl) var(--gap-lg); }
[data-section-pad="moderate"] { padding: var(--gap-lg) var(--gap-md); }
[data-section-pad="compact"]  { padding: var(--gap-md) var(--gap-sm); }

/* Container widths — use these on top-level <section> elements */
.wf-container-narrow { max-width: 720px; margin: 0 auto; }
.wf-container-medium { max-width: 1024px; margin: 0 auto; }
.wf-container-wide   { max-width: 1280px; margin: 0 auto; }
.wf-container-full   { width: 100%; }

/* Grid helpers — minimum needed, no more */
.wf-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--gap-md); }
.wf-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--gap-md); }
.wf-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--gap-md); }
.wf-grid-sidebar-content { display: grid; grid-template-columns: 280px 1fr; gap: var(--gap-md); }
.wf-grid-content-sidebar { display: grid; grid-template-columns: 1fr 320px; gap: var(--gap-md); }

.wf-flex-row    { display: flex; flex-direction: row; gap: var(--gap-md); align-items: center; }
.wf-flex-col    { display: flex; flex-direction: column; gap: var(--gap-md); }
.wf-flex-between{ display: flex; justify-content: space-between; align-items: center; gap: var(--gap-md); }

/* Responsive transforms — Tablet (≤1024px) and Mobile (≤640px) */
@media (max-width: 1024px) {
  .wf-grid-3, .wf-grid-4 { grid-template-columns: repeat(2, 1fr); }
  .wf-grid-sidebar-content, .wf-grid-content-sidebar { grid-template-columns: 1fr; }
  [data-section-pad="generous"] { padding: var(--gap-lg) var(--gap-md); }
}

@media (max-width: 640px) {
  .wf-grid-2, .wf-grid-3, .wf-grid-4 { grid-template-columns: 1fr; }
  .wf-text-primary { font-size: 1.875rem; }
  [data-section-pad="generous"] { padding: var(--gap-md) var(--gap-sm); }
  /* Components flagged for mobile-hide */
  [data-mobile="hide"] { display: none; }
  /* Components flagged for mobile-collapse should have a paired mobile-summary alternative */
}
```

You may add minimal additional layout-only CSS for a specific page if needed (e.g., a custom 5-column grid). You may NOT add color, brand, or typography decisions.

---

## Required Element Attributes

Every meaningful component element in the wireframe MUST carry these attributes:

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `data-component` | Matches the Component Inventory (Section 6) | `data-component="hero-headline"` |
| `data-class` | Class hierarchy from Section 6 | `data-class="primary"` |
| `id` (when in 11E) | Required selector from Section 11E | `id="primary-action"` |

Section-level elements (`<section>`, `<header>`, `<main>`, `<aside>`, `<footer>`) should also carry:

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `data-section` | Section name for evaluator reference | `data-section="hero"` |
| `data-density` | Density mode for the section (matches 11D) | `data-density="generous"` |
| `data-section-pad` | Outer padding mode | `data-section-pad="generous"` |

For audience self-selection or multi-path components:

| Attribute | Purpose |
|-----------|---------|
| `data-audience="{segment-name}"` | Marks this component as serving a specific audience segment from the intake |

For tension-resolution components (from Section 4E):

| Attribute | Purpose |
|-----------|---------|
| `data-tension="{tension-name}"` | Marks this component as resolving a named tension |

These attributes let the programmatic checker verify, without a vision model, that the wireframe and the spec agree.

---

## Hierarchy Encoding

Visual hierarchy (Section 5) is encoded via three coordinated channels in the wireframe:

1. **`data-class` attribute** — declares intended hierarchy (primary/secondary/tertiary)
2. **CSS class choice** — `wf-text-primary` for the H1, `wf-text-secondary` for subheads, `wf-text-body` for paragraphs, etc.
3. **Position and grouping** — primary elements get more whitespace, are placed earlier in the document, and are visually larger

The vision evaluator will check whether the *rendered* visual weight matches the *declared* `data-class` and the Section 5 ranking. A primary element rendered smaller than a secondary one is a hierarchy failure.

---

## Density Encoding

Density (Section 11D) is encoded via:

1. **`data-density`** on sections (controls inter-child spacing)
2. **`data-section-pad`** on sections (controls outer padding)
3. **Container width class** (narrow/medium/wide/full)

The vision evaluator will check whether the *perceived* density matches the *declared* mode in Section 11D. A "low-density marketing" page that renders tight is a density failure.

---

## Responsive Encoding

The wireframe encodes all three viewports (desktop, tablet, mobile) in a single file via CSS media queries. The evaluator will screenshot at three viewport widths to check responsive behavior:

- 1440px (desktop)
- 768px (tablet)
- 390px (mobile)

For components that disappear on mobile, use `data-mobile="hide"` AND ensure Section 11D notes the access path. Hiding without an access path is a fail.

For components that transform (table → cards, sidebar → drawer), the wireframe should show the *desktop* form by default and add a media query that swaps in the mobile form. If this is too much CSS for a static gray-box wireframe, instead duplicate both forms with `data-viewport="desktop"` and `data-viewport="mobile"` and use media queries to toggle visibility:

```css
@media (max-width: 640px) {
  [data-viewport="desktop"] { display: none; }
  [data-viewport="mobile"]  { display: block; }
}
```

---

## What This Wireframe Is NOT

- It is not a Figma mockup. No colors, fonts, or visual styling beyond grayscale layout.
- It is not production code. The visual-architect and implementer downstream produce the real component code.
- It is not interactive. No hover states, no animations, no JS. Interactions live in Section 9 of the spec, not in the wireframe.
- It is not pixel-perfect. The evaluator scores hierarchy, density, rhythm, and structure — not exact spacing values.
- It is not a content draft. Use placeholder text (`Lorem ipsum dolor sit amet...` is acceptable here, ironically, because we're evaluating *structure* not content; the content-direction notes from Section 10 drive a downstream content agent). Keep placeholder lengths *realistic* — a 200-word paragraph slot should contain ~200 words of placeholder, not three.

---

## Worked Example (skeleton)

This skeleton shows the format for a marketing page with hero + features + CTA. A real wireframe would have all components from Section 6.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Wireframe — action-first — landing</title>
  <style>/* required CSS from this spec */</style>
</head>
<body>
  <div id="page-root" data-strategy="action-first" data-page="landing">

    <header data-section="nav" data-section-pad="compact">
      <div class="wf-container-wide wf-flex-between">
        <div data-component="logo" data-class="tertiary" class="wf-flex-row">
          <span class="wf-icon"></span>
          <span class="wf-text-meta">Brand</span>
        </div>
        <nav class="wf-flex-row" data-component="primary-nav" data-class="tertiary">
          <span class="wf-text-meta">Product</span>
          <span class="wf-text-meta">Pricing</span>
          <span class="wf-text-meta">Docs</span>
          <a class="wf-button-secondary" data-component="login-link" data-class="tertiary">Log in</a>
        </nav>
      </div>
    </header>

    <main>
      <section id="primary-section" data-section="hero" data-density="generous" data-section-pad="generous">
        <div class="wf-container-medium wf-flex-col">
          <h1 class="wf-text-primary" data-component="hero-headline" data-class="primary">
            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
          </h1>
          <p class="wf-text-body" data-component="hero-subhead" data-class="secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
          <div class="wf-flex-row">
            <a id="primary-action" class="wf-button-primary"
               data-component="primary-cta" data-class="primary">
              Start Free Trial
            </a>
            <a class="wf-button-tertiary" data-component="secondary-cta" data-class="secondary">
              See how it works →
            </a>
          </div>
          <p class="wf-text-meta" data-component="risk-reducer" data-class="tertiary">
            No credit card required · Cancel anytime
          </p>
        </div>
      </section>

      <section data-section="proof" data-density="moderate" data-section-pad="moderate">
        <div class="wf-container-wide wf-flex-col">
          <h2 class="wf-text-secondary" data-component="proof-headline" data-class="secondary">
            Trusted by teams at
          </h2>
          <div class="wf-grid-4" data-component="logo-strip" data-class="tertiary">
            <div class="wf-image" style="min-height:48px">[LOGO]</div>
            <div class="wf-image" style="min-height:48px">[LOGO]</div>
            <div class="wf-image" style="min-height:48px">[LOGO]</div>
            <div class="wf-image" style="min-height:48px">[LOGO]</div>
          </div>
        </div>
      </section>

      <!-- Feature grid, testimonial, repeated CTA, etc., per Section 6 -->

    </main>

    <footer data-section="footer" data-section-pad="moderate">
      <div class="wf-container-wide" data-component="footer-nav" data-class="tertiary">
        <p class="wf-text-meta">Footer navigation and legal</p>
      </div>
    </footer>

  </div>
</body>
</html>
```

The evaluator will screenshot this at 1440x900, 768x1024, and 390x844, and judge whether the rendered hierarchy, density, and structural strategy match the spec.
