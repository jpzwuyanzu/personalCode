import React, { ReactElement, ReactNode } from 'react';
import { NativeProps } from '../../utils/native-props';
import type { ErrorBlockStatus, ImageRecord } from '.';
export declare type ErrorBlockProps = {
    status?: ErrorBlockStatus;
    title?: ReactNode;
    image?: string | ReactElement;
    description?: ReactNode;
    fullPage?: boolean;
    children?: React.ReactNode;
} & NativeProps<'--image-height' | '--image-height-full-page' | '--image-width' | '--image-width-full-page'>;
export declare function createErrorBlock(imageRecord: ImageRecord): React.FC<ErrorBlockProps>;
