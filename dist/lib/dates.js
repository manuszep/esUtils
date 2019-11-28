"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
exports.parseDate = function (date) {
    if (!date)
        return moment_1.default();
    var convertedDate = date.replace(/\//g, "-") || ""; // dashes are not a supported isoFormat and throws moment warning
    return moment_1.default(convertedDate, "DD-MM-YYYY");
};
exports.getCurrentDate = function () {
    return moment_1.default();
};
exports.getDifferenceInYears = function (firstDate, secondDate) {
    return firstDate.diff(secondDate, 'years');
};
exports.getIsAdult = function (dob) {
    var currentDate = exports.getCurrentDate();
    return exports.getDifferenceInYears(currentDate, exports.parseDate(dob)) >= 18;
};
