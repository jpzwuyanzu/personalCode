import React  from 'react';
import {  Menu } from 'antd';
import menus from '../../router/menus'
import { withRouter } from 'react-router-dom'

const { SubMenu } = Menu; //二级菜单标识

const SideMenu = withRouter((props) => { //通过withRouter为了获取编程式导航的对象



    const goPage = ({key}) => {
        console.log(props)
        props.history.push(key)
    }


    const  renderMenus = (menus) => {
        return (
            <>
                {
                    menus.map((item) => {
                        if(item.children) {
                            // 多级菜单
                            return (
                                <SubMenu key={item.path} icon={item.icon} title={item.title}>
                                    {
                                        renderMenus(item.children)
                                    }
                                </SubMenu>
                            )
                        } else {
                            // 只有一级菜单
                            // 在这里可以控制当前页面是否是在需要通过左侧菜单渲染，通过meta标签判断
                            return item.meta && item.meta.hidden ? null :  <Menu.Item key={item.path} icon={item.icon}>
                            {item.title}
                            </Menu.Item>
                        }
                    })
                }
            </>
        )
    }


        return (
            <Menu 
            theme="dark" 
            mode="inline" 
            defaultSelectedKeys={['1']}
            onClick = {goPage}
            >
               {
                //    方便渲染多级菜单，递归渲染
                   renderMenus(menus)
               }
            </Menu>
        );
})



export default SideMenu;
