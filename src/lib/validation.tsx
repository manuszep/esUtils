import React from "react";
import moment from "moment";

import {
  Translation as T,
  parseDate,
  getCurrentDate,
  patternPhone,
  patternPhoneMobile,
  patternEmail
} from "../index";

export const required = (value: any): undefined | JSX.Element => {

  if (typeof value !== "undefined"
    && value !== ""
    && value !== "---"
    && value !== false) {
    return undefined;
  }

  return <span className="form-control-feedback"><T>ERROR_REQUIRED</T></span>;
};

export const isValidDate = (value: string): boolean => {
  if (typeof value === "undefined" || !value) return false;
  return moment(value, ["D/M/YYYY", "D/MM/YYYY", "DD/M/YYYY", "DD/MM/YYYY"], true).isValid();
};

export const dateAfterToday = (value: string): boolean | undefined | JSX.Element => {
  if (!isValidDate(value)) return false;

  const date = parseDate(value);
  const today = getCurrentDate();
  return date.isAfter(today) ? undefined : <T>ERROR_DATE_IN_PAST</T>;
};

export const dateWithinYear = (value: string): boolean | undefined | JSX.Element => {
  if (!isValidDate(value)) return false;

  const date = parseDate(value);
  const yearFromToday = getCurrentDate().add(1, "y");
  return date.isSameOrBefore(yearFromToday) ? undefined : <T>ERROR_DATE_AFTER_YEAR</T>;
};

export const validDate = (value: string): boolean | undefined | JSX.Element => {
  let convertedDate = false;

  if (value !== "" && value !== null) {
    convertedDate = (!isValidDate(value));
  }

  return value && convertedDate ? <T>ERROR_INVALID_DATE</T> : undefined;
};

export const dateNotBefore1900 = (value: string): undefined | JSX.Element => {
  const date = parseDate(value);

  if (!moment(date).isAfter(moment("01/01/1900", ["D/M/YYYY", "D/MM/YYYY", "DD/M/YYYY", "DD/MM/YYYY"], true))) {
    return <T>ERROR_DATE_BEFORE_1900</T>;
  }

  return;
};

export const dateNotInFuture = (value: string): undefined | JSX.Element => {
  let pastDate = false;

  if (!(value === "" || value == null)) {
    const today = getCurrentDate();
    const userDate = parseDate(value);
    pastDate = moment(today).isSameOrAfter(userDate);
  } else {
    return undefined;
  }

  return pastDate ? undefined : <T>ERROR_DATE_IN_FUTURE</T>;
};

export const validEmail = (value: string): undefined | JSX.Element => {
  return value && !patternEmail.test(value)
    ? <T>ERROR_INVALID_EMAIL</T>
    : undefined;
};

export const validPhoneLogic = (phoneNumber: string): boolean => {
  if (!phoneNumber) {
    return true;
  }

  let valid = false;

  if (phoneNumber.startsWith("0032")) {
    valid = patternPhone.test(phoneNumber)
      || patternPhoneMobile.test(phoneNumber);
  } else {
    valid = /^\d+$/.test(phoneNumber);
  }
  return valid;
}

export const validPhone = (value: string): undefined | JSX.Element => {
  const valid = validPhoneLogic(value);

  return valid ? undefined : <T>PHONE_NUMBER_INVALID</T>;
};
