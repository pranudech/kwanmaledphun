import requests from "./httpServices";
import product from "./json/product/product.json";

const ProductServices = {
  getShowingProducts: async () => {
    return requests.get("/products/show");
  },
  getShowingStoreProducts: async ({ category = "", title = "", slug = "" }) => {
    // console.log('getShowingStoreProducts', `/products/store?category=${category}&title=${title}&slug=${slug}`)
    // return requests.get(`/products/store?category=${category}&title=${title}&slug=${slug}`);
    return product;
  },
  getDiscountedProducts: async () => {
    return requests.get("/products/discount");
  },

  getProductBySlug: async (slug) => {
    return requests.get(`/products/${slug}`);
  },
};

export default ProductServices;
