import { Router } from "express";
import { query } from "../db.js";

const router = Router();

// GET /api/projects -> list, featured first
router.get("/", async (_req, res, next) => {
  try {
    const { rows } = await query(
      `SELECT id, title, summary, description, tech, repo_url, demo_url, featured, display_order
         FROM projects
        ORDER BY featured DESC, display_order ASC, title ASC`
    );
    res.json({ projects: rows, count: rows.length });
  } catch (err) {
    next(err);
  }
});

export default router;
