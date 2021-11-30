import React, { Component } from "react";
import { Menu } from "antd";
import menus from "../../router/menu";

const { SubMenu } = Menu;  //二级菜单标识

class SideMenu extends Component {
  renderMenu = (menus) => {
    return (
      <>
        {menus.map((item, index) => {
          if (item.children) {  //有多级菜单
            return (
              <SubMenu key={item.path} icon={item.icon} title={item.title}>
                {this.renderMenu(item.children)}
              </SubMenu>
            );
          } else {  //只有一级菜单
            return (
              <Menu.Item key={item.path} icon={item.icon}>
                {item.title}
              </Menu.Item>
            );
          }
        })}
      </>
    );
  };

  render() {
    return (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          {/* // 方便做多级菜单，用到递归的设计思想 */}
        {this.renderMenu(menus)}
      </Menu>
    );
  }
}

export default SideMenu;
