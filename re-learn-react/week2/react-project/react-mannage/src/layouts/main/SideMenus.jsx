import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import menus from './../../router/menu'
import { withRouter, useLocation, useHistory } from 'react-router-dom'
import { getItem } from './../../utils/common'

const { SubMenu } = Menu
const rootSubmenuKeys = []
menus.forEach(item => (
    item.children && rootSubmenuKeys.push(item.path)
))


const SideMenus = withRouter((props) => {
    const [openKeys, setOpenKeys] = useState([])
    const [selectedKeys, setSelectedKeys] = useState([])
    const history = useHistory()
    const userRole = getItem('role') * 1 

    const renderMenus = (menus) => {
        return menus.map(item => {
            //在这里通过角色判断，只渲染对应角色所属的菜单
            if(item.auth && item.auth !== userRole) {
                return null
            }
            if(item.children) {
                return(
                  <SubMenu  key={ item.path } icon={item.icon} title={ item.title }>
                      {
                          renderMenus(item.children)
                      }
                  </SubMenu>  
                )
            } else {
                return item.meta && item.meta.hidden ? 
                null 
                 : 
                <Menu.Item key={item.path} icon={item.icon}>
                    { item.title }
                </Menu.Item>
            }
        })
    }
    const goPage = ({ key }) => {
        // console.log(key)
        history.push(key)
    }

    const onOpenChange = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          setOpenKeys(keys);
        } else {
          setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
      };

    const { pathname } = useLocation()
    const keys = '/' + pathname.split('/')[1]

    useEffect(() => {
        setOpenKeys([keys])
        setSelectedKeys([pathname])
    }, [keys, pathname])

    

    return (
        <Menu theme="dark" 
        mode="inline" 
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={[keys]}
        openKeys={ openKeys }
        selectedKeys={ selectedKeys }
        onOpenChange = { onOpenChange }
        onClick = { goPage }
        >
            {
              renderMenus(menus)  
            }
        </Menu>
    );
})

export default SideMenus;
