import requests from "./httpServices";
import show from "./json/category/show.json";

const CategoryServices = {
  getShowingCategory: async () => {
    // return requests.get("/category/show");
    return show;
  },
};

export default CategoryServices;
