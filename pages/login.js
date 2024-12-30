"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router'
const Login = () => {
  const [login, setLogin] = useState(""); // Lưu giá trị login
  const [password, setPassword] = useState(""); // Lưu giá trị password
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter()
  const handleLogin = async (e) => {
    e.preventDefault();

    // Tạo payload JSON để gửi
    const payload = {
      login: login, // Lấy giá trị người dùng nhập
      password: password, // Lấy giá trị người dùng nhập
    };

    try {
      // Gửi request đến API
      const response = await axios.post("http://localhost:8069/api/v1/login", payload, {
        headers: {
          "Content-Type": "application/json", // Đảm bảo định dạng JSON
        },
      });

      // Xử lý phản hồi từ API
      if (response.data.success) {
        setSuccess(true);
        setError("");
        router.push("/employee");
      } else {
        setError(response.data.error || "Login failed");
        setSuccess(false);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setError("Failed to connect to API");
      setSuccess(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h1>Login to Odoo</h1>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            placeholder="Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)} // Cập nhật login
            required
            autoComplete="username"
            style={{ marginBottom: "10px", padding: "10px", width: "100%" }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Cập nhật password
            required
            autoComplete="current-password"
            style={{ marginBottom: "10px", padding: "10px", width: "100%" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          Login
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Login successful!</p>}
    </div>
  );
};

export default Login;
