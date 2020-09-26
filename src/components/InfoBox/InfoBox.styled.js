import makeStyles from "@material-ui/core/styles/makeStyles";

export const useStyles = makeStyles((theme) => ({
  infoBox: {
    position: "absolute",
    top: 45,
    left: theme.spacing(1.5),
    right: theme.spacing(1.5),
    backdropFilter: "blur(5px)",
    background: "rgba(0,0,0,0.1)",
    height: 120,
    overflowY: "auto",
    padding: theme.spacing(1.5),
    "& >*": {
      color: "red",
      fontWeight: "bold",
    },
  },
}));
