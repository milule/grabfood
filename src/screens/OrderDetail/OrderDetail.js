import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { ORDER_ID } from "../../constanst";
import { useStyles } from "./OrderDetail.styled";
import {
  useAuth,
  useGlobal,
  useMapBox,
  useToast,
  //
  createUserLayer,
  createEmptySource,
  createFeatureWithLatLng,
} from "../../utils";

const OrderDetail = memo(({ history, match, ...rest }) => {
  const classes = useStyles();
  const toast = useToast();
  const [order, setOrder] = useState(null);
  const {
    map,
    initMap,
    isMapLoaded,
    loadMapImages,
    fitBoundMarkers,
  } = useMapBox();
  console.log(history, match, rest);

  useEffect(() => {}, []);

  useEffect(() => {
    async function init() {
      await initMap(document.getElementById("mapbox"));
      await loadMapImages();
      //
      setupOrderLayer();
    }

    init().catch();
  }, []);

  function setupOrderLayer() {
    map.current.addSource(ORDER_ID, createEmptySource());
    map.current.addLayer(createUserLayer());
  }

  function updateUserLayer() {
    const source = map.current.getSource(ORDER_ID);

    if (!source) return;
  }

  return (
    <section className={classes.main}>
      <div id="mapbox" className={classes.main} />
    </section>
  );
});

export default OrderDetail;
