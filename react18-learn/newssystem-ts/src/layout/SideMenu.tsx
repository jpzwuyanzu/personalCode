import React, { useState, memo } from "react";
import { Layout, Menu, Spin } from "antd";
import {
    HomeOutlined,
    UsergroupAddOutlined,
    OrderedListOutlined
} from "@ant-design/icons";
import { useNavigate } from 'react-router-dom'
import './SideMenu.scss'

const { Sider } = Layout;
 const SideMenu = () =>  {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const items: any = [
        {
          label: '首页',
          key: '/auth/home',
          icon: <HomeOutlined />,
        },
        {
            label: '用户管理',
            key: '/auth/user-mannage',
            icon: <OrderedListOutlined />,
            children: [
                {
                    label: '用户列表',
                    key: '/auth/user-mannage/user-list',
                }
            ]
        },
        {
            label: '权限管理',
            key: '/auth/right-mannage',
            icon: <UsergroupAddOutlined />,
            children: [
                {
                    label: '权限列表',
                    key: '/auth/right-mannage/right-list',
                },
                {
                    label: '角色列表',
                    key: '/auth/right-mannage/role-list'
                }
            ]
        }
    ]
    return (
      <div className="menu">
      <Spin spinning={loading} tip="Loading...">
        <div className="logo">全球新闻发布系统</div>
        <Menu
          theme="dark"
          mode="inline"
          triggerSubMenuAction="click"
          defaultSelectedKeys={["/auth/home"]}
          items={items}
          onClick={ (e) => {
              console.log(e)
              navigate(e.key)
          } }
        />
        </Spin>
        </div>
    );
  }

export default SideMenu