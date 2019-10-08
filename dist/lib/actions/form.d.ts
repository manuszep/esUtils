import { Dispatch } from "react";
import { AnyAction } from "redux";
import { KeyedObject } from "../../index";
export declare const constructFieldsToSave: (getState: Function, fields?: never[], fieldsAndValues?: never[], shouldSaveState?: boolean, stringify?: boolean) => string | {
    [key: string]: any;
};
export declare const changeField: (fieldName: string, fieldValue: any) => AnyAction;
export declare const changeMultipleFields: (fields: KeyedObject<any>[]) => (dispatch: Dispatch<any>) => void;
export declare const clearField: (fieldName: string) => (dispatch: Dispatch<any>) => void;
export declare const clearMultipleFields: (fields: string[]) => (dispatch: Dispatch<any>) => void;
export declare const unTouchField: (fieldName: string) => (dispatch: Dispatch<any>) => void;
export declare const unTouchMultipleFields: (fieldNames: string[]) => (dispatch: Dispatch<any>) => void;
export declare function saveLeadToBrokerReason(leadToBrokerReason: any): void;
export declare function saveBlockedInFlowReason(blockedInFlowReason: any): void;
