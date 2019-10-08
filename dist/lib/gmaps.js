"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
exports.getGmapsUrl = function () {
    return index_1.getAppGlobalVar().gmapsUrl || "";
};
exports.loadGoogleMapsJs = function (initMap) {
    if (window.google && window.google.maps) {
        initMap();
        return;
    }
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    window.initMap = initMap;
    script.src = exports.getGmapsUrl() + "&callback=initMap";
    script.async = true;
    if (ref && ref.parentNode) {
        ref.parentNode.insertBefore(script, ref);
    }
};
