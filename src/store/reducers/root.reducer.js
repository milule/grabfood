import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import globalReducer from "./global.reducer";
import dialogReducer from "./dialog.reducer";

const predicate = (prefix) => ({ type }) => {
  return type.startsWith(prefix);
};

function wrapper(reducerFunction, reducerPredicate) {
  return (state, action) => {
    const isInitializationCall = state === undefined;
    const shouldRunWrappedReducer =
      reducerPredicate(action) || isInitializationCall;
    return shouldRunWrappedReducer ? reducerFunction(state, action) : state;
  };
}

const appReducer = combineReducers({
  auth: wrapper(authReducer, predicate("AUTH_")),
  global: wrapper(globalReducer, predicate("GLOBAL_")),
  dialog: wrapper(dialogReducer, predicate("DIALOG_")),
});

export default appReducer;
