import React, { FC, ReactNode } from 'react';
import { NativeProps } from '../../utils/native-props';
import { ListProps } from '../list';
export declare type CheckListProps = Pick<ListProps, 'mode' | 'style'> & {
    defaultValue?: string[];
    value?: string[];
    onChange?: (val: string[]) => void;
    multiple?: boolean;
    activeIcon?: ReactNode;
    disabled?: boolean;
    readOnly?: boolean;
    children?: React.ReactNode;
} & NativeProps;
export declare const CheckList: FC<CheckListProps>;
