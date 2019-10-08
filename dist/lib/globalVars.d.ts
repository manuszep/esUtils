import { KeyedObject } from "../index";
/**
 * How to use:
 *
 * In the first stage of app initialization, call appGlobalVarInit by specifying
 * the name of the actual global var and a prefix for the app translation keys.
 *
 * Use getAppGlobalVar to get access to that global var.
 * Use getAppPrefix to get access to the translation label prefix.
 */
declare global {
    interface Window {
        [k: string]: any;
    }
}
export declare const appGlobalVarInit: (name: string, prefix: string) => void;
export declare const setAppStoreVar: (store: any) => void;
export declare const getAppStore: () => any;
export declare const getAppGlobalVar: () => KeyedObject<any>;
export declare const getAppPrefix: () => string;
