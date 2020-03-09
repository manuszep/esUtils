import { Component } from "react";
import { KeyedObject } from "../../../index";
declare class NeedHelpComponent extends Component<KeyedObject, KeyedObject> {
    getWhatsappUrl(): any;
    needHelp(): void;
    isCallCenterOpen(): Boolean;
    renderNeedHelp(): JSX.Element;
    render(): JSX.Element;
}
export declare const NeedHelp: import("react-redux").ConnectedComponentClass<typeof NeedHelpComponent, Pick<KeyedObject<any>, never>>;
export {};
