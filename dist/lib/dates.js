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
exports.getAge = function (dob, defaultAge) {
    if (dob !== undefined) {
        var dateParts = dob.split("/");
        var dateObject = new Date(+dateParts[2], Number(dateParts[1]) - 1, +dateParts[0]);
        var diffMs = Date.now() - dateObject.getTime();
        var ageDt = new Date(diffMs);
        var age = Math.abs(ageDt.getUTCFullYear() - 1970);
        return age;
    }
    return defaultAge;
};
exports.getIsAdult = function (dob) {
    var currentDate = exports.getCurrentDate();
    return exports.getDifferenceInYears(currentDate, exports.parseDate(dob)) >= 18;
};
