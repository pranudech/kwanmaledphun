import requests from "./httpServices";
import product from "./json/product/product.json";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL_ENDPOINT;

const ProductServices = {
  getShowingProducts: async () => {
    return requests.get("/products/show");
  },
  getShowingStoreProducts: async ({ type_name, query, id, category }) => {
    return requests.get(`${BASE_URL}/search/product_type?type_name=${type_name}&query=${query}&id=${id}&category=${category}`);
  },
  getDiscountedProducts: async () => {
    return requests.get("/products/discount");
  },

  getProductBySlug: async (slug) => {
    return requests.get(`/products/${slug}`);
  },

  getProductsAll: async (params) => {
    return requests.post(`${BASE_URL}/products/all`, params);
  },

  getProductsRecommended: async () => {
    return requests.get(`${BASE_URL}/products/recommended`);
  },

  // system
  addProduct: async (data) => {
    return requests.post(`${BASE_URL}/products/add`, data);
  },
  updateProduct: async (data) => {
    return requests.post(`${BASE_URL}/products/update`, data);
  },
};

export default ProductServices;
