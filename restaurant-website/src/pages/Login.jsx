import { useState } from "react";
import API from "../api/api";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login Successful");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
        padding: 16
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "min(400px, 100%)",
          background: "white",
          padding: "clamp(24px, 4vw, 40px)",
          borderRadius: "10px"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "clamp(18px, 3vw, 30px)",
            color: "orange",
            fontSize: "clamp(28px, 5vw, 36px)"
          }}
        >
          Login
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: 8
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: 8
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "15px",
            background: "orange",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: 8
          }}
        >
          Login
        </button>

      </form>
    </div>
  );
}

export default Login;
