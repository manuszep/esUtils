import { Component } from "react";
import { KeyedObject } from "../../../index";
declare class DltComponent extends Component<KeyedObject, KeyedObject> {
    ifr: Component | null;
    static buildDltUrl(lang: string, lat: string, long: string, address: string): string;
    constructor(props: KeyedObject);
    componentDidMount(): void;
    getLatLngFromAddress(): void;
    initMap(): void;
    handleGeocodingResults(results: KeyedObject[], status: string): void;
    handleCityGeocodingResults(results: KeyedObject[], status: string): void;
    render(): JSX.Element;
}
export declare const Dlt: import("react-redux").ConnectedComponentClass<typeof DltComponent, Pick<KeyedObject<any>, never>>;
export {};
