/* This is a group of fields to capture an address.
All grouped in the same component for reusability */
import React, { Component, FormEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import axios from "axios";
import { change as reduxFormChange } from "redux-form";


import { Translation as T } from "../../TranslationComponent";
import { Field } from "../Field";
import { Autocomplete } from "../InputTypes/Autocomplete";
import { FieldInline } from "../FieldInline";
import { FieldTooltip } from "../FieldTooltip";
import { ShowIf } from "../../ShowIf";
import { getTranslation } from "../../TranslationComponent";
import { getAppGlobalVar } from "../../../globalVars";
import { KeyedObject } from "../../../types";
import { changeField } from "../../../actions/form";
import {
  updateAutoCompleteCities,
  updateAutoCompleteStreets
} from "./actions/addressFieldActions";
import { wrapMapStateToProps } from "../../../state";

class AddressFieldComponent extends Component<KeyedObject, KeyedObject> {
  timer: any;

  static getFieldsNames(name: string) {
    return [
      `${name}_STREET`,
      `${name}_STREET_NR`,
      `${name}_BOX_NR`,
      `${name}_POSTAL_CODE`,
      `${name}_CITY`,
      `${name}_STREET_ID`
    ];
  }

  static getFieldsNamesDictionary(name: string) {
    return {
      "street": `${name}_STREET`,
      "streetNr": `${name}_STREET_NR`,
      "boxNr": `${name}_BOX_NR`,
      "postalCode": `${name}_POSTAL_CODE`,
      "city": `${name}_CITY`,
      "streetId": `${name}_STREET_ID`
    };
  }

  constructor(props: KeyedObject) {
    super(props);
    this.state = {
      "countries": { "status": "waiting", "message": null }
    };
  }

  componentDidMount() {
    const { lang } = this.props;
    this.fetchCountries(lang);
  }

  componentWillReceiveProps(nextProps: KeyedObject) {
    const { lang } = this.props;
    // Update countries list if the language is different
    if (nextProps.lang !== lang) {
      this.fetchCountries(nextProps.lang);
    }
  }

  onChangeCities(value: string) {
    const { name, changeField, updateCities } = this.props;
    changeField(`${name}_CITY`, value);

    if (value && value.length >= 3) {
      // we only want to make a call once every 250ms
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        updateCities(this.getPostalCode(), value);
      }, 250);
    }
  }

  onChangeStreets(value: string) {
    const { name, changeField, updateStreets } = this.props;
    changeField(`${name}_STREET`, value);

    if (value && value.length >= 3) {
      // we only want to make a call once every 250ms
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        updateStreets(this.getPostalCode(), this.getCity(), value);
      }, 250);
    }
  }

  getPostalCode() {
    const { valuePostalCode } = this.props;

    return valuePostalCode;
  }

  getCity() {
    const { valueCity } = this.props;

    return valueCity;
  }

  getStreet() {
    const { valueStreet } = this.props;

    return valueStreet;
  }

  getOptionsMarkup(optionsData: Array<string | KeyedObject>) {
    const options = optionsData;
    return options.map((option, key) => {
      const opt = (typeof option === "string") ? { "label": option, "value": option } : option;
      const uniqueId = `option${key}`;

      return (
        <T tag="option" key={uniqueId} value={opt.value}>{opt.label}</T>
      );
    });
  }

  getCountriesField(name: string, id: string) {
    let optsMarkup;
    let disabled = false;
    const fldName = `${name}_COUNTRY`;
    const { countries } = this.state;
    const { stepSubmitted } = this.props;

    // By default, the status is "waiting". Display a disabled select input
    if (countries.status === "waiting") {
      return (
        <select
          name={fldName}
          disabled>
          {this.getOptionsMarkup(["FLD_ADDRESS_COUNTRY_DISABLED"])}
        </select>
      );
    }

    // If there's an error in the request, display the error message
    if (countries.status === "error") {
      return (<div>{countries.message}</div>);
    }

    // Otherwise, we should get some results. Build the options array.
    const opts = countries.message.map((item: KeyedObject) => {
      return { "value": item.value, "label": item.title };
    });

    // If there's only one option, set it as current value and disable field.
    if (opts.length === 1) {
      disabled = true;
      optsMarkup = opts;
    } else {
      optsMarkup = [{ "value": null, "label": "FLD_ADDRESS_COUNTRY_DEFAULT" }].concat(opts); // Add empty value to array
    }

    return (
      <Field
        type="select"
        name={fldName}
        id={`${id}_COUNTRY`}
        disabled={disabled}
        options={optsMarkup}
        fieldSubmitted={stepSubmitted} />
    );
  }

  // Fetch countries list
  fetchCountries(lang: string) {
    const { dispatchFieldChange, name } = this.props;

    axios
      .get(getAppGlobalVar().endpoints.getCountries.replace("%%lang%%", lang))
      .then((resp) => {
        const { data } = resp;

        if (Array.isArray(data)) {
          this.setState({ "countries": { "status": "success", "message": data } });
          if (data.length === 1) {
            dispatchFieldChange(`${name}_COUNTRY`, data[0].value);
          }
        } else {
          this.setState({ "countries": { "status": "error", "message": [] } });
        }
      })
      .catch(() => {
        this.setState({ "countries": { "status": "error", "message": [] } });
      });
  }

  handleOnChange(e: FormEvent) {
    const { onChange } = this.props;

    if (typeof onChange === "function") {
      onChange(e);
    }
  }

  handleZipKeyPress(e: KeyboardEvent) {
    const c = (typeof e.which === "number") ? e.which : e.keyCode;
    const fld = e.target as HTMLInputElement;
    const val = fld.value;

    if (c < 48 // 47 = /, 48 = 0, 49 = 1 ...
      || c > 57 // 57 = 9
      || (val.length >= 4)) { // Max 4 chars for Belgian Zip
      e.preventDefault();
    }
  }

  handleNumberKeyPress(e: KeyboardEvent) {
    const fld = e.target as HTMLInputElement;
    const val = fld.value;

    if (val.length >= 4) {
      e.preventDefault();
    }
  }

  render() {
    const {
      name,
      id,
      label,
      help,
      fieldSubmitted,
      changeField,
      updateCities,
      updateStreets,
      autocompleteCities,
      autocompleteStreets,
      autocompleteFullData,
      fldParentOrStudent
    } = this.props;

    const tagId = id || name;

    return (
      <div className="form-group form-group--compact">
        <T tag="label">{label}</T>
        <div className="form-group__field">
          <div className="form-group__field-cloud">
            <ShowIf condition={false}>
              {this.getCountriesField(name, id)}
            </ShowIf>

            <div className="row form-compact-row">
              <FieldInline
                className="form-control--no-spinner"
                sizeLg="4"
                name={`${name}_POSTAL_CODE`}
                id={`${tagId}_ZIP`}
                type="number"
                maxLength={4}
                placeholder={getTranslation(`FLD_ADDRESS_POSTAL_CODE_PLACEHOLDER`)}
                fieldSubmitted={fieldSubmitted}
                onKeyPress={(e: KeyboardEvent) => this.handleZipKeyPress(e)}
                onChange={(e: FormEvent) => this.handleOnChange(e)} />

              <Autocomplete
                sizeLg="8"
                name={`${name}_CITY`}
                id={`${tagId}_CITY`}
                maxLength={35}
                type="text"
                placeholder={getTranslation(`FLD_ADDRESS_CITY_PLACEHOLDER`)}
                fieldSubmitted={fieldSubmitted}
                onFocus={(e: any) => updateCities(this.getPostalCode(), e.target.value)}
                items={autocompleteCities}
                onChange={(e: any) => {
                  this.onChangeCities(e.target.value);
                  this.handleOnChange(e);
                }}
                onBlur={
                  (e: any) => {
                    const foundResult = autocompleteCities.find(
                      (item: KeyedObject) => {
                        return (
                          item.label
                            .substring(0, item.label.length - 6)
                            .toLowerCase()
                            .includes(e.target.value.toLowerCase())
                        );
                      }
                    );
                    if (foundResult) {
                      const streetLookup = autocompleteFullData
                        .find((item: KeyedObject) => item.ID === foundResult.value);
                      this.onChangeCities(streetLookup.CITY);
                      this.handleOnChange(e);
                    }
                  }
                }
                onSelect={(e: any, value: KeyedObject) => {
                  if (typeof value === "undefined") return;
                  const postalCodeLookup = autocompleteFullData
                    .find((item: KeyedObject) => item.ID === value.value);
                  if (typeof postalCodeLookup !== "undefined") {
                    const CITY = postalCodeLookup.CITY;
                    const POSTAL_CODE = postalCodeLookup.POSTAL_CODE;
                    changeField(`${name}_POSTAL_CODE`, POSTAL_CODE);
                    changeField(`${name}_CITY`, CITY);
                    this.handleOnChange(e);
                  }
                }}
                shouldItemRender={(item: KeyedObject, value: string) => {
                  return value.length >= 3 || this.getPostalCode();
                }}
                getValue={() => this.getCity()} />

            </div>

            <div className="row form-compact-row">
              <Autocomplete
                sizeXl="8"
                name={`${name}_STREET`}
                id={`${tagId}_STREET`}
                type="text"
                maxLength={33}
                placeholder={getTranslation(`FLD_ADDRESS_STREET_PLACEHOLDER`)}
                fieldSubmitted={fieldSubmitted}
                onFocus={(e: any) => updateStreets(
                  this.getPostalCode(),
                  this.getCity(),
                  e.target.value
                )}
                items={autocompleteStreets}
                onChange={(e: any) => {
                  this.onChangeStreets(e.target.value);
                  this.handleOnChange(e);
                }}
                getValue={() => this.getStreet()}
                onSelect={(e: any, value: KeyedObject) => {
                  if (typeof value === "undefined") return;
                  const streetLookup = autocompleteFullData.find((item: KeyedObject) => item.ID === value.value);
                  if (typeof streetLookup !== "undefined") {
                    const STREET = streetLookup.STREET;
                    const CITY = streetLookup.CITY;
                    const POSTAL_CODE = streetLookup.POSTAL_CODE;
                    changeField(`${name}_STREET`, STREET);
                    changeField(`${name}_POSTAL_CODE`, POSTAL_CODE);
                    changeField(`${name}_CITY`, CITY);
                    this.handleOnChange(e);
                  }
                }} />

              <FieldInline
                sizeLg="6"
                sizeXl="2"
                name={`${name}_STREET_NR`}
                id={`${tagId}_STREET_NR`}
                type="text"
                maxLength={5}
                placeholder={getTranslation(`FLD_ADDRESS_STREET_NUMBER_PLACEHOLDER`)}
                fieldSubmitted={fieldSubmitted}
                onKeyPress={(e: any) => this.handleNumberKeyPress(e)}
                onChange={(e: any) => this.handleOnChange(e)} />

              <FieldInline
                sizeLg="6"
                sizeXl="2"
                name={`${name}_BOX_NR`}
                id={`${tagId}_STREET_BOX`}
                type="text"
                maxLength="3"
                placeholder={getTranslation(`FLD_ADDRESS_STREET_BOX_PLACEHOLDER`)}
                fieldSubmitted={fieldSubmitted}
                onChange={(e: any) => this.handleOnChange(e)} />

            </div>

          </div>
          <FieldTooltip help={help} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: KeyedObject, ownProps: KeyedObject) => {
  const commonItems = {
    "lang": state.pageState.lang,
    "autocompleteCities": state.address.autocomplete_cities,
    "autocompleteStreets": state.address.autocomplete_streets,
    "autocompleteFullData": state.address.autocomplete_full_data
  };
  const appItems = {
    "valuePostalCode": `${ownProps.name}_POSTAL_CODE`,
    "valueCity": `${ownProps.name}_CITY`,
    "valueStreet": `${ownProps.name}_STREET`
  };
  return wrapMapStateToProps(state, commonItems, appItems);
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  "dispatchFieldChange": (fld: string, value: string) => {
    dispatch(reduxFormChange("app", fld, value));
  },
  "updateCities": (postalCodeText: string, townText: string) => {
    dispatch<any>(updateAutoCompleteCities(postalCodeText, townText));
  },
  "updateStreets": (postalCodeText: string, cityText: string, streetText: string) => {
    dispatch<any>(updateAutoCompleteStreets(postalCodeText, cityText, streetText));
  },
  "changeField": (fieldName: string, fieldValue: string) => {
    dispatch(changeField(fieldName, fieldValue));
  }
});

export const AddressField = connect(mapStateToProps, mapDispatchToProps)(AddressFieldComponent);
