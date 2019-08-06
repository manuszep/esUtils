import React, { Component } from "react";
import classNames from "classnames";

import {
  Translation as T,
  KeyedObject
} from "local";

export type SelectPropsType = {
  id: string,
  className: string,
  options: Array<KeyedObject>
}

export class Select extends Component<SelectPropsType, {}> {
  getOptionsMarkup(options: Array<string | KeyedObject>) {
    return options.map((option: string | KeyedObject, key: number) => {
      const opt = (typeof option === "string") ? { "label": option, "value": option } : option;
      const uniqueId = `option${key}`;

      return (
        <T tag="option" key={uniqueId} value={opt.value} disabled={opt.disabled}>{opt.label}</T>
      );
    });
  }

  render() {
    const {
      id,
      className,
      options,
      ...rest
    } = this.props;

    return (
      <select
        id={id}
        className={classNames("custom-select", className)}
        {...rest}>
        {this.getOptionsMarkup(options)}
        <optgroup label="" className="select-optgroup-hack" />
        {/* Add this to force iOS to display the full labels */}
      </select>
    );
  }
}
