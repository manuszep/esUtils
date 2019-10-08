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
var index_1 = require("../../index");
var EditableValueComponent = /** @class */ (function (_super) {
    __extends(EditableValueComponent, _super);
    function EditableValueComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditableValueComponent.prototype.render = function () {
        var _a = this.props, children = _a.children, step = _a.step, cls = _a.cls, gotoStep = _a.gotoStep, _b = _a.withSpaces, withSpaces = _b === void 0 ? true : _b, translate = _a.translate;
        var iconCls = withSpaces ? "icon-with-spaces" : undefined;
        var translateValue = typeof translate !== "undefined";
        return (react_1.default.createElement("span", { className: cls || "value" },
            react_1.default.createElement(index_1.Translation, { tag: "span", noprefix: !translateValue }, children),
            react_1.default.createElement("small", { className: "text-nowrap" },
                react_1.default.createElement("a", { href: "#", onClick: function () { return gotoStep(step); }, className: "edit-link" },
                    react_1.default.createElement(index_1.Icon, { name: "edit", tag: "span", className: iconCls }),
                    react_1.default.createElement(index_1.Translation, { tag: "span", className: "edit-link__text" }, "CHANGE_VALUE_LINK")))));
    };
    return EditableValueComponent;
}(react_1.Component));
var mapDispatchToProps = function (dispatch) { return ({
    "gotoStep": function (step) {
        dispatch(index_1.gotoStep(step));
    }
}); };
exports.EditableValue = react_redux_1.connect(null, mapDispatchToProps)(EditableValueComponent);
