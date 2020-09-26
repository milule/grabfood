import { AuthType } from "../types";
import { USER_ROLE } from "../../constanst";
import { setLocation } from "./global.action";
import { setUserStore, clearUserStore } from "../../utils";

export const setUser = (user) => (dispatch) => {
  user ? setUserStore(user) : clearUserStore();
  dispatch({ type: AuthType.SET_USER, user });

  if (!user || user.role !== USER_ROLE.DRIVER) return;
  dispatch(setLocation(10.388049, 107.095121));
};

export const setAuth = (isAuth) => (dispatch) => {
  dispatch({ type: AuthType.SET_AUTH, isAuth });
};
