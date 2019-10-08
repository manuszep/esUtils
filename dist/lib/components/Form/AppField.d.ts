import { Component, Dispatch } from "react";
export declare class AppField extends Component {
    name: string;
    dispatch: Dispatch<any>;
    constructor(props: any);
    change(value: any, name: string): void;
    untouch(name: string): void;
}
