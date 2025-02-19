import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle, faTwitter, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import "./auth.css";
import logo from "../../assets/images/logo.png";

const LoginPage = () => {
  return (
    <div className="auth-container">
    <div className="forms-container">
      {/* Form Đăng Nhập */}
      <form className="sign-in-form">
        <h2 className="title">Đăng Nhập</h2>
        <div className="input-field">
          <i className="fas fa-envelope"></i>
          <input type="text" placeholder="Email hoặc Số điện thoại" />
        </div>
        <div className="input-field">
          <i className="fas fa-lock"></i>
          <input type="password" placeholder="Mật khẩu" />
        </div>
        <input type="submit" value="Đăng nhập" className="btn solid" />
  
        {/* Đăng nhập bằng mạng xã hội */}
        <p className="social-text">Hoặc đăng nhập bằng</p>
        <div className="social-media">
          <a href="#" className="social-icon">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="#" className="social-icon">
            <FontAwesomeIcon icon={faGoogle} />
          </a>
          <a href="#" className="social-icon">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="#" className="social-icon">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
        </div>
      </form>
    </div>
    
    <div className="welcome-container">
    <img src={logo} alt="Logo" className="logo" />
    <h2 className="welcome-text">Hello, Welcome!</h2>
  <p className="account-question">Don't have an account?</p>
  <Link to="/signup" className="btn register-btn">Register</Link>
</div>
</div>
  
  );
};

export default LoginPage;
