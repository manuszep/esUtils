import { connect } from "react-redux";
import React, { Component } from "react";
import classNames from "classnames";
import { wrapMapStateToProps } from "../../../state";
import { Translation as T } from "../../TranslationComponent";
import { changeField as changeFieldAction } from "../../../actions/form";
import { KeyedObject } from "../../../types";
import { Dispatch } from "redux";

export type TogglePropsType = {
  labelOn: string,
  labelOff: string,
  name: string,
  onClick: (event: any) => void,
  fldValue: string,
  label: string,
  replacements: KeyedObject<string>,
  small: any,
  customClass: string,
  changeField: (name: string, value: string) => void,
  onChange: (event: any) => void
}

class ToggleComponent extends Component<TogglePropsType, {}> {
  render() {
    const {
      labelOn,
      labelOff,
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

    const cls = classNames("axa-toggle", { "axa-toggle--small": small });
    const toggleClass = classNames("axa-toggle__indicator", customClass);

    return (
      <label className={cls}>
        <div className="axa-toggle__control cy-toggle">
          <input
            type="checkbox"
            className="axa-toggle__input"
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
