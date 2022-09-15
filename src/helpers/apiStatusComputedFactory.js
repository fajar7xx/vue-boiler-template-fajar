import { upperFirst } from "lodash-es";
import { apiStatus } from "@/constant/apiStatus";

export const apiStatusComputedFactory = (reactivePropertyKeys = "") => {
  /**
   * object to store computed getters for
   * different API statuses
   */
  let computed = {};

  /**
   * if the argument passed in array then assign it,
   * otherwise, wrap it in array
   */
  const properties = Array.isArray(reactivePropertyKeys)
    ? reactivePropertyKeys
    : [reactivePropertyKeys];

  /**
   * loop through API statuses
   * IDLE, PENDING, SUCCESS, ERROR
   */
  // for (const [statusKey, statusValue] of Object.entries(apiStatus)) {
  //   /**
  //    * Normalise status key
  //    * IDDLE -> Idle
  //    * SUCCESS -> Success
  //    */
  //   const normalisedStatus = upperFirst(statusKey.toLowerCase());
  //   /**
  //    * add a computed property
  //    */
  //   computed[`${reactivePropertyKey}${normalisedStatus}`] = function () {
  //     return this[reactivePropertyKey] === statusValue;
  //   };
  // }

  for (const reactivePropertyKey of properties) {
    /**
     * loop through API statuses
     * IDLE, PENDING, SUCCESS, ERROR
     */
    for (const [statusKey, statusValue] of Object.entries(apiStatus)) {
      /**
       * normalize status key
       * IDLE -> Idle
       * SUCCESS -> Success
       */
      const normalisedStatus = upperFirst(statusKey.toLowerCase());
      computed[`${reactivePropertyKey}${normalisedStatus}`] = function () {
        return this[reactivePropertyKey] === statusValue;
      };
    }
  }

  return computed;
};
