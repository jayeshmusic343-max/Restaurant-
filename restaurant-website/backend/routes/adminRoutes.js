import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../utils/cloudinaryConfig.js";

const router = express.Router();

/* =========================
   UPLOAD IMAGE
========================= */
router.post("/upload-image", adminMiddleware, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  res.status(200).json({
    success: true,
    message: "Image uploaded successfully",
    image_url: req.file.path,
  });
});

/* =========================
   ADMIN LOGIN
========================= */

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM admins WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Server Error",
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Admin Not Found",
        });
      }

      const admin = result[0];

      const match = await bcrypt.compare(
        password,
        admin.password
      );

      if (!match) {
        return res.status(400).json({
          success: false,
          message: "Wrong Password",
        });
      }

      const token = jwt.sign(
        {
          id: admin.id,
          role: "admin",
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.status(200).json({
        success: true,
        message: "Admin Login Success",
        token,
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
        },
      });
    }
  );
});

/* =========================
   DASHBOARD STATS
========================= */

router.get("/dashboard", adminMiddleware, (req, res) => {
  const dashboardData = {};

  db.query(
    "SELECT COUNT(*) AS totalUsers FROM users",
    (err, users) => {
      if (err) {
        return res.status(500).json(err);
      }

      dashboardData.totalUsers =
        users[0].totalUsers;

      db.query(
        "SELECT COUNT(*) AS totalProducts FROM products",
        (err2, products) => {
          if (err2) {
            return res.status(500).json(err2);
          }

          dashboardData.totalProducts =
            products[0].totalProducts;

          db.query(
            "SELECT COUNT(*) AS totalOrders FROM orders",
            (err3, orders) => {
              if (err3) {
                return res.status(500).json(err3);
              }

              dashboardData.totalOrders =
                orders[0].totalOrders;

              db.query(
                "SELECT SUM(total_price) AS revenue FROM orders",
                (err4, revenue) => {
                  if (err4) {
                    return res.status(500).json(err4);
                  }

                  dashboardData.revenue =
                    revenue[0].revenue || 0;

                  res.status(200).json({
                    success: true,
                    data: dashboardData,
                  });
                }
              );
            }
          );
        }
      );
    }
  );
});

/* =========================
   GET ALL ORDERS
========================= */

router.get("/orders", (req, res) => {
  adminMiddleware(req, res, () => {
  db.query(
    "SELECT * FROM orders ORDER BY id DESC",
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(200).json(result);
    }
  );
  });
});

/* =========================
   UPDATE ORDER STATUS
========================= */

router.put("/order-status/:id", adminMiddleware, (req, res) => {
  const { status } = req.body;

  const sql = `
    UPDATE orders
    SET status = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [status, req.params.id],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(200).json({
        success: true,
        message: "Order Updated",
      });
    }
  );
});

/* =========================
   GET ALL PRODUCTS
========================= */

router.get("/products", (req, res) => {
  adminMiddleware(req, res, () => {
  db.query(
    "SELECT * FROM products ORDER BY id DESC",
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(200).json(result);
    }
  );
  });
});

/* =========================
   ADD PRODUCT
========================= */

router.post("/add-product", adminMiddleware, (req, res) => {
  const {
    name,
    price,
    image,
    category,
    description,
  } = req.body;

  const sql = `
    INSERT INTO products
    (
      name,
      price,
      image,
      category,
      description
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      name,
      price,
      image,
      category,
      description,
    ],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        success: true,
        message: "Product Added Successfully",
      });
    }
  );
});

/* =========================
   UPDATE PRODUCT
========================= */

router.put("/update-product/:id", adminMiddleware, (req, res) => {
  const {
    name,
    price,
    image,
    category,
    description,
  } = req.body;

  const sql = `
    UPDATE products
    SET
      name = ?,
      price = ?,
      image = ?,
      category = ?,
      description = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      name,
      price,
      image,
      category,
      description,
      req.params.id,
    ],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(200).json({
        success: true,
        message: "Product Updated Successfully",
      });
    }
  );
});

/* =========================
   DELETE PRODUCT
========================= */

router.delete(
  "/delete-product/:id",
  adminMiddleware,
  (req, res) => {
    db.query(
      "DELETE FROM products WHERE id = ?",
      [req.params.id],
      (err) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.status(200).json({
          success: true,
          message: "Product Deleted Successfully",
        });
      }
    );
  }
);

export default router;