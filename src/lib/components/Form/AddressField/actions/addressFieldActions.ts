import { Dispatch } from "redux";
import axios from "axios";

import { getEndPoints, KeyedObject } from "../../../../../index";

export const SET_CITY_AUTOCOMPLETE = "SET_CITY_AUTOCOMPLETE";
export const SET_STREET_AUTOCOMPLETE = "SET_STREET_AUTOCOMPLETE";
export const SET_AUTOCOMPLETE_FULL_DATA = "SET_AUTOCOMPLETE_FULL_DATA";
export const NORMALIZE_POSTAL_ADDRESS_PROPOSALS = "NORMALIZE_POSTAL_ADDRESS_PROPOSALS";
export const SET_NON_NORMALIZED_ADDRESS = "SET_NON_NORMALIZED_ADDRESS";
export const SET_STREET_NR = "SET_STREET_NR";
export const SET_BOX_NR = "SET_BOX_NR";

export const updateAutoCompleteCities = (postalCodeText: string, townText = "") => {
  return (dispatch: Dispatch, getState: Function) => {
    const languageCode = getState().pageState.lang;

    axios.post(`${getEndPoints().GetCityProposals}?v=${(new Date()).valueOf()}`,
      {
        "applicationName": "emotor",
        "countryCode": "0000250026",
        "languageCode": languageCode,
        "postalCodeText": postalCodeText,
        "townText": townText
      },
      {
        "headers": {
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        if (!response.data.GetCityProposalsResult) {
          return;
        }

        let ID = 0;
        const currentList = response.data.GetCityProposalsResult.map((item: KeyedObject) => {
          ID += 1;
          return {
            "ID": ID.toString(),
            "CITY": item.TownText,
            "POSTAL_CODE": item.PostalCodeText,
            "STREET": item.StreetText
          };
        });

        ID = 0; // reset ID
        const cities = response.data.GetCityProposalsResult.map((item: KeyedObject) => {
          ID += 1;
          return {
            "value": ID.toString(),
            "label": `${item.TownText} (${item.PostalCodeText})`
          };
        });

        dispatch({
          "type": SET_CITY_AUTOCOMPLETE,
          "cities": cities
        });

        // store full address
        dispatch({
          "type": SET_AUTOCOMPLETE_FULL_DATA,
          "data": currentList
        });
      })
      .catch((err) => {
        Promise.reject(err);
      });
  };
};

export const updateAutoCompleteStreets = (postalCodeText: string, cityText: string, streetText = "") => {
  return (dispatch: Dispatch, getState: Function) => {
    const languageCode = getState().pageState.lang;

    axios.post(`${getEndPoints().GetPostalAddressProposals}?v=${(new Date()).valueOf()}`,
      {
        "applicationName": "emotor",
        "countryCode": "0000250026",
        "languageCode": languageCode,
        "postalCodeText": postalCodeText,
        "streetText": streetText,
        "townText": cityText
      },
      {
        "headers": {
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        if (!response.data.GetPostalAddressProposalsResult) {
          return;
        }

        let ID = 0;
        const currentList = response.data.GetPostalAddressProposalsResult.map((item: KeyedObject) => {
          ID += 1;
          return {
            "ID": ID.toString(),
            "CITY": item.TownText,
            "POSTAL_CODE": item.PostalCodeText,
            "STREET": item.StreetText
          };
        });

        ID = 0; // reset ID
        const streets = response.data.GetPostalAddressProposalsResult.map((item: KeyedObject) => {
          ID += 1;
          return {
            "value": ID.toString(),
            "label": `${item.StreetText}`
          };
        });


        dispatch({
          "type": SET_STREET_AUTOCOMPLETE,
          "streets": streets
        });

        // store full address list
        dispatch({
          "type": SET_AUTOCOMPLETE_FULL_DATA,
          "data": currentList
        });
      })
      .catch((err) => {
        Promise.reject(err);
      });
  };
}
