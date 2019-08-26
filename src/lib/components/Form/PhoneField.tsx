import React, { Component, FormEvent, Dispatch } from "react";
import { connect } from "react-redux";
import className from "classnames";

import {
  Translation as T,
  changeField as changeFieldAction,
  constructPhoneNumber,
  phoneCountriesList,
  wrapMapStateToProps,
  FieldInline,
  KeyedObject
} from "../../../index";

export type PhoneFieldPropsType = {
  lang: "FR" | "NL",
  prefixFieldValue: string,
  fieldSubmitted: boolean,
  numberFieldErrorMsg: string,
  fullFieldErrorMsg: string,
  lineNumberTouched: boolean,
  addPrefixToPhone: Function,
  numberFieldValue: string,
  label: string,
  name: string,
  onChange: Function
}

class PhoneFieldComponent extends Component<PhoneFieldPropsType, KeyedObject> {
  _isMounted: boolean;

  static getPrefixField(name: string) {
    return `${name}_PHONE_PREFIX`;
  }

  static getNumberField(name: string) {
    return `${name}_PHONE_LINE_NUMBER`;
  }

  static getFullField(name: string) {
    return `${name}_PHONE_NUMBER`;
  }

  static getErrorMessage(name: string) {
    return `${name}_PHONE_NUMBER_INVALID`;
  }

  constructor(props: PhoneFieldPropsType) {
    super(props);
    this._isMounted = false;

    const { prefixFieldValue } = this.props;

    this.state = {
      "prefix": prefixFieldValue || "+32",
      "flag": this.findFlag(prefixFieldValue || "+32"),
      "prefixListOpen": false
    };
  }

  componentDidMount() {
    document.addEventListener('click', (e: MouseEvent) => { this.handleClickOutside(e); }, true);
    this._isMounted = true;
  }

  componentWillUnmount() {
    document.removeEventListener('click', (e: MouseEvent) => { this.handleClickOutside(e); }, true);
    this._isMounted = false;
  }

  getPrefixOptions() {
    const { prefix } = this.state;
    const { lang } = this.props;
    const options = [];

    for (let i = 0; i < phoneCountriesList.length; i += 1) {
      const item: KeyedObject = phoneCountriesList[i];

      if (item.name === "") {
        options.push(<li key="phone_empty_prefix" className="phone-input__prefix__option phone-input__prefix__option--disabled"><hr /></li>);
      } else {
        const selected = item.dial_code === prefix;
        const cls = ["phone-input__prefix__option"];

        if (selected) {
          cls.push("phone-input__prefix__option--selected");
        }
        options.push(
          <li key={item.name[lang]} className={cls.join(" ")}>
            <a
              data-value={i}
              href="#"
              tabIndex={-1}
              onClick={(e) => { this.handlePrefixChange(e); }}>
              {item.flag}


              &nbsp;
              {item.name[lang]}
            </a>
          </li>
        );
      }
    }

    return options;
  }

  getErrorMessage() {
    const {
      fieldSubmitted,
      numberFieldErrorMsg,
      fullFieldErrorMsg,
      lineNumberTouched
    } = this.props;

    if ((numberFieldErrorMsg || fullFieldErrorMsg) && (fieldSubmitted || lineNumberTouched)) {
      return (
        <div className="form-control-feedback cy-error">{numberFieldErrorMsg || fullFieldErrorMsg}</div>
      );
    }

    return null;
  }

  handleClickOutside(e: MouseEvent) {
    if (!this._isMounted) return;

    this.setState({ "prefixListOpen": false });
  }

  findFlag(prefix: string) {
    for (let i = 0; i < phoneCountriesList.length; i += 1) {
      const item = phoneCountriesList[i];

      if (item.dial_code === prefix) {
        return item.flag;
      }
    }

    return "";
  }

  handleKeyPress(e: KeyboardEvent) {
    const c = (typeof e.which === "number") ? e.which : e.keyCode;
    const fld = e.target as HTMLInputElement;
    const val = fld.value;

    if (c < 48 // 47 = /, 48 = 0, 49 = 1 ...
      || c > 57 // 57 = 9
      || c === 32 // 32 = space
      || (val.length === 0 && c === 48)) { // Max 9 chars for Belgian mobile phone
      e.preventDefault();
    }
  }

  handlePrefixChange(e: any) {
    e.preventDefault();

    const { addPrefixToPhone, numberFieldValue } = this.props;

    const key = e.target.dataset.value;
    const country = phoneCountriesList[key];

    this.setState({ "flag": country.flag });
    this.setState({ "prefixListOpen": false });
    this.setState({ "prefix": country.dial_code }, () => {
      addPrefixToPhone(country.dial_code, numberFieldValue);
    });
  }

  handlePhonePrefixClick(e: any) {
    e.preventDefault();
    e.stopPropagation();

    const { prefixListOpen } = this.state;

    this.setState({ "prefixListOpen": !prefixListOpen });
  }

  updatePhoneNumber(e: any) {
    const { prefix } = this.state;
    const { addPrefixToPhone } = this.props;

    let newPhone = e.target.value;

    newPhone = newPhone.replace(/\s/g, '');
    addPrefixToPhone(prefix, newPhone);
  }

  render() {
    const {
      label,
      name,
      onChange
    } = this.props;

    const {
      prefixListOpen,
      flag,
      prefix
    } = this.state;
    const id = `${PhoneField.getFullField(name)}Fld`;
    const cls = className("phone-input", {
      "phone-input--prefix-open": prefixListOpen
    });

    const errorMessage = this.getErrorMessage();
    const formGroupClassName = className("form-group", errorMessage ? "has-danger" : "");

    return (
      <div className={formGroupClassName}>
        <label htmlFor={id}>
          <T>{label}</T>
        </label>
        <div className={cls}>
          <div className="phone-input__prefix">
            <div
              role="button"
              tabIndex={-1}
              onClick={e => this.handlePhonePrefixClick(e)}
              onKeyPress={e => this.handlePhonePrefixClick(e)}
              className="phone-input__prefix__value">
              {flag}


              &nbsp;
              {prefix}
            </div>
            <ul className="phone-input__prefix__list">
              {this.getPrefixOptions()}
            </ul>
          </div>
          <FieldInline
            className="form-control phone-input__field"
            type="text"
            name={PhoneField.getNumberField(name)}
            placeholder="PHONE_NUMBER_PLACEHOLDER"
            onKeyPress={(e: any) => this.handleKeyPress(e)}
            onBlur={(e: any) => this.updatePhoneNumber(e)}
            onChange={onChange} />
        </div>
        {errorMessage}
      </div>
    );
  }
}

const mapStateToProps = (state: KeyedObject, ownProps: KeyedObject): KeyedObject => {
  const commonItems = {
    "lang": state.pageState.lang
  };
  const appItems = {
    "prefixFieldValue": PhoneField.getPrefixField(ownProps.name),
    "numberFieldValue": PhoneField.getNumberField(ownProps.name)
  };
  const syncErrorItems = {
    "fullFieldErrorMsg": PhoneField.getFullField(ownProps.name),
    "numberFieldErrorMsg": PhoneField.getNumberField(ownProps.name)
  };
  const fieldItems = {
    "lineNumberTouched": (fields: any) => { return fields[PhoneField.getNumberField(ownProps.name)] ? fields[PhoneField.getNumberField(ownProps.name)].touched : false; }
  };
  return wrapMapStateToProps(state, commonItems, appItems);
};

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: KeyedObject) => ({
  "addPrefixToPhone": (prefix: string, number: string) => {
    dispatch(changeFieldAction(PhoneField.getPrefixField(ownProps.name), prefix));
    dispatch(changeFieldAction(PhoneField.getFullField(ownProps.name), constructPhoneNumber(prefix, number)));
  }
});

export const PhoneField = connect(mapStateToProps, mapDispatchToProps)(PhoneFieldComponent);
