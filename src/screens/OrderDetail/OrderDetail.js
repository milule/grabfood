import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { ORDER_ID } from "../../constanst";
import { InfoBox } from "../../components";
import { useStyles } from "./OrderDetail.styled";
import { useLocation, useParams } from "react-router-dom";
import { orderDetails } from "../../api/order.api";
import {
  useAuth,
  useToast,
  useGlobal,
  useMapBox,
  //
  createOrderLayer,
  createEmptySource,
  mapOrderDataToDataSource,
} from "../../utils";

const OrderDetail = memo(() => {
  const toast = useToast();
  const classes = useStyles();
  const location = useLocation();
  const { uuid } = useParams();
  const [order, setOrder] = useState({});
  const {
    map,
    initMap,
    isMapLoaded,
    loadMapImages,
    fitBoundMarkers,
  } = useMapBox();

  useEffect(() => {
    async function init() {
      await initMap(document.getElementById("mapbox"));
      await loadMapImages();
      //
      setupOrderLayer();
      getOrderInfo();
    }

    init().catch();
  }, []);

  async function fetchOrderInfo() {
    try {
      const params = { uuid };
      const { data, error } = await orderDetails(params);

      if (error) return;

      setOrder(data);
      updateOrderLayer(data);
    } catch (error) {
      console.log(error);
    }
  }

  function getOrderInfo() {
    const { info } = location.state || {};

    if (info) {
      setOrder(info);
      updateOrderLayer(info);
      return;
    }

    fetchOrderInfo();
  }

  function setupOrderLayer() {
    map.current.addSource(ORDER_ID, createEmptySource());
    map.current.addLayer(createOrderLayer());
  }

  function updateOrderLayer(info) {
    const source = map.current.getSource(ORDER_ID);

    if (!source) return;

    const features = mapOrderDataToDataSource(info);

    source.setData({
      type: "FeatureCollection",
      features: features,
    });

    fitBoundMarkers({ features });
  }

  return (
    <section className={classes.main}>
      <div id="mapbox" className={classes.main} />
      <InfoBox info={order} />
    </section>
  );
});

export default OrderDetail;
