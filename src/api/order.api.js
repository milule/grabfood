import { apiService } from "../services/api";
import { API } from "../constanst";

export const orderProducts = (params) => {
  return apiService.post(API.URL.ORDER_PRODUCT, params);
};

export const orderDetails = (params) => {
  return apiService.get(API.URL.ORDER_DETAILS, params);
};

export const orderCheck = (params) => {
  return apiService.get(API.URL.ORDER_CHECK, params);
};

export const orderComplete = (params) => {
  return apiService.post(API.URL.ORDER_COMPLETE, params);
};
