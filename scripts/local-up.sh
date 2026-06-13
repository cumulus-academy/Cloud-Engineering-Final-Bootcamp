#!/usr/bin/env bash
# Convenience wrapper around `make dev` for students who prefer scripts.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ ! -f .env ]]; then
  echo ">> No .env found — running customization first."
  node scripts/apply-customization.mjs
fi

docker compose up -d --build
echo ">> Local stack started. Use 'make logs' to follow output."
