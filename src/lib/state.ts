import { getAppGlobalVar, KeyedObject } from "local";

export const getInitialState = (): KeyedObject => {
  return getAppGlobalVar().initialState || {};
};

export function getEndPoints(): KeyedObject {
  return getAppGlobalVar().endpoints || {};
}

export function getWhatsappPhone(): KeyedObject {
  return getAppGlobalVar().whatsapp || { "whatsapp_phone": "https://api.whatsapp.com/send?phone=32491169028" };
}

export const wrapMapStateToProps = (
  state: KeyedObject,
  commonItems: KeyedObject,
  appItems: KeyedObject): KeyedObject => {
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
