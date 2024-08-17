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
  getSubType: async (type_id) => {
    return requests.get(`${BASE_URL}/product_subtype?type_id=${type_id}`);
  },
};

export default CategoryServices;
