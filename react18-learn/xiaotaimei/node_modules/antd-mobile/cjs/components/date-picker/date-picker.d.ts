import React, { ReactNode } from 'react';
import type { PickerProps, PickerRef, PickerActions } from '../picker';
import { NativeProps } from '../../utils/native-props';
import type { Precision, DatePickerFilter } from './date-picker-utils';
export declare type DatePickerRef = PickerRef;
export declare type DatePickerProps = Pick<PickerProps, 'onCancel' | 'onClose' | 'closeOnMaskClick' | 'visible' | 'confirmText' | 'cancelText' | 'getContainer' | 'loading' | 'loadingContent' | 'afterShow' | 'afterClose' | 'onClick' | 'title' | 'stopPropagation' | 'style' | 'mouseWheel' | 'forceRender' | 'destroyOnClose'> & {
    value?: Date | null;
    defaultValue?: Date | null;
    onSelect?: (value: Date) => void;
    onConfirm?: (value: Date) => void;
    min?: Date;
    max?: Date;
    precision?: Precision;
    children?: (value: Date | null, actions: PickerActions) => ReactNode;
    renderLabel?: (type: Precision, data: number) => ReactNode;
    filter?: DatePickerFilter;
} & NativeProps;
export declare const DatePicker: React.ForwardRefExoticComponent<Pick<PickerProps, "style" | "title" | "onClick" | "visible" | "destroyOnClose" | "forceRender" | "getContainer" | "afterShow" | "afterClose" | "stopPropagation" | "onCancel" | "onClose" | "loading" | "closeOnMaskClick" | "cancelText" | "mouseWheel" | "loadingContent" | "confirmText"> & {
    value?: Date | null | undefined;
    defaultValue?: Date | null | undefined;
    onSelect?: ((value: Date) => void) | undefined;
    onConfirm?: ((value: Date) => void) | undefined;
    min?: Date | undefined;
    max?: Date | undefined;
    precision?: Precision | undefined;
    children?: ((value: Date | null, actions: PickerActions) => ReactNode) | undefined;
    renderLabel?: ((type: Precision, data: number) => ReactNode) | undefined;
    filter?: Partial<Record<Precision, (val: number, extend: {
        date: Date;
    }) => boolean>> | undefined;
} & {
    className?: string | undefined;
    style?: (React.CSSProperties & Partial<Record<never, string>>) | undefined;
    tabIndex?: number | undefined;
} & React.AriaAttributes & React.RefAttributes<PickerActions>>;
