/// <reference types="react" />
import './date-picker.less';
import { prompt } from './prompt';
export type { DatePickerProps, DatePickerRef } from './date-picker';
export type { DatePickerFilter } from './date-picker-utils';
declare const _default: import("react").ForwardRefExoticComponent<Pick<import("../picker").PickerProps, "style" | "title" | "onClick" | "visible" | "destroyOnClose" | "forceRender" | "getContainer" | "afterShow" | "afterClose" | "stopPropagation" | "onCancel" | "onClose" | "loading" | "closeOnMaskClick" | "cancelText" | "mouseWheel" | "loadingContent" | "confirmText"> & {
    value?: Date | null | undefined;
    defaultValue?: Date | null | undefined;
    onSelect?: ((value: Date) => void) | undefined;
    onConfirm?: ((value: Date) => void) | undefined;
    min?: Date | undefined;
    max?: Date | undefined;
    precision?: import("./date-picker-utils").Precision | undefined;
    children?: ((value: Date | null, actions: import("../picker").PickerActions) => import("react").ReactNode) | undefined;
    renderLabel?: ((type: import("./date-picker-utils").Precision, data: number) => import("react").ReactNode) | undefined;
    filter?: Partial<Record<import("./date-picker-utils").Precision, (val: number, extend: {
        date: Date;
    }) => boolean>> | undefined;
} & {
    className?: string | undefined;
    style?: (import("react").CSSProperties & Partial<Record<never, string>>) | undefined;
    tabIndex?: number | undefined;
} & import("react").AriaAttributes & import("react").RefAttributes<import("../picker").PickerActions>> & {
    prompt: typeof prompt;
};
export default _default;
