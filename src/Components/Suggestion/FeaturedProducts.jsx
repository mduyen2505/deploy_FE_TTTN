import React, { useState, useEffect } from "react";
import "./Style.css";
import Button from '@mui/material/Button';
import { FaArrowRight } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { FEATURED_PRODUCTS } from "../../config/ApiConfig"; // Import API từ file cấu hình

const Suggestion = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(FEATURED_PRODUCTS);
                const data = await response.json();
                setProducts(data.data); // Lưu danh sách sản phẩm vào state
                setLoading(false);
            } catch (error) {
                console.error("Lỗi khi tải sản phẩm:", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="product-suggestion-section">
            <div className="container">
                <div className="suggestion-header">
                    <h2 className="product-suggestion-title">Featured Products</h2>
                    <Button className="viewAllBtn">
                        Xem tất cả <FaArrowRight />
                    </Button>
                </div>

                <div className="product-suggestion-list">
                    {products.map((product) => {
                        const stars = Array(5).fill(regularStar).map((star, index) =>
                            index < Math.round(product.averageRating) ? solidStar : regularStar
                        );

                        return (
                            <div className="product-card" key={product._id}>
                                {product.discount > 0 && (
                                    <span className="discount-tag">-{product.discount}%</span>
                                )}
                                <FavoriteBorderOutlinedIcon className="favorite-icon" />
                                <img
                                    src={product.image.startsWith("http") ? product.image : `http://localhost:3000/images/${product.image}`}
                                    alt={product.name}
                                    className="product-image"
                                />
                                <div className="product-info">
                                    <h5 className="product-name">{product.name}</h5>
                                    <div className="rating">
                                        {stars.map((star, index) => (
                                            <FontAwesomeIcon key={index} icon={star} className="star-icon" />
                                        ))}
                                        <span className="rating-count">({product.reviewCount || 0})</span>
                                    </div>
                                    <div className="price-container">
                                        {product.discount > 0 ? (
                                            <>
                                                <span className="original-price">
                                                    {product.price.toLocaleString()}₫
                                                </span>
                                                <span className="discounted-price">
                                                    {product.promotionPrice.toLocaleString()}₫
                                                </span>
                                            </>
                                        ) : (
                                            <span className="discounted-price">
                                                {product.price.toLocaleString()}₫
                                            </span>
                                        )}
                                    </div>
                                    <button className="add-to-bag">Thêm vào giỏ</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Suggestion;
