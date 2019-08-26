import { connect } from "react-redux";
import { Dispatch } from "redux";
import React, { Component } from "react";
import classNames from "classnames";

import {
  wrapMapStateToProps,
  Translation as T,
  changeField as changeFieldAction,
  KeyedObject
} from "../../../../index";

export type TogglePropsType = {
  labelOn: string,
  labelOff: string,
  valueOn: string,
  valueOff: string,
  name: string,
  onClick: (event: any, value: any) => void,
  fldValue: string | boolean,
  label: string,
  replacements: KeyedObject<string>,
  small: any,
  customClass: string,
  changeField: (name: string, value: string) => void,
  onChange: (event: any, value: any) => void
}

class ToggleComponent extends Component<TogglePropsType, {}> {
  render() {
    const {
      labelOn,
      labelOff,
      valueOn,
      valueOff,
      name,
      onClick,
      fldValue,
      children,
      label,
      replacements,
      small,
      customClass,
      changeField,
      onChange
    } = this.props;

    const _labelOn = labelOn || "LABEL_YES";
    const _labelOff = labelOff || "LABEL_NO";
    const _valueOn = valueOn || "1";
    const _valueOff = valueOff || "0";

    const cls = classNames("axa-toggle", { "axa-toggle--small": small });
    const toggleClass = classNames("axa-toggle__indicator", customClass);

    return (
      <label className={cls}>
        <div className="axa-toggle__control cy-toggle">
          <input
            type="checkbox"
            className="axa-toggle__input"
            name={name}
            onClick={(event) => onClick(event, fldValue)}
            checked={fldValue === _valueOn || fldValue === true}
            onChange={(event) => {
              changeField(name, fldValue === "1" ? _valueOff : _valueOn);
              if (typeof onChange === "function") {
                onChange(event, fldValue);
              }
            }}
          />
          <span className={toggleClass} />
          <T tag="span" className="axa-toggle__label-on">{ _labelOn }</T>
          <T tag="span" className="axa-toggle__label-off">{ _labelOff }</T>
        </div>

        {label && <T className="custom-control-description" replacements={replacements}>{label}</T>}
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

export const Toggle = connect(mapStateToProps, mapDispatchToProps)(ToggleComponent);
