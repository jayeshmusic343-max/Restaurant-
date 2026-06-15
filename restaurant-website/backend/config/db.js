import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "foodiehub",
});

db.connect((err) => {

  if (err) {

    console.log("Database Error");

    console.log(err);

  } else {

    console.log("MySQL Connected ✅");

  }

});

export default db;