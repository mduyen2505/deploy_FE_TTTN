

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle, faTwitter, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import logo from "../../assets/images/logo.png";
import "./Login.css";
import { LOGIN_USER} from "../../config/ApiConfig";
import Swal from "sweetalert2";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const refreshToken = urlParams.get('refreshToken');
    const username = urlParams.get("username");
    const email = urlParams.get("email");

    if (token && refreshToken && username && email) {
        const user = {
            username,
            email,
            token,
        };

        // Lưu thông tin người dùng và token vào localStorage
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);

        // Xóa token khỏi URL - sửa lại đường dẫn thành "/" thay vì "/dashboard"
        window.history.replaceState({}, document.title, "/");

        // Thông báo đăng nhập thành công
        Swal.fire({
            toast: true,
            position: "top-end",
            title: "Đăng nhập thành công!",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            background: "#f6e6ec",
            color: "#333",
        });

        // Kích hoạt sự kiện storage để Header cập nhật
        window.dispatchEvent(new Event("storage"));

        // Chuyển hướng về trang chính sau 1s
        setTimeout(() => navigate("/"), 1000);
    }
}, [navigate]);



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(LOGIN_USER, {
        email: formData.email,
        password: formData.password
      });

      if (response.data && response.data.token) {
        const user = {
          username: response.data.username,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber || "",
          token: response.data.token,
        };

        console.log("Lưu thông tin người dùng vào localStorage:", user);

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", response.data.token);
        window.dispatchEvent(new Event("storage"));

        Swal.fire({
          toast: true,
          position: "top-end",
          title: "Đăng nhập thành công!",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          background: "#f6e6ec",
          color: "#333",
          icon: undefined,
        });

        setTimeout(() => navigate("/"), 1000);
      } else {
        setError("Lỗi: Không nhận được token từ server!");
      }
    } catch (error) {
      Swal.fire({
        toast: true,
        position: "top-end",
        title: "Đăng nhập thất bại. Vui lòng thử lại!",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        background: "#f6e6ec",
        color: "#333",
        icon: undefined,
      });
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/api/users/auth/google"; // Chuyển hướng tới Google login
  };
  
  
  return (
    <div className="login-page">
      <div className="login-auth-container">
        <div className="login-forms-container">
          <form className="login-sign-in-form" onSubmit={handleSubmit}>
            <h2 className="login-title">Đăng Nhập</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <div className="login-input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            </div>

            <div className="login-input-field">
              <i className="fas fa-lock"></i>
              <input type="password" name="password" placeholder="Mật khẩu" onChange={handleChange} required />
            </div>

            <input type="submit" value="Đăng nhập" className="login-btn login-solid" />

            <p className="login-social-text">Hoặc đăng nhập bằng</p>
            <div className="login-social-media">
              <a href="#" className="login-social-icon">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="login-social-icon" onClick={handleGoogleLogin}>
                <FontAwesomeIcon icon={faGoogle} />
              </a>
              <a href="#" className="login-social-icon">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="login-social-icon">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </form>
        </div>

        <div className="login-welcome-container">
          <img src={logo} alt="Logo" className="login-logo" />
          <h2 className="login-welcome-text">Hello, Welcome!</h2>
          <p className="login-account-question">Don't have an account?</p>
          <Link to="/signup" className="login-btn login-register-btn">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 