import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import {
  wrapMapStateToProps,
  Translation as T,
  changeField as changeFieldAction,
  KeyedObject
} from "../../../../index";

export type CheckBoxPropsType = {
  valueOn: any,
  valueOff: any,
  label: string,
  name: string,
  fldValue: string | boolean,
  replacements:  KeyedObject<string>,
  onChange: (event: any, value: any) => void,
  changeField: (name: string, value: string) => void,
  onClick: (event: any) => void
}

class CheckBoxComponent extends Component<CheckBoxPropsType, {}> {
  render() {
    const {
      valueOn,
      valueOff,
      label,
      name,
      fldValue,
      replacements,
      children,
      onChange,
      changeField,
      onClick
    } = this.props;

    const _valueOn = valueOn || "1";
    const _valueOff = valueOff || "0";

    return (
      <label className="custom-control custom-checkbox">
        <input
          type="checkbox"
          className="custom-control-input"
          name={name}
          onClick={onClick}
          checked={fldValue === _valueOn || fldValue === true}
          onChange={(event) => {
            changeField(name, fldValue === "1" ? _valueOff : _valueOn);
            if (typeof onChange === "function") {
              onChange(event, fldValue);
            }
          }}
        />
        <span className="custom-control-indicator" />
        <T className="custom-control-description" replacements={replacements}>{label}</T>
        {children}
      </label>
    );
  }
}


const mapStateToProps = (state: KeyedObject, ownProps: KeyedObject): KeyedObject => {
  const commonItems = {};
  const appItems = {
    "fldValue": ownProps.name
  };
  return wrapMapStateToProps(state, commonItems, appItems);
};

const mapDispatchToProps = (dispatch: Dispatch): KeyedObject => ({
  "changeField": (name: string, value: string): void => {
    dispatch(changeFieldAction(name, value));
  }
});

export const CheckBox = connect(mapStateToProps, mapDispatchToProps)(CheckBoxComponent);
