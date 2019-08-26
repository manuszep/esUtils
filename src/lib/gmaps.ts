import { getAppGlobalVar } from "../index";

export const getGmapsUrl = () => {
  return getAppGlobalVar().gmapsUrl || "";
};

export const loadGoogleMapsJs = (initMap: Function) => {
  if (window.google && window.google.maps) {
    initMap();
    return;
  }

  const ref = window.document.getElementsByTagName("script")[0];
  const script = window.document.createElement("script");

  window.initMap = initMap;

  script.src = `${getGmapsUrl()}&callback=initMap`;
  script.async = true;

  if (ref && ref.parentNode) {
    ref.parentNode.insertBefore(script, ref);
  }
}
