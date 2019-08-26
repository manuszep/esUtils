import React, { Component } from "react";
import { connect } from "react-redux";

import {
  IframeLoader,
  getEndPoints,
  loadGoogleMapsJs,
  composeGmapsAddress,
  wrapMapStateToProps,
  KeyedObject
} from "../../../index";

class DltComponent extends Component<KeyedObject, KeyedObject> {
  ifr: Component | null = null;

  static buildDltUrl(lang: string, lat: string, long: string, address: string): string {
    let dltPath = getEndPoints().dlt || "";
    const addressEncode = encodeURI(address);

    if (lang.toUpperCase() === "FR" && dltPath.toUpperCase().includes("NL")) {
      dltPath = dltPath.replace("NL", "FR").replace("nl", "fr");
    } else if (lang.toUpperCase() === "NL" && dltPath.toUpperCase().includes("FR")) {
      dltPath = dltPath.replace("FR", "NL").replace("fr", "nl");
    }

    return `${dltPath}?lang=${lang.toLowerCase()}&lat=${lat}&lng=${long}&address=${addressEncode}${getEndPoints().dltParameters}`;
  }

  constructor(props: KeyedObject) {
    super(props);

    this.state = {
      "lng": null,
      "lat": null,
      "address": "",
      "cityAddress": ""
    };
  }

  componentWillMount() {
    loadGoogleMapsJs(() => { this.initMap(); });
  }

  getLatLngFromAddress() {
    const {
      googleMaps,
      address
    } = this.state;

    if (!googleMaps) { return; }
    const geocoder = new googleMaps.Geocoder();
    geocoder.geocode(
      { "address": address },
      (results: KeyedObject[], status: string) => this.handleGeocodingResults(results, status)
    );
  }

  initMap() {
    const {
      street,
      streetNr,
      postalCode,
      city
    } = this.props;
    const googleMaps = window.google.maps;
    const gmapsAddress = composeGmapsAddress(
      street,
      streetNr,
      postalCode,
      city
    );
    const cityAddress = composeGmapsAddress("", "", postalCode, city);

    this.setState({
      "address": gmapsAddress,
      "cityAddress": cityAddress,
      googleMaps
    });

    this.getLatLngFromAddress();
  }

  handleGeocodingResults(results: KeyedObject[], status: string) {
    const {
      googleMaps,
      cityAddress
    } = this.state;

    if (status === googleMaps.GeocoderStatus.OK) {
      const result = results[0];
      const geometry = result.geometry;
      if (geometry.viewport) {
        const loc = geometry.location;
        this.setState({
          "lng": loc.lng(),
          "lat": loc.lat()
        });
      }
    } else {
      const geocoder = new googleMaps.Geocoder();
      geocoder.geocode(
        { "address": cityAddress },
        (cityResults: KeyedObject[], cityStatus: string) => this.handleCityGeocodingResults(cityResults, cityStatus)
      );
    }
  }

  handleCityGeocodingResults(results: KeyedObject[], status: string) {
    const {
      googleMaps,
      cityAddress
    } = this.state;

    const { lang } = this.props;

    if (status === googleMaps.GeocoderStatus.OK) {
      const result = results[0];
      const geometry = result.geometry;
      if (geometry.viewport) {
        const loc = geometry.location;
        this.setState({
          "lng": loc.lng(),
          "lat": loc.lat(),
          "address": cityAddress
        });
      }
    } else {
      this.setState({
        "lng": "4.3524138",
        "lat": "50.8467316",
        "address": (lang === "NL") ? composeGmapsAddress("Grote Markt", "", "1000", "Brussel") : composeGmapsAddress("Grand Place", "", "1000", "Bruxelles")
      });
    }
  }

  render() {
    return (
      <div className="dlt">
        <IframeLoader
          title={"dlt-iframe"}
          className="dlt-iframe"
          subRef={(f: Component) => this.ifr = f}
          src={Dlt.buildDltUrl(this.props.lang, this.state.lat, this.state.lng, this.state.address)}>
        </IframeLoader>
      </div>
    );
  }
}

const mapStateToProps = (state: KeyedObject) => {
  const commonItems = {
    "lang": state.pageState.lang
  };
  return wrapMapStateToProps(state, commonItems, {});
};

export const Dlt = connect(mapStateToProps, null)(DltComponent);
