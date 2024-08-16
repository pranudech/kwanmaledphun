import requests from "./httpServices";
import show from "./json/category/show.json";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL_ENDPOINT;

const CategoryServices = {
  getShowingCategory: async () => {
    // return requests.get("/category/show");
    // return show;
    return requests.get(`${BASE_URL}/product_type`);
  },
};

export default CategoryServices;
