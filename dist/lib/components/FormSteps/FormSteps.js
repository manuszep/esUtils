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
var FormStep_1 = require("./FormStep");
var CLASS_FORM_STEPS = 'axa-form-steps';
var CLASS_FORM_STEPS_LABEL = CLASS_FORM_STEPS + "__label";
var CLASS_FORM_STEPS_WRAPPER = CLASS_FORM_STEPS + "__wrapper";
var FormSteps = /** @class */ (function (_super) {
    __extends(FormSteps, _super);
    function FormSteps(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            "shownStep": 0,
            "activeStep": 0
        };
        return _this;
    }
    FormSteps.prototype.componentWillReceiveProps = function (nextProps) {
        var current = this.props.current;
        var nextCurrent = nextProps.current;
        var activeStep = this.state.activeStep;
        // Check if the active step changes
        if (current !== nextCurrent) {
            this.setState({
                "shownStep": activeStep
            });
        }
    };
    FormSteps.prototype.getSteps = function () {
        var _this = this;
        var steps = this.props.steps;
        return steps.map(function (step, i) {
            return _this.getStepElement(step, i);
        });
    };
    FormSteps.prototype.getStepElement = function (step, i) {
        var _this = this;
        var title = step.title, start = step.start, end = step.end, pricing = step.pricing, label = step.label;
        var current = this.props.current;
        return (react_1.default.createElement(FormStep_1.FormStep, { start: start, end: end, label: label, pricing: pricing, current: current, index: i, key: i, notifyActiveStep: function (index, text) { return _this.setActiveStep(index); } }, title));
    };
    FormSteps.prototype.setActiveStep = function (i) {
        this.setState({
            "shownStep": i,
            "activeStep": i
        });
    };
    FormSteps.prototype.handlePreviousClick = function (e) {
        e.preventDefault();
        var shownStep = this.state.shownStep;
        this.setState({
            "shownStep": shownStep - 1
        });
    };
    FormSteps.prototype.isPreviousDisabled = function () {
        var shownStep = this.state.shownStep;
        return shownStep === 0;
    };
    FormSteps.prototype.handleNextClick = function (e) {
        e.preventDefault();
        var shownStep = this.props.shownStep;
        this.setState({
            "shownStep": shownStep + 1
        });
    };
    FormSteps.prototype.isNextDisabled = function () {
        var shownStep = this.state.shownStep;
        var steps = this.props.steps;
        return shownStep === steps.length - 1;
    };
    FormSteps.prototype.render = function () {
        var currentLabel = this.props.currentLabel;
        return (react_1.default.createElement("div", { className: CLASS_FORM_STEPS },
            react_1.default.createElement("div", { className: CLASS_FORM_STEPS_WRAPPER },
                react_1.default.createElement("div", { className: CLASS_FORM_STEPS_LABEL }, currentLabel),
                this.getSteps())));
    };
    return FormSteps;
}(react_1.Component));
exports.FormSteps = FormSteps;
exports.default = FormSteps;
