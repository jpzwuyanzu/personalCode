import React, { useState, useEffect } from "react";
import { withRouter, useHistory, useLocation} from 'react-router-dom'
import { Menu } from "antd";
import menus from "./../../router/menu";
import { connect } from 'react-redux'

const { SubMenu } = Menu;  //二级菜单标识
const rootSubmenuKeys = []
menus.forEach(item => (
  item.children && rootSubmenuKeys.push(item.path)
))


const SideMenu = withRouter((props) => { //通过withRouter包裹为了获取编程式导航的对象
  const [openKeys, setOpenKeys] = useState([])
  const [selectedKeys, setSelectedKeys] = useState([])
  const history  = useHistory()
  console.log(props.adminname)
  

  const renderMenu = (menus) => {
    return (
      <>
        {menus.map((item) => {
          if (item.children) {  //有多级菜单
            return (
              <SubMenu key={item.path} icon={item.icon} title={item.title}>
                {renderMenu(item.children)}
              </SubMenu>
            );
          } else {  //只有一级菜单
            return item.meta && item.meta.hidden ?  null
             :
            (
              <Menu.Item key={item.path} icon={item.icon}>
              {item.title}
              </Menu.Item>
            )
          }
        })}
      </>
    );
  }


  const goPage = ({ key }) => {
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

  // 为了显示当前左侧菜单栏选中的状态 - string[ key ]  key值就是path
  // defaultSelectedKeys
  // defaultOpenKeys
  const { pathname } = useLocation() 
  const type = '/' + pathname.split('/')[1] 
  useEffect(() => {
    setOpenKeys([type])
    setSelectedKeys([pathname])
  }, [type ,pathname])

    return (
      <Menu theme="dark" 
      mode="inline" 
      defaultSelectedKeys={[pathname]} // 数组
      defaultOpenKeys={[type]} //数组
      openKeys={ openKeys }
      selectedKeys={selectedKeys}
      onOpenChange={ onOpenChange }
      onClick = { goPage }
      >
        {/* // 方便做多级菜单，用到递归的设计思想 */}
        {renderMenu(menus)}
      </Menu>
    );
})

export default connect(state => ({ adminname: state.getIn(["user", "adminname"]) }))(SideMenu);
