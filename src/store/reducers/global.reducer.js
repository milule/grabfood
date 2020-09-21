import { GlobalType } from "../types";

const initialState = {
  loading: {},
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case GlobalType.SET_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          ...action.loading,
        },
      };
    default:
      return state;
  }
};

export default globalReducer;
