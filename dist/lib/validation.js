"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var moment_1 = __importDefault(require("moment"));
var index_1 = require("../index");
exports.required = function (value) {
    if (typeof value !== "undefined"
        && value !== ""
        && value !== "---"
        && value !== false) {
        return undefined;
    }
    return react_1.default.createElement("span", { className: "form-control-feedback" },
        react_1.default.createElement(index_1.Translation, null, "ERROR_REQUIRED"));
};
exports.isValidDate = function (value) {
    if (typeof value === "undefined" || !value)
        return false;
    return moment_1.default(value, ["D/M/YYYY", "D/MM/YYYY", "DD/M/YYYY", "DD/MM/YYYY"], true).isValid();
};
exports.dateAfterToday = function (value) {
    if (!exports.isValidDate(value))
        return false;
    var date = index_1.parseDate(value);
    var today = index_1.getCurrentDate();
    return date.isAfter(today) ? undefined : react_1.default.createElement(index_1.Translation, null, "ERROR_DATE_IN_PAST");
};
exports.dateWithinYear = function (value) {
    if (!exports.isValidDate(value))
        return false;
    var date = index_1.parseDate(value);
    var yearFromToday = index_1.getCurrentDate().add(1, "y");
    return date.isSameOrBefore(yearFromToday) ? undefined : react_1.default.createElement(index_1.Translation, null, "ERROR_DATE_AFTER_YEAR");
};
exports.validDate = function (value) {
    var convertedDate = false;
    if (value !== "" && value !== null) {
        convertedDate = (!exports.isValidDate(value));
    }
    return value && convertedDate ? react_1.default.createElement(index_1.Translation, null, "ERROR_INVALID_DATE") : undefined;
};
exports.dateNotBefore1900 = function (value) {
    var date = index_1.parseDate(value);
    if (!moment_1.default(date).isAfter(moment_1.default("01/01/1900", ["D/M/YYYY", "D/MM/YYYY", "DD/M/YYYY", "DD/MM/YYYY"], true))) {
        return react_1.default.createElement(index_1.Translation, null, "ERROR_DATE_BEFORE_1900");
    }
    return;
};
exports.dateNotInFuture = function (value) {
    var pastDate = false;
    if (!(value === "" || value == null)) {
        var today = index_1.getCurrentDate();
        var userDate = index_1.parseDate(value);
        pastDate = moment_1.default(today).isSameOrAfter(userDate);
    }
    else {
        return undefined;
    }
    return pastDate ? undefined : react_1.default.createElement(index_1.Translation, null, "ERROR_DATE_IN_FUTURE");
};
exports.validEmail = function (value) {
    return value && !index_1.patternEmail.test(value)
        ? react_1.default.createElement(index_1.Translation, null, "ERROR_INVALID_EMAIL")
        : undefined;
};
exports.validPhoneLogic = function (phoneNumber) {
    if (!phoneNumber) {
        return true;
    }
    var valid = false;
    if (phoneNumber.startsWith("0032")) {
        valid = index_1.patternPhone.test(phoneNumber)
            || index_1.patternPhoneMobile.test(phoneNumber);
    }
    else {
        valid = /^\d+$/.test(phoneNumber);
    }
    return valid;
};
exports.validPhone = function (value) {
    var valid = exports.validPhoneLogic(value);
    return valid ? undefined : react_1.default.createElement(index_1.Translation, null, "PHONE_NUMBER_INVALID");
};
