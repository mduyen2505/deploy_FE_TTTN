import React, { useState, useEffect } from "react";
import "./OrderPage.css"; // Import CSS
import Modal from "./ModalOrder";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ORDER_API } from "../../config/ApiConfig"; 

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  const [orderData, setOrderData] = useState({
    cartId: "",
    totalPrice: 0,
    productId: [],
    shippingAddress: "",
    name: "",
    phone: "",
    email: "",
    voucherCode: "",
  });

  useEffect(() => {
    if (!location.state) {
      alert("Dữ liệu đặt hàng không hợp lệ! Quay lại giỏ hàng.");
      navigate("/cart");
      return;
    }
    console.log("📦 Dữ liệu nhận từ CartPage:", location.state);


    setOrderData({
      cartId: location.state.cartId || "",  // ✅ Nhận cartId từ CartPage
      productId: location.state.productId || [],
      totalPrice: location.state.totalPrice || 0,
      shippingAddress: location.state.shippingAddress || "",
      name: location.state.name || "",
      phone: location.state.phone || "",
      email: location.state.email || "",
      voucherCode: location.state.voucherCode || "",
    });

  }, [location.state, navigate]);

  const handlePlaceOrder = async () => {
    if (!orderData.cartId || !orderData.productId.length) {
        alert("Giỏ hàng của bạn trống hoặc có lỗi với đơn hàng!");
        return;
    }

    if (!orderData.name || !orderData.phone || !orderData.email || !orderData.shippingAddress) {
        alert("Vui lòng nhập đầy đủ thông tin nhận hàng!");
        return;
    }

    console.log("📦 Dữ liệu gửi lên API:", JSON.stringify(orderData, null, 2));

    try {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const response = await axios.post(ORDER_API, orderData, {
            headers: { Authorization: `Bearer ${token}` },
        });

        console.log("✅ Phản hồi từ API:", response);

        if (response.data.status === "OK") {  // ✅ Kiểm tra response.data.status thay vì response.status
            alert("Đặt hàng thành công!");
            navigate("/order-success");
        } else {
            alert("Đặt hàng thất bại. Vui lòng thử lại.");
        }
    } catch (error) {
        console.error("❌ Lỗi khi đặt hàng:", error.response?.data || error.message);
        alert(`Lỗi đặt hàng: ${error.response?.data?.message || "Không thể đặt hàng"}`);
    }
};


  return (
    <div className="order-container">
      <div className="order-main-content">
        {/* Thông tin nhận hàng */}
        <div className="order-box order-address-box">
          <h2 className="order-title">Thông tin nhận hàng</h2>
          
          <div className="order-input-group">
            <label>Tên:</label>
            <input 
              type="text" 
              value={orderData.name} 
              onChange={(e) => setOrderData({ ...orderData, name: e.target.value })} 
              placeholder="Nhập tên người nhận"
              required
            />
          </div>
          <div className="order-input-group">
            <label>Số điện thoại:</label>
            <input 
              type="text" 
              value={orderData.phone} 
              onChange={(e) => setOrderData({ ...orderData, phone: e.target.value })} 
              placeholder="Nhập số điện thoại"
              required
            />
          </div>
          <div className="order-input-group">
            <label>Email:</label>
            <input 
              type="email" 
              value={orderData.email} 
              onChange={(e) => setOrderData({ ...orderData, email: e.target.value })} 
              placeholder="Nhập email"
              required
            />
          </div>
          <div className="order-input-group">
            <label>Địa chỉ:</label>
            <input 
              type="text" 
              value={orderData.shippingAddress} 
              onChange={(e) => setOrderData({ ...orderData, shippingAddress: e.target.value })} 
              placeholder="Nhập địa chỉ giao hàng"
              required
            />
          </div>
        </div>

        {/* Mã giảm giá */}
        <div className="order-box">
          <h2 className="order-title">Mã giảm giá</h2>
          <input
            type="text"
            placeholder="Nhập mã giảm giá"
            value={orderData.voucherCode}
            onChange={(e) => setOrderData({ ...orderData, voucherCode: e.target.value })}
            className="order-input-field"
          />
        </div>
        {/* Thông tin kiện hàng */}
        <div className="order-box order-shipping-info">
        <h2 className="order-title">Chi tiết đơn hàng</h2>
          {orderData.productId.map((id, index) => (
            <p key={index}>Sản phẩm ID: {id}</p>
          ))}
        </div>
      </div>

        

      {/* Thanh toán ở góc phải */}
      <div className="order-payment-box">
        <div className="order-invoice-info"></div>
        <h2 className="order-title">Đơn hàng</h2>
        <div className="order-summary">
        <p>Tạm tính: <span>{orderData.totalPrice.toLocaleString()}₫</span></p>  
          <p>Giảm giá: <span>-0₫</span></p>
          <p>Phí vận chuyển: <span>{orderData?.shippingFee ? orderData.shippingFee.toLocaleString() : "0"}₫</span></p>


          <p className="order-total">
          Thành tiền (Đã VAT): <span className="order-price">{orderData.totalPrice.toLocaleString()}₫</span>
          
          </p>
          <button className="order-btn" onClick={handlePlaceOrder}>
          Đặt hàng
        </button>   
             </div>
      </div>

      {/* Modal Địa chỉ */}
      {showAddressModal && (
        <Modal onClose={() => setShowAddressModal(false)} title="Chọn địa chỉ nhận hàng">
          <p>Chức năng chọn địa chỉ sẽ được thêm sau.</p>
        </Modal>
      )}

      {/* Modal Thanh toán */}
      {showPaymentModal && (
        <Modal onClose={() => setShowPaymentModal(false)} title="Chọn hình thức thanh toán">
          <p>Chức năng chọn thanh toán sẽ được thêm sau.</p>
        </Modal>
      )}
    </div>
  );
};

export default OrderPage;
