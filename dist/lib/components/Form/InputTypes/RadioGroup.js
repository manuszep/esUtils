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
var classnames_1 = __importDefault(require("classnames"));
var index_1 = require("../../../../index");
// Wrap the component in a dynamic ReduxField.
var RadioGroup = /** @class */ (function (_super) {
    __extends(RadioGroup, _super);
    function RadioGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RadioGroup.prototype.getIcon = function (item) {
        if (typeof item.icon !== 'undefined') {
            return react_1.default.createElement(index_1.Icon, { name: item.icon });
        }
        return null;
    };
    RadioGroup.prototype.handleChange = function (e, onChange) {
        var t = e.currentTarget;
        t.blur();
        if (onChange) {
            onChange(e);
        }
    };
    RadioGroup.prototype.renderRadios = function () {
        var _this = this;
        // As this component is used by a ReduxField, some properties went into the input key
        var _a = this.props, items = _a.items, value = _a.value, onChange = _a.onChange, onBlur = _a.onBlur, name = _a.name, mode = _a.mode, size = _a.size, noprefix = _a.noprefix;
        var sizeClass = size.split(" ").map(function (cls) { return "custom-radio--" + cls; }).join(" ");
        var counter = 0;
        var clsExt = typeof size !== "undefined" ? sizeClass : null;
        // Loop over each item to generate as many inputs as there are items
        return items.map(function (item, key) {
            var checked = item.value === value;
            var cls = classnames_1.default("custom-control custom-radio", { "radio1": mode !== "standard" }, "cy-options-" + name, clsExt);
            var labelClass = classnames_1.default("custom-control-description", "cy-option-" + counter, "cy-attribute-" + item.value, "radio-buttons-responsive");
            var uniqueId = "name" + key;
            counter += 1;
            return (react_1.default.createElement("label", { key: uniqueId, className: cls },
                react_1.default.createElement("input", { type: "radio", className: "custom-control-input", name: name, value: item.value, checked: checked, onChange: function (e) { return _this.handleChange(e, onChange); }, onBlur: onBlur }),
                react_1.default.createElement("span", { className: "custom-control-indicator" }),
                react_1.default.createElement("span", { className: labelClass },
                    _this.getIcon(item),
                    react_1.default.createElement(index_1.Translation, { noprefix: noprefix }, item.label))));
        });
    };
    RadioGroup.prototype.render = function () {
        return (react_1.default.createElement("div", { className: "radio-buttons-wrapper" }, this.renderRadios()));
    };
    return RadioGroup;
}(react_1.Component));
exports.RadioGroup = RadioGroup;
