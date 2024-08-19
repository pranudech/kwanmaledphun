import requests from "./httpServices";
import show from "./json/category/show.json";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL_ENDPOINT;

const CompanyServices = {
  getCompanyAll: async () => {
    return requests.get(`${BASE_URL}/company/all`);
  },
};

export default CompanyServices;
