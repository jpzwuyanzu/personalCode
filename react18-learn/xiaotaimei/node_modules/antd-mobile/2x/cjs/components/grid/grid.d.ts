import React, { FC } from 'react';
import { NativeProps } from '../../utils/native-props';
export declare type GridProps = {
    columns: number;
    gap?: number | string | [number | string, number | string];
    children?: React.ReactNode;
} & NativeProps<'--gap' | '--gap-vertical' | '--gap-horizontal'>;
export declare const Grid: FC<GridProps>;
export declare type GridItemProps = {
    span?: number;
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    children?: React.ReactNode;
} & NativeProps;
export declare const GridItem: FC<GridItemProps>;
