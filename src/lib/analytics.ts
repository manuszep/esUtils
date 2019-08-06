import { getAppGlobalVar } from "local";

export const getGaAccount = (): string => {
  return getAppGlobalVar().GA_ACCOUNT || "UA-90671794-1"; // default FT/STG account
}

export const getGoogleAnalyticsId = (): string => {
  let _ga = "";
  const cs = document.cookie.split("_ga=");

  if (cs.length >= 2) {
    const c = cs[1];

    if (typeof c !== "undefined") {
      _ga = c.split(";")[0];
    }
  }

  return _ga || "";
}

export const trackConversion = (id: string): void => {
  if (typeof window.google_trackConversion === "function") {
    window.google_trackConversion({
      "google_conversion_id": 996994227,
      "google_conversion_language": "en",
      "google_conversion_format": "3",
      "google_conversion_color": "ffffff",
      "google_conversion_label": id,
      "google_remarketing_only": false
    });
  }
}
