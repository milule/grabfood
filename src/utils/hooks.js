import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { mapboxgl } from "./mapbox";
import { MAP_COORDS } from "../constanst";
import { getUserStore } from "./localstorage";
import { geoService } from "../services/geolocation";
import { authAction, globalAction } from "../store/actions";

export const useInit = () => {
  const { setLocation } = useGlobal();
  const { login, logout, isAuth } = useAuth();
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    const user = getUserStore();
    user ? login(user) : logout();
    setIsInit(true);
  }, []);

  useEffect(() => {
    initLocation();
  }, []);

  const initLocation = useCallback(async () => {
    const permission = geoService.grantPermission();
    if (!permission) return;

    const { latitude = 0, longitude = 0 } = await geoService.getPosition();
    setLocation(latitude, longitude);
  });

  return { isInit, isAuth };
};

export const useGlobal = () => {
  const dispatch = useDispatch();
  const { location } = useSelector(({ global }) => global, shallowEqual);

  return {
    location,
    setLocation: (lat, lng) => dispatch(globalAction.setLocation(lat, lng)),
    clearLocation: () => dispatch(globalAction.clearLocation()),
  };
};

export const useAuth = () => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector(({ auth }) => auth, shallowEqual);

  return {
    user,
    isAuth,
    setAuth: (isAuth) => dispatch(authAction.setAuth(isAuth)),
    login: (user) => dispatch(authAction.setUser(user)),
    logout: () => dispatch(authAction.setUser(null)),
  };
};

export const useMapBox = (
  options = {
    antialias: true,
    style: "mapbox://styles/mapbox/streets-v9",
    center: MAP_COORDS,
    zoom: 13,
    pitch: 45,
    attributionControl: false,
  }
) => {
  const map = useRef(null);
  const isMapLoaded = useRef(false);

  // Create MapBox instance and resolved on load
  const initMap = useCallback(async (container) => {
    try {
      map.current = new mapboxgl.Map({
        container: container,
        ...options,
      });

      map.current.on("load", () => Promise.resolve());

      isMapLoaded.current = true;
    } catch (ex) {
      Promise.reject();
    }
  }, []);

  return {
    map,
    initMap,
    isMapLoaded: isMapLoaded.current,
  };
};
