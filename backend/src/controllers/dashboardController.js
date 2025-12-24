import pool from "../config/db.js";

export const getDashboardStats = async (req, res) => {
  try {
    const { tenantId, userId } = req.user;

    // Total tasks
    const totalTasks = await pool.query(
      "SELECT COUNT(*) FROM tasks WHERE tenant_id=$1",
      [tenantId]
    );

    // Completed tasks
    const completedTasks = await pool.query(
      "SELECT COUNT(*) FROM tasks WHERE tenant_id=$1 AND status='completed'",
      [tenantId]
    );

    // Pending tasks
    const pendingTasks = await pool.query(
      "SELECT COUNT(*) FROM tasks WHERE tenant_id=$1 AND status!='completed'",
      [tenantId]
    );

    // My tasks
    const myTasks = await pool.query(
      "SELECT COUNT(*) FROM tasks WHERE tenant_id=$1 AND assigned_to=$2",
      [tenantId, userId]
    );

    res.json({
      success: true,
      data: {
        totalTasks: Number(totalTasks.rows[0].count),
        completedTasks: Number(completedTasks.rows[0].count),
        pendingTasks: Number(pendingTasks.rows[0].count),
        myTasks: Number(myTasks.rows[0].count)
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Dashboard stats failed" });
  }
};
