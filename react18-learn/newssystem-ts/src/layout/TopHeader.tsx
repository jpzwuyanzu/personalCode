import React, { useState, memo } from 'react'
import { Layout, Dropdown, Menu, Space, Avatar } from 'antd'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined
  } from "@ant-design/icons";
const { Header } = Layout;

const TopHeader = () => {

  const [collapsed, setCollapsed] = useState(false);
  const menu = (
      <Menu
        items={[
          {
            key: '1',
            label: (
              <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                超级管理员
              </a>
            ),
          },
          {
            key: '2',
            danger: true,
            label: '退出',
          },
        ]}
      />
    );

  const changeCollapsed = () => {
      setCollapsed(!collapsed)
  }

  return (
      <Header className="site-layout-background" style={{ padding: '0 16px' }}>
        {
          collapsed ? <MenuUnfoldOutlined onClick={ changeCollapsed } /> : <MenuFoldOutlined onClick={ changeCollapsed } />
        }
        <div style={{ float: 'right' }}>
            <span>欢迎Admin回来</span>
            <Dropdown overlay={menu}>
              <a onClick={e => e.preventDefault()}>
              <Space>
                  <Avatar size="large" icon={<UserOutlined />} />
              </Space>
              </a>
          </Dropdown>
        </div>
      </Header>
  )
}

export default TopHeader
