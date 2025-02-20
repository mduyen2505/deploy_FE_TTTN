const BASE_URL = "http://localhost:3000/api";

export const CATEGORIES = `${BASE_URL}/types`; // Định nghĩa đúng
export const SUBCATEGORIES = `${BASE_URL}/subcategories`; // API danh mục con
export const BRANDS = `${BASE_URL}/brands`; // API danh sách thương hiệu

export const FEATURED_PRODUCTS = `${BASE_URL}/products/featured?limit=8`;
export const ALL_PRODUCTS = `${BASE_URL}/products`;
// API lấy sản phẩm theo danh mục chính (Category)
export const getProductsByCategory = (categoryId) => 
    `${BASE_URL}/products/bytypes/${categoryId}`;

// API lấy sản phẩm theo danh mục con (SubCategory)
export const getProductsBySubcategory = (subCategoryId) => 
    `${BASE_URL}/products/subcategory/${subCategoryId}`;


