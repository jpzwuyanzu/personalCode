import React, { FC } from 'react';
import { NativeProps } from '../../utils/native-props';
export declare type TagProps = {
    color?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | (string & {});
    fill?: 'solid' | 'outline';
    round?: boolean;
    onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
    children?: React.ReactNode;
} & NativeProps<'--border-color' | '--background-color' | '--text-color' | '--border-radius'>;
export declare const Tag: FC<TagProps>;
