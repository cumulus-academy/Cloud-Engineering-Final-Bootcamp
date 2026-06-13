#!/usr/bin/env bash
# =============================================================================
# Re-apply the database schema + seed into the RUNNING local postgres container.
#
# Postgres already runs schema/seed automatically the FIRST time its volume is
# created (see docker-compose.yml). Use this script when you want to re-apply
# them without destroying the volume — e.g. after editing the SQL.
#
# Usage:  make seed     (or)     bash scripts/seed-db.sh
# =============================================================================
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

# Load .env for credentials / container name.
if [[ -f .env ]]; then
  set -a; source .env; set +a
fi

PROJECT_NAME="${PROJECT_NAME:-cloud-portfolio}"
CONTAINER="${PROJECT_NAME}-postgres"
DB_USER="${POSTGRES_USER:-portfolio}"
DB_NAME="${POSTGRES_DB:-portfolio}"

if ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER}$"; then
  echo "ERROR: postgres container '${CONTAINER}' is not running."
  echo "       Start it first with:  make dev"
  exit 1
fi

apply_dir() {
  local dir="$1"
  if [[ ! -d "$dir" ]]; then
    echo "  (skipping ${dir} — not present yet)"
    return
  fi
  shopt -s nullglob
  local files=("$dir"/*.sql)
  if (( ${#files[@]} == 0 )); then
    echo "  (no .sql files in ${dir} yet)"
    return
  fi
  for f in "${files[@]}"; do
    echo "  applying ${f}"
    docker exec -i "$CONTAINER" psql -v ON_ERROR_STOP=1 -U "$DB_USER" -d "$DB_NAME" < "$f"
  done
}

echo ">> Applying schema..."
apply_dir "database/schema"
echo ">> Applying seed..."
apply_dir "database/seed"
echo ">> Done."
