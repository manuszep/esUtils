import { Step, Steps } from "./types";

let stepsList: Steps;

export const initSteps = (steps: Steps): void => {
  stepsList = steps;
};

export const getStepByIndex = (index: number): Step => {
  return stepsList[index];
};

export const getStepById = (id: string): Step | undefined => {
  return stepsList.find(loopedStep => loopedStep.ID === id);
};

export const getNextStep = (step: Step | string | undefined): Step | null => {
  const actualStep = typeof step === "string" ? getStepById(step) : step;
  if (typeof actualStep === "undefined") return null;
  const { index } = actualStep;

  if (stepsList.length === index + 1) return null;
  return stepsList[index + 1];
};

export const getPreviousStep = (step: Step): Step | null => {
  const { index } = step;

  if (index === 0) return null;
  return stepsList[index - 1];
};

export const getLastStep = (): Step => {
  const normalSteps = stepsList.filter(step => step.number < 100);
  return normalSteps[normalSteps.length - 1];
};

export const getStepInNumberFormat = (stepString: string): string => {
  // return everything after the first 4 characters (-step-XXXXXXXX)
  return stepString.substring(4);
};
