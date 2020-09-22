import makeStyles from "@material-ui/core/styles/makeStyles";

export const useStyles = makeStyles((theme) => ({
  main: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "white",
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
  },
}));
