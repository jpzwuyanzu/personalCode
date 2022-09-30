  import React, { useState } from 'react';
  import { Outlet, useNavigate } from 'react-router-dom'
  import { Layout, Menu } from 'antd';

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';

  const { Header, Sider, Content } = Layout;
export default function Main() {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    return (
        <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">后台系统</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '/home',
              label: '首页',
            },
            {
                label: '用户管理',
                key: '/user-mannage',
                children: [
                    {
                        label: '用户列表',
                        key: '/user-mannage/user/list',
                    }
                ]
            },
          ]}
          onClick={ ({ key }) => {
            console.log(key)
            navigate(key)
          } }
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
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
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
    )
}
