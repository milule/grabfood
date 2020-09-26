import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PinDropIcon from "@material-ui/icons/PinDrop";
import PinPersonIcon from "@material-ui/icons/PersonPinCircle";
import { InfoBox } from "../../components";
import { useStyles } from "./DriverMain.styled";
import { USER_ID, ORDER_ID } from "../../constanst";
import { orderCheck, orderComplete } from "../../api/order.api";
import {
  useAuth,
  useToast,
  useDialog,
  useGlobal,
  useMapBox,
  //
  mapOrder,
  closeSocket,
  createSocket,
  createUserLayer,
  createOrderLayer,
  createEmptySource,
  createFeatureWithLatLng,
  mapOrderDataToDataSource,
} from "../../utils";

const Main = memo(() => {
  const toast = useToast();
  const socket = useRef(null);
  const timeout = useRef(null);
  const classes = useStyles();
  const { user } = useAuth();
  const { location } = useGlobal();
  const { close, openConfirm } = useDialog();
  const [order, setOrder] = useState(null);
  const {
    map,
    initMap,
    isMapLoaded,
    loadMapImages,
    fitBoundMarkers,
  } = useMapBox();

  useEffect(() => {
    async function init() {
      await initMap(document.getElementById("mapbox-driver"));
      await loadMapImages();
      //
      setupUserLayer();
      setupOrderLayer();
      updateUserLayer();

      fetchOrderCheck();
    }

    if (isMapLoaded || !location.isAllow) return;

    init().catch();
  }, [location.isAllow]);

  useEffect(() => {
    if (!location.isAllow) return;
    socket.current = createSocket({ ...user, ...location });
    listenTopic();

    return () => closeSocket(socket.current);
  }, [location.isAllow]);

  const canBeUse = useMemo(() => {
    return !!location.isAllow;
  }, [location]);

  async function fetchOrderCheck() {
    try {
      const { data, error } = await orderCheck({});
      if (error) return;

      toast.success("Bạn có 1 đơn hàng đang trong tiến trình");
      setOrder(data);
      updateOrderLayer(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchOrderComplete({ uuid, customer } = order) {
    try {
      const params = { uuid, customer };
      const { error } = await orderComplete(params);
      if (error) throw Error;

      toast.info(
        "Bạn đã hoàn thành chuyến giao hàng với số tiền là 50.0000 vnd"
      );

      setOrder(null);
      updateUserLayer();
      updateOrderLayer(null);
    } catch (error) {
      console.log(error);
      toast.error("Bạn chưa hoàn thành chuyến giao hàng");
    }
  }

  function setupUserLayer() {
    map.current.addSource(USER_ID, createEmptySource());
    map.current.addLayer(createUserLayer());
  }

  function updateUserLayer() {
    const source = map.current.getSource(USER_ID);

    if (!source) return;
    const feature = createFeatureWithLatLng(
      location.latitude,
      location.longitude
    );

    source.setData(feature);
    fitBoundMarkers({ features: [feature] });
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

    if (!info) return;
    fitBoundMarkers({ features });
  }

  function listenTopic() {
    if (!socket.current) return;
    socket.current.on("pending-request", handlePendingRequest);
  }

  function handlePendingRequest(data) {
    if (!data) return;

    timeout.current = setTimeout(() => {
      close();
      socket.current.emit("cancel-request", data);
    }, 5000);

    openConfirm({
      title: "Chuyến đi mới",
      node: renderTripInfo(data),
      onCancel: () => handleCancelReq(mapOrder(data, user, location)),
      onConfirm: () => handleAcceptReq(mapOrder(data, user, location)),
    });
  }

  function handleCancelReq(data) {
    if (timeout.current) clearTimeout(timeout.current);

    socket.current.emit("cancel-request", data);
  }

  function handleAcceptReq(data) {
    if (timeout.current) clearTimeout(timeout.current);

    setOrder(data);
    updateOrderLayer(data);
    socket.current.emit("accept-request", data);
  }

  async function handleTripCompleted() {
    fetchOrderComplete();
  }

  function renderTripInfo(data) {
    const { user, location, order, destination } = data;
    const { latitude, longitude } = location;
    const { address: receiveAddrres } = destination;
    const { name: customerName, phone: customerPhone } = user;
    const {
      userName: receiveName,
      userPhone: receivePhone,
      productName,
      productWeight,
    } = order;

    return (
      <List>
        <ListItem disableGutters>
          <ListItemIcon className={classes.icon}>
            <PinPersonIcon fontSize="large" color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={`Địa điểm nhận hàng: ${latitude} - ${longitude}`}
          />
        </ListItem>
        <ListItem disableGutters>
          <ListItemIcon className={classes.icon}>
            <PinDropIcon fontSize="large" color="secondary" />
          </ListItemIcon>
          <ListItemText primary={`Địa điểm giao hàng: ${receiveAddrres}`} />
        </ListItem>
        <Typography variant="subtitle1" color="primary">
          Thông tin đơn hàng
        </Typography>
        <Typography variant="body2">Tên người gửi: {customerName}</Typography>
        <Typography variant="body2">
          Số điện thoại người gửi: {customerPhone}
        </Typography>
        <br />
        <Typography variant="body2">Tên người nhận: {receiveName}</Typography>
        <Typography variant="body2">
          Số điện thoại người nhận: {receivePhone}
        </Typography>
        <br />
        <Typography variant="body2">Tên sản phẩm: {productName}</Typography>
        <Typography variant="body2">
          Trọng lương sản phẩm: {productWeight}
        </Typography>
      </List>
    );
  }

  return (
    <section className={classes.main}>
      <div id="mapbox-driver" className={classes.main} />
      <InfoBox info={order} />
      <Box
        left={0}
        right={0}
        bottom={10}
        display="flex"
        position="absolute"
        justifyContent="center"
      >
        <Button
          variant="contained"
          color="primary"
          className={classes.infoBtn}
          disabled={!canBeUse || !order}
          onClick={handleTripCompleted}
        >
          Hoàn tất chuyến đi
        </Button>
      </Box>
    </section>
  );
});

export default Main;
