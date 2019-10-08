"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var IframeLoader_1 = require("./IframeLoader");
var state_1 = require("../state");
var gmaps_1 = require("../gmaps");
var strings_1 = require("../strings");
var state_2 = require("../state");
var DltComponent = /** @class */ (function (_super) {
    __extends(DltComponent, _super);
    function DltComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.ifr = null;
        _this.state = {
            "lng": null,
            "lat": null,
            "address": "",
            "cityAddress": ""
        };
        return _this;
    }
    DltComponent.buildDltUrl = function (lang, lat, long, address) {
        var dltPath = state_1.getEndPoints().dlt || "";
        var addressEncode = encodeURI(address);
        if (lang.toUpperCase() === "FR" && dltPath.toUpperCase().includes("NL")) {
            dltPath = dltPath.replace("NL", "FR").replace("nl", "fr");
        }
        else if (lang.toUpperCase() === "NL" && dltPath.toUpperCase().includes("FR")) {
            dltPath = dltPath.replace("FR", "NL").replace("fr", "nl");
        }
        return dltPath + "?lang=" + lang.toLowerCase() + "&lat=" + lat + "&lng=" + long + "&address=" + addressEncode + state_1.getEndPoints().dltParameters;
    };
    DltComponent.prototype.componentWillMount = function () {
        var _this = this;
        gmaps_1.loadGoogleMapsJs(function () { _this.initMap(); });
    };
    DltComponent.prototype.getLatLngFromAddress = function () {
        var _this = this;
        var _a = this.state, googleMaps = _a.googleMaps, address = _a.address;
        var geocoder = new googleMaps.Geocoder();
        geocoder.geocode({ "address": address }, function (results, status) { return _this.handleGeocodingResults(results, status); });
    };
    DltComponent.prototype.initMap = function () {
        var _a = this.props, street = _a.street, streetNr = _a.streetNr, postalCode = _a.postalCode, city = _a.city;
        var googleMaps = window.google.maps;
        var gmapsAddress = strings_1.composeGmapsAddress(street, streetNr, postalCode, city);
        var cityAddress = strings_1.composeGmapsAddress("", "", postalCode, city);
        this.setState({
            "address": gmapsAddress,
            "cityAddress": cityAddress,
            googleMaps: googleMaps
        });
        this.getLatLngFromAddress();
    };
    DltComponent.prototype.handleGeocodingResults = function (results, status) {
        var _this = this;
        var _a = this.state, googleMaps = _a.googleMaps, cityAddress = _a.cityAddress;
        if (status === googleMaps.GeocoderStatus.OK) {
            var result = results[0];
            var geometry = result.geometry;
            if (geometry.viewport) {
                var loc = geometry.location;
                this.setState({
                    "lng": loc.lng(),
                    "lat": loc.lat()
                });
            }
        }
        else {
            var geocoder = new googleMaps.Geocoder();
            geocoder.geocode({ "address": cityAddress }, function (cityResults, cityStatus) { return _this.handleCityGeocodingResults(cityResults, cityStatus); });
        }
    };
    DltComponent.prototype.handleCityGeocodingResults = function (results, status) {
        var _a = this.state, googleMaps = _a.googleMaps, cityAddress = _a.cityAddress;
        var lang = this.props.lang;
        if (status === googleMaps.GeocoderStatus.OK) {
            var result = results[0];
            var geometry = result.geometry;
            if (geometry.viewport) {
                var loc = geometry.location;
                this.setState({
                    "lng": loc.lng(),
                    "lat": loc.lat(),
                    "address": cityAddress
                });
            }
        }
        else {
            this.setState({
                "lng": "4.3524138",
                "lat": "50.8467316",
                "address": (lang === "NL") ? strings_1.composeGmapsAddress("Grote Markt", "", "1000", "Brussel") : strings_1.composeGmapsAddress("Grand Place", "", "1000", "Bruxelles")
            });
        }
    };
    DltComponent.prototype.render = function () {
        var _this = this;
        return (react_1.default.createElement("div", { className: "dlt" },
            react_1.default.createElement(IframeLoader_1.IframeLoader, { title: "dlt-iframe", className: "dlt-iframe", subRef: function (f) { return _this.ifr = f; }, src: exports.Dlt.buildDltUrl(this.props.lang, this.state.lat, this.state.lng, this.state.address) })));
    };
    return DltComponent;
}(react_1.Component));
var mapStateToProps = function (state) {
    var commonItems = {
        "lang": state.pageState.lang
    };
    return state_2.wrapMapStateToProps(state, commonItems, {});
};
exports.Dlt = react_redux_1.connect(mapStateToProps, null)(DltComponent);
