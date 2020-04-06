import { Component, FormEvent } from "react";
import { KeyedObject } from "../../../../index";
declare class AddressFieldComponent extends Component<KeyedObject, KeyedObject> {
    timer: any;
    static getFieldsNames(name: string): string[];
    static getFieldsNamesDictionary(name: string): {
        street: string;
        streetNr: string;
        boxNr: string;
        postalCode: string;
        city: string;
        streetId: string;
    };
    constructor(props: KeyedObject);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: KeyedObject): void;
    onChangeCities(value: string): void;
    onChangeStreets(value: string): void;
    getPostalCode(): any;
    getCity(): any;
    getStreet(): any;
    getOptionsMarkup(optionsData: (string | Record<string, any>)[]): JSX.Element[];
    getCountriesField(name: string, id: string): JSX.Element;
    fetchCountries(lang: string): void;
    handleOnChange(e: FormEvent): void;
    handleZipKeyPress(e: KeyboardEvent): void;
    handleNumberKeyPress(e: KeyboardEvent): void;
    render(): JSX.Element;
}
export declare const AddressField: import("react-redux").ConnectedComponent<typeof AddressFieldComponent, Pick<KeyedObject<any>, never> & KeyedObject<any>>;
export {};
