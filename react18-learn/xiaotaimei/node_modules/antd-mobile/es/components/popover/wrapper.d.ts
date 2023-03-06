import React from 'react';
export declare class Wrapper extends React.Component<{
    children?: React.ReactNode;
}, {}> {
    element: Element | null;
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
}
