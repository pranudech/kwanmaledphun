import requests from "./httpServices";
import seo from "./json/setting/store-setting/seo.json";
import { storeCustomization } from "../utils/storeCustomizationSetting";
import language from "./json/language/show/index.json";

const SettingServices = {
  //store setting all function
  getStoreSetting: async () => {
    return {
      "cod_status": true,
      "fb_pixel_key": "",
      "fb_pixel_status": false,
      "google_analytic_key": "G-KL698JMBDW",
      "google_analytic_status": true,
      "google_client_id": "172898062879-jvugigp1d16rr0nf5hmvuntkiuogh1ch.apps.googleusercontent.com",
      "google_login_status": true,
      "google_secret_key": "",
      "stripe_key": "pk_test_51LQ2dqDf1en3BVypHlwhsxEYZcS10IwF1opyxTlWGagpm31vVj828k11tngDtWVDNyVjm58PVndfst9jMWfxuo0K00oZr2ynGW",
      "stripe_secret": "sk_test_51LQ2dqDf1en3BVypcgtm02Z6gIkQMnOW0wCubWnzmHzjlMLfhVOpC9xQHR1gMuBJh3NkDUUW81rlHepwNIbq6QoT00KnUhG1Zq",
      "stripe_status": true,
      "meta_url": "https://kachabazar-store-nine.vercel.app/",
      "tawk_chat_property_id": "6561938eda19b36217909d53",
      "tawk_chat_status": false,
      "tawk_chat_widget_id": "1hg2igpsn",
      "razorpay_id": "rzp_test_0gY20HTxk1sT6W",
      "razorpay_secret": "jbzyNSVH7pZQU889cTViMDOY",
      "razorpay_status": true,
      "facebook_id": "2248684488812430",
      "facebook_login_status": true,
      "facebook_secret": "99e30049ea6105a5e92773a914aa5127",
      "github_id": "Ov23liC2Nd20zpyAKBEH",
      "github_login_status": true,
      "github_secret": "c866722348c0106c6f42d37c5bd703388e03b043",
      "google_id": "172898062879-jvugigp1d16rr0nf5hmvuntkiuogh1ch.apps.googleusercontent.com",
      "google_secret": "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",
      "next_api_base_url": null,
      "nextauth_secret": "\"3BRAQWnfbEfhT3fnlrVMEHe2T7TG9ky4sfs//Xx+8Vc=\""
    };
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
    return {
      "number_of_image_per_product": "5",
      "shop_name": "Kwanmaledpun",
      "address": "59 Station Rd, Purls Bridge, United Kingdom",
      "company_name": "HtmlLover ltd",
      "vat_number": "47589",
      "post_code": "2030",
      "contact": "019579034",
      "email": "kachabazar@gmail.com",
      "website": "kachabazar-admin.vercel.app",
      "default_currency": "$",
      "default_time_zone": "Europe/London",
      "default_date_format": "MMM D, YYYY",
      "receipt_size": "57-mm"
    };
  },
};

export default SettingServices;
