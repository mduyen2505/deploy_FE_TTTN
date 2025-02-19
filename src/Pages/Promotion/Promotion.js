import React, { useState, useEffect } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Header from "../../Components/Header/Header";
import "./Style.css";

const Promo = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 20; // Số sản phẩm mỗi trang

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/products");
                if (!response.ok) throw new Error(`Lỗi HTTP! Status: ${response.status}`);

                const data = await response.json();

                // Lọc sản phẩm giảm giá
                const discountedProducts = data.filter(product => product.discount > 0);

                setProducts(discountedProducts);
                setLoading(false);
            } catch (error) {
                console.error("Lỗi khi lấy sản phẩm:", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Danh sách voucher tĩnh
    const vouchers = [
        {
            id: 1,
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Unilever.svg/1200px-Unilever.svg.png",
            discount: "Giảm 25K",
            description: "Mua sản phẩm Omo, Comfort, Surf, Vim, Lifebuoy, Clear,... từ 299.000đ",
            expiry: "28/02/2025"
        },
        {
            id: 2,
            logo: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Kun_logo.png",
            discount: "Giảm 50K",
            description: "Mua sản phẩm Sữa Tiệt Trùng KUN từ 350.000đ",
            expiry: "21/02/2025"
        },
        {
            id: 3,
            logo: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Clear_logo.png",
            discount: "Giảm 20K",
            description: "Mua sản phẩm dầu gội Tresemme, Dove, Clear, Lifebuoy, Sunsilk từ 200.000đ",
            expiry: "28/02/2025"
        },
        {
            id: 4,
            logo: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Dove_logo.png",
            discount: "Giảm 15K",
            description: "Mua sản phẩm lăn, xịt khử mùi Dove từ 90.000đ",
            expiry: "28/02/2025"
        }
    ];

    // Tính toán số trang
    const totalPages = Math.ceil(products.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <div className="promo-page">
            <Header />

            <h2 className="voucher-title">🎉 ƯU ĐÃI ĐẶC BIỆT 🎉</h2>
            <div className="voucher-container">
                {vouchers.map((voucher) => (
                    <div key={voucher.id} className="voucher-card">
                        <img src={voucher.logo} alt="Brand Logo" className="voucher-logo" />
                        <h3 className="voucher-discount">{voucher.discount}</h3>
                        <p className="voucher-description">{voucher.description}</p>
                        <p className="voucher-expiry">KT: {voucher.expiry}</p>
                        <button className="voucher-button">LẤY NGAY</button>
                    </div>
                ))}
            </div>

            <h2 className="product-title">🔥 SẢN PHẨM GIẢM GIÁ 🔥</h2>
            <section className="products-container">
                {loading ? (
                    <p>Loading...</p>
                ) : currentProducts.length > 0 ? (
                    currentProducts.map((product) => <ProductCard key={product._id} product={product} />)
                ) : (
                    <p>Không có sản phẩm nào đang giảm giá.</p>
                )}
            </section>

            {/* Pagination */}
            <div className="pagination-container">
                <div className="pagination">
                    <button 
                        disabled={currentPage === 1} 
                        onClick={() => setCurrentPage(prev => prev - 1)}
                    >
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => (
                        <button 
                            key={index + 1} 
                            className={currentPage === index + 1 ? "active" : ""}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button 
                        disabled={currentPage === totalPages} 
                        onClick={() => setCurrentPage(prev => prev + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Promo;
