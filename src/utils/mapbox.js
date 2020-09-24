import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import { USER_ID, ORDER_ID } from "../constanst";

// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken =
  "pk.eyJ1IjoibWlsdWxlIiwiYSI6ImNrZmNmYWFjZjFmYjUyenFzZ2ttbjhmZmgifQ.UkRfCAjw-lMRbypRB2PMcw";

export { mapboxgl };

export const createEmptyFeature = () => ({
  type: "Feature",
  properties: {},
  geometry: {
    type: "Point",
    coordinates: [],
  },
});

export const createEmptySource = () => ({
  type: "geojson",
  data: {
    type: "FeatureCollection",
    features: [createEmptyFeature()],
  },
});

export const createFeatureWithLatLng = (latitude = 1, longitude = 1) => ({
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [longitude, latitude],
  },
  properties: {},
});

export const createUserLayer = () => ({
  id: USER_ID,
  type: "symbol",
  source: USER_ID,
  layout: {
    "icon-size": 0.4,
    "icon-allow-overlap": true,
    "icon-image": "icon-customer",
    "icon-ignore-placement": true,
    "text-field": "Vị trí của bạn",
    "text-size": 13,
    "text-offset": [0, -1.95],
    "text-anchor": "center",
  },
  paint: {
    "text-color": "#ffffff",
    "text-halo-color": "#E74C3C",
    "text-halo-width": 1.5,
  },
});
