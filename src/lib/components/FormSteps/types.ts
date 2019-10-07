import { KeyedObject } from "../../../index";

export type Step = {
  "index": number,
  "ID": string,
  "number": number,
  "pageTitle": string,
  "chapter": string
};

export type Steps = Step[];

export type FormStepPropsType = {
  current: number,
  notifyActiveStep: Function,
  index: number,
  start: number,
  end: number,
  pricing: boolean,
  key: any,
  label: string
}

export type FormStepsPropsType = {
  current: number,
  steps: KeyedObject[],
  shownStep: number,
  currentLabel: string
}

export type FormStepsStateType = {
  shownStep: number,
  activeStep: number
}
