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

export const getAge = (dob:string) => {
  if (dob !== undefined) {
    const dateParts:string[] = dob.split("/");
    const dateObject = new Date(+dateParts[2], Number(dateParts[1]) - 1, +dateParts[0]);
    const diffMs = Date.now() - dateObject.getTime();
    const ageDt = new Date(diffMs);
    const age = Math.abs(ageDt.getUTCFullYear() - 1970);
    return age;
  }
  return 20; //default value to avoid undefined value
}

export const getIsAdult = (dob: string): boolean => {
  const currentDate = getCurrentDate();

  return getDifferenceInYears(currentDate, parseDate(dob)) >= 18;
};
