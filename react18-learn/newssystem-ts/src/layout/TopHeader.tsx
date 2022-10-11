import React, { useState, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, Dropdown, Menu, Space, Avatar } from 'antd'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined
  } from "@ant-design/icons";
const { Header } = Layout;
const TopHeader = () => {
  const username = JSON.parse((localStorage.getItem('token') as any))[0]['username'];
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
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
            onClick: () => {
              localStorage.removeItem('token')
              navigate('/login')
            }
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
        <div style={{ float: 'right',paddingRight: '10px' }}>
            <Dropdown overlay={menu}>
              <a onClick={e => e.preventDefault()}>
              <Space>
                  <Avatar size="large" icon={<UserOutlined />} />
              </Space>
              </a>
          </Dropdown>
          <span style={{ marginLeft: '10px' }}>{ username }</span>
        </div>
      </Header>
  )
}

export default TopHeader
