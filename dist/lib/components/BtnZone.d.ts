import { Component } from "react";
import { KeyedObject } from "../../index";
declare class BtnZoneComponent extends Component<KeyedObject, KeyedObject> {
    constructor(props: KeyedObject);
    componentDidMount(): void;
    componentDidUpdate(prevProps: KeyedObject): void;
    render(): JSX.Element;
}
export declare const BtnZone: import("react-redux").ConnectedComponent<typeof BtnZoneComponent, Pick<KeyedObject<any>, string | number> & KeyedObject<any>>;
export {};
