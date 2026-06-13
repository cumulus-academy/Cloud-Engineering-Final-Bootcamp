#!/usr/bin/env bash
# Convenience wrapper around `make down`.
# Pass --clean to also delete the database volume.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ "${1:-}" == "--clean" ]]; then
  docker compose down -v
  echo ">> Local stack stopped and database volume removed."
else
  docker compose down
  echo ">> Local stack stopped (database volume kept)."
fi
