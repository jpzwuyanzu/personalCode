import React from 'react';
import { Redirect, Switch } from 'react-router-dom'
import menus from './menus';

const redirectMenus = menus.filter(item => item.redirect)
// console.log(redirectMenus)

//路由如果分组件的话Switch不可以共用

const RedirectRouterView = () => {
    return (
        <Switch>
        {
            redirectMenus.map((item) =>{
             const Item = <Redirect key={item.path} path={item.path} exact to={item.redirect} /> 
            //  console.log(item.path, item.redirect)
             return Item
            })
        }
        </Switch>
    );
}

export default RedirectRouterView;





