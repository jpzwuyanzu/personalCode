import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
    HomeOutlined,
    UsergroupAddOutlined,
    OrderedListOutlined
} from "@ant-design/icons";
import { useNavigate } from 'react-router-dom'
import './SideMenu.scss'

const { Sider } = Layout;
export default function SideMenu() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const items: any = [
      {
        label: '首页',
        key: '/home',
        icon: <HomeOutlined />,
      },
      {
          label: '用户管理',
          key: '/user-manage',
          icon: <OrderedListOutlined />,
          children: [
              {
                  label: '用户列表',
                  key: '/user-manage/list',
              }
          ]
      },
      {
          label: '权限管理',
          key: '/right-manage',
          icon: <UsergroupAddOutlined />,
          children: [
              {
                  label: '权限列表',
                  key: '/right-manage/right/list',
              },
              {
                  label: '角色列表',
                  key: '/right-manage/role/list'
              }
          ]
      }
  ]
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo">全球新闻发布系统</div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["/home"]}
        items={items}
        onClick={ (e) => {
            navigate(e.key)
        } }
      />
    </Sider>
  );
}