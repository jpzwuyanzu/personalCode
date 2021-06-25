import React from 'react'
import { Menu } from 'antd'
import routes from './../routes'
import { history } from 'umi'

const { SubMenu } = Menu
const renderMenu = (routes: Array<any>) => {
    return routes.map( item => {
        if(item.children) {
          return   <SubMenu key={ item.path } icon={<item.icon />} title={ item.name }>
              {
                  renderMenu(item.children)
              }
          </SubMenu>
        } else {
          return   <Menu.Item icon={ item.icon && <item.icon/> }  key={ item.path }>{ item.name }</Menu.Item>
        }
    } )
}

interface ISelect {
    key: string
}

function MyMenu () {

    const selectRoute = ({ key }: ISelect) => {
        history.push(key)
    }

    return (
        <Menu theme="dark" mode="inline" onSelect={ selectRoute } defaultSelectedKeys={['1']} >
            {
                renderMenu(routes)
            }
          </Menu>
    )
}

export default MyMenu