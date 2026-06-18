import { useEffect, useState } from "react";
import API from "../../api/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/admin/orders");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/admin/order-status/${id}`, { status });
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-orders" style={{ padding: "20px", maxWidth: 1200, margin: "0 auto" }}>
      <h1 style={{ fontSize: "clamp(24px, 3vw, 36px)", marginBottom: 16 }}>Orders Management</h1>

      {orders.length === 0 ? (
        <p style={{ color: "#6b7280" }}>No Orders Found</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {orders.map((order) => (
            <div
              key={order.id}
              className="order-card"
              style={{
                flex: "1 1 280px",
                minWidth: 260,
                background: "white",
                borderRadius: 12,
                padding: 16,
                border: "1px solid #e5e7eb"
              }}
            >
              <h3 style={{ fontSize: "18px", marginBottom: 8 }}>Order #{order.id}</h3>

              <p style={{ marginBottom: 6 }}>User ID: {order.user_id}</p>
              <p style={{ marginBottom: 6 }}>Total: ₹{order.total_price}</p>
              <p style={{ marginBottom: 6, wordBreak: "break-word" }}>Address: {order.address}</p>
              <p style={{ marginBottom: 10 }}>Status: {order.status}</p>

              <select
                value={order.status || "Pending"}
                onChange={(e) => updateStatus(order.id, e.target.value)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb" }}
              >
                <option value="Pending">Pending</option>
                <option value="Preparing">Preparing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminOrders;

