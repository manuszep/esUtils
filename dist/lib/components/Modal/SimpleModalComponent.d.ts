import { Component } from "react";
export declare type SimpleModalComponentPropsType = {
    customOnClose?: Function;
    afterCloseAction?: Function;
    closeModal: Function;
    modalId?: string;
    title?: string;
    body?: JSX.Element;
    primaryLabel?: string;
    customPrimaryAction?: Function;
    customSecondaryAction?: Function;
    handlePrimaryAction?: Function;
    closeLabel?: string;
    primaryLabelDisabled?: boolean;
};
export declare class SimpleModal extends Component<SimpleModalComponentPropsType, {}> {
    closeModal(): void;
    render(): JSX.Element;
}
