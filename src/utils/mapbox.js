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

export const createUserLayer = (isCustomer) => ({
  id: USER_ID,
  type: "symbol",
  source: USER_ID,
  layout: {
    "icon-size": 0.4,
    "icon-allow-overlap": true,
    "icon-image": isCustomer ? "icon-customer" : "icon-driver",
    "icon-ignore-placement": true,
    "text-field": "Vị trí của bạn",
    "text-size": 14,
    "text-offset": [0, -1.95],
    "text-anchor": "center",
  },
  paint: {
    "text-color": "#ffffff",
    "text-halo-color": "#E74C3C",
    "text-halo-width": 1.5,
  },
});

export const createOrderLayer = () => ({
  id: ORDER_ID,
  type: "symbol",
  source: ORDER_ID,
  layout: {
    "icon-size": 0.4,
    "icon-allow-overlap": true,
    "icon-image": "{icon}",
    "icon-ignore-placement": true,
    "text-field": "{text}",
    "text-size": 14,
    "text-offset": [0, -1.95],
    "text-anchor": "center",
  },
  paint: {
    "text-color": "#ffffff",
    "text-halo-color": ["get", "color"],
    "text-halo-width": 1.5,
  },
});

export const mapOrderDataToDataSource = (info, isCustomer) => {
  if (!info) return [];

  const {
    customerLat,
    customerLng,
    driverLat,
    driverLng,
    receiveLat,
    receiveLng,
  } = info;

  const data = [
    {
      lat: customerLat,
      lng: customerLng,
      text: isCustomer ? "Vị trí của bạn" : "Vị trí người gửi",
      color: "#E74C3C",
      icon: "icon-customer",
    },
    {
      lat: driverLat,
      lng: driverLng,
      text: isCustomer ? "Vị trí tài xế" : "Vị trí của bạn",
      color: "#8DC26F",
      icon: "icon-driver",
    },
    {
      lat: receiveLat,
      lng: receiveLng,
      text: "Địa chỉ giao hàng",
      color: "#FDC830",
      icon: "icon-receiver",
    },
  ];

  return data.map((d) => ({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [d.lng, d.lat],
    },
    properties: {
      color: d.color,
      text: d.text,
      icon: d.icon,
    },
  }));
};
