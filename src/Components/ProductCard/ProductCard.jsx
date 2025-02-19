import React from "react";
import "./Style.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img
        src={product.image.startsWith("http") ? product.image : `http://localhost:3000/images/${product.image}`} 
        alt={product.name}
      />
      <h3>{product.name}</h3> {/* Đổi từ title -> name */}
      <p className="price">{product.price.toLocaleString()}₫</p> {/* Format tiền tệ */}
      <button className="add-to-bag">Add To Bag</button>
    </div>
  );
};

export default ProductCard;
