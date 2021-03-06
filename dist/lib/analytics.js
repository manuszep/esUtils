"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
exports.getGaAccount = function () {
    return index_1.getAppGlobalVar().GA_ACCOUNT || "UA-90671794-1"; // default FT/STG account
};
exports.getGoogleAnalyticsId = function () {
    var _ga = "";
    var cs = document.cookie.split("_ga=");
    if (cs.length >= 2) {
        var c = cs[1];
        if (typeof c !== "undefined") {
            _ga = c.split(";")[0];
        }
    }
    return _ga || "";
};
exports.trackConversion = function (id) {
    if (typeof window.google_trackConversion === "function") {
        window.google_trackConversion({
            "google_conversion_id": 996994227,
            "google_conversion_language": "en",
            "google_conversion_format": "3",
            "google_conversion_color": "ffffff",
            "google_conversion_label": id,
            "google_remarketing_only": false
        });
    }
};
