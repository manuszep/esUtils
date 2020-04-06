"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var index_1 = require("../../../index");
var labels = {};
exports.parseTranslationMaps = function (translationMap) {
    var parsedMap = translationMap;
    if (typeof translationMap === "string") {
        parsedMap = parsedMap.replace(/`/gm, '"');
        parsedMap = parsedMap.replace(/(\r\n|\n|\r)/gm, "");
        parsedMap = parsedMap.replace(/,([^,]*)$/, '$1');
        parsedMap = JSON.parse(parsedMap);
    }
    return parsedMap;
};
exports.fetchTranslations = function (lang) {
    var gVar = index_1.getAppGlobalVar();
    return axios_1.default
        .get(gVar.endpoints.getLanguages.replace("%%lang%%", lang))
        .then(function (resp) {
        var translationMaps = exports.parseTranslationMaps(resp.data);
        return translationMaps;
    });
};
exports.getCurrentLanguage = function () {
    var gVar = index_1.getAppGlobalVar();
    var lang = gVar.appStore.getState().pageState.lang;
    return lang;
};
exports.getTranslationFromLabelDictionary = function (key, labelDictionary, noprefix) {
    if (noprefix === void 0) { noprefix = false; }
    var appPrefix = noprefix ? "" : index_1.getAppPrefix();
    var prefix = appPrefix.length ? appPrefix.toUpperCase() + "_" : "";
    if (typeof key !== "string")
        return key;
    var fullKey = "" + prefix + key;
    if (typeof window.debugTranslationLabels !== "undefined" && window.debugTranslationLabels === "true") {
        // eslint-disable-next-line no-console
        console.log("Translation Label: " + key);
        // eslint-disable-next-line no-console
        console.log("Translation Label: " + fullKey);
    }
    try {
        return (key && typeof labelDictionary[fullKey] !== "undefined")
            ? labelDictionary[fullKey]
            : fullKey;
    }
    catch (err) {
        return fullKey;
    }
};
exports.getTranslation = function (key) {
    var gVar = index_1.getAppGlobalVar();
    if (gVar && gVar.appStore) {
        labels = gVar.appStore.getState().translation.labels;
    }
    return exports.getTranslationFromLabelDictionary(key, labels);
};
exports.getTranslationFromProps = function (props, key) {
    return exports.getTranslationFromLabelDictionary(key, props.labels);
};
