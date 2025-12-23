import { v4 as uuidv4 } from "uuid";
import pool from "../config/db.js";
import { logAudit } from "../utils/auditLogger.js";

/**
 * CREATE PROJECT
 */
export const createProject = async (req, res) => {
  const { name, description } = req.body;
  const tenantId = req.tenantId;
  const userId = req.user.userId;

  try {
    const projectId = uuidv4();

    await pool.query(
      `INSERT INTO projects (id, tenant_id, name, description, created_by)
       VALUES ($1,$2,$3,$4,$5)`,
      [projectId, tenantId, name, description, userId]
    );

    await logAudit({
      tenantId,
      userId,
      action: "CREATE_PROJECT",
      entityType: "project",
      entityId: projectId,
      ipAddress: req.ip
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create project" });
  }
};

/**
 * LIST PROJECTS
 */
export const listProjects = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM projects
       WHERE tenant_id = $1
       ORDER BY created_at DESC`,
      [req.tenantId]
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};
