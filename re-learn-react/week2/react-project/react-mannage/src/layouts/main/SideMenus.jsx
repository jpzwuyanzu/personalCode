import React from 'react';
import { Menu } from 'antd';
import menus from './../../router/menu'

const { SubMenu } = Menu


const SideMenus = () => {
    const renderMenus = (menus) => {
        return menus.map(item => {
            if(item.children) {
                return(
                  <SubMenu  key={ item.path } icon={item.icon} title={ item.title }>
                      {
                          renderMenus(item.children)
                      }
                  </SubMenu>  
                )
            } else {
                return (
                    <Menu.Item key={item.path} icon={item.icon}>
                        { item.title }
                    </Menu.Item>
                )
            }
        })
    }

    return (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            {
              renderMenus(menus)  
            }
           
          </Menu>
    );
}

export default SideMenus;
