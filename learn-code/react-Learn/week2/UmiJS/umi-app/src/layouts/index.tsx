import React, { useState } from 'react';
import { Layout,  Menu} from 'antd'
import { 
    UserOutlined, 
    VideoCameraOutlined, 
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons'
import MyMenu from './MyMenu'

const { Header, Sider, Content } = Layout

interface Props  {
    children?: any
}

function BasicLayout ( props: Props) {

    const [collapsed, setCollapsed] = useState(false)

    const toggle = () => {

        setCollapsed(!collapsed)
    }

    return (
        <Layout className="myLayout">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
            <MyMenu/>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            { props.children }
          </Content>
        </Layout>
      </Layout>
    )
}

export default BasicLayout