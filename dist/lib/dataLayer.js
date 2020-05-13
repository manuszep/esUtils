"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_gtm_module_1 = __importDefault(require("react-gtm-module"));
var index_1 = require("../index");
var dataLayerInstance;
var DataLayer = /** @class */ (function () {
    function DataLayer(customMethods) {
        if (customMethods === void 0) { customMethods = {}; }
        var gVar = index_1.getAppGlobalVar();
        var tagManagerArgs = {
            "gtmId": window.gtm_id || "GTM-MC4R35Q",
            "dataLayer": {
                "flow": index_1.getAppPrefix(),
                "env_work": window.dataLayerConfig.env_work,
                "language": window.dataLayerConfig.language,
                "u": gVar.u
            }
        };
        react_gtm_module_1.default.initialize(tagManagerArgs);
        this.isUnique = [];
        this.customMethods = customMethods;
    }
    DataLayer.prototype.pushData = function (data) {
        react_gtm_module_1.default.dataLayer(data);
    };
    DataLayer.prototype.setStep = function (step, state) {
        var _a;
        if (typeof step !== "undefined" && step !== null) {
            var customData = {};
            var standardData = (_a = {
                    "event": "stepChange"
                },
                _a[index_1.getAppPrefix() + "_funnel_step"] = step.pageTitle,
                _a[index_1.getAppPrefix() + "_funnel_chapter"] = step.chapter,
                _a);
            var method = "setDataFor" + index_1.capitalizeFirstLetter(step.ID);
            if (typeof this.customMethods[method] === "function") {
                customData = this.customMethods[method](state.form.app.values);
            }
            this.pushData({ "dataLayer": Object.assign({}, customData, standardData) });
        }
    };
    DataLayer.prototype.triggerConversion = function (state) {
        var appGlobalVar = index_1.getAppGlobalVar();
        if ((typeof appGlobalVar.paymentState !== "undefined" && appGlobalVar.paymentState === "accepted")
            || appGlobalVar.flowCompleted) {
            var data = {
                "events": "ecommerce",
                "dataLayer": {
                    "ecommerce": {
                        "purchase": {
                            "actionField": {
                                "id": index_1.getGuid,
                                "revenue": state.invoice.pricing.firstCashInvoiceTotalPremiumAmount
                            },
                            "products": state.invoice.commercialComponents
                        }
                    }
                }
            };
            this.pushData(data);
        }
    };
    DataLayer.prototype.setLanguage = function (lang) {
        this.pushData({ "dataLayer": { "language": lang.toLowerCase() } });
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
        if (action.type === "GOTO_NEXT_STEP" || action.type === "GOTO_STEP" || action.type === "GOTO_PREVIOUS_STEP") {
            dataLayerInstance.setStep(currentStep, state);
        }
        if (action.type === "REFRESH_OGONE_DATA_FIELDS") {
            dataLayerInstance.triggerConversion(state);
        }
        return next(action);
    }; };
};
