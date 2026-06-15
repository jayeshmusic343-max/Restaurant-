import { useEffect, useState } from "react";
import API from "../../api/api";

function AdminOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/admin/orders");

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/admin/order-status/${id}`, { status });

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-orders">

      <h1>Orders Management</h1>

      {orders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">

            <h3>Order #{order.id}</h3>

            <p>User ID: {order.user_id}</p>

            <p>Total: ₹{order.total_price}</p>

            <p>Address: {order.address}</p>

            <p>Status: {order.status}</p>

            <select
              value={order.status || "Pending"}
              onChange={(e) =>
                updateStatus(order.id, e.target.value)
              }
            >
              <option value="Pending">Pending</option>
              <option value="Preparing">Preparing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>

          </div>
        ))
      )}

    </div>
  );
}

export default AdminOrders;