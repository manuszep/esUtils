import React, { Component } from "react";

import { Translation as T, getGuid, KeyedObject } from "../../../../index";

export type PaymentMethodPropsType = {
  items: Array<KeyedObject>,
  value: string,
  name: string,
  onChange: (event: any) => void
}

// Wrap the component in a dynamic ReduxField.
export class PaymentMethod extends Component<PaymentMethodPropsType, {}> {
  renderPaymentMethods() {
    // As this component is used by a ReduxField, some properties went into the input key
    const {
      items,
      value,
      onChange,
      name
    } = this.props;

    // Loop over each item to generate as many inputs as there are items
    return items.map((item: KeyedObject, key: number) => {
      const checked = item.value === value;
      const id = `${name}${key}`;
      const src = `images/${item.image}.svg`;

      return (
        <div key={getGuid()} className="form-group__payment-method">
          <input
            type="radio"
            className="custom-control-input"
            name={name}
            value={item.value}
            checked={checked}
            onChange={onChange}
            id={id} />
          <label
            htmlFor={id}
            className={`cy-payment-method-${key}`}>
            <img src={src} alt={item.label} />
            <T className="custom-control-description">{item.label}</T>
          </label>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="form-group__payment-methods">
        {this.renderPaymentMethods()}
      </div>
    );
  }
}
