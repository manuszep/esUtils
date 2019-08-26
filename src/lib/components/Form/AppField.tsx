import { Component, Dispatch } from "react";

import {
  changeField as changeFieldAction,
  unTouchField as unTouchFieldAction,
  getAppStore
} from "../../../index";

export class AppField extends Component {
  name: string;
  dispatch: Dispatch<any>;

  constructor(props: any) {
    super(props);

    this.name = '';
    this.dispatch = getAppStore().dispatch;
  }

  change(value: any, name: string) {
    const targetName = (typeof name !== "undefined") ? name : this.name;

    this.dispatch(changeFieldAction(targetName, value));
  }

  untouch(name: string) {
    const targetName = (typeof name !== "undefined") ? name : this.name;

    this.dispatch(unTouchFieldAction(targetName));
  }
}
