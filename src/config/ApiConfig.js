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
export const REGISTER_USER = `${BASE_URL}/users/register`;
export const LOGIN_USER = `${BASE_URL}/users/login`;  // 
export const GET_CART = `${BASE_URL}/carts`; // Thêm API giỏ hàng
export const DELETE_CART_ITEM = (productId) => `${BASE_URL}/carts/${productId}`; // xóa sp khoi giỏ hàng 
export const CLEAR_CART = `${BASE_URL}/carts`; // API xóa toàn bộ giỏ hàng

export const ORDER_API = `${BASE_URL}/orders`;
export const UPDATE_CART = `${BASE_URL}/carts/update`;

export const GET_USER_INFO = `${BASE_URL}/users`; // API lấy thông tin user
export const UPDATE_USER_INFO = `${BASE_URL}/users`; // API cập nhật user (không cần userId trên URL)

export const COUPONS_API = `${BASE_URL}/coupons`;
export const CHECK_COUPON_API = `${BASE_URL}/coupons/check-coupon`;






