import { Step, Steps } from "./types";
export declare const initSteps: (steps: Steps) => void;
export declare const getStepByIndex: (index: number) => Step;
export declare const getStepById: (id: string) => Step | undefined;
export declare const getNextStep: (step: string | Step | undefined) => Step | null;
export declare const getPreviousStep: (step: Step) => Step | null;
export declare const getLastStep: () => Step;
export declare const getStepInNumberFormat: (stepString: string) => string;
