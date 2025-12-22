import { v4 as uuidv4 } from "uuid";
import pool from "../config/db.js";

/**
 * CREATE TASK
 */
export const createTask = async (req, res) => {
  const { title, description, assignedTo, priority, dueDate } = req.body;
  const { projectId } = req.params;

  const project = await pool.query(
    "SELECT tenant_id FROM projects WHERE id=$1",
    [projectId]
  );

  if (project.rows.length === 0) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (project.rows[0].tenant_id !== req.tenantId) {
    return res.status(403).json({ message: "Unauthorized project access" });
  }

  await pool.query(
    `INSERT INTO tasks
     (id, project_id, tenant_id, title, description, assigned_to, priority, due_date)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
    [
      uuidv4(),
      projectId,
      req.tenantId,
      title,
      description,
      assignedTo || null,
      priority || "medium",
      dueDate || null
    ]
  );

  res.status(201).json({ success: true, message: "Task created" });
};

/**
 * LIST TASKS
 */
export const listTasks = async (req, res) => {
  const { projectId } = req.params;

  const result = await pool.query(
    "SELECT * FROM tasks WHERE project_id=$1 AND tenant_id=$2",
    [projectId, req.tenantId]
  );

  res.json({ success: true, data: result.rows });
};


export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    const tenantId = req.tenantId; // ✅ consistent

    const allowedStatuses = ["todo", "in_progress", "completed"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value"
      });
    }

    const result = await pool.query(
      `
      UPDATE tasks
      SET status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2 AND tenant_id = $3
      RETURNING id, status, updated_at
      `,
      [status, taskId, tenantId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error("Update task status error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update task status"
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const tenantId = req.tenantId;

    const {
      title,
      description,
      status,
      priority,
      assignedTo,
      dueDate
    } = req.body;

    const allowedStatuses = ["todo", "in_progress", "completed"];
    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value"
      });
    }

    const fields = [];
    const values = [];
    let index = 1;

    if (title !== undefined) {
      fields.push(`title = $${index++}`);
      values.push(title);
    }
    if (description !== undefined) {
      fields.push(`description = $${index++}`);
      values.push(description);
    }
    if (status !== undefined) {
      fields.push(`status = $${index++}`);
      values.push(status);
    }
    if (priority !== undefined) {
      fields.push(`priority = $${index++}`);
      values.push(priority);
    }
    if (assignedTo !== undefined) {
      fields.push(`assigned_to = $${index++}`);
      values.push(assignedTo);
    }
    if (dueDate !== undefined) {
      fields.push(`due_date = $${index++}`);
      values.push(dueDate);
    }

    if (fields.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update"
      });
    }

    const query = `
      UPDATE tasks
      SET ${fields.join(", ")}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${index} AND tenant_id = $${index + 1}
      RETURNING *
    `;

    values.push(taskId, tenantId);

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.json({
      success: true,
      message: "Task updated successfully",
      data: result.rows[0]
    });

  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update task"
    });
  }
};

