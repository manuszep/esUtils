import React, { Component } from "react";
import classnames from "classnames";

import {
  Translation as T,
  KeyedObject
} from "local";

export class IframeLoader extends Component<KeyedObject, KeyedObject> {
  constructor(props: KeyedObject) {
    super(props);

    this.state = { "loaded": false };
    this.handleLoaded = this.handleLoaded.bind(this);
  }

  handleLoaded() {
    this.setState({ "loaded": true });
  }

  render() {
    const {
      title,
      className,
      subRef,
      src,
      loadingText
    } = this.props;

    const { loaded } = this.state;
    const loaderCls = classnames("iframe-loader", { "iframe-loader--loaded": loaded });

    return (
      <div className={loaderCls}>
        <iframe
          title={title}
          className={className}
          ref={f => subRef(f)}
          src={src}
          onLoad={this.handleLoaded}></iframe>

        <div className="dimmer iframe-loader__spinner">
          <div className="loading-spinner is-active">
            <div className="loading-spinner-animation" />
            <T className="loading-spinner-caption">{loadingText}</T>
          </div>
        </div>
      </div>
    );
  }
}
