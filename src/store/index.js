import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

function configStore() {
  const isDev = process.env.NODE_ENV === "development";
  const store = isDev
    ? createStore(rootReducer, compose(applyMiddleware(thunk)))
    : createStore(rootReducer, applyMiddleware(thunk));

  if (!isDev || !module.hot) return store;

  module.hot.accept("./reducers", () => {
    store.replaceReducer(rootReducer);
  });

  return store;
}

const createdStore = configStore();

export const store = createdStore;
