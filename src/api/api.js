import axios from "axios";

// default config for the axios instance
const axiosParams = {
  // set different base url base on the environment
  baseURL:
    import.meta.env.MODE === "development"
      ? import.meta.env.VITE_APP_API_BASE_URL
      : "/",
  // set different base url base on the environment
  //   baseURL: import.meta.env.VITE_APP_API_BASE_URL,
};

// create axios instanse with default params
const axiosInstance = axios.create(axiosParams);

// main api function
const api = (axios) => {
  const withAbort = (fn = async (...args) => {
    const originalConfig = args[args.length - 1];

    // extract abort property from the config
    let { abort, ...config } = originalConfig;

    // create cancel token and abort method only if abort
    // function was passed
    if (typeof abort === "function") {
      const { cancel, token } = getCancelSource();
      config.cancelToken = token;
      abort(cancel);
    }

    try {
      // spread all arguments from args besides the original config,
      // and pass the rest of the config without abort property
      return await fn(...args.slice(0, args.length - 1), config);
    } catch (error) {
      // Add "aborted" property to the error if the request was cancelled
      didAbort(error) && (error.aborted = true);
      throw error;
    }
  });

  const withLogger = async (promise) =>
    promise.catch((error) => {
      /**
       * Always log errors in dev environment
       * if (process.env.NODE_ENV !== 'development') throw error
       */
      // Log error only if VUE_APP_DEBUG_API env is set to true
      // if (!import.meta.env.DEV) throw error;
      if (!import.meta.env.VITE_APP_DEBUG_API) throw error;

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.group("error response");
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        console.groupEnd();
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest
        // in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }

      console.log(error.config);

      throw error;
    });

  // wrapper function
  return {
    get: (url, config = {}) => withLogger(withAbort(axios.get)(url, config)),
    post: (url, body, config = {}) =>
      withLogger(withAbort(axios.post)(url, body, config)),
    patch: (url, body, config = {}) =>
      withLogger(withAbort(axios.patch)(url, body, config)),
    delete: (url, config = {}) =>
      withLogger(withAbort(axios.delete)(url, config)),
  };
};

export default api(axiosInstance);

// ...other function
export const didAbort = (error) => axios.isCancel(error);
export const getCancelSource = () => axios.CancelToken.source();

export const abortable = (fn) => {
  // create cancel token and cancel method
  const { cancel, token } = getCancelSource();
  // return the cancel method and the wrapped function with a cancel token
  return {
    abort: cancel,
    fn: (...args) => {
      // If the last argument is not an object then throw
      if (typeof args[args.length - 1] !== "object") {
        throw new Error("the last argument me be a config object!");
      }

      // Add the cancel token to the last argument passed
      // The last argument passed should always be a config object
      args[args.length - 1] = {
        ...args[args.length - 1],
        cancelToken: token,
      };

      return fn(...args);
    },
  };
};
