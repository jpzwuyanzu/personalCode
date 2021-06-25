import React, { useState, useEffect } from 'react'
import { Menu } from 'antd';
import { withRouter, useHistory, useLocation } from 'react-router-dom'
import menus from '../../router/menus'
import { getStorage } from '../../utils/storage'
import { getMenu } from './getMenu'

const permissionArr = [...menus]
permissionArr.shift() //删除第一项



const { SubMenu } = Menu
const rootSubmenuKeys = []
menus.forEach(item => {
  item.children && rootSubmenuKeys.push(item.path)
})
const SideMenu = withRouter((props) => {
  const [openKeys, setOpenKeys ] = useState([])
  const [selectedKeys, setSelectedKeys ] = useState([])
  const history = useHistory()
  const renderMenu = (menus) => {
    return (
      <>
        {
          menus.map( item => {
            if (item.children) { // 有多级菜单
              return (
                <SubMenu key={item.path} icon={item.icon} title={item.title}>
                  {
                    renderMenu(item.children)
                  }
                </SubMenu>
              )
            } else { // 只有一级菜单
              // 此处判断要不要在侧边栏出现该路由
              return  item.meta && item.meta.hidden ? null : <Menu.Item key={item.path} icon={ item.icon }>
              { item.title }
            </Menu.Item>
            }
          })
        }
      </>
    )
  }
  const goPage = ({ key }) => {
    history.push(key)
  }

  const onOpenChange = keys => { // keys [] ,包含上一个和点击之后的那一个
    // console.log(keys) //  ["/bannermanager", "/navigatormanager"]
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    // console.log(latestOpenKey) // 当前的这一个 /navigatormanager
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  }
  // 为了 显示当前左侧菜单选中的 状态  ----  string[ key ] key 就是path
  // defaultSelectedKeys
  // defaultOpenKeys
  const { pathname } = useLocation() // '/usermanager/list'
  const type = '/' + pathname.split('/')[1]

  useEffect(() => {
    setOpenKeys([type])
    setSelectedKeys([pathname])
  }, [pathname,type])

  //获取服务器中管理员权限
  const[menuarr, setMenuarr] = useState([])
  useEffect(() => {
    const tempArr = JSON.parse(getStorage('session','newPermission')) ? JSON.parse(getStorage('session','newPermission')) : []
    setMenuarr(getMenu(permissionArr ,tempArr))
    
  },[])

  return (
    <Menu 
      theme="dark"
      mode="inline"
      defaultSelectedKeys={[pathname]} // {['/usermanager/list']} 数组
      defaultOpenKeys={[type]}  // {['/usermanager‘]} 数组
      openKeys = { openKeys }
      selectedKeys = { selectedKeys }
      onClick={ goPage } 
      onOpenChange = { onOpenChange }
    >
      {
        // 方便做多级菜单 --- 递归的设计思想
        renderMenu(menuarr)
      }
    </Menu>
  )
})

export default SideMenu