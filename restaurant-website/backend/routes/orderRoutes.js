import express from "express";
import db from "../config/db.js";

const router = express.Router();

/* =========================
   PLACE ORDER API
========================= */
router.post("/place", (req, res) => {

  const { user_id, cart, total_price } = req.body;

  if (!cart || cart.length === 0) {
    return res.status(400).json({
      message: "Cart is empty"
    });
  }

  const orderSql = `
    INSERT INTO orders (user_id, total_price)
    VALUES (?, ?)
  `;

  const itemSql = `
    INSERT INTO order_items
    (order_id, product_id, name, price, quantity, image)
    VALUES ?
  `;

  const clearSql = `
    DELETE FROM cart
    WHERE user_id = ?
  `;

  // Use transaction to prevent partial order creation
  db.beginTransaction((txErr) => {
    if (txErr) return res.status(500).json(txErr);

    db.query(orderSql, [user_id, total_price], (err, result) => {
      if (err) {
        return db.rollback(() => {
          res.status(500).json(err);
        });
      }

      const orderId = result.insertId;

      const values = cart.map((item) => [
        orderId,
        item.id,
        item.name,
        item.price,
        item.quantity,
        item.image
      ]);

      db.query(itemSql, [values], (err2) => {
        if (err2) {
          return db.rollback(() => {
            res.status(500).json(err2);
          });
        }

        db.query(clearSql, [user_id], (err3) => {
          if (err3) {
            return db.rollback(() => {
              res.status(500).json(err3);
            });
          }

          db.commit((commitErr) => {
            if (commitErr) {
              return db.rollback(() => {
                res.status(500).json(commitErr);
              });
            }

            res.status(200).json({
              message: "Order Placed Successfully",
              order_id: orderId
            });
          });
        });

      });

    });
  });

});


/* =========================
   GET ORDER DETAILS
========================= */
router.get("/details/:order_id", (req, res) => {

  const sql = `
    SELECT *
    FROM order_items
    WHERE order_id = ?
  `;

  db.query(sql, [req.params.order_id], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(result);

  });

});


/* =========================
   GET USER ORDERS
========================= */
router.get("/:user_id", (req, res) => {

  const sql = `
    SELECT *
    FROM orders
    WHERE user_id = ?
    ORDER BY id DESC
  `;

  db.query(sql, [req.params.user_id], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(result);

  });

});

export default router;