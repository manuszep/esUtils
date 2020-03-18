import React, { Component, FormEvent, CSSProperties } from "react";
import ReactAutocomplete from "react-autocomplete";
import classNames from "classnames";
import { connect } from "react-redux";

import { shouldShowIf, getTranslation } from "../../../../index";

const menuStyles = {
  "borderRadius": "3px",
  "boxShadow": "0 2px 12px rgba(0, 0, 0, 0.1)",
  "background": "rgba(255, 255, 255, 0.9)",
  "padding": "0",
  "fontSize": "90%",
  "position": "absolute",
  "top": "100%",
  "left": "0",
  "overflow": "auto",
  "maxHeight": "50vh", // TODO: don"t cheat, let it flow to the bottom
  "zIndex": "9999"
};

class AutocompleteComponent extends Component<Record<string, any>, Record<string, any>> {
  constructor(props: Record<string, any>) {
    super(props);
    this.state = {
      "value": "",
      "hasError": false
    };
  }

  onChange(event: FormEvent, value: string) {
    this.setState({ "value": value });
  }

  hasValidationMessages(field: string) {
    const { validationMessages } = this.props;

    return !(typeof validationMessages === "undefined" || !validationMessages[field]);
  }

  handleBlur(field: string) {
    this.setState({ "hasError": false });

    if (!this.hasValidationMessages(field)) return;

    this.setState({ "hasError": true });
  }

  showErrorMessage(field: string) {
    if (!this.hasValidationMessages(field)) return null;
    const { validationMessages } = this.props;

    return (
      <div className="form-control-feedback cy-error">
        <div className="form-control-error-message">{validationMessages[field]}</div>
      </div>
    );
  }

  fieldHasError(field: string) {
    return (!this.hasValidationMessages(field)) ? null : true;
  }

  render() {
    const {
      input,
      id,
      maxLength,
      placeholder,
      shouldItemRender,
      items,
      getValue,
      name,
      fieldSubmitted,
      validationMessages,
      dispatch,
      sizeMd,
      sizeLg,
      sizeXl,
      onChange,
      onSelect,
      ...rest
    } = this.props;

    const { hasError, value } = this.state;

    const cypressClass = `cy-field-${name}`;
    const groupCls = classNames(
      "has-autocomplete form-compact-row__col",
      { "has-danger": (this.fieldHasError(name)) && (hasError || fieldSubmitted) },
      cypressClass
    );

    const sizeMdCls = (typeof sizeMd !== "undefined" && sizeMd !== "") ? `col-md-${sizeMd}` : "";
    const sizeLgCls = (typeof sizeLg !== "undefined" && sizeLg !== "") ? `col-lg-${sizeLg}` : "";
    const sizeXlCls = (typeof sizeXl !== "undefined" && sizeXl !== "") ? `col-xl-${sizeXl}` : "";

    const test = classNames(
      sizeMdCls,
      sizeLgCls,
      sizeXlCls,
      {
        "col": sizeMd === "" && sizeLg === "" && sizeXlCls === ""
      },
      groupCls
    );

    return (
      <div className={test}>
        <ReactAutocomplete
          wrapperProps={{ "className": "form-group" }}
          wrapperStyle={{ "position": "relative" }}
          menuStyle={menuStyles as CSSProperties}
          getItemValue={(item) => item.value}
          shouldItemRender={shouldItemRender || shouldItemRender}
          items={items}
          value={getValue() || value}
          onChange={onChange}
          onSelect={onSelect}
          renderItem={(item, isHighlighted) => (
            <div
              key={item.value}
              className={classNames("autocomplete-item", { "autocomplete-item--active": isHighlighted })}>
              {item.label}
            </div>
          )}
          {...rest}
          inputProps={{
            ...input,
            "id": id,
            "className": "form-control", /* TODO: validation? */
            "type": "text",
            "maxLength": maxLength,
            "placeholder": getTranslation(placeholder),
            "onBlur": () => this.handleBlur(name),
            "autoComplete": "off",
            ...rest
          }}
        />
        <div {...shouldShowIf(hasError || fieldSubmitted)}>
          {this.showErrorMessage(name)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Record<string, any>) => ({
  "validationMessages": state.form.app ? state.form.app.syncErrors || [] : []
});

export const Autocomplete = connect<Record<string, any>, null, Record<string, any>>(
  mapStateToProps,
  null
)(AutocompleteComponent);
