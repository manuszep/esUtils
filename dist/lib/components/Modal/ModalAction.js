"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_ga_1 = __importDefault(require("react-ga"));
var index_1 = require("../../../index");
exports.DISMISS_MODAL = "DISMISS_MODAL";
exports.SHOW_MODAL = "SHOW_MODAL";
window._uxa = window._uxa || [];
exports.dismissModal = function () {
    window._uxa.push(['trackPageview', "" + window.location.pathname + window.location.hash.replace('#', '?__')]);
    return {
        "type": exports.DISMISS_MODAL
    };
};
exports.showModal = function (firstArg, secondArg) {
    /*
    * If the first argument is a string, we will load a ModalContainer from the components/ModalContainers folder.
    * The second (optional) argument - an object then becomes the props.
    *
    * If the first argument is an object, this becomes the props for a "simple" modal
    * */
    if (firstArg === void 0) { firstArg = {}; }
    if (secondArg === void 0) { secondArg = {}; }
    var prefix = index_1.getModalPrefix();
    if (typeof firstArg === "object") {
        react_ga_1.default.modalview(prefix + "-Modal - " + firstArg.title);
        window._uxa.push(['trackPageview', "" + window.location.pathname + window.location.hash.replace('#', '?__') + "?cs-popin-" + prefix + "-" + firstArg.title]);
        return {
            "type": exports.SHOW_MODAL,
            "contentPath": null,
            "props": firstArg
        };
    }
    react_ga_1.default.modalview(prefix + "-Modal - " + firstArg);
    window._uxa.push(['trackPageview', "" + window.location.pathname + window.location.hash.replace('#', '?__') + "?cs-popin-StudentTravel-" + firstArg]);
    return {
        "type": exports.SHOW_MODAL,
        "contentPath": firstArg,
        "props": secondArg
    };
};
