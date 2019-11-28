import moment from "moment";
export declare const parseDate: (date: string) => moment.Moment;
export declare const getCurrentDate: () => moment.Moment;
export declare const getDifferenceInYears: (firstDate: moment.Moment, secondDate: moment.Moment) => number;
export declare const getAge: (dob: string, defaultAge: number) => number;
export declare const getIsAdult: (dob: string) => boolean;
