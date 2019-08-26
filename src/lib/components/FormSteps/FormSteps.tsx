import React, { Component } from "react";

import { KeyedObject } from "../../../index";
import { FormStep } from "./FormStep";

const CLASS_FORM_STEPS = 'axa-form-steps';
const CLASS_FORM_STEPS_LABEL = `${CLASS_FORM_STEPS}__label`;
const CLASS_FORM_STEPS_WRAPPER = `${CLASS_FORM_STEPS}__wrapper`;

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

export class FormSteps extends Component<FormStepsPropsType, FormStepsStateType> {
  constructor(props: FormStepsPropsType) {
    super(props);

    this.state = {
      "shownStep": 0,
      "activeStep": 0
    };
  }

  componentWillReceiveProps(nextProps: FormStepsPropsType) {
    const { current } = this.props;
    const { current: nextCurrent } = nextProps;
    const { activeStep } = this.state;

    // Check if the active step changes
    if (current !== nextCurrent) {
      this.setState({
        "shownStep": activeStep
      });
    }
  }

  getSteps() {
    const { steps } = this.props;

    return steps.map((step, i) => {
      return this.getStepElement(step, i);
    });
  }

  getStepElement(step: KeyedObject, i: number) {
    const {
      title,
      start,
      end,
      pricing,
      label
    } = step;
    const { current } = this.props;

    return (
      <FormStep
        start={start}
        end={end}
        label={label}
        pricing={pricing}
        current={current}
        index={i}
        key={i}
        notifyActiveStep={(index: number, text: string) => this.setActiveStep(index)}>
        {title}
      </FormStep>
    );
  }

  setActiveStep(i: number) {
    this.setState({
      "shownStep": i,
      "activeStep": i
    });
  }

  handlePreviousClick(e: MouseEvent) {
    e.preventDefault();

    const { shownStep } = this.state;

    this.setState({
      "shownStep": shownStep - 1
    });
  }

  isPreviousDisabled() {
    const { shownStep } = this.state;
    return shownStep === 0;
  }

  handleNextClick(e: MouseEvent) {
    e.preventDefault();
    const { shownStep } = this.props;

    this.setState({
      "shownStep": shownStep + 1
    });
  }

  isNextDisabled() {
    const { shownStep } = this.state;
    const { steps } = this.props;

    return shownStep === steps.length - 1;
  }

  render() {
    const { currentLabel } = this.props;

    return (
      <div className={CLASS_FORM_STEPS}>
        <div className={CLASS_FORM_STEPS_WRAPPER}>
          <div className={CLASS_FORM_STEPS_LABEL}>{currentLabel}</div>
          {this.getSteps()}
        </div>
      </div>
    );
  }
}

export default FormSteps;
