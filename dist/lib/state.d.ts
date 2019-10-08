import { KeyedObject } from "../index";
export declare const getInitialState: () => KeyedObject<any>;
export declare function getEndPoints(): KeyedObject;
export declare function getWhatsappPhone(): KeyedObject;
export declare const wrapMapStateToProps: (state: KeyedObject<any>, commonItems: KeyedObject<any>, appItems: KeyedObject<any>) => KeyedObject<any>;
