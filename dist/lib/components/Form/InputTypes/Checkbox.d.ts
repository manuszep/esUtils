import { Component } from "react";
import { KeyedObject } from "../../../../index";
export declare type CheckBoxPropsType = {
    valueOn: any;
    valueOff: any;
    label: string;
    name: string;
    fldValue: string | boolean;
    replacements: KeyedObject<string>;
    onChange: (event: any, value: any) => void;
    changeField: (name: string, value: string) => void;
    onClick: (event: any) => void;
    noprefix: any;
};
declare class CheckBoxComponent extends Component<CheckBoxPropsType, {}> {
    render(): JSX.Element;
}
export declare const CheckBox: import("react-redux").ConnectedComponentClass<typeof CheckBoxComponent, Pick<CheckBoxPropsType, "label" | "onChange" | "name" | "onClick" | "valueOn" | "valueOff" | "fldValue" | "replacements" | "changeField" | "noprefix"> & KeyedObject<any>>;
export {};
