import React, { Component } from "react";
import classNames from "classnames";

import { Field, KeyedObject } from "../../../index";

export class FieldInline extends Component<KeyedObject, {}> {
  render() {
    const {
      className,
      sizeXs,
      sizeSm,
      sizeMd,
      sizeLg,
      sizeXl,
      ...rest
    } = this.props;

    const baseFieldClass = "form-control";

    const sizeXsCls = (typeof sizeXs !== "undefined" && sizeXs !== "") ? `col-${sizeXs}` : "";
    const sizeSmCls = (typeof sizeSm !== "undefined" && sizeSm !== "") ? `col-sm-${sizeSm}` : "";
    const sizeMdCls = (typeof sizeMd !== "undefined" && sizeMd !== "") ? `col-md-${sizeMd}` : "";
    const sizeLgCls = (typeof sizeLg !== "undefined" && sizeLg !== "") ? `col-lg-${sizeLg}` : "";
    const sizeXlCls = (typeof sizeXl !== "undefined" && sizeXl !== "") ? `col-xl-${sizeXl}` : "";

    const groupCls = classNames(sizeXsCls, sizeSmCls, sizeMdCls, sizeLgCls, sizeXlCls, {
      "col": sizeXsCls === "" && sizeSmCls === "" && sizeMd === "" && sizeLg === "" && sizeXlCls === ""
    }, "form-compact-row__col");
    const inputCls = classNames(baseFieldClass, "", className);

    return (
      <div className={groupCls}>
        <Field
          className={inputCls}
          {...rest} />
      </div>
    );
  }
}
