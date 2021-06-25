import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd'
import { 
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
 } from '@ant-design/icons'
 import MyMenu from './../MyMenu'
 import { useLocation } from 'umi'

 const { Header, Sider, Content } = Layout;
 interface IProps {
     children? : any
 }

function BasicLayout (props: IProps) {

    const [collapsed, setCollapsed] = useState(false)

    const [ showLayout , setShowLayout ] = useState(true)

    const toggle = () => {
        setCollapsed(!collapsed)
    }

    const { pathname } = useLocation()
    useEffect(() => {
      console.log(pathname)
    }, [])

    return (
        <>
        {
          showLayout ? <Layout className="myLayout">
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
        </Layout> : <div>登录页面</div>
        }
        </>
    )
}

export default BasicLayout