import React from "react";
import "./Style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons"; // Empty star
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons"; // Filled star
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const ProductCard = ({ product }) => {
  const rating = product.rating || 0; // Default to 0 if no rating
  const stars = Array.from({ length: 5 }, (_, index) =>
    index < rating ? solidStar : regularStar
  );

  return (
    <div className="product-card">
      {product.discount && <span className="discount-tag">-{product.discount}%</span>}
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
         {/* Hiển thị giá gốc và giá khuyến mãi */}
         <div className="price-container">
          {product.discount > 0 ? (
            <>
              <span className="original-price">{product.price.toLocaleString()}₫</span>
              <span className="discounted-price">{product.promotionPrice.toLocaleString()}₫</span>
            </>
          ) : (
            <span className="discounted-price">{product.price.toLocaleString()}₫</span>
          )}
        </div>

        <button className="add-to-bag">Add To Bag</button>
      </div>
    </div>
  );
};

export default ProductCard;