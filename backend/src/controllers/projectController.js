import { v4 as uuidv4 } from "uuid";
import pool from "../config/db.js";

/**
 * CREATE PROJECT
 */
export const createProject = async (req, res) => {
  const { name, description } = req.body;

  try {
    const count = await pool.query(
      "SELECT COUNT(*) FROM projects WHERE tenant_id=$1",
      [req.tenantId]
    );

    if (parseInt(count.rows[0].count) >= 3) {
      return res.status(403).json({ message: "Project limit reached" });
    }

    await pool.query(
      `INSERT INTO projects (id, tenant_id, name, description, created_by)
       VALUES ($1,$2,$3,$4,$5)`,
      [uuidv4(), req.tenantId, name, description, req.user.userId]
    );

    res.status(201).json({ success: true, message: "Project created" });
  } catch (err) {
    res.status(500).json({ message: "Failed to create project" });
  }
};

/**
 * LIST PROJECTS
 */
export const listProjects = async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM projects WHERE tenant_id=$1 ORDER BY created_at DESC",
    [req.tenantId]
  );

  res.json({ success: true, data: result.rows });
};
