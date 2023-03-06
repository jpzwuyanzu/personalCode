import React, { FC } from 'react';
import { NativeProps } from '../../utils/native-props';
export declare type InfiniteScrollProps = {
    loadMore: (isRetry: boolean) => Promise<void>;
    hasMore: boolean;
    threshold?: number;
    children?: React.ReactNode | ((hasMore: boolean, failed: boolean, retry: () => void) => React.ReactNode);
} & NativeProps;
export declare const InfiniteScroll: FC<InfiniteScrollProps>;
