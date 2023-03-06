/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { useAppSelector } from './../hook/hooks'
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
import type { MenuProps } from 'antd';
const { Sider } = Layout;
const IconList: any = {
    '/home': <HomeOutlined />,
    '/user-manage': <UserOutlined />,
    '/right-manage': <UsergroupAddOutlined />,
    '/news-manage': <MessageOutlined />,
    '/audit-manage': <CheckSquareOutlined />,
    '/publish-manage': <CloudUploadOutlined />
}
const rootSubmenuKeys: any = []
export default function SideMenu() {
  const [menuList, setMenuList] = useState([]);
  const [openParentKeys, setOpenParentKeys] = useState(['']);
  const [openKeys, setOpenKeys] = useState([''])
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const defaultOpenKeys = ['/' + pathname.split('/')[1]]
  const collapsed =  useAppSelector((state) => state.collapse.status)
  const filterMenu = (menuArr: any) => {
     menuArr.forEach((item: any, index: any) => {
            item.icon = IconList[item.key]
     })
     return menuArr
  } 
 
  const onOpenChange = (keys: any) => {
    const latestOpenKey: any = keys.find((key: any) => openParentKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenParentKeys(keys);
    } else {
      setOpenParentKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  useEffect(() => {
    const username = JSON.parse((localStorage.getItem('token') as any))[0]['username'];
    axios.get('menu.json').then(res => {
        let tempArr: any = filterMenu(res.data[username])
        tempArr.forEach((item: any) => {
          rootSubmenuKeys.push(item.key)
        })
        setOpenParentKeys(defaultOpenKeys)
        setMenuList(tempArr)
    })
  }, [])
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div style={{display: 'flex', height: '100%', flexDirection: 'column'}}>
        <div className="logo">{ !collapsed ? '聚合支付管理系统' : '聚合' }</div>
        <div style={{ flex: 1, overflow: 'hidden'}}>
            <Menu
                theme="dark"
                mode="inline"
                // defaultSelectedKeys={[pathname]}
                openKeys={openParentKeys}
                selectedKeys={[pathname]}
                defaultOpenKeys={defaultOpenKeys}
                items={menuList}
                onClick={ (e) => {
                    navigate(e.key)
                }}
                onOpenChange={ onOpenChange }
            />
        </div>
      </div>
    </Sider>
  );
}