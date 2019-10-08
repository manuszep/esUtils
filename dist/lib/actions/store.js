"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var query_string_for_all_1 = __importDefault(require("query-string-for-all"));
var index_1 = require("../../index");
exports.getReduxStore = function (getState) {
    var reduxStore = __assign({}, getState());
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
exports.saveState = function (getState) {
    var result = {};
    result.REDUX_STATE = exports.getReduxStore(getState);
    var store = query_string_for_all_1.default.stringify(result);
    return axios_1.default.post(index_1.getEndPoints().saveState + "&v=" + (new Date()).valueOf(), store)
        .then()
        .catch(function () { });
};
