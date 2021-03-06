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
var axios_1 = __importDefault(require("axios"));
var moment_1 = __importDefault(require("moment"));
var react_redux_1 = require("react-redux");
var query_string_1 = __importDefault(require("query-string"));
var index_1 = require("../../../index");
var NeedHelpComponent = /** @class */ (function (_super) {
    __extends(NeedHelpComponent, _super);
    function NeedHelpComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NeedHelpComponent.prototype.getWhatsappUrl = function () {
        var lang = this.props.lang;
        if (lang.toUpperCase() === "FR") {
            return index_1.getEndPoints().whatsapp.FR.whatsapp_phone;
        }
        return index_1.getEndPoints().whatsapp.NL.whatsapp_phone;
    };
    NeedHelpComponent.prototype.getPhone = function () {
        var lang = this.props.lang;
        if (lang.toUpperCase() === "FR") {
            return index_1.getEndPoints().phone.FR.phone;
        }
        return index_1.getEndPoints().phone.NL.phone;
    };
    NeedHelpComponent.prototype.needHelp = function () {
        var fieldsAndValues = { 'CALL_ME': true };
        var fieldsToPost = query_string_1.default.stringify(fieldsAndValues);
        axios_1.default.post(index_1.getEndPoints().postHelp + "&v=" + (new Date()).valueOf(), fieldsToPost);
    };
    NeedHelpComponent.prototype.isCallCenterOpen = function () {
        var dayOfWeek = moment_1.default().isoWeekday();
        var saturday = 6;
        var sunday = 7;
        var currentTime = moment_1.default();
        var weekStartTime = moment_1.default('08:30 am', "HH:mm a");
        var weekEndTime = moment_1.default('08:00 pm', "HH:mm a");
        var saturdaydStartTime = moment_1.default('08:00 am', "HH:mm a");
        var saturdayEndTime = moment_1.default('01:00 pm', "HH:mm a");
        if (dayOfWeek === sunday) {
            return false;
        }
        if ((dayOfWeek === saturday) && currentTime.isBetween(saturdaydStartTime, saturdayEndTime)) {
            return true;
        }
        if (((dayOfWeek !== sunday) && (dayOfWeek !== saturday)) && currentTime.isBetween(weekStartTime, weekEndTime)) {
            return true;
        }
        return false;
    };
    NeedHelpComponent.prototype.renderNeedHelp = function () {
        var _this = this;
        if (!this.isCallCenterOpen()) {
            return (react_1.default.createElement("div", { className: "whatsapp__container", role: "button", tabIndex: 0, onClick: function () {
                    _this.props.showModal({
                        "title": react_1.default.createElement(index_1.Translation, { noprefix: true }, "MODAL_HELP_TOOL_TITLE"),
                        "body": react_1.default.createElement(index_1.Translation, { noprefix: true }, "MODAL_HELP_TOOL_BODY"),
                        "closeLabel": react_1.default.createElement(index_1.Translation, { noprefix: true }, "MODAL_HELP_TOOL_CLOSE")
                    });
                } },
                react_1.default.createElement("a", { className: "whatsapp-button", id: "phone_btn" },
                    react_1.default.createElement("svg", { viewBox: "0 0 45 45" },
                        react_1.default.createElement("path", { fill: "white", transform: "translate(2,15) rotate(-25)", d: "M23.71,26.301l-1.633-1.633c5.33-5.33,5.33-14.004,0-19.334l1.632-1.633C29.939,9.933,29.939,20.069,23.71,26.301z    M20.888,6.521l-1.633,1.631c3.776,3.776,3.776,9.92,0,13.696l1.635,1.631C25.562,18.806,25.562,11.195,20.888,6.521z    M17.976,9.434l-1.633,1.634c2.17,2.168,2.17,5.701,0,7.869l1.633,1.633C21.045,17.499,21.045,12.502,17.976,9.434z M1.938,8.445   c-0.172,2.125-0.271,4.253-0.309,6.383h-0.01C1.62,14.886,1.624,14.942,1.624,15c0,0.059-0.004,0.115-0.005,0.171H1.63   c0.038,2.13,0.137,4.26,0.309,6.384c0.445,5.56,4.814,9.252,9.098,8.294c0.188-0.038,0.384-0.04,0.561-0.112   c1.043-0.434,1.907-1.241,2.87-1.837c1.228-0.77-1.419-7.3-3.059-6.457c-0.606,0.316-2.28,1.553-2.953,1.646   c-0.601,0.084-1.071-0.711-1.131-1.445c-0.157-1.938-0.015-4.414-0.003-6.472h0.003c0-0.055-0.001-0.114-0.001-0.171   s0.001-0.117,0.001-0.171H7.321c-0.012-2.058-0.154-4.534,0.003-6.472c0.06-0.735,0.53-1.531,1.131-1.445   c0.673,0.093,2.347,1.33,2.953,1.646c1.64,0.843,4.286-5.689,3.059-6.457c-0.963-0.597-1.827-1.405-2.87-1.837   c-0.177-0.074-0.374-0.075-0.561-0.113C6.752-0.807,2.384,2.886,1.938,8.445z" }))),
                react_1.default.createElement(index_1.Translation, { noprefix: true, className: "needHelpText_mobile" }, "PHONE_BUTTON"),
                react_1.default.createElement(index_1.Translation, { noprefix: true, className: "needHelpText_desktop" }, "PHONE_BUTTON_DESKTOP")));
        }
        return (react_1.default.createElement("a", { className: "whatsapp__container", href: this.getPhone(), onClick: function () { _this.needHelp(); } },
            react_1.default.createElement("a", { className: "whatsapp-button", id: "phone_btn" },
                react_1.default.createElement("svg", { viewBox: "0 0 45 45" },
                    react_1.default.createElement("path", { fill: "white", transform: "translate(2,15) rotate(-25)", d: "M23.71,26.301l-1.633-1.633c5.33-5.33,5.33-14.004,0-19.334l1.632-1.633C29.939,9.933,29.939,20.069,23.71,26.301z    M20.888,6.521l-1.633,1.631c3.776,3.776,3.776,9.92,0,13.696l1.635,1.631C25.562,18.806,25.562,11.195,20.888,6.521z    M17.976,9.434l-1.633,1.634c2.17,2.168,2.17,5.701,0,7.869l1.633,1.633C21.045,17.499,21.045,12.502,17.976,9.434z M1.938,8.445   c-0.172,2.125-0.271,4.253-0.309,6.383h-0.01C1.62,14.886,1.624,14.942,1.624,15c0,0.059-0.004,0.115-0.005,0.171H1.63   c0.038,2.13,0.137,4.26,0.309,6.384c0.445,5.56,4.814,9.252,9.098,8.294c0.188-0.038,0.384-0.04,0.561-0.112   c1.043-0.434,1.907-1.241,2.87-1.837c1.228-0.77-1.419-7.3-3.059-6.457c-0.606,0.316-2.28,1.553-2.953,1.646   c-0.601,0.084-1.071-0.711-1.131-1.445c-0.157-1.938-0.015-4.414-0.003-6.472h0.003c0-0.055-0.001-0.114-0.001-0.171   s0.001-0.117,0.001-0.171H7.321c-0.012-2.058-0.154-4.534,0.003-6.472c0.06-0.735,0.53-1.531,1.131-1.445   c0.673,0.093,2.347,1.33,2.953,1.646c1.64,0.843,4.286-5.689,3.059-6.457c-0.963-0.597-1.827-1.405-2.87-1.837   c-0.177-0.074-0.374-0.075-0.561-0.113C6.752-0.807,2.384,2.886,1.938,8.445z" }))),
            react_1.default.createElement(index_1.Translation, { noprefix: true, className: "needHelpText_mobile" }, "PHONE_BUTTON"),
            react_1.default.createElement(index_1.Translation, { noprefix: true, className: "needHelpText_desktop" }, "PHONE_BUTTON_DESKTOP")));
    };
    NeedHelpComponent.prototype.render = function () {
        var _this = this;
        return (react_1.default.createElement("div", { className: "header__tools" },
            react_1.default.createElement("span", null,
                react_1.default.createElement("div", { className: "help-tool__text" },
                    react_1.default.createElement(index_1.Translation, { className: "needHelp-title" }, "HELP_TITLE"),
                    react_1.default.createElement("div", { className: "button_container" },
                        this.renderNeedHelp(),
                        react_1.default.createElement("div", { id: "whatsapp", className: "whatsapp__container", role: "button", tabIndex: 0, onClick: function () {
                                window.open(_this.getWhatsappUrl());
                            } },
                            react_1.default.createElement("a", { className: "whatsapp-button", id: "whatsapp_btn" },
                                react_1.default.createElement("svg", { viewBox: "0 0 90 90" },
                                    react_1.default.createElement("path", { id: "WhatsApp", d: "M90,43.841c0,24.213-19.779,43.841-44.182,43.841c-7.747,0-15.025-1.98-21.357-5.455L0,90l7.975-23.522 c-4.023-6.606-6.34-14.354-6.34-22.637C1.635,19.628,21.416,0,45.818,0C70.223,0,90,19.628,90,43.841z M45.818,6.982   c-20.484,0-37.146,16.535-37.146,36.859c0,8.065,2.629,15.534,7.076,21.61L11.107,79.14l14.275-4.537   c5.865,3.851,12.891,6.097,20.437,6.097c20.481,0,37.146-16.533,37.146-36.857S66.301,6.982,45.818,6.982z M68.129,53.938   c-0.273-0.447-0.994-0.717-2.076-1.254c-1.084-0.537-6.41-3.138-7.4-3.495c-0.993-0.358-1.717-0.538-2.438,0.537   c-0.721,1.076-2.797,3.495-3.43,4.212c-0.632,0.719-1.263,0.809-2.347,0.271c-1.082-0.537-4.571-1.673-8.708-5.333   c-3.219-2.848-5.393-6.364-6.025-7.441c-0.631-1.075-0.066-1.656,0.475-2.191c0.488-0.482,1.084-1.255,1.625-1.882   c0.543-0.628,0.723-1.075,1.082-1.793c0.363-0.717,0.182-1.344-0.09-1.883c-0.27-0.537-2.438-5.825-3.34-7.977   c-0.902-2.15-1.803-1.792-2.436-1.792c-0.631,0-1.354-0.09-2.076-0.09c-0.722,0-1.896,0.269-2.889,1.344   c-0.992,1.076-3.789,3.676-3.789,8.963c0,5.288,3.879,10.397,4.422,11.113c0.541,0.716,7.49,11.92,18.5,16.223   C58.2,65.771,58.2,64.336,60.186,64.156c1.984-0.179,6.406-2.599,7.312-5.107C68.398,56.537,68.398,54.386,68.129,53.938z" }))),
                            react_1.default.createElement(index_1.Translation, { noprefix: true, className: "needHelpText_mobile" }, "WHATSAPP_BUTTON"),
                            react_1.default.createElement(index_1.Translation, { noprefix: true, className: "needHelpText_desktop" }, "WHATSAPP_BUTTON_DESKTOP")))))));
    };
    return NeedHelpComponent;
}(react_1.Component));
var mapStateToProps = function (state) {
    var commonItems = {
        "lang": state.pageState.lang
    };
    return index_1.wrapMapStateToProps(state, commonItems, {});
};
var mapDispatchToProps = function (dispatch) { return ({
    "showModal": function (firstArg, secondArg) {
        if (secondArg === void 0) { secondArg = {}; }
        dispatch(index_1.showModal(firstArg, secondArg));
    }
}); };
exports.NeedHelp = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(NeedHelpComponent);
