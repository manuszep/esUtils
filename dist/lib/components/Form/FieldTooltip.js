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
var index_1 = require("../../../index");
var FieldTooltip = /** @class */ (function (_super) {
    __extends(FieldTooltip, _super);
    function FieldTooltip(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            "toggled": false
        };
        return _this;
    }
    FieldTooltip.prototype.handleBlur = function (e) {
        e.preventDefault();
        this.setState({
            "toggled": false
        });
    };
    FieldTooltip.prototype.handleClick = function (e) {
        e.preventDefault();
        var toggled = this.state.toggled;
        this.setState({
            "toggled": !toggled
        });
    };
    FieldTooltip.prototype.render = function () {
        var _this = this;
        var help = this.props.help;
        var toggled = this.state.toggled;
        var cls = classnames_1.default("form-group__help-icon", { "toggled": toggled });
        if (typeof help !== 'undefined') {
            return (react_1.default.createElement("div", { className: "form-group__help-wrapper" },
                react_1.default.createElement("a", { href: "#", key: "0", className: cls, tabIndex: -1, onBlur: function (e) { return _this.handleBlur(e); }, onClick: function (e) { return _this.handleClick(e); } },
                    react_1.default.createElement(index_1.Icon, { name: "info-circle" })),
                react_1.default.createElement("div", { key: "1", className: "form-group__help__content" },
                    react_1.default.createElement(index_1.Translation, { tag: "div" }, help))));
        }
        return null;
    };
    return FieldTooltip;
}(react_1.Component));
exports.FieldTooltip = FieldTooltip;
