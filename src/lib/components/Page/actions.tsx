import React from "react";
import { Dispatch } from "redux";
import axios from "axios/index";

import {
  Translation as T,
  getStepInNumberFormat,
  getEndPoints,
  changeField,
  deepFind,
  KeyedObject,
  showModal,
  saveState
} from "../../../index";

export const ACTIVATE_LOADING = "ACTIVATE_LOADING";
export const DEACTIVATE_LOADING = "DEACTIVATE_LOADING";
export const SET_BUTTON_STATE = "SET_BUTTON_STATE";
export const SUBMIT_STEP = "SUBMIT_STEP";
export const UNSUBMIT_STEP = "UNSUBMIT_STEP";
export const VALIDATE_STEP = "VALIDATE_STEP";
export const ACTIVATE_STEP = "ACTIVATE_STEP";

export const activateLoading = (): {type: string} => {
  return {
    "type": ACTIVATE_LOADING
  };
};

export const deactivateLoading = (): {type: string} => {
  return {
    "type": DEACTIVATE_LOADING
  };
};

export const submitButtonDisabled = (step: string, value: boolean): {type: string, step: string, value: boolean} => {
  return {
    "type": SET_BUTTON_STATE,
    step,
    value
  };
};

export const submitStep = (stepNumber: string): {type: string, stepNumber: string} => {
  return {
    "type": SUBMIT_STEP,
    "stepNumber": stepNumber
  };
};

export const unsubmitStep = (stepNumber: string): {type: string, stepNumber: string} => {
  return {
    "type": UNSUBMIT_STEP,
    "stepNumber": stepNumber
  };
};

export const setStepSubmitting = (name: string, submitting: true|false) => {
  return (dispatch: Dispatch<any>) => {
    const loadingMethod = submitting ? activateLoading : deactivateLoading;
    dispatch(loadingMethod());
    dispatch(submitButtonDisabled(name, submitting));
  };
};

export const stepIsValid = (stepNumber: string, value: boolean): {type: string, step: string, stepIsValid: boolean} => {
  return {
    "type": VALIDATE_STEP,
    "step": stepNumber,
    "stepIsValid": value
  };
};

export const validateStep = (stepNumber: string, fieldsToValidate: KeyedObject) => {
  return (dispatch: Dispatch, getState: Function) => {
    let valid = true;
    fieldsToValidate.forEach((field: any) => {
      if (
        typeof getState().form.app.syncErrors !== "undefined"
        && typeof deepFind(getState().form.app.syncErrors, field) !== "undefined"
      ) {
        valid = false;
        window.console.log("Error validating ", field);
      }
    });

    dispatch(stepIsValid(stepNumber, valid));
  };
};

export const activateStep = (stepNumber: string): {type: string, stepNumber: string} => {
  return {
    "type": ACTIVATE_STEP,
    "stepNumber": stepNumber
  };
};

export type handleSubmitStepOptionsType = {
  fieldsToValidate?: []|Function,
  callbacks?: {
    preSubmit?: () => void,
    postValidate?: (isValid: boolean, callback: Function) => void,
    handleGeneralError?: (response: any, callback: Function) => void,
    saveFlowDeviation?: (response: any) => void,
    handleError?: (response: any, callback: Function) => void,
    preHandlePostStep?: (response: any) => void,
    postHandlePostStep?: (response: any) => void
  }
};

function hasKey<O>(obj: O, key: keyof any): key is keyof O {
  return key in obj
}

const executeOptionsCallback = (options: handleSubmitStepOptionsType | undefined, name: string, ...args: any[]): boolean => {
  if (options && options.callbacks && hasKey(options.callbacks, name)) {
    (options.callbacks[name] as Function)(...args);
    return true;
  }
  return false;
}

export const handleSubmitStep = (name: string, fieldsToSave: []|Function, options?: handleSubmitStepOptionsType) => {
  return (dispatch: Dispatch<any>, getState: Function) => {
    const stepEndpointName = `submit${name}`;
    const fieldsToSaveList = (typeof fieldsToSave === "function") ? fieldsToSave() : fieldsToSave;
    let fieldsToValidateList;
    let stepIsValid = true;

    // Set screen loading state
    dispatch(setStepSubmitting(name, true));

    // Execute preSubmit callback
    executeOptionsCallback(options, "preSubmit");

    // Get list of fields to validate
    if (options && options.fieldsToValidate) {
      fieldsToValidateList = (typeof options.fieldsToValidate === "function") ? options.fieldsToValidate() : options.fieldsToValidate;
    } else {
      fieldsToValidateList = fieldsToSaveList;
    }

    // Set StepSubmitted to true
    dispatch(submitStep(name));

    // Validate fields
    dispatch(validateStep(name, fieldsToValidateList));

    // Check if step is valid
    stepIsValid = getState().pageState.stepStates[`${name}`].stepIsValid;

    // Execute post-validation callback with validation state and callback method to remove loading state
    const hasPostValidationCallback = executeOptionsCallback(options, "postValidate", stepIsValid, () => dispatch(setStepSubmitting(name, false)));
    if (!stepIsValid && !hasPostValidationCallback) {
      // If there's no callback and the step is invalid we disable loading directly
      dispatch(setStepSubmitting(name, false));
    }

    // If step is invalid, stop execution
    if (!stepIsValid) return;

    // Setup HIGHEST_STEP and DATA_CHANGED fields
    const currentStep = getStepInNumberFormat(getState().pageState.currentStep);

    if (currentStep > getState().form.app.values.HIGHEST_STEP) {
      dispatch(changeField("HIGHEST_STEP", currentStep));

      if (!getState().form.app.values.DATA_CHANGED) {
        dispatch(changeField("DATA_CHANGED", true));
      }
    }

    // Send data to server
    axios.post(`${getEndPoints()[stepEndpointName]}&v=${(new Date()).valueOf()}`, fieldsToSave)
      .then((response) => {
        if (response.data.validation || response.data.generalError) {
          // General error use case
          // Execute handleGeneralError callback
          const hasHandleGeneralErrorCallback = executeOptionsCallback(options, "handleGeneralError", response, () => dispatch(setStepSubmitting(name, false)));
          // Show general error modal and disable loading
          if (!hasHandleGeneralErrorCallback) {
            dispatch(showModal("ModalGeneralError", {
              "body": response.data.servicekey
                ? (<T>{`GEN_ERR_${response.data.servicekey}`}</T>)
                : (<T>GEN_ERR</T>),
              "afterCloseAction": () => dispatch(setStepSubmitting(name, false))
            }));
          }
        } else if (response.data.errors !== undefined && response.data.errors.length) {
          // Other error use case
          // Execute saveFlowDeviation callback
          executeOptionsCallback(options, "saveFlowDeviation", response, () => dispatch(setStepSubmitting(name, false)));

          // Execute handleError callback
          const hasHandleErrorCallback = executeOptionsCallback(options, "handleError", response, () => dispatch(setStepSubmitting(name, false)));
          if (!hasHandleErrorCallback) {
            // Show error modal and disable loading
            const firstError = response.data.errors[0];
            dispatch(showModal({
              "title": <T>{`ERROR_${firstError}_TITLE`}</T>,
              "body": <T>{`ERROR_${firstError}_BODY`}</T>,
              "closeLabel": <T>ERROR_CLOSE</T>
            }));
          }
        } else {
          // Normal response use case
          // Execute preHandlePostStep callback
          executeOptionsCallback(options, "preHandlePostStep", response);

          dispatch(activateStep(name));
          saveState(getState);
          dispatch(setStepSubmitting(name, false));

          // Execute postHandlePostStep callback
          executeOptionsCallback(options, "postHandlePostStep", response);
        }
      }).catch((err) => {
        window.console.log(err);
        dispatch(deactivateLoading());
        dispatch(submitButtonDisabled(name, false));
        return err;
      });
  };
};
