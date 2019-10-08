"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var immutability_helper_1 = __importDefault(require("immutability-helper"));
var index_1 = require("../../../index");
exports.checkProspectSituationReducer = function (state, action) {
    if (state === void 0) { state = index_1.getInitialState().checkProspectSituation; }
    switch (action.type) {
        case index_1.CHECK_PROSPECT: {
            var checkProspectSituationResponse = action.payload.data;
            var canContinue = checkProspectSituationResponse.continue;
            var pointsOfSale = [];
            var errorMessages = [];
            var cifId = "";
            if (Object.prototype.hasOwnProperty.call(checkProspectSituationResponse, "cifId")) {
                cifId = checkProspectSituationResponse.cifId;
            }
            if (Object.prototype.hasOwnProperty.call(checkProspectSituationResponse, "pointsOfSale")) {
                pointsOfSale = checkProspectSituationResponse.pointsOfSale;
            }
            if (Object.prototype.hasOwnProperty.call(checkProspectSituationResponse, "errorMessages")) {
                errorMessages = checkProspectSituationResponse.errorMessages;
            }
            return immutability_helper_1.default(state, {
                /* eslint-disable */
                "continue": { $set: canContinue },
                "cifId": { $set: cifId },
                "pointsOfSale": { $set: pointsOfSale },
                "errorMessages": { $set: errorMessages }
                /* eslint-enable */
            });
        }
        case index_1.RESET_POINTS_OF_SALE: {
            return immutability_helper_1.default(state, {
                "pointsOfSale": { "$set": [] }
            });
        }
        case index_1.SET_BROKER_IBP:
            return immutability_helper_1.default(state, {
                "USER_FSMA_COMPANIES": { "$set": action.list }
            });
        default:
            return state;
    }
};
