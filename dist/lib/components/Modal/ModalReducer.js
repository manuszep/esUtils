"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var immutability_helper_1 = __importDefault(require("immutability-helper"));
var index_1 = require("../../../index");
var defaultState = {
    "show": false,
    "contentPath": null,
    "props": {}
};
exports.modalReducer = function (state, action) {
    if (state === void 0) { state = defaultState; }
    switch (action.type) {
        case index_1.DISMISS_MODAL: {
            return immutability_helper_1.default(state, {
                "show": { "$set": false },
                "contentPath": { "$set": null },
                "props": { "$set": {} }
            });
        }
        case index_1.SHOW_MODAL: {
            return immutability_helper_1.default(state, {
                "show": { "$set": true },
                "contentPath": { "$set": action.contentPath },
                "props": { "$set": action.props }
            });
        }
        default: {
            return state;
        }
    }
};
