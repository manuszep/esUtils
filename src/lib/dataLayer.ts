import { Middleware, MiddlewareAPI } from "redux";

import {
  capitalizeFirstLetter,
  getGuid,
  getAppGlobalVar,
  KeyedObject,
  getStepById
} from "../index";

let dataLayerInstance: DataLayer;

class DataLayer {
  dataLayer: KeyedObject;
  isUnique: [];
  customMethods: KeyedObject<Function>;

  constructor(customMethods: KeyedObject<Function> = {}) {
    window.tc_vars = window.tc_vars || {};

    this.dataLayer = {
      "flow": "studentTravel",
      "env_work": window.tc_vars.env_work,
      "language": window.tc_vars.language
    };

    this.isUnique = [];
    this.customMethods = customMethods;
  }

  addData(data: KeyedObject, step: KeyedObject): void {
    this.dataLayer.page_title = String(step);

    Object.keys(data).forEach((key) => {
      this.dataLayer[key] = data[key];
    });
  }

  pushData(): void {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({}, this.dataLayer));

    if (typeof window.tc_vars !== "undefined" && typeof window.tC !== "undefined") {
      window.tc_vars = Object.assign({}, this.dataLayer);
      window.tC.container.reload();
    }
  }

  setStep(step: string, state: KeyedObject) {
    const stepDetails = getStepById(step);
    if (typeof stepDetails !== "undefined") {
      this.dataLayer.studenttravel_funnel_step = stepDetails.pageTitle;
      this.dataLayer.studenttravel_funnel_chapter = stepDetails.chapter;
    }

    const method = `setDataFor${capitalizeFirstLetter(step)}`;

    if (typeof this.customMethods[method] === "function") {
      this.customMethods[method](state.form.app.values, state);
    }

    this.pushData();
  }

  triggerConversion(state: KeyedObject): void {
    const appGlobalVar = getAppGlobalVar();
    if (
      (typeof appGlobalVar.paymentState !== "undefined" && appGlobalVar.paymentState === "accepted")
      || appGlobalVar.flowCompleted) {
      window.dataLayer.push({
        'ecommerce': {
          'purchase': {
            "actionField": {
              "id": getGuid,
              "revenue": state.invoice.pricing.firstCashInvoiceTotalPremiumAmount
            },
            "products": state.invoice.commercialComponents
          }
        }
      });
    }
  }

  setLanguage(lang: string): void {
    this.dataLayer.language = lang.toLowerCase();
    this.pushData();
  }
}

export const initDataLayer = (customMethods: KeyedObject<Function> = {}): void => {
  dataLayerInstance = new DataLayer(customMethods);
}

export const getDataLayer = (): DataLayer => {
  return dataLayerInstance;
}

export const dataLayerMiddleware: Middleware = ({ getState }: MiddlewareAPI) => {
  return next => (action) => {
    const returnValue = next(action);
    const state = getState();

    if (typeof window.dataLayer === "undefined") {
      dataLayerInstance.setLanguage(state.pageState.lang);
    }

    if (action.type === "SUBMIT_STEP") {
      const step = action.stepNumber;
      dataLayerInstance.setStep(step, state);
    }

    if (action.type === "REFRESH_OGONE_DATA_FIELDS") {
      dataLayerInstance.triggerConversion(state);
    }

    return returnValue;
  };
};
