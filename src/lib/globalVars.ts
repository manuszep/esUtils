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
  interface Window {[k: string]: any;}
}

let appGlobalVarPointer: KeyedObject;
let appPrefix: string;
let appStore: any;

export const appGlobalVarInit = (name: string, prefix: string): void => {
  appGlobalVarPointer = window[name];
  appPrefix = prefix;
};

export const setAppStoreVar = (store: any): void => {
  appStore = store;
}

export const getAppStore = (): any => {
  return appStore;
};

export const getAppGlobalVar = (): KeyedObject => {
  return appGlobalVarPointer
  || window["Cypress"]
  || {
    "initialState": {
      "pageState": {},
      "translation": {},
      "address": {},
      "quote": {}
    }
  };
};

export const getAppPrefix = (): string => {
  return appPrefix;
};
