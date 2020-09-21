import { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { authAction } from "../store/actions";
import { getUserStore } from "./localstorage";
import { mapboxgl } from "./mapbox";

export const useInit = () => {
  const { login, logout, isAuth } = useAuth();
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    const user = getUserStore();
    user ? login(user) : logout();
    setIsInit(true);
  }, []);

  return { isInit, isAuth };
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
    zoom: 10,
    pitch: 45,
    attributionControl: false,
  }
) => {
  const map = useRef(null);
  const isMapLoaded = useRef(false);
  const fitBoundMarkers = ({ features }) => {
    if (!features) return;
    if (features.length === 0) return;
    if (features.length > 1) {
      try {
        const bounds = features.reduce((bounds, feature) => {
          if (feature.geometry && feature.geometry.coordinates) {
            return bounds.extend(feature.geometry.coordinates);
          } else {
            return;
          }
        }, new mapboxgl.LngLatBounds());
        if (bounds) {
          map.current.fitBounds(bounds, {
            padding: 80,
          });
        }
      } catch (ex) {
        console.log("fitBoundMarkers", ex);
      }
    }
  };
  // Create MapBox instance and resolved on load
  const initMap = useCallback(
    (container) => {
      return new Promise((resolve, reject) => {
        try {
          mapboxgl.accessToken = MAPBOX_APIKEY;
          map.current = new mapboxgl.Map({
            container: container,
            ...options,
          });
          map.current.on("load", resolve);
          isMapLoaded.current = true;
        } catch (ex) {
          reject(ex);
        }
      });
    },
    [options]
  );
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
    loadMapImages,
    fitBoundMarkers,
    isMapLoaded: isMapLoaded.current,
  };
};
Aa;
