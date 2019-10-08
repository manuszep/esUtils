"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistoryLocation = function () {
    var _a = window.location, pathname = _a.pathname, search = _a.search;
    return "" + pathname + search;
};
