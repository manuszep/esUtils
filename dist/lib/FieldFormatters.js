"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.priceFormatter = function (value) {
    if (value === null || typeof value === "undefined") {
        return "";
    }
    return ("" + value).replace(".", ",");
};
exports.priceNormalizerFactory = function (digitsCount, decimalCount) {
    var diC = typeof digitsCount !== "undefined" ? digitsCount : "";
    var deC = typeof decimalCount !== "undefined" ? decimalCount : "";
    var r = RegExp("^([0-9]{0," + diC + "})(\\.[0-9]{0," + deC + "})?");
    return function (value) {
        var newVal = ("" + value).replace(",", ".");
        var regMatch = newVal.match(r);
        if (regMatch === null) {
            return "";
        }
        var p1 = regMatch[1];
        var p2 = regMatch[2] || "";
        return "" + p1 + p2;
    };
};
exports.priceNormalizer = exports.priceNormalizerFactory();
