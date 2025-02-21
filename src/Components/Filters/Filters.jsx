import React from "react";
import "./Style.css";

const Filter = ({ selectedBrand, setSelectedBrand, priceRange, setPriceRange }) => {
  
  // Hàm cập nhật thương hiệu khi chọn checkbox
  const handleBrandChange = (brand) => {
    setSelectedBrand((prevSelected) =>
      prevSelected.includes(brand)
        ? prevSelected.filter((b) => b !== brand) // Bỏ chọn nếu đã chọn
        : [...prevSelected, brand]
    );
  };

  return (
    <aside className="sidebar">
      <h2>Filters</h2>
      <p><a href="#" className="category-link">Danh mục cha - Tên danh mục</a></p>
      <p><a href="#" className="subcategory-link">Danh mục con 1</a></p>
      <p><a href="#" className="subcategory-link">Danh mục con 2</a></p>
      <p><a href="#" className="subcategory-link">Danh mục con 3</a></p>
      
      <p>Price Range</p>
      <input
        type="range"
        min="0"
        max="1000"
        value={priceRange}
        onChange={(e) => setPriceRange(e.target.value)}
      />
      
      <p>Thương hiệu</p>
      <label>
        <input 
          type="checkbox" 
          checked={selectedBrand.includes("Thương hiệu 1")} 
          onChange={() => handleBrandChange("Thương hiệu 1")}
        /> 
        Thương hiệu 1
      </label>
      <label>
        <input 
          type="checkbox" 
          checked={selectedBrand.includes("Thương hiệu 2")} 
          onChange={() => handleBrandChange("Thương hiệu 2")}
        /> 
        Thương hiệu 2
      </label>
      <label>
        <input 
          type="checkbox" 
          checked={selectedBrand.includes("Thương hiệu 3")} 
          onChange={() => handleBrandChange("Thương hiệu 3")}
        /> 
        Thương hiệu 3
      </label>

      <button className="apply-filter">Apply</button>
    </aside>
  );
};

export default Filter;
