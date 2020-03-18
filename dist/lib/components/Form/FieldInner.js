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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var index_1 = require("../../../index");
var FieldInner = /** @class */ (function (_super) {
    __extends(FieldInner, _super);
    function FieldInner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldInner.prototype.getMarkup = function () {
        var _a = this.props, help = _a.help, id = _a.id, name = _a.name, input = _a.input, label = _a.label, maxLength = _a.maxLength, placeholder = _a.placeholder, tag = _a.tag, type = _a.type, className = _a.className, showIf = _a.showIf, fieldSubmitted = _a.fieldSubmitted, addonBefore = _a.addonBefore, addonAfter = _a.addonAfter, meta = _a.meta, labelHelp = _a.labelHelp, inputRef = _a.inputRef, afterRef = _a.afterRef, replacements = _a.replacements, customError = _a.customError, rest = __rest(_a, ["help", "id", "name", "input", "label", "maxLength", "placeholder", "tag", "type", "className", "showIf", "fieldSubmitted", "addonBefore", "addonAfter", "meta", "labelHelp", "inputRef", "afterRef", "replacements", "customError"]);
        var tagId = id || name;
        var tagType = type || "text";
        var baseFieldClass = "form-control";
        var TagComponent;
        switch (type) {
            case "select":
                TagComponent = index_1.Select;
                break;
            case "radio":
                TagComponent = index_1.Radio;
                break;
            case "radio_group":
                TagComponent = index_1.RadioGroup;
                break;
            case "checkbox":
                TagComponent = index_1.CheckBox;
                break;
            case "toggle":
                TagComponent = index_1.Toggle;
                break;
            case "payment_methods":
                TagComponent = index_1.PaymentMethod;
                break;
            default:
                TagComponent = tag || "input";
        }
        var hasError = (meta.error || customError);
        var errorMsg;
        var groupCls = "form-group cy-field-" + (input ? input.name : name);
        var inputCls = classnames_1.default(baseFieldClass, "", className);
        if (meta.touched || fieldSubmitted) {
            errorMsg = (hasError) ? react_1.default.createElement("div", { className: "form-control-feedback cy-error" }, meta.error || customError) : null;
            groupCls = classnames_1.default("form-group", { "has-danger": hasError }, "cy-field-" + (input ? input.name : name));
            inputCls = classnames_1.default(baseFieldClass, { "form-control-danger": hasError }, className);
        }
        var disabled = !(typeof showIf === "undefined" || showIf);
        var labelHelpText = (typeof labelHelp === "undefined")
            ? "" : (react_1.default.createElement("small", null,
            react_1.default.createElement(index_1.Translation, null, labelHelp)));
        var showLabel = typeof label !== 'undefined'
            && type !== "checkbox"
            && type !== "radio"
            && type !== "toggle"
            && type !== "phone";
        return (react_1.default.createElement("div", { className: groupCls },
            showLabel && (react_1.default.createElement("label", { htmlFor: tagId },
                react_1.default.createElement(index_1.Translation, { replacements: replacements }, label),
                labelHelpText)),
            this.renderFieldTag(TagComponent, addonBefore, addonAfter, inputRef, afterRef, react_1.default.createElement(index_1.FieldTooltip, { help: help }), __assign(__assign(__assign({}, input), { "id": tagId, "className": inputCls, "type": tagType, "maxLength": maxLength, "placeholder": index_1.getTranslation(placeholder), "label": label, "disabled": disabled, "replacements": replacements }), rest)),
            errorMsg));
    };
    FieldInner.prototype.renderFieldTag = function (Tag, addonBefore, addonAfter, inputRef, afterRef, tooltip, props) {
        var tagProps = Object.assign({}, props);
        // Remove properties that native elements do not support
        if (typeof Tag === "string" || Tag === index_1.Select) {
            delete tagProps.replacements;
            delete tagProps.changeField;
            delete tagProps.validationMessages;
            delete tagProps.dispatch;
        }
        if ((typeof addonBefore === "undefined" || addonBefore === null || addonBefore.length < 1)
            && (typeof addonAfter === "undefined" || addonAfter === null || addonAfter.length < 1)) {
            return (react_1.default.createElement("div", { className: "form-group__field" },
                react_1.default.createElement(Tag, __assign({ ref: inputRef }, tagProps)),
                tooltip));
        }
        return (react_1.default.createElement("div", { className: "form-group__field" },
            react_1.default.createElement("div", { className: "input-group-addon-wrapper" },
                addonBefore && react_1.default.createElement("span", { className: "input-group-addon" }, addonBefore),
                react_1.default.createElement(Tag, __assign({ ref: inputRef }, tagProps)),
                addonAfter && react_1.default.createElement("span", { className: "input-group-addon last-child", ref: afterRef }, addonAfter)),
            tooltip));
    };
    FieldInner.prototype.render = function () {
        var showIf = this.props.showIf;
        var shouldUseShowIf = (typeof showIf === "boolean");
        return (shouldUseShowIf) ? react_1.default.createElement(index_1.ShowIf, { condition: showIf }, this.getMarkup()) : this.getMarkup();
    };
    return FieldInner;
}(react_1.Component));
exports.FieldInner = FieldInner;
