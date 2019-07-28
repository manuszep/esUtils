export const priceFormatter = (value: string): string => {
  if (value === null || typeof value === "undefined") {
    return "";
  }

  return `${value}`.replace(".", ",");
};

export const priceNormalizerFactory = (digitsCount?: number, decimalCount?: number): Function => {
  const diC = typeof digitsCount !== "undefined" ? digitsCount : "";
  const deC = typeof decimalCount !== "undefined" ? decimalCount : "";
  const r = RegExp(`^([0-9]{0,${diC}})(\\.[0-9]{0,${deC}})?`);

  return (value: string): string => {
    const newVal = `${value}`.replace(",", ".");
    const regMatch = newVal.match(r);
    if (regMatch === null) { return ""; }
    const p1 = regMatch[1];
    const p2 = regMatch[2] || "";
    return `${p1}${p2}`;
  };
};

export const priceNormalizer = priceNormalizerFactory();
