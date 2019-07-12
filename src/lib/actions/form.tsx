import { Dispatch } from "react";
import { untouch } from "redux-form";

import { KeyedObject } from "../types";
import { AnyAction } from "redux";

export const changeField = (fieldName: string, fieldValue: any): AnyAction => {
  return {
    "type": "@@redux-form/CHANGE",
    "meta": {
      "form": "app",
      "field": fieldName,
      "touch": false,
      "persistentSubmitErrors": false
    },
    "payload": fieldValue
  };
};

export const changeMultipleFields = (fields: KeyedObject[]) => {
  return (dispatch: Dispatch<any>) => {
    fields.forEach((field: KeyedObject) => {
      dispatch(changeField(field.name, field.value));
    });
  };
};

export const clearField = (fieldName: string) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(changeField(fieldName, ''));
  };
};

export const clearMultipleFields = (fields: string[]) => {
  return (dispatch: Dispatch<any>) => {
    fields.forEach((field) => {
      dispatch(clearField(field));
    });
  };
};

export const unTouchField = (fieldName: string) => {
  return (dispatch: Dispatch<any>) => {
    return dispatch(untouch("app", fieldName));
  };
};

export const unTouchMultipleFields = (fieldNames: string[]) => {
  return (dispatch: Dispatch<any>) => {
    fieldNames.forEach(fieldName => dispatch(unTouchField(fieldName)));
  };
};
