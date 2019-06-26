import { getAppGlobalVar } from "./globalVars";
import { KeyedObject } from "./types";

export const getInitialState = (): KeyedObject => {
  const gVar = getAppGlobalVar();

  return gVar.initialState || {};
};
