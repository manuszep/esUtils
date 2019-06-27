import axios from "axios";
import { getAppGlobalVar, getAppPrefix } from "../../globalVars";
import { KeyedObject } from "../../types";

let labels = {};

export const parseTranslationMaps = (translationMap: any): KeyedObject<string> => {
  let parsedMap = translationMap;

  if (typeof translationMap === "string") {
    parsedMap = parsedMap.replace(/`/gm, '"');
    parsedMap = parsedMap.replace(/(\r\n|\n|\r)/gm, "");
    parsedMap = parsedMap.replace(/,([^,]*)$/, '$1');
    parsedMap = JSON.parse(parsedMap);
  }

  return parsedMap;
}

export const fetchTranslations = (lang: string): Promise<KeyedObject<string>> => {
  const gVar = getAppGlobalVar();

  return axios
    .get(gVar.endpoints.getLanguages.replace("%%lang%%", lang))
    .then((resp) => {
      let translationMaps = parseTranslationMaps(resp.data);

      return translationMaps;
    });
};

export const getCurrentLanguage = (): string => {
  const gVar = getAppGlobalVar();
  const { lang } = gVar.appStore.getState().pageState;
  return lang;
};

export const getTranslationFromLabelDictionary = (key: any, labelDictionary: KeyedObject<string>): string => {
  const appPrefix = getAppPrefix();
  const prefix = appPrefix.length ? `${appPrefix.toUpperCase()}_` : "";

  if (typeof key !== "string") return key;

  const fullKey = `${prefix}${key.toUpperCase()}`;

  try {
    return (key && typeof labelDictionary[fullKey] !== "undefined")
      ? labelDictionary[fullKey]
      : fullKey;
  } catch (err) {
    return fullKey;
  }
};

export const getTranslation = (key: string): string => {
  const gVar = getAppGlobalVar();
  if (gVar && gVar.appStore) {
    labels = gVar.appStore.getState().translation.labels;
  }

  return getTranslationFromLabelDictionary(key, labels);
};

export const getTranslationFromProps = (props: KeyedObject, key: string): string => {
  return getTranslationFromLabelDictionary(key, props.labels);
};
