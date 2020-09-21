import { AuthType } from "../types";
import { setUserStore, clearUserStore } from "../../utils";

export const setUser = (user) => (dispatch) => {
  user ? setUserStore(user) : clearUserStore();
  dispatch({ type: AuthType.SET_USER, user });
};

export const setAuth = (isAuth) => (dispatch) => {
  dispatch({ type: AuthType.SET_AUTH, isAuth });
};
