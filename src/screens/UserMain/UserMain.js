import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import MarkerIcon from "@material-ui/icons/LocationOn";
import OriginIcon from "@material-ui/icons/TripOrigin";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";

import { USER_ID } from "../../constanst";
import { useHistory } from "react-router-dom";
import { useStyles } from "./UserMain.styled";
import {
  useAuth,
  useGlobal,
  useMapBox,
  useToast,
  useDidUpdateEffect,
  //
  closeSocket,
  createSocket,
  createUserLayer,
  createEmptySource,
  createFeatureWithLatLng,
} from "../../utils";

const address = [
  {
    name: "Trường Đại học Bà Rịa - Vũng Tàu CS1",
    address: "80 Trương Công Định, phường 3, Vũng Tàu",
    position: {
      latitude: 10.3487225,
      longitude: 107.0818368,
    },
  },
  {
    name: "Trường Đại học Bà Rịa - Vũng Tàu CS2",
    address: "01 Trương Văn Bang, phường 7, Vũng Tàu",
    position: {
      latitude: 10.3640552,
      longitude: 107.0816014,
    },
  },
  {
    name: "Trường Đại học Bà Rịa - Vũng Tàu CS3",
    address: "951 Bình Giã, phường 10, Vũng Tàu, Bà Rịa-Vũng Tàu",
    position: {
      latitude: 10.3929176,
      longitude: 107.1149514,
    },
  },
];

const Main = memo(() => {
  const socket = useRef(null);
  const classes = useStyles();
  const toast = useToast();
  const history = useHistory();
  const { user } = useAuth();
  const { location } = useGlobal();
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState(null);
  const {
    map,
    initMap,
    isMapLoaded,
    loadMapImages,
    fitBoundMarkers,
  } = useMapBox();

  useDidUpdateEffect(() => {
    async function init() {
      await initMap(document.getElementById("mapbox-user"));
      await loadMapImages();
      //
      setupUserLayer();
      updateUserLayer();
    }

    if (isMapLoaded || !location.isAllow) return;

    init().catch();
  }, [isMapLoaded, location.isAllow]);

  useDidUpdateEffect(() => {
    if (!location.isAllow) return;
    socket.current = createSocket({ ...user, ...location });
    listenTopic();

    return () => closeSocket(socket.current);
  }, [location.isAllow]);

  const canBeUse = useMemo(() => {
    return !!location.isAllow;
  }, [location]);

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

  function listenTopic() {
    if (!socket.current) return;
    socket.current.on("accept-request", handleAcceptRequest);
    socket.current.on("cancel-request", handleCancelRequest);
    socket.current.on("complete-request", handleCompleteRequest);
  }

  function handleAcceptRequest(info) {
    setLoading(false);
    setOpen(false);

    toast.success("Đơn hàng của bạn đã được chấp nhận");
    history.push(`/order/${info.uuid}`, { info });
  }

  function handleCancelRequest() {
    setLoading(false);
    toast.error("Không tìm thấy tài xế");
  }

  function handleCompleteRequest() {
    toast.success("Đơn hàng của bạn đã được giao đến nơi");
  }

  const handleDestinationChange = (_, value) => {
    setDestination(value);
  };

  const handleOpenForm = () => {
    if (!destination) return;
    setOpen(true);
  };

  const handleCloseForm = () => {
    setOpen(false);
  };

  const handleConfirmForm = (order) => {
    if (!socket.current) return;
    const params = { order, user, location, destination };
    setLoading(true);
    socket.current.emit("request", params);
  };

  return (
    <section className={classes.main}>
      <div id="mapbox-user" className={classes.main} />
      <Card className={classes.searchbox} component="section">
        <Box
          width={30}
          display="flex"
          marginRight={0.5}
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
        >
          <OriginIcon color="primary" />
          <Divider className={classes.line} orientation="vertical" />
          <MarkerIcon color="secondary" />
        </Box>
        <Box display="flex" flexDirection="column" flex={1}>
          <InputBase
            readOnly
            className={classes.serchinput}
            value={canBeUse ? "Vị trí của bạn" : ""}
            placeholder={canBeUse ? "Vị trí của bạn" : ""}
          />
          <Divider className={classes.divider} />
          <Autocomplete
            options={address}
            onChange={handleDestinationChange}
            noOptionsText="Không có địa chỉ"
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <InputBase
                readOnly={!canBeUse}
                inputRef={params.InputProps.ref}
                className={classes.serchinput}
                placeholder="Địa chỉ giao hàng"
                inputProps={params.inputProps}
              />
            )}
          />
        </Box>
      </Card>
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
          onClick={handleOpenForm}
        >
          Nhập thông tin
        </Button>
      </Box>
      <DialogForm
        open={open}
        loading={loading}
        classes={classes}
        onClose={handleCloseForm}
        onConfirm={handleConfirmForm}
      />
    </section>
  );
});

const DialogForm = memo(({ open, classes, loading, onClose, onConfirm }) => {
  const [form, setForm] = useState({
    userName: "",
    userPhone: "",
    productName: "",
    productWeight: "",
    detailAddress: "",
  });

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrderProduct = () => {
    if (loading) return;
    onConfirm(form);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      className={classes.dialog}
      TransitionComponent={Transition}
    >
      <Box
        display="flex"
        width="100%"
        height={48}
        position="relative"
        alignItems="center"
        justifyContent="center"
        position="fixed"
        right={0}
        left={0}
        top={0}
      >
        <Typography variant="h5" color="secondary">
          Thông tin giao hàng
        </Typography>
        <IconButton
          disabled={loading}
          className={classes.closeBtn}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <form className={classes.form}>
        <Typography variant="h6">Thông tin chung</Typography>
        <TextField
          size="small"
          variant="outlined"
          margin="dense"
          name="detailAddress"
          label="Thông tin địa chỉ"
          value={form.detailAddress}
          onChange={handleFormChange}
          InputProps={{ readOnly: loading }}
        />
        <TextField
          size="small"
          variant="outlined"
          margin="dense"
          name="userName"
          label="Tên người nhận"
          value={form.userName}
          onChange={handleFormChange}
          InputProps={{ readOnly: loading }}
        />
        <TextField
          size="small"
          variant="outlined"
          margin="dense"
          name="userPhone"
          inputMode="tel"
          label="Số di động"
          value={form.userPhone}
          onChange={handleFormChange}
          InputProps={{ readOnly: loading }}
        />
        <Typography variant="h6">Thông tin đơn hàng</Typography>
        <TextField
          size="small"
          variant="outlined"
          margin="dense"
          name="productName"
          label="Sản phẩm"
          value={form.productName}
          onChange={handleFormChange}
          InputProps={{ readOnly: loading }}
        />
        <TextField
          size="small"
          variant="outlined"
          margin="dense"
          type="number"
          name="productWeight"
          label="Trọng lượng"
          value={form.productWeight}
          onChange={handleFormChange}
          InputProps={{ readOnly: loading }}
        />
      </form>
      <AppBar position="fixed" color="transparent" className={classes.appBar}>
        <Toolbar component={Box} display="flex" justifyContent="center">
          <Button
            variant="contained"
            disableRipple={loading}
            onClick={handleOrderProduct}
            color={loading ? "secondary" : "primary"}
          >
            {loading ? "Đang tìm tài xế ..." : "Xác nhận"}
          </Button>
        </Toolbar>
      </AppBar>
    </Dialog>
  );
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default Main;
