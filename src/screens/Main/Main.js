import React, { memo, useEffect } from "react";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import InputBase from "@material-ui/core/InputBase";
import MarkerIcon from "@material-ui/icons/Room";
import OriginIcon from "@material-ui/icons/TripOrigin";
import { useStyles } from "./Main.styled";
import { useMapBox } from "../../utils";

const Main = memo(() => {
  const classes = useStyles();
  const { initMap, map } = useMapBox();

  useEffect(() => {
    initMap(document.getElementById("mapbox"));
  }, []);

  return (
    <section className={classes.main}>
      <div id="mapbox" className={classes.main} />
      <Card className={classes.searchbox} component="section">
        <Box
          width={30}
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          marginRight={0.5}
        >
          <OriginIcon color="primary" />
          <Divider className={classes.line} orientation="vertical" />
          <MarkerIcon color="secondary" />
        </Box>
        <Box display="flex" flexDirection="column" flex={1}>
          <InputBase
            className={classes.serchinput}
            placeholder="Vị trí của bạn"
            inputProps={{ "aria-label": "Vị trí của bạn" }}
          />
          <Divider className={classes.divider} />
          <InputBase
            className={classes.serchinput}
            placeholder="Địa chỉ của bạn"
            inputProps={{ "aria-label": "Địa chỉ của bạn" }}
          />
        </Box>
      </Card>
    </section>
  );
});

export default Main;
