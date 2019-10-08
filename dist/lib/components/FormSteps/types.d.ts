import { KeyedObject } from "../../../index";
export declare type Step = {
    "index": number;
    "ID": string;
    "number": number;
    "pageTitle": string;
    "chapter": string;
};
export declare type Steps = Step[];
export declare type FormStepPropsType = {
    current: number;
    notifyActiveStep: Function;
    index: number;
    start: number;
    end: number;
    pricing: boolean;
    key: any;
    label: string;
};
export declare type FormStepsPropsType = {
    current: number;
    steps: KeyedObject[];
    shownStep: number;
    currentLabel: string;
};
export declare type FormStepsStateType = {
    shownStep: number;
    activeStep: number;
};
