import { Component, FormEvent } from "react";
declare class AutocompleteComponent extends Component<Record<string, any>, Record<string, any>> {
    constructor(props: Record<string, any>);
    onChange(event: FormEvent, value: string): void;
    hasValidationMessages(field: string): boolean;
    handleBlur(field: string): void;
    showErrorMessage(field: string): JSX.Element | null;
    fieldHasError(field: string): true | null;
    render(): JSX.Element;
}
export declare const Autocomplete: import("react-redux").ConnectedComponent<typeof AutocompleteComponent, Pick<Record<string, any>, never> & Record<string, any>>;
export {};
