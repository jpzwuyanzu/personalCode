/* eslint-disable no-script-url */
import React from 'react';
import { Breadcrumb, Divider } from 'antd'

const BreadcrumbCom = () => {
    return (
        <div>
            <h1>Breadcrumb面包屑</h1>
            <Divider/>
            <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                 Application Center
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                 Application List
                </Breadcrumb.Item>
                <Breadcrumb.Item>An Application</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    );
}

export default BreadcrumbCom;
