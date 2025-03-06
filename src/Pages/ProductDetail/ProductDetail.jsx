import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import axios from "axios";
import Header from "../../Components/Header/Header";
import { getProductDetails } from "../../config/ApiConfig";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close"; // Icon đóng modal
import { addToCart } from "../../services/CartService";
import { addToWishlist,getWishlist  } from "../../services/WishlistService";


const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1
        
    );

    const [isFavorite, setIsFavorite] = useState(false);
    const orderProductMap = JSON.parse(localStorage.getItem("orderProductMap")) || {};
    const orderId = orderProductMap[id] || null;
    const [rating, setRating] = useState(5); // Mặc định 5 sao
    const [comment, setComment] = useState(""); // Mặc định không có nội dung
    const [selectedRating, setSelectedRating] = useState(5); // Mặc định 5 sao
    const [reviews, setReviews] = useState([]);
    const [showReviewModal, setShowReviewModal] = useState(false); // Trạng thái hiển thị modal


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(getProductDetails(id));
                if (!response.ok) throw new Error(`Error: ${response.status}`);

                const data = await response.json();
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error("Lỗi khi tải sản phẩm:", error);
                setLoading(false);
            }
        };

        const fetchWishlist = async () => {
            const wishlist = await getWishlist();
            setIsFavorite(wishlist.includes(id)); // Kiểm tra sản phẩm có trong wishlist không
        };
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/reviews/${id}`);
                setReviews(response.data.reviews);
            } catch (error) {
                console.error("Lỗi khi lấy đánh giá:", error);
            }
        };

        fetchProduct();
        fetchWishlist();
        fetchReviews();

    }, [id]);

    const handleWishlistToggle = async () => {
        if (!localStorage.getItem("token")) {
            alert("Vui lòng đăng nhập để thêm vào yêu thích!");
            return;
        }

        setIsFavorite(!isFavorite); // Cập nhật UI ngay lập tức

        if (!isFavorite) {
            const success = await addToWishlist(id);
          
        }
    };
    const handleReviewSubmit = async () => {
        console.log("Dữ liệu gửi lên API:", {
            productId: product._id,
            orderId,
            rating,
            comment
        });
    
        if (!orderId) {
            alert("Bạn chỉ có thể đánh giá sau khi đơn hàng đã được giao thành công!");
            return;
        }
    
        if (!comment.trim()) {
            alert("Vui lòng nhập nội dung đánh giá!");
            return;
        }
    
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Bạn cần đăng nhập để đánh giá!");
                return;
            }
    
            const response = await axios.post("http://localhost:3000/api/reviews/", {
                productId: product._id,
                orderId,
                rating,
                comment,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            console.log("Phản hồi từ API:", response.data);
    
            if (response.data.message === "Đánh giá thành công!") {
                alert("Cảm ơn bạn đã đánh giá!");
                setShowReviewModal(false);
            }
        } catch (error) {
            console.error("Lỗi khi gửi đánh giá:", error);
            alert("Bạn đã đánh giá sản phẩm này rồi!");
        }
    };
    

    if (loading) return <p>Đang tải sản phẩm...</p>;
    if (!product) return <p>Sản phẩm không tồn tại.</p>;

    return (
        <>
            <Header />
            <div className="product-detail-container">
                {/* Hình ảnh sản phẩm */}
                <div className="product-detail-image">
                    {product.image && (
                        <img 
                            src={product.image.startsWith("http") ? product.image : `http://localhost:3000/images/${product.image}`} 
                            alt={product.name} 
                        />
                    )}
                </div>

                {/* Thông tin sản phẩm */}
                <div className="product-detail-info-box">
                    <h1>{product.name}</h1>
                    <div className="product-detail-rating">
    {"★".repeat(Math.round(product.averageRating))}{"☆".repeat(5 - Math.round(product.averageRating))}
    <span>({product.totalReviews} đánh giá)</span>
</div>
                    <p className="product-detail-price">
                        {product.discount > 0 ? (
                            <>
                                <span className="product-detail-original-price">{product.price?.toLocaleString()}đ</span>
                                <span className="product-detail-discount-price">{product.promotionPrice?.toLocaleString()}đ</span>
                            </>
                        ) : (
                            `${product.price?.toLocaleString()}đ`
                        )}
                    </p>
                    <p className="product-detail-description">{product.description}</p>
                    {/* Nút tăng/giảm số lượng (ngay dưới mô tả) */}
                    <div className="product-detail-quantity">
                    <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>-</button>
                        <span>{quantity}</span>
                        <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
                    </div>


                    {/* Nút thêm vào giỏ hàng + icon trái tim (cùng 1 hàng) */}
                    <div className="product-detail-actions">
                        <button className="product-detail-add-to-cart"onClick={() => addToCart(product._id)}>Thêm vào giỏ</button>
                        <button className="product-detail-favorite" onClick={handleWishlistToggle}>
                            {isFavorite ? <FavoriteIcon style={{ color: "red" }} /> : <FavoriteBorderOutlinedIcon />}
                        </button>
                    </div>
                </div>
            </div>
           
                

            {/* Thành phần sản phẩm */}
<div className="product-detail-ingredients">
    <h2>Thành phần sản phẩm</h2>
    {product.ingredients && product.ingredients.length > 0 ? (
        <ul>
            {product.ingredients[0].split(".").map((item, index) => 
                item.trim() ? <li key={index}>• {item.trim()}.</li> : null
            )}
        </ul>
    ) : (
        <p>Không có thông tin thành phần.</p>
    )}
</div>

{/* Hướng dẫn sử dụng */}
<div className="product-detail-usage">
    <h2>Hướng dẫn sử dụng</h2>
    {product.usageInstructions ? (
        <p>
            {product.usageInstructions.split(".").map((sentence, index) => 
                sentence.trim() ? <span key={index}>➤ {sentence.trim()}.<br /></span> : null
            )}
        </p>
    ) : (
        <p>Không có thông tin hướng dẫn sử dụng.</p>
    )}
</div>



            {/* Đánh giá sản phẩm */}
            <div className="product-detail-reviews">
                <h2>Đánh giá</h2>
                <p>Đánh giá trung bình</p>
<div className="product-detail-rating-score">
<span className="score">
    {product.averageRating ? parseFloat(product.averageRating).toFixed(1) : "Chưa có đánh giá"}
</span>
    <span>
        {"★".repeat(Math.round(product.averageRating))}
        {"☆".repeat(5 - Math.round(product.averageRating))}
    </span>
</div>

                <button className="product-detail-write-review" onClick={() => setShowReviewModal(true)}>Viết bình luận</button>

                
                <div className="product-detail-comments">
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div key={review._id} className="product-detail-comment">
                                <div className="product-detail-user-info">
                                <img 
    src={review.userId.avatar ? review.userId.avatar : `https://ui-avatars.com/api/?name=${review.userId.username}`}
    alt="User Avatar" 
    className="product-detail-avatar"
/>

                                    <div>
                                        <p><strong>{review.userId.username}</strong></p>
                                        <div className="product-detail-star-rating">
    {[...Array(5)].map((_, index) => (
        <span key={index} style={{ color: index < review.rating ? "gold" : "gray" }}>
            ★
        </span>
    ))}
</div>

                                    </div>
                                </div>
                                <p className="product-detail-comment-title">{review.comment}</p>
                                <span className="product-detail-comment-date">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p>Chưa có đánh giá nào.</p>
                    )}
                

            
                </div>
            </div>
            {showReviewModal && (
    <div className="review-modal">
        <div className="review-modal-content">
            <button className="review-modal-close" onClick={() => setShowReviewModal(false)}>✖</button>
            <h2>Đánh giá sản phẩm</h2>
            
            <p>{product.name}</p>


            {/* Chọn sao bằng icon */}
            <div className="review-modal-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    style={{ cursor: "pointer", color: selectedRating >= star ? "gold" : "gray", fontSize: "30px" }}
                                    onClick={() => {
                                        setSelectedRating(star);
                                        setRating(star);
                                    }}
                                >
                                    ★
                                </span>
                            ))}
            </div>

            {/* Ô nhập đánh giá lớn hơn */}
            <textarea 
                className="review-textarea"
                placeholder="Nhập đánh giá của bạn..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />

            <button className="review-submit" onClick={handleReviewSubmit}>Gửi đánh giá</button>
        </div>
    </div>
)}

        </>
    );
};

export default ProductDetail;
