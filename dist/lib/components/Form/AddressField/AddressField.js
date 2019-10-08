"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* This is a group of fields to capture an address.
All grouped in the same component for reusability */
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var axios_1 = __importDefault(require("axios"));
var redux_form_1 = require("redux-form");
var index_1 = require("../../../../index");
var AddressFieldComponent = /** @class */ (function (_super) {
    __extends(AddressFieldComponent, _super);
    function AddressFieldComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            "countries": { "status": "waiting", "message": null }
        };
        return _this;
    }
    AddressFieldComponent.getFieldsNames = function (name) {
        return [
            name + "_STREET",
            name + "_STREET_NR",
            name + "_BOX_NR",
            name + "_POSTAL_CODE",
            name + "_CITY",
            name + "_STREET_ID"
        ];
    };
    AddressFieldComponent.getFieldsNamesDictionary = function (name) {
        return {
            "street": name + "_STREET",
            "streetNr": name + "_STREET_NR",
            "boxNr": name + "_BOX_NR",
            "postalCode": name + "_POSTAL_CODE",
            "city": name + "_CITY",
            "streetId": name + "_STREET_ID"
        };
    };
    AddressFieldComponent.prototype.componentDidMount = function () {
        var lang = this.props.lang;
        this.fetchCountries(lang);
    };
    AddressFieldComponent.prototype.componentWillReceiveProps = function (nextProps) {
        var lang = this.props.lang;
        // Update countries list if the language is different
        if (nextProps.lang !== lang) {
            this.fetchCountries(nextProps.lang);
        }
    };
    AddressFieldComponent.prototype.onChangeCities = function (value) {
        var _this = this;
        var _a = this.props, name = _a.name, changeField = _a.changeField, updateCities = _a.updateCities;
        changeField(name + "_CITY", value);
        if (value && value.length >= 3) {
            // we only want to make a call once every 250ms
            clearTimeout(this.timer);
            this.timer = setTimeout(function () {
                updateCities(_this.getPostalCode(), value);
            }, 250);
        }
    };
    AddressFieldComponent.prototype.onChangeStreets = function (value) {
        var _this = this;
        var _a = this.props, name = _a.name, changeField = _a.changeField, updateStreets = _a.updateStreets;
        changeField(name + "_STREET", value);
        if (value && value.length >= 3) {
            // we only want to make a call once every 250ms
            clearTimeout(this.timer);
            this.timer = setTimeout(function () {
                updateStreets(_this.getPostalCode(), _this.getCity(), value);
            }, 250);
        }
    };
    AddressFieldComponent.prototype.getPostalCode = function () {
        var valuePostalCode = this.props.valuePostalCode;
        return valuePostalCode;
    };
    AddressFieldComponent.prototype.getCity = function () {
        var valueCity = this.props.valueCity;
        return valueCity;
    };
    AddressFieldComponent.prototype.getStreet = function () {
        var valueStreet = this.props.valueStreet;
        return valueStreet;
    };
    AddressFieldComponent.prototype.getOptionsMarkup = function (optionsData) {
        var options = optionsData;
        return options.map(function (option, key) {
            var opt = (typeof option === "string") ? { "label": option, "value": option } : option;
            var uniqueId = "option" + key;
            return (react_1.default.createElement(index_1.Translation, { tag: "option", key: uniqueId, value: opt.value }, opt.label));
        });
    };
    AddressFieldComponent.prototype.getCountriesField = function (name, id) {
        var optsMarkup;
        var disabled = false;
        var fldName = name + "_COUNTRY";
        var countries = this.state.countries;
        var stepSubmitted = this.props.stepSubmitted;
        // By default, the status is "waiting". Display a disabled select input
        if (countries.status === "waiting") {
            return (react_1.default.createElement("select", { name: fldName, disabled: true }, this.getOptionsMarkup(["FLD_ADDRESS_COUNTRY_DISABLED"])));
        }
        // If there's an error in the request, display the error message
        if (countries.status === "error") {
            return (react_1.default.createElement("div", null, countries.message));
        }
        // Otherwise, we should get some results. Build the options array.
        var opts = countries.message.map(function (item) {
            return { "value": item.value, "label": item.title };
        });
        // If there's only one option, set it as current value and disable field.
        if (opts.length === 1) {
            disabled = true;
            optsMarkup = opts;
        }
        else {
            optsMarkup = [{ "value": null, "label": "FLD_ADDRESS_COUNTRY_DEFAULT" }].concat(opts); // Add empty value to array
        }
        return (react_1.default.createElement(index_1.Field, { type: "select", name: fldName, id: id + "_COUNTRY", disabled: disabled, options: optsMarkup, fieldSubmitted: stepSubmitted }));
    };
    // Fetch countries list
    AddressFieldComponent.prototype.fetchCountries = function (lang) {
        var _this = this;
        var _a = this.props, dispatchFieldChange = _a.dispatchFieldChange, name = _a.name;
        axios_1.default
            .get(index_1.getAppGlobalVar().endpoints.getCountries.replace("%%lang%%", lang))
            .then(function (resp) {
            var data = resp.data;
            if (Array.isArray(data)) {
                _this.setState({ "countries": { "status": "success", "message": data } });
                if (data.length === 1) {
                    dispatchFieldChange(name + "_COUNTRY", data[0].value);
                }
            }
            else {
                _this.setState({ "countries": { "status": "error", "message": [] } });
            }
        })
            .catch(function () {
            _this.setState({ "countries": { "status": "error", "message": [] } });
        });
    };
    AddressFieldComponent.prototype.handleOnChange = function (e) {
        var onChange = this.props.onChange;
        if (typeof onChange === "function") {
            onChange(e);
        }
    };
    AddressFieldComponent.prototype.handleZipKeyPress = function (e) {
        var c = (typeof e.which === "number") ? e.which : e.keyCode;
        var fld = e.target;
        var val = fld.value;
        if (c < 48 // 47 = /, 48 = 0, 49 = 1 ...
            || c > 57 // 57 = 9
            || (val.length >= 4)) { // Max 4 chars for Belgian Zip
            e.preventDefault();
        }
    };
    AddressFieldComponent.prototype.handleNumberKeyPress = function (e) {
        var fld = e.target;
        var val = fld.value;
        if (val.length >= 4) {
            e.preventDefault();
        }
    };
    AddressFieldComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props, name = _a.name, id = _a.id, label = _a.label, help = _a.help, fieldSubmitted = _a.fieldSubmitted, changeField = _a.changeField, updateCities = _a.updateCities, updateStreets = _a.updateStreets, autocompleteCities = _a.autocompleteCities, autocompleteStreets = _a.autocompleteStreets, autocompleteFullData = _a.autocompleteFullData;
        var tagId = id || name;
        return (react_1.default.createElement("div", { className: "form-group form-group--compact" },
            react_1.default.createElement(index_1.Translation, { tag: "label" }, label),
            react_1.default.createElement("div", { className: "form-group__field" },
                react_1.default.createElement("div", { className: "form-group__field-cloud" },
                    react_1.default.createElement(index_1.ShowIf, { condition: false }, this.getCountriesField(name, id)),
                    react_1.default.createElement("div", { className: "row form-compact-row" },
                        react_1.default.createElement(index_1.FieldInline, { className: "form-control--no-spinner", sizeLg: "4", name: name + "_POSTAL_CODE", id: tagId + "_ZIP", type: "number", maxLength: 4, placeholder: "FLD_ADDRESS_POSTAL_CODE_PLACEHOLDER", fieldSubmitted: fieldSubmitted, onKeyPress: function (e) { return _this.handleZipKeyPress(e); }, onChange: function (e) { return _this.handleOnChange(e); } }),
                        react_1.default.createElement(index_1.Autocomplete, { sizeLg: "8", name: name + "_CITY", id: tagId + "_CITY", maxLength: 35, type: "text", placeholder: "FLD_ADDRESS_CITY_PLACEHOLDER", fieldSubmitted: fieldSubmitted, onFocus: function (e) { return updateCities(_this.getPostalCode(), e.target.value); }, items: autocompleteCities, onChange: function (e) {
                                _this.onChangeCities(e.target.value);
                                _this.handleOnChange(e);
                            }, onBlur: function (e) {
                                var foundResult = autocompleteCities.find(function (item) {
                                    return (item.label
                                        .substring(0, item.label.length - 6)
                                        .toLowerCase()
                                        .includes(e.target.value.toLowerCase()));
                                });
                                if (foundResult) {
                                    var streetLookup = autocompleteFullData
                                        .find(function (item) { return item.ID === foundResult.value; });
                                    _this.onChangeCities(streetLookup.CITY);
                                    _this.handleOnChange(e);
                                }
                            }, onSelect: function (e, value) {
                                if (typeof value === "undefined")
                                    return;
                                var postalCodeLookup = autocompleteFullData
                                    .find(function (item) { return item.ID === value.value; });
                                if (typeof postalCodeLookup !== "undefined") {
                                    var CITY = postalCodeLookup.CITY;
                                    var POSTAL_CODE = postalCodeLookup.POSTAL_CODE;
                                    changeField(name + "_POSTAL_CODE", POSTAL_CODE);
                                    changeField(name + "_CITY", CITY);
                                    _this.handleOnChange(e);
                                }
                            }, shouldItemRender: function (item, value) {
                                return value.length >= 3 || _this.getPostalCode();
                            }, getValue: function () { return _this.getCity(); } })),
                    react_1.default.createElement("div", { className: "row form-compact-row" },
                        react_1.default.createElement(index_1.Autocomplete, { sizeXl: "8", name: name + "_STREET", id: tagId + "_STREET", type: "text", maxLength: 33, placeholder: "FLD_ADDRESS_STREET_PLACEHOLDER", fieldSubmitted: fieldSubmitted, onFocus: function (e) { return updateStreets(_this.getPostalCode(), _this.getCity(), e.target.value); }, items: autocompleteStreets, onChange: function (e) {
                                _this.onChangeStreets(e.target.value);
                                _this.handleOnChange(e);
                            }, getValue: function () { return _this.getStreet(); }, onSelect: function (e, value) {
                                if (typeof value === "undefined")
                                    return;
                                var streetLookup = autocompleteFullData.find(function (item) { return item.ID === value.value; });
                                if (typeof streetLookup !== "undefined") {
                                    var STREET = streetLookup.STREET;
                                    var CITY = streetLookup.CITY;
                                    var POSTAL_CODE = streetLookup.POSTAL_CODE;
                                    changeField(name + "_STREET", STREET);
                                    changeField(name + "_POSTAL_CODE", POSTAL_CODE);
                                    changeField(name + "_CITY", CITY);
                                    _this.handleOnChange(e);
                                }
                            } }),
                        react_1.default.createElement(index_1.FieldInline, { sizeLg: "6", sizeXl: "2", name: name + "_STREET_NR", id: tagId + "_STREET_NR", type: "text", maxLength: 5, placeholder: "FLD_ADDRESS_STREET_NUMBER_PLACEHOLDER", fieldSubmitted: fieldSubmitted, onKeyPress: function (e) { return _this.handleNumberKeyPress(e); }, onChange: function (e) { return _this.handleOnChange(e); } }),
                        react_1.default.createElement(index_1.FieldInline, { sizeLg: "6", sizeXl: "2", name: name + "_BOX_NR", id: tagId + "_STREET_BOX", type: "text", maxLength: "3", placeholder: "FLD_ADDRESS_STREET_BOX_PLACEHOLDER", fieldSubmitted: fieldSubmitted, onChange: function (e) { return _this.handleOnChange(e); } }))),
                react_1.default.createElement(index_1.FieldTooltip, { help: help }))));
    };
    return AddressFieldComponent;
}(react_1.Component));
var mapStateToProps = function (state, ownProps) {
    var commonItems = {
        "lang": state.pageState.lang,
        "autocompleteCities": state.address.autocomplete_cities,
        "autocompleteStreets": state.address.autocomplete_streets,
        "autocompleteFullData": state.address.autocomplete_full_data
    };
    var appItems = {
        "valuePostalCode": ownProps.name + "_POSTAL_CODE",
        "valueCity": ownProps.name + "_CITY",
        "valueStreet": ownProps.name + "_STREET"
    };
    return index_1.wrapMapStateToProps(state, commonItems, appItems);
};
var mapDispatchToProps = function (dispatch) { return ({
    "dispatchFieldChange": function (fld, value) {
        dispatch(redux_form_1.change("app", fld, value));
    },
    "updateCities": function (postalCodeText, townText) {
        dispatch(index_1.updateAutoCompleteCities(postalCodeText, townText));
    },
    "updateStreets": function (postalCodeText, cityText, streetText) {
        dispatch(index_1.updateAutoCompleteStreets(postalCodeText, cityText, streetText));
    },
    "changeField": function (fieldName, fieldValue) {
        dispatch(index_1.changeField(fieldName, fieldValue));
    }
}); };
exports.AddressField = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AddressFieldComponent);
