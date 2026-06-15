import bcrypt from "bcryptjs";
import db from "./config/db.js";

(async () => {
  const hash = await bcrypt.hash("admin123", 10);
  console.log("Generated hash:", hash);
  
  const sql = "UPDATE admins SET password = ? WHERE email = ?";
  db.query(sql, [hash, "admin@example.com"], (err) => {
    if (err) {
      console.log("❌ Error:", err.message);
    } else {
      console.log("✅ Admin password updated");
    }
    process.exit(0);
  });
})();
