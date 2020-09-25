import React, { memo } from "react";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useStyles } from "./InfoBox.styled";

const InfoBox = memo((info = {}) => {
  const classes = useStyles();

  if (typeof info !== "object") return;

  return (
    <Card elevation={0} className={classes.infoBox}>
      <List>
        <ListItem>
          <ListItemText>{info}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText></ListItemText>
        </ListItem>
      </List>
    </Card>
  );
});

export default InfoBox;
