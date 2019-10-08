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
var react_redux_1 = require("react-redux");
var react_1 = __importStar(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var index_1 = require("../../../../index");
var ToggleComponent = /** @class */ (function (_super) {
    __extends(ToggleComponent, _super);
    function ToggleComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToggleComponent.prototype.render = function () {
        var _a = this.props, labelOn = _a.labelOn, labelOff = _a.labelOff, valueOn = _a.valueOn, valueOff = _a.valueOff, name = _a.name, onClick = _a.onClick, fldValue = _a.fldValue, children = _a.children, label = _a.label, replacements = _a.replacements, small = _a.small, customClass = _a.customClass, changeField = _a.changeField, onChange = _a.onChange;
        var _labelOn = labelOn || "LABEL_YES";
        var _labelOff = labelOff || "LABEL_NO";
        var _valueOn = valueOn || "1";
        var _valueOff = valueOff || "0";
        var cls = classnames_1.default("axa-toggle", { "axa-toggle--small": small });
        var toggleClass = classnames_1.default("axa-toggle__indicator", customClass);
        return (react_1.default.createElement("label", { className: cls },
            react_1.default.createElement("div", { className: "axa-toggle__control cy-toggle" },
                react_1.default.createElement("input", { type: "checkbox", className: "axa-toggle__input", name: name, onClick: function (event) { return onClick(event, fldValue); }, checked: fldValue === _valueOn || fldValue === true, onChange: function (event) {
                        changeField(name, fldValue === "1" ? _valueOff : _valueOn);
                        if (typeof onChange === "function") {
                            onChange(event, fldValue);
                        }
                    } }),
                react_1.default.createElement("span", { className: toggleClass }),
                react_1.default.createElement(index_1.Translation, { tag: "span", className: "axa-toggle__label-on" }, _labelOn),
                react_1.default.createElement(index_1.Translation, { tag: "span", className: "axa-toggle__label-off" }, _labelOff)),
            label && react_1.default.createElement(index_1.Translation, { className: "custom-control-description", replacements: replacements }, label),
            children));
    };
    return ToggleComponent;
}(react_1.Component));
var mapStateToProps = function (state, ownProps) {
    var commonItems = {};
    var appItems = {
        "fldValue": ownProps.name
    };
    return index_1.wrapMapStateToProps(state, commonItems, appItems);
};
var mapDispatchToProps = function (dispatch) { return ({
    "changeField": function (name, value) {
        dispatch(index_1.changeField(name, value));
    }
}); };
exports.Toggle = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ToggleComponent);
