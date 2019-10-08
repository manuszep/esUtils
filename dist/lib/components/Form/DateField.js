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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
var pikaday_1 = __importDefault(require("pikaday")); // Doc: https://github.com/dbushell/Pikaday
var index_1 = require("../../../index");
var DateFieldComponent = /** @class */ (function (_super) {
    __extends(DateFieldComponent, _super);
    function DateFieldComponent(props) {
        return _super.call(this, props) || this;
    }
    DateFieldComponent.prototype.componentDidMount = function () {
        var _this = this;
        var _a = this.props, datePicker = _a.datePicker, name = _a.name, changeField = _a.changeField, onSelect = _a.onSelect;
        if (datePicker) {
            this.datePicker = new pikaday_1.default({
                'field': this.inputElement,
                'trigger': this.afterElement,
                'format': "DD/MM/YYYY",
                'reposition': false,
                'position': "bottom right",
                'disableDayFn': this.getDisableDayFn(),
                'minDate': datePicker.minDate,
                'maxDate': datePicker.maxDate,
                'yearRange': datePicker.yearRange,
                'onSelect': function () {
                    changeField(name, _this.datePicker.toString());
                    if (onSelect)
                        onSelect();
                },
                'i18n': this.getCalendarTranslation()
            });
        }
    };
    DateFieldComponent.prototype.componentWillReceiveProps = function (nextprops) {
        var _a = this.props, minDate = _a.minDate, maxDate = _a.maxDate;
        if (minDate !== nextprops.minDate) {
            this.datePicker.setMinDate(nextprops.minDate);
        }
        if (maxDate !== nextprops.maxDate) {
            this.datePicker.setMaxDate(nextprops.maxDate);
        }
    };
    DateFieldComponent.prototype.componentWillUnmount = function () {
        if (typeof this.datePicker !== 'undefined' && typeof typeof this.datePicker === 'function') {
            this.datePicker.destroy();
        }
    };
    DateFieldComponent.prototype.getDisableDayFn = function () {
        var isDayBlocked = this.props.isDayBlocked;
        var disableDayFn = function (d) {
            return false;
        };
        if (typeof isDayBlocked !== "undefined") {
            switch (isDayBlocked) {
                case "future":
                    disableDayFn = this.allowOnlyFutureDates;
                    break;
            }
        }
        return disableDayFn;
    };
    DateFieldComponent.prototype.getCalendarTranslation = function () {
        return {
            /* eslint-disable */
            'previousMonth': '<svg viewBox="0 0 1000 1000"><path d="M336.2 274.5l-210.1 210h805.4c13 0 23 10 23 23s-10 23-23 23H126.1l210.1 210.1c11 11 11 21 0 32-5 5-10 7-16 7s-11-2-16-7l-249.1-249c-11-11-11-21 0-32l249.1-249.1c21-21.1 53 10.9 32 32z"></path></svg>',
            'nextMonth': '<svg viewBox="0 0 1000 1000"><path d="M694.4 242.4l249.1 249.1c11 11 11 21 0 32L694.4 772.7c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210.1-210.1H67.1c-13 0-23-10-23-23s10-23 23-23h805.4L662.4 274.5c-21-21.1 11-53.1 32-32.1z"></path></svg>',
            'months': index_1.getTranslation("CALENDAR_MONTHS").split(","),
            'weekdays': index_1.getTranslation("CALENDAR_DAYS").split(","),
            'weekdaysShort': index_1.getTranslation("CALENDAR_DAYS_SHORT").split(",")
            /* eslint-enable */
        };
    };
    DateFieldComponent.prototype.allowOnlyFutureDates = function (d) {
        var now = new Date();
        now.setHours(0, 0, 0, 0);
        return d < now;
    };
    DateFieldComponent.prototype.isZoneFull = function (pos, val) {
        // Check if a zone delimited by slashes is already full
        return ((pos < 3 && val.slice(2, 3) === "/")
            || (pos > 2 && pos < 6 && val.slice(5, 6) === "/"));
    };
    /* eslint-disable no-param-reassign */
    DateFieldComponent.prototype.clearInRange = function (fld, val, start, end) {
        // Slice string on the selected range and insert text
        fld.value = [val.slice(0, start), val.slice(end)].join("");
        // Maintain cursor position
        fld.setSelectionRange(start, start);
    };
    /* eslint-enable no-param-reassign */
    DateFieldComponent.prototype.handleKeypress = function (e) {
        var fld = e.target;
        var key = e.key;
        var pos = fld.selectionStart ? fld.selectionStart : 0;
        var isNumeric = (!Number.isNaN(Number(key)) && Number.isFinite(Number(key)));
        var val = fld.value;
        var isMaxLength = (val.length >= 10);
        var zoneIsFull = this.isZoneFull(pos, val);
        var isAllowedChar = ((isNumeric) && !((zoneIsFull || isMaxLength) && isNumeric));
        // Prevent any unwanted input
        if (!isAllowedChar) {
            e.preventDefault();
        }
    };
    DateFieldComponent.prototype.handleKeydown = function (e) {
        var fld = e.target;
        var key = e.key;
        var c = (typeof e.which === "number") ? e.which : e.keyCode;
        var initialValue = fld.value;
        var pos = fld.selectionStart ? fld.selectionStart : 0;
        var posEnd = fld.selectionEnd;
        var isNumeric = (!Number.isNaN(Number(key)) && Number.isFinite(Number(key)));
        var isBackSpace = (c === 8);
        var isDel = (c === 46);
        // If a range is selected, any input will remove the selection
        if (pos !== posEnd && (isNumeric || isBackSpace || isDel)) {
            this.clearInRange(fld, initialValue, pos || 0, posEnd || 0);
        }
        var val = fld.value;
        var zoneIsFull = this.isZoneFull(pos, val);
        var shouldInsertSlashBefore = (pos === 2 || pos === 5);
        var isBackDeleteSlash = (isBackSpace && (pos === 3 || pos === 6));
        var isForwardDeleteSlash = (isDel && (pos === 2 || pos === 5));
        var shouldInsertSlash = ((pos === 1 || pos === 4) && isNumeric);
        // In some cases, the slash may have been deleted (by range-select).
        // If something is entered where a slash should be, insert one
        if (shouldInsertSlashBefore && isNumeric && !zoneIsFull) {
            fld.value = val + "/" + key;
            e.preventDefault();
            return;
        }
        // Backspace was hit and there was a slash in the way
        if (isBackDeleteSlash) {
            // Remove the slash AND the character before
            this.clearInRange(fld, val, pos - 2, pos);
            e.preventDefault();
            return;
        }
        // Del was hit and a slash was in the way
        if (isForwardDeleteSlash) {
            // Remove the character after
            this.clearInRange(fld, val, pos + 1, pos + 2);
            e.preventDefault();
            return;
        }
        // If we're at position 1 or 4 a slash should be inserted
        if (shouldInsertSlash) {
            var tmpVal = [val.slice(0, pos), key, val.slice(pos)].join('');
            if (this.isZoneFull(pos, tmpVal)) {
                fld.value = tmpVal;
                e.preventDefault();
                return;
            }
            fld.value = [val.slice(0, pos), key + "/", val.slice(pos)].join('');
            e.preventDefault();
        }
    };
    DateFieldComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props, datePicker = _a.datePicker, fldValue = _a.fldValue, minDate = _a.minDate, maxDate = _a.maxDate, rest = __rest(_a, ["datePicker", "fldValue", "minDate", "maxDate"]);
        var addonAfter = (datePicker) ? (react_1.default.createElement(index_1.Icon, { ref: function (a) {
                _this.dateFieldAddon = a;
            }, name: "calendar" })) : null;
        return (react_1.default.createElement(index_1.Field, __assign({ ref: function (el) {
                _this.fieldElement = el;
            }, onKeyDown: function (e) { return _this.handleKeydown(e); }, onKeyPress: function (e) { return _this.handleKeypress(e); }, addonAfter: addonAfter, inputRef: function (el) {
                _this.inputElement = el;
            }, afterRef: function (el) {
                _this.afterElement = el;
            }, reduxFieldRef: function (el) {
                _this.reduxElement = el;
            }, type: "tel" }, rest)));
    };
    return DateFieldComponent;
}(react_1.Component));
var mapStateToProps = function (state, ownProps) {
    return {
        "fldValue": state.form.app && state.form.app.values ? state.form.app.values["" + ownProps.name] : null
    };
};
var mapDispatchToProps = function (dispatch) { return ({
    "changeField": function (name, value) {
        dispatch(index_1.changeField(name, value));
    }
}); };
exports.DateField = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(DateFieldComponent);
exports.default = exports.DateField;
