from __future__ import annotations

import asyncio
import importlib.util
import json
import pathlib
import struct
import sys

import pytest


ROOT = pathlib.Path(__file__).resolve().parents[1]
HARNESS_PATH = ROOT / "architect-evaluator" / "harness.py"
SPEC = importlib.util.spec_from_file_location("harness", HARNESS_PATH)
harness = importlib.util.module_from_spec(SPEC)
sys.modules["harness"] = harness
assert SPEC and SPEC.loader
SPEC.loader.exec_module(harness)


def valid_spec() -> str:
    return """## Section 1: Page Classification
TYPE: marketing

## Section 2: Intake Summary
PURPOSE: Help qualified buyers request a savings quote with clear business intent.
AUDIENCE: Budget-aware operators comparing vendors and needing proof before action.
CONTEXT: Standalone landing page from paid search into quote request completion.
KEY ACTIONS: 1. Request quote 2. Compare savings 3. Review proof

## Section 3: Flow Map (multi-page only)
FLOW: Single page (standalone)

## Section 4: Decision Map
### 4A: User Decision Sequence
PAGE LEVEL:
  User's first question: "Can this save me money?"
  Resolved by: Hero headline and savings proof panel.
SECTION LEVEL:
  Scanning for: "Is the offer credible?"
  Resolved by: Proof panel and risk reducer.
COMPONENT LEVEL:
  Click-vs-skip decision: "Is the quote worth the effort?"
  Resolved by: Primary CTA and effort clarity.

### 4B: Asset And Evidence Inference
PRODUCT/OUTPUT ASSETS:
  Savings estimate and quote output.
PROOF ASSETS:
  Verified savings example and comparison evidence.
CONVERSION ASSETS:
  Low effort quote request and risk reducer.
NAVIGATION/SELF-SELECTION ASSETS:
  Single path for qualified buyers.
ACTION VS SIGNAL CLASSIFICATION:
  Actions: Quote CTA.
  Signals: Savings proof and risk reducer.

### 4C: Strategy Defense (search mode) OR Candidate Structure Search (interactive mode)
ASSIGNED STRATEGY: action-first
WHY THIS STRATEGY FITS THIS INTAKE:
  The audience arrives with purchase intent and needs an obvious quote path.
LOCAL OPTIMUM THIS STRATEGY RISKS:
  Over-centering a form without proof.
HOW THIS DESIGN AVOIDS THAT LOCAL OPTIMUM:
  The CTA is adjacent to proof and effort clarity.
REFERENCE CALIBRATION:
  no curated references loaded; using general anti-trope guidance.

### 4D: Component Justification
| Component | User Lens | Business Lens | Verdict |
|-----------|-----------|---------------|---------|
| Hero headline | Answers savings question | Qualifies intent | Include |
| Primary CTA | Starts quote | Drives conversion | Include |
| Proof panel | Builds confidence | Supports lead quality | Include |
| Risk reducer | Reduces hesitation | Prevents drop-off | Include |
| Footer nav | Provides legal fallback | Supports trust | Include |

### 4E: Tension Map
TENSION: Price clarity vs trust
  Business pull: Drive quote requests before showing too much detail.
  User pull: Understand effort and credibility before engaging.
  Resolution: Pair the primary action with proof and effort clarity.

## Section 5: Visual Hierarchy Map
PRIMARY (dominant visual weight):
  1. Hero headline - answers the first question.
  2. Primary CTA - starts the quote path.
SECONDARY (supporting):
  3. Proof panel - makes the action credible.
  4. Risk reducer - reduces hesitation.
TERTIARY (present but recessive):
  5. Footer nav - support links.

## Section 6: Component Inventory
| Component | Class | Purpose | Content Direction |
|-----------|-------|---------|-------------------|
| Hero headline | P | Communicate outcome | Savings headline |
| Primary CTA | P | Drive quote request | Request quote |
| Proof panel | S | Establish proof | Savings evidence |
| Risk reducer | S | Lower effort concern | No obligation |
| Footer nav | T | Support links | Legal |

## Section 7: ASCII Wireframe(s)
+ hero + proof + action

## Section 8: Responsive Behavior
DESKTOP: Split proof and action.
TABLET: Stack proof below action.
MOBILE: Single column with action visible early.

## Section 9: Interaction Notes
No dynamic interactions.

## Section 10: Content Direction
OVERALL TONE: Direct and proof-led.
SECTION-BY-SECTION:
- Hero: name the savings outcome.
- CTA: low effort request.

## Section 11: Visual Acceptance Spec
### 11A: Viewports & Scenarios
VIEWPORTS:
- Desktop: 1440x900
- Tablet: 768x1024
- Mobile: 390x844
### 11B: First Viewport Composition
FIRST VIEWPORT (desktop):
- Hero headline must be visible before scroll.
- Primary action must be visible before scroll.
- Next section must peek below the fold by small amount.
- Must not render as a single empty hero-only viewport.
### 11C: Layout Constraints
LAYOUT:
- Desktop: Two-column proof/action structure.
### 11D: Density & Rhythm
DENSITY:
- Mode: low-density marketing
- Major sections use moderate separation.
### 11E: Required Stable Selectors
REQUIRED SELECTORS:
- #page-root
- #primary-section
- #primary-action
### 11F: Non-Negotiables
Do not hide the CTA.
### 11G: Allowed Variation
Spacing may vary.
### 11H: Not Allowed
No external resources.

## Section 12: HTML Wireframe Artifact
HTML WIREFRAME ARTIFACT:
  File: wireframe.action-first.html
  Components: 5
  Selectors: 3
  Status: written
"""


def valid_html(extra_css: str = "", body_extra: str = "") -> str:
    return f"""<!doctype html>
<html>
<head>
<style>
:root {{ --primary-fill: #111; --gap-md: 24px; }}
.wf-text-primary {{ font-weight: 700; }}
body {{ margin: 0; font-family: sans-serif; }}
#page-root {{ padding: 32px; }}
.component {{ margin: 16px 0; min-height: 42px; }}
{extra_css}
</style>
</head>
<body>
<main id="page-root" data-strategy="action-first" data-page="landing">
  <section id="primary-section" class="component wf-text-primary" data-component="hero-headline" data-class="primary" data-tension="price-clarity-vs-trust">Save more on the next quote</section>
  <button id="primary-action" class="component" data-component="primary-cta" data-class="primary">Request quote</button>
  <section class="component" data-component="proof-panel" data-class="secondary">Verified savings proof</section>
  <section class="component" data-component="risk-reducer" data-class="secondary">No obligation and fast estimate</section>
  <footer class="component" data-component="footer-nav" data-class="tertiary">Legal links</footer>
  {body_extra}
</main>
</body>
</html>
"""


def write_case(tmp_path: pathlib.Path, html: str | None = None, spec: str | None = None):
    tmp_path.mkdir(parents=True, exist_ok=True)
    spec_path = tmp_path / "UI_SPEC.action-first.md"
    wf_path = tmp_path / "wireframe.action-first.html"
    spec_path.write_text(spec or valid_spec(), encoding="utf-8")
    wf_path.write_text(html or valid_html(), encoding="utf-8")
    return harness.Candidate("action-first", spec_path, wf_path)


def png_size(path: pathlib.Path) -> tuple[int, int]:
    data = path.read_bytes()
    return struct.unpack(">II", data[16:24])


def test_section_parsing_present_missing_and_order() -> None:
    ok, in_order, missing = harness._check_all_sections_present(valid_spec())
    assert ok and in_order and missing == []

    missing_spec = valid_spec().replace("## Section 7: ASCII Wireframe(s)", "## Missing")
    ok, _, missing = harness._check_all_sections_present(missing_spec)
    assert not ok
    assert "Section 7" in missing

    source = valid_spec()
    pos3 = source.index("## Section 3:")
    pos4 = source.index("## Section 4:")
    pos5 = source.index("## Section 5:")
    out_of_order = source[:pos3] + source[pos4:pos5] + source[pos3:pos4] + source[pos5:]
    ok, in_order, _ = harness._check_all_sections_present(out_of_order)
    assert not ok or not in_order


def test_section_4e_empty_trivial_fails() -> None:
    spec = valid_spec().replace(
        "TENSION: Price clarity vs trust\n  Business pull: Drive quote requests before showing too much detail.\n  User pull: Understand effort and credibility before engaging.\n  Resolution: Pair the primary action with proof and effort clarity.",
        "No tensions.",
    )
    assert not harness._check_section_4e_non_empty(spec)


def test_inventory_selectors_and_section_12() -> None:
    inventory = harness._parse_component_inventory(valid_spec())
    assert [row["class"] for row in inventory[:3]] == ["P", "P", "S"]
    assert harness._parse_required_selectors(valid_spec()) == [
        "page-root",
        "primary-section",
        "primary-action",
    ]
    duplicate = valid_spec().replace("- #primary-action", "- #primary-action\n- #primary-action")
    assert harness._parse_required_selectors(duplicate).count("primary-action") == 1
    stub = harness._parse_section_12_stub(valid_spec())
    assert stub["present"]
    assert stub["component_count"] == 5


def test_wireframe_structural_checks() -> None:
    assert harness._check_wireframe_structural(valid_html())["passed"]
    assert not harness._check_wireframe_structural(valid_html().replace('id="page-root"', 'id="root"'))["page_root_present"]
    assert not harness._check_wireframe_structural(valid_html().replace("--gap-md", "--gap-lg"))["required_css_present"]
    assert harness._check_wireframe_structural(valid_html(body_extra='<img src="https://example.com/x.png">'))["external_resources"]
    assert harness._check_wireframe_structural(valid_html(body_extra="<script>alert(1)</script>"))["javascript_present"]


def test_coherence_caps_inputs() -> None:
    co = harness._check_coherence(valid_spec(), valid_html())
    assert co["passed"]

    missing = harness._check_coherence(
        valid_spec(), valid_html().replace('data-component="proof-panel"', 'data-component="proof-x"')
    )
    assert "Proof panel" in missing["missing_components"]
    assert "proof-x" in missing["unjustified_components"]

    mismatch = harness._check_coherence(
        valid_spec(), valid_html().replace('data-component="primary-cta" data-class="primary"', 'data-component="primary-cta" data-class="secondary"')
    )
    assert mismatch["class_mismatches"]
    assert not mismatch["primary_count_matches"]

    no_selector = harness._check_coherence(
        valid_spec(), valid_html().replace('id="primary-action"', 'id="secondary-action"')
    )
    assert "primary-action" in no_selector["missing_selectors"]


def test_score_derivation_for_missing_component() -> None:
    result = {
        "spec_structural": {"passed": True, "all_sections_present": True, "sections_in_order": True, "missing_sections": [], "section_2_complete": True, "section_4_subsections_present": True, "section_4_missing_subsections": [], "section_4e_non_empty": True, "section_5_has_primary_secondary_tertiary": True, "section_6_component_count": 5, "section_6_min_rows_passed": True, "section_11e_selector_count": 3, "section_11e_min_selectors_passed": True, "section_12_stub_present": True, "section_12_counts_match": True},
        "wireframe_structural": {"passed": True, "valid_html5": True, "page_root_present": True, "page_root_has_data_strategy": True, "page_root_has_data_page": True, "required_css_present": True, "external_resources": [], "javascript_present": False},
        "coherence": {"passed": False, "missing_components": ["Proof panel"], "unjustified_components": [], "class_mismatches": [], "missing_selectors": [], "primary_count_spec": 2, "primary_count_wireframe": 2, "primary_count_matches": True},
        "render": {"passed": True, "console_errors_desktop": [], "console_errors_tablet": [], "console_errors_mobile": [], "mobile_horizontal_overflow": False, "first_viewport_visible_components": 5, "missing_visible_selectors_desktop": []},
        "reference_calibration": {"passed": True, "references_provided": False},
    }
    score = harness._derive_score(result)
    assert score["score"] == 7
    assert not score["all_passed"]


def test_render_and_screenshot_generation(tmp_path: pathlib.Path) -> None:
    candidate = write_case(tmp_path)
    try:
        checks = asyncio.run(harness.run_programmatic_checks(candidate, None))
    except Exception as exc:
        pytest.skip(f"Playwright browser unavailable: {exc}")
    assert checks["render"]["passed"]

    overflow = write_case(tmp_path / "overflow", html=valid_html(extra_css="body { width: 1000px; }"))
    overflow.spec_path.parent.mkdir(parents=True, exist_ok=True)
    overflow.spec_path.write_text(valid_spec(), encoding="utf-8")
    overflow.wireframe_path.write_text(valid_html(extra_css="body { width: 1000px; }"), encoding="utf-8")
    overflow_checks = asyncio.run(harness.run_programmatic_checks(overflow, None))
    assert overflow_checks["render"]["mobile_horizontal_overflow"]

    hidden = write_case(
        tmp_path / "hidden",
        html=valid_html(extra_css="#primary-action { display: none; }"),
    )
    hidden.spec_path.parent.mkdir(parents=True, exist_ok=True)
    hidden.spec_path.write_text(valid_spec(), encoding="utf-8")
    hidden.wireframe_path.write_text(valid_html(extra_css="#primary-action { display: none; }"), encoding="utf-8")
    hidden_checks = asyncio.run(harness.run_programmatic_checks(hidden, None))
    assert "primary-action" in hidden_checks["render"]["missing_visible_selectors_desktop"]

    asyncio.run(harness._screenshot_wireframe(candidate, tmp_path))
    assert png_size(candidate.screenshots["desktop"].viewport) == (1440, 900)
    assert png_size(candidate.screenshots["mobile"].viewport) == (390, 844)
    assert candidate.screenshots["desktop"].full.exists()


def test_verdict_parsing_and_ranking_gate(tmp_path: pathlib.Path) -> None:
    verdict = """=== ARCHITECT EVALUATOR VERDICT ===
BUSINESS_OUTCOME_FIT_SCORE: 9
OBJECTION_RESOLUTION_SCORE: 8
WIREFRAME_QUALITY_SCORE: 7
DECISION_MAP_FIDELITY_SCORE: 8
MOBILE_CONVERSION_PATH_SCORE: 9
STRATEGY_COMMITMENT_SCORE: 8
STRUCTURAL_DISTINCTIVENESS_DIAGNOSTIC_SCORE: 6
TROPE_REVERSION_PENALTY: -0.7
PROGRAMMATIC_COMPLIANCE_SCORE: 10
PROGRAMMATIC_GATE_PASSED: yes
WEIGHTED_TOTAL: 8
HARD_FLOOR_VIOLATED: no
ELIGIBLE_FOR_FINAL_RANKING: yes
=== END VERDICT ==="""
    scores = harness._parse_verdict(verdict)
    assert scores["trope_reversion_penalty"] == -0.7
    assert harness._weighted_total(scores) < harness._weighted_positive_total(scores)

    a = harness.Candidate("eligible", tmp_path / "a.md", tmp_path / "a.html")
    a.weighted_total = 6
    a.programmatic_score = 10
    a.eligible_for_final_ranking = True

    b = harness.Candidate("blocked", tmp_path / "b.md", tmp_path / "b.html")
    b.weighted_total = 10
    b.programmatic_score = 4
    b.hard_floor_violated = True
    b.eligible_for_final_ranking = False

    assert harness._sort_candidates([b, a])[0].strategy == "eligible"

    c = harness.Candidate("pairwise", tmp_path / "c.md", tmp_path / "c.html")
    c.weighted_total = 5
    c.programmatic_score = 10
    c.eligible_for_final_ranking = True
    c.pairwise_points = 2
    assert harness._sort_candidates([a, c])[0].strategy == "pairwise"


def test_reference_loader_and_prompt_pack(tmp_path: pathlib.Path) -> None:
    ref_dir = tmp_path / "references" / "marketing-landing" / "action-first" / "ref-001"
    ref_dir.mkdir(parents=True)
    (ref_dir / "meta.json").write_text(
        json.dumps(
            {
                "id": "ref-001",
                "domain": "marketing-landing",
                "strategy": "action-first",
                "quality_tier": "exceptional",
                "what_works": ["Proof sits adjacent to action"],
                "structural_moves": ["split-proof-action"],
                "trope_index": 0.1,
            }
        ),
        encoding="utf-8",
    )
    (ref_dir / "notes.md").write_text("Strong because proof and action are co-located.", encoding="utf-8")
    refs = harness.load_reference_library(tmp_path / "references")
    selected = harness.select_references_for_strategy(
        refs, "marketing-landing quote flow", "action-first"
    )
    pack = harness.format_reference_pack_for_prompt(selected)
    assert selected[0].id == "ref-001"
    assert "split-proof-action" in pack
