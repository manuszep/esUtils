import React, { Component } from "react";
import { Field as ReduxField } from "redux-form";

import { FieldInner, KeyedObject } from "../../../index";

export class Field extends Component<KeyedObject> {
  normalizeField(value: string, normalize: Function | undefined) {
    const newVal = (typeof value !== "undefined" && value !== null && typeof value.replace !== "undefined") ? value.replace("<", "")
      .replace(">", "")
      .replace("&", "") : value;

    return (typeof normalize === "function") ? normalize(newVal) : newVal;
  }

  render() {
    const {
      placeholder,
      type,
      fieldSubmitted,
      reduxFieldRef,
      children,
      className,
      normalize,
      ...rest
    } = this.props;

    return (
      <ReduxField
        ref={reduxFieldRef}
        component={FieldInner}
        placeholder={placeholder}
        type={type}
        fieldSubmitted={fieldSubmitted}
        className={className}
        normalize={(value: any) => this.normalizeField(value, normalize)}
        {...rest}>
        {children}
      </ReduxField>
    );
  }
}
