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

// API lấy sản phẩm theo thương hiệu (Brand)
export const getProductsbyBrand = (brandId) => 
    `${BASE_URL}/products/brands/${brandId}`;

// API lấy thông tin chi tiết của một thương hiệu
export const getBrandDetails = (brandId) => 
    `${BASE_URL}/brands/${brandId}`;

// API lấy danh sách voucher khuyến mãi
export const getCoupons = `${BASE_URL}/coupons`;
//API lấy thông tin chi tiết sản phẩm theo ID
export const getProductDetails = (productId) => 
    `${BASE_URL}/products/types/${productId}`;