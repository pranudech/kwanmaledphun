import requests from "./httpServices";
import show from "./json/category/show.json";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL_ENDPOINT;

const CompanyServices = {
  getCompanyAll: async () => {
    return requests.get(`${BASE_URL}/company/all`);
  },
  addCompany: async (data) => {
    return requests.post(`${BASE_URL}/company/add`, data);
  },
  deleteCompany: async (id) => {
    return requests.post(`${BASE_URL}/company/delete`, id);
  },
  updateCompany: async (data) => {
    return requests.post(`${BASE_URL}/company/update`, data);
  }
};

export default CompanyServices;
