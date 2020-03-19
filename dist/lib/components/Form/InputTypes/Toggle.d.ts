import { Component } from "react";
import { KeyedObject } from "../../../../index";
export declare type TogglePropsType = {
    labelOn: string;
    labelOff: string;
    valueOn: string;
    valueOff: string;
    name: string;
    onClick: (event: any, value: any) => void;
    fldValue: string | boolean;
    label: string;
    replacements: KeyedObject<string>;
    small: any;
    customClass: string;
    changeField: (name: string, value: string) => void;
    onChange: (event: any, value: any) => void;
};
declare class ToggleComponent extends Component<TogglePropsType, {}> {
    render(): JSX.Element;
}
export declare const Toggle: import("react-redux").ConnectedComponentClass<typeof ToggleComponent, Pick<TogglePropsType, "small" | "label" | "onChange" | "name" | "onClick" | "valueOn" | "valueOff" | "fldValue" | "replacements" | "changeField" | "customClass" | "labelOn" | "labelOff"> & KeyedObject<any>>;
export {};
