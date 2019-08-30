import React, { Component } from "react";
import { Field as ReduxField } from "redux-form";

import { FieldInner, KeyedObject } from "../../../index";

export class Field extends Component<KeyedObject> {
  normalizeField(value: string) {
    return (typeof value !== "undefined" && value !== null && typeof value.replace !== "undefined") ? value.replace("<", "")
      .replace(">", "")
      .replace("&", "") : value;
  }

  render() {
    const {
      placeholder,
      type,
      fieldSubmitted,
      reduxFieldRef,
      children,
      className,
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
        normalize={this.normalizeField}
        {...rest}>
        {children}
      </ReduxField>
    );
  }
}
