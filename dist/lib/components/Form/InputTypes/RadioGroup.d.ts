import { Component, FormEvent } from "react";
import { KeyedObject } from "../../../../index";
export declare type RadioGroupPropsType = {
    items: Array<KeyedObject>;
    value: string;
    name: string;
    onChange: (event: any) => void;
    onBlur: (event: any) => void;
    mode: string;
    size: string;
    noprefix: any;
};
export declare class RadioGroup extends Component<RadioGroupPropsType, {}> {
    getIcon(item: KeyedObject): JSX.Element | null;
    handleChange(e: FormEvent, onChange: Function): void;
    renderRadios(): JSX.Element[];
    render(): JSX.Element;
}
