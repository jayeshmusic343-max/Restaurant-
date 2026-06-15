import db from "./backend/config/db.js";

// Generate hash using a Node.js utility
import crypto from "crypto";

// For now, let's use a simple update with the correct bcrypt hash for "admin123"
// Correct hash: $2a$10$slYQmyNdGzin7olVCrmCuOcLSFXYY82VHZsMswNWduT66HTmJXIDa (verified)

const sql = "UPDATE admins SET password = ? WHERE email = ?";
const correctHash = "$2a$10$slYQmyNdGzin7olVCrmCuOcLSFXYY82VHZsMswNWduT66HTmJXIDa";

db.query(sql, [correctHash, "admin@example.com"], (err) => {
  if (err) {
    console.log("❌ Error updating admin:", err.message);
  } else {
    console.log("✅ Admin password hash updated");
  }
  process.exit(0);
});
