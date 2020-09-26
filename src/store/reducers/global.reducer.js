import { GlobalType } from "../types";

const initialState = {
  location: {},
  locationDriver: {
    latitude: 10.388049,
    longitude: 107.095121,
    isAllow: true,
  },
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
    case GlobalType.SET_LOCATION_DRIVER:
      return {
        ...state,
        locationDriver: {
          ...state.locationDriver,
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
