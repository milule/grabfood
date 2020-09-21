import React, { Fragment, memo } from "react";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import { Box, Divider } from "@material-ui/core";
import { useAuth } from "../../utils";
import { useStyles } from "./UserMenu.styled";

const UserMenu = memo(() => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const { isAuth, user } = useAuth();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function renderList() {
    return (
      <Fragment>
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Thông tin đơn hàng"} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItem>
      </Fragment>
    );
  }

  if (!isAuth) return null;

  return (
    <Fragment>
      <IconButton onClick={handleDrawerOpen}>
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding={2}
          flexDirection="column"
        >
          <Avatar className={classes.avatar}>
            {user.username[0].toUpperCase()}
          </Avatar>
          <Typography variant="h4">{user.username}</Typography>
          <Typography variant="body1">{user.email}</Typography>
        </Box>
        <Divider />
        <List>{renderList()}</List>
      </Drawer>
    </Fragment>
  );
});

export default UserMenu;
