import { KeyedObject } from "../../../index";
export declare const SET_LABELS = "SET_LABELS";
export declare const SWITCH_LANG = "SWITCH_LANG";
export declare const switchLang: (lang: string) => {
    type: string;
    lang: string;
};
export declare const setLabelsInState: (labels: KeyedObject<string>) => {
    type: string;
    labels: KeyedObject<string>;
};
export declare const setLabels: (lang: string) => Function;
