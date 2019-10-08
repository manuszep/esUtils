import { Component } from "react";
import { KeyedObject } from "../../../../index";
export declare type PaymentMethodPropsType = {
    items: Array<KeyedObject>;
    value: string;
    name: string;
    onChange: (event: any) => void;
};
export declare class PaymentMethod extends Component<PaymentMethodPropsType, {}> {
    renderPaymentMethods(): JSX.Element[];
    render(): JSX.Element;
}
