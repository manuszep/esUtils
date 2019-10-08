"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = function (fn, threshhold, scope) {
    var last;
    var deferTimer;
    threshhold || (threshhold = 250);
    return function () {
        var context = scope || window;
        var now = +new Date;
        var args = arguments;
        if (last && now < last + threshhold) {
            clearTimeout(deferTimer);
            deferTimer = window.setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, threshhold);
        }
        else {
            last = now;
            fn.apply(context, args);
        }
    };
};
exports.requestAnimFrame = function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
};
