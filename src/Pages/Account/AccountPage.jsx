import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AccountPage.css";
import { GET_USER_INFO, UPDATE_USER_INFO } from "../../config/ApiConfig";

const AccountPage = () => {
  const [user, setUser] = useState({
    userId: "",
    username: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Hàm lấy thông tin user từ API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Bạn chưa đăng nhập!");
          setLoading(false);
          return;
        }

        const response = await axios.get(GET_USER_INFO, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.data) {
          setUser({
            userId: response.data.data._id,
            username: response.data.data.username,
            email: response.data.data.email,
            phoneNumber: response.data.data.phoneNumber,
            address: response.data.data.address || "",
          });

          // Cập nhật lại localStorage với thông tin đầy đủ
          localStorage.setItem("user", JSON.stringify(response.data.data));
        } else {
          setError("Không thể lấy thông tin người dùng.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        setError("Lỗi kết nối. Vui lòng thử lại!");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Cập nhật giá trị khi người dùng thay đổi địa chỉ
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Hàm lưu thay đổi địa chỉ
  const handleSave = async () => {
    if (!user.userId) {
      alert("Lỗi: Không tìm thấy ID người dùng!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Vui lòng đăng nhập lại!");
        return;
      }

      const response = await axios.put(
        UPDATE_USER_INFO(user.userId), // ✅ Gọi API từ `ApiConfig.js`
        { address: user.address }, // ✅ Chỉ gửi địa chỉ để cập nhật
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        alert("Cập nhật địa chỉ thành công!");
        localStorage.setItem("user", JSON.stringify({ ...user, address: user.address }));
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật địa chỉ:", error);
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <div className="account-container">
      <div className="sidebar">
        <h2 className="sidebar-title">Account</h2>
        <ul className="sidebar-menu">
          <li className="active">Contact information</li>
          <li>Change password</li>
          <li>Orders</li>
          <li>Wishlist</li>
        </ul>
      </div>

      <div className="content">
        <h2 className="content-title">Contact Information</h2>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="username" value={user.username} disabled className="input-field" />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="text" name="phoneNumber" value={user.phoneNumber} disabled className="input-field" />
              </div>
            </div>

            <div className="form-group">
              <label>Mail</label>
              <input type="email" name="email" value={user.email} disabled className="input-field" />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input type="text" name="address" value={user.address} onChange={handleChange} className="input-field" />
            </div>

            <button className="save-button" onClick={handleSave}>
              Save
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
