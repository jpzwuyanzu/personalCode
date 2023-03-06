import React, { FC } from 'react';
import { NativeProps } from '../../utils/native-props';
export declare const dot: JSX.Element;
export declare type BadgeProps = {
    content?: React.ReactNode | typeof dot;
    color?: string;
    bordered?: boolean;
    children?: React.ReactNode;
    wrapperClassName?: string;
    wrapperStyle?: React.CSSProperties;
} & NativeProps<'--right' | '--top' | '--color'>;
export declare const Badge: FC<BadgeProps>;
