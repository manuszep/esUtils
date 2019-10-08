import { Component, FormEvent } from "react";
import { KeyedObject } from "../../../../index";
declare class AutocompleteComponent extends Component<KeyedObject, KeyedObject> {
    constructor(props: KeyedObject);
    onChange(event: FormEvent, value: string): void;
    hasValidationMessages(field: string): boolean;
    handleBlur(field: string): void;
    showErrorMessage(field: string): JSX.Element | null;
    fieldHasError(field: string): true | null;
    render(): JSX.Element;
}
export declare const Autocomplete: import("react-redux").ConnectedComponentClass<typeof AutocompleteComponent, Pick<KeyedObject<any>, string | number>>;
export {};
