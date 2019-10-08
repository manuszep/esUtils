import { Component } from "react";
import { KeyedObject } from "../../../index";
import { FormStepsPropsType, FormStepsStateType } from "./types";
export declare class FormSteps extends Component<FormStepsPropsType, FormStepsStateType> {
    constructor(props: FormStepsPropsType);
    componentWillReceiveProps(nextProps: FormStepsPropsType): void;
    getSteps(): JSX.Element[];
    getStepElement(step: KeyedObject, i: number): JSX.Element;
    setActiveStep(i: number): void;
    handlePreviousClick(e: MouseEvent): void;
    isPreviousDisabled(): boolean;
    handleNextClick(e: MouseEvent): void;
    isNextDisabled(): boolean;
    render(): JSX.Element;
}
export default FormSteps;
