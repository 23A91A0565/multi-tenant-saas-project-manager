import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import pool from "../config/db.js";
import { generateToken } from "../utils/jwt.js";

/**
 * REGISTER TENANT
 */
export const registerTenant = async (req, res) => {
  const { tenantName, subdomain, adminEmail, adminPassword, adminFullName } = req.body;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const tenantId = uuidv4();
    const userId = uuidv4();
    const passwordHash = await bcrypt.hash(adminPassword, 10);

    // create tenant
    await client.query(
      `INSERT INTO tenants (id, name, subdomain, status, subscription_plan, max_users, max_projects)
       VALUES ($1,$2,$3,'active','free',5,3)`,
      [tenantId, tenantName, subdomain]
    );

    // create admin user
    await client.query(
      `INSERT INTO users (id, tenant_id, email, password_hash, full_name, role)
       VALUES ($1,$2,$3,$4,$5,'tenant_admin')`,
      [userId, tenantId, adminEmail, passwordHash, adminFullName]
    );

    await client.query("COMMIT");

    return res.status(201).json({
      success: true,
      message: "Tenant registered successfully",
      data: {
        tenantId,
        subdomain,
        adminUser: {
          id: userId,
          email: adminEmail,
          fullName: adminFullName,
          role: "tenant_admin"
        }
      }
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return res.status(500).json({ message: "Registration failed" });
  } finally {
    client.release();
  }
};

/**
 * LOGIN
 */
export const login = async (req, res) => {
  const { email, password, tenantSubdomain } = req.body;

  try {
    const tenantResult = await pool.query(
      "SELECT * FROM tenants WHERE subdomain=$1",
      [tenantSubdomain]
    );

    if (tenantResult.rows.length === 0) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    const tenant = tenantResult.rows[0];

    const userResult = await pool.query(
      "SELECT * FROM users WHERE email=$1 AND tenant_id=$2",
      [email, tenant.id]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = userResult.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({
      userId: user.id,
      tenantId: user.tenant_id,
      role: user.role
    });

    return res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.full_name,
          role: user.role,
          tenantId: user.tenant_id
        },
        token,
        expiresIn: 86400
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Login failed" });
  }
};
