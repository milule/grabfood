import makeStyles from "@material-ui/core/styles/makeStyles";

export const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDialogTitle-root": {
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
    },
  },
}));
