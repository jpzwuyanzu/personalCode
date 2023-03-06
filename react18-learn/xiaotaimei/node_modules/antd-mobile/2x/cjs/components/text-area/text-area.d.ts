import React from 'react';
import type { ReactNode } from 'react';
import { NativeProps } from '../../utils/native-props';
export declare type TextAreaProps = Pick<React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, 'autoComplete' | 'autoFocus' | 'disabled' | 'readOnly' | 'name' | 'onFocus' | 'onBlur' | 'onCompositionStart' | 'onCompositionEnd' | 'onClick'> & {
    onChange?: (val: string) => void;
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    rows?: number;
    maxLength?: number;
    showCount?: boolean | ((length: number, maxLength?: number) => ReactNode);
    autoSize?: boolean | {
        minRows?: number;
        maxRows?: number;
    };
    id?: string;
} & NativeProps<'--font-size' | '--color' | '--placeholder-color' | '--disabled-color' | '--text-align' | '--count-text-align'>;
export declare type TextAreaRef = {
    clear: () => void;
    focus: () => void;
    blur: () => void;
    nativeElement: HTMLTextAreaElement | null;
};
export declare const TextArea: React.ForwardRefExoticComponent<Pick<React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, "onClick" | "disabled" | "name" | "onCompositionEnd" | "onCompositionStart" | "onFocus" | "onBlur" | "autoComplete" | "autoFocus" | "readOnly"> & {
    onChange?: ((val: string) => void) | undefined;
    value?: string | undefined;
    defaultValue?: string | undefined;
    placeholder?: string | undefined;
    rows?: number | undefined;
    maxLength?: number | undefined;
    showCount?: boolean | ((length: number, maxLength?: number | undefined) => ReactNode) | undefined;
    autoSize?: boolean | {
        minRows?: number | undefined;
        maxRows?: number | undefined;
    } | undefined;
    id?: string | undefined;
} & {
    className?: string | undefined;
    style?: (React.CSSProperties & Partial<Record<"--color" | "--font-size" | "--placeholder-color" | "--text-align" | "--disabled-color" | "--count-text-align", string>>) | undefined;
    tabIndex?: number | undefined;
} & React.AriaAttributes & React.RefAttributes<TextAreaRef>>;
