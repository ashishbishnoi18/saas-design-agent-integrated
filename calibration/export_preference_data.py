#!/usr/bin/env python3
"""Export pairwise preference JSONL from human ranking records.

Input records come from architect-evaluator/record_human_ranking.py.
Output records are intentionally provider-neutral so they can feed eval harnesses,
preference datasets, or custom fine-tuning preparation scripts.
"""
from __future__ import annotations

import argparse
import json
import pathlib
from typing import Any


def iter_jsonl(path: pathlib.Path):
    if not path.exists():
        return
    with path.open("r", encoding="utf-8") as handle:
        for line in handle:
            line = line.strip()
            if line:
                yield json.loads(line)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", default="calibration/human_rankings.jsonl")
    parser.add_argument("--out", default="calibration/pairwise_preferences.jsonl")
    parser.add_argument("--max-distance", type=int, default=0, help="Only export pairs within N ranking positions; 0 means all pairs")
    args = parser.parse_args()

    in_path = pathlib.Path(args.input)
    out_path = pathlib.Path(args.out)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    count = 0
    with out_path.open("w", encoding="utf-8") as out:
        for record in iter_jsonl(in_path) or []:
            ranking = record.get("human_ranking") or []
            for i, preferred in enumerate(ranking):
                for j, rejected in enumerate(ranking[i + 1 :], start=i + 1):
                    if args.max_distance and (j - i) > args.max_distance:
                        continue
                    pair: dict[str, Any] = {
                        "schema_version": "pairwise_preference.v1",
                        "run_id": record.get("run_id"),
                        "pair_id": f"{record.get('run_id')}::{preferred}::over::{rejected}",
                        "preferred_strategy": preferred,
                        "rejected_strategy": rejected,
                        "reason": record.get("reason", ""),
                        "failure_tags": record.get("failure_tags", []),
                        "model_winner": record.get("model_winner"),
                        "human_winner": record.get("human_winner"),
                        "intake_hash": record.get("intake_hash"),
                    }
                    out.write(json.dumps(pair, sort_keys=True) + "\n")
                    count += 1
    print(f"wrote {count} pairwise preference records to {out_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
