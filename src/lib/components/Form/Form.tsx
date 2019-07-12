import React, { Component, FormEvent } from "react";

export class Form extends Component {
  onSubmit(e: FormEvent) {
    e.preventDefault();
  }

  render() {
    const { children } = this.props;

    return (
      <form
        className="form"
        onSubmit={e => this.onSubmit(e)}>
        { children }
      </form>
    );
  }
}
