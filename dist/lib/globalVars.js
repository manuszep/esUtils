"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var appGlobalVarPointer;
var appPrefix;
var appStore;
exports.appGlobalVarInit = function (name, prefix) {
    appGlobalVarPointer = window[name];
    appPrefix = prefix;
};
exports.setAppStoreVar = function (store) {
    appStore = store;
};
exports.getAppStore = function () {
    return appStore;
};
exports.getAppGlobalVar = function () {
    return appGlobalVarPointer
        || window["Cypress"]
        || {
            "initialState": {
                "pageState": {},
                "translation": {},
                "address": {},
                "quote": {}
            }
        };
};
exports.getAppPrefix = function () {
    return appPrefix;
};
