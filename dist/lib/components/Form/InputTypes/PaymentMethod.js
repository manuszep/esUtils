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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var index_1 = require("../../../../index");
// Wrap the component in a dynamic ReduxField.
var PaymentMethod = /** @class */ (function (_super) {
    __extends(PaymentMethod, _super);
    function PaymentMethod() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PaymentMethod.prototype.renderPaymentMethods = function () {
        // As this component is used by a ReduxField, some properties went into the input key
        var _a = this.props, items = _a.items, value = _a.value, onChange = _a.onChange, name = _a.name;
        // Loop over each item to generate as many inputs as there are items
        return items.map(function (item, key) {
            var checked = item.value === value;
            var id = "" + name + key;
            var src = "images/" + item.image + ".svg";
            return (react_1.default.createElement("div", { key: index_1.getGuid(), className: "form-group__payment-method" },
                react_1.default.createElement("input", { type: "radio", className: "custom-control-input", name: name, value: item.value, checked: checked, onChange: onChange, id: id }),
                react_1.default.createElement("label", { htmlFor: id, className: "cy-payment-method-" + key },
                    react_1.default.createElement("img", { src: src, alt: item.label }),
                    react_1.default.createElement(index_1.Translation, { className: "custom-control-description" }, item.label))));
        });
    };
    PaymentMethod.prototype.render = function () {
        return (react_1.default.createElement("div", { className: "form-group__payment-methods" }, this.renderPaymentMethods()));
    };
    return PaymentMethod;
}(react_1.Component));
exports.PaymentMethod = PaymentMethod;
