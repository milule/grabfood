import { GlobalType } from "../types";

export const setLocation = (lat, lng) => (dispatch, getState) => {
  const { location } = getState().global;
  const { latitude, longitude, isAllow } = location;

  if (lat === 0 && lng === 0) return;
  if (latitude === lat && longitude === lng) return;

  location.latitude = latitude ? latitude : lat;
  location.longitude = longitude ? longitude : lng;

  if (!isAllow) {
    location.isAllow = true;
  }

  dispatch({ type: GlobalType.SET_LOCATION, location });
};

export const clearLocation = () => ({
  type: GlobalType.CLEAR_LOCATION,
});
