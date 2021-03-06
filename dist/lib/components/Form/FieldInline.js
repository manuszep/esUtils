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
var FieldInline = /** @class */ (function (_super) {
    __extends(FieldInline, _super);
    function FieldInline() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldInline.prototype.render = function () {
        var _a = this.props, className = _a.className, sizeXs = _a.sizeXs, sizeSm = _a.sizeSm, sizeMd = _a.sizeMd, sizeLg = _a.sizeLg, sizeXl = _a.sizeXl, rest = __rest(_a, ["className", "sizeXs", "sizeSm", "sizeMd", "sizeLg", "sizeXl"]);
        var baseFieldClass = "form-control";
        var sizeXsCls = (typeof sizeXs !== "undefined" && sizeXs !== "") ? "col-" + sizeXs : "";
        var sizeSmCls = (typeof sizeSm !== "undefined" && sizeSm !== "") ? "col-sm-" + sizeSm : "";
        var sizeMdCls = (typeof sizeMd !== "undefined" && sizeMd !== "") ? "col-md-" + sizeMd : "";
        var sizeLgCls = (typeof sizeLg !== "undefined" && sizeLg !== "") ? "col-lg-" + sizeLg : "";
        var sizeXlCls = (typeof sizeXl !== "undefined" && sizeXl !== "") ? "col-xl-" + sizeXl : "";
        var groupCls = classnames_1.default(sizeXsCls, sizeSmCls, sizeMdCls, sizeLgCls, sizeXlCls, {
            "col": sizeXsCls === "" && sizeSmCls === "" && sizeMd === "" && sizeLg === "" && sizeXlCls === ""
        }, "form-compact-row__col");
        var inputCls = classnames_1.default(baseFieldClass, "", className);
        return (react_1.default.createElement("div", { className: groupCls },
            react_1.default.createElement(index_1.Field, __assign({ className: inputCls }, rest))));
    };
    return FieldInline;
}(react_1.Component));
exports.FieldInline = FieldInline;
