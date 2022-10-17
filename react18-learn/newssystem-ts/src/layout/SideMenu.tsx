/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { useAppDispatch, useAppSelector } from './../hook/hooks'
import {
    HomeOutlined,
    UsergroupAddOutlined,
    UserOutlined,
    MessageOutlined,
    CheckSquareOutlined,
    CloudUploadOutlined
} from "@ant-design/icons";
import { useNavigate, useLocation } from 'react-router-dom'
import './SideMenu.scss'
import axios from 'axios';
const { Sider } = Layout;
const IconList: any = {
    '/home': <HomeOutlined />,
    '/user-manage': <UserOutlined />,
    '/right-manage': <UsergroupAddOutlined />,
    '/news-manage': <MessageOutlined />,
    '/audit-manage': <CheckSquareOutlined />,
    '/publish-manage': <CloudUploadOutlined />
}

export default function SideMenu() {
  // const [collapsed, setCollapsed] = useState(false);
  // const collapsed = false;
  const [menuList, setMenuList] = useState([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const openKeys = ['/' + pathname.split('/')[1]]
  const filterMenu = (menuArr: any) => {
     menuArr.forEach((item: any, index: any) => {
            item.icon = IconList[item.key]
     })
     return menuArr
  } 
  const collapsed =  useAppSelector((state) => state.collapse.status)
  useEffect(() => {
    const username = JSON.parse((localStorage.getItem('token') as any))[0]['username'];
    axios.get('menu.json').then(res => {
        let tempArr: any = filterMenu(res.data[username])
        setMenuList(tempArr)
    })
  }, [])
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div style={{display: 'flex', height: '100%', flexDirection: 'column'}}>
        <div className="logo">{ !collapsed ? '新闻发布系统' : '新闻' }</div>
        <div style={{ flex: 1, overflow: 'hidden'}}>
            <Menu
                theme="dark"
                mode="inline"
                // defaultSelectedKeys={[pathname]}
                selectedKeys={[pathname]}
                defaultOpenKeys={openKeys}
                items={menuList}
                onClick={ (e) => {
                    navigate(e.key)
                }}
            />
        </div>
      </div>
    </Sider>
  );
}