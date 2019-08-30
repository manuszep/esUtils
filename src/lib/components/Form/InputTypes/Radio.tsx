import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import classNames from "classnames";

import {
  Translation as T,
  changeField as changeFieldAction,
  KeyedObject
} from "../../../../index";

export type RadioPropsType = {
  label: string,
  name: string,
  fldValue: string,
  optionValue: string | number,
  customClass: string,
  onChange: (event: any) => void,
  changeField: (name: string, value: string) => void,
  onClick: (event: any) => void
}

// How To use:
// <Field tag="radio" label="Radio1" name="FLD_TEST_RADIO" optionValue="0" />
// <Field tag="radio" label="Radio2" name="FLD_TEST_RADIO" optionValue="1"/>

class RadioComponent extends Component<RadioPropsType, {}> {
  render() {
    const {
      label,
      name,
      onClick,
      fldValue,
      optionValue,
      customClass,
      changeField,
      onChange
    } = this.props;

    const radioClassName = classNames("custom-control-description", customClass);
    // due to the change to replace special characters from values the value is stored as a string instead of an int.
    // this is why we ensure the value is always converted to a string
    const strOptionValue = `${optionValue}`;

    return (
      <label className="custom-control custom-radio">
        <input
          type="radio"
          className="custom-control-input"
          onChange={(event) => {
            //changeField(name, strOptionValue);
            if (typeof onChange === "function") {
              onChange(event);
            }
          }}
          onClick={onClick}
          value={strOptionValue}
          checked={fldValue === strOptionValue} />
        <span className="custom-control-indicator" />
        <T className={radioClassName}>{label}</T>
      </label>
    );
  }
}

const mapStateToProps = (state: KeyedObject, ownProps: KeyedObject): KeyedObject => ({
  "fldValue": state.form.app.values[`${ownProps.name}`]
});

const mapDispatchToProps = (dispatch: Dispatch): KeyedObject => ({
  "changeField": (name: string, value: string): void => {
    dispatch(changeFieldAction(name, value));
  }
});

export const Radio = connect(mapStateToProps, mapDispatchToProps)(RadioComponent);
