"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_form_1 = require("redux-form");
var index_1 = __importDefault(require("axios/index"));
var query_string_for_all_1 = __importDefault(require("query-string-for-all"));
var index_2 = require("../../index");
exports.constructFieldsToSave = function (getState, fields, fieldsAndValues, shouldSaveState, stringify) {
    if (fields === void 0) { fields = []; }
    if (fieldsAndValues === void 0) { fieldsAndValues = []; }
    if (shouldSaveState === void 0) { shouldSaveState = false; }
    if (stringify === void 0) { stringify = true; }
    var result = {};
    fields.forEach(function (fieldName) {
        result[fieldName] = index_2.deepFind(getState().form.app.values, fieldName);
    });
    fieldsAndValues.forEach(function (item) {
        result[item.name] = item.value;
    });
    if (shouldSaveState) {
        result.REDUX_STATE = index_2.getReduxStore(getState);
    }
    if (stringify) {
        return query_string_for_all_1.default.stringify(result);
    }
    return result;
};
exports.changeField = function (fieldName, fieldValue) {
    return {
        "type": "@@redux-form/CHANGE",
        "meta": {
            "form": "app",
            "field": fieldName,
            "touch": false,
            "persistentSubmitErrors": false
        },
        "payload": fieldValue
    };
};
exports.changeMultipleFields = function (fields) {
    return function (dispatch) {
        fields.forEach(function (field) {
            dispatch(exports.changeField(field.name, field.value));
        });
    };
};
exports.clearField = function (fieldName) {
    return function (dispatch) {
        dispatch(exports.changeField(fieldName, ''));
    };
};
exports.clearMultipleFields = function (fields) {
    return function (dispatch) {
        fields.forEach(function (field) {
            dispatch(exports.clearField(field));
        });
    };
};
exports.unTouchField = function (fieldName) {
    return function (dispatch) {
        return dispatch(redux_form_1.untouch("app", fieldName));
    };
};
exports.unTouchMultipleFields = function (fieldNames) {
    return function (dispatch) {
        fieldNames.forEach(function (fieldName) { return dispatch(exports.unTouchField(fieldName)); });
    };
};
function saveLeadToBrokerReason(leadToBrokerReason) {
    var fieldsAndValues = {
        "LEAD_TO_BROKER_REASON": leadToBrokerReason
    };
    index_1.default.post(index_2.getEndPoints().saveBlockedInFlowReason + "&v=" + (new Date()).valueOf(), query_string_for_all_1.default.stringify(fieldsAndValues))
        .catch(function (err) {
        Promise.reject(err);
    });
}
exports.saveLeadToBrokerReason = saveLeadToBrokerReason;
function saveBlockedInFlowReason(blockedInFlowReason) {
    var fieldsAndValues = {
        "BLOCKED_IN_FLOW_REASON": blockedInFlowReason
    };
    index_1.default.post(index_2.getEndPoints().saveBlockedInFlowReason + "&v=" + (new Date()).valueOf(), query_string_for_all_1.default.stringify(fieldsAndValues))
        .catch(function (err) {
        Promise.reject(err);
    });
}
exports.saveBlockedInFlowReason = saveBlockedInFlowReason;
