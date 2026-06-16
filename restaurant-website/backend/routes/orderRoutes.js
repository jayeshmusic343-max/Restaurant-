import express from "express";
import db from "../config/db.js";

const router = express.Router();

/* ==========================================
   1. PLACE ORDER API (ऑर्डर प्लेस करने के लिए)
   ========================================== */
router.post("/place", (req, res) => {
  const { user_id, cart, total_price } = req.body;

  if (!cart || cart.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
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

  // Partial order creation से बचने के लिए Transaction का उपयोग
  db.beginTransaction((txErr) => {
    if (txErr) return res.status(500).json(txErr);

    // स्टेप 1: orders टेबल में एंट्री करें
    db.query(orderSql, [user_id, total_price], (err, result) => {
      if (err) {
        return db.rollback(() => res.status(500).json(err));
      }

      const orderId = result.insertId;

      // बल्क इंसर्ट के लिए डेटा तैयार करें
      const values = cart.map((item) => [
        orderId,
        item.id,
        item.name,
        item.price,
        item.quantity,
        item.image
      ]);

      // स्टेप 2: order_items टेबल में आइटम्स डालें
      db.query(itemSql, [values], (err2) => {
        if (err2) {
          return db.rollback(() => res.status(500).json(err2));
        }

        // स्टेप 3: यूजर के कार्ट को खाली करें
        db.query(clearSql, [user_id], (err3) => {
          if (err3) {
            return db.rollback(() => res.status(500).json(err3));
          }

          // सब कुछ सफल होने पर बदलावों को Commit करें
          db.commit((commitErr) => {
            if (commitErr) {
              return db.rollback(() => res.status(500).json(commitErr));
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

/* ==========================================
   2. GET ORDER DETAILS (ऑर्डर के आइटम्स देखने के लिए)
   ========================================== */
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

/* ==========================================
   3. CANCEL ORDER API (ऑर्डर कैंसिल करने के लिए)
   ========================================== */
router.put("/cancel/:id", (req, res) => {
  const orderId = req.params.id;

  // फ्रंटएंड के केस-सेंसिटिव चेक (o.status === 'Cancelled') से मैच करने के लिए 'Cancelled' किया है
  const sql = `UPDATE orders SET status = 'Cancelled' WHERE id = ?`;
  
  db.query(sql, [orderId], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    
    res.status(200).json({ 
      success: true, 
      message: "Order cancelled successfully" 
    });
  });
});

/* ==========================================
   4. SEND DELIVERY OTP (डिलीवरी ओटीपी जनरेट करने के लिए)
   ========================================== */
router.post("/send-delivery-otp", (req, res) => {
  const { order_id } = req.body;
  
  // 4 डिजिट का रैंडम OTP जनरेट करें
  const otp = Math.floor(1000 + Math.random() * 9000); 

  const sql = `UPDATE orders SET delivery_otp = ? WHERE id = ?`;
  
  db.query(sql, [otp, order_id], (err) => {
    if (err) {
      return res.status(500).json(err);
    }
    
    // टर्मिनल (Console) में OTP दिखेगा ताकि तुम देखकर टेस्ट कर सको
    console.log(`Order #${order_id} के लिए जनरेटेड OTP: ${otp}`); 
    
    res.status(200).json({ 
      success: true, 
      message: "OTP sent successfully", 
      otp: otp 
    });
  });
});

/* ==========================================
   5. VERIFY OTP & MARK SUCCESSFUL (ओटीपी चेक करके ऑर्डर पूरा करने के लिए)
   ========================================== */
router.put("/verify-delivery-otp", (req, res) => {
  const { order_id, user_otp } = req.body;
  
  const checkSql = `SELECT delivery_otp FROM orders WHERE id = ?`;

  db.query(checkSql, [order_id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.status(404).json({ message: "Order not found" });

    const correctOtp = result[0].delivery_otp;

    // यूजर द्वारा टाइप किया हुआ OTP चेक करें
    if (String(user_otp) === String(correctOtp)) {
      // सही होने पर स्टेटस 'Delivered' होगा और OTP कॉलम वापस खाली (NULL) हो जाएगा
      const updateSql = `UPDATE orders SET status = 'Delivered', delivery_otp = NULL WHERE id = ?`;
      
      db.query(updateSql, [order_id], (err2) => {
        if (err2) return res.status(500).json(err2);
        
        return res.status(200).json({ 
          success: true, 
          message: "Order Completed Successfully! 🎉" 
        });
      });
    } else {
      // गलत OTP होने पर एरर मैसेज
      return res.status(400).json({ 
        success: false, 
        message: "Wrong OTP! Please try again." 
      });
    }
  });
});

/* ==========================================
   6. GET USER ORDERS (यूजर के सभी ऑर्डर्स देखने के लिए)
   ========================================== */
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