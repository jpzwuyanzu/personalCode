import React, { Component } from 'react';
import {  Menu } from 'antd';
import menus from '../../router/menus'

const { SubMenu } = Menu; //二级菜单标识
class SideMenu extends Component {

    renderMenus = (menus) => {
        return (
            <>
                {
                    menus.map((item) => {
                        if(item.children) {
                            // 多级菜单
                            return (
                                <SubMenu key={item.path} icon={item.icon} title={item.title}>
                                    {
                                        this.renderMenus(item.children)
                                    }
                                </SubMenu>
                            )
                        } else {
                            // 只有一级菜单
                            return (
                                <Menu.Item key={item.path} icon={item.icon}>
                                {item.title}
                                </Menu.Item>
                            )
                        }
                    })
                }
            </>
        )
    }


    render() {
        return (
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
               {
                //    方便渲染多级菜单，递归渲染
                   this.renderMenus(menus)
               }
            </Menu>
        );
    }
}

export default SideMenu;
