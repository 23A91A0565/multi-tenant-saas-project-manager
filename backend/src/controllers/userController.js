import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import pool from "../config/db.js";

/**
 * ADD USER (TENANT ADMIN ONLY)
 */
export const addUser = async (req, res) => {
  const { email, fullName, role, password } = req.body;
  const tenantId = req.tenantId;

  try {
    // subscription limit check
    const countResult = await pool.query(
      "SELECT COUNT(*) FROM users WHERE tenant_id=$1",
      [tenantId]
    );

    if (parseInt(countResult.rows[0].count) >= 5) {
      return res.status(403).json({ message: "User limit reached" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users (id, tenant_id, email, password_hash, full_name, role)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [uuidv4(), tenantId, email, passwordHash, fullName, role]
    );

    res.status(201).json({ success: true, message: "User added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add user" });
  }
};

/**
 * LIST USERS (TENANT-SCOPED)
 */
export const listUsers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, email, full_name, role FROM users WHERE tenant_id=$1",
      [req.tenantId]
    );

    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
