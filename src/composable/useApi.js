import { ref, computed } from "vue";
import { upperFirst } from "lodash-es";
import { apiStatus } from "@/constants/apiStatus";

const { IDLE, SUCCESS, PENDING, ERROR } = apiStatus;

/**
 * create an object of computed statuses
 *
 * @param {Symbol} status
 * @param {String} apiName
 */
const createNormalisedApiStatuses = (status, apiName) => {
  let normalisedApiStatuses = {};

  for (const [statusKey, statusValue] of Object.entries(apiStatus)) {
    let propertyName = "";

    // create a property name for each computed status
    if (apiName) {
      propertyName = `${apiName}Status${upperFirst(statusKey.toLowerCase())}`;
    } else {
      propertyName = `status${statusKey.toLowerCase()}`;
    }

    // create a computed that return true/false based on
    // the currently selected status
    normalisedApiStatuses[propertyName] = computed(
      () => statusValue === status.value
    );
  }

  return normalisedApiStatuses;
};

/**
 * @param {String} apiName
 * @param {function} fn
 * @param {Object} config
 */
export const useApi = (apiName, fn, config = {}) => {
  const { initialData, responseAdapter } = config;

  // reactive value to store data and api status
  const data = ref(initialData);
  const status = ref(IDLE);
  const error = ref(null);

  /**
   * initialise the api request
   */
  const exec = async (...args) => {
    try {
      // clear current error value
      error.value = null;
      // API request start
      status.value = PENDING;
      const response = await fn(...args);
      // before assigning the response, check if a responseAdapter
      // was passed, if yes, then use it
      data.value =
        typeof responseAdapter === "function"
          ? responseAdapter(response)
          : response;
      // done
      status.value = SUCCESS;
    } catch (error) {
      // oops, there was an error
      error.value = error;
      status.value = ERROR;
    }
  };

  return {
    data,
    status,
    error,
    exec,
    ...createNormalisedApiStatuses(status, apiName),
  };
};
