import React, { Dispatch } from "react";
import axios from "axios";

import {
  changeMultipleFields,
  getEndPoints,
  showModal,
  activateLoading,
  deactivateLoading,
  changeField,
  DltFieldsNames,
  hasAgent,
  hasOneFSMACompany,
  hasMoreThanOneFSMACompany,
  hasOneProspectPointOfSale,
  KeyedObject,
  Translation as T
} from "local";

export const CHECK_PROSPECT = "CHECK_PROSPECT";
export const SET_BROKER_IBP = "SET_BROKER_IBP";
export const RESET_POINTS_OF_SALE = "RESET_POINTS_OF_SALE";

export const resetAgent = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch(changeAgentReduxFields("", "", "", "", "", "", "", "", "", "", "", "", "", "", ""));
  };
};

export const resetPointsOfSale = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      "type": RESET_POINTS_OF_SALE
    });
  };
};

export const changeAgentReduxFields = (
  id: string,
  name: string,
  street: string,
  streetNumber: string,
  postalCode: string,
  city: string,
  email: string,
  emailLead: string,
  fax: string,
  telephone: string,
  website: string,
  cbfaNumber: string,
  insuranceFederationCode: string,
  mainNetworkCode: string,
  producerNumber: string
) => {
  return (dispatch: Dispatch<any>) => {
    const reduxFields = [
      { "name": DltFieldsNames.id, "value": id },
      { "name": DltFieldsNames.name, "value": name },
      { "name": DltFieldsNames.street, "value": street },
      { "name": DltFieldsNames.streetNumber, "value": streetNumber },
      { "name": DltFieldsNames.postalCode, "value": postalCode },
      { "name": DltFieldsNames.city, "value": city },
      { "name": DltFieldsNames.email, "value": email },
      { "name": DltFieldsNames.emailLead, "value": emailLead },
      { "name": DltFieldsNames.fax, "value": fax },
      { "name": DltFieldsNames.telephone, "value": telephone },
      { "name": DltFieldsNames.website, "value": website },
      { "name": DltFieldsNames.cbfaNumber, "value": cbfaNumber },
      { "name": DltFieldsNames.insuranceFederationCode, "value": insuranceFederationCode },
      { "name": DltFieldsNames.mainNetworkCode, "value": mainNetworkCode },
      { "name": DltFieldsNames.producerNumber, "value": producerNumber }
    ];
    dispatch(changeMultipleFields(reduxFields));
  };
};

export const handleProspectSituationResponse = (response: any) => {
  return (dispatch: Dispatch<any>, getState: Function) => {
    dispatch({
      "type": CHECK_PROSPECT,
      "payload": response
    });

    // if no agent_id has been chosen, we should do the following:
    // if there is one FSMA company, set it to that one
    // if there is more than one FSMA company, don't set checkProspect result
    // if there is one checkProspect company, use that one
    // else set it back to ""
    if (!hasAgent(getState().form.app.values.AGENT_ID)) {
      const userFsmaCompanies = getState().checkProspectSituation.USER_FSMA_COMPANIES;
      if (hasOneFSMACompany(userFsmaCompanies)) {
        const pointOfSale = userFsmaCompanies[0];
        dispatch(
          changeAgentReduxFields(
            pointOfSale.ID,
            pointOfSale.NAME,
            pointOfSale.STREET,
            pointOfSale.STREET_NUMBER,
            pointOfSale.POSTAL_CODE,
            pointOfSale.CITY,
            pointOfSale.EMAIL,
            pointOfSale.EMAIL_LEAD,
            pointOfSale.FAX,
            pointOfSale.TELEPHONE,
            pointOfSale.WEBSITE,
            pointOfSale.CBFA_NUMBER,
            pointOfSale.INSURANCE_FEDERATION_CODE,
            pointOfSale.MAIN_NETWORK_CODE,
            pointOfSale.PRODUCER_NUMBER
          )
        );
      } else {
        const checkProspectSituation = response.data;
        if (!hasMoreThanOneFSMACompany(userFsmaCompanies) && hasOneProspectPointOfSale(checkProspectSituation)) {
          const pointOfSale = checkProspectSituation.pointsOfSale[0];

          dispatch(
            changeAgentReduxFields(
              pointOfSale.ID,
              pointOfSale.NAME,
              pointOfSale.STREET,
              pointOfSale.STREET_NUMBER,
              pointOfSale.POSTAL_CODE,
              pointOfSale.CITY,
              pointOfSale.EMAIL,
              pointOfSale.EMAIL_LEAD,
              pointOfSale.FAX,
              pointOfSale.TELEPHONE,
              pointOfSale.WEBSITE,
              pointOfSale.CBFA_NUMBER,
              pointOfSale.INSURANCE_FEDERATION_CODE,
              pointOfSale.MAIN_NETWORK_CODE,
              pointOfSale.PRODUCER_NUMBER
            )
          );
        } else {
          dispatch(changeAgentReduxFields("", "", "", "", "", "", "", "", "", "", "", "", "", "", ""));
        }
      }
    }
  };
};

export const getBrokerIBPList = () => {
  return (dispatch: Dispatch<any>) => {
    return axios.get(`${getEndPoints().getIBPBrokers}&v=${(new Date()).valueOf()}`)
      .then((response) => {
        //using eval because the last entry of the array has a "," after it which means the entire object can't be parsed
        /* eslint-disable */
        let FSMA_DATA: KeyedObject<any> = {};
        /* eslint-enable */
        // Remove all new lines because it does not work with double quotes. HTML does not render new lines anyways.
        let r = response.data.replace(/\r?\n|\r/g, " ");
        // Unescape escaped quotes (Lookbehind does not exist in javascript regex engine)
        r = r.replace(/\\"/gm, '"');
        /* eslint-disable */
        eval("FSMA_DATA=" + r);
        /* eslint-enable */
        let FSMA_USER_COMPANIES = FSMA_DATA.USER_FSMA_COMPANIES;
        if (!FSMA_USER_COMPANIES.length) {
          FSMA_USER_COMPANIES = FSMA_DATA.DEFAULT_FSMA_COMPANY;
        }
        dispatch({ "type": SET_BROKER_IBP, "list": FSMA_USER_COMPANIES });
      })
      .catch((err) => {
        Promise.reject(err);
      });
  };
};

const onRetrieveProducerNumberError = () => {
  return (dispatch: Dispatch<any>, getState: Function) => {
    dispatch(showModal("ModalGeneralError", {
      "body": (<T>GEN_ERR_GET_PRODUCER_NUMBER</T>)
    }));
    dispatch(resetAgent());
  };
};

export const retrieveProducerNumber = () => {
  return (dispatch: Dispatch<any>, getState: Function) => {
    dispatch(activateLoading());
    const agentId = getState().form.app.values[DltFieldsNames.id];
    return axios.get(`${getEndPoints().getAgentData}&v=${(new Date()).valueOf()}&AGENT_ID=${agentId}`)
      .then((response) => {
        dispatch(deactivateLoading());
        if (response.data.err || !response.data.agent || !response.data.agent.PRODUCER_NUMBER) {
          dispatch(onRetrieveProducerNumberError());
        } else {
          const producerNumber = response.data.agent.PRODUCER_NUMBER;
          dispatch(changeField(DltFieldsNames.producerNumber, producerNumber));
        }
      })
      .catch((err) => {
        Promise.reject(err);
        dispatch(deactivateLoading());
        dispatch(onRetrieveProducerNumberError());
      });
  };
};
