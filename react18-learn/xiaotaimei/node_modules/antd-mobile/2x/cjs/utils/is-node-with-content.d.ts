import { ReactNode } from 'react';
declare type Regulated<T> = T extends null | undefined | false ? never : T;
export declare function isNodeWithContent(node: ReactNode): node is Regulated<ReactNode>;
export {};
