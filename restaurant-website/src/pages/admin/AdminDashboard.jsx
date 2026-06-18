import { useEffect, useState } from "react";
import API from "../../api/api";

function AdminDashboard() {

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    revenue: 0
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {

      const res =
        await API.get("/admin/dashboard");

      setStats(res.data.data || res.data || {});

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div style={{ padding: "clamp(16px, 3.5vw, 30px)" }}>

      <h1 style={{ fontSize: "clamp(22px, 5vw, 32px)" }}>Admin Dashboard</h1>

      <hr />

      <h2 style={{ fontSize: "clamp(16px, 4vw, 22px)" }}>
        👥 Users : {stats.totalUsers}
      </h2>

      <h2 style={{ fontSize: "clamp(16px, 4vw, 22px)" }}>
        📦 Products : {stats.totalProducts}
      </h2>

      <h2 style={{ fontSize: "clamp(16px, 4vw, 22px)" }}>
        🛒 Orders : {stats.totalOrders}
      </h2>

      <h2 style={{ fontSize: "clamp(16px, 4vw, 22px)" }}>
        💰 Revenue : ₹{stats.revenue}
      </h2>

    </div>

  );

}

export default AdminDashboard;