import React from 'react';
import { NativeProps } from '../../utils/native-props';
export declare type CheckboxValue = string | number;
export declare type CheckboxProps = {
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    onChange?: (checked: boolean) => void;
    value?: CheckboxValue;
    indeterminate?: boolean;
    block?: boolean;
    id?: string;
    icon?: (checked: boolean, indeterminate: boolean) => React.ReactNode;
    children?: React.ReactNode;
} & NativeProps<'--icon-size' | '--font-size' | '--gap'>;
export declare type CheckboxRef = {
    check: () => void;
    uncheck: () => void;
    toggle: () => void;
};
export declare const Checkbox: React.ForwardRefExoticComponent<{
    checked?: boolean | undefined;
    defaultChecked?: boolean | undefined;
    disabled?: boolean | undefined;
    onChange?: ((checked: boolean) => void) | undefined;
    value?: CheckboxValue | undefined;
    indeterminate?: boolean | undefined;
    block?: boolean | undefined;
    id?: string | undefined;
    icon?: ((checked: boolean, indeterminate: boolean) => React.ReactNode) | undefined;
    children?: React.ReactNode;
} & {
    className?: string | undefined;
    style?: (React.CSSProperties & Partial<Record<"--font-size" | "--icon-size" | "--gap", string>>) | undefined;
    tabIndex?: number | undefined;
} & React.AriaAttributes & React.RefAttributes<CheckboxRef>>;
