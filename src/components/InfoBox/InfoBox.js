import React, { Fragment, memo } from "react";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useStyles } from "./InfoBox.styled";
import { useAuth } from "../../utils";
import { USER_ROLE } from "../../constanst";

const InfoBox = memo(({ info = {} }) => {
  const classes = useStyles();
  const { user } = useAuth();
  const isCustomer = user.role === USER_ROLE.CUSTOMER;

  if (!info || typeof info !== "object") return null;

  function renderCustomerInfo() {
    return (
      <Fragment>
        <ListItem disableGutters divider>
          <ListItemText>Tên tài xế: {info.driverName || "N/A"} </ListItemText>
        </ListItem>
        <ListItem disableGutters divider>
          <ListItemText>
            Số điện thoại tài xế: {info.driverPhone || "N/A"}
          </ListItemText>
        </ListItem>
        <ListItem disableGutters divider>
          <ListItemText>Tên sản phẩm: {info.productName || "N/A"}</ListItemText>
        </ListItem>
        <ListItem disableGutters>
          <ListItemText>
            Địa chỉ giao hàng: {info.receiveAddress || "N/A"}
          </ListItemText>
        </ListItem>
      </Fragment>
    );
  }

  function renderDriverInfo() {
    return (
      <Fragment>
        <ListItem disableGutters divider>
          <ListItemText>
            Tên người gửi: {info.customerName || "N/A"}{" "}
          </ListItemText>
        </ListItem>
        <ListItem disableGutters divider>
          <ListItemText>
            Số điện thoại người gửi: {info.customerPhone || "N/A"}
          </ListItemText>
        </ListItem>
        <ListItem disableGutters divider>
          <ListItemText>
            Tên người nhận: {info.receiveName || "N/A"}
          </ListItemText>
        </ListItem>
        <ListItem disableGutters divider>
          <ListItemText>
            Số điện thoại người nhận: {info.receivePhone || "N/A"}
          </ListItemText>
        </ListItem>
        <ListItem disableGutters>
          <ListItemText>
            Địa chỉ giao hàng: {info.receiveAddress || "N/A"}
          </ListItemText>
        </ListItem>
      </Fragment>
    );
  }

  return (
    <Card elevation={0} className={classes.infoBox}>
      <List disablePadding>
        {isCustomer ? renderCustomerInfo() : renderDriverInfo()}
      </List>
    </Card>
  );
});

export default InfoBox;
