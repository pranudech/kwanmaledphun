import requests from "./httpServices";
import show from "./json/category/show.json";

const BASE_URL = "http://localhost:3010"

const CategoryServices = {
  getShowingCategory: async () => {
    // return requests.get("/category/show");
    // return show;
    return requests.get(`${BASE_URL}/api/product_type`);
  },
};

export default CategoryServices;
