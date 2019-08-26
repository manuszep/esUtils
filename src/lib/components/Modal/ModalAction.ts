import ReactGA from "react-ga";

import { KeyedObject, getModalPrefix } from "../../../index";

export const DISMISS_MODAL = "DISMISS_MODAL";
export const SHOW_MODAL = "SHOW_MODAL";

window._uxa = window._uxa || [];

export const dismissModal = () => {
  window._uxa.push(['trackPageview', `${window.location.pathname}${window.location.hash.replace('#', '?__')}`]);
  return {
    "type": DISMISS_MODAL
  };
};

export const showModal = (firstArg: string | KeyedObject = {}, secondArg: KeyedObject = {}) => {
  /*
  * If the first argument is a string, we will load a ModalContainer from the components/ModalContainers folder.
  * The second (optional) argument - an object then becomes the props.
  *
  * If the first argument is an object, this becomes the props for a "simple" modal
  * */

  const prefix = getModalPrefix();

  if (typeof firstArg === "object") {
    ReactGA.modalview(`${prefix}-Modal - ${firstArg.title}`);
    window._uxa.push(['trackPageview', `${window.location.pathname}${window.location.hash.replace('#', '?__')}?cs-popin-${prefix}-${firstArg.title}`]);
    return {
      "type": SHOW_MODAL,
      "contentPath": null,
      "props": firstArg
    };
  }

  ReactGA.modalview(`${prefix}-Modal - ${firstArg}`);
  window._uxa.push(['trackPageview', `${window.location.pathname}${window.location.hash.replace('#', '?__')}?cs-popin-StudentTravel-${firstArg}`]);
  return {
    "type": SHOW_MODAL,
    "contentPath": firstArg,
    "props": secondArg
  };
};
