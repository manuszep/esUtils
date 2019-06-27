import React, { Component } from "react";
import { getTranslation } from "./TranslationComponent";

export type LinkComponentPropsType = {
  href: string,
  blank: Boolean
}

export class Link extends Component<LinkComponentPropsType, {}> {
  render() {
    const {
      href,
      blank,
      children,
      ...rest
    } = this.props;

    let undef;

    const attrBlank = blank ? "_blank" : undef;
    const attrRel = blank ? "noopener noreferrer" : undef;
    const attrHref = href ? getTranslation(href) : "#";
    const content = (typeof children === "string") ? getTranslation(children) : children;

    return (
      <a
        href={attrHref}
        target={attrBlank}
        rel={attrRel}
        {...rest}>
        {content}
      </a>
    );
  }
}
