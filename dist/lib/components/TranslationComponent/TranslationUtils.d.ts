import { KeyedObject } from "../../../index";
export declare const parseTranslationMaps: (translationMap: any) => KeyedObject<string>;
export declare const fetchTranslations: (lang: string) => Promise<KeyedObject<string>>;
export declare const getCurrentLanguage: () => string;
export declare const getTranslationFromLabelDictionary: (key: any, labelDictionary: KeyedObject<string>, noprefix?: boolean) => string;
export declare const getTranslation: (key: string) => string;
export declare const getTranslationFromProps: (props: KeyedObject<any>, key: string) => string;
