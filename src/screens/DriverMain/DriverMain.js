import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PinDropIcon from "@material-ui/icons/PinDrop";
import PinPersonIcon from "@material-ui/icons/PersonPinCircle";
import { useStyles } from "./DriverMain.styled";
import { orderProducts } from "../../api/order.api";
import {
  useAuth,
  useDialog,
  useGlobal,
  useMapBox,
  //
  mapOrder,
  closeSocket,
  createSocket,
} from "../../utils";

const Main = memo(() => {
  const socket = useRef(null);
  const timeout = useRef(null);
  const classes = useStyles();
  const { user } = useAuth();
  const { location } = useGlobal();
  const { close, openConfirm } = useDialog();
  const { map, initMap } = useMapBox();
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    initMap(document.getElementById("mapbox"));
  }, []);

  useEffect(() => {
    if (!location.isAllow) return;
    socket.current = createSocket({ ...user, ...location });
    listenTopic();

    return () => closeSocket(socket.current);
  }, [location.isAllow]);

  const canBeUse = useMemo(() => {
    return !!location.isAllow;
  }, [location]);

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

    socket.current.emit("accept-request", data);
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
      <div id="mapbox" className={classes.main} />
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
          disabled={!canBeUse}
          className={classes.infoBtn}
        >
          Hoàn tất chuyến đi
        </Button>
      </Box>
    </section>
  );
});

export default Main;
