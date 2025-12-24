import bcrypt from "bcrypt";
import pool from "./src/config/db.js";

async function reset() {
  const plain = "Demo@123";

  const hash = await bcrypt.hash(plain, 10);

  await pool.query(
    `UPDATE users
     SET password_hash = $1
     WHERE email = 'admin@demo.com'`,
    [hash]
  );

  console.log("✅ Admin password reset to Demo@123");
  process.exit(0);
}

reset();
