import bcrypt from "bcrypt";
import pool from "./src/config/db.js";

const run = async () => {
  const plainPassword = "Demo@123";

  const hash = await bcrypt.hash(plainPassword, 10);

  await pool.query(
    "UPDATE users SET password_hash=$1 WHERE email=$2",
    [hash, "admin@demo.com"]
  );

  console.log("✅ Password reset successful");
  process.exit(0);
};

run();
