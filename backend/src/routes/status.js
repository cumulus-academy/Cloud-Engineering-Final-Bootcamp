import { Router } from "express";
import { checkDb } from "../db.js";

const router = Router();

// GET /api/status -> platform status for the Status page.
//
// This is intentionally simple but useful: it reports the health of each
// component the API can see. Right now that's the API process and the database.
//
// TODO (students, Milestone 10): extend this to reflect real cloud signals,
// e.g. surface CloudWatch alarm state, the visitor-counter Lambda, or RDS
// metrics. Keep it read-only and cheap — it is polled by the public site.
router.get("/", async (_req, res, next) => {
  try {
    const db = await checkDb();

    const components = [
      {
        name: "API",
        status: "operational",
        detail: `up ${Math.round(process.uptime())}s`,
      },
      {
        name: "Database",
        status: db.ok ? "operational" : "down",
        detail: db.ok ? `responding in ${db.latencyMs}ms` : "not reachable",
      },
      // TODO: add { name: "Visitor Counter (Lambda)", ... } once deployed.
      // TODO: add { name: "Contact Form (Lambda)", ... } once deployed.
    ];

    const allOperational = components.every((c) => c.status === "operational");

    res.json({
      overall: allOperational ? "operational" : "degraded",
      components,
      checkedAt: new Date().toISOString(),
    });
  } catch (err) {
    next(err);
  }
});

export default router;
