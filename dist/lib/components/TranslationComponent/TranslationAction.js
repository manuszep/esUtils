"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../../index");
exports.SET_LABELS = "SET_LABELS";
exports.SWITCH_LANG = "SWITCH_LANG";
exports.switchLang = function (lang) {
    return {
        "type": exports.SWITCH_LANG,
        lang: lang
    };
};
exports.setLabelsInState = function (labels) {
    return {
        "type": exports.SET_LABELS,
        "labels": labels
    };
};
exports.setLabels = function (lang) {
    return function (dispatch) {
        index_1.fetchTranslations(lang)
            .then(function (translations) {
            dispatch(exports.setLabelsInState(translations));
            dispatch(exports.switchLang(lang));
        });
    };
};
