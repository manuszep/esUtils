import update from "immutability-helper";

import {
  getInitialState,
  KeyedObject,
  CHECK_PROSPECT,
  RESET_POINTS_OF_SALE, SET_BROKER_IBP
} from "../../../index";

export const checkProspectSituationReducer = (state = getInitialState().checkProspectSituation, action: KeyedObject) => {
  switch (action.type) {
    case CHECK_PROSPECT: {
      const checkProspectSituationResponse = action.payload.data;
      const canContinue = checkProspectSituationResponse.continue;
      let pointsOfSale = [];
      let errorMessages = [];
      let cifId = "";
      if (Object.prototype.hasOwnProperty.call(checkProspectSituationResponse, "cifId")) {
        cifId = checkProspectSituationResponse.cifId;
      }
      if (Object.prototype.hasOwnProperty.call(checkProspectSituationResponse, "pointsOfSale")) {
        pointsOfSale = checkProspectSituationResponse.pointsOfSale;
      }
      if (Object.prototype.hasOwnProperty.call(checkProspectSituationResponse, "errorMessages")) {
        errorMessages = checkProspectSituationResponse.errorMessages;
      }

      return update(state, {
        /* eslint-disable */
        "continue": {$set: canContinue},
        "cifId": {$set: cifId},
        "pointsOfSale": {$set: pointsOfSale},
        "errorMessages": {$set: errorMessages}
        /* eslint-enable */
      });
    }
    case RESET_POINTS_OF_SALE: {
      return update(state, {
        "pointsOfSale": { "$set": [] }
      });
    }

    case SET_BROKER_IBP:
      return update(state, {
        "USER_FSMA_COMPANIES": { "$set": action.list }
      });
    default:
      return state;
  }
}
