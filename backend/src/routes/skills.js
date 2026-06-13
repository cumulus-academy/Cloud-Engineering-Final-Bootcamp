import { Router } from "express";
import { query } from "../db.js";

const router = Router();

// GET /api/skills -> skills grouped by category
router.get("/", async (_req, res, next) => {
  try {
    const { rows } = await query(
      `SELECT id, category, name, level, display_order
         FROM skills
        ORDER BY display_order ASC, name ASC`
    );

    // Group into { category, items: [...] } for easy rendering.
    const byCategory = new Map();
    for (const row of rows) {
      if (!byCategory.has(row.category)) byCategory.set(row.category, []);
      byCategory.get(row.category).push({ id: row.id, name: row.name, level: row.level });
    }
    const categories = [...byCategory.entries()].map(([category, items]) => ({ category, items }));

    res.json({ categories, count: rows.length });
  } catch (err) {
    next(err);
  }
});

export default router;
