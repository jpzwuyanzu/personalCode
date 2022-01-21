import React from 'react';
import { Divider, Space } from 'antd'
import { 
    StepBackwardOutlined,
    StepForwardOutlined,
    FastBackwardOutlined,
    FastForwardOutlined,
    ShrinkOutlined,
    ArrowsAltOutlined
} from '@ant-design/icons'


const Icon = () => {
    return (
        <div>
           <h1>Icon图标</h1>
            <Divider/>
            <Space size="large">
                <StepBackwardOutlined style={{ fontSize:'40px' }} />
                <StepForwardOutlined style={{ fontSize:'40px' }} />
                <FastBackwardOutlined style={{ fontSize:'40px' }} />
                <FastForwardOutlined style={{ fontSize:'40px' }} />
                <ShrinkOutlined style={{ fontSize:'40px' }} />
                <ArrowsAltOutlined style={{ fontSize:'40px' }} />
            </Space>
        </div>
    );
}

export default Icon;
