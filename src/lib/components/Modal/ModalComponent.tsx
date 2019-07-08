import React, { Component as ReactComponent } from "react";
import { connect } from "react-redux";
import classNames from "classnames";

import { SimpleModal } from "./SimpleModalComponent";

import { dismissModal } from "./ModalAction";
import { KeyedObject } from "../../types";
import { Dispatch } from "redux";

let appModalContainersPath: string;

export const initModal = (modalContainersPath: string): void => {
  appModalContainersPath = modalContainersPath;
}

export type ModalComponentPropsType = {
  modalContentPath: string,
  modalProps: KeyedObject,
  closeModal: Function,
  show: boolean
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
    if (props.modalContentPath === null) return;
    import(`${appModalContainersPath}/${props.modalContentPath}.jsx`).then((result) => {
      this.setState({ "Component": result.default });
    });
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
    const { show, closeModal } = this.props;
    const cls = classNames("modal", "fade", { "show": show });
    if (!show) return null;
    return (
      <div className={cls} role="dialog">
        <div
          role="button"
          tabIndex={0}
          className="modal-backdrop"
          onClick={() => closeModal()}
          onKeyPress={() => closeModal()} />
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