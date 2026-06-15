import express from "express";
import db from "../config/db.js";

const router = express.Router();

/* =====================
   ADD TO WISHLIST
===================== */

router.post("/add", (req, res) => {

  const {
    user_id,
    product_id,
    name,
    price,
    image
  } = req.body;

  const checkSql = `
    SELECT *
    FROM wishlist
    WHERE user_id = ?
    AND product_id = ?
  `;

  db.query(
    checkSql,
    [user_id, product_id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      if (result.length > 0) {

        return res.json({
          message: "Already Added"
        });

      }

      const sql = `
        INSERT INTO wishlist
        (
          user_id,
          product_id,
          name,
          price,
          image
        )
        VALUES (?, ?, ?, ?, ?)
      `;

      db.query(
        sql,
        [
          user_id,
          product_id,
          name,
          price,
          image
        ],
        (err2) => {

          if (err2) {
            return res.status(500).json(err2);
          }

          res.json({
            message: "Added To Wishlist"
          });

        }
      );

    }
  );

});

/* =====================
   GET WISHLIST
===================== */

router.get("/:user_id", (req, res) => {

  const sql = `
    SELECT *
    FROM wishlist
    WHERE user_id = ?
  `;

  db.query(
    sql,
    [req.params.user_id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);

    }
  );

});

/* =====================
   REMOVE WISHLIST
===================== */

router.delete("/remove", (req, res) => {

  const {
    user_id,
    product_id
  } = req.body;

  const sql = `
    DELETE FROM wishlist
    WHERE user_id = ?
    AND product_id = ?
  `;

  db.query(
    sql,
    [user_id, product_id],
    (err) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Removed"
      });

    }
  );

});

export default router;