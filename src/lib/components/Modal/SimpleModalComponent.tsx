import React, { Component } from "react";

export type SimpleModalComponentPropsType = {
  customOnClose?: Function,
  afterCloseAction?: Function,
  closeModal: Function,
  modalId?: string,
  title?: string,
  body?: JSX.Element,
  primaryLabel?: string,
  customPrimaryAction?: Function,
  customSecondaryAction?: Function,
  handlePrimaryAction?: Function,
  closeLabel?: string,
  primaryLabelDisabled?: boolean
}

export class SimpleModal extends Component<SimpleModalComponentPropsType, {}> {
  closeModal() {
    const { customOnClose, afterCloseAction, closeModal } = this.props;

    if (customOnClose) {
      customOnClose();
    }

    closeModal();
    if (typeof afterCloseAction === "function") {
      afterCloseAction();
    }
  }

  render() {
    const {
      modalId,
      title,
      body,
      primaryLabel,
      customPrimaryAction,
      customSecondaryAction,
      handlePrimaryAction,
      closeLabel,
      closeModal,
      primaryLabelDisabled
    } = this.props;

    const modalClassId = modalId ? `cy-modal-${modalId}` : "";

    return (
      <div className={`cy-modal ${modalClassId}`}>
        <div className="modal-header" {... !title ? { "hidden": true } : {}}>
          <h5 className="modal-title">
            <span className="cy-modal-title">{title}</span>
          </h5>
          <button type="button" className="close" aria-label="Close" onClick={() => closeModal()}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body" {... !body ? { "hidden": true } : {}}>
          <span className="cy-modal-body">{body}</span>
        </div>

        <div className="modal-footer" {... !closeLabel && !primaryLabel ? { "hidden": true } : {}}>

          <button
            {... !closeLabel ? { "hidden": true } : {}}
            type="button"
            className="btn btn-ghost cy-modal-close"
            onClick={() => {
              if (typeof customSecondaryAction === "function") {
                customSecondaryAction();
              }
              this.closeModal();
            }}>
            {closeLabel}
          </button>

          <button
            type="button"
            className="btn btn-axa cy-modal-accept"
            {... !primaryLabel ? { "hidden": true } : {}}
            {... primaryLabelDisabled ? { "disabled": true } : {}}
            onClick={() => {
              if (typeof customPrimaryAction === "function") {
                customPrimaryAction();
              } else if (typeof handlePrimaryAction === "function") {
                handlePrimaryAction();
              }
              this.closeModal();
            }}>
            <span>{primaryLabel}</span>
          </button>
        </div>
      </div>
    );
  }
}
