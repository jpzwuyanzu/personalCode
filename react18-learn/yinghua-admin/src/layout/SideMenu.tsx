import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Layout } from 'antd';
import { useAppSelector } from "@/hooks/hooks";
import styles from './SideMenu.module.scss'
import LogoImg from './../assets/logo.png'
// import { FMenu } from './../utils/leftMenu'

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

// const MenuInfo = [
//   {
//     id: '1',
//     name: '首页',
//     icon: <MailOutlined />,
//     children: [],
//     path: '/payment/home',
//     level: 1,
//   },
//   {
//     id: '2',
//     name: '权限管理',
//     icon: <AppstoreOutlined />,
//     children: [
//       {
//         id: '2-1',
//         name: '用户管理',
//         path: '/payment/userlist'
//       },
//       {
//         id: '2-2',
//         name: '角色管理',
//         path: '/payment/rolelist'
//       }
//     ],
//     level: 1,
//     path: '/payment/userlist'
//   },
//   {
//     id: '3',
//     name: '订单管理',
//     icon: <AppstoreOutlined />,
//     children: [
//       {
//         id: '3-1',
//         name: '商户订单',
//         path: '/payment/userorder'
//       },
//       {
//         id: '3-2',
//         name: '三方订单',
//         path: '/payment/sanfangorder'
//       }
//     ],
//     level: 1,
//     path: '/payment/userorder'
//   },
// ]
const FMenu: any = {};
const rootSubmenuKeys: any = [];
const formMenuData = (menuData: any) => {
  let sideMenuArr: any = []; //前端左侧菜单
  if (menuData.length) {
    menuData.forEach((item: any) => {
      let arr1: any = [];
      if (item.list && item.list) {
        item.list.forEach((itm: any) => {
          arr1.push(getItem(itm.name,  itm.path));
          FMenu[String(itm.path).split('/')[2]] = String(item.path + '_' + item.id)
        });
        sideMenuArr.push(getItem(item.name,  item.path + '_' + item.id,  <AppstoreOutlined />, arr1));
        rootSubmenuKeys.indexOf(item.path + '_' + item.id) === -1 && rootSubmenuKeys.push(item.path + '_' + item.id) 
        
      } else {
        if(item.path) {
          FMenu[String(item.path).split('/')[2]] = String(item.path + '_' + item.id)
        }
        sideMenuArr.push(getItem(item.name,  item.path + '_' + item.id, <AppstoreOutlined />));
        rootSubmenuKeys.indexOf(item.path + '_' + item.id) === -1 && rootSubmenuKeys.push(item.path + '_' + item.id) 
      }
    });
  }
  return sideMenuArr;
};


const SideMenu = () => {
  const MenuInfo = useAppSelector((state) => state.user.menuList);
  const collapsed = useAppSelector((state) => state.collapse.status);
  const [openKeys, setOpenKeys] = useState<any>([]);
  const naviagte = useNavigate();
  const { pathname } = useLocation()
  const fmName = pathname.split('/')[2];
  const [selectedKeys, setSelectedKeys] = useState<any>([]);
  const items: any =formMenuData(MenuInfo)

  const onOpenChange: any = (keys: any) => {
    console.log(keys)
    const latestOpenKey: any = keys.find((key: any) => (openKeys as any).indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const linkPage = ({ key, keyPath }: any) => {
    // 拆分url
    console.log(keyPath)
    // let linkUrl = String(key).split('_')[0]
    // let linkUrl  =  key;
    // console.log('openKeys:',openKeys)
    // console.log('linkUrl:', linkUrl)
    setSelectedKeys(key)
    naviagte(key)
    
  }
  useEffect(() => {
    console.log(rootSubmenuKeys);
    setSelectedKeys(pathname)
    console.log(FMenu)
    console.log((FMenu as any)[fmName])
    setOpenKeys([(FMenu as any)[fmName]])
  }, [pathname])

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className={ styles.logo }>
        <img className={ styles.logoImg } src={ LogoImg } alt="" />
        { !collapsed ? '支付管理系统' : '' }
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