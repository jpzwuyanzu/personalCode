import React, { FC } from 'react';
import { GetContainer } from '../../utils/render-to-container';
import { SlidesRef } from './slides';
export declare type ImageViewerProps = {
    image?: string;
    maxZoom?: number;
    getContainer?: GetContainer;
    visible?: boolean;
    onClose?: () => void;
    afterClose?: () => void;
    renderFooter?: (image: string) => React.ReactNode;
};
export declare const ImageViewer: FC<ImageViewerProps>;
export declare type MultiImageViewerRef = SlidesRef;
export declare type MultiImageViewerProps = Omit<ImageViewerProps, 'image' | 'renderFooter'> & {
    images?: string[];
    defaultIndex?: number;
    onIndexChange?: (index: number) => void;
    renderFooter?: (image: string, index: number) => React.ReactNode;
};
export declare const MultiImageViewer: React.ForwardRefExoticComponent<Omit<ImageViewerProps, "image" | "renderFooter"> & {
    images?: string[] | undefined;
    defaultIndex?: number | undefined;
    onIndexChange?: ((index: number) => void) | undefined;
    renderFooter?: ((image: string, index: number) => React.ReactNode) | undefined;
} & React.RefAttributes<SlidesRef>>;
