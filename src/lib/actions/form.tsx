import { Dispatch } from "react";
import { untouch } from "redux-form";
import { AnyAction } from "redux";
import axios from "axios/index";
import querystring from "query-string-es5-with-types";

import { KeyedObject, getEndPoints, getReduxStore } from "../../index";

export const constructFieldsToSave = (getState: Function, fields = [], fieldsAndValues = [], shouldSaveState = false, stringify = true) => {
  const result: { [key: string]: any } = {};

  fields.forEach((fieldName: string) => {
    result[fieldName] = getState().form.app.values[fieldName];
  });

  fieldsAndValues.forEach((item: { name: any, value: any }) => {
    result[item.name] = item.value;
  });

  if (shouldSaveState) {
    result.REDUX_STATE = getReduxStore(getState);
  }
  if (stringify) {
    return querystring.stringify(result);
  }
  return result;
};

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

export function saveLeadToBrokerReason(leadToBrokerReason: any) {
  const fieldsAndValues = {
    "LEAD_TO_BROKER_REASON": leadToBrokerReason
  };
  axios.post(`${getEndPoints().saveBlockedInFlowReason}&v=${(new Date()).valueOf()}`, querystring.stringify(fieldsAndValues))
    .catch((err) => {
      Promise.reject(err);
    });
}
