export const priceFormatter = (value: string): string => {
  if (value === null || typeof value === "undefined") {
    return "";
  }

  return `${value}`.replace(".", ",");
};

export const priceNormalizer = (value: string): string => {
  return `${value}`.replace(",", ".");
};
