import { Router } from "express";

const router = Router();

// GET /api/health -> liveness probe. Intentionally does NOT touch the database,
// so Kubernetes/ALB can tell "the process is up" separately from "the DB is up".
// Use this for your Kubernetes livenessProbe (Milestone 5).
router.get("/", (_req, res) => {
  res.json({
    status: "ok",
    service: "backend",
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

export default router;
