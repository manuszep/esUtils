import React, { Component, AllHTMLAttributes } from "react";
import { connect } from "react-redux";

import {
  getTranslationFromLabelDictionary,
  parseStringTemplate,
  KeyedObject
} from "../../../index";

interface PassedProps extends React.Props<any> {
  tag?: string,
  labels?: {[k: string]: string},
  replacements?: {[k: string]: string},
  noprefix?: boolean,
  dispatch?: any
}

/**
 * This is a simple wrapper to inject HTML translated content in JSX.
 */
class TranslationComponent extends Component<AllHTMLAttributes<any> & PassedProps, {}> {
  getLabelValue(noprefix = true) {
    const { children, labels } = this.props;
    const currentLabels = labels || {};
    return getTranslationFromLabelDictionary(children, currentLabels, noprefix);
  }

  render() {
    const {
      tag,
      children,
      labels,
      replacements,
      noprefix,
      dispatch,
      ...rest
    } = this.props;

    const noPrefixValue = typeof noprefix !== "undefined" && noprefix !== false;
    const currentReplacements = replacements || {};
    const translatedString = parseStringTemplate(this.getLabelValue(noPrefixValue), currentReplacements);
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
