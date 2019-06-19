let appGlobalVarPointer;
let appPrefix;

export const appGlobalVarInit = (name, prefix) => {
  appGlobalVarPointer = window[name];
  appPrefix = prefix;
};

export const getAppGlobalVar = () => {
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

export const getAppPrefix = () => {
  return appPrefix;
};
