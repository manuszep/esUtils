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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var index_1 = require("../../../index");
/**
 * This is a simple wrapper to inject HTML translated content in JSX.
 */
var TranslationComponent = /** @class */ (function (_super) {
    __extends(TranslationComponent, _super);
    function TranslationComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TranslationComponent.prototype.getLabelValue = function (noprefix) {
        if (noprefix === void 0) { noprefix = true; }
        var _a = this.props, children = _a.children, labels = _a.labels;
        var currentLabels = labels || {};
        return index_1.getTranslationFromLabelDictionary(children, currentLabels, noprefix);
    };
    TranslationComponent.prototype.render = function () {
        var _a = this.props, tag = _a.tag, children = _a.children, labels = _a.labels, replacements = _a.replacements, noprefix = _a.noprefix, dispatch = _a.dispatch, rest = __rest(_a, ["tag", "children", "labels", "replacements", "noprefix", "dispatch"]);
        var noPrefixValue = typeof noprefix !== "undefined" && noprefix !== false;
        var currentReplacements = replacements || {};
        var translatedString = index_1.parseStringTemplate(this.getLabelValue(noPrefixValue), currentReplacements);
        var CustomTag = (typeof tag !== "undefined") ? tag : "span";
        return (react_1.default.createElement(CustomTag, __assign({ dangerouslySetInnerHTML: { "__html": translatedString } }, rest)));
    };
    return TranslationComponent;
}(react_1.Component));
var mapStateToProps = function (state) { return ({
    "labels": state.translation.labels
}); };
exports.Translation = react_redux_1.connect(mapStateToProps, null)(TranslationComponent);
exports.default = exports.Translation;
