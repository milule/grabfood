import axios from "axios";
import http from "http";
import https from "https";
import { API } from "../constanst";
import { store } from "../store";
import { getTokenStore } from "../utils";
import { authAction } from "../store/actions";

const context = {
  logout: () => store.dispatch(authAction.setUser(null)),
};

const basicHeader = {
  "Content-Type": "application/json",
};

const customHeader = {
  "Content-Type": "multipart/form-data",
};

const config = {
  baseURL: "http://localhost:5000",
  responseType: "json",
  timeout: 30000,
  maxContentLength: 5000,
  maxBodyLength: 5000,
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
  timeoutErrorMessage: "Server timeout",
  headers: basicHeader,
};

const instance = axios.create(config);

instance.interceptors.request.use(
  (config) => {
    // Config base URL
    config.headers["x-access-token"] = getTokenStore();
    return config;
  },
  (error) => {
    processError(error);
    loggerError(error);
    return Promise.reject(mappingError(error));
  }
);

instance.interceptors.response.use(
  (response) => {
    return mappingResponse(response);
  },
  (error) => {
    processError(error);
    loggerError(error);
    return Promise.reject(mappingError(error));
  }
);

const get = (url, params = {}, cancelToken = null) =>
  instance
    .get(url, { params, cancelToken })
    .then(({ data }) => {
      return data;
    })
    .catch(({ data }) => {
      return data;
    })
    .finally(processFinally(url, params));

const post = (url, params = {}, cancelToken = null) =>
  instance
    .post(url, params, { cancelToken })
    .then(({ data }) => {
      return data;
    })
    .catch(({ data }) => {
      return data;
    })
    .finally(processFinally(url, params));

const put = (url, params = {}, cancelToken = null) =>
  instance
    .put(url, params, { cancelToken })
    .then(({ data }) => {
      return data;
    })
    .catch(({ data }) => {
      return data;
    })
    .finally(processFinally(url, params));

const remove = (url, params = {}, cancelToken = null) =>
  instance
    .delete(url, { data: params, cancelToken })
    .then(({ data }) => {
      return data;
    })
    .catch(({ data }) => {
      return data;
    })
    .finally(processFinally(url, params));

const upload = (url, params = {}, cancelToken = null) =>
  instance
    .post(url, params, {
      cancelToken,
      headers: customHeader,
    })
    .then(({ data }) => {
      return data;
    })
    .catch(({ data }) => {
      return data;
    })
    .finally(processFinally(url, params));

function mappingResponse(response) {
  let { data = {} } = response;

  if (data.code === API.STATUS.SUCCESS) {
    data = { error: false, message: "", data: data.data, isCancel: false };
  } else {
    data = { error: true, message: data.message, data: null, isCancel: false };
  }

  return { data };
}

function mappingError(error) {
  let data;
  const { response, request } = error;
  const { status } = response || request || {};

  if (status === 401) {
    data = {
      error: true,
      message: "",
      data: null,
      isUnAuth: true,
      isCancel: axios.isCancel(error),
    };
  } else {
    data = {
      error: true,
      message: "",
      data: null,
      isUnAuth: false,
      isCancel: axios.isCancel(error),
    };
  }

  return { data };
}

function processError(error) {
  const { response = null, request = null } = error || {};
  const { status } = response || request || {};

  switch (status) {
    case 401:
      context.logout();
      break;
    default:
      break;
  }
}

const processFinally = (url, params) => () => {};

function loggerError(error) {
  if (error.response) {
    console.error("response", error.response);
  } else if (error.request) {
    console.error("request", error.request);
  } else {
    console.error("message", error);
  }
}

function createCancelToken() {
  return axios.CancelToken.source();
}

export const apiService = { get, post, put, remove, upload, createCancelToken };
