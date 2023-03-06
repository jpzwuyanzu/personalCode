import React, { FC } from 'react';
import { RadioValue } from '.';
export interface RadioGroupProps {
    value?: RadioValue | null;
    onChange?: (val: RadioValue) => void;
    defaultValue?: RadioValue | null;
    disabled?: boolean;
    children?: React.ReactNode;
}
export declare const Group: FC<RadioGroupProps>;
