import React from 'react';
import { NativeProps } from '../../utils/native-props';
declare type NativeButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
export declare type ButtonProps = {
    color?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
    fill?: 'solid' | 'outline' | 'none';
    size?: 'mini' | 'small' | 'middle' | 'large';
    block?: boolean;
    loading?: boolean | 'auto';
    loadingText?: string;
    loadingIcon?: React.ReactNode;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | Promise<void> | unknown;
    type?: 'submit' | 'reset' | 'button';
    shape?: 'default' | 'rounded' | 'rectangular';
    children?: React.ReactNode;
} & Pick<NativeButtonProps, 'onMouseDown' | 'onMouseUp' | 'onTouchStart' | 'onTouchEnd'> & NativeProps<'--text-color' | '--background-color' | '--border-radius' | '--border-width' | '--border-style' | '--border-color'>;
export declare type ButtonRef = {
    nativeElement: HTMLButtonElement | null;
};
export declare const Button: React.ForwardRefExoticComponent<{
    color?: "default" | "primary" | "success" | "warning" | "danger" | undefined;
    fill?: "none" | "solid" | "outline" | undefined;
    size?: "small" | "large" | "middle" | "mini" | undefined;
    block?: boolean | undefined;
    loading?: boolean | "auto" | undefined;
    loadingText?: string | undefined;
    loadingIcon?: React.ReactNode;
    disabled?: boolean | undefined;
    onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | Promise<void> | unknown) | undefined;
    type?: "reset" | "submit" | "button" | undefined;
    shape?: "default" | "rounded" | "rectangular" | undefined;
    children?: React.ReactNode;
} & Pick<NativeButtonProps, "onMouseDown" | "onMouseUp" | "onTouchEnd" | "onTouchStart"> & {
    className?: string | undefined;
    style?: (React.CSSProperties & Partial<Record<"--border-radius" | "--text-color" | "--background-color" | "--border-width" | "--border-style" | "--border-color", string>>) | undefined;
    tabIndex?: number | undefined;
} & React.AriaAttributes & React.RefAttributes<ButtonRef>>;
export {};
