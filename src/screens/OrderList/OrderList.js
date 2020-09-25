import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { USER_ID } from "../../constanst";
import { useStyles } from "./OrderList.styled";
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

const OrderList = memo(({ history, match }) => {
  const classes = useStyles();
  const toast = useToast();
  const { location } = useGlobal();
  const [order, setOrder] = useState(null);
  const {
    map,
    initMap,
    isMapLoaded,
    loadMapImages,
    fitBoundMarkers,
  } = useMapBox();

  useEffect(() => {}, []);

  return (
    <section className={classes.main}>
      <div id="mapbox" className={classes.main} />
    </section>
  );
});

export default OrderList;
