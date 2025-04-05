import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Style.css";
import ProductCard from "../ProductCard/ProductCard";
import { ALL_PRODUCTS } from "../../config/ApiConfig";

const FlashDeal = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [products, setProducts] = useState([]); // Lưu các sản phẩm đang có flash deal
  const [endTime, setEndTime] = useState(null);

  // Lấy dữ liệu sản phẩm từ API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(ALL_PRODUCTS);
        const allProducts = response.data;

        // Lọc các sản phẩm đang trong flash deal (dựa vào startTime và endTime)
        const currentTime = new Date();
        const filteredProducts = allProducts.filter(product => {
          const startTime = new Date(product.startTime);
          const endTime = new Date(product.endTime);
          return currentTime >= startTime && currentTime <= endTime; // Kiểm tra xem sản phẩm có đang trong flash deal không
        });

        setProducts(filteredProducts); // Cập nhật danh sách sản phẩm trong flash deal

        // Tìm thời gian kết thúc xa nhất trong các sản phẩm flash deal
        if (filteredProducts.length > 0) {
          const latestEndTime = new Date(Math.max(...filteredProducts.map(p => new Date(p.endTime).getTime())));
          setEndTime(latestEndTime);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
    
    // Thiết lập interval để cập nhật danh sách sản phẩm mỗi phút
    const productUpdateInterval = setInterval(fetchProducts, 60000);
    
    return () => clearInterval(productUpdateInterval);
  }, []);

  // Cập nhật thời gian đếm ngược
  useEffect(() => {
    if (!endTime) return;

    const timer = setInterval(() => {
      const now = new Date();
      const timeDiff = endTime - now;

      if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDiff / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        
        // Khi hết thời gian, cập nhật lại danh sách sản phẩm
        const fetchUpdatedProducts = async () => {
          try {
            const response = await axios.get(ALL_PRODUCTS);
            const allProducts = response.data;
            const currentTime = new Date();
            const filteredProducts = allProducts.filter(product => {
              const startTime = new Date(product.startTime);
              const endTime = new Date(product.endTime);
              return currentTime >= startTime && currentTime <= endTime;
            });
            setProducts(filteredProducts);
            
            // Cập nhật lại thời gian kết thúc nếu còn sản phẩm
            if (filteredProducts.length > 0) {
              const newEndTime = new Date(Math.max(...filteredProducts.map(p => new Date(p.endTime).getTime())));
              setEndTime(newEndTime);
            }
          } catch (error) {
            console.error("Error updating products after timer end:", error);
          }
        };
        
        fetchUpdatedProducts();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  // Kiểm tra và cập nhật danh sách sản phẩm khi có sản phẩm hết hạn
  useEffect(() => {
    const checkProductsTimer = setInterval(() => {
      const currentTime = new Date();
      const updatedProducts = products.filter(product => {
        const endTime = new Date(product.endTime);
        return currentTime <= endTime;
      });
      
      if (updatedProducts.length !== products.length) {
        setProducts(updatedProducts);
        
        // Cập nhật lại thời gian kết thúc nếu còn sản phẩm
        if (updatedProducts.length > 0) {
          const newEndTime = new Date(Math.max(...updatedProducts.map(p => new Date(p.endTime).getTime())));
          setEndTime(newEndTime);
        }
      }
    }, 60000); // Kiểm tra mỗi phút
    
    return () => clearInterval(checkProductsTimer);
  }, [products]);

  return (
    <div className="flash-deal">
      <div className="flash-deal-header">
        <h2>Flash Deals</h2>
        <a href="/deals">Xem tất cả</a>
      </div>
      <div className="countdown-timer">
        Kết thúc sau:{" "}
        <span>
          {timeLeft.days > 0 ? `${timeLeft.days} ngày ` : ""}
          {String(timeLeft.hours).padStart(2, "0")}:
          {String(timeLeft.minutes).padStart(2, "0")}:
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
      </div>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>Không có sản phẩm Flash Deal nào đang diễn ra</p>
        )}
      </div>
    </div>
  );
};

export default FlashDeal;
