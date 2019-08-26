import React, { Component } from "react";
import classnames from "classnames";

import { Icon, KeyedObject } from "../../../index";

const CLASS_FORM_STEPS = 'axa-form-steps';
const CLASS_FORM_STEP = `${CLASS_FORM_STEPS}__step`;
const CLASS_FORM_STEP_CONTENT = `${CLASS_FORM_STEP}__content`;
const CLASS_FORM_STEP_PROGRESS = `${CLASS_FORM_STEP}__progress`;
const CLASS_FORM_STEP_ACTIVE = `${CLASS_FORM_STEP}--active`;
const CLASS_FORM_STEP_DONE = `${CLASS_FORM_STEP}--done`;
const CLASS_FORM_STEP_PRICING = `${CLASS_FORM_STEP}--pricing`;
const CLASS_FORM_STEP_NUMBER = `${CLASS_FORM_STEP}__number`;
const CLASS_FORM_CY_STEP_ACTIVE = 'cy-active-step';

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

export class FormStep extends Component<FormStepPropsType, {}> {
  componentDidMount(): void {
    const {
      current,
      notifyActiveStep,
      index,
      children
    } = this.props;

    if (this.isActive(current)) {
      notifyActiveStep(index, children);
    }
  }

  componentWillReceiveProps(nextProps: FormStepPropsType): void {
    const {
      current,
      notifyActiveStep,
      index,
      children
    } = this.props;

    // Check if the active step changes
    if (current !== nextProps.current && this.isActive(nextProps.current)) {
      notifyActiveStep(index, children);
    }
  }

  getStart(): number {
    const { start } = this.props;

    return start;
  }

  getEnd(): number {
    const { start, end } = this.props;

    return end || start;
  }

  getStepClass(): string {
    const { pricing, current } = this.props;

    return classnames(CLASS_FORM_STEP, {
      [CLASS_FORM_STEP_PRICING]: pricing,
      [CLASS_FORM_STEP_ACTIVE]: this.isActive(),
      [`${CLASS_FORM_CY_STEP_ACTIVE}-${current}`]: this.isActive(),
      [CLASS_FORM_STEP_DONE]: this.isDone()
    });
  }

  getPosition(): string {
    const { current } = this.props;
    const start = this.getStart();
    const end = this.getEnd();

    if ((current >= start) && (current <= end)) {
      const count = (end - start) + 1;
      const currentIndex = (current - start) + 1;
      const pc = (currentIndex / count) * 100;

      const padding = (1.5 / 100) * pc;

      return `calc(${pc}% - ${padding}rem)`;
    }

    return "";
  }

  getProgressStyle(): KeyedObject {
    const pos = this.getPosition();

    return (pos !== "") ? { "width": pos } : {};
  }

  getIconStyle(): KeyedObject {
    const pos = this.getPosition();

    return (pos !== "") ? { "left": pos } : {};
  }

  isDone(): boolean {
    const { current } = this.props;
    return (current > this.getEnd());
  }

  isActive(currentStep?: number): boolean {
    const { current } = this.props;
    const realCurrent = currentStep || current;

    return ((realCurrent >= this.getStart()) && (realCurrent <= this.getEnd()));
  }

  render() {
    const { children, index } = this.props;

    return (
      <div className={this.getStepClass()}>
        <span className={CLASS_FORM_STEP_NUMBER}>{index + 1}</span>
        <span className={CLASS_FORM_STEP_CONTENT}>{children}</span>
        <Icon name="airplane" style={this.getIconStyle()} />
        <div className={CLASS_FORM_STEP_PROGRESS} style={this.getProgressStyle()} />
      </div>
    );
  }
}

export default FormStep;
