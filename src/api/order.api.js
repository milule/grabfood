import { apiService } from "../services/api";
import { API } from "../constanst";

export const orderProducts = (params) => {
  return apiService.post(API.URL.ORDER_PRODUCT, params);
};
