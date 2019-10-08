"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var axios_1 = __importDefault(require("axios"));
var index_1 = require("../../../index");
exports.CHECK_PROSPECT = "CHECK_PROSPECT";
exports.SET_BROKER_IBP = "SET_BROKER_IBP";
exports.RESET_POINTS_OF_SALE = "RESET_POINTS_OF_SALE";
exports.resetAgent = function () {
    return function (dispatch) {
        dispatch(exports.changeAgentReduxFields("", "", "", "", "", "", "", "", "", "", "", "", "", "", ""));
    };
};
exports.resetPointsOfSale = function () {
    return function (dispatch) {
        dispatch({
            "type": exports.RESET_POINTS_OF_SALE
        });
    };
};
exports.changeAgentReduxFields = function (id, name, street, streetNumber, postalCode, city, email, emailLead, fax, telephone, website, cbfaNumber, insuranceFederationCode, mainNetworkCode, producerNumber) {
    return function (dispatch) {
        var reduxFields = [
            { "name": index_1.DltFieldsNames.id, "value": id },
            { "name": index_1.DltFieldsNames.name, "value": name },
            { "name": index_1.DltFieldsNames.street, "value": street },
            { "name": index_1.DltFieldsNames.streetNumber, "value": streetNumber },
            { "name": index_1.DltFieldsNames.postalCode, "value": postalCode },
            { "name": index_1.DltFieldsNames.city, "value": city },
            { "name": index_1.DltFieldsNames.email, "value": email },
            { "name": index_1.DltFieldsNames.emailLead, "value": emailLead },
            { "name": index_1.DltFieldsNames.fax, "value": fax },
            { "name": index_1.DltFieldsNames.telephone, "value": telephone },
            { "name": index_1.DltFieldsNames.website, "value": website },
            { "name": index_1.DltFieldsNames.cbfaNumber, "value": cbfaNumber },
            { "name": index_1.DltFieldsNames.insuranceFederationCode, "value": insuranceFederationCode },
            { "name": index_1.DltFieldsNames.mainNetworkCode, "value": mainNetworkCode },
            { "name": index_1.DltFieldsNames.producerNumber, "value": producerNumber }
        ];
        dispatch(index_1.changeMultipleFields(reduxFields));
    };
};
exports.handleProspectSituationResponse = function (response) {
    return function (dispatch, getState) {
        dispatch({
            "type": exports.CHECK_PROSPECT,
            "payload": response
        });
        // if no agent_id has been chosen, we should do the following:
        // if there is one FSMA company, set it to that one
        // if there is more than one FSMA company, don't set checkProspect result
        // if there is one checkProspect company, use that one
        // else set it back to ""
        if (!index_1.hasAgent(getState().form.app.values.AGENT_ID)) {
            var userFsmaCompanies = getState().checkProspectSituation.USER_FSMA_COMPANIES;
            if (index_1.hasOneFSMACompany(userFsmaCompanies)) {
                var pointOfSale = userFsmaCompanies[0];
                dispatch(exports.changeAgentReduxFields(pointOfSale.ID, pointOfSale.NAME, pointOfSale.STREET, pointOfSale.STREET_NUMBER, pointOfSale.POSTAL_CODE, pointOfSale.CITY, pointOfSale.EMAIL, pointOfSale.EMAIL_LEAD, pointOfSale.FAX, pointOfSale.TELEPHONE, pointOfSale.WEBSITE, pointOfSale.CBFA_NUMBER, pointOfSale.INSURANCE_FEDERATION_CODE, pointOfSale.MAIN_NETWORK_CODE, pointOfSale.PRODUCER_NUMBER));
            }
            else {
                var checkProspectSituation = response.data;
                if (!index_1.hasMoreThanOneFSMACompany(userFsmaCompanies) && index_1.hasOneProspectPointOfSale(checkProspectSituation)) {
                    var pointOfSale = checkProspectSituation.pointsOfSale[0];
                    dispatch(exports.changeAgentReduxFields(pointOfSale.ID, pointOfSale.NAME, pointOfSale.STREET, pointOfSale.STREET_NUMBER, pointOfSale.POSTAL_CODE, pointOfSale.CITY, pointOfSale.EMAIL, pointOfSale.EMAIL_LEAD, pointOfSale.FAX, pointOfSale.TELEPHONE, pointOfSale.WEBSITE, pointOfSale.CBFA_NUMBER, pointOfSale.INSURANCE_FEDERATION_CODE, pointOfSale.MAIN_NETWORK_CODE, pointOfSale.PRODUCER_NUMBER));
                }
                else {
                    dispatch(exports.changeAgentReduxFields("", "", "", "", "", "", "", "", "", "", "", "", "", "", ""));
                }
            }
        }
    };
};
exports.getBrokerIBPList = function () {
    return function (dispatch) {
        return axios_1.default.get(index_1.getEndPoints().getIBPBrokers + "&v=" + (new Date()).valueOf())
            .then(function (response) {
            //using eval because the last entry of the array has a "," after it which means the entire object can't be parsed
            /* eslint-disable */
            var FSMA_DATA = {};
            /* eslint-enable */
            // Remove all new lines because it does not work with double quotes. HTML does not render new lines anyways.
            var r = response.data.replace(/\r?\n|\r/g, " ");
            // Unescape escaped quotes (Lookbehind does not exist in javascript regex engine)
            r = r.replace(/\\"/gm, '"');
            /* eslint-disable */
            eval("FSMA_DATA=" + r);
            /* eslint-enable */
            var FSMA_USER_COMPANIES = FSMA_DATA.USER_FSMA_COMPANIES;
            if (!FSMA_USER_COMPANIES.length) {
                FSMA_USER_COMPANIES = FSMA_DATA.DEFAULT_FSMA_COMPANY;
            }
            dispatch({ "type": exports.SET_BROKER_IBP, "list": FSMA_USER_COMPANIES });
        })
            .catch(function (err) {
            Promise.reject(err);
        });
    };
};
var onRetrieveProducerNumberError = function () {
    return function (dispatch, getState) {
        dispatch(index_1.showModal("ModalGeneralError", {
            "body": (react_1.default.createElement(index_1.Translation, null, "GEN_ERR_GET_PRODUCER_NUMBER"))
        }));
        dispatch(exports.resetAgent());
    };
};
exports.retrieveProducerNumber = function () {
    return function (dispatch, getState) {
        dispatch(index_1.activateLoading());
        var agentId = getState().form.app.values[index_1.DltFieldsNames.id];
        return axios_1.default.get(index_1.getEndPoints().getAgentData + "&v=" + (new Date()).valueOf() + "&AGENT_ID=" + agentId)
            .then(function (response) {
            dispatch(index_1.deactivateLoading());
            if (response.data.err || !response.data.agent || !response.data.agent.PRODUCER_NUMBER) {
                dispatch(onRetrieveProducerNumberError());
            }
            else {
                var producerNumber = response.data.agent.PRODUCER_NUMBER;
                dispatch(index_1.changeField(index_1.DltFieldsNames.producerNumber, producerNumber));
            }
        })
            .catch(function (err) {
            Promise.reject(err);
            dispatch(index_1.deactivateLoading());
            dispatch(onRetrieveProducerNumberError());
        });
    };
};
