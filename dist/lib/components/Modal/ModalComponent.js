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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var classnames_1 = __importDefault(require("classnames"));
var index_1 = require("../../../index");
var appModalContainers;
var appModalPrefix;
exports.initModal = function (modalContainers, prefix) {
    appModalPrefix = prefix;
    appModalContainers = modalContainers;
};
exports.getModalPrefix = function () {
    return appModalPrefix;
};
var ModalComponent = /** @class */ (function (_super) {
    __extends(ModalComponent, _super);
    function ModalComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { "Component": null };
        _this.fetchModalContent(props);
        return _this;
    }
    ModalComponent.prototype.componentWillReceiveProps = function (nextProps) {
        this.fetchModalContent(nextProps);
    };
    ModalComponent.prototype.fetchModalContent = function (props) {
        var path = props.modalContentPath;
        if (path === null)
            return;
        this.setState({ "Component": appModalContainers[path] });
    };
    ModalComponent.prototype.renderModalContent = function () {
        var _a = this.props, modalContentPath = _a.modalContentPath, modalProps = _a.modalProps, closeModal = _a.closeModal;
        var Component = this.state.Component;
        if (modalContentPath === null) {
            return react_1.default.createElement(index_1.SimpleModal, __assign({}, this.props, modalProps));
        }
        return Component ? (react_1.default.createElement(Component, __assign({ closeModal: closeModal }, modalProps))) : null;
    };
    ModalComponent.prototype.render = function () {
        var _a = this.props, show = _a.show, closeModal = _a.closeModal, modalProps = _a.modalProps;
        var cls = classnames_1.default("modal", "fade", { "show": show });
        if (!show)
            return null;
        return (react_1.default.createElement("div", { className: cls, role: "dialog" },
            react_1.default.createElement("div", { role: "button", tabIndex: 0, className: "modal-backdrop", onClick: function () {
                    closeModal();
                    if (typeof modalProps.afterCloseAction === "function") {
                        modalProps.afterCloseAction();
                    }
                }, onKeyPress: function () {
                    closeModal();
                    if (typeof modalProps.afterCloseAction === "function") {
                        modalProps.afterCloseAction();
                    }
                } }),
            react_1.default.createElement("div", { className: "modal-dialog", role: "document" },
                react_1.default.createElement("div", { className: "modal-content" }, this.renderModalContent()))));
    };
    return ModalComponent;
}(react_1.Component));
var mapStateToProps = function (state) { return ({
    "modalProps": state.modal.props || {}
}); };
var mapDispatchToProps = function (dispatch) { return ({
    "closeModal": function () { return dispatch(index_1.dismissModal()); }
}); };
exports.Modal = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
