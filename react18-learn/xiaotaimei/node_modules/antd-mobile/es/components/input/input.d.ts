import React from 'react';
import { NativeProps } from '../../utils/native-props';
declare type NativeInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
declare type AriaProps = {
    role?: string;
};
export declare type InputProps = Pick<NativeInputProps, 'maxLength' | 'minLength' | 'autoComplete' | 'autoFocus' | 'pattern' | 'inputMode' | 'type' | 'name' | 'onFocus' | 'onBlur' | 'autoCapitalize' | 'autoCorrect' | 'onKeyDown' | 'onKeyUp' | 'onCompositionStart' | 'onCompositionEnd' | 'onClick' | 'step'> & {
    value?: string;
    defaultValue?: string;
    onChange?: (val: string) => void;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    clearable?: boolean;
    onlyShowClearWhenFocus?: boolean;
    onClear?: () => void;
    id?: string;
    onEnterPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
    min?: number;
    max?: number;
} & NativeProps<'--font-size' | '--color' | '--placeholder-color' | '--text-align'> & AriaProps;
export declare type InputRef = {
    clear: () => void;
    focus: () => void;
    blur: () => void;
    nativeElement: HTMLInputElement | null;
};
export declare const Input: React.ForwardRefExoticComponent<Pick<NativeInputProps, "pattern" | "onClick" | "name" | "type" | "onCompositionEnd" | "onCompositionStart" | "onFocus" | "onBlur" | "onKeyDown" | "onKeyUp" | "autoCapitalize" | "autoCorrect" | "inputMode" | "autoComplete" | "autoFocus" | "maxLength" | "minLength" | "step"> & {
    value?: string | undefined;
    defaultValue?: string | undefined;
    onChange?: ((val: string) => void) | undefined;
    placeholder?: string | undefined;
    disabled?: boolean | undefined;
    readOnly?: boolean | undefined;
    clearable?: boolean | undefined;
    onlyShowClearWhenFocus?: boolean | undefined;
    onClear?: (() => void) | undefined;
    id?: string | undefined;
    onEnterPress?: ((e: React.KeyboardEvent<HTMLInputElement>) => void) | undefined;
    enterKeyHint?: "search" | "enter" | "done" | "go" | "next" | "previous" | "send" | undefined;
    min?: number | undefined;
    max?: number | undefined;
} & {
    className?: string | undefined;
    style?: (React.CSSProperties & Partial<Record<"--color" | "--font-size" | "--placeholder-color" | "--text-align", string>>) | undefined;
    tabIndex?: number | undefined;
} & React.AriaAttributes & AriaProps & React.RefAttributes<InputRef>>;
export {};
