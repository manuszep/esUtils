export const getHistoryLocation = () => {
  const { pathname, search } = window.location;
  return `${pathname}${search}`;
}
