import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import Icon from '@/components/Icon'
import type { MenuProps } from 'antd';
import { Menu, Layout } from 'antd';
import { useAppSelector } from "@/hooks/hooks";
import styles from './SideMenu.module.scss'
import LogoImg from './../assets/logo.png'

type MenuItem = Required<MenuProps>['items'][number];
const { Sider } = Layout;

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
//记录父级菜单 格式： {userlist: '/payment/rolelist_1', rolelist: '/payment/rolelist_1'}
const FMenu: any = {}; 
//记录所有1级菜单 格式：['/payment/rolelist_1']
const rootSubmenuKeys: any = []; 
// 格式化处理后端的菜单数据
const formMenuData = (menuData: any) => {
  let sideMenuArr: any = []; //前端左侧菜单
  let buttonPermiss: any = []; //前端按钮权限控制
  if (menuData.length) {
    menuData.forEach((item: any) => {
      if(item.path.indexOf('/home') !== -1) {
        sideMenuArr.push(getItem(item.name, item.path,  <Icon icon={ item.icon } />))
      } else {
        let arr1: any = [];
        if (item.list && item.list) {
          item.list.forEach((itm: any) => {
            arr1.push(getItem(itm.name,  itm.path));
            FMenu[String(itm.path).split('/')[2]] = String(item.path + '_' + item.id)
            if(itm.list && itm.list.length) {
              itm.list.forEach((btn_itm: any) => {
                buttonPermiss.push(itm.path + '_' + btn_itm.id)
              })
            }
          });
          sideMenuArr.push(getItem(item.name,  item.path + '_' + item.id,  <Icon icon={ item.icon } />, arr1));
          rootSubmenuKeys.indexOf(item.path + '_' + item.id) === -1 && rootSubmenuKeys.push(item.path + '_' + item.id) 
        } else {
          if(item.path) {
            FMenu[String(item.path).split('/')[2]] = String(item.path + '_' + item.id)
          }
          sideMenuArr.push(getItem(item.name,  item.path + '_' + item.id, <Icon icon={ item.icon } />));
          rootSubmenuKeys.indexOf(item.path + '_' + item.id) === -1 && rootSubmenuKeys.push(item.path + '_' + item.id) 
        }
      }
      
    });
  }
  sessionStorage.setItem('btnPermiss',JSON.stringify(buttonPermiss))
  return sideMenuArr;
};


const SideMenu = () => {
  // const {token: { colorBgContainer }} = theme.useToken();
  const MenuInfo = useAppSelector((state) => state.user.userInfo.menuList);
  const collapsed = useAppSelector((state) => state.collapse.status);
  const [openKeys, setOpenKeys] = useState<any>([]);
  const naviagte = useNavigate();
  const { pathname } = useLocation()
  const fmName = pathname.split('/')[2];
  const [selectedKeys, setSelectedKeys] = useState<any>([]);
  const items: any =formMenuData(MenuInfo)

  const onOpenChange: any = (keys: any) => {
    const latestOpenKey: any = keys.find((key: any) => (openKeys as any).indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const linkPage = ({ key }: any) => {
    setSelectedKeys(key)
    naviagte(key)
    
  }
  useEffect(() => {
    setSelectedKeys(pathname)
    setOpenKeys([(FMenu as any)[fmName]])
  }, [pathname])

  return (
    // <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: colorBgContainer }}>
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className={ styles.logo }>
        <img className={ styles.logoImg } src={ LogoImg } alt="" />
        { !collapsed ? '代理充值系统' : '' }
      </div>
         <Menu
      mode="inline"
      theme="dark"
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      onOpenChange={onOpenChange}
      items={items}
      onClick={ (e) => linkPage(e) }
    />
      </Sider>
   
  );
};

export default SideMenu;