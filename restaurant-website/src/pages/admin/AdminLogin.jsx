import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 👈 सुरक्षा गार्ड: अगर कोई नॉर्मल यूजर इस पेज पर आता है, तो उसे तुरंत /auth पर भेज दो
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    // अगर कोई नॉर्मल यूजर पहले से लॉग इन है, तो उसे एडमिन लॉगिन की जरूरत नहीं है
    if (user) {
      navigate("/auth"); // या तुम उसे होम पेज ("/") पर भी भेज सकते हो
    }
  }, [navigate]);

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
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Admin Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        name="admin-unique-email" // ब्राउज़र ऑटोफिल रोकने के लिए नाम बदला
        autoComplete="off"
        onChange={(e) => setEmail(e.target.value)}
        style={{ margin: "5px", padding: "8px" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        name="admin-unique-password" // ब्राउज़र ऑटोफिल रोकने के लिए नाम बदला
        autoComplete="new-password"
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: "5px", padding: "8px" }}
      />

      <button
        onClick={loginAdmin}
        style={{ margin: "5px", padding: "8px 15px", cursor: "pointer" }}
      >
        Login
      </button>
    </div>
  );
}

export default AdminLogin;
