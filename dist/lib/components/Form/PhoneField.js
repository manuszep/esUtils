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
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var classnames_1 = __importDefault(require("classnames"));
var index_1 = require("../../../index");
var PhoneFieldComponent = /** @class */ (function (_super) {
    __extends(PhoneFieldComponent, _super);
    function PhoneFieldComponent(props) {
        var _this = _super.call(this, props) || this;
        _this._isMounted = false;
        var prefixFieldValue = _this.props.prefixFieldValue;
        _this.state = {
            "prefix": prefixFieldValue || "+32",
            "flag": _this.findFlag(prefixFieldValue || "+32"),
            "prefixListOpen": false
        };
        return _this;
    }
    PhoneFieldComponent.getPrefixField = function (name) {
        return name + "_PHONE_PREFIX";
    };
    PhoneFieldComponent.getNumberField = function (name) {
        return name + "_PHONE_LINE_NUMBER";
    };
    PhoneFieldComponent.getFullField = function (name) {
        return name + "_PHONE_NUMBER";
    };
    PhoneFieldComponent.getErrorMessage = function (name) {
        return name + "_PHONE_NUMBER_INVALID";
    };
    PhoneFieldComponent.prototype.componentDidMount = function () {
        var _this = this;
        document.addEventListener('click', function (e) { _this.handleClickOutside(e); }, true);
        this._isMounted = true;
    };
    PhoneFieldComponent.prototype.componentWillUnmount = function () {
        var _this = this;
        document.removeEventListener('click', function (e) { _this.handleClickOutside(e); }, true);
        this._isMounted = false;
    };
    PhoneFieldComponent.prototype.getPrefixOptions = function () {
        var _this = this;
        var prefix = this.state.prefix;
        var lang = this.props.lang;
        var options = [];
        for (var i = 0; i < index_1.phoneCountriesList.length; i += 1) {
            var item = index_1.phoneCountriesList[i];
            if (item.name === "") {
                options.push(react_1.default.createElement("li", { key: "phone_empty_prefix", className: "phone-input__prefix__option phone-input__prefix__option--disabled" },
                    react_1.default.createElement("hr", null)));
            }
            else {
                var selected = item.dial_code === prefix;
                var cls = ["phone-input__prefix__option"];
                if (selected) {
                    cls.push("phone-input__prefix__option--selected");
                }
                options.push(react_1.default.createElement("li", { key: item.name[lang], className: cls.join(" ") },
                    react_1.default.createElement("a", { "data-value": i, href: "#", tabIndex: -1, onClick: function (e) { _this.handlePrefixChange(e); } },
                        item.flag,
                        "\u00A0",
                        item.name[lang])));
            }
        }
        return options;
    };
    PhoneFieldComponent.prototype.getErrorMessage = function () {
        var _a = this.props, fieldSubmitted = _a.fieldSubmitted, numberFieldErrorMsg = _a.numberFieldErrorMsg, fullFieldErrorMsg = _a.fullFieldErrorMsg, lineNumberTouched = _a.lineNumberTouched;
        if ((numberFieldErrorMsg || fullFieldErrorMsg) && (fieldSubmitted || lineNumberTouched)) {
            return (react_1.default.createElement("div", { className: "form-control-feedback cy-error" }, numberFieldErrorMsg || fullFieldErrorMsg));
        }
        return null;
    };
    PhoneFieldComponent.prototype.handleClickOutside = function (e) {
        if (!this._isMounted)
            return;
        this.setState({ "prefixListOpen": false });
    };
    PhoneFieldComponent.prototype.findFlag = function (prefix) {
        for (var i = 0; i < index_1.phoneCountriesList.length; i += 1) {
            var item = index_1.phoneCountriesList[i];
            if (item.dial_code === prefix) {
                return item.flag;
            }
        }
        return "";
    };
    PhoneFieldComponent.prototype.handleKeyPress = function (e) {
        var c = (typeof e.which === "number") ? e.which : e.keyCode;
        var fld = e.target;
        var val = fld.value;
        if (c < 48 // 47 = /, 48 = 0, 49 = 1 ...
            || c > 57 // 57 = 9
            || c === 32 // 32 = space
            || (val.length === 0 && c === 48)) { // Max 9 chars for Belgian mobile phone
            e.preventDefault();
        }
    };
    PhoneFieldComponent.prototype.handlePrefixChange = function (e) {
        e.preventDefault();
        var _a = this.props, addPrefixToPhone = _a.addPrefixToPhone, numberFieldValue = _a.numberFieldValue;
        var key = e.target.dataset.value;
        var country = index_1.phoneCountriesList[key];
        this.setState({ "flag": country.flag });
        this.setState({ "prefixListOpen": false });
        this.setState({ "prefix": country.dial_code }, function () {
            addPrefixToPhone(country.dial_code, numberFieldValue);
        });
    };
    PhoneFieldComponent.prototype.handlePhonePrefixClick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        var prefixListOpen = this.state.prefixListOpen;
        this.setState({ "prefixListOpen": !prefixListOpen });
    };
    PhoneFieldComponent.prototype.updatePhoneNumber = function (e) {
        var prefix = this.state.prefix;
        var addPrefixToPhone = this.props.addPrefixToPhone;
        var newPhone = e.target.value;
        newPhone = newPhone.replace(/\s/g, '');
        addPrefixToPhone(prefix, newPhone);
    };
    PhoneFieldComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props, label = _a.label, name = _a.name, onChange = _a.onChange, help = _a.help;
        var _b = this.state, prefixListOpen = _b.prefixListOpen, flag = _b.flag, prefix = _b.prefix;
        var id = exports.PhoneField.getFullField(name) + "Fld";
        var cls = classnames_1.default("phone-input", {
            "phone-input--prefix-open": prefixListOpen
        });
        var errorMessage = this.getErrorMessage();
        var formGroupClassName = classnames_1.default("form-group", errorMessage ? "has-danger" : "");
        return (react_1.default.createElement("div", { className: formGroupClassName },
            react_1.default.createElement("label", { htmlFor: id },
                react_1.default.createElement(index_1.Translation, null, label)),
            react_1.default.createElement("div", { className: cls },
                react_1.default.createElement("div", { className: "phone-input__prefix" },
                    react_1.default.createElement("div", { role: "button", tabIndex: -1, onClick: function (e) { return _this.handlePhonePrefixClick(e); }, onKeyPress: function (e) { return _this.handlePhonePrefixClick(e); }, className: "phone-input__prefix__value" },
                        flag,
                        "\u00A0",
                        prefix),
                    react_1.default.createElement("ul", { className: "phone-input__prefix__list" }, this.getPrefixOptions())),
                react_1.default.createElement(index_1.FieldInline, { className: "form-control phone-input__field", type: "text", name: exports.PhoneField.getNumberField(name), placeholder: "PHONE_NUMBER_PLACEHOLDER", onKeyPress: function (e) { return _this.handleKeyPress(e); }, onBlur: function (e) { return _this.updatePhoneNumber(e); }, onChange: onChange }),
                react_1.default.createElement(index_1.FieldTooltip, { help: help })),
            errorMessage));
    };
    return PhoneFieldComponent;
}(react_1.Component));
var mapStateToProps = function (state, ownProps) {
    var commonItems = {
        "lang": state.pageState.lang
    };
    var appItems = {
        "prefixFieldValue": exports.PhoneField.getPrefixField(ownProps.name),
        "numberFieldValue": exports.PhoneField.getNumberField(ownProps.name)
    };
    var syncErrorItems = {
        "fullFieldErrorMsg": exports.PhoneField.getFullField(ownProps.name),
        "numberFieldErrorMsg": exports.PhoneField.getNumberField(ownProps.name)
    };
    var fieldItems = {
        "lineNumberTouched": function (fields) { return fields[exports.PhoneField.getNumberField(ownProps.name)] ? fields[exports.PhoneField.getNumberField(ownProps.name)].touched : false; }
    };
    return index_1.wrapMapStateToProps(state, commonItems, appItems);
};
var mapDispatchToProps = function (dispatch, ownProps) { return ({
    "addPrefixToPhone": function (prefix, number) {
        dispatch(index_1.changeField(exports.PhoneField.getPrefixField(ownProps.name), prefix));
        dispatch(index_1.changeField(exports.PhoneField.getFullField(ownProps.name), index_1.constructPhoneNumber(prefix, number)));
    }
}); };
exports.PhoneField = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(PhoneFieldComponent);
