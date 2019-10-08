import { KeyedObject } from "../index";
export declare const PHONE_FIXED = "PHONE_FIXED";
export declare const PHONE_MOBILE = "PHONE_MOBILE";
export declare const parseStringTemplate: (str: string, replacements: KeyedObject<string>) => string;
export declare const capitalizeFirstLetter: (s: string) => string;
export declare const composeStreetAddress: (street: string, streetNr: string, postalBoxText?: string, boxNr?: string) => string;
export declare const composeCityAddress: (postalCode: string | number, city: string) => string;
export declare const composeFullAddress: (street: string, streetNr: string, postalBoxText: string | undefined, boxNr: string | undefined, postalCode: string | number, city: string, oneLine?: boolean) => string;
export declare const composeGmapsAddress: (street?: string, streetNumber?: string, postalCode?: string, city?: string) => string;
export declare const formatPrice: (price: string, lang?: string) => string;
export declare const formatPercentage: (num: number) => string;
export declare const normalizeCountryPrefixTo00: (prefix: string) => string;
export declare const normalizeCountryPrefixToPlus: (prefix: string) => string;
export declare const normalizeAreaPrefix: (prefix: string) => string;
export declare const constructPhoneNumber: (prefix: string, phoneNumber: string) => string;
/**
 * Detect if phone number is mobile or fixed
 */
export declare const getPhoneType: (phone: string) => string;
/**
 * Convert database phone format to readable format
 */
export declare const phoneTransform: (phone: string) => string | null;
export declare const getOptionLabelFromValue: (options: KeyedObject<string>[], value: string) => string;
export declare const getGuid: () => string;
