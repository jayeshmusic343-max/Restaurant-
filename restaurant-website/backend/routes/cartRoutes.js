import express from "express";
import db from "../config/db.js";

const router = express.Router();

/* =========================
   ADD TO CART
========================= */
router.post("/add", (req, res) => {
  const { user_id, product_id, name, price, image } = req.body;

  const checkSql = `
    SELECT * FROM cart 
    WHERE user_id = ? AND product_id = ?
  `;

  db.query(checkSql, [user_id, product_id], (err, result) => {
    if (err) return res.status(500).json(err);

    // IF ITEM EXISTS → UPDATE QTY
    if (result.length > 0) {
      const updateSql = `
        UPDATE cart 
        SET quantity = quantity + 1 
        WHERE user_id = ? AND product_id = ?
      `;

      db.query(updateSql, [user_id, product_id], (err2) => {
        if (err2) return res.status(500).json(err2);

        return res.json({ message: "Quantity Updated" });
      });
    }

    // IF NEW ITEM → INSERT
    else {
      const insertSql = `
        INSERT INTO cart (user_id, product_id, name, price, image, quantity)
        VALUES (?, ?, ?, ?, ?, 1)
      `;

      db.query(
        insertSql,
        [user_id, product_id, name, price, image],
        (err3) => {
          if (err3) return res.status(500).json(err3);

          return res.json({ message: "Added to Cart" });
        }
      );
    }
  });
});

/* =========================
   GET CART ITEMS
========================= */
router.get("/:user_id", (req, res) => {
  const sql = `
    SELECT * FROM cart WHERE user_id = ?
  `;

  db.query(sql, [req.params.user_id], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
});

/* =========================
   UPDATE QUANTITY
========================= */
router.put("/update", (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  const sql = `
    UPDATE cart 
    SET quantity = ? 
    WHERE user_id = ? AND product_id = ?
  `;

  db.query(sql, [quantity, user_id, product_id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Cart Updated" });
  });
});

/* =========================
   REMOVE ITEM
========================= */
router.delete("/remove", (req, res) => {
  const { user_id, product_id } = req.body;

  const sql = `
    DELETE FROM cart 
    WHERE user_id = ? AND product_id = ?
  `;

  db.query(sql, [user_id, product_id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Item Removed" });
  });
});

export default router;