import db from "./backend/config/db.js";

const addPaymentColumns = () => {
  const alterSQL = `
    ALTER TABLE orders 
    ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50) DEFAULT 'COD',
    ADD COLUMN IF NOT EXISTS payment_status VARCHAR(50) DEFAULT 'pending',
    ADD COLUMN IF NOT EXISTS razorpay_order_id VARCHAR(100),
    ADD COLUMN IF NOT EXISTS razorpay_payment_id VARCHAR(100),
    ADD COLUMN IF NOT EXISTS razorpay_signature VARCHAR(100)
  `;
  
  db.query(alterSQL, (err) => {
    if (err) {
      console.log("❌ Error adding payment columns:", err.message);
    } else {
      console.log("✅ Payment columns added to orders table");
    }
    process.exit(0);
  });
};

addPaymentColumns();
