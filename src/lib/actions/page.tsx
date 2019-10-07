import { Dispatch } from "redux";

import {
  getStepInNumberFormat,
  getEndPoints,
  changeField,
  deepFind,
  KeyedObject
} from "../../index";

export const GOTO_NEXT_STEP = "GOTO_NEXT_STEP";
export const GOTO_PREVIOUS_STEP = "GOTO_PREVIOUS_STEP";
export const GOTO_STEP = "GOTO_STEP";
export const SUBMIT_STEP = "SUBMIT_STEP";
export const UNSUBMIT_STEP = "UNSUBMIT_STEP";
export const VALIDATE_STEP = "VALIDATE_STEP";
export const ACTIVATE_STEP = "ACTIVATE_STEP";
export const ACTIVATE_LOADING = "ACTIVATE_LOADING";
export const DEACTIVATE_LOADING = "DEACTIVATE_LOADING";
export const SET_BUTTON_STATE = "SET_BUTTON_STATE";

export const gotoNextStep = (backbutton = false): {type: string, backbutton: boolean} => {
  return {
    "type": GOTO_NEXT_STEP,
    "backbutton": backbutton
  };
};

export const handleGoToNextStep = () => {
  return (dispatch: Dispatch, getState: Function) => {
    const currentStep = getStepInNumberFormat(getState().pageState.currentStep);
    if (currentStep > getState().form.app.values.HIGHEST_STEP) {
      dispatch(changeField("HIGHEST_STEP", currentStep));
      // set the DATA_CHANGED variable to true if it was false and the user goes to a new step
      if (!getState().form.app.values.DATA_CHANGED) {
        dispatch(changeField("DATA_CHANGED", true));
      }
    }
  };
};

export const gotoPreviousStep = (backbutton = false): {type: string, backbutton: boolean} => {
  return {
    "type": GOTO_PREVIOUS_STEP,
    "backbutton": backbutton
  };
};

export const handleGoToPreviousStep = () => {
  return (dispatch: Dispatch, getState: Function) => {
    // do not change the DATA_CHANGED attribute to false
    // if the changed attribute was already set to true
    // and the user is still going backwards.
    if (!(getState().pageState.direction === "backward" && getState().form.app.values.DATA_CHANGED)) {
      dispatch(changeField("DATA_CHANGED", false));
    }
  };
};

export const gotoStep = (stepNumber: string): {type: string, stepNumber: string} => {
  return {
    "type": GOTO_STEP,
    stepNumber
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

export const continueToNextStep = (dispatch: Dispatch, callback?: Function): Function => {
  return function () {
    dispatch(gotoNextStep());

    if (typeof callback === "function") {
      callback();
    }
  };
};

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

export const goToNHFFlow = (reason: any) => {
  return (dispatch: Dispatch, getState: Function) => {
    const lang = getState().pageState.lang;
    window.location.href = getEndPoints().redirectToNHFUrl.replace("%%lang%%", lang);
  };
};
