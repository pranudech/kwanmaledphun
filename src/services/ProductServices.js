import requests from "./httpServices";
import product from "./json/product/product.json";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL_ENDPOINT;

const ProductServices = {
  getShowingProducts: async () => {
    return requests.get("/products/show");
  },
  getShowingStoreProducts: async ({ type_name }) => {
    // console.log('getShowingStoreProducts', `/products/store?category=${category}&title=${title}&slug=${slug}`)
    // return requests.get(`/products/store?category=${category}&title=${title}&slug=${slug}`);
    // return product;
    return requests.get(`${BASE_URL}/search/product_type?type_name=${type_name}`);
  },
  getDiscountedProducts: async () => {
    return requests.get("/products/discount");
  },

  getProductBySlug: async (slug) => {
    return requests.get(`/products/${slug}`);
  },
};

export default ProductServices;
