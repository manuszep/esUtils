"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../index");
exports.GOTO_NEXT_STEP = "GOTO_NEXT_STEP";
exports.GOTO_PREVIOUS_STEP = "GOTO_PREVIOUS_STEP";
exports.GOTO_STEP = "GOTO_STEP";
exports.SUBMIT_STEP = "SUBMIT_STEP";
exports.UNSUBMIT_STEP = "UNSUBMIT_STEP";
exports.VALIDATE_STEP = "VALIDATE_STEP";
exports.ACTIVATE_STEP = "ACTIVATE_STEP";
exports.ACTIVATE_LOADING = "ACTIVATE_LOADING";
exports.DEACTIVATE_LOADING = "DEACTIVATE_LOADING";
exports.SET_BUTTON_STATE = "SET_BUTTON_STATE";
exports.gotoNextStep = function (backbutton) {
    if (backbutton === void 0) { backbutton = false; }
    return {
        "type": exports.GOTO_NEXT_STEP,
        "backbutton": backbutton
    };
};
exports.handleGoToNextStep = function () {
    return function (dispatch, getState) {
        var currentStep = index_1.getStepInNumberFormat(getState().pageState.currentStep);
        if (currentStep > getState().form.app.values.HIGHEST_STEP) {
            dispatch(index_1.changeField("HIGHEST_STEP", currentStep));
            // set the DATA_CHANGED variable to true if it was false and the user goes to a new step
            if (!getState().form.app.values.DATA_CHANGED) {
                dispatch(index_1.changeField("DATA_CHANGED", true));
            }
        }
    };
};
exports.gotoPreviousStep = function (backbutton) {
    if (backbutton === void 0) { backbutton = false; }
    return {
        "type": exports.GOTO_PREVIOUS_STEP,
        "backbutton": backbutton
    };
};
exports.handleGoToPreviousStep = function () {
    return function (dispatch, getState) {
        // do not change the DATA_CHANGED attribute to false
        // if the changed attribute was already set to true
        // and the user is still going backwards.
        if (!(getState().pageState.direction === "backward" && getState().form.app.values.DATA_CHANGED)) {
            dispatch(index_1.changeField("DATA_CHANGED", false));
        }
    };
};
exports.gotoStep = function (stepNumber) {
    return {
        "type": exports.GOTO_STEP,
        stepNumber: stepNumber
    };
};
exports.submitStep = function (stepNumber) {
    return {
        "type": exports.SUBMIT_STEP,
        "stepNumber": stepNumber
    };
};
exports.unsubmitStep = function (stepNumber) {
    return {
        "type": exports.UNSUBMIT_STEP,
        "stepNumber": stepNumber
    };
};
exports.stepIsValid = function (stepNumber, value) {
    return {
        "type": exports.VALIDATE_STEP,
        "step": stepNumber,
        "stepIsValid": value
    };
};
exports.validateStep = function (stepNumber, fieldsToValidate) {
    return function (dispatch, getState) {
        var valid = true;
        fieldsToValidate.forEach(function (field) {
            if (typeof getState().form.app.syncErrors !== "undefined"
                && typeof index_1.deepFind(getState().form.app.syncErrors, field) !== "undefined") {
                valid = false;
                window.console.log("Error validating ", field);
            }
        });
        dispatch(exports.stepIsValid(stepNumber, valid));
    };
};
exports.activateStep = function (stepNumber) {
    return {
        "type": exports.ACTIVATE_STEP,
        "stepNumber": stepNumber
    };
};
exports.continueToNextStep = function (dispatch, callback) {
    return function () {
        dispatch(exports.gotoNextStep());
        if (typeof callback === "function") {
            callback();
        }
    };
};
exports.activateLoading = function () {
    return {
        "type": exports.ACTIVATE_LOADING
    };
};
exports.deactivateLoading = function () {
    return {
        "type": exports.DEACTIVATE_LOADING
    };
};
exports.submitButtonDisabled = function (step, value) {
    return {
        "type": exports.SET_BUTTON_STATE,
        step: step,
        value: value
    };
};
exports.goToNHFFlow = function (reason) {
    return function (dispatch, getState) {
        var lang = getState().pageState.lang;
        window.location.href = index_1.getEndPoints().redirectToNHFUrl.replace("%%lang%%", lang);
    };
};
