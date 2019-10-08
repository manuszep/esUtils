import { Component } from "react";
import { KeyedObject } from "../../../index";
import { FormStepPropsType } from "./types";
export declare class FormStep extends Component<FormStepPropsType, {}> {
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: FormStepPropsType): void;
    getStart(): number;
    getEnd(): number;
    getStepClass(): string;
    getPosition(): string;
    getProgressStyle(): KeyedObject;
    getIconStyle(): KeyedObject;
    isDone(): boolean;
    isActive(currentStep?: number): boolean;
    render(): JSX.Element;
}
export default FormStep;
