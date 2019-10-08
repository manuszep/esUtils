import { Component } from "react";
import { KeyedObject } from "../../../../index";
export declare type SelectPropsType = {
    id: string;
    className: string;
    options: Array<KeyedObject>;
};
export declare class Select extends Component<SelectPropsType, {}> {
    getOptionsMarkup(options: Array<string | KeyedObject>): JSX.Element[];
    render(): JSX.Element;
}
