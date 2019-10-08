"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
exports.scrollTo = function (speed, scrollTargetY) {
    if (speed === void 0) { speed = 100; }
    if (scrollTargetY === void 0) { scrollTargetY = 0; }
    var scrollY = window.scrollY || document.documentElement.scrollTop;
    var currentTime = 0;
    // min time .1, max time .8 seconds
    var time = Math.max(0.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, 0.8));
    var easeOutCubic = function (t) {
        var newT = t - 1;
        return (newT * newT * newT) + 1;
    };
    // add animation loop
    function tick() {
        currentTime += 1 / 60;
        var p = currentTime / time;
        var t = easeOutCubic(p);
        if (p < 1) {
            index_1.requestAnimFrame()(tick);
            window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
        }
        else {
            window.scrollTo(0, scrollTargetY);
        }
    }
    // call it once to get started
    tick();
};
exports.shouldShowIf = function (condition) {
    if (!condition) {
        return { "hidden": true };
    }
    return {};
};
