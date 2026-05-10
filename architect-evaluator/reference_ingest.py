#!/usr/bin/env python3
"""Create a curated reference directory skeleton.

This does not scrape. It writes meta.json and notes.md placeholders for a human
curator to fill, plus paths where screenshots/wireframe should be placed.
"""
from __future__ import annotations

import argparse
import json
import pathlib
import re


QUALITY_TIERS = {"exceptional", "strong", "competent", "weak-trope", "broken"}


def _slug(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", default="references")
    parser.add_argument("--domain", required=True)
    parser.add_argument("--strategy", required=True)
    parser.add_argument("--name", required=True)
    parser.add_argument("--quality-tier", required=True, choices=sorted(QUALITY_TIERS))
    parser.add_argument("--source-url", default=None)
    parser.add_argument("--audience", default=None)
    parser.add_argument("--industry", default=None)
    parser.add_argument("--page-type", default=None, help="public_homepage, pricing, internal_dashboard, docs, etc.")
    parser.add_argument("--archetype", default=None, help="sales_led_b2b_saas, product_led_saas, internal_tool, etc.")
    parser.add_argument("--visual-posture", default=None, help="enterprise_trust, developer_utility, premium_editorial, etc.")
    parser.add_argument("--sales-motion", default=None, help="demo_request, self_serve_trial, contact_sales, usage_based, etc.")
    parser.add_argument("--primary-user-job", default=None)
    parser.add_argument("--structural-move", action="append", default=[], help="Reusable structural decision; may be repeated.")
    parser.add_argument("--what-works", action="append", default=[], help="Curator note; may be repeated.")
    parser.add_argument("--what-to-avoid", action="append", default=[], help="Curator warning; may be repeated.")
    parser.add_argument("--trope-index", type=float, default=None, help="0.0=no trope risk, 1.0=severe trope risk")
    args = parser.parse_args()

    ref_id = _slug(args.name)
    ref_dir = (
        pathlib.Path(args.root)
        / _slug(args.domain)
        / _slug(args.strategy)
        / ref_id
    )
    ref_dir.mkdir(parents=True, exist_ok=True)

    meta = {
        "id": ref_id,
        "domain": _slug(args.domain),
        "strategy": _slug(args.strategy),
        "page_type": args.page_type,
        "archetype": args.archetype,
        "audience": args.audience,
        "industry": args.industry,
        "visual_posture": args.visual_posture,
        "sales_motion": args.sales_motion,
        "primary_user_job": args.primary_user_job,
        "quality_tier": args.quality_tier,
        "source_url": args.source_url,
        "structural_moves": args.structural_move,
        "what_works": args.what_works,
        "what_to_avoid": args.what_to_avoid,
        "trope_index": args.trope_index,
        "screenshots": {
            "desktop_viewport": "screenshot-desktop.png",
            "mobile_viewport": "screenshot-mobile.png"
        },
    }
    meta_path = ref_dir / "meta.json"
    if not meta_path.exists():
        meta_path.write_text(json.dumps(meta, indent=2) + "\n", encoding="utf-8")

    notes_path = ref_dir / "notes.md"
    if not notes_path.exists():
        notes_path.write_text(
            "# Reference Notes\n\n"
            "What works or fails structurally:\n\n"
            "- \n\n"
            "Reusable structural moves:\n\n"
            "- \n\n"
            "What to avoid/copy risk:\n\n"
            "- \n\n"
            "Curator tasks:\n\n"
            "- Add `wireframe.html` as a gray-box translation.\n"
            "- Add `screenshot-desktop.png` at 1440x900.\n"
            "- Add `screenshot-mobile.png` at 390x844.\n",
            encoding="utf-8",
        )

    print(ref_dir)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
