import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductsBySubcategory, SUBCATEGORIES, BRANDS } from "../../config/ApiConfig";
import ProductCard from "../../Components/ProductCard/ProductCard";
import "./Style.css";

const CategoryPage = () => {
    const { typeId } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [subcategories, setSubcategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(getProductsBySubcategory(typeId));
                if (!response.ok) throw new Error(`Lỗi HTTP! Status: ${response.status}`);
                
                const data = await response.json();
                setProducts(data); // API trả về mảng, không có `data.products`
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
        
                        if (data && Array.isArray(data.brands)) {
                            setBrands(data.brands);
                        } else {
                            console.error("Dữ liệu API không đúng:", data);
                        }
                    } catch (error) {
                        console.error("Lỗi khi gọi API:", error);
                    }
                };
        
        fetchProducts();
        fetchSubcategories();
        fetchBrands();

    }, [typeId]);

    return (
        <div className="category-page">
            <aside className="sidebar">
                <h2>Filters</h2>
                <p>Product Type</p>
                <p>Skin Type</p>
                <p>Price Range</p>
                <button className="apply-filter">Apply</button>
            </aside>

            <section className="products-container">
                {loading ? (
                    <p>Loading...</p>
                ) : products.length > 0 ? (
                    products.map((product) => <ProductCard key={product._id} product={product} />)
                ) : (
                    <p>Không có sản phẩm nào.</p>
                )}
            </section>
        </div>
    );
};

export default CategoryPage;
