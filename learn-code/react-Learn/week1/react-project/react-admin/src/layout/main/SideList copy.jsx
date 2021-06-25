import React from 'react';
import { Menu } from 'antd';
import menus from '../../router/menus'
import { withRouter } from 'react-router-dom'

const { SubMenu } = Menu


const SideList = withRouter( (props) => {


        const renderSideList = (menus) => {
            return (
                <>
                {
                    menus.map((item) => {
                        if(item.children) {
                            return (
                                // 使用递归遍历的方式渲染菜单以及子菜单
                                <SubMenu key={item.path} icon={item.icon} title={item.title}>{
                                    renderSideList(item.children)
                                }</SubMenu> 
                            )
                        } else {
                         return  item.meta && item.meta.hidden ? null : <Menu.Item key={item.path} icon={item.icon}>{item.title}</Menu.Item>
                        }
                    })
                }
                </>
            )
        }
    
        const  goPage = ({key}) => { 
            // 路由跳转可以通过钩子，也可以通过props
            props.history.push(key)
        }
        
        return (
            <>
                <Menu theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onClick = { goPage }
                    >
                    {
                        renderSideList(menus)
                    }
                </Menu>
            </>
        );
    }
)

export default SideList;
