import React, { ReactNode } from 'react';
import { NativeProps } from '../../utils/native-props';
import { PickerProps } from '../picker';
export declare type PickerValue = string | null;
export declare type PickerValueExtend = {
    columns: PickerColumnItem[][];
    items: (PickerColumnItem | null)[];
};
export declare type PickerColumnItem = {
    label: ReactNode;
    value: string;
    key?: string | number;
};
export declare type PickerColumn = (string | PickerColumnItem)[];
export declare type PickerViewProps = {
    columns: PickerColumn[] | ((value: PickerValue[]) => PickerColumn[]);
    value?: PickerValue[];
    defaultValue?: PickerValue[];
    mouseWheel?: boolean;
    loading?: boolean;
    loadingContent?: ReactNode;
    onChange?: (value: PickerValue[], extend: PickerValueExtend) => void;
} & Pick<PickerProps, 'renderLabel'> & NativeProps<'--height' | '--item-height' | '--item-font-size'>;
export declare const PickerView: React.NamedExoticComponent<PickerViewProps>;
