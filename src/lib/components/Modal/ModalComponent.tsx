import React, { Component as ReactComponent } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import classNames from "classnames";

import {
  SimpleModal,
  dismissModal,
  KeyedObject
} from "../../../index";

let appModalContainers: KeyedObject;
let appModalPrefix: string;

export const initModal = (modalContainers: KeyedObject, prefix: string): void => {
  appModalPrefix = prefix;
  appModalContainers = modalContainers;
}

export const getModalPrefix = () => {
  return appModalPrefix;
}

export type ModalComponentPropsType = {
  modalContentPath: string,
  modalProps: KeyedObject,
  closeModal: Function,
  show: boolean,
  afterCloseAction: Function
}

export type ModalComponentStateType = {
  Component: any
}

class ModalComponent extends ReactComponent<ModalComponentPropsType, ModalComponentStateType> {
  constructor(props: ModalComponentPropsType) {
    super(props);
    this.state = { "Component": null };
    this.fetchModalContent(props);
  }

  componentWillReceiveProps(nextProps: KeyedObject) {
    this.fetchModalContent(nextProps);
  }

  fetchModalContent(props: KeyedObject) {
    const path = props.modalContentPath;
    if (path === null) return;

    this.setState({ "Component": appModalContainers[path] });
  }

  renderModalContent() {
    const { modalContentPath, modalProps, closeModal } = this.props;
    const { Component } = this.state;

    if (modalContentPath === null) {
      return <SimpleModal {...this.props} {...modalProps} />;
    }

    return Component ? (
      <Component
        closeModal={closeModal}
        {...modalProps} />
    ) : null;
  }

  render() {
    const { show, closeModal, modalProps } = this.props;
    const cls = classNames("modal", "fade", { "show": show });
    if (!show) return null;
    return (
      <div className={cls} role="dialog">
        <div
          role="button"
          tabIndex={0}
          className="modal-backdrop"
          onClick={() => {
            closeModal();
            if (typeof modalProps.afterCloseAction === "function") {
              modalProps.afterCloseAction();
            }
          }}
          onKeyPress={() => {
            closeModal();
            if (typeof modalProps.afterCloseAction === "function") {
              modalProps.afterCloseAction();
            }
          }} />
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            {this.renderModalContent()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: KeyedObject) => ({
  "modalProps": state.modal.props || {}
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  "closeModal": () => dispatch(dismissModal())
});

export const Modal = connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
