import requests from "./httpServices";
import show from "./json/category/show.json";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL_ENDPOINT;

const MainImageServices = {
  getMainImageAll: async () => {
    return requests.get(`${BASE_URL}/main_image/all`);
  },
  addMainImage: async (data) => {
    return requests.post(`${BASE_URL}/main_image/add`, data);
  },
  deleteMainImage: async (id) => {
    return requests.post(`${BASE_URL}/main_image/delete`, id);
  },
  updateMainImage: async (data) => {
    return requests.post(`${BASE_URL}/main_image/update`, data);
  }
};

export default MainImageServices;
