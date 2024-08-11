import requests from "./httpServices";
import seo from "./json/setting/store-setting/seo.json";
import { storeCustomization } from "../utils/storeCustomizationSetting";
import language from "./json/language/show/index.json";

const SettingServices = {
  //store setting all function
  getStoreSetting: async () => {
    return requests.get("/setting/store-setting/all");
  },

  getStoreSeoSetting: async () => {
    // return requests.get("/setting/store-setting/seo");
    return seo;
  },
  //store customization setting all function
  getStoreCustomizationSetting: async () => {
    // return requests.get("/setting/store/customization/all");
    return storeCustomization.setting;
  },

  getShowingLanguage: async () => {
    // return requests.get(`/language/show`);
    return language;
  },

  getGlobalSetting: async () => {
    return requests.get("/setting/global/all");
  },
};

export default SettingServices;
