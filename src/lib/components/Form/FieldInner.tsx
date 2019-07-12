import React, { Component } from "react";
import classNames from "classnames";
import { Translation as T, getTranslation } from "../TranslationComponent";
import { ShowIf } from "../ShowIf";
import { FieldTooltip } from "./FieldTooltip";
import {
  Select,
  RadioGroup,
  CheckBox,
  Toggle,
  Radio,
  PaymentMethod
} from "./InputTypes";
import { KeyedObject } from "../../types";

export class FieldInner extends Component<KeyedObject> {
  getMarkup() {
    const {
      help,
      id,
      name,
      input,
      label,
      maxLength,
      placeholder,
      tag,
      type,
      className,
      showIf,
      fieldSubmitted,
      addonBefore,
      addonAfter,
      meta,
      labelHelp,
      inputRef,
      afterRef,
      replacements,
      customError,
      ...rest
    } = this.props;

    const tagId = id || name;
    const tagType = type || "text";
    const baseFieldClass = "form-control";

    let TagComponent;

    switch (type) {
      case "select":
        TagComponent = Select;
        break;

      case "radio":
        TagComponent = Radio;
        break;

      case "radio_group":
        TagComponent = RadioGroup;
        break;

      case "checkbox":
        TagComponent = CheckBox;
        break;

      case "toggle":
        TagComponent = Toggle;
        break;

      case "payment_methods":
        TagComponent = PaymentMethod;
        break;

      default:
        TagComponent = tag || "input";
    }

    const hasError = (meta.error || customError);

    let errorMsg;
    let groupCls = `form-group cy-field-${input ? input.name : name}`;
    let inputCls = classNames(baseFieldClass, "", className);

    if (meta.touched || fieldSubmitted) {
      errorMsg = (hasError) ? <div className="form-control-feedback cy-error">{meta.error || customError}</div> : null;
      groupCls = classNames("form-group", { "has-danger": hasError }, `cy-field-${input ? input.name : name}`);
      inputCls = classNames(baseFieldClass, { "form-control-danger": hasError }, className);
    }

    const disabled = !(typeof showIf === "undefined" || showIf);
    const labelHelpText = (typeof labelHelp === "undefined")
      ? "" : (
        <small>
          <T>
            {labelHelp}
          </T>
        </small>
      );

    const showLabel = typeof label !== 'undefined'
      && type !== "checkbox"
      && type !== "radio"
      && type !== "toggle"
      && type !== "phone";

    return (
      <div className={groupCls}>
        {showLabel && (
          <label htmlFor={tagId}>
            <T replacements={replacements}>{label}</T>
            {labelHelpText}
          </label>
        )}
        {this.renderFieldTag(
          TagComponent,
          addonBefore,
          addonAfter,
          inputRef,
          afterRef,
          <FieldTooltip help={help} />,
          {
            ...input,
            "id": tagId,
            "className": inputCls,
            "type": tagType,
            "maxLength": maxLength,
            "placeholder": getTranslation(placeholder),
            "label": label,
            "disabled": disabled,
            "replacements": replacements,
            ...rest
          }
        )}
        {errorMsg}
      </div>
    );
  }

  renderFieldTag(Tag: any, addonBefore: string, addonAfter: string, inputRef: any, afterRef: any, tooltip: any, props: KeyedObject) {
    const tagProps = Object.assign({}, props);

    // Remove properties that native elements do not support
    if (typeof Tag === "string" || Tag === Select) {
      delete tagProps.replacements;
      delete tagProps.changeField;
      delete tagProps.validationMessages;
      delete tagProps.dispatch;
    }

    if (
      (typeof addonBefore === "undefined" || addonBefore === null || addonBefore.length < 1)
      && (typeof addonAfter === "undefined" || addonAfter === null || addonAfter.length < 1)) {
      return (
        <div className="form-group__field">
          <Tag ref={inputRef} {...tagProps} />
          {tooltip}
        </div>
      );
    }

    return (
      <div className="form-group__field">
        <div className="input-group-addon-wrapper">
          {addonBefore && <span className="input-group-addon">{addonBefore}</span>}
          <Tag ref={inputRef} {...tagProps} />
          {addonAfter && <span className="input-group-addon last-child" ref={afterRef}>{addonAfter}</span>}
        </div>
        {tooltip}
      </div>
    );
  }

  render() {
    const { showIf } = this.props;
    const shouldUseShowIf = (typeof showIf === "boolean");

    return (shouldUseShowIf) ? <ShowIf condition={showIf}>{this.getMarkup()}</ShowIf> : this.getMarkup();
  }
}
