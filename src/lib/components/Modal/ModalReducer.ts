import update from "immutability-helper";

import {
  DISMISS_MODAL,
  SHOW_MODAL
} from "./ModalAction";
import { KeyedObject } from "../../types";

const defaultState = {
  "show": false,
  "contentPath": null,
  "props": {}
};

export const modalReducer = (state = defaultState, action: KeyedObject) => {
  switch (action.type) {
    case DISMISS_MODAL: {
      return update(state, {
        "show": { "$set": false },
        "contentPath": { "$set": null },
        "props": { "$set": {} }
      });
    }

    case SHOW_MODAL: {
      return update(state, {
        "show": { "$set": true },
        "contentPath": { "$set": action.contentPath },
        "props": { "$set": action.props }
      });
    }
    default: {
      return state;
    }
  }
}
