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

export const createRetailManagementLayer = () => ({
  id: RETAIL_MANAGEMENT_ID,
  type: "symbol",
  source: RETAIL_MANAGEMENT_ID,
  layout: {
    "icon-allow-overlap": true,
    "icon-image": [
      "case",
      ["==", ["get", "colorCode"], 1],
      "icon-poi-gray",
      ["==", ["get", "colorCode"], 2],
      "icon-poi-cyan",
      ["==", ["get", "colorCode"], 3],
      "icon-poi-lime",
      ["==", ["get", "colorCode"], 4],
      "icon-poi-purple",
      ["==", ["get", "colorCode"], 5],
      "icon-poi-orange",
      "icon-poi-gray",
    ],
    "icon-size": [
      "interpolate",
      ["exponential", 2],
      ["zoom"],
      6,
      0.6,
      8,
      0.7,
      10,
      0.8,
      12,
      0.85,
      14,
      0.9,
      16,
      1.0,
    ],
  },
});

export const createBusStopLayer = () => ({
  id: BUS_STOP_ID,
  type: "symbol",
  source: BUS_STOP_ID,
  layout: {
    "icon-image": "icon-bus-stop",
    "text-field": "{busStopCode}",
    "text-size": [
      "step",
      ["zoom"],
      1, // Input val
      0,
      0,
      13,
      9,
      14,
      10,
      15, // Text size = 12 when zoom level passes 16
      12,
    ],
    // 'text-offset': [
    //   'step',
    //   ['zoom'],
    //   ['literal', [4, 0]],
    //   13,
    //   ['literal', [4, 0]],
    //   15,
    //   ['literal', [4, 0]]
    // ],
    "icon-allow-overlap": [
      "step",
      ["zoom"],
      false, // Input val
      0,
      false,
      12, // Use bus-stop-icon when zoom level passes 15
      true,
    ],
    "text-allow-overlap": [
      "step",
      ["zoom"],
      false, // Input val
      0,
      false,
      12,
      true,
    ],
    "icon-size": [
      "interpolate",
      ["exponential", 2],
      ["zoom"],
      10,
      0.5,
      12,
      0.6,
      14, // zoom level 0
      0.7, // icon size 0.1
      15,
      0.7,
      16,
      0.8,
    ],
    // 'text-anchor': 'right'
    "text-offset": [0, -1.25],
    "text-anchor": "center",
  },
  paint: {
    "text-color": "#005483",
    "text-halo-color": "#fff",
    "text-halo-width": 1.5,
  },
});

export const createBusRouteLayer = () => ({
  id: BUS_ROUTE_ID,
  type: "line",
  source: BUS_ROUTE_ID,
  paint: {
    "line-opacity": 0.75,
    "line-color": ["get", "color"],
    "line-width": [
      "interpolate",
      ["exponential", 2],
      ["zoom"],
      0,
      ["*", 1.1, ["^", 2, -3]],
      4,
      ["*", 1.1, ["^", 2, -2]],
      8,
      ["*", 1.1, ["^", 2, -1]],
      12,
      ["*", 1.1, ["^", 2, 1]],
      14,
      ["*", 1.1, ["^", 2, 2]],
      16,
      ["*", 1.1, ["^", 2, 3]],
      18,
      ["*", 1.1, ["^", 2, 4]],
    ],
  },
});

export const createBusLayer = () => ({
  id: BUS_ID,
  type: "symbol",
  source: BUS_ID,
  layout: {
    "icon-size": [
      "interpolate",
      ["exponential", 2],
      ["zoom"],
      4,
      0,
      6,
      0.1,
      8,
      0.2,
      10,
      0.3,
      12, // zoom level 0
      0.35, // icon size 0.1
      16,
      0.4,
    ],
    "icon-image": [
      "case",
      ["==", ["get", "load"], LOAD.SEA],
      "icon-bus-green",
      ["==", ["get", "load"], LOAD.SDA],
      "icon-bus-orange",
      "icon-bus-red",
    ],
    "icon-ignore-placement": true,
    "icon-allow-overlap": true,
    "text-allow-overlap": true,
    "text-field": "{serviceNo}",
    "text-size": [
      "step",
      ["zoom"],
      1, // Input val
      0,
      0,
      12,
      9,
      14,
      10,
      16, // Text size = 12 when zoom level passes 16
      12,
    ],
    // 'text-offset': [1.75, -0.25],
    // 'text-anchor': 'left'
    "text-offset": [0, 1],
    "text-anchor": "center",
  },
  paint: {
    "text-color": "#000000",
    "text-halo-color": "#E74C3C",
    "text-halo-width": 1.75,
  },
});

export const mapDataToBusStopDataSource = (busStops) => {
  return {
    type: "FeatureCollection",
    features: busStops.map((busStop) => {
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [+busStop.longitude, +busStop.latitude],
        },
        properties: {
          busStopCode: busStop.busstopcode,
          roadName: busStop.roadname,
        },
      };
    }),
  };
};

export const mapDataToBusRouteDataSource = (busRoutes) => {
  const mergedBusRoutes = [];

  busRoutes
    .filter((route) => route.polylines)
    .forEach((busRoute) => {
      busRoute.polylines.forEach((encodedPolyline) => {
        const decodedCoords = polyline.toGeoJSON(encodedPolyline).coordinates;
        const newBusRoute = { ...busRoute, coordinates: decodedCoords };

        mergedBusRoutes.push(newBusRoute);
      });
    });

  return {
    type: "FeatureCollection",
    features: mergedBusRoutes.map((route) => {
      return {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: route.coordinates,
        },
        properties: {
          color: route.color || getRandomLineColor(),
        },
      };
    }),
  };
};

export const mapDataToBusDataSource = (buses) => {
  return {
    type: "FeatureCollection",
    features: buses.map((bus) => {
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [+bus.Longitude, +bus.Latitude],
        },
        properties: {
          load: bus.Load,
          type: bus.Type,
          serviceNo: bus.ServiceNo,
        },
      };
    }),
  };
};

// const getColor = (serviceNo, colors) => {
//   if (!colors[serviceNo]) {
//     const updatedColors = { ...colors };
//     updatedColors[serviceNo] = getRandomLineColor();
//
//     this.colors = updatedColors;
//
//     // this.setState({ colors: updatedColors });
//     return this.colors[serviceNo];
//   }
//
//   return this.colors[serviceNo];
// };

export const getRandomLineColor = () => {
  const colorCount = Object.keys(LINE_COLOR).length;

  const randomKey = randomInteger(0, colorCount);

  return Object.values(LINE_COLOR)[randomKey];
};
