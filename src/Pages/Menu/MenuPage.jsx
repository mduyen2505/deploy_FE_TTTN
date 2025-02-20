import React, { useState, useEffect } from "react";
import { ALL_PRODUCTS, SUBCATEGORIES, BRANDS } from "../../config/ApiConfig"; // Import API
import ProductCard from "../../Components/ProductCard/ProductCard"; // Import giao diện sản phẩm
import Header from "../../Components/Header/Header"; // Import Header
import "./Style.css"; 

const MenuPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [subcategories, setSubcategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 20;

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
                {/* Sidebar */}
                <aside className="sidebar">
                    <h2>Filters</h2>
                    <p><a href="#" className="category-link">Danh mục cha - Tên danh mục</a></p>
                    <p><a href="#" className="subcategory-link">Danh mục con 1</a></p>
                    <p><a href="#" className="subcategory-link">Danh mục con 2</a></p>
                    <p><a href="#" className="subcategory-link">Danh mục con 3</a></p>
                    <p>Price Range</p>
                    <input type="range" min="0" max="1000" />
                    <p>Thương hiệu</p>
                    <label><input type="checkbox" /> Thương hiệu 1</label>
                    <label><input type="checkbox" /> Thương hiệu 2</label>
                    <label><input type="checkbox" /> Thương hiệu 3</label>
                    <button className="apply-filter">Apply</button>
                </aside>

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
        </div>
    );
};

export default MenuPage;
