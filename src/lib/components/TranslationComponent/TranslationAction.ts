import { Dispatch } from "react";
import { fetchTranslations } from "./TranslationUtils";

import { KeyedObject } from "../../types";

export const SET_LABELS = "SET_LABELS";
export const SWITCH_LANG = "SWITCH_LANG";

export const switchLang = (lang: string): {"type": string, "lang": string} => {
  return {
    "type": SWITCH_LANG,
    lang
  };
};

export const setLabelsInState = (labels: KeyedObject<string>): {"type": string, "labels": KeyedObject<string>} => {
  return {
    "type": SET_LABELS,
    "labels": labels
  };
};

export const setLabels = (lang: string): Function => {
  return (dispatch: Dispatch<any>) => {
    fetchTranslations(lang)
      .then((translations) => {
        dispatch(setLabelsInState(translations));
        dispatch(switchLang(lang));
      });
  };
};
