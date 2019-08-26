import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getTranslationFromLabelDictionary,
  parseStringTemplate,
  KeyedObject
} from "../../../index";

/**
 * This is a simple wrapper to inject HTML translated content in JSX.
 */
class TranslationComponent extends Component<KeyedObject, {}> {
  getLabelValue() {
    const { children, labels } = this.props;
    const currentLabels = labels || {};
    return getTranslationFromLabelDictionary(children, currentLabels);
  }

  render() {
    const {
      tag,
      children,
      dispatch,
      labels,
      replacements,
      ...rest
    } = this.props;

    const currentReplacements = replacements || {};
    const translatedString = parseStringTemplate(this.getLabelValue(), currentReplacements);
    const CustomTag: any = (typeof tag !== "undefined") ? tag : "span";

    return (
      <CustomTag
        dangerouslySetInnerHTML={{ "__html": translatedString }}
        {...rest} />
    );
  }
}

const mapStateToProps = (state: KeyedObject) => ({
  "labels": state.translation.labels
});

export const Translation = connect(mapStateToProps, null)(TranslationComponent);
export default Translation;
