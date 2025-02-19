import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle, faTwitter, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import "./register.css";
import logo from "../../assets/images/logo.png";


const SignUpPage = () => {
    return (
        <div className="auth-container">
          {/* Phần Welcome bên trái */}
          <div className="welcome-container">
            <img src={logo} alt="Logo" className="logo" />
            <h2 className="welcome-text">Welcome Back!</h2>
            <p className="account-question">Already have an account?</p>
            <Link to="/login" className="btn register-btn">Login</Link>
          </div>
    
          <div className="forms-container">
            {/* Form Đăng Ký */}
            <form className="sign-up-form">
              <h2 className="title">Đăng Ký</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Tên người dùng" />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="email" placeholder="Email" />
              </div>
              <div className="input-field">
                <i className="fas fa-phone"></i>
                <input type="text" placeholder="Số điện thoại" />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Mật khẩu" />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Nhập lại mật khẩu" />
              </div>
              <input type="submit" className="btn" value="Đăng ký" />
    
              {/* Đăng ký bằng mạng xã hội */}
              <p className="social-text">Hoặc đăng ký bằng</p>
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
        </div>
  );
};

export default SignUpPage;
