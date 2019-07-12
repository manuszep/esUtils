import React, { Component } from "react";
import { connect } from "react-redux";
import Pikaday from "pikaday"; // Doc: https://github.com/dbushell/Pikaday

import { getTranslation } from "../TranslationComponent";
import { Icon } from "../Icon";
import { changeField as changeFieldAction } from "../../actions/form";
import { Field } from "./Field";
import { KeyedObject } from "../../types";
import { Dispatch } from "redux";

export type DateFieldPropsType = {
  datePicker: any,
  name: string,
  fldValue: string,
  changeField: (name: string, value: string) => void,
  onSelect: Function,
  minDate: any,
  maxDate: any,
  isDayBlocked: string
}

class DateFieldComponent extends Component<DateFieldPropsType, {}> {
  datePicker: any;
  dateFieldAddon: any;
  inputElement: any;
  afterElement: any;
  fieldElement: any;
  reduxElement: any;

  constructor(props: DateFieldPropsType) {
    super(props);
  }
  componentDidMount() {
    const {
      datePicker,
      name,
      changeField,
      onSelect
    } = this.props;

    if (datePicker) {
      this.datePicker = new Pikaday({
        'field': this.inputElement,
        'trigger': this.afterElement,
        'format': "DD/MM/YYYY",
        'reposition': false,
        'position': "bottom right",
        'disableDayFn': this.getDisableDayFn(),
        'minDate': datePicker.minDate,
        'maxDate': datePicker.maxDate,
        'yearRange': datePicker.yearRange,
        'onSelect': () => {
          changeField(name, this.datePicker.toString());
          if (onSelect) onSelect();
        },
        'i18n': this.getCalendarTranslation()
      });
    }
  }

  componentWillReceiveProps(nextprops: DateFieldPropsType) {
    const { minDate, maxDate } = this.props;

    if (minDate !== nextprops.minDate) {
      this.datePicker.setMinDate(nextprops.minDate);
    }
    if (maxDate !== nextprops.maxDate) {
      this.datePicker.setMaxDate(nextprops.maxDate);
    }
  }

  componentWillUnmount() {
    if (typeof this.datePicker !== 'undefined' && typeof typeof this.datePicker === 'function') {
      this.datePicker.destroy();
    }
  }

  getDisableDayFn() {
    const { isDayBlocked } = this.props;

    let disableDayFn = function (d: Date) {
      return false;
    };

    if (typeof isDayBlocked !== "undefined") {
      switch (isDayBlocked) {
        case "future":
          disableDayFn = this.allowOnlyFutureDates;
          break;
      }
    }

    return disableDayFn;
  }

  getCalendarTranslation() {
    return {
      /* eslint-disable */
      'previousMonth': '<svg viewBox="0 0 1000 1000"><path d="M336.2 274.5l-210.1 210h805.4c13 0 23 10 23 23s-10 23-23 23H126.1l210.1 210.1c11 11 11 21 0 32-5 5-10 7-16 7s-11-2-16-7l-249.1-249c-11-11-11-21 0-32l249.1-249.1c21-21.1 53 10.9 32 32z"></path></svg>',
      'nextMonth': '<svg viewBox="0 0 1000 1000"><path d="M694.4 242.4l249.1 249.1c11 11 11 21 0 32L694.4 772.7c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210.1-210.1H67.1c-13 0-23-10-23-23s10-23 23-23h805.4L662.4 274.5c-21-21.1 11-53.1 32-32.1z"></path></svg>',
      'months': getTranslation("CALENDAR_MONTHS").split(","),
      'weekdays': getTranslation("CALENDAR_DAYS").split(","),
      'weekdaysShort': getTranslation("CALENDAR_DAYS_SHORT").split(",")
      /* eslint-enable */
    };
  }

  allowOnlyFutureDates(d: Date) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return d < now;
  }

  isZoneFull(pos: number, val: string) {
    // Check if a zone delimited by slashes is already full
    return (
      (pos < 3 && val.slice(2, 3) === "/")
      || (pos > 2 && pos < 6 && val.slice(5, 6) === "/")
    );
  }

  /* eslint-disable no-param-reassign */
  clearInRange(fld: KeyedObject, val: string, start: number, end: number) {
    // Slice string on the selected range and insert text
    fld.value = [val.slice(0, start), val.slice(end)].join("");
    // Maintain cursor position
    fld.setSelectionRange(start, start);
  }

  /* eslint-enable no-param-reassign */

  handleKeypress(e: KeyboardEvent) {
    const fld = e.target as HTMLInputElement;
    const key = e.key;
    const pos = fld.selectionStart ? fld.selectionStart : 0;

    const isNumeric = (!Number.isNaN(Number(key)) && Number.isFinite(Number(key)));

    const val = fld.value;

    const isMaxLength = (val.length >= 10);
    const zoneIsFull = this.isZoneFull(pos, val);
    const isAllowedChar = ((isNumeric) && !((zoneIsFull || isMaxLength) && isNumeric));

    // Prevent any unwanted input
    if (!isAllowedChar) {
      e.preventDefault();
    }
  }

  handleKeydown(e: KeyboardEvent) {
    const fld = e.target as HTMLInputElement;
    const key = e.key;
    const c = (typeof e.which === "number") ? e.which : e.keyCode;
    const initialValue = fld.value;
    const pos = fld.selectionStart ? fld.selectionStart : 0;
    const posEnd = fld.selectionEnd;
    const isNumeric = (!Number.isNaN(Number(key)) && Number.isFinite(Number(key)));
    const isBackSpace = (c === 8);
    const isDel = (c === 46);

    // If a range is selected, any input will remove the selection
    if (pos !== posEnd && (isNumeric || isBackSpace || isDel)) {
      this.clearInRange(fld, initialValue, pos || 0, posEnd || 0);
    }

    const val = fld.value;

    const zoneIsFull = this.isZoneFull(pos, val);
    const shouldInsertSlashBefore = (pos === 2 || pos === 5);
    const isBackDeleteSlash = (isBackSpace && (pos === 3 || pos === 6));
    const isForwardDeleteSlash = (isDel && (pos === 2 || pos === 5));
    const shouldInsertSlash = ((pos === 1 || pos === 4) && isNumeric);

    // In some cases, the slash may have been deleted (by range-select).
    // If something is entered where a slash should be, insert one
    if (shouldInsertSlashBefore && isNumeric && !zoneIsFull) {
      fld.value = `${val}/${key}`;
      e.preventDefault();
      return;
    }

    // Backspace was hit and there was a slash in the way
    if (isBackDeleteSlash) {
      // Remove the slash AND the character before
      this.clearInRange(fld, val, pos - 2, pos);
      e.preventDefault();
      return;
    }

    // Del was hit and a slash was in the way
    if (isForwardDeleteSlash) {
      // Remove the character after
      this.clearInRange(fld, val, pos + 1, pos + 2);
      e.preventDefault();
      return;
    }

    // If we're at position 1 or 4 a slash should be inserted
    if (shouldInsertSlash) {
      const tmpVal = [val.slice(0, pos), key, val.slice(pos)].join('');

      if (this.isZoneFull(pos, tmpVal)) {
        fld.value = tmpVal;
        e.preventDefault();
        return;
      }

      fld.value = [val.slice(0, pos), `${key}/`, val.slice(pos)].join('');
      e.preventDefault();
    }
  }

  render() {
    const {
      datePicker,
      fldValue,
      minDate,
      maxDate,
      ...rest
    } = this.props;

    const addonAfter = (datePicker) ? (
      <Icon
        ref={(a) => {
          this.dateFieldAddon = a;
        }}
        name="calendar" />
    ) : null;

    return (
      <Field
        ref={(el) => {
          this.fieldElement = el;
        }}
        onKeyDown={(e: KeyboardEvent) => this.handleKeydown(e)}
        onKeyPress={(e: KeyboardEvent) => this.handleKeypress(e)}
        addonAfter={addonAfter}
        inputRef={(el: HTMLElement) => {
          this.inputElement = el;
        }}
        afterRef={(el: HTMLElement) => {
          this.afterElement = el;
        }}
        reduxFieldRef={(el: HTMLElement) => {
          this.reduxElement = el;
        }}
        type="tel"
        {...rest} />
    );
  }
}

const mapStateToProps = (state: KeyedObject, ownProps: KeyedObject): KeyedObject => {
  return {
    "fldValue": state.form.app && state.form.app.values ? state.form.app.values[`${ownProps.name}`] : null
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  "changeField": (name: string, value: string) => {
    dispatch(changeFieldAction(name, value));
  }
});

export const DateField = connect(mapStateToProps, mapDispatchToProps)(DateFieldComponent);
export default DateField;
