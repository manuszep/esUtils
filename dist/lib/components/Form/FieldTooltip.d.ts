import { Component, FormEvent, MouseEvent } from "react";
export declare type FieldTooltipPropsType = {
    help: string;
};
export declare type FieldTooltipStateType = {
    toggled: boolean;
};
export declare class FieldTooltip extends Component<FieldTooltipPropsType, FieldTooltipStateType> {
    constructor(props: FieldTooltipPropsType);
    handleBlur(e: FormEvent): void;
    handleClick(e: MouseEvent<any>): void;
    render(): JSX.Element | null;
}
