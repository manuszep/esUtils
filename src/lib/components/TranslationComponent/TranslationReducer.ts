import update from "immutability-helper";

import {
  getInitialState,
  SET_LABELS,
  KeyedObject
} from "../../../index";

export const translationReducer = (
  state = getInitialState().translation,
  action: {"type": string, "labels": KeyedObject<string>}
) => {
  switch (action.type) {
    case SET_LABELS: {
      return update<KeyedObject>(state, {
        "labels": { $set: action.labels }
      });
    }
    default: {
      return state;
    }
  }
}
