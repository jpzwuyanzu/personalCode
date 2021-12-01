import React from 'react';
import { Menu } from 'antd';
import menus from './../../router/menu'
import { withRouter, useLocation, useHistory } from 'react-router-dom'

const { SubMenu } = Menu


const SideMenus = withRouter((props) => {

    const history = useHistory()

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

    const { pathname } = useLocation()
    const keys = '/' + pathname.split('/')[1]

    

    return (
        <Menu theme="dark" 
        mode="inline" 
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={[keys]}
        onClick = { goPage }
        >
            {
              renderMenus(menus)  
            }
        </Menu>
    );
})

export default SideMenus;
