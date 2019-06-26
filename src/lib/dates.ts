import moment from "moment";

export const parseDate = (date: string): moment.Moment => {
  if (!date) return moment();
  const convertedDate = date.replace(/\//g, "-") || ""; // dashes are not a supported isoFormat and throws moment warning
  return moment(convertedDate, "DD-MM-YYYY");
}

export const getCurrentDate = (): moment.Moment => {
  return moment();
}

export const getDifferenceInYears = (firstDate: moment.Moment, secondDate: moment.Moment): number => {
  return firstDate.diff(secondDate, 'years');
}

export const getIsAdult = (dob: string): boolean => {
  const currentDate = getCurrentDate();

  return getDifferenceInYears(currentDate, parseDate(dob)) >= 18;
};
