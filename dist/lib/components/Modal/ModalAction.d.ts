import { KeyedObject } from "../../../index";
export declare const DISMISS_MODAL = "DISMISS_MODAL";
export declare const SHOW_MODAL = "SHOW_MODAL";
export declare const dismissModal: () => {
    "type": string;
};
export declare const showModal: (firstArg?: string | KeyedObject<any>, secondArg?: KeyedObject<any>) => {
    "type": string;
    "contentPath": null;
    "props": KeyedObject<any>;
} | {
    "type": string;
    "contentPath": string;
    "props": KeyedObject<any>;
};
