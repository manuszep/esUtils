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
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var classnames_1 = __importDefault(require("classnames"));
var index_1 = require("../../../../index");
// How To use:
// <Field tag="radio" label="Radio1" name="FLD_TEST_RADIO" optionValue="0" />
// <Field tag="radio" label="Radio2" name="FLD_TEST_RADIO" optionValue="1"/>
var RadioComponent = /** @class */ (function (_super) {
    __extends(RadioComponent, _super);
    function RadioComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RadioComponent.prototype.render = function () {
        var _a = this.props, label = _a.label, onClick = _a.onClick, fldValue = _a.fldValue, optionValue = _a.optionValue, customClass = _a.customClass, onChange = _a.onChange, noprefix = _a.noprefix;
        var radioClassName = classnames_1.default("custom-control-description", customClass);
        // due to the change to replace special characters from values the value is stored as a string instead of an int.
        // this is why we ensure the value is always converted to a string
        var strOptionValue = "" + optionValue;
        return (react_1.default.createElement("label", { className: "custom-control custom-radio" },
            react_1.default.createElement("input", { type: "radio", className: "custom-control-input", onChange: function (event) {
                    if (typeof onChange === "function") {
                        onChange(event);
                    }
                }, onClick: onClick, value: strOptionValue, checked: fldValue === strOptionValue }),
            react_1.default.createElement("span", { className: "custom-control-indicator" }),
            react_1.default.createElement(index_1.Translation, { className: radioClassName, noprefix: noprefix }, label)));
    };
    return RadioComponent;
}(react_1.Component));
var mapStateToProps = function (state, ownProps) { return ({
    "fldValue": state.form.app.values["" + ownProps.name]
}); };
exports.Radio = react_redux_1.connect(mapStateToProps)(RadioComponent);
