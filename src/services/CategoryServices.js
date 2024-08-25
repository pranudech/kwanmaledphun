import requests from "./httpServices";
import show from "./json/category/show.json";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL_ENDPOINT;

const CategoryServices = {
  getShowingCategory: async () => {
    let type = await requests.get(`${BASE_URL}/product_type`)
    let subType = await requests.get(`${BASE_URL}/product_subtype?type_id=all`)
    let result = []
    type.forEach(element => {
      const sub = subType.filter(sub => element.type_id === sub.type_id)
      result.push({
        ...element,
        children: sub
      })
    });
    return result;
  },

  // CATEGORY
  getCategoryAll: async () => {
    return requests.get(`${BASE_URL}/category/all`);
  },
  addCategory: async (data) => {
    return requests.post(`${BASE_URL}/category/add`, data);
  },
  updateCategory: async (data) => {
    return requests.post(`${BASE_URL}/category/update`, data);
  },
  deleteCategory: async (id) => {
    return requests.post(`${BASE_URL}/category/delete`, id);
  },

  // SUB CATEGORY
  getSubType: async (type_id) => {
    return requests.get(`${BASE_URL}/product_subtype?type_id=${type_id}`);
  },
  addSubCategory: async (data) => {
    return requests.post(`${BASE_URL}/categorySub/add`, data);
  },
  updateSubCategory: async (data) => {
    return requests.post(`${BASE_URL}/categorySub/update`, data);
  },
  deleteSubCategory: async (id) => {
    return requests.post(`${BASE_URL}/categorySub/delete`, id);
  },
};

export default CategoryServices;
