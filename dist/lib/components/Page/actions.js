"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var index_1 = __importDefault(require("axios/index"));
var index_2 = require("../../../index");
exports.ACTIVATE_LOADING = "ACTIVATE_LOADING";
exports.DEACTIVATE_LOADING = "DEACTIVATE_LOADING";
exports.SET_BUTTON_STATE = "SET_BUTTON_STATE";
exports.SUBMIT_STEP = "SUBMIT_STEP";
exports.UNSUBMIT_STEP = "UNSUBMIT_STEP";
exports.VALIDATE_STEP = "VALIDATE_STEP";
exports.ACTIVATE_STEP = "ACTIVATE_STEP";
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
exports.setStepSubmitting = function (name, submitting) {
    return function (dispatch) {
        var loadingMethod = submitting ? exports.activateLoading : exports.deactivateLoading;
        dispatch(loadingMethod());
        dispatch(exports.submitButtonDisabled(name, submitting));
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
                && typeof index_2.deepFind(getState().form.app.syncErrors, field) !== "undefined") {
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
function hasKey(obj, key) {
    return key in obj;
}
var executeOptionsCallback = function (options, name) {
    var _a;
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    if (options && options.callbacks && hasKey(options.callbacks, name)) {
        (_a = options.callbacks)[name].apply(_a, args);
        return true;
    }
    return false;
};
exports.handleSubmitStep = function (name, fieldsToSave, options) {
    return function (dispatch, getState) {
        var stepEndpointName = "submit" + name;
        var fieldsToSaveList = (typeof fieldsToSave === "function") ? fieldsToSave() : fieldsToSave;
        var fieldsToValidateList;
        var stepIsValid = true;
        // Set screen loading state
        dispatch(exports.setStepSubmitting(name, true));
        // Execute preSubmit callback
        executeOptionsCallback(options, "preSubmit");
        // Get list of fields to validate
        if (options && options.fieldsToValidate) {
            fieldsToValidateList = (typeof options.fieldsToValidate === "function") ? options.fieldsToValidate() : options.fieldsToValidate;
        }
        else {
            fieldsToValidateList = fieldsToSaveList;
        }
        // Set StepSubmitted to true
        dispatch(exports.submitStep(name));
        // Validate fields
        dispatch(exports.validateStep(name, fieldsToValidateList));
        // Check if step is valid
        stepIsValid = getState().pageState.stepStates["" + name].stepIsValid;
        // Execute post-validation callback with validation state and callback method to remove loading state
        var hasPostValidationCallback = executeOptionsCallback(options, "postValidate", stepIsValid, function () { return dispatch(exports.setStepSubmitting(name, false)); });
        if (!stepIsValid && !hasPostValidationCallback) {
            // If there's no callback and the step is invalid we disable loading directly
            dispatch(exports.setStepSubmitting(name, false));
        }
        // If step is invalid, stop execution
        if (!stepIsValid)
            return;
        // Setup HIGHEST_STEP and DATA_CHANGED fields
        var currentStep = index_2.getStepInNumberFormat(getState().pageState.currentStep);
        if (currentStep > getState().form.app.values.HIGHEST_STEP) {
            dispatch(index_2.changeField("HIGHEST_STEP", currentStep));
            if (!getState().form.app.values.DATA_CHANGED) {
                dispatch(index_2.changeField("DATA_CHANGED", true));
            }
        }
        // Send data to server
        index_1.default.post(index_2.getEndPoints()[stepEndpointName] + "&v=" + (new Date()).valueOf(), fieldsToSave)
            .then(function (response) {
            if (response.data.validation || response.data.generalError) {
                // General error use case
                // Execute handleGeneralError callback
                var hasHandleGeneralErrorCallback = executeOptionsCallback(options, "handleGeneralError", response, function () { return dispatch(exports.setStepSubmitting(name, false)); });
                // Show general error modal and disable loading
                if (!hasHandleGeneralErrorCallback) {
                    dispatch(index_2.showModal("ModalGeneralError", {
                        "body": response.data.servicekey
                            ? (react_1.default.createElement(index_2.Translation, null, "GEN_ERR_" + response.data.servicekey))
                            : (react_1.default.createElement(index_2.Translation, null, "GEN_ERR")),
                        "afterCloseAction": function () { return dispatch(exports.setStepSubmitting(name, false)); }
                    }));
                }
            }
            else if (response.data.errors !== undefined && response.data.errors.length) {
                // Other error use case
                // Execute saveFlowDeviation callback
                executeOptionsCallback(options, "saveFlowDeviation", response, function () { return dispatch(exports.setStepSubmitting(name, false)); });
                // Execute handleError callback
                var hasHandleErrorCallback = executeOptionsCallback(options, "handleError", response, function () { return dispatch(exports.setStepSubmitting(name, false)); });
                if (!hasHandleErrorCallback) {
                    // Show error modal and disable loading
                    var firstError = response.data.errors[0];
                    dispatch(index_2.showModal({
                        "title": react_1.default.createElement(index_2.Translation, null, "ERROR_" + firstError + "_TITLE"),
                        "body": react_1.default.createElement(index_2.Translation, null, "ERROR_" + firstError + "_BODY"),
                        "closeLabel": react_1.default.createElement(index_2.Translation, null, "ERROR_CLOSE")
                    }));
                }
            }
            else {
                // Normal response use case
                // Execute preHandlePostStep callback
                executeOptionsCallback(options, "preHandlePostStep", response);
                dispatch(exports.activateStep(name));
                index_2.saveState(getState);
                dispatch(exports.setStepSubmitting(name, false));
                // Execute postHandlePostStep callback
                executeOptionsCallback(options, "postHandlePostStep", response);
            }
        }).catch(function (err) {
            window.console.log(err);
            dispatch(exports.deactivateLoading());
            dispatch(exports.submitButtonDisabled(name, false));
            return err;
        });
    };
};
