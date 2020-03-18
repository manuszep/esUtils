import { Component } from "react";
import { KeyedObject } from "../../index";
declare class EditableValueComponent extends Component<KeyedObject, KeyedObject> {
    render(): JSX.Element;
}
export declare const EditableValue: import("react-redux").ConnectedComponent<typeof EditableValueComponent, Pick<KeyedObject<any>, string | number>>;
export {};
