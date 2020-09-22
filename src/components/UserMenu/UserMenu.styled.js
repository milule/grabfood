import makeStyles from "@material-ui/core/styles/makeStyles";

export const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    fontSize: theme.spacing(4),
    marginBottom: theme.spacing(1.5),
    background: theme.palette.primary.main,
  },
  toggle: {
    position: "absolute",
    top: 0,
    right: 0,
  },
}));
