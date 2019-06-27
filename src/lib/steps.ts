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

export const getNextStep = (step: Step): Step | null => {
  const { index } = step;

  if (stepsList.length === index + 1) return null;
  return stepsList[index + 1];
};

export const getPreviousStep = (step: Step): Step | null => {
  const { index } = step;

  if (index === 0) return null;
  return stepsList[index - 1];
};

export const getLastStep = (): Step => {
  return stepsList[stepsList.length - 1];
};

export const getStepInNumberFormat = (stepString: string): string => {
  // return everything after the first 4 characters (-step-XXXXXXXX)
  return stepString.substring(4);
};
