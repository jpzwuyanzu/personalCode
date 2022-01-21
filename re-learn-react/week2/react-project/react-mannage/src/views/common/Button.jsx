import React from 'react';
import { Button, Space, Divider } from 'antd'

const ButtonCom = () => {
    return (
        <div>
             <h1>Button按钮</h1>
            <Divider/>
            <Space>
                <Button type="primary">Primary Button</Button>
                <Button>Default Button</Button>
                <Button type="dashed">Dashed Button</Button>
            </Space>
            <br/>
            <br/>
            <Space>
            <Button type="primary" ghost>
                Primary
                </Button>
                <Button type="primary" danger ghost>
                Danger
            </Button>
            </Space>
        </div>
    );
}

export default ButtonCom;
