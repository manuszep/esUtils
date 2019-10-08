"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var index_1 = require("../../../../../index");
exports.SET_CITY_AUTOCOMPLETE = "SET_CITY_AUTOCOMPLETE";
exports.SET_STREET_AUTOCOMPLETE = "SET_STREET_AUTOCOMPLETE";
exports.SET_AUTOCOMPLETE_FULL_DATA = "SET_AUTOCOMPLETE_FULL_DATA";
exports.NORMALIZE_POSTAL_ADDRESS_PROPOSALS = "NORMALIZE_POSTAL_ADDRESS_PROPOSALS";
exports.SET_NON_NORMALIZED_ADDRESS = "SET_NON_NORMALIZED_ADDRESS";
exports.SET_STREET_NR = "SET_STREET_NR";
exports.SET_BOX_NR = "SET_BOX_NR";
exports.updateAutoCompleteCities = function (postalCodeText, townText) {
    if (townText === void 0) { townText = ""; }
    return function (dispatch, getState) {
        var languageCode = getState().pageState.lang;
        axios_1.default.post(index_1.getEndPoints().GetCityProposals + "?v=" + (new Date()).valueOf(), {
            "applicationName": "emotor",
            "countryCode": "0000250026",
            "languageCode": languageCode,
            "postalCodeText": postalCodeText,
            "townText": townText
        }, {
            "headers": {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) {
            if (!response.data.GetCityProposalsResult) {
                return;
            }
            var ID = 0;
            var currentList = response.data.GetCityProposalsResult.map(function (item) {
                ID += 1;
                return {
                    "ID": ID.toString(),
                    "CITY": item.TownText,
                    "POSTAL_CODE": item.PostalCodeText,
                    "STREET": item.StreetText
                };
            });
            ID = 0; // reset ID
            var cities = response.data.GetCityProposalsResult.map(function (item) {
                ID += 1;
                return {
                    "value": ID.toString(),
                    "label": item.TownText + " (" + item.PostalCodeText + ")"
                };
            });
            dispatch({
                "type": exports.SET_CITY_AUTOCOMPLETE,
                "cities": cities
            });
            // store full address
            dispatch({
                "type": exports.SET_AUTOCOMPLETE_FULL_DATA,
                "data": currentList
            });
        })
            .catch(function (err) {
            Promise.reject(err);
        });
    };
};
exports.updateAutoCompleteStreets = function (postalCodeText, cityText, streetText) {
    if (streetText === void 0) { streetText = ""; }
    return function (dispatch, getState) {
        var languageCode = getState().pageState.lang;
        axios_1.default.post(index_1.getEndPoints().GetPostalAddressProposals + "?v=" + (new Date()).valueOf(), {
            "applicationName": "emotor",
            "countryCode": "0000250026",
            "languageCode": languageCode,
            "postalCodeText": postalCodeText,
            "streetText": streetText,
            "townText": cityText
        }, {
            "headers": {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) {
            if (!response.data.GetPostalAddressProposalsResult) {
                return;
            }
            var ID = 0;
            var currentList = response.data.GetPostalAddressProposalsResult.map(function (item) {
                ID += 1;
                return {
                    "ID": ID.toString(),
                    "CITY": item.TownText,
                    "POSTAL_CODE": item.PostalCodeText,
                    "STREET": item.StreetText
                };
            });
            ID = 0; // reset ID
            var streets = response.data.GetPostalAddressProposalsResult.map(function (item) {
                ID += 1;
                return {
                    "value": ID.toString(),
                    "label": "" + item.StreetText
                };
            });
            dispatch({
                "type": exports.SET_STREET_AUTOCOMPLETE,
                "streets": streets
            });
            // store full address list
            dispatch({
                "type": exports.SET_AUTOCOMPLETE_FULL_DATA,
                "data": currentList
            });
        })
            .catch(function (err) {
            Promise.reject(err);
        });
    };
};
