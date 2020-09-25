import makeStyles from "@material-ui/core/styles/makeStyles";

export const useStyles = makeStyles((theme) => ({
  main: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "white",
    overflowY: "hidden",
    "& .mapboxgl-canvas-container": {
      height: "100vh",
    },
  },
  line: {
    height: 15,
    borderLeft: "2px dotted red",
    background: "transparent",
    marginTop: theme.spacing(0.25),
    marginBottom: theme.spacing(0.25),
  },
  divider: {
    marginTop: theme.spacing(0.75),
    marginBottom: theme.spacing(0.75),
  },
  dialog: {
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  searchbox: {
    top: 45,
    left: theme.spacing(1.5),
    right: theme.spacing(1.5),
    zIndex: 10,
    display: "flex",
    position: "absolute",
    alignItems: "center",
    padding: theme.spacing(1),
  },
  serchinput: {
    height: 30,
    width: "100%",
  },
  appBar: {
    top: "auto",
    bottom: 0,
  },
  form: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(6),
    "& .MuiTextField-root": {
      width: "100%",
    },
  },
}));
