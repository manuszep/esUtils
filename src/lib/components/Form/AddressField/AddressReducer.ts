import update from "immutability-helper";

import { getInitialState } from "../../../state";

import {
  SET_CITY_AUTOCOMPLETE,
  SET_AUTOCOMPLETE_FULL_DATA,
  SET_STREET_AUTOCOMPLETE,
  NORMALIZE_POSTAL_ADDRESS_PROPOSALS,
  SET_NON_NORMALIZED_ADDRESS,
  SET_STREET_NR,
  SET_BOX_NR
} from "./actions/addressFieldActions";
import { KeyedObject } from "../../../types";

export const addressReducer = (state = getInitialState().address, action: KeyedObject) => {
  switch (action.type) {
    case SET_CITY_AUTOCOMPLETE: {
      return update(state, {
        "autocomplete_cities": { "$set": action.cities }
      });
    }
    case SET_STREET_AUTOCOMPLETE: {
      return update(state, {
        "autocomplete_streets": { "$set": action.streets }
      });
    }
    case SET_AUTOCOMPLETE_FULL_DATA: {
      return update(state, {
        "autocomplete_full_data": { "$set": action.data }
      });
    }
    case NORMALIZE_POSTAL_ADDRESS_PROPOSALS:
      return update(state, {
        "normalizeProposals": { "$set": action.proposals }
      });
    case SET_NON_NORMALIZED_ADDRESS:
      return update(state, {
        "nonNormalizedAddress": { "$set": action.address }
      });
    case SET_STREET_NR:
      return update(state, {
        "streetNr": { "$set": action.streetNr }
      });
    case SET_BOX_NR:
      return update(state, {
        "boxNr": { "$set": action.boxNr }
      });
    default: {
      return state;
    }
  }
};
