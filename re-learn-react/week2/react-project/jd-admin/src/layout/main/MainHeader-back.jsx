import React, { useState } from 'react';
import { Layout } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux'
const { Header } = Layout

const MainHeader = () => {
    
    const [collapsed, setCollapsed] = useState(false)
    const toggle = () => {
        setCollapsed(!collapsed)
    }

    return (
        <Header className="site-layout-background" style={{ padding: '0 16px',  }}>
            {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })} */}
            {
               collapsed ?  
               <MenuUnfoldOutlined style={{ fontSize: '24px' }} className="trigger" onClick={ toggle } />
                : 
               <MenuFoldOutlined style={{ fontSize: '24px' }} className="trigger" onClick={ toggle } />
            }
          </Header>
    );
}

export default MainHeader;
