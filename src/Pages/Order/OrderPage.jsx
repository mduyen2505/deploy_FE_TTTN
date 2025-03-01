import React, { useState, useEffect } from "react";
import "./OrderPage.css"; // Import CSS
import Modal from "./ModalOrder";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ORDER_API } from "../../config/ApiConfig";
import { GET_CART } from "../../config/ApiConfig";
import Logo from "../../assets/images/logo.png"; // Import logo

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [products, setProducts] = useState({});

  const [orderData, setOrderData] = useState({
    cartId: "",
    totalPrice: 0,
    productList: [],
    shippingAddress: "",
    name: "",
    phone: "",
    email: "",
    voucherCode: "",
  });
  const formattedOrderData = {
    cartId: orderData.cartId,
    totalPrice: orderData.totalPrice,
    shippingAddress: orderData.shippingAddress,
    name: orderData.name,
    phone: orderData.phone,
    email: orderData.email,
    voucherCode: orderData.voucherCode,
    productList: location.state.productList.map((product) => product.id), // ✅ Chỉ lấy id
  };
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(GET_CART, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (response.data && response.data.products) {
          const productMap = {};
          response.data.products.forEach((product) => {
            productMap[product.productId._id] = product.productId.name;
          });
          setProducts(productMap);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sản phẩm:", error);
      }
    };

    fetchProductDetails();
  }, []);

  useEffect(() => {
    console.log("📦 Dữ liệu nhận từ CartPage:", location.state);

    if (!location.state) {
      alert("Dữ liệu đặt hàng không hợp lệ! Quay lại giỏ hàng.");
      navigate("/cart");
      return;
    }

    setOrderData({
      cartId: location.state.cartId || "", // ✅ Nhận cartId từ CartPage
      productList: location.state.productList || "",
      totalPrice: location.state.totalPrice || 0,
      shippingAddress: location.state.shippingAddress || "",
      name: location.state.name || "",
      phone: location.state.phone || "",
      email: location.state.email || "",
      voucherCode: location.state.voucherCode || "",
    });
  }, [location.state, navigate]);
  const shippingFee = orderData.totalPrice > 500000 ? 0 : 30000; // 🚀 Miễn phí ship nếu đơn > 500k
  const vat = Math.round(orderData.totalPrice * 0.1); // 🚀 VAT = 10% của totalPrice
  const orderTotal = orderData.totalPrice + shippingFee + vat; // 🚀 Tổng tiền

  const handlePlaceOrder = async () => {
    if (!orderData.cartId || !orderData.productList.length) {
      alert("Giỏ hàng của bạn trống hoặc có lỗi với đơn hàng!");
      return;
    }

    if (
      !orderData.name ||
      !orderData.phone ||
      !orderData.email ||
      !orderData.shippingAddress
    ) {
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

      const response = await axios.post(ORDER_API, formattedOrderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Phản hồi từ API:", response);

      if (response.data.status === "OK") {
        // ✅ Kiểm tra response.data.status thay vì response.status
        alert("Đặt hàng thành công!");
        navigate("/order-success");
      } else {
        alert("Đặt hàng thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error(
        "❌ Lỗi khi đặt hàng:",
        error.response?.data || error.message
      );
      alert(
        `Lỗi đặt hàng: ${error.response?.data?.message || "Không thể đặt hàng"}`
      );
    }
  };

  return (
    <div className="order-container">
      <div className="order-header">
        <div className="order-header-content">
          <img src={Logo} alt="Logo" className="order-header-logo" />
          <span className="order-header-title">Thanh toán</span>
        </div>
      </div>

      <div className="order-main-content">
        {/* Thông tin nhận hàng */}
        <div className="order-box order-address-box">
          <h2 className="order-title">Thông tin nhận hàng</h2>

          {/* Hàng ngang chứa Tên & Số điện thoại */}
          <div className="order-input-row">
            <div className="order-input-group">
              <h2 className="order-title">Tên</h2>
              <input
                type="text"
                value={orderData.name}
                onChange={(e) =>
                  setOrderData({ ...orderData, name: e.target.value })
                }
                placeholder="Nhập tên người nhận"
                required
              />
            </div>
            <div className="order-input-group">
              <h2 className="order-title">Số điện thoại</h2>
              <input
                type="text"
                value={orderData.phone}
                onChange={(e) =>
                  setOrderData({ ...orderData, phone: e.target.value })
                }
                placeholder="Nhập số điện thoại"
                required
              />
            </div>
          </div>

          {/* Hàng dọc chứa Email & Địa chỉ */}
          <div className="order-input-group">
            <h2 className="order-title">Email</h2>
            <input
              type="email"
              value={orderData.email}
              onChange={(e) =>
                setOrderData({ ...orderData, email: e.target.value })
              }
              placeholder="Nhập email"
              required
            />
          </div>

          <div className="order-input-group">
            <h2 className="order-title">Địa chỉ</h2>
            <input
              type="text"
              value={orderData.shippingAddress}
              onChange={(e) =>
                setOrderData({ ...orderData, shippingAddress: e.target.value })
              }
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
            onChange={(e) =>
              setOrderData({ ...orderData, voucherCode: e.target.value })
            }
            className="order-input-field"
          />
        </div>
        {/* Thông tin kiện hàng */}
        <div className="order-box order-shipping-info">
          <h2 className="order-title">Chi tiết đơn hàng</h2>
          {(orderData.productList || []).map((item, index) => (
            <p key={index}>
              {index + 1}. {item.name}
            </p>
          ))}
        </div>
      </div>

      {/* Thanh toán ở góc phải */}
      <div className="order-payment-box">
        <div className="order-invoice-info"></div>
        <h2 className="order-title">Đơn hàng</h2>
        <div className="order-summary">
          <p>
            Tạm tính: <span>{orderData.totalPrice.toLocaleString()}₫</span>
          </p>
          <p>
            Giảm giá: <span>-0₫</span>
          </p>
          <p>
            Phí vận chuyển:
            <span>
              {" "}
              {shippingFee > 0
                ? `${shippingFee.toLocaleString()}₫`
                : "Miễn phí"}
            </span>
          </p>
          <p>
            VAT (10%): <span>{vat.toLocaleString()}₫</span>
          </p>

          <p className="order-total">
            Thành tiền (Đã VAT):{" "}
            <span className="order-price">{orderTotal.toLocaleString()}₫</span>
          </p>
          <button className="order-btn" onClick={handlePlaceOrder}>
            Đặt hàng
          </button>
        </div>
      </div>

      {/* Modal Địa chỉ */}
      {showAddressModal && (
        <Modal
          onClose={() => setShowAddressModal(false)}
          title="Chọn địa chỉ nhận hàng"
        >
          <p>Chức năng chọn địa chỉ sẽ được thêm sau.</p>
        </Modal>
      )}

      {/* Modal Thanh toán */}
      {showPaymentModal && (
        <Modal
          onClose={() => setShowPaymentModal(false)}
          title="Chọn hình thức thanh toán"
        >
          <p>Chức năng chọn thanh toán sẽ được thêm sau.</p>
        </Modal>
      )}
    </div>
  );
};

export default OrderPage;
