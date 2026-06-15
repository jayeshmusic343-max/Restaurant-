import db from "./backend/config/db.js";

const createAdmin = () => {
  // Simple hash using straightforward approach without external deps in this script
  // For production, use proper bcryptjs
  const sql = "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)";
  
  // Use a pre-hashed password (this would be bcrypt.hash("admin123", 10) result in real scenario)
  const hashedPassword = "$2a$10$yWJ0tUOO6jP5tYS9f4z1Ne1qPLBq.eEJPJbvV1bBjfgIIIKNKBpDC"; // bcrypt hash of "admin123"
  
  db.query(sql, ["Admin", "admin@example.com", hashedPassword], (err) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        console.log("✅ Admin already exists");
      } else {
        console.log("❌ Error creating admin:", err.message);
      }
    } else {
      console.log("✅ Admin user created: admin@example.com / admin123");
    }
    process.exit(0);
  });
};

createAdmin();
