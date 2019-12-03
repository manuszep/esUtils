import { Middleware, MiddlewareAPI } from "redux";

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

    this.isUnique = [];
    this.customMethods = customMethods;
    this.pushData();
  }

  addData(data: KeyedObject): void {
    Object.keys(data).forEach((key) => {
      this.dataLayer[key] = data[key];
    });
  }

  pushData(): void {
    window.dataLayer.push(Object.assign({'event': 'ecommerce'}, this.dataLayer));
  }

  setStep(step: Step | undefined | null, state: KeyedObject) {
    if (typeof step !== "undefined" && step !== null) {
      this.dataLayer[`${getAppPrefix()}_funnel_step`] = step.pageTitle;
      this.dataLayer[`${getAppPrefix()}_funnel_chapter`] = step.chapter;

      const method = `setDataFor${capitalizeFirstLetter(step.ID)}`;

      if (typeof this.customMethods[method] === "function") {
        const data = this.customMethods[method](state.form.app.values);
        this.addData(data);
      }

      this.pushData();
    }
  }

  triggerConversion(state: KeyedObject): void {
    const appGlobalVar = getAppGlobalVar();
    if (
      (typeof appGlobalVar.paymentState !== "undefined" && appGlobalVar.paymentState === "accepted")
      || appGlobalVar.flowCompleted) {
      window.dataLayer.push({
        'event': 'ecommerce',
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
