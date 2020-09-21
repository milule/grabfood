import makeStyles from "@material-ui/core/styles/makeStyles";

export const useStyles = makeStyles((theme) => ({
  logo: {
    position: "absolute",
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  other: {
    display: "flex",
  },
  login: {
    textAlign: "center",
    position: "relative",
    "&:before": {
      content: "''",
      display: "block",
      width: "100px",
      height: "2px",
      background: theme.palette.grey[300],
      left: "30px",
      top: "50%",
      position: "absolute",
    },
    "&:after": {
      content: "''",
      display: "block",
      width: "100px",
      height: "2px",
      background: theme.palette.grey[300],
      right: "30px",
      top: "50%",
      position: "absolute",
    },
  },
  form: {
    width: "350px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& .MuiTextField-root": {
      width: "100%",
      marginBottom: theme.spacing(2.5),
    },
    "& .MuiButton-root": {
      width: "100%",
      marginBottom: theme.spacing(2.5),
    },
  },
}));
