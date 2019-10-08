"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var immutability_helper_1 = __importDefault(require("immutability-helper"));
var index_1 = require("../../../index");
exports.translationReducer = function (state, action) {
    if (state === void 0) { state = index_1.getInitialState().translation; }
    switch (action.type) {
        case index_1.SET_LABELS: {
            return immutability_helper_1.default(state, {
                "labels": { $set: action.labels }
            });
        }
        default: {
            return state;
        }
    }
};
