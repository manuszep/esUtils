import { Component } from "react";
import { KeyedObject } from "../../index";
export declare const initIcons: (icons: KeyedObject<JSX.Element>) => void;
export declare type IconComponentPropsType = {
    name: string;
    className?: string;
    tag?: string;
    style?: KeyedObject;
};
export declare class Icon extends Component<IconComponentPropsType, {}> {
    getIcon(name: string): JSX.Element;
    render(): JSX.Element;
}
