import { DialogType } from "../types";

export const open = (mode, customProps = {}, dialogProps = {}) => (
  dispatch
) => {
  customProps = typeof customProps === "object" ? customProps : {};
  customProps.onConfirm = customProps.onConfirm || dispatch(close);
  customProps.onCancel = customProps.onCancel || dispatch(close);

  dispatch({ type: DialogType.OPEN, mode, customProps, dialogProps });
};

export const close = () => (dispatch) => {
  dispatch({ type: DialogType.CLOSE });
};
