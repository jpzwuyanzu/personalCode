import React from 'react'
import { Redirect, Switch } from 'react-router-dom'
import menus from './menus'

//将需要重定向的路由过滤出来
const redirectMenus = menus.filter(item => item.redirect)

const RedirectRouterView = () => {
    return (
        <Switch>
            {
                redirectMenus.map((item => <Redirect key={item.path} path = {item.path}  exact to={item.redirect} /> ))
            }
        </Switch>
    )
}

export default RedirectRouterView
