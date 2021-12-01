import React from "react";
import { withRouter, useHistory } from 'react-router-dom'
import { Menu } from "antd";
import menus from "../../router/menu";

const { SubMenu } = Menu;  //二级菜单标识

const SideMenu = withRouter((props) => { //通过withRouter包裹为了获取编程式导航的对象

  const history  = useHistory()

  const renderMenu = (menus) => {
    return (
      <>
        {menus.map((item, index) => {
          if (item.children) {  //有多级菜单
            return (
              <SubMenu key={item.path} icon={item.icon} title={item.title}>
                {renderMenu(item.children)}
              </SubMenu>
            );
          } else {  //只有一级菜单
            return item.meta && item.meta.hidden ? 
            null
             :
            <Menu.Item key={item.path} icon={item.icon}>
            {item.title}
            </Menu.Item>
          }
        })}
      </>
    );
  }


  const goPage = ({ key }) => {
    // props.history.push(key) 
    history.push(key)
  }
    return (
      <Menu theme="dark" 
      mode="inline" 
      defaultSelectedKeys={["1"]}
      onClick = { goPage }
      >
          {/* // 方便做多级菜单，用到递归的设计思想 */}
        {renderMenu(menus)}
      </Menu>
    );
})

export default SideMenu;
