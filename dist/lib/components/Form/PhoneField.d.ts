import { Component } from "react";
import { KeyedObject } from "../../../index";
export declare type PhoneFieldPropsType = {
    lang: "FR" | "NL";
    prefixFieldValue: string;
    fieldSubmitted: boolean;
    numberFieldErrorMsg: string;
    fullFieldErrorMsg: string;
    lineNumberTouched: boolean;
    addPrefixToPhone: Function;
    numberFieldValue: string;
    help: string;
    label: string;
    name: string;
    onChange: Function;
};
declare class PhoneFieldComponent extends Component<PhoneFieldPropsType, KeyedObject> {
    _isMounted: boolean;
    static getPrefixField(name: string): string;
    static getNumberField(name: string): string;
    static getFullField(name: string): string;
    static getErrorMessage(name: string): string;
    constructor(props: PhoneFieldPropsType);
    componentDidMount(): void;
    componentWillUnmount(): void;
    getPrefixOptions(): JSX.Element[];
    getErrorMessage(): JSX.Element | null;
    handleClickOutside(e: MouseEvent): void;
    findFlag(prefix: string): string;
    handleKeyPress(e: KeyboardEvent): void;
    handlePrefixChange(e: any): void;
    handlePhonePrefixClick(e: any): void;
    updatePhoneNumber(e: any): void;
    render(): JSX.Element;
}
export declare const PhoneField: import("react-redux").ConnectedComponent<typeof PhoneFieldComponent, Pick<PhoneFieldPropsType, "label" | "help" | "onChange" | "name" | "lang" | "fieldSubmitted" | "prefixFieldValue" | "numberFieldErrorMsg" | "fullFieldErrorMsg" | "lineNumberTouched" | "addPrefixToPhone" | "numberFieldValue"> & KeyedObject<any>>;
export {};
