export const getHistoryLocation = (): string => {
  const { pathname, search } = window.location;
  return `${pathname}${search}`;
}
