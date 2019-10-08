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
var classnames_1 = __importDefault(require("classnames"));
var index_1 = require("../../../index");
var BrokerCard = /** @class */ (function (_super) {
    __extends(BrokerCard, _super);
    function BrokerCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BrokerCard.prototype.render = function () {
        var _a = this.props, id = _a.id, title = _a.title, name = _a.name, street = _a.street, streetNumber = _a.streetNumber, postalCode = _a.postalCode, city = _a.city, showActions = _a.showActions, actionLabel = _a.actionLabel, actionHandler = _a.actionHandler, actionClass = _a.actionClass, email = _a.email, phone = _a.phone;
        var address = index_1.composeFullAddress(street, streetNumber, "", "", postalCode, city, false);
        var btnClassName = classnames_1.default("btn btn-ghost btn-sm", actionClass);
        return (react_1.default.createElement("div", { key: id, className: "broker-card" },
            title && react_1.default.createElement(index_1.Translation, { tag: "h3", className: "broker-card__heading" }, title),
            react_1.default.createElement("div", { className: "broker-card__details" },
                react_1.default.createElement("p", { className: "broker-card__details__name" }, name),
                react_1.default.createElement("p", { className: "broker-card__details__address", dangerouslySetInnerHTML: { "__html": address } }),
                phone && react_1.default.createElement("p", { className: "broker-card__details__phone", dangerouslySetInnerHTML: { "__html": phone } }),
                email && react_1.default.createElement("p", { className: "broker-card__details__email", dangerouslySetInnerHTML: { "__html": email } })),
            react_1.default.createElement(index_1.ShowIf, { condition: showActions !== false, className: "broker-card__actions" },
                react_1.default.createElement(index_1.Translation, { tag: "button", className: btnClassName, onClick: function (e) { return actionHandler(e); } }, actionLabel))));
    };
    return BrokerCard;
}(react_1.Component));
exports.BrokerCard = BrokerCard;
