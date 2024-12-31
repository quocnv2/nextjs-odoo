"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "../component/Modal"; // Import Modal component

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false); // Trạng thái hiển thị modal
  const [modalConfig, setModalConfig] = useState({
    title: "",
    icon: "",
    message: "",
    status: "",
  });
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Tạo payload JSON để gửi
    const payload = {
      login: login.trim(), // Đảm bảo không có khoảng trắng thừa
      password: password.trim(),
    };

    try {
      const response = await axios.post(
        "http://localhost:8069/api/v1/login",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        // Cấu hình modal hiển thị thông báo thành công
        setModalConfig({
          title: "Success",
          icon: "bi-check-circle", // Sử dụng Bootstrap Icon
          message: "Login successful! Redirecting to Employee page...",
          status: "success",
        });
        setModalVisible(true);

        // Đặt trạng thái success và chuyển hướng sau khi đóng modal
        setTimeout(() => {
          localStorage.setItem("user", JSON.stringify(response.data));
          setModalVisible(false);
          router.push("/employee");
        }, 2000);
      } else {
        // Hiển thị lỗi trong modal
        setModalConfig({
          title: "Login Failed",
          icon: "bi-exclamation-triangle", // Sử dụng Bootstrap Icon
          message: response.data.error || "Invalid login credentials.",
          status: "error",
        });
        setModalVisible(true);
      }
    } catch (error) {
      // Xử lý lỗi khi không kết nối được hoặc bị từ chối
      const errorMessage =
        error.response?.status === 403
          ? "Access Denied: You do not have permission."
          : "Invalid user and password";
      setModalConfig({
        title: "Error",
        icon: "bi-exclamation-triangle",
        message: errorMessage,
        status: "error",
      });
      setModalVisible(true);
      console.error("Error:", error.response?.data || error.message);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h1 className="text-center mb-4">Login to Odoo</h1>
        <form onSubmit={handleLogin}>
          {/* Input Email */}
          <div className="mb-3">
            <label htmlFor="loginInput" className="form-label">
              Email Address
            </label>
            <input
              type="text"
              className="form-control"
              id="loginInput"
              placeholder="Enter your email"
              value={login}
              onChange={(e) => setLogin(e.target.value)} // Cập nhật trạng thái login
              required
            />
          </div>

          {/* Input Password */}
          <div className="mb-3">
            <label htmlFor="passwordInput" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Cập nhật trạng thái password
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        {/* Hiển thị modal nếu modalVisible = true */}
        {modalVisible && (
          <Modal
            title={modalConfig.title}
            icon={modalConfig.icon}
            message={modalConfig.message}
            status={modalConfig.status}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
