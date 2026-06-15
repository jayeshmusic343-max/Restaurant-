import db from "./backend/config/db.js";

const addNameColumn = () => {
  const sql = "ALTER TABLE order_items ADD COLUMN name VARCHAR(255)";
  
  db.query(sql, (err) => {
    if (err) {
      if (err.code === "ER_DUP_FIELDNAME") {
        console.log("✅ Column 'name' already exists");
      } else {
        console.log("❌ Error adding column:", err.message);
      }
    } else {
      console.log("✅ Column 'name' added to order_items table");
    }
    process.exit(0);
  });
};

addNameColumn();
