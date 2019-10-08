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
var CLASS_FORM_STEPS = 'axa-form-steps';
var CLASS_FORM_STEP = CLASS_FORM_STEPS + "__step";
var CLASS_FORM_STEP_CONTENT = CLASS_FORM_STEP + "__content";
var CLASS_FORM_STEP_PROGRESS = CLASS_FORM_STEP + "__progress";
var CLASS_FORM_STEP_ACTIVE = CLASS_FORM_STEP + "--active";
var CLASS_FORM_STEP_DONE = CLASS_FORM_STEP + "--done";
var CLASS_FORM_STEP_PRICING = CLASS_FORM_STEP + "--pricing";
var CLASS_FORM_STEP_NUMBER = CLASS_FORM_STEP + "__number";
var CLASS_FORM_CY_STEP_ACTIVE = 'cy-active-step';
var FormStep = /** @class */ (function (_super) {
    __extends(FormStep, _super);
    function FormStep() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormStep.prototype.componentDidMount = function () {
        var _a = this.props, current = _a.current, notifyActiveStep = _a.notifyActiveStep, index = _a.index, children = _a.children;
        if (this.isActive(current)) {
            notifyActiveStep(index, children);
        }
    };
    FormStep.prototype.componentWillReceiveProps = function (nextProps) {
        var _a = this.props, current = _a.current, notifyActiveStep = _a.notifyActiveStep, index = _a.index, children = _a.children;
        // Check if the active step changes
        if (current !== nextProps.current && this.isActive(nextProps.current)) {
            notifyActiveStep(index, children);
        }
    };
    FormStep.prototype.getStart = function () {
        var start = this.props.start;
        return start;
    };
    FormStep.prototype.getEnd = function () {
        var _a = this.props, start = _a.start, end = _a.end;
        return end || start;
    };
    FormStep.prototype.getStepClass = function () {
        var _a;
        var _b = this.props, pricing = _b.pricing, current = _b.current;
        return classnames_1.default(CLASS_FORM_STEP, (_a = {},
            _a[CLASS_FORM_STEP_PRICING] = pricing,
            _a[CLASS_FORM_STEP_ACTIVE] = this.isActive(),
            _a[CLASS_FORM_CY_STEP_ACTIVE + "-" + current] = this.isActive(),
            _a[CLASS_FORM_STEP_DONE] = this.isDone(),
            _a));
    };
    FormStep.prototype.getPosition = function () {
        var current = this.props.current;
        var start = this.getStart();
        var end = this.getEnd();
        if ((current >= start) && (current <= end)) {
            var count = (end - start) + 1;
            var currentIndex = (current - start) + 1;
            var pc = (currentIndex / count) * 100;
            var padding = (1.5 / 100) * pc;
            return "calc(" + pc + "% - " + padding + "rem)";
        }
        return "";
    };
    FormStep.prototype.getProgressStyle = function () {
        var pos = this.getPosition();
        return (pos !== "") ? { "width": pos } : {};
    };
    FormStep.prototype.getIconStyle = function () {
        var pos = this.getPosition();
        return (pos !== "") ? { "left": pos } : {};
    };
    FormStep.prototype.isDone = function () {
        var current = this.props.current;
        return (current > this.getEnd());
    };
    FormStep.prototype.isActive = function (currentStep) {
        var current = this.props.current;
        var realCurrent = currentStep || current;
        return ((realCurrent >= this.getStart()) && (realCurrent <= this.getEnd()));
    };
    FormStep.prototype.render = function () {
        var _a = this.props, children = _a.children, index = _a.index;
        return (react_1.default.createElement("div", { className: this.getStepClass() },
            react_1.default.createElement("span", { className: CLASS_FORM_STEP_NUMBER }, index + 1),
            react_1.default.createElement("span", { className: CLASS_FORM_STEP_CONTENT }, children),
            react_1.default.createElement(index_1.Icon, { name: "airplane", style: this.getIconStyle() }),
            react_1.default.createElement("div", { className: CLASS_FORM_STEP_PROGRESS, style: this.getProgressStyle() })));
    };
    return FormStep;
}(react_1.Component));
exports.FormStep = FormStep;
exports.default = FormStep;
