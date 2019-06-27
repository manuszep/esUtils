export type KeyedObject<T = any> = {[k: string]: T};

export type Step = {
  "index": number,
  "ID": string,
  "number": number,
  "pageTitle": string,
  "chapter": string
};

export type Steps = Step[];
