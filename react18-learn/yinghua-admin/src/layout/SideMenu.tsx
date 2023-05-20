import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom'
import { Layout, Menu } from "antd";
import { useAppSelector } from "@/hooks/hooks";
import { AppstoreOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { FMenu } from './../utils/leftMenu'

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode, //菜单名称
  key: React.Key, //菜单key，包括一级菜单和二级菜单key
  keypath: any,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    keypath,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
const { Sider } = Layout;
const rootSubmenuKeys:any = [];

export default function SideMenu() {
  const navigate = useNavigate()
  const sideMenuList = useAppSelector((state) => state.user.menuList);
  const formMenuData = (menuData: any) => {
    let menuListArr: any = []; //后端菜单数据整合
    let sideMenuArr: any = []; //前端左侧菜单
    if (menuData.length) {
      menuData.forEach((item: any) => {
        let level_F: any = {
          label: item.name,
          key: item.path+"_"+item.id,
          icon: <AppstoreOutlined />,
          children: [],
        };
        let arr1: any = [];
        if (item.list && item.list.length) {
          item.list.forEach((itm: any) => {
            let level_S: any = {
              label: itm.name,
              key: itm.path+'_'+itm.id,
              keypath: itm.path,
              icon: itm.icon,
              children: [],
            };
            level_F["children"].push(level_S);
            arr1.push(getItem(itm.name, itm.path, itm.path+'_'+itm.id, ""));
          });
          sideMenuArr.push(getItem(item.name,'permission-mannage', item.path+"_"+item.id, <AppstoreOutlined />, arr1));
        } else {
          sideMenuArr.push(getItem(item.name,'permission-mannage', item.path+"_"+item.id, <AppstoreOutlined />));
        }
        menuListArr.push(level_F);
      });
    }
    return sideMenuArr;
  };
  const sideMenuItems: MenuItem[] = formMenuData(sideMenuList);
  console.log(sideMenuItems)
  const collapsed = useAppSelector((state) => state.collapse.status);
  const [openKeys, setOpenKeys] = useState<any>([]);
  const [selectedKeys, setSelectedKeys] = useState<any>([]);
  const { pathname } = useLocation();
  const fmName = pathname.split('/')[2]; // 截取路由中的后半段，去leftMenu数据中对比父级名称
  console.log(useLocation())

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    console.log(keys)
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const linkPage = ({ key, keypath }: any) => {
    console.log(keypath)
    // 拆分url
    let linkUrl = String(key).split('_')[0]
    console.log('openKeys:',openKeys)
    console.log('linkUrl:', linkUrl)
    setSelectedKeys(linkUrl)
    navigate(linkUrl)
    
  }
  useEffect(() => {
    console.log(pathname);
    setSelectedKeys(pathname)
      setOpenKeys((FMenu as any)[fmName])
  }, [pathname])


  return (
    <>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          mode="inline"
          theme="dark"
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onOpenChange={onOpenChange}
          items={sideMenuItems}
          onClick={ (e) => linkPage(e) }
        />
      </Sider>
    </>
  );
}
