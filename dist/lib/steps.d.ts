import { Step } from "../index";
export declare const initSteps: (steps: Step[]) => void;
export declare const getStepByIndex: (index: number) => Step;
export declare const getStepById: (id: string) => Step | undefined;
export declare const getNextStep: (step: Step) => Step | null;
export declare const getPreviousStep: (step: Step) => Step | null;
export declare const getLastStep: () => Step;
export declare const getStepInNumberFormat: (stepString: string) => string;
