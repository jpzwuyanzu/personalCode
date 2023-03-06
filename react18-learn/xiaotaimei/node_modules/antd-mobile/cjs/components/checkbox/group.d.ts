import React, { FC } from 'react';
import { CheckboxValue } from '.';
export interface CheckboxGroupProps {
    value?: CheckboxValue[];
    onChange?: (val: CheckboxValue[]) => void;
    defaultValue?: CheckboxValue[];
    disabled?: boolean;
    children?: React.ReactNode;
}
export declare const Group: FC<CheckboxGroupProps>;
