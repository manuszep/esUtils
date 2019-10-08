"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
exports.getInitialState = function () {
    return index_1.getAppGlobalVar().initialState || {};
};
function getEndPoints() {
    return index_1.getAppGlobalVar().endpoints || {};
}
exports.getEndPoints = getEndPoints;
function getWhatsappPhone() {
    return index_1.getAppGlobalVar().whatsapp || { "whatsapp_phone": "https://api.whatsapp.com/send?phone=32491169028" };
}
exports.getWhatsappPhone = getWhatsappPhone;
exports.wrapMapStateToProps = function (state, commonItems, appItems) {
    if (state.form.app) {
        var items_1 = appItems;
        Object.keys(items_1).forEach(function (key) {
            if (typeof items_1[key] === 'function') {
                items_1[key] = items_1[key](state.form.app.values);
            }
            else {
                items_1[key] = state.form.app.values[items_1[key]];
            }
        });
        return Object.assign(commonItems, appItems);
    }
    return commonItems;
};
