# Programmatic Compliance Checks

Deterministic checks run by the harness before multimodal evaluation. These checks are a gate and hard floor, not a positive reward. A candidate does not win because it has valid selectors; it loses eligibility when structure, rendering, or spec-wireframe coherence fail.

---

## Categories

### 1. Spec Structural Checks

The harness verifies:

- All 12 sections are present and in Section 1-12 order.
- Section 2 has non-trivial `PURPOSE`, `AUDIENCE`, `CONTEXT`, and `KEY ACTIONS`.
- Section 4A, 4B, 4C, 4D, and 4E exist and are non-empty.
- Section 4E is not empty/trivial and does not claim no tensions.
- Section 5 includes non-empty PRIMARY, SECONDARY, and TERTIARY tiers.
- Section 6 has at least 4 component rows.
- Section 11E has at least 3 required selectors.
- Section 12 has an `HTML WIREFRAME ARTIFACT` stub declaring file, component count, selector count, and status.
- Section 12 component count equals Section 6 row count.
- Section 12 selector count equals Section 11E selector count.

### 2. Wireframe Structural Checks

The harness parses the HTML and verifies:

- HTML5 structure includes `<!doctype html>`, `<html>`, and `<body>`.
- `#page-root` exists.
- `#page-root` has `data-strategy` and `data-page`.
- Required CSS anchors exist: `--primary-fill`, `--gap-md`, `.wf-text-primary`.
- No external `http(s)` resources in `link`, `script`, or `img`.
- No JavaScript except empty scripts or `type="application/json"` metadata blocks.

### 3. Spec-Wireframe Coherence

The harness verifies:

- Every Section 6 component appears as `data-component="{kebab-case-name}"`.
- Every HTML `data-component` is justified by Section 6.
- Section 6 P/S/T classes match `data-class="primary|secondary|tertiary"`.
- Every Section 11E selector appears as an `id`.
- Primary component count is not under-rendered.
- Each Section 4E tension is checked for a matching `data-tension` tag when possible. Missing tension tags are warnings by default, not automatic hard fails.

### 4. Render Checks

Playwright renders desktop, tablet, and mobile viewports and verifies:

- No console errors.
- Mobile `document.documentElement.scrollWidth <= viewport width + 1`.
- Desktop first viewport contains at least 5 visible `[data-component]` elements.
- Every required selector resolves to a visible desktop element, not hidden markup.

### 5. Reference Calibration Checks

If no references are provided, this category passes. If references are provided:

- The spec must include a `REFERENCE CALIBRATION:` block.
- If the harness loaded reference pack items, the spec should mention at least one loaded reference ID or structural move.
- This is a sanity check only; it does not prove the model actually used the references.

---

## JSON Shape

```json
{
  "candidate_id": "workflow-walkthrough-first",
  "spec_path": "/path/to/UI_SPEC.workflow-walkthrough-first.md",
  "wireframe_path": "/path/to/wireframe.workflow-walkthrough-first.html",
  "spec_structural": {
    "all_sections_present": true,
    "sections_in_order": true,
    "missing_sections": [],
    "section_2_complete": true,
    "section_4_subsections_present": true,
    "section_4_missing_subsections": [],
    "section_4e_non_empty": true,
    "section_5_has_primary_secondary_tertiary": true,
    "section_6_component_count": 14,
    "section_6_min_rows_passed": true,
    "section_11e_selector_count": 5,
    "section_11e_min_selectors_passed": true,
    "section_12_stub_present": true,
    "section_12_component_count": 14,
    "section_12_selector_count": 5,
    "section_12_counts_match": true,
    "passed": true
  },
  "wireframe_structural": {
    "valid_html5": true,
    "html5_parse_warnings": [],
    "page_root_present": true,
    "page_root_has_data_strategy": true,
    "page_root_has_data_page": true,
    "required_css_present": true,
    "external_resources": [],
    "javascript_present": false,
    "passed": true
  },
  "coherence": {
    "missing_components": [],
    "unjustified_components": [],
    "class_mismatches": [],
    "missing_selectors": [],
    "missing_tension_tags": [],
    "primary_count_spec": 3,
    "primary_count_wireframe": 3,
    "primary_count_matches": true,
    "passed": true
  },
  "render": {
    "console_errors_desktop": [],
    "console_errors_tablet": [],
    "console_errors_mobile": [],
    "mobile_horizontal_overflow": false,
    "first_viewport_visible_components": 8,
    "missing_visible_selectors_desktop": [],
    "passed": true
  },
  "reference_calibration": {
    "references_provided": true,
    "reference_context_loaded": true,
    "calibration_block_present": true,
    "mentioned_reference_ids_or_moves": true,
    "passed": true
  },
  "score_derivation": {
    "all_passed": true,
    "required_category_failed": false,
    "score": 10,
    "rules_fired": [],
    "reasoning": "All checks passed."
  }
}
```

---

## Score Derivation

Score starts at 10. Rules cap or subtract; the final score is the strict result after all fired rules:

- Missing sections or sections out of order: cap 2.
- Section 4E empty/trivial: cap 5.
- Wireframe parse/render failure: cap 2.
- External resources or JavaScript: cap 2.
- Missing `#page-root`, required CSS, or page-root data attributes: cap 4.
- One missing component: cap 7.
- Two or more missing components: cap 4.
- One unjustified component: cap 7.
- Multiple unjustified components: cap 4.
- One class mismatch: cap 7.
- Multiple class mismatches: cap 5.
- Missing selector: subtract 3 per selector, floor 0.
- Required selector exists only in hidden/missing desktop markup: cap 6.
- Primary count mismatch: cap 7, severe undercount cap 5.
- Mobile horizontal overflow: cap 6.
- Desktop first viewport below 5 visible components: cap 5.
- References provided but calibration missing: cap 8.

`score = 10` only when every category passes. `required_category_failed` covers spec, wireframe, coherence, and render categories. Reference calibration can cap the score but is not a hard structural failure by itself.
