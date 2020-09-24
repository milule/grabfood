import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useSnackbar } from "notistack";
import { mapboxgl } from "./mapbox";
import { getUserStore } from "./localstorage";
import { geoService } from "../services/geolocation";
import { authAction, globalAction, dialogAction } from "../store/actions";
import { MAP_COORDS, CONFIRM_TYPE, DIALOG_NAME, MAP_ICON } from "../constanst";

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
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Create MapBox instance and resolved on load
  const initMap = useCallback(async (container) => {
    try {
      map.current = new mapboxgl.Map({
        container: container,
        ...options,
      });

      map.current.on("load", () => Promise.resolve());

      setIsMapLoaded(true);
    } catch (ex) {
      Promise.reject();
    }
  }, []);

  const loadMapImages = async () => {
    try {
      if (map.current) {
        const promises = Object.keys(MAP_ICON).map(
          (key) =>
            new Promise((resolve, reject) => {
              map.current.loadImage(MAP_ICON[key], (error, image) => {
                if (image && key) {
                  if (error) reject(error);
                  if (!map.current.hasImage(key)) {
                    map.current.addImage(key, image);
                  }
                }
                resolve();
              });
            })
        );
        await Promise.all(promises);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return {
    map,
    initMap,
    isMapLoaded,
    loadMapImages,
  };
};

export const useToast = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const defaultOptions = {
    autoHideDuration: 3000,
    anchorOrigin: {
      vertical: "top",
      horizontal: "center",
    },
  };

  const success = (message, customOptions = {}) => {
    enqueueSnackbar(message, {
      ...defaultOptions,
      ...customOptions,
      variant: "success",
    });
  };

  const error = (message, customOptions = {}) => {
    enqueueSnackbar(message, {
      ...defaultOptions,
      ...customOptions,
      variant: "error",
    });
  };

  const info = (message, customOptions = {}) => {
    enqueueSnackbar(message, {
      ...defaultOptions,
      ...customOptions,
      variant: "info",
    });
  };

  const warning = (message, customOptions = {}) => {
    enqueueSnackbar(message, {
      ...defaultOptions,
      ...customOptions,
      variant: "warning",
    });
  };

  return { success, error, info, warning };
};

export const useDialog = () => {
  const dispatch = useDispatch();
  const { open, mode, customProps, dialogProps } = useSelector(
    ({ dialog }) => dialog,
    shallowEqual
  );

  const openCustom = useCallback(
    (mode = "", customProps = {}, dialogProps = {}) => {
      dispatch(dialogAction.open(mode, customProps, dialogProps));
    },
    []
  );

  const openConfirm = useCallback((customProps = {}, dialogProps = {}) => {
    dialogProps.maxWidth = dialogProps.maxWidth || "xs";
    customProps.confirmType = customProps.confirmType || CONFIRM_TYPE.CONFIRM;
    dispatch(dialogAction.open(DIALOG_NAME.CONFIRM, customProps, dialogProps));
  }, []);

  const close = useCallback(() => {
    dispatch(dialogAction.close());
  }, []);

  return {
    open,
    mode,
    close,
    customProps,
    dialogProps,
    openConfirm,
    openCustom,
  };
};
