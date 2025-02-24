import React, { useState, useEffect } from "react";
import Footer from "../../Components/Footer/Footer";
import { ALL_PRODUCTS, SUBCATEGORIES, BRANDS } from "../../config/ApiConfig"; // Import API
import ProductCard from "../../Components/ProductCard/ProductCard"; // Import giao diện sản phẩm
import Header from "../../Components/Header/Header"; // Import Header
import "./Style.css";
import Filter from "../../Components/Filters/Filters"; 

const MenuPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [subcategories, setSubcategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 20;
     const [selectedBrand, setSelectedBrand] = useState([]); // Lưu danh sách thương hiệu đã chọn
        const [priceRange, setPriceRange] = useState(1000);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(ALL_PRODUCTS);
                if (!response.ok) throw new Error(`Lỗi HTTP! Status: ${response.status}`);

                const data = await response.json();
                setProducts(data); 
                setLoading(false);
            } catch (error) {
                console.error("Lỗi khi lấy sản phẩm:", error);
                setLoading(false);
            }
        };

        const fetchSubcategories = async () => {
            try {
                const response = await fetch(SUBCATEGORIES);
                const data = await response.json();
                setSubcategories(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh mục con:", error);
            }
        };

        const fetchBrands = async () => {
            try {
                const response = await fetch(BRANDS);
                const data = await response.json();
                setBrands(data);
            } catch (error) {
                console.error("Lỗi khi lấy thương hiệu:", error);
            }
        };

        fetchProducts();
        fetchSubcategories();
        fetchBrands();
    }, []);

    // Tính toán số trang
    const totalPages = Math.ceil(products.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <div className="menu-page">
            <Header />
            <div className="main-content">
            <Filter
                    selectedBrand={selectedBrand} 
                    setSelectedBrand={setSelectedBrand} 
                    priceRange={priceRange} 
                    setPriceRange={setPriceRange} 
                />

                {/* Danh sách sản phẩm + Pagination */}
                <section className="products-wrapper">
                    <div className="products-container">
                        {loading ? (
                            <p>Đang tải sản phẩm...</p>
                        ) : currentProducts.length > 0 ? (
                            currentProducts.map((product) => <ProductCard key={product._id} product={product} />)
                        ) : (
                            <p>Không có sản phẩm nào.</p>
                        )}
                    </div>

                    {/* Pagination nằm trong .products-wrapper để luôn ở dưới */}
                    <div className="pagination-container">
                        <div className="pagination">
                            <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Previous</button>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button 
                                    key={index + 1} 
                                    className={currentPage === index + 1 ? "active" : ""}
                                    onClick={() => setCurrentPage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
                        </div>
                    </div>
                </section>
            </div>
            <Footer /> 

        </div>
    );
};

export default MenuPage;
