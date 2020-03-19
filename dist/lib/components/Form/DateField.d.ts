import { Component } from "react";
import { KeyedObject } from "../../../index";
export declare type DateFieldPropsType = {
    datePicker: any;
    name: string;
    fldValue: string;
    changeField: (name: string, value: string) => void;
    onSelect: Function;
    minDate: any;
    maxDate: any;
    isDayBlocked: string;
};
declare class DateFieldComponent extends Component<DateFieldPropsType, {}> {
    datePicker: any;
    dateFieldAddon: any;
    inputElement: any;
    afterElement: any;
    fieldElement: any;
    reduxElement: any;
    constructor(props: DateFieldPropsType);
    componentDidMount(): void;
    componentWillReceiveProps(nextprops: DateFieldPropsType): void;
    componentWillUnmount(): void;
    getDisableDayFn(): (d: Date) => boolean;
    getCalendarTranslation(): {
        'previousMonth': string;
        'nextMonth': string;
        'months': string[];
        'weekdays': string[];
        'weekdaysShort': string[];
    };
    allowOnlyFutureDates(d: Date): boolean;
    isZoneFull(pos: number, val: string): boolean;
    clearInRange(fld: KeyedObject, val: string, start: number, end: number): void;
    handleKeypress(e: KeyboardEvent): void;
    handleKeydown(e: KeyboardEvent): void;
    render(): JSX.Element;
}
export declare const DateField: import("react-redux").ConnectedComponentClass<typeof DateFieldComponent, Pick<DateFieldPropsType, "name" | "onSelect" | "fldValue" | "changeField" | "datePicker" | "minDate" | "maxDate" | "isDayBlocked"> & KeyedObject<any>>;
export default DateField;
