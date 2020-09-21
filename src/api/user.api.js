import { apiService } from "../services/api";
import { API } from "../constanst";

export const login = (params) => {
  return apiService.post(API.URL.USER_LOGIN, params);
};
