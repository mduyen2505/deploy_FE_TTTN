import axios from "axios";
import { GET_CART } from "../config/ApiConfig";

const API_CART = "http://localhost:3000/api/carts"; // API giỏ hàng

// ✅ Hàm thêm sản phẩm vào giỏ hàng
export const addToCart = async (productId, quantity = 1) => {
    try {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        if (!token) {
            alert("Bạn cần đăng nhập để thêm vào giỏ hàng!");
            return;
        }

        const response = await axios.post(
            API_CART,
            { productId, quantity },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200 || response.status === 201) {
            alert("Sản phẩm đã được thêm vào giỏ hàng!");
        } else {
            alert("Thêm vào giỏ hàng thất bại!");
        }
    } catch (error) {
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
        alert("Có lỗi xảy ra! Vui lòng thử lại.");
    }
};
