"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var SimpleModalComponent_1 = require("../Modal/SimpleModalComponent");
var TranslationComponent_1 = require("../TranslationComponent");
var mapStateToProps = function (state, ownProps) {
    return {
        "title": ownProps.title ? ownProps.title : react_1.default.createElement(TranslationComponent_1.Translation, null, "GENERAL_ERROR_TITLE"),
        "body": ownProps.body ? ownProps.body : react_1.default.createElement(TranslationComponent_1.Translation, null, "GEN_ERR"),
        "closeLabel": react_1.default.createElement(TranslationComponent_1.Translation, null, "GENERAL_ERROR_CLOSE"),
        "modalId": ownProps.modalId
    };
};
exports.ModalGeneralError = react_redux_1.connect(mapStateToProps, null)(SimpleModalComponent_1.SimpleModal);
