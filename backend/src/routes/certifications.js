import { Router } from "express";
import { query } from "../db.js";

const router = Router();

// GET /api/certifications -> list, most recent first
router.get("/", async (_req, res, next) => {
  try {
    const { rows } = await query(
      `SELECT id, name, issuer, issued_date, credential_url, status
         FROM certifications
        ORDER BY
          CASE status WHEN 'earned' THEN 0 WHEN 'in-progress' THEN 1 ELSE 2 END,
          issued_date DESC NULLS LAST,
          name ASC`
    );
    res.json({ certifications: rows, count: rows.length });
  } catch (err) {
    next(err);
  }
});

export default router;
