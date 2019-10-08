"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var immutability_helper_1 = __importDefault(require("immutability-helper"));
var index_1 = require("../../../../index");
exports.addressReducer = function (state, action) {
    if (state === void 0) { state = index_1.getInitialState().address; }
    switch (action.type) {
        case index_1.SET_CITY_AUTOCOMPLETE: {
            return immutability_helper_1.default(state, {
                "autocomplete_cities": { "$set": action.cities }
            });
        }
        case index_1.SET_STREET_AUTOCOMPLETE: {
            return immutability_helper_1.default(state, {
                "autocomplete_streets": { "$set": action.streets }
            });
        }
        case index_1.SET_AUTOCOMPLETE_FULL_DATA: {
            return immutability_helper_1.default(state, {
                "autocomplete_full_data": { "$set": action.data }
            });
        }
        case index_1.NORMALIZE_POSTAL_ADDRESS_PROPOSALS:
            return immutability_helper_1.default(state, {
                "normalizeProposals": { "$set": action.proposals }
            });
        case index_1.SET_NON_NORMALIZED_ADDRESS:
            return immutability_helper_1.default(state, {
                "nonNormalizedAddress": { "$set": action.address }
            });
        case index_1.SET_STREET_NR:
            return immutability_helper_1.default(state, {
                "streetNr": { "$set": action.streetNr }
            });
        case index_1.SET_BOX_NR:
            return immutability_helper_1.default(state, {
                "boxNr": { "$set": action.boxNr }
            });
        default: {
            return state;
        }
    }
};
