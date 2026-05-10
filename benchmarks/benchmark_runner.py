#!/usr/bin/env python3
"""Run the integrated pipeline across benchmark task JSON files."""
from __future__ import annotations

import argparse
import json
import pathlib
import subprocess
import sys
from typing import Any

ROOT = pathlib.Path(__file__).resolve().parents[1]


def load_json(path: pathlib.Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--tasks-dir", default="benchmarks/tasks")
    parser.add_argument("--out", required=True)
    parser.add_argument("--diagnosis-provider", default="openai", choices=["gemini", "openai", "anthropic"])
    parser.add_argument("--validator-provider", default=None, choices=["gemini", "openai", "anthropic"])
    parser.add_argument("--evaluator-provider", default="openai", choices=["gemini", "openai", "anthropic"])
    parser.add_argument("--diagnosis-model", default=None)
    parser.add_argument("--validator-model", default=None)
    parser.add_argument("--evaluator-model", default=None)
    parser.add_argument("--references", default=None)
    parser.add_argument("--judge-panel", action="store_true")
    parser.add_argument("--blind-pairwise", action="store_true")
    parser.add_argument("--pairwise", action="store_true")
    parser.add_argument("--synthesize-top-k", type=int, default=0)
    parser.add_argument("--skip-architect", action="store_true")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    tasks_dir = (ROOT / args.tasks_dir).resolve() if not pathlib.Path(args.tasks_dir).is_absolute() else pathlib.Path(args.tasks_dir)
    out_root = (ROOT / args.out).resolve() if not pathlib.Path(args.out).is_absolute() else pathlib.Path(args.out)
    out_root.mkdir(parents=True, exist_ok=True)
    tasks = sorted(tasks_dir.glob("*.json"))
    summary: list[dict[str, Any]] = []

    for task_path in tasks:
        task = load_json(task_path)
        task_id = task.get("task_id", task_path.stem)
        run_dir = out_root / task_id
        cmd = [
            sys.executable,
            str(ROOT / "integrated_pipeline.py"),
            "--input", str(task_path),
            "--out", str(run_dir),
            "--diagnosis-provider", args.diagnosis_provider,
            "--evaluator-provider", args.evaluator_provider,
            "--use-diagnosis-strategies",
        ]
        if args.validator_provider:
            cmd += ["--validator-provider", args.validator_provider]
        if args.diagnosis_model:
            cmd += ["--diagnosis-model", args.diagnosis_model]
        if args.validator_model:
            cmd += ["--validator-model", args.validator_model]
        if args.evaluator_model:
            cmd += ["--evaluator-model", args.evaluator_model]
        if args.references:
            cmd += ["--references", args.references]
        if args.judge_panel:
            cmd += ["--judge-panel"]
        if args.blind_pairwise:
            cmd += ["--blind-pairwise"]
        if args.pairwise:
            cmd += ["--pairwise"]
        if args.synthesize_top_k:
            cmd += ["--synthesize-top-k", str(args.synthesize_top_k)]
        if args.skip_architect:
            cmd += ["--skip-architect"]

        print("\n===", task_id, "===")
        print(" ".join(cmd))
        if args.dry_run:
            status = 0
        else:
            status = subprocess.run(cmd, cwd=ROOT).returncode
        summary.append({"task_id": task_id, "task_path": str(task_path), "run_dir": str(run_dir), "returncode": status})

    (out_root / "benchmark_summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    return 0 if all(item["returncode"] == 0 for item in summary) else 1


if __name__ == "__main__":
    raise SystemExit(main())
