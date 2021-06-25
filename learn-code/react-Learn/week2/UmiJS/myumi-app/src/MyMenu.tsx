import React,{ useState, useEffect } from 'react';
import { Menu } from 'antd';
import routes from './../src/routes';
import { history, useLocation } from 'umi';

interface ISelect {
  key: string;
}
const { SubMenu } = Menu;

const rootSubmenuKeys: (string | undefined)[] = [];
routes.forEach((item) => {
  item.children && rootSubmenuKeys.push(item.path);
});

const MyMenu = () => {
  const [ openKeys, setOpenKeys ] = useState<string[]>([])
  const [ selectedKeys, setSelectedKeys ] = useState<string[]>([])



  const renderMenu = (routes: Array<any>) => {
    return routes.map((item) => {
      if (item.children) {
        return (
          <SubMenu key={item.path} icon={<item.icon />} title={item.name}>
            {renderMenu(item.children)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item icon={item.icon && <item.icon />} key={item.path}>
            {item.name}
          </Menu.Item>
        );
      }
    });
  };
  const selectRoute = ({ key }: ISelect) => {
    history.push(key);
  };

  const onOpenChange = (keys: any[]) => {
    const latestOpenKey = keys.find((key: string) => openKeys.indexOf(key) === -1)
    // console.log(latestOpenKey)
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        setOpenKeys(keys);
      } else {
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
      }
  };

  const { pathname } = useLocation()
  const type = '/' + pathname.split('/')[1]

  useEffect(() => {
    setOpenKeys([type])
    setSelectedKeys([pathname])
  }, [pathname])

  return (
    <Menu
      theme="dark"
      onSelect={selectRoute}
      mode="inline"
      defaultSelectedKeys={['1']}
      openKeys = { openKeys }
      selectedKeys = { selectedKeys }
      onOpenChange={onOpenChange}
    >
      {renderMenu(routes)}
    </Menu>
  );
};

export default MyMenu;
