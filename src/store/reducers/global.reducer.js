import { GlobalType } from "../types";

const initialState = {
  location: {},
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case GlobalType.SET_LOCATION:
      return {
        ...state,
        location: {
          ...state.location,
          ...action.location,
        },
      };

    case GlobalType.CLEAR_LOCATION:
      return {
        ...state,
        location: {},
      };

    default:
      return state;
  }
};

export default globalReducer;
