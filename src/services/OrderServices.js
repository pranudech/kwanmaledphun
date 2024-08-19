import requests from "./httpServices";

const OrderServices = {
  addOrder: async (body, headers) => {
    return requests.post("/order/add", body, headers);
  },

  createPaymentIntent: async (body) => {
    return requests.post("/order/create-payment-intent", body);
  },

  addRazorpayOrder: async (body) => {
    return requests.post("/order/add/razorpay", body);
  },

  createOrderByRazorPay: async (body) => {
    return requests.post("/order/create/razorpay", body);
  },

  getOrderCustomer: async ({ page = 1, limit = 8 }) => {
    return requests.get(`https://kachabazar-backend-theta.vercel.app/api/order?limit=10&page=1`);
  },
  getOrderById: async (id, body) => {
    return requests.get(`/order/${id}`, body);
  },
};

export default OrderServices;
