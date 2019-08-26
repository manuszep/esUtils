import axios from "axios";
import querystring from "query-string-es5-with-types";

import { getEndPoints } from "../../index";

export const getReduxStore = (getState: Function) => {
  const reduxStore = { ...getState() };
  delete reduxStore.translation; // no need to save these
  if (typeof reduxStore.address !== "undefined") {
    reduxStore.address.autocomplete_cities = [];
    reduxStore.address.autocomplete_streets = [];
    reduxStore.address.autocomplete_full_data = [];
    reduxStore.address.proposals = [];
    reduxStore.address.nonNormalizedAddress = {};
  }

  return JSON.stringify(reduxStore);
};

export const saveState = (getState: Function) => {
  const result: { [key: string]: any } = {};
  result.REDUX_STATE = getReduxStore(getState);
  const store = querystring.stringify(result);
  return axios.post(`${getEndPoints().saveState}&v=${(new Date()).valueOf()}`, store)
    .then()
    .catch(() => {});
};
