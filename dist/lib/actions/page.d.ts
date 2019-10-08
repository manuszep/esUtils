import { Dispatch } from "redux";
import { KeyedObject } from "../../index";
export declare const GOTO_NEXT_STEP = "GOTO_NEXT_STEP";
export declare const GOTO_PREVIOUS_STEP = "GOTO_PREVIOUS_STEP";
export declare const GOTO_STEP = "GOTO_STEP";
export declare const SUBMIT_STEP = "SUBMIT_STEP";
export declare const UNSUBMIT_STEP = "UNSUBMIT_STEP";
export declare const VALIDATE_STEP = "VALIDATE_STEP";
export declare const ACTIVATE_STEP = "ACTIVATE_STEP";
export declare const ACTIVATE_LOADING = "ACTIVATE_LOADING";
export declare const DEACTIVATE_LOADING = "DEACTIVATE_LOADING";
export declare const SET_BUTTON_STATE = "SET_BUTTON_STATE";
export declare const gotoNextStep: (backbutton?: boolean) => {
    type: string;
    backbutton: boolean;
};
export declare const handleGoToNextStep: () => (dispatch: Dispatch<import("redux").AnyAction>, getState: Function) => void;
export declare const gotoPreviousStep: (backbutton?: boolean) => {
    type: string;
    backbutton: boolean;
};
export declare const handleGoToPreviousStep: () => (dispatch: Dispatch<import("redux").AnyAction>, getState: Function) => void;
export declare const gotoStep: (stepNumber: string) => {
    type: string;
    stepNumber: string;
};
export declare const submitStep: (stepNumber: string) => {
    type: string;
    stepNumber: string;
};
export declare const unsubmitStep: (stepNumber: string) => {
    type: string;
    stepNumber: string;
};
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
export declare const continueToNextStep: (dispatch: Dispatch<import("redux").AnyAction>, callback?: Function | undefined) => Function;
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
export declare const goToNHFFlow: (reason: any) => (dispatch: Dispatch<import("redux").AnyAction>, getState: Function) => void;
