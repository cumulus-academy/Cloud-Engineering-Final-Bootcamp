// =============================================================================
// Database access (PostgreSQL via node-postgres / pg)
// =============================================================================
// Provided by the academy. You do not need to change application code.
//
// Connection details come from the DATABASE_URL environment variable.
//   - Locally: set by docker-compose from your .env
//   - In AWS:  you will inject this from AWS Secrets Manager (Milestone 3)
// =============================================================================

import pg from "pg";

const { Pool } = pg;

// A single shared connection pool for the process.
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Conservative defaults that work for a small app on RDS.
  max: 5,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

pool.on("error", (err) => {
  // Don't crash on a transient idle-client error; log and continue.
  console.error("[db] unexpected idle client error:", err.message);
});

/** Run a parameterized query. */
export function query(text, params) {
  return pool.query(text, params);
}

/** Lightweight connectivity check used by the status/health endpoints. */
export async function checkDb() {
  const start = Date.now();
  try {
    await pool.query("SELECT 1");
    return { ok: true, latencyMs: Date.now() - start };
  } catch (err) {
    return { ok: false, error: err.message, latencyMs: Date.now() - start };
  }
}
