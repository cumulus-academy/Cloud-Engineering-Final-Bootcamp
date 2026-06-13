// =============================================================================
// Express application (read-only public API)
// =============================================================================
// Provided by the academy. No authentication — this is a public, read-only API.
//
// `app` is exported separately from the server so tests can import it without
// opening a network port. See tests/health.test.js.
// =============================================================================

import express from "express";
import cors from "cors";

import healthRouter from "./routes/health.js";
import statusRouter from "./routes/status.js";
import profileRouter from "./routes/profile.js";
import skillsRouter from "./routes/skills.js";
import certificationsRouter from "./routes/certifications.js";
import projectsRouter from "./routes/projects.js";

export function createApp() {
  const app = express();

  app.use(cors());                 // public site: allow browser reads from anywhere
  app.use(express.json());

  // Tiny request log — visible in CloudWatch once deployed (Milestone 10).
  app.use((req, _res, next) => {
    console.log(`[api] ${req.method} ${req.url}`);
    next();
  });

  // Routes
  app.use("/api/health", healthRouter);
  app.use("/api/status", statusRouter);
  app.use("/api/profile", profileRouter);
  app.use("/api/skills", skillsRouter);
  app.use("/api/certifications", certificationsRouter);
  app.use("/api/projects", projectsRouter);

  // Root helper so hitting the bare service is friendly.
  app.get("/", (_req, res) => {
    res.json({
      service: "cloud-portfolio-backend",
      endpoints: [
        "/api/health",
        "/api/status",
        "/api/profile",
        "/api/skills",
        "/api/certifications",
        "/api/projects",
      ],
    });
  });

  // 404
  app.use((req, res) => {
    res.status(404).json({ error: "Not found", path: req.url });
  });

  // Centralized error handler — returns 503 for DB/connection problems.
  // eslint-disable-next-line no-unused-vars
  app.use((err, _req, res, _next) => {
    console.error("[api] error:", err.message);
    const isDbDown = /ECONNREFUSED|timeout|terminated|database|relation .* does not exist/i.test(
      err.message
    );
    res.status(isDbDown ? 503 : 500).json({
      error: isDbDown ? "Service dependency unavailable" : "Internal server error",
      detail: err.message,
    });
  });

  return app;
}
