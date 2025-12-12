import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all the fields");
      return;
    }

    // SIMPLE DEMO LOGIN – replace with API/Auth
    if (email === "user@gmail.com" && password === "123456") {
      setError("");
      navigate("/"); // redirect to homepage
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">

      <div className="login-box">

        <h2>Welcome Back</h2>
        <p className="subtitle">Login to continue shopping</p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleLogin}>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>

        <p className="signup-text">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")}>Create Account</span>
        </p>
      </div>

    </div>
  );
};

export default Login;