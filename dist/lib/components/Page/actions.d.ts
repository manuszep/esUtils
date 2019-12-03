import { Dispatch } from "redux";
import { KeyedObject } from "../../../index";
export declare const ACTIVATE_LOADING = "ACTIVATE_LOADING";
export declare const DEACTIVATE_LOADING = "DEACTIVATE_LOADING";
export declare const SET_BUTTON_STATE = "SET_BUTTON_STATE";
export declare const SUBMIT_STEP = "SUBMIT_STEP";
export declare const UNSUBMIT_STEP = "UNSUBMIT_STEP";
export declare const VALIDATE_STEP = "VALIDATE_STEP";
export declare const ACTIVATE_STEP = "ACTIVATE_STEP";
export declare const activateLoading: () => {
    type: string;
};
export declare const deactivateLoading: () => {
    type: string;
};
export declare const submitButtonDisabled: (step: string, value: boolean) => {
    type: string;
    step: string;
    value: boolean;
};
export declare const submitStep: (stepNumber: string) => {
    type: string;
    stepNumber: string;
};
export declare const unsubmitStep: (stepNumber: string) => {
    type: string;
    stepNumber: string;
};
export declare const setStepSubmitting: (name: string, submitting: boolean) => (dispatch: Dispatch<any>) => void;
export declare const stepIsValid: (stepNumber: string, value: boolean) => {
    type: string;
    step: string;
    stepIsValid: boolean;
};
export declare const validateStep: (stepNumber: string, fieldsToValidate: KeyedObject<any>) => (dispatch: Dispatch<import("redux").AnyAction>, getState: Function) => void;
export declare const activateStep: (stepNumber: string) => {
    type: string;
    stepNumber: string;
};
export declare type handleSubmitStepOptionsType = {
    fieldsToValidate?: [] | Function;
    callbacks?: {
        preSubmit?: () => void;
        postValidate?: (isValid: boolean, callback: Function) => void;
        handleGeneralError?: (response: any, callback: Function) => void;
        saveFlowDeviation?: (response: any) => void;
        handleError?: (response: any, callback: Function) => void;
        preHandlePostStep?: (response: any) => void;
        postHandlePostStep?: (response: any) => void;
    };
};
export declare const handleSubmitStep: (name: string, fieldsToSave: Function | [], options?: handleSubmitStepOptionsType | undefined) => (dispatch: Dispatch<any>, getState: Function) => void;
