import { GlobalType } from "../types";

export const loading = (effect, global = true) => (dispatch, getState) => {
  const { loading: current } = { ...getState().global };

  global = typeof global === "boolean" ? global : true;
  current[effect] = current[effect] || {};
  current[effect].call = !current[effect].call;
  current[effect].global = global;

  dispatch({ type: GlobalType.SET_LOADING, loading: current });
};
