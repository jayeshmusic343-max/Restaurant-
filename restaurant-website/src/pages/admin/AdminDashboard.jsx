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

    <div style={{ padding: "30px" }}>

      <h1>Admin Dashboard</h1>

      <hr />

      <h2>
        👥 Users : {stats.totalUsers}
      </h2>

      <h2>
        📦 Products : {stats.totalProducts}
      </h2>

      <h2>
        🛒 Orders : {stats.totalOrders}
      </h2>

      <h2>
        💰 Revenue : ₹{stats.revenue}
      </h2>

    </div>

  );

}

export default AdminDashboard;