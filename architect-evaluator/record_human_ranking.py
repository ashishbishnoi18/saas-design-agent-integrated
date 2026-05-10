#!/usr/bin/env python3
"""Append a human ranking override to calibration/human_rankings.jsonl."""
from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import json
import pathlib
import re


def _read(path: pathlib.Path) -> str:
    return path.read_text(encoding="utf-8") if path.exists() else ""


def _parse_model_ranking(ranking_path: pathlib.Path) -> list[str]:
    if not ranking_path.exists():
        return []
    strategies: list[str] = []
    for line in ranking_path.read_text(encoding="utf-8").splitlines():
        match = re.search(r"#\d+\s+([a-z0-9_-]+)", line)
        if match:
            strategies.append(match.group(1))
    return strategies


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--run", required=True, help="Run directory")
    parser.add_argument(
        "--human-ranking",
        required=True,
        help="Comma-separated strategy names in human-preferred order",
    )
    parser.add_argument("--reason", required=True)
    parser.add_argument("--failure-tags", default="")
    parser.add_argument(
        "--out",
        default="calibration/human_rankings.jsonl",
        help="Calibration JSONL output path",
    )
    args = parser.parse_args()

    run_dir = pathlib.Path(args.run)
    intake = _read(run_dir / "intake.txt")
    human_ranking = [s.strip() for s in args.human_ranking.split(",") if s.strip()]
    model_ranking = _parse_model_ranking(run_dir / "RANKING.txt")
    record = {
        "timestamp": dt.datetime.now(dt.UTC).isoformat(),
        "run_id": run_dir.name,
        "intake_hash": hashlib.sha256(intake.encode("utf-8")).hexdigest()[:16],
        "model_ranking": model_ranking,
        "human_ranking": human_ranking,
        "human_winner": human_ranking[0] if human_ranking else None,
        "model_winner": model_ranking[0] if model_ranking else None,
        "reason": args.reason,
        "failure_tags": [
            tag.strip() for tag in args.failure_tags.split(",") if tag.strip()
        ],
    }
    out_path = pathlib.Path(args.out)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    with out_path.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(record, sort_keys=True) + "\n")
    print(f"wrote calibration record to {out_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
