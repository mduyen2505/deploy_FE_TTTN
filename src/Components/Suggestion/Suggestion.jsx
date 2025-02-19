import React from "react";
import "./Style.css";
import Button from '@mui/material/Button';
import { FaArrowRight } from "react-icons/fa";


const Suggestion = () => {
    const products = [
        {
            id: 1,
            img: "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-205100137-1695896128_img_220x220_0dff4c_fit_center.png",
            name: "L'Oréal Tẩy Trang",
            price: "152.000 đ",
            oldPrice: "229.000 đ",
            discount: "-34%",
            rating: 4,
        },
        {
            id: 2,
            img: "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-nuoc-tay-trang-bioderma-danh-cho-da-dau-hon-hop-500ml-1690274181_img_220x220_0dff4c_fit_center.jpg",
            name: "Bioderma Tẩy Trang",
            price: "348.000 đ",
            oldPrice: "525.000 đ",
            discount: "-34%",
            rating: 5,
        },
        {
            id: 3,
            img: "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-422204884-1689925661_img_220x220_0dff4c_fit_center.png",
            name: "Cocoon Combo 2 Nước Tẩy Trang",
            price: "247.000 đ",
            oldPrice: "590.000 đ",
            discount: "-58%",
            rating: 3,
        },
        {
            id: 4,
            img: "https://media.hcdn.vn/catalog/product/f/a/facebookdynamic-nuoc-hoa-hong-simple-danh-cho-da-nhay-cam-200ml-1719903361_img_220x220_0dff4c_fit_center.jpg",
            name: "Simple Nước Hoa Hồng",
            price: "109.000 đ",
            oldPrice: "180.000 đ",
            discount: "-39%",
            rating: 4,
        },
        {
            id: 5,
            img: "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-sua-chong-nang-anessa-cho-da-nhay-cam-tre-em-60ml-moi_R2SBhWL6ggY1un58_img_220x220_0dff4c_fit_center.png",
            name: "Klairs Nước Hoa Hồng",
            price: "209.000 đ",
            oldPrice: "435.000 đ",
            discount: "-52%",
            rating: 5,
        },
    ];

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <span key={index} className={`star ${index < rating ? "filled" : ""}`}>&#9733;</span>
        ));
    };

    return (
        <div className="product-suggestion-section">
            <div className="container">
                <h2 className="product-suggestion-title">Gợi ý cho bạn</h2>
                <Button className="viewAllBtn">View All<FaArrowRight/></Button>

                <div className="product-suggestion-list">
                    {products.map((product) => (
                        <div className="product-item" key={product.id}>
                            <div className="product-image-wrapper">
                                <img src={product.img} alt={product.name} className="product-img" />
                                <span className="product-discount">{product.discount}</span>
                            </div>
                            <div className="product-info">
                                <h5 className="product-name">{product.name}</h5>
                                <div className="product-rating">{renderStars(product.rating)}</div>
                                <div className="product-prices">
                                    <span className="product-price">{product.price}</span>
                                    <span className="product-old-price">{product.oldPrice}</span>
                                </div>
                                <div className="product-buttons">
                                    <button className="btn-add-to-cart">Add to Cart</button>
                                    <button className="btn-wishlist">&#9825;</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Suggestion;
