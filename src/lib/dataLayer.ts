import { Middleware, MiddlewareAPI } from "redux";
import reactGtmModule from "react-gtm-module";

import {
  capitalizeFirstLetter,
  getGuid,
  getAppGlobalVar,
  getAppPrefix,
  KeyedObject,
  getStepById,
  getNextStep,
  Step
} from "../index";

let dataLayerInstance: DataLayer;

class DataLayer {
  dataLayer: KeyedObject;
  isUnique: [];
  customMethods: KeyedObject<Function>;

  constructor(customMethods: KeyedObject<Function> = {}) {
    const gVar = getAppGlobalVar();

    this.dataLayer = {
      "flow": getAppPrefix(),
      "env_work": window.dataLayerConfig.env_work,
      "language": window.dataLayerConfig.language,
      "u": gVar.u
    };

    const tagManagerArgs = {
      "gtmId": window.gtm_id || "GTM-MC4R35Q",
      "dataLayer": this.dataLayer
    };

    reactGtmModule.initialize(tagManagerArgs);

    this.isUnique = [];
    this.customMethods = customMethods;
  }

  addData(data: KeyedObject): void {
    Object.keys(data).forEach((key) => {
      this.dataLayer[key] = data[key];
    });
  }

  pushData(data: { dataLayer: Record<string, any>, events?: any }): void {
    reactGtmModule.dataLayer(data);
  }

  setStep(step: Step | undefined | null, state: KeyedObject) {
    if (typeof step !== "undefined" && step !== null) {
      let customData = {};
      const standardData = {
        [`${getAppPrefix()}_funnel_step`]: step.pageTitle,
        [`${getAppPrefix()}_funnel_chapter`]: step.chapter
      };

      const method = `setDataFor${capitalizeFirstLetter(step.ID)}`;

      if (typeof this.customMethods[method] === "function") {
        customData = this.customMethods[method](state.form.app.values);
      }

      this.pushData({ "dataLayer": Object.assign({}, customData, standardData) });
    }
  }

  triggerConversion(state: KeyedObject): void {
    const appGlobalVar = getAppGlobalVar();

    if (
      (typeof appGlobalVar.paymentState !== "undefined" && appGlobalVar.paymentState === "accepted")
      || appGlobalVar.flowCompleted) {
      const data = {
        "events": "ecommerce",
        "dataLayer": {
          "ecommerce": {
            "purchase": {
              "actionField": {
                "id": getGuid,
                "revenue": state.invoice.pricing.firstCashInvoiceTotalPremiumAmount
              },
              "products": state.invoice.commercialComponents
            }
          }
        }
      };

      this.pushData(data);
    }
  }

  setLanguage(lang: string): void {
    this.pushData({ "dataLayer": { "language": lang.toLowerCase() } });
  }
}

export const initDataLayer = (customMethods: KeyedObject<Function> = {}): void => {
  dataLayerInstance = new DataLayer(customMethods);
};

export const getDataLayer = (): DataLayer => {
  return dataLayerInstance;
};

export const dataLayerMiddleware: Middleware = ({ getState }: MiddlewareAPI) => {
  return (next) => (action) => {
    const state = getState();
    const currentStep = getStepById(state.pageState.currentStep);

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
  };
};
