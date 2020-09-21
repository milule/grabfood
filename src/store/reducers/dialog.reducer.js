import { DialogType } from "../types";

const initialState = {
  open: false,
  mode: "",
  customProps: {},
  dialogProps: {},
};

const dialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case DialogType.OPEN:
      return {
        ...state,
        open: true,
        mode: action.mode,
        customProps: action.customProps,
        dialogProps: action.dialogProps,
      };
    case DialogType.CLOSE:
      return {
        ...state,
        open: false,
        mode: "",
        customProps: {},
        dialogProps: {},
      };
    default:
      return state;
  }
};

export default dialogReducer;
