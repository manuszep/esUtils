import React, { Component, FormEvent, MouseEvent } from "react";
import Classnames from "classnames";

import {
  Translation as T,
  Icon
} from "local";

export type FieldTooltipPropsType = {
  help: string
}

export type FieldTooltipStateType = {
  toggled: boolean
}

export class FieldTooltip extends Component<FieldTooltipPropsType, FieldTooltipStateType> {
  constructor(props: FieldTooltipPropsType) {
    super(props);

    this.state = {
      "toggled": false
    };
  }

  handleBlur(e: FormEvent) {
    e.preventDefault();

    this.setState({
      "toggled": false
    });
  }

  handleClick(e: MouseEvent<any>) {
    e.preventDefault();

    const { toggled } = this.state;

    this.setState({
      "toggled": !toggled
    });
  }

  render() {
    const { help } = this.props;
    const { toggled } = this.state;
    const cls = Classnames("form-group__help-icon", { "toggled": toggled });

    if (typeof help !== 'undefined') {
      return (
        <div className="form-group__help-wrapper">
          <a
            href="#"
            key="0"
            className={cls}
            tabIndex={-1}
            onBlur={e => this.handleBlur(e)}
            onClick={e => this.handleClick(e)}>
            <Icon name="info-circle" />
          </a>
          <div key="1" className="form-group__help__content">
            <T tag="div">{help}</T>
          </div>
        </div>
      );
    }
    return null;
  }
}
