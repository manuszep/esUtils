import { Component } from "react";
export declare type LinkComponentPropsType = {
    href: string;
    blank: Boolean;
};
export declare class Link extends Component<LinkComponentPropsType, {}> {
    render(): JSX.Element;
}
