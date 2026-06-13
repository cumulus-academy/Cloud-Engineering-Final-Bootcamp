// =============================================================================
// Smoke test for the health endpoint.
// =============================================================================
// Runs with Node's built-in test runner: `npm test`.
// This test does NOT require a database, so it is safe to run in CI
// (Milestone 8) without standing up postgres.
// =============================================================================

import { test } from "node:test";
import assert from "node:assert/strict";
import { createApp } from "../src/app.js";

function startServer() {
  const app = createApp();
  return new Promise((resolve) => {
    const server = app.listen(0, () => resolve(server));
  });
}

test("GET /api/health returns ok", async () => {
  const server = await startServer();
  const { port } = server.address();
  try {
    const res = await fetch(`http://127.0.0.1:${port}/api/health`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.status, "ok");
    assert.equal(body.service, "backend");
    assert.ok(typeof body.uptimeSeconds === "number");
  } finally {
    server.close();
  }
});

test("unknown route returns 404 JSON", async () => {
  const server = await startServer();
  const { port } = server.address();
  try {
    const res = await fetch(`http://127.0.0.1:${port}/nope`);
    assert.equal(res.status, 404);
    const body = await res.json();
    assert.equal(body.error, "Not found");
  } finally {
    server.close();
  }
});
