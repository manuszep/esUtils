import { getTranslation } from "./components/TranslationComponent/index"

export const priceFormatter = (value: string): string => {
  if (value === null || typeof value === "undefined") {
    return "";
  }

  return `${value}`.replace(".", ",");
};

export const priceNormalizer = (value: string): string => {
  return `${value}`.replace(",", ".");
};

export const composeStreetAddress = (street: string, streetNr:string, boxNr: string): string => {
  let addressStreetNr = "";
  let addressBoxNr = boxNr;
  if (streetNr) {
    addressStreetNr = streetNr;
  }

  if (addressBoxNr !== "") {
    addressBoxNr = ` ${getTranslation("POSTAL_BOX_TEXT")} ${addressBoxNr}`;
  }

  return `${street} ${addressStreetNr}${addressBoxNr}`.trim();
}

export const composeCityAddress = (postalCode:string, city:string): string => {
  return `${postalCode} ${city}`;
}

export const composeFullAddress = (street:string, streetNr:string, boxNr: string, postalCode: string, city:string, oneLine:string): string => {
  const separator = oneLine ? ", " : ",<br />";

  const fullStreet = composeStreetAddress(street, streetNr, boxNr);
  const fullCity = composeCityAddress(postalCode, city);

  return `${fullStreet}${separator}${fullCity}`;
}

export const composeGmapsAddress = (street: string, streetNumber: string, postalCode: string, city: string) => {
  let p1 = `${street} ${streetNumber}`;
  let separator = ", ";

  if (p1.length < 2) {
    p1 = "";
    separator = "";
  }

  return `${p1}${separator}${postalCode} ${city}`;
}
