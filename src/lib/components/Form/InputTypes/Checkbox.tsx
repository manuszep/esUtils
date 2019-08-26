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
  label: string,
  name: string,
  fldValue: string,
  replacements:  KeyedObject<string>,
  onChange: (event: any) => void,
  changeField: (name: string, value: string) => void,
  onClick: (event: any) => void
}

class CheckBoxComponent extends Component<CheckBoxPropsType, {}> {
  render() {
    const {
      label,
      name,
      fldValue,
      replacements,
      children,
      onChange,
      changeField,
      onClick
    } = this.props;

    return (
      <label className="custom-control custom-checkbox">
        <input
          type="checkbox"
          className="custom-control-input"
          name={name}
          onClick={onClick}
          checked={fldValue === "1"}
          onChange={(event) => {
            changeField(name, fldValue === "1" ? "0" : "1");
            if (typeof onChange === "function") {
              onChange(event);
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
