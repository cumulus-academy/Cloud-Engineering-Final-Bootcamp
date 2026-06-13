// =============================================================================
// Server entrypoint
// =============================================================================
// Starts the HTTP server. Provided by the academy.
// The port comes from BACKEND_PORT (defaults to 4000).
// =============================================================================

import { createApp } from "./app.js";

const port = Number(process.env.BACKEND_PORT) || 4000;
const app = createApp();

const server = app.listen(port, () => {
  console.log(`[api] listening on http://0.0.0.0:${port}`);
});

// Graceful shutdown so Kubernetes rolling deploys are clean (Milestone 5).
for (const signal of ["SIGTERM", "SIGINT"]) {
  process.on(signal, () => {
    console.log(`[api] ${signal} received, shutting down...`);
    server.close(() => process.exit(0));
  });
}
