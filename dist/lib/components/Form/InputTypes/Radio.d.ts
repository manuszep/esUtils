import { Component } from "react";
import { KeyedObject } from "../../../../index";
export declare type RadioPropsType = {
    label: string;
    name: string;
    fldValue: string;
    optionValue: string | number;
    customClass: string;
    onChange: (event: any) => void;
    changeField: (name: string, value: string) => void;
    onClick: (event: any) => void;
    noprefix: any;
};
declare class RadioComponent extends Component<RadioPropsType, {}> {
    render(): JSX.Element;
}
export declare const Radio: import("react-redux").ConnectedComponentClass<typeof RadioComponent, Pick<RadioPropsType, "label" | "onChange" | "name" | "onClick" | "fldValue" | "changeField" | "noprefix" | "optionValue" | "customClass"> & KeyedObject<any>>;
export {};
