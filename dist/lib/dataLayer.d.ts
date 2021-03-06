import { Middleware } from "redux";
import { KeyedObject, Step } from "../index";
declare class DataLayer {
    isUnique: [];
    customMethods: KeyedObject<Function>;
    constructor(customMethods?: KeyedObject<Function>);
    pushData(data: {
        dataLayer: Record<string, any>;
        events?: any;
    }): void;
    setStep(step: Step | undefined | null, state: KeyedObject): void;
    triggerConversion(state: KeyedObject): void;
    setLanguage(lang: string): void;
}
export declare const initDataLayer: (customMethods?: KeyedObject<Function>) => void;
export declare const getDataLayer: () => DataLayer;
export declare const dataLayerMiddleware: Middleware;
export {};
