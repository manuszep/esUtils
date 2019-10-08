"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
exports.PHONE_FIXED = 'PHONE_FIXED';
exports.PHONE_MOBILE = 'PHONE_MOBILE';
exports.parseStringTemplate = function (str, replacements) {
    if (typeof str === "undefined" ||
        str === null ||
        str === "" ||
        typeof replacements === "undefined" ||
        Object.keys(replacements).length === 0)
        return str;
    return str.replace(/%%\w+%%/g, function (all) {
        return all in replacements ? replacements[all] : all;
    });
};
exports.capitalizeFirstLetter = function (s) {
    return s[0].toUpperCase() + s.slice(1);
};
exports.composeStreetAddress = function (street, streetNr, postalBoxText, boxNr) {
    if (postalBoxText === void 0) { postalBoxText = ""; }
    if (boxNr === void 0) { boxNr = ""; }
    var addressStreetNr = "";
    var addressBoxNr = boxNr;
    if (streetNr) {
        addressStreetNr = streetNr;
    }
    if (addressBoxNr !== "") {
        addressBoxNr = " " + postalBoxText + " " + addressBoxNr;
    }
    return (street + " " + addressStreetNr + addressBoxNr).trim();
};
exports.composeCityAddress = function (postalCode, city) {
    return postalCode + " " + city;
};
exports.composeFullAddress = function (street, streetNr, postalBoxText, boxNr, postalCode, city, oneLine) {
    if (postalBoxText === void 0) { postalBoxText = ""; }
    if (boxNr === void 0) { boxNr = ""; }
    if (oneLine === void 0) { oneLine = true; }
    var separator = oneLine ? ", " : ",<br />";
    var fullStreet = exports.composeStreetAddress(street, streetNr, postalBoxText, boxNr);
    var fullCity = exports.composeCityAddress(postalCode, city);
    return "" + fullStreet + separator + fullCity;
};
exports.composeGmapsAddress = function (street, streetNumber, postalCode, city) {
    if (street === void 0) { street = ""; }
    if (streetNumber === void 0) { streetNumber = ""; }
    if (postalCode === void 0) { postalCode = ""; }
    if (city === void 0) { city = ""; }
    var p1 = street + " " + streetNumber;
    var separator = ", ";
    if (p1.length < 2) {
        p1 = "";
        separator = "";
    }
    return "" + p1 + separator + postalCode + " " + city;
};
exports.formatPrice = function (price, lang) {
    if (lang === void 0) { lang = "fr"; }
    if (typeof price === "undefined")
        return "";
    if (!price)
        return price;
    var parsedPrice = parseFloat(price);
    if (typeof parsedPrice !== "number" || Number.isNaN(parsedPrice))
        parsedPrice = 0;
    var hasDecimal = parsedPrice % 1 !== 0;
    var num;
    if (hasDecimal) {
        num = parsedPrice.toFixed(2).replace(/./g, function (char, i, string) {
            if (char === '.')
                return ",<span class=\"decimal\">";
            return i > 0 && char !== "." && (string.length - i) % 3 === 0 ? "&nbsp;" + char : char;
        });
    }
    else {
        num = parsedPrice;
    }
    if (lang.toLowerCase() === "fr") {
        return num + "&nbsp;\u20AC</span>";
    }
    return "\u20AC&nbsp;" + num + "</span>";
};
exports.formatPercentage = function (num) {
    if (typeof num === "undefined")
        return "";
    if (num === 0)
        return num + "%";
    if (!num)
        return "" + num;
    return num + "%";
};
exports.normalizeCountryPrefixTo00 = function (prefix) {
    var newPrefix = prefix;
    if (newPrefix.charAt(0) === "+") {
        newPrefix = newPrefix.replace("+", "00");
    }
    if (newPrefix.startsWith("0") && !newPrefix.startsWith("00")) {
        newPrefix = "0" + newPrefix;
    }
    if (!newPrefix.startsWith("00")) {
        newPrefix = "00" + newPrefix;
    }
    return newPrefix;
};
exports.normalizeCountryPrefixToPlus = function (prefix) {
    return "+" + prefix.replace(/^00+/, '');
};
exports.normalizeAreaPrefix = function (prefix) {
    return prefix.replace(/^0+/, '');
};
exports.constructPhoneNumber = function (prefix, phoneNumber) {
    var newPrefix = exports.normalizeCountryPrefixTo00(prefix);
    return "" + newPrefix + phoneNumber;
};
/**
 * Detect if phone number is mobile or fixed
 */
exports.getPhoneType = function (phone) {
    if (phone.match(index_1.patternPhone))
        return exports.PHONE_FIXED;
    if (phone.match(index_1.patternPhoneMobile))
        return exports.PHONE_MOBILE;
    return '';
};
/**
 * Convert database phone format to readable format
 */
exports.phoneTransform = function (phone) {
    var _a;
    // If phone number is empty, return as is
    if (typeof phone === 'undefined' || phone === null)
        return null;
    // Remove any leading or trailing spaces
    var p = phone.trim();
    // Replace 00 by +
    p = p.replace(/^00/, "+");
    // Check type to choose formatting
    var type = exports.getPhoneType(p);
    // Define matching patterns
    var patterns = (_a = {},
        _a[exports.PHONE_FIXED] = /^(\+\d{2})?(0?\d)(\d{3})(\d{2})(\d{2})$/i,
        _a[exports.PHONE_MOBILE] = /^(\+\d{2})(\d{3})(\d{2})(\d{2})(\d{2})$/i,
        _a);
    // If a type is found and trimmed number is not empty
    if (typeof type !== 'undefined' && p !== '') {
        // Get matches array
        var m = p.match(patterns[type]);
        if (m !== null) {
            // Format result
            return m[1] + " " + m[2] + " " + m[3] + " " + m[4] + " " + m[5];
        }
    }
    return p;
};
exports.getOptionLabelFromValue = function (options, value) {
    var i = 0;
    for (i; i < options.length; i += 1) {
        if (options[i].value === value) {
            return options[i].label;
        }
    }
    return value;
};
exports.getGuid = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return "" + s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
};
