import React, { useState, useEffect } from "react"; 
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "./CartPage.css";
import { GET_CART } from "../../config/ApiConfig";
import Header from "../../Components/Header/Header"; // Import Header

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);


  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.warn("Không có token, chuyển hướng về trang đăng nhập...");
          navigate("/login");
          return;
        }

        const response = await axios.get(GET_CART, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Dữ liệu giỏ hàng từ API:", response.data); 

        if (response.data && response.data.products) {
          const formattedCartItems = response.data.products.map((product) => ({
            id: product.productId._id,
            name: product.productId.name,
            price: product.productId.promotionPrice,
            oldPrice: product.productId.discount
              ? product.productId.promotionPrice / (1 - product.productId.discount / 100)
              : null,
            quantity: product.quantity,
            image: "default-image.png",
          }));

          setCartItems(formattedCartItems);
        } else {
          console.warn("API trả về giỏ hàng trống!");
          setCartItems([]);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API giỏ hàng:", error);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [navigate]);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return; // Ngăn số lượng về 0
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return <div className="cart-loading">Đang tải giỏ hàng...</div>;
  }
  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  return (
    <>
            <Header />
    
    <div className="cart-page-container">
        
      <h2 className="cart-page-title">Giỏ hàng ({totalQuantity} sản phẩm)</h2>
      <div className="cart-page-content">
        <div className="cart-page-items">
          <table>
            <thead>
              <tr>
                <th>Chọn</th>
                <th>Sản phẩm</th>
                <th>Giá tiền</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                    />
                  </td>
                  <td className="cart-page-product-info">
                    <img src={`/images/${item.image}`} alt={item.name} />
                    <div>
                      <strong>{item.name}</strong>
                      <div className="cart-page-actions"></div>
                      <span className="cart-page-wishlist">♡ Yêu thích</span> |{" "}
                      <span className="cart-page-remove">✖ Xóa</span>
                    </div>
                  </td>
                  <td>
                    <span className="cart-page-new-price">{item.price.toLocaleString()} đ</span>
                    <br />
                    {item.oldPrice && (
                      <span className="cart-page-old-price">{item.oldPrice.toLocaleString()} đ</span>
                    )}
                  </td>
                  <td>
                    <div className="cart-quantity-selector">
                      <button
                        className="qty-btn"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>{(item.price * item.quantity).toLocaleString()} đ</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="continue-shopping" onClick={() => navigate(-1)}>⬅ Tiếp tục mua sắm</div>
        </div>

        <div className="cart-page-summary">
          <h3>Hóa đơn của bạn</h3>
          <p>Tạm tính: <span>{totalPrice.toLocaleString()} đ</span></p>
          <p>Giảm giá: <span>- 0 đ</span></p>
          <p className="cart-page-total">
            Tổng cộng: <span>{totalPrice.toLocaleString()} đ</span>
          </p>
          <small>(Đã bao gồm VAT)</small>
          <button className="cart-page-checkout-button">Tiến hành đặt hàng</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default CartPage;
