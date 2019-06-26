import { patternPhone, patternPhoneMobile } from "./regex";
import { KeyedObject } from "./types";

export const PHONE_FIXED = 'PHONE_FIXED';
export const PHONE_MOBILE = 'PHONE_MOBILE';

export const parseStringTemplate = (
  str: string,
  replacements: KeyedObject<string>
): string => {
  if (typeof str === "undefined" ||
    str === null ||
    str === "" ||
    typeof replacements === "undefined" ||
    Object.keys(replacements).length === 0) return str;
  return str.replace(/%%\w+%%/g, (all) => {
    return all in replacements ? replacements[all] : all;
  });
}

export const capitalizeFirstLetter = (s: string): string => {
  return s[0].toUpperCase() + s.slice(1);
}

export const composeStreetAddress = (street: string, streetNr: string, postalBoxText = "", boxNr = ""): string => {
  let addressStreetNr = "";
  let addressBoxNr = boxNr;
  if (streetNr) {
    addressStreetNr = streetNr;
  }

  if (addressBoxNr !== "") {
    addressBoxNr = ` ${postalBoxText} ${addressBoxNr}`;
  }

  return `${street} ${addressStreetNr}${addressBoxNr}`.trim();
}

export const composeCityAddress = (postalCode: number | string, city: string): string => {
  return `${postalCode} ${city}`;
}

export const composeFullAddress = (
  street: string,
  streetNr: string,
  postalBoxText = "",
  boxNr = "",
  postalCode: number | string,
  city: string,
  oneLine: boolean
) => {
  const separator = oneLine ? ", " : ",<br />";

  const fullStreet = composeStreetAddress(street, streetNr, postalBoxText, boxNr);
  const fullCity = composeCityAddress(postalCode, city);

  return `${fullStreet}${separator}${fullCity}`;
}

export const composeGmapsAddress = (
  street = "",
  streetNumber = "",
  postalCode = "",
  city = ""
): string => {
  let p1 = `${street} ${streetNumber}`;
  let separator = ", ";

  if (p1.length < 2) {
    p1 = "";
    separator = "";
  }

  return `${p1}${separator}${postalCode} ${city}`;
}

export const formatPrice = (price: string, lang = "fr"): string => {
  if (typeof price === "undefined") return "";

  if (!price) return price;

  let parsedPrice = parseFloat(price);

  if (typeof parsedPrice !== "number" || Number.isNaN(parsedPrice)) parsedPrice = 0;

  const hasDecimal = parsedPrice % 1 !== 0;

  let num;

  if (hasDecimal) {
    num = parsedPrice.toFixed(2).replace(/./g, (char, i, string) => {
      if (char === '.') return ",<span class=\"decimal\">";
      return i > 0 && char !== "." && (string.length - i) % 3 === 0 ? `&nbsp;${char}` : char;
    });
  } else {
    num = parsedPrice;
  }

  if (lang.toLowerCase() === "fr") {
    return `${num}&nbsp;€</span>`;
  }

  return `€&nbsp;${num}</span>`;
}

export const formatPercentage = (num: number): string => {
  if (typeof num === "undefined") return "";
  if (num === 0) return `${num}%`;
  if (!num) return `${num}`;

  return `${num}%`;
}

export const normalizeCountryPrefixTo00 = (prefix: string): string => {
  let newPrefix = prefix;

  if (newPrefix.charAt(0) === "+") {
    newPrefix = newPrefix.replace("+", "00");
  }

  if (newPrefix.startsWith("0") && !newPrefix.startsWith("00")) {
    newPrefix = `0${newPrefix}`;
  }

  if (!newPrefix.startsWith("00")) {
    newPrefix = `00${newPrefix}`;
  }

  return newPrefix;
}

export const normalizeCountryPrefixToPlus = (prefix: string): string => {
  return `+${prefix.replace(/^00+/, '')}`;
}

export const normalizeAreaPrefix = (prefix: string): string => {
  return prefix.replace(/^0+/, '');
}

export const constructPhoneNumber = (prefix: string, phoneNumber: string): string => {
  const newPrefix = normalizeCountryPrefixTo00(prefix);
  return `${newPrefix}${phoneNumber}`;
}

/**
 * Detect if phone number is mobile or fixed
 */
export const getPhoneType = (phone: string): string => {
  if (phone.match(patternPhone)) return PHONE_FIXED;
  if (phone.match(patternPhoneMobile)) return PHONE_MOBILE;
  return '';
};

/**
 * Convert database phone format to readable format
 */
export const phoneTransform = (phone: string): string | null => {
  // If phone number is empty, return as is
  if (typeof phone === 'undefined' || phone === null) return null;

  // Remove any leading or trailing spaces
  let p = phone.trim();

  // Replace 00 by +
  p = p.replace(/^00/, "+");
  // Check type to choose formatting
  const type = getPhoneType(p);
  // Define matching patterns
  const patterns: {[key: string]: RegExp} = {
    [PHONE_FIXED]: /^(\+\d{2})?(0?\d)(\d{3})(\d{2})(\d{2})$/i,
    [PHONE_MOBILE]: /^(\+\d{2})(\d{3})(\d{2})(\d{2})(\d{2})$/i
  };

  // If a type is found and trimmed number is not empty
  if (typeof type !== 'undefined' && p !== '') {
    // Get matches array
    const m = p.match(patterns[type]);
    if (m !== null) {
      // Format result
      return `${m[1]} ${m[2]} ${m[3]} ${m[4]} ${m[5]}`;
    }
  }

  return p;
};

export const getOptionLabelFromValue = (
  options: Array<KeyedObject<string>>,
  value: string
): string => {
  let i = 0;

  for (i; i < options.length; i += 1) {
    if (options[i].value === value) {
      return options[i].label;
    }
  }

  return value;
}
