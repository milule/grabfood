import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export default createMuiTheme({
  palette: {},
  overrides: {
    MuiFormLabel: {},
    MuiSvgIcon: {},
    MuiPopover: {
      paper: {
        marginTop: 6,
      },
    },
    MuiButton: {
      root: {
        "&:focus": {
          outline: "none",
        },
        minWidth: 150,
        fontWeight: "bold",
      },
    },
    MuiIconButton: {
      root: {
        "&:focus": {
          outline: "none",
        },
      },
    },
    MuiListItem: {
      root: {
        "&:focus": {
          outline: "none",
        },
      },
    },
    MuiInputBase: {
      root: {
        backgroundColor: "#fff",
        borderColor: "#fff",
      },
    },
    MuiInputLabel: {
      root: {
        // whiteSpace: "nowrap",
        // textOverflow: "ellipsis",
        // overflow: "hidden",
        // minWidth: 0,
        // width: "inherit",
      },
    },
    MuiGrid: {
      root: {
        display: "flex",
      },
    },
  },
});
