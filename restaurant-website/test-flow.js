import axios from "axios";
import db from "./backend/config/db.js";

const BASE_URL = "http://localhost:5000/api";
const testEmail = `test_${Date.now()}@example.com`;
const testPassword = "TestPass123!";

let testToken = null;
let testUserId = null;

const log = (title, msg) => {
  console.log(`\n✅ ${title}\n   ${msg}`);
};

const error = (title, msg) => {
  console.log(`\n❌ ${title}\n   ${msg}`);
  process.exit(1);
};

(async () => {
  try {
    // 1. SIGNUP
    console.log("\n🚀 TEST 1: User Signup");
    let res = await axios.post(`${BASE_URL}/auth/signup`, {
      name: "Test User",
      email: testEmail,
      password: testPassword,
    });
    log("Signup", res.data.message);

    // 2. LOGIN
    console.log("\n🚀 TEST 2: User Login");
    res = await axios.post(`${BASE_URL}/auth/login`, {
      email: testEmail,
      password: testPassword,
    });
    if (!res.data.token) error("Login", "No token returned");
    testToken = res.data.token;
    testUserId = res.data.user.id;
    log("Login", `Token: ${testToken.substring(0, 20)}... | User ID: ${testUserId}`);

    // 3. FETCH PRODUCTS
    console.log("\n🚀 TEST 3: Fetch Products");
    res = await axios.get(`${BASE_URL}/products`);
    if (!Array.isArray(res.data)) error("Products", "Response is not an array");
    const products = res.data;
    log("Products", `Fetched ${products.length} products`);
    if (products.length === 0) error("Products", "No products in database");

    // 4. PLACE ORDER
    console.log("\n🚀 TEST 4: Place Order");
    const cart = [
      {
        id: products[0].id,
        name: products[0].name,
        price: products[0].price,
        quantity: 2,
        image: products[0].image,
      },
    ];
    const totalPrice = products[0].price * 2;

    try {
      res = await axios.post(
        `${BASE_URL}/orders/place`,
        { user_id: testUserId, cart, total_price: totalPrice },
        { headers: { Authorization: `Bearer ${testToken}` } }
      );
      log("Order", `Order placed. Order ID: ${res.data.order_id}`);
    } catch (err) {
      console.log("\n❌ Order Error:");
      console.log("Status:", err.response?.status);
      console.log("Data:", err.response?.data);
      throw err;
    }
    const orderId = res.data.order_id;

    // 5. VERIFY ORDERS TABLE
    console.log("\n🚀 TEST 5: Verify Orders in DB");
    db.query("SELECT * FROM orders WHERE id = ?", [orderId], (err, result) => {
      if (err) error("Orders DB", `Query failed: ${err.message}`);
      if (result.length === 0) error("Orders DB", "Order not found");
      log("Orders Table", `Order found: ID=${result[0].id}, Total=${result[0].total_price}`);
      
      // 6. VERIFY ORDER_ITEMS TABLE
      console.log("\n🚀 TEST 6: Verify Order Items in DB");
      db.query("SELECT * FROM order_items WHERE order_id = ?", [orderId], (err2, items) => {
        if (err2) error("Order Items DB", `Query failed: ${err2.message}`);
        if (items.length === 0) error("Order Items DB", "Order items not found");
        log("Order Items Table", `Found ${items.length} items in order`);

        // 7. VERIFY CART CLEARED
        console.log("\n🚀 TEST 7: Verify Cart Cleared");
        db.query("SELECT * FROM cart WHERE user_id = ?", [testUserId], (err3, cart_items) => {
          if (err3) error("Cart", `Query failed: ${err3.message}`);
          if (cart_items.length > 0) error("Cart", "Cart not cleared after order");
          log("Cart", "Cart successfully cleared after order");

          // 8. FETCH USER ORDERS
          console.log("\n🚀 TEST 8: Fetch User Orders");
          axios.get(`${BASE_URL}/orders/${testUserId}`, {
            headers: { Authorization: `Bearer ${testToken}` }
          }).then((res) => {
            if (!Array.isArray(res.data)) error("User Orders", "Response not an array");
            if (res.data.length === 0) error("User Orders", "No orders found for user");
            log("User Orders", `User has ${res.data.length} order(s)`);

              // 9. ADMIN LOGIN
              console.log("\n🚀 TEST 9: Admin Login");
              axios.post(`${BASE_URL}/admin/login`, {
                email: "admin@example.com",
                password: "admin123"
              }).then((res) => {
                if (!res.data.token) error("Admin Login", "No admin token returned");
                const adminToken = res.data.token;
                log("Admin Login", `Admin logged in`);

                // 10. ADMIN DASHBOARD
                console.log("\n🚀 TEST 10: Admin Dashboard");
                axios.get(`${BASE_URL}/admin/dashboard`, {
                  headers: { Authorization: `Bearer ${adminToken}` }
                }).then((res) => {
                  log("Admin Dashboard", `Users: ${res.data.data.totalUsers}, Orders: ${res.data.data.totalOrders}, Revenue: ₹${res.data.data.revenue}`);

                  // 11. GET ADMIN ORDERS
                  console.log("\n🚀 TEST 11: Admin Orders List");
                  axios.get(`${BASE_URL}/admin/orders`, {
                    headers: { Authorization: `Bearer ${adminToken}` }
                  }).then((res) => {
                  log("Admin Orders", `Showing ${res.data.length} order(s)`);

                  // 12. PRODUCT ADD
                  console.log("\n🚀 TEST 12: Add Product");
                  axios.post(`${BASE_URL}/admin/add-product`, {
                    name: "Test Pizza",
                    price: 299,
                    category: "Pizza",
                    description: "Test product",
                    image: "https://via.placeholder.com/300"
                  }, {
                    headers: { Authorization: `Bearer ${adminToken}` }
                  }).then((res) => {
                    log("Product Add", res.data.message);

                    // 13. PRODUCT EDIT
                    console.log("\n🚀 TEST 13: Edit Product");
                    const productId = products[0].id;
                    axios.put(`${BASE_URL}/admin/update-product/${productId}`, {
                      name: "Updated Burger",
                      price: 299,
                      category: "Burger",
                      description: "Updated description",
                      image: products[0].image
                    }, {
                      headers: { Authorization: `Bearer ${adminToken}` }
                    }).then((res) => {
                      log("Product Edit", res.data.message);

                      // 14. PRODUCT DELETE
                      console.log("\n🚀 TEST 14: Delete Product");
                      axios.delete(`${BASE_URL}/admin/delete-product/${productId}`, {
                        headers: { Authorization: `Bearer ${adminToken}` }
                      }).then((res) => {
                        log("Product Delete", res.data.message);

                        console.log("\n\n✅ ALL TESTS PASSED!\n");
                        process.exit(0);
                      }).catch((e) => error("Product Delete", e.response?.data?.message || e.message));
                    }).catch((e) => error("Product Edit", e.response?.data?.message || e.message));
                  }).catch((e) => error("Product Add", e.response?.data?.message || e.message));
                }).catch((e) => error("Admin Orders", e.response?.data?.message || e.message));
              }).catch((e) => error("Admin Dashboard", e.response?.data?.message || e.message));
              }).catch((e) => error("Admin Login", e.response?.data?.message || e.message));
          }).catch((e) => error("User Orders", e.response?.data?.message || e.message));
        });
      });
    });
  } catch (err) {
    error("Test", err.response?.data?.message || err.message);
  }
})();
