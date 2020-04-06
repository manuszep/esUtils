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
var react_autocomplete_1 = __importDefault(require("react-autocomplete"));
var classnames_1 = __importDefault(require("classnames"));
var react_redux_1 = require("react-redux");
var index_1 = require("../../../../index");
var menuStyles = {
    "borderRadius": "3px",
    "boxShadow": "0 2px 12px rgba(0, 0, 0, 0.1)",
    "background": "rgba(255, 255, 255, 0.9)",
    "padding": "0",
    "fontSize": "90%",
    "position": "absolute",
    "top": "100%",
    "left": "0",
    "overflow": "auto",
    "maxHeight": "50vh",
    "zIndex": "9999"
};
var AutocompleteComponent = /** @class */ (function (_super) {
    __extends(AutocompleteComponent, _super);
    function AutocompleteComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            "value": "",
            "hasError": false
        };
        return _this;
    }
    AutocompleteComponent.prototype.onChange = function (event, value) {
        this.setState({ "value": value });
    };
    AutocompleteComponent.prototype.hasValidationMessages = function (field) {
        var validationMessages = this.props.validationMessages;
        return !(typeof validationMessages === "undefined" || !validationMessages[field]);
    };
    AutocompleteComponent.prototype.handleBlur = function (field) {
        this.setState({ "hasError": false });
        if (!this.hasValidationMessages(field))
            return;
        this.setState({ "hasError": true });
    };
    AutocompleteComponent.prototype.showErrorMessage = function (field) {
        if (!this.hasValidationMessages(field))
            return null;
        var validationMessages = this.props.validationMessages;
        return (react_1.default.createElement("div", { className: "form-control-feedback cy-error" },
            react_1.default.createElement("div", { className: "form-control-error-message" }, validationMessages[field])));
    };
    AutocompleteComponent.prototype.fieldHasError = function (field) {
        return (!this.hasValidationMessages(field)) ? null : true;
    };
    AutocompleteComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props, input = _a.input, id = _a.id, maxLength = _a.maxLength, placeholder = _a.placeholder, shouldItemRender = _a.shouldItemRender, items = _a.items, getValue = _a.getValue, name = _a.name, fieldSubmitted = _a.fieldSubmitted, validationMessages = _a.validationMessages, dispatch = _a.dispatch, sizeMd = _a.sizeMd, sizeLg = _a.sizeLg, sizeXl = _a.sizeXl, onChange = _a.onChange, onSelect = _a.onSelect, rest = __rest(_a, ["input", "id", "maxLength", "placeholder", "shouldItemRender", "items", "getValue", "name", "fieldSubmitted", "validationMessages", "dispatch", "sizeMd", "sizeLg", "sizeXl", "onChange", "onSelect"]);
        var _b = this.state, hasError = _b.hasError, value = _b.value;
        var cypressClass = "cy-field-" + name;
        var groupCls = classnames_1.default("has-autocomplete form-compact-row__col", { "has-danger": (this.fieldHasError(name)) && (hasError || fieldSubmitted) }, cypressClass);
        var sizeMdCls = (typeof sizeMd !== "undefined" && sizeMd !== "") ? "col-md-" + sizeMd : "";
        var sizeLgCls = (typeof sizeLg !== "undefined" && sizeLg !== "") ? "col-lg-" + sizeLg : "";
        var sizeXlCls = (typeof sizeXl !== "undefined" && sizeXl !== "") ? "col-xl-" + sizeXl : "";
        var test = classnames_1.default(sizeMdCls, sizeLgCls, sizeXlCls, {
            "col": sizeMd === "" && sizeLg === "" && sizeXlCls === ""
        }, groupCls);
        return (react_1.default.createElement("div", { className: test },
            react_1.default.createElement(react_autocomplete_1.default, __assign({ wrapperProps: { "className": "form-group" }, wrapperStyle: { "position": "relative" }, menuStyle: menuStyles, getItemValue: function (item) { return item.value; }, shouldItemRender: shouldItemRender || shouldItemRender, items: items, value: getValue() || value, onChange: onChange, onSelect: onSelect, renderItem: function (item, isHighlighted) { return (react_1.default.createElement("div", { key: item.value, className: classnames_1.default("autocomplete-item", { "autocomplete-item--active": isHighlighted }) }, item.label)); } }, rest, { inputProps: __assign(__assign(__assign({}, input), { "id": id, "className": "form-control", "type": "text", "maxLength": maxLength, "placeholder": index_1.getTranslation(placeholder), "onBlur": function () { return _this.handleBlur(name); }, "autoComplete": "off" }), rest) })),
            react_1.default.createElement("div", __assign({}, index_1.shouldShowIf(hasError || fieldSubmitted)), this.showErrorMessage(name))));
    };
    return AutocompleteComponent;
}(react_1.Component));
var mapStateToProps = function (state) { return ({
    "validationMessages": state.form.app ? state.form.app.syncErrors || [] : []
}); };
exports.Autocomplete = react_redux_1.connect(mapStateToProps, null)(AutocompleteComponent);
