import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { VERIFY_OTP } from "../../config/ApiConfig";
import "./OtpVerify.css";

const OtpVerify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || localStorage.getItem("emailForOtp");

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    console.log("Sending OTP verification request for email:", email);
    console.log("Sending OTP:", otp);

    try {
      const response = await axios.post(VERIFY_OTP, { email, otp });

      console.log("OTP verification response:", response.data);

      if (response.data.message === "Xác thực thành công") {
        Swal.fire({
          title: "Xác thực thành công!",
          text: "Bạn đã đăng ký thành công.",
          icon: "success",
          timer: 1500,
        });

        navigate("/login");
      } else {
        setError("OTP không chính xác. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      setError("Lỗi khi xác thực OTP. Vui lòng thử lại.");
    }
  };

  return (
    <div className="otp-verify-page">
      <div className="otp-verify-container">
        <h2>Xác Thực OTP</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="otp-input-field">
            <input
              type="text"
              name="otp"
              placeholder="Nhập OTP"
              value={otp}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="otp-verify-btn">
            Xác Thực
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerify;