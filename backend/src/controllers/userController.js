import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import pool from "../config/db.js";
import { logAudit } from "../utils/auditLogger.js";

/**
 * ADD USER (TENANT ADMIN ONLY)
 */
export const addUser = async (req, res) => {
  const { email, fullName, role = "user", password } = req.body;
  const tenantId = req.tenantId;

  try {
    // 1️⃣ Get current user count
    const userCountResult = await pool.query(
      "SELECT COUNT(*) FROM users WHERE tenant_id=$1",
      [tenantId]
    );

    // 2️⃣ Get tenant subscription limit
    const tenantResult = await pool.query(
      "SELECT max_users FROM tenants WHERE id=$1",
      [tenantId]
    );

    if (tenantResult.rows.length === 0) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    const currentUsers = parseInt(userCountResult.rows[0].count);
    const maxUsers = tenantResult.rows[0].max_users;

    if (currentUsers >= maxUsers) {
      return res.status(403).json({
        success: false,
        message: "Subscription user limit reached"
      });
    }
const countRes = await pool.query(
  "SELECT COUNT(*) FROM users WHERE tenant_id=$1",
  [tenantId]
);

const tenantRes = await pool.query(
  "SELECT max_users FROM tenants WHERE id=$1",
  [tenantId]
);

if (Number(countRes.rows[0].count) >= tenantRes.rows[0].max_users) {
  return res.status(403).json({
    success: false,
    message: "User limit reached for your subscription plan"
  });
}

    // 3️⃣ Create user
    const passwordHash = await bcrypt.hash(password, 10);
    const newUserId = uuidv4();
	
    await pool.query(
      `INSERT INTO users (id, tenant_id, email, password_hash, full_name, role)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [newUserId, tenantId, email, passwordHash, fullName, role]
    );

    // 4️⃣ Audit log
    await logAudit({
      tenantId,
      userId: req.user.userId,
      action: "CREATE_USER",
      entityType: "user",
      entityId: newUserId,
      ipAddress: req.ip
    });

    res.status(201).json({
      success: true,
      message: "User added successfully"
    });
  } catch (err) {
    console.error("Add user error:", err);
    res.status(500).json({ message: "Failed to add user" });
  }
};

/**
 * LIST USERS (TENANT-SCOPED)
 */
export const listUsers = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, email, full_name, role, is_active, created_at
       FROM users
       WHERE tenant_id=$1
       ORDER BY created_at DESC`,
      [req.tenantId]
    );

    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
