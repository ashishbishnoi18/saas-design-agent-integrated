#!/usr/bin/env python3
"""Validate a strategic_diagnosis.v1 JSON file.

Usage:
  python3 src/validate_diagnosis.py \
    --schema schemas/strategic-diagnosis.v1.schema.json \
    --diagnosis path/to/strategic_diagnosis.json
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

try:
    import jsonschema
except ImportError as exc:  # pragma: no cover
    raise SystemExit("Missing dependency: jsonschema. Run: pip install -r requirements.txt") from exc

# Allow running from repo root or src directory.
CURRENT_DIR = Path(__file__).resolve().parent
if str(CURRENT_DIR) not in sys.path:
    sys.path.insert(0, str(CURRENT_DIR))

from extra_checks import run_extra_deterministic_checks  # noqa: E402


def load_json(path: Path) -> dict:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        raise SystemExit(f"Invalid JSON in {path}: {exc}") from exc


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--schema", required=True, type=Path)
    parser.add_argument("--diagnosis", required=True, type=Path)
    parser.add_argument("--pretty", action="store_true")
    args = parser.parse_args()

    schema = load_json(args.schema)
    diagnosis = load_json(args.diagnosis)

    schema_errors = []
    validator = jsonschema.Draft202012Validator(schema)
    for error in sorted(validator.iter_errors(diagnosis), key=lambda e: list(e.path)):
        schema_errors.append({
            "path": "/" + "/".join(str(p) for p in error.path),
            "message": error.message,
        })

    schema_result = {
        "passed": len(schema_errors) == 0,
        "errors": schema_errors,
    }
    extra_result = run_extra_deterministic_checks(diagnosis) if schema_result["passed"] else {
        "passed": False,
        "errors": [{"field": "schema", "error": "extra checks skipped because schema failed"}],
        "warnings": [],
        "summary": {"hard_error_count": 1, "warning_count": 0},
    }

    result = {
        "passed": schema_result["passed"] and extra_result["passed"],
        "schema_validation": schema_result,
        "extra_deterministic_checks": extra_result,
    }

    if args.pretty:
        print(json.dumps(result, indent=2, ensure_ascii=False))
    else:
        print(json.dumps(result, ensure_ascii=False))

    return 0 if result["passed"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
