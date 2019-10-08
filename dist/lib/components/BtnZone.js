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
var jump_js_1 = __importDefault(require("jump.js"));
var index_1 = require("../../index");
var BtnZoneComponent = /** @class */ (function (_super) {
    __extends(BtnZoneComponent, _super);
    function BtnZoneComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            shouldJump: false
        };
        return _this;
    }
    BtnZoneComponent.prototype.componentDidMount = function () {
        var _a = this.props, step = _a.step, enableButton = _a.enableButton;
        enableButton(step);
    };
    BtnZoneComponent.prototype.componentDidUpdate = function (prevProps) {
        var hasError = this.props.hasError;
        var hasErrorPrev = prevProps.hasErrorPrev;
        if (hasErrorPrev !== hasError
            && hasError
            && this.state.shouldJump
            && document.querySelectorAll('.has-danger').length) {
            this.setState({ shouldJump: false });
            jump_js_1.default(".has-danger", {
                "duration": 200,
                "offset": -90
            });
        }
    };
    BtnZoneComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props, labelPrimary = _a.labelPrimary, labelSecondary = _a.labelSecondary, secondaryAction = _a.secondaryAction, gotoPreviousStep = _a.gotoPreviousStep, submitEvent = _a.submitEvent, remark = _a.remark, saveButton = _a.saveButton, mobileSave = _a.mobileSave, className = _a.className, showModal = _a.showModal, submitButtonDisabledValue = _a.submitButtonDisabledValue, disableButton = _a.disableButton, disabled = _a.disabled, step = _a.step;
        var isDisabled = disabled || submitButtonDisabledValue;
        var localSecondaryAction = (typeof secondaryAction !== 'undefined') ? secondaryAction : gotoPreviousStep;
        var primaryAction = (submitButtonDisabledValue) ? function () { return; } : function (e) {
            disableButton(step);
            submitEvent(e);
        };
        var primaryBtnCls = classnames_1.default("btn btn-lg btn-axa", "cy-next");
        var btnPrimary = (labelPrimary) ? (react_1.default.createElement(index_1.Translation, { id: "btnZonePrimary", tag: "button", className: primaryBtnCls, onClick: function (e) { _this.setState({ shouldJump: true }); primaryAction(e); }, disabled: isDisabled }, labelPrimary)) : null;
        var btnPrimaryMobile = (labelPrimary) ? (react_1.default.createElement(index_1.Translation, { id: "btnZonePrimaryMobile", tag: "button", className: "btn btn-lg btn-axa", onClick: primaryAction, disabled: isDisabled }, labelPrimary)) : null;
        var btnSecondary = (labelSecondary) ? (react_1.default.createElement(index_1.Translation, { id: "btnZoneSecondary", tag: "button", className: "btn btn-lg btn-ghost", onClick: function () { return localSecondaryAction(); } }, labelSecondary)) : null;
        var btnSave = (react_1.default.createElement("button", { type: "button", className: "btn btn-lg btn-ghost", onClick: function () { return showModal("ModalSaveForLaterContainer"); } },
            react_1.default.createElement(index_1.Translation, { tag: "span" }, "BUTTON_SAVE_FOR_LATER")));
        var remarkTag = (remark)
            ? react_1.default.createElement(index_1.Translation, { tag: "p", className: "text-center block-center" }, remark)
            : null;
        var cls = classnames_1.default("form-group btn-zone", className);
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("div", { className: cls },
                remarkTag,
                react_1.default.createElement("div", { className: "btn-zone__desktop hidden-md-down" },
                    btnSecondary,
                    saveButton && btnSave,
                    btnPrimary),
                react_1.default.createElement("div", { className: "btn-zone__mobile hidden-lg-up" },
                    btnPrimaryMobile,
                    mobileSave && btnSave,
                    btnSecondary))));
    };
    return BtnZoneComponent;
}(react_1.Component));
// Map Redux store to component props
var mapStateToProps = function (state, props) {
    var hasError = (typeof props.step !== "undefined" && props.step !== "") ? state.pageState.stepStates[props.step].stepSubmitted && !state.pageState.stepStates[props.step].stepIsValid : false;
    return {
        "currentStep": state.pageState.currentStep,
        "direction": state.pageState.direction,
        "hasError": hasError,
        "submitButtonDisabledValue": state.pageState.stepStates[props.step].submitButtonDisabled
    };
};
// map Redux dispatch events to component props
var mapDispatchToProps = function (dispatch) { return ({
    "gotoPreviousStep": function () {
        dispatch(index_1.handleGoToPreviousStep());
        dispatch(index_1.gotoPreviousStep());
    },
    "gotoStep": function (stepNumber) { return dispatch(index_1.gotoStep(stepNumber)); },
    "showModal": function (modalID) { return dispatch(index_1.showModal(modalID)); },
    "disableButton": function (step) { return dispatch(index_1.submitButtonDisabled(step, true)); },
    "enableButton": function (step) { return dispatch(index_1.submitButtonDisabled(step, false)); }
}); };
exports.BtnZone = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(BtnZoneComponent);
