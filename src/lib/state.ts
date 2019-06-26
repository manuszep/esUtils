import { getAppGlobalVar } from "./globalVars";
import { KeyedObject } from "./types";

export const getInitialState = (): KeyedObject => {
  const gVar = getAppGlobalVar();

  return gVar.initialState || {};
};

export const wrapMapStateToProps = (
  state: {[k: string]: any},
  commonItems: {[k: string]: any},
  appItems: {[k: string]: any}): any => {
  if (state.form.app) {
    const items = appItems;
    Object.keys(items).forEach((key) => {
      if (typeof items[key] === 'function') {
        items[key] = items[key](state.form.app.values);
      } else {
        items[key] = state.form.app.values[items[key]];
      }
    });
    return Object.assign(commonItems, appItems);
  }
  return commonItems;
}
