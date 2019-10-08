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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var index_1 = require("../../../index");
var AppField = /** @class */ (function (_super) {
    __extends(AppField, _super);
    function AppField(props) {
        var _this = _super.call(this, props) || this;
        _this.name = '';
        _this.dispatch = index_1.getAppStore().dispatch;
        return _this;
    }
    AppField.prototype.change = function (value, name) {
        var targetName = (typeof name !== "undefined") ? name : this.name;
        this.dispatch(index_1.changeField(targetName, value));
    };
    AppField.prototype.untouch = function (name) {
        var targetName = (typeof name !== "undefined") ? name : this.name;
        this.dispatch(index_1.unTouchField(targetName));
    };
    return AppField;
}(react_1.Component));
exports.AppField = AppField;
