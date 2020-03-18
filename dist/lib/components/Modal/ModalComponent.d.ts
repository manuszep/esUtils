import { Component as ReactComponent } from "react";
import { KeyedObject } from "../../../index";
export declare const initModal: (modalContainers: KeyedObject<any>, prefix: string) => void;
export declare const getModalPrefix: () => string;
export declare type ModalComponentPropsType = {
    modalContentPath: string;
    modalProps: KeyedObject;
    closeModal: Function;
    show: boolean;
    afterCloseAction: Function;
};
export declare type ModalComponentStateType = {
    Component: any;
};
declare class ModalComponent extends ReactComponent<ModalComponentPropsType, ModalComponentStateType> {
    constructor(props: ModalComponentPropsType);
    componentWillReceiveProps(nextProps: KeyedObject): void;
    fetchModalContent(props: KeyedObject): void;
    renderModalContent(): JSX.Element | null;
    render(): JSX.Element | null;
}
export declare const Modal: import("react-redux").ConnectedComponent<typeof ModalComponent, Pick<ModalComponentPropsType, "show" | "modalContentPath" | "afterCloseAction">>;
export {};
