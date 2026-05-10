# Curated Reference Move Schema

References are not raw scraped websites. Each reference should be translated into a compact design-move record that the architect and evaluator can reason over.

Minimum files per reference:

```text
references/{domain}/{strategy}/{reference-id}/
  meta.json
  notes.md
  wireframe.html                  # optional gray-box translation
  screenshot-desktop.png          # optional 1440x900 viewport screenshot
  screenshot-mobile.png           # optional 390x844 viewport screenshot
```

Recommended `meta.json` shape:

```json
{
  "id": "vendor-risk-dashboard",
  "domain": "b2b-operations-saas",
  "page_type": "public_homepage",
  "strategy": "problem-risk-first",
  "archetype": "sales_led_b2b_saas",
  "audience": "operations managers",
  "industry": "vendor management",
  "visual_posture": "enterprise_trust",
  "sales_motion": "demo_request",
  "primary_user_job": "reduce missed compliance deadlines",
  "quality_tier": "exceptional",
  "source_url": "https://example.com",
  "structural_moves": [
    "risk-snapshot-before-feature-grid",
    "proof-near-primary-action",
    "workflow-preview-as-secondary-action"
  ],
  "what_works": [
    "Makes the buyer's operational pain concrete before asking for a demo."
  ],
  "what_to_avoid": [
    "Do not copy the three-card feature row; it is weaker than the risk snapshot."
  ],
  "trope_index": 0.15,
  "screenshots": {
    "desktop_viewport": "screenshot-desktop.png",
    "mobile_viewport": "screenshot-mobile.png"
  }
}
```

Quality tiers:

- `exceptional`: rare reference; use as a high-quality anchor
- `strong`: useful but not perfect
- `competent`: acceptable baseline
- `weak-trope`: intentionally bad/generic example to penalize
- `broken`: failure reference for gates and anti-patterns

Curator rule: every `structural_moves` entry should describe a reusable decision, not a visual surface detail. Good: `proof-near-primary-action`. Weak: `blue gradient hero`.
