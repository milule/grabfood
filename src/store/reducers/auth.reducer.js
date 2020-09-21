import { AuthType } from "../types";

const initialState = {
  user: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthType.SET_USER:
      return {
        ...state,
        user: action.user,
        isAuth: action.user ? true : false,
      };
    case AuthType.SET_AUTH:
      return {
        ...state,
        isAuth: action.isAuth,
      };
    default:
      return state;
  }
};

export default authReducer;
