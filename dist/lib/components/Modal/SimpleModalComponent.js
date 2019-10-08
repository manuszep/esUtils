"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var SimpleModal = /** @class */ (function (_super) {
    __extends(SimpleModal, _super);
    function SimpleModal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SimpleModal.prototype.closeModal = function () {
        var _a = this.props, customOnClose = _a.customOnClose, afterCloseAction = _a.afterCloseAction, closeModal = _a.closeModal;
        if (customOnClose) {
            customOnClose();
        }
        closeModal();
        if (typeof afterCloseAction === "function") {
            afterCloseAction();
        }
    };
    SimpleModal.prototype.render = function () {
        var _this = this;
        var _a = this.props, modalId = _a.modalId, title = _a.title, body = _a.body, primaryLabel = _a.primaryLabel, customPrimaryAction = _a.customPrimaryAction, customSecondaryAction = _a.customSecondaryAction, handlePrimaryAction = _a.handlePrimaryAction, closeLabel = _a.closeLabel, closeModal = _a.closeModal, primaryLabelDisabled = _a.primaryLabelDisabled;
        var modalClassId = modalId ? "cy-modal-" + modalId : "";
        return (react_1.default.createElement("div", { className: "cy-modal " + modalClassId },
            react_1.default.createElement("div", __assign({ className: "modal-header" }, !title ? { "hidden": true } : {}),
                react_1.default.createElement("h5", { className: "modal-title" },
                    react_1.default.createElement("span", { className: "cy-modal-title" }, title)),
                react_1.default.createElement("button", { type: "button", className: "close", "aria-label": "Close", onClick: function () { return closeModal(); } },
                    react_1.default.createElement("span", { "aria-hidden": "true" }, "\u00D7"))),
            react_1.default.createElement("div", __assign({ className: "modal-body" }, !body ? { "hidden": true } : {}),
                react_1.default.createElement("span", { className: "cy-modal-body" }, body)),
            react_1.default.createElement("div", __assign({ className: "modal-footer" }, !closeLabel && !primaryLabel ? { "hidden": true } : {}),
                react_1.default.createElement("button", __assign({}, !closeLabel ? { "hidden": true } : {}, { type: "button", className: "btn btn-ghost cy-modal-close", onClick: function () {
                        if (typeof customSecondaryAction === "function") {
                            customSecondaryAction();
                        }
                        _this.closeModal();
                    } }), closeLabel),
                react_1.default.createElement("button", __assign({ type: "button", className: "btn btn-axa cy-modal-accept" }, !primaryLabel ? { "hidden": true } : {}, primaryLabelDisabled ? { "disabled": true } : {}, { onClick: function () {
                        if (typeof customPrimaryAction === "function") {
                            customPrimaryAction();
                        }
                        else if (typeof handlePrimaryAction === "function") {
                            handlePrimaryAction();
                        }
                        _this.closeModal();
                    } }),
                    react_1.default.createElement("span", null, primaryLabel)))));
    };
    return SimpleModal;
}(react_1.Component));
exports.SimpleModal = SimpleModal;
