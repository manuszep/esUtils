"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepFind = function (obj, path) {
    var current = obj;
    var i = 0;
    var idx;
    var tmp;
    var tmpIdx;
    var paths = path.split(".");
    if (typeof obj === "undefined")
        return obj;
    for (i = 0; i < paths.length; i += 1) {
        idx = paths[i].match(/(.*)\[([^\]]{0,})\]$/);
        if (idx === null) {
            tmp = current[paths[i]];
        }
        else {
            tmpIdx = idx[1].replace(/^\[|\]$/g, '');
            tmpIdx = Number.isNaN(Number(tmpIdx)) ? tmpIdx : Number(tmpIdx);
            tmp = (idx[1].length) ? current[tmpIdx][idx[2]] : current[idx[2]];
        }
        if (typeof tmp === "undefined") {
            return undefined;
        }
        current = tmp;
    }
    return current;
};
