import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginAdmin = async () => {
    try {
      const res = await API.post("/admin/login", { email, password });
      localStorage.setItem("adminToken", res.data.token);
      alert("Admin Login Success");
      navigate("/admin-orders");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (

    <div>

      <h1>Admin Login</h1>

      <input
      placeholder="Email"
      onChange={(e)=>
      setEmail(e.target.value)}
      />

      <input
      type="password"
      placeholder="Password"
      onChange={(e)=>
      setPassword(e.target.value)}
      />

      <button onClick={loginAdmin}>
      Login
      </button>

    </div>

  );

}

export default AdminLogin;