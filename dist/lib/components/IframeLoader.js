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
var index_1 = require("../../index");
var IframeLoader = /** @class */ (function (_super) {
    __extends(IframeLoader, _super);
    function IframeLoader(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { "loaded": false };
        _this.handleLoaded = _this.handleLoaded.bind(_this);
        return _this;
    }
    IframeLoader.prototype.handleLoaded = function () {
        this.setState({ "loaded": true });
    };
    IframeLoader.prototype.render = function () {
        var _a = this.props, title = _a.title, className = _a.className, subRef = _a.subRef, src = _a.src, loadingText = _a.loadingText;
        var loaded = this.state.loaded;
        var loaderCls = classnames_1.default("iframe-loader", { "iframe-loader--loaded": loaded });
        return (react_1.default.createElement("div", { className: loaderCls },
            react_1.default.createElement("iframe", { title: title, className: className, ref: function (f) { return subRef(f); }, src: src, onLoad: this.handleLoaded }),
            react_1.default.createElement("div", { className: "dimmer iframe-loader__spinner" },
                react_1.default.createElement("div", { className: "loading-spinner is-active" },
                    react_1.default.createElement("div", { className: "loading-spinner-animation" }),
                    react_1.default.createElement(index_1.Translation, { className: "loading-spinner-caption" }, loadingText)))));
    };
    return IframeLoader;
}(react_1.Component));
exports.IframeLoader = IframeLoader;
