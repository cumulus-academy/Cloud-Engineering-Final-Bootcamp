#!/usr/bin/env bash
# Thin wrapper so you can run the customization engine without remembering the
# node path. Identical to `make customize`.
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec node "${SCRIPT_DIR}/apply-customization.mjs"
