import { useEffect, useState } from "react";
import API from "../api/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const savedUser = localStorage.getItem("user");
      if (!savedUser) {
        setOrders([]);
        setLoading(false);
        return;
      }

      let user;
      try {
        user = JSON.parse(savedUser);
      } catch {
        setOrders([]);
        setLoading(false);
        return;
      }

      try {
        const res = await API.get(`/orders/${user.id}`);
        setOrders(res.data?.orders ?? res.data ?? []);
      } catch (err) {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div style={{ padding: 40 }}>Loading orders...</div>;

  if (!orders || orders.length === 0)
    return (
      <div style={{ padding: 40 }}>
        <h2>No Orders Found</h2>
      </div>
    );

  return (
    <div style={{ padding: 20 }}>
      <h1>Your Orders</h1>
      <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
        {orders.map((o) => (
          <div key={o.id} style={{ padding: 16, borderRadius: 8, border: "1px solid #eee" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>Order #{o.id}</strong>
              <span>{new Date(o.created_at || o.created || o.date || Date.now()).toLocaleString()}</span>
            </div>
            <div style={{ marginTop: 8 }}>
              <div>Total: ₹{o.total_price}</div>
              <div>Status: {o.status || "Pending"}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
