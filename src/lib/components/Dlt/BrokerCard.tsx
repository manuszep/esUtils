import React, { Component } from "react";
import classNames from "classnames";

import {
  Translation as T,
  ShowIf,
  composeFullAddress,
  KeyedObject
} from "local";

export class BrokerCard extends Component<KeyedObject> {
  render() {
    const {
      id,
      title,
      name,
      street,
      streetNumber,
      postalCode,
      city,
      showActions,
      actionLabel,
      actionHandler,
      actionClass
    } = this.props;

    const address = composeFullAddress(street, streetNumber, "", "", postalCode, city);
    const btnClassName = classNames("btn btn-ghost btn-sm", actionClass);

    return (
      <div key={id} className="broker-card">
        {title && <T tag="h3" className="broker-card__heading">{title}</T>}

        <div className="broker-card__details">
          <p className="broker-card__details__name">{name}</p>
          <T tag="p" className="broker-card__details__address">{address}</T>
        </div>

        <ShowIf condition={showActions !== false} className="broker-card__actions">
          <T
            tag="button"
            className={btnClassName}
            onClick={(e: Event) => actionHandler(e)}>
            {actionLabel}
          </T>
        </ShowIf>
      </div>
    );
  }
}
