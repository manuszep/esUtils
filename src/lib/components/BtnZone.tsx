import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import jump from "jump.js";

import {
  Translation as T,
  showModal as showModalAction,
  gotoPreviousStep as gotoPreviousStepAction,
  gotoStep as gotoStepAction,
  handleGoToPreviousStep as handleGoToPreviousStepAction,
  KeyedObject
} from "../../index";

class BtnZoneComponent extends Component<KeyedObject, KeyedObject> {
  componentDidUpdate(prevProps: KeyedObject) {
    const { hasError } = this.props;
    const { hasErrorPrev } = prevProps;

    if (hasErrorPrev !== hasError
      && hasError
      && document.querySelectorAll('.has-danger').length) {
      jump(".has-danger", {
        "duration": 200,
        "offset": -90
      });
    }
  }

  render() {
    const {
      labelPrimary,
      labelSecondary,
      secondaryAction,
      gotoPreviousStep,
      submitEvent,
      remark,
      saveButton,
      mobileSave,
      disabled,
      className,
      showModal
    } = this.props;
    const localSecondaryAction = (typeof secondaryAction !== 'undefined') ? secondaryAction : gotoPreviousStep;
    const primaryAction = (disabled) ? null : submitEvent;
    const primaryBtnCls = classnames("btn btn-lg btn-axa", "cy-next");
    const btnPrimary = (labelPrimary) ? (
      <T
        id="btnZonePrimary"
        tag="button"
        className={primaryBtnCls}
        onMouseUp={primaryAction}
        onTouchEnd={primaryAction}
        disabled={disabled}>
        {labelPrimary}
      </T>
    ) : null;

    const btnPrimaryMobile = (labelPrimary) ? (
      <T
        id="btnZonePrimaryMobile"
        tag="button"
        className="btn btn-lg btn-axa"
        onMouseUp={primaryAction}
        onTouchEnd={primaryAction}
        disabled={disabled}>
        {labelPrimary}
      </T>
    ) : null;

    const btnSecondary = (labelSecondary) ? (
      <T
        id="btnZoneSecondary"
        tag="button"
        className="btn btn-lg btn-ghost"
        onClick={() => localSecondaryAction()}
        onTouchEnd={() => localSecondaryAction()}>
        {labelSecondary}
      </T>
    ) : null;

    const btnSave = (
      <button
        type="button"
        className="btn btn-lg btn-ghost"
        onClick={() => showModal("ModalSaveForLaterContainer")}>
        <T tag="span">BUTTON_SAVE_FOR_LATER</T>
      </button>
    );
    const remarkTag = (remark)
      ? <T tag="p" className="text-center block-center">{remark}</T>
      : null;

    const cls = classnames("form-group btn-zone", className);

    return (
      <div>
        <div className={cls}>
          {remarkTag}
          <div className="btn-zone__desktop hidden-md-down">
            {btnSecondary}
            {saveButton && btnSave}
            {btnPrimary}
          </div>
          <div className="btn-zone__mobile hidden-lg-up">
            {btnPrimaryMobile}
            {mobileSave && btnSave}
            {btnSecondary}
          </div>
        </div>
      </div>
    );
  }
}

// Map Redux store to component props
const mapStateToProps = (state: KeyedObject, props: KeyedObject) => {
  const hasError = (typeof props.step !== "undefined" && props.step !== "") ? state.pageState.stepStates[props.step].stepSubmitted && !state.pageState.stepStates[props.step].stepIsValid : false;
  return {
    "currentStep": state.pageState.currentStep,
    "direction": state.pageState.direction,
    "hasError": hasError
  };
};

// map Redux dispatch events to component props
const mapDispatchToProps = (dispatch: any) => ({
  "gotoPreviousStep": () => {
    dispatch(handleGoToPreviousStepAction());
    dispatch(gotoPreviousStepAction());
  },
  "gotoStep": (stepNumber: string) => dispatch(gotoStepAction(stepNumber)),
  "showModal": (modalID: string) => dispatch(showModalAction(modalID))
});

export const BtnZone = connect(mapStateToProps, mapDispatchToProps)(BtnZoneComponent);