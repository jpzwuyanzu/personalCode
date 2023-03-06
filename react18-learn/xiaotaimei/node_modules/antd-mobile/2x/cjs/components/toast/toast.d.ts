import React, { ReactNode } from 'react';
import type { MaskProps } from '../mask';
import { PropagationEvent } from '../../utils/with-stop-propagation';
import { GetContainer } from '../../utils/render-to-container';
export interface ToastProps {
    afterClose?: () => void;
    maskStyle?: MaskProps['style'];
    maskClassName?: string;
    maskClickable?: boolean;
    content?: ReactNode;
    icon?: 'success' | 'fail' | 'loading' | React.ReactNode;
    duration?: number;
    position?: 'top' | 'bottom' | 'center';
    visible?: boolean;
    getContainer?: GetContainer;
    stopPropagation?: PropagationEvent[];
}
export declare const InternalToast: React.FC<ToastProps>;
