"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var dataLayerInstance;
var DataLayer = /** @class */ (function () {
    function DataLayer(customMethods) {
        if (customMethods === void 0) { customMethods = {}; }
        var gVar = index_1.getAppGlobalVar();
        this.dataLayer = {
            "flow": index_1.getAppPrefix(),
            "env_work": window.dataLayerConfig.env_work,
            "language": window.dataLayerConfig.language,
            "u": gVar.u
        };
        this.isUnique = [];
        this.customMethods = customMethods;
        this.pushData();
    }
    DataLayer.prototype.addData = function (data) {
        var _this = this;
        Object.keys(data).forEach(function (key) {
            _this.dataLayer[key] = data[key];
        });
    };
    DataLayer.prototype.pushData = function () {
        window.dataLayer.push(Object.assign({ 'event': 'ecommerce' }, this.dataLayer));
    };
    DataLayer.prototype.setStep = function (step, state) {
        if (typeof step !== "undefined" && step !== null) {
            this.dataLayer[index_1.getAppPrefix() + "_funnel_step"] = step.pageTitle;
            this.dataLayer[index_1.getAppPrefix() + "_funnel_chapter"] = step.chapter;
            var method = "setDataFor" + index_1.capitalizeFirstLetter(step.ID);
            if (typeof this.customMethods[method] === "function") {
                var data = this.customMethods[method](state.form.app.values);
                this.addData(data);
            }
            this.pushData();
        }
    };
    DataLayer.prototype.triggerConversion = function (state) {
        var appGlobalVar = index_1.getAppGlobalVar();
        if ((typeof appGlobalVar.paymentState !== "undefined" && appGlobalVar.paymentState === "accepted")
            || appGlobalVar.flowCompleted) {
            window.dataLayer.push({
                'event': 'ecommerce',
                'ecommerce': {
                    'purchase': {
                        "actionField": {
                            "id": index_1.getGuid,
                            "revenue": state.invoice.pricing.firstCashInvoiceTotalPremiumAmount
                        },
                        "products": state.invoice.commercialComponents
                    }
                }
            });
        }
    };
    DataLayer.prototype.setLanguage = function (lang) {
        this.dataLayer.language = lang.toLowerCase();
        this.pushData();
    };
    return DataLayer;
}());
exports.initDataLayer = function (customMethods) {
    if (customMethods === void 0) { customMethods = {}; }
    dataLayerInstance = new DataLayer(customMethods);
};
exports.getDataLayer = function () {
    return dataLayerInstance;
};
exports.dataLayerMiddleware = function (_a) {
    var getState = _a.getState;
    return function (next) { return function (action) {
        var state = getState();
        var currentStep = index_1.getStepById(state.pageState.currentStep);
        if (action.type === "SWITCH_LANG") {
            dataLayerInstance.setLanguage(action.lang);
        }
        if (action.type === "GOTO_NEXT_STEP") {
            dataLayerInstance.setStep(currentStep, state);
        }
        if (action.type === "REFRESH_OGONE_DATA_FIELDS") {
            dataLayerInstance.triggerConversion(state);
        }
        return next(action);
    }; };
};
