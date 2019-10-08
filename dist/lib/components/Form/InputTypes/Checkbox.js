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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var index_1 = require("../../../../index");
var CheckBoxComponent = /** @class */ (function (_super) {
    __extends(CheckBoxComponent, _super);
    function CheckBoxComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckBoxComponent.prototype.render = function () {
        var _a = this.props, valueOn = _a.valueOn, valueOff = _a.valueOff, label = _a.label, name = _a.name, fldValue = _a.fldValue, replacements = _a.replacements, children = _a.children, onChange = _a.onChange, changeField = _a.changeField, onClick = _a.onClick, noprefix = _a.noprefix;
        var _valueOn = valueOn || "1";
        var _valueOff = valueOff || "0";
        return (react_1.default.createElement("label", { className: "custom-control custom-checkbox" },
            react_1.default.createElement("input", { type: "checkbox", className: "custom-control-input", name: name, onClick: onClick, checked: fldValue === _valueOn || fldValue === true, onChange: function (event) {
                    changeField(name, fldValue === "1" ? _valueOff : _valueOn);
                    if (typeof onChange === "function") {
                        onChange(event, fldValue);
                    }
                } }),
            react_1.default.createElement("span", { className: "custom-control-indicator" }),
            react_1.default.createElement(index_1.Translation, { className: "custom-control-description", replacements: replacements, noprefix: noprefix }, label),
            children));
    };
    return CheckBoxComponent;
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
exports.CheckBox = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CheckBoxComponent);
