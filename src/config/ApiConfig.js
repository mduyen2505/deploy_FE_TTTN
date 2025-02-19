const BASE_URL = "http://localhost:3000/api";

export const CATEGORIES = `${BASE_URL}/types`; // Định nghĩa đúng
export const SUBCATEGORIES = `${BASE_URL}/subcategories`; // API danh mục con
export const BRANDS = `${BASE_URL}/brands`; // API danh sách thương hiệu
export const getProductsBySubcategory = (subCategoryId) => 
    `${BASE_URL}/products/subcategory/${subCategoryId}`;



