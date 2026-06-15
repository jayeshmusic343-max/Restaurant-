import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import db from "../config/db.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_1234567890123456",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "test_secret_1234567890123456",
});

/* =========================
   CREATE RAZORPAY ORDER
========================= */
router.post("/create-order", authMiddleware, async (req, res) => {
  try {
    const { amount, user_id } = req.body;

    if (!amount || !user_id) {
      return res.status(400).json({
        success: false,
        message: "Amount and user_id required",
      });
    }

    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${user_id}_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).json({
        success: false,
        message: "Failed to create Razorpay order",
      });
    }

    res.status(200).json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
      },
    });
  } catch (error) {
    console.error("Razorpay order error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* =========================
   VERIFY PAYMENT & UPDATE ORDER
========================= */
router.post("/verify-payment", authMiddleware, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cart, total_price, user_id } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment details missing",
      });
    }

    // Verify signature
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "test_secret_1234567890123456");
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generated_signature = hmac.digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    // Create order in DB with Razorpay details
    const orderSql = `
      INSERT INTO orders (user_id, total_price, payment_method, payment_status, razorpay_order_id, razorpay_payment_id, razorpay_signature)
      VALUES (?, ?, ?, ?, ?, ?, ?)
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

    db.beginTransaction((txErr) => {
      if (txErr) return res.status(500).json({ success: false, message: txErr.message });

      db.query(orderSql, [user_id, total_price, "Razorpay", "completed", razorpay_order_id, razorpay_payment_id, razorpay_signature], (err, result) => {
        if (err) {
          return db.rollback(() => {
            res.status(500).json({ success: false, message: err.message });
          });
        }

        const orderId = result.insertId;
        const values = cart.map((item) => [orderId, item.id, item.name, item.price, item.quantity, item.image]);

        db.query(itemSql, [values], (err2) => {
          if (err2) {
            return db.rollback(() => {
              res.status(500).json({ success: false, message: err2.message });
            });
          }

          db.query(clearSql, [user_id], (err3) => {
            if (err3) {
              return db.rollback(() => {
                res.status(500).json({ success: false, message: err3.message });
              });
            }

            db.commit((commitErr) => {
              if (commitErr) {
                return db.rollback(() => {
                  res.status(500).json({ success: false, message: commitErr.message });
                });
              }

              res.status(200).json({
                success: true,
                message: "Payment verified and order created",
                order_id: orderId,
              });
            });
          });
        });
      });
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
