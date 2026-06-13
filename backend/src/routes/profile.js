import { Router } from "express";
import { query } from "../db.js";

const router = Router();

// GET /api/profile -> the single profile row
router.get("/", async (_req, res, next) => {
  try {
    const { rows } = await query(
      `SELECT name, title, email, location, bio, linkedin_url, github_url, updated_at
         FROM profile WHERE id = 1`
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Profile not found. Has the database been seeded?" });
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

export default router;
