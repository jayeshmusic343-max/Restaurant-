import "./Auth.css";
import API from "../api/api";
import { useState } from "react";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // SIGNUP
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/signup", {
        name,
        email,
        password,
      });

      alert(res.data.message);

      setIsLogin(true);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Signup Failed"
      );
    }
  };

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login Successful");

      window.location.href = "/";
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <section className="auth">
      <div className="auth-box">

        <h1>
          {isLogin
            ? "Welcome Back"
            : "Create Account"}
        </h1>

        <form
          onSubmit={
            isLogin
              ? handleLogin
              : handleSignup
          }
        >

          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button type="submit">
            {isLogin
              ? "Login"
              : "Register"}
          </button>

        </form>

        <p>
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <span
            style={{
              cursor: "pointer",
              color: "orange",
              marginLeft: "5px"
            }}
            onClick={() =>
              setIsLogin(!isLogin)
            }
          >
            {isLogin
              ? "Register"
              : "Login"}
          </span>
        </p>

      </div>
    </section>
  );
}

export default Auth;