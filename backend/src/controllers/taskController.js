import { v4 as uuidv4 } from "uuid";
import pool from "../config/db.js";
import { logAudit } from "../utils/auditLogger.js";

/**
 * CREATE TASK
 */
export const createTask = async (req, res) => {
  const { title, description, priority } = req.body;
  const { projectId } = req.params;

  try {
    const projectResult = await pool.query(
      "SELECT tenant_id FROM projects WHERE id=$1",
      [projectId]
    );

    if (projectResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    const tenantId = projectResult.rows[0].tenant_id;
    const taskId = uuidv4();

    await pool.query(
      `INSERT INTO tasks (id, project_id, tenant_id, title, description, priority)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [
        taskId,
        projectId,
        tenantId,
        title,
        description || null,
        priority || "medium"
      ]
    );

    await logAudit({
      tenantId,
      userId: req.user.userId,
      action: "CREATE_TASK",
      entityType: "task",
      entityId: taskId,
      ipAddress: req.ip
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: { id: taskId }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to create task"
    });
  }
};

/**
 * LIST TASKS ✅ (THIS WAS MISSING / NOT EXPORTED)
 */
export const listTasks = async (req, res) => {
  const { projectId } = req.params;

  try {
    const result = await pool.query(
      `SELECT *
       FROM tasks
       WHERE project_id=$1 AND tenant_id=$2
       ORDER BY created_at DESC`,
      [projectId, req.tenantId]
    );

    res.json({
      success: true,
      data: result.rows
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks"
    });
  }
};

/**
 * UPDATE TASK STATUS
 */
export const updateTaskStatus = async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  try {
    const result = await pool.query(
      `UPDATE tasks
       SET status=$1, updated_at=NOW()
       WHERE id=$2 AND tenant_id=$3
       RETURNING id, status`,
      [status, taskId, req.tenantId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    await logAudit({
      tenantId: req.tenantId,
      userId: req.user.userId,
      action: "UPDATE_TASK_STATUS",
      entityType: "task",
      entityId: taskId,
      ipAddress: req.ip
    });

    res.json({
      success: true,
      data: result.rows[0]
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update task status"
    });
  }
};

/**
 * UPDATE TASK (FULL)
 */
export const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, priority, status } = req.body;

  try {
    const result = await pool.query(
      `UPDATE tasks
       SET title=COALESCE($1,title),
           description=COALESCE($2,description),
           priority=COALESCE($3,priority),
           status=COALESCE($4,status),
           updated_at=NOW()
       WHERE id=$5 AND tenant_id=$6
       RETURNING *`,
      [title, description, priority, status, taskId, req.tenantId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    await logAudit({
      tenantId: req.tenantId,
      userId: req.user.userId,
      action: "UPDATE_TASK",
      entityType: "task",
      entityId: taskId,
      ipAddress: req.ip
    });

    res.json({
      success: true,
      message: "Task updated successfully",
      data: result.rows[0]
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update task"
    });
  }
};
