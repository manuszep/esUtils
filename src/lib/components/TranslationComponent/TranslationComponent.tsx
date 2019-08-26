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
  getLabelValue(noprefix = true) {
    const { children, labels } = this.props;
    const currentLabels = labels || {};
    return getTranslationFromLabelDictionary(children, currentLabels, noprefix);
  }

  render() {
    const {
      tag,
      children,
      dispatch,
      labels,
      replacements,
      noprefix,
      ...rest
    } = this.props;

    const currentReplacements = replacements || {};
    const translatedString = parseStringTemplate(this.getLabelValue(noprefix), currentReplacements);
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
