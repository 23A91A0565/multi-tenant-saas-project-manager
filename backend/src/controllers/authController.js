import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const login = async (req, res) => {
  try {
	console.log("LOGIN BODY:", req.body);
    const { email, password, tenantSubdomain } = req.body;

    const tenantResult = await pool.query(
      "SELECT id FROM tenants WHERE subdomain=$1",
      [tenantSubdomain]
    );

    if (tenantResult.rows.length === 0) {
      return res.status(401).json({ message: "Invalid tenant" });
    }

    const tenantId = tenantResult.rows[0].id;

    const userResult = await pool.query(
      "SELECT * FROM users WHERE email=$1 AND tenant_id=$2",
      [email, tenantId]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = userResult.rows[0];
const isMatch = await bcrypt.compare(password, user.password_hash);

if (!isMatch) {
  return res.status(401).json({ message: "Invalid credentials" });
}


    const token = jwt.sign(
      {
        userId: user.id,
        tenantId: tenantId,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
};

export const getMe = async (req, res) => {
  try {
    const { userId, tenantId, role } = req.user;

    const userResult = await pool.query(
      `SELECT id, email, full_name, role, is_active, tenant_id
       FROM users
       WHERE id = $1`,
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    let tenant = null;

    if (tenantId) {
      const tenantResult = await pool.query(
        `SELECT id, name, subdomain, subscription_plan, max_users, max_projects
         FROM tenants
         WHERE id = $1`,
        [tenantId]
      );

      tenant = tenantResult.rows[0];
    }

    res.json({
      success: true,
      data: {
        ...userResult.rows[0],
        tenant
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

