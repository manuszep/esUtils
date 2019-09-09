import React, { Component, FormEvent } from "react";
import classnames from "classnames";

import {
  Translation as T,
  Icon,
  KeyedObject
} from "../../../../index";

export type RadioGroupPropsType = {
  items: Array<KeyedObject>,
  value: string,
  name: string,
  onChange: (event: any) => void,
  onBlur: (event: any) => void,
  mode: string,
  size: string
}

// Wrap the component in a dynamic ReduxField.
export class RadioGroup extends Component<RadioGroupPropsType, {}> {
  getIcon(item: KeyedObject) {
    if (typeof item.icon !== 'undefined') {
      return <Icon name={item.icon} />;
    }

    return null;
  }

  handleChange(e: FormEvent, onChange: Function) {
    const t: any = e.currentTarget;

    t.blur();

    if (onChange) {
      onChange(e);
    }
  }

  renderRadios() {
    // As this component is used by a ReduxField, some properties went into the input key
    const {
      items,
      value,
      onChange,
      onBlur,
      name,
      mode,
      size
    } = this.props;

    const sizeClass = size.split(" ").map((cls) => { return `custom-radio--${cls}` }).join(" ");

    let counter = 0;
    const clsExt = typeof size !== "undefined" ? sizeClass : null;
    // Loop over each item to generate as many inputs as there are items
    return items.map((item, key) => {
      const checked = item.value === value;
      const cls = classnames("custom-control custom-radio", { "radio1": mode !== "standard" }, `cy-options-${name}`, clsExt);
      const labelClass = classnames("custom-control-description", `cy-option-${counter}`, `cy-attribute-${item.value}`, "radio-buttons-responsive");
      const uniqueId = `name${key}`;
      counter += 1;
      return (
        <label key={uniqueId} className={cls}>
          <input
            type="radio"
            className="custom-control-input"
            name={name}
            value={item.value}
            checked={checked}
            onChange={(e: FormEvent) => this.handleChange(e, onChange)}
            onBlur={onBlur} />
          <span className="custom-control-indicator" />
          <span className={labelClass}>{this.getIcon(item)}<T>{item.label}</T></span>
        </label>
      );
    });
  }

  render() {
    return (
      <div className="radio-buttons-wrapper">
        {this.renderRadios()}
      </div>
    );
  }
}
