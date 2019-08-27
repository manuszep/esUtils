import React, { Component } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import {
  Translation as T,
  Icon,
  KeyedObject,
  gotoStep as gotoStepAction
} from "../../index";

class EditableValueComponent extends Component<KeyedObject, KeyedObject> {
  render() {
    const {
      children,
      step,
      cls,
      gotoStep,
      withSpaces = true
    } = this.props;

    const iconCls = withSpaces ? "icon-with-spaces" : undefined;

    return (
      <span className={cls || "value"}>
        <T tag="span" noprefix>{children}</T>
        <small className="text-nowrap">
          <a href="#" onClick={() => gotoStep(step)} className="edit-link">
            <Icon name="edit" tag="span" className={iconCls} />
            <T tag="span" className="edit-link__text">CHANGE_VALUE_LINK</T>
          </a>
        </small>
      </span>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  "gotoStep": (step: string) => {
    dispatch(gotoStepAction(step));
  }
});

export const EditableValue = connect(null, mapDispatchToProps)(EditableValueComponent);
