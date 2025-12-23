import { v4 as uuidv4 } from "uuid";
import pool from "../config/db.js";

export const logAudit = async ({
  tenantId,
  userId,
  action,
  entityType,
  entityId,
  ipAddress
}) => {
  try {
    await pool.query(
      `INSERT INTO audit_logs
       (id, tenant_id, user_id, action, entity_type, entity_id, ip_address)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [
        uuidv4(),
        tenantId || null,
        userId || null,
        action,
        entityType,
        entityId || null,
        ipAddress || null
      ]
    );
  } catch (err) {
    console.error("Audit log failed:", err.message);
  }
};
