import React, { useState } from 'react'
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
            label:'超级管理员',
          },
          {
            key: '2',
            danger: true,
            label: '退出',
            onClick: () => {
              localStorage.removeItem('token');
              localStorage.removeItem('rights');
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
          collapsed ? <MenuUnfoldOutlined style={{ fontSize: '18px' }} onClick={ changeCollapsed } /> : <MenuFoldOutlined style={{ fontSize: '18px' }} onClick={ changeCollapsed } />
        }
        <div style={{ float: 'right',paddingRight: '10px', cursor: 'pointer' }}>
            <Dropdown overlay={menu}>
              <span onClick={e => e.preventDefault()}>
              <Space>
                  <Avatar size="large" icon={<UserOutlined />} />
              </Space>
              </span>
          </Dropdown>
          <span style={{ marginLeft: '10px' }}>{ username }</span>
        </div>
      </Header>
  )
}

export default TopHeader
