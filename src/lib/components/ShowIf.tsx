import React, { Component } from "react";
import { shouldShowIf } from "../display";

export type ShowIfComponentPropsType = {
  condition: boolean,
  className: string
}

export class ShowIf extends Component<ShowIfComponentPropsType, {}> {
  render() {
    const { condition, children, className } = this.props;
    const shouldShow = (typeof condition !== "boolean") ? true : condition;

    return (
      <div {...shouldShowIf(shouldShow)} className={className}>
        {children}
      </div>
    );
  }
}
