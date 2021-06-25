import React, {Suspense} from 'react'
// import {Spin } from 'antd';
import {Route, Switch, Redirect} from 'react-router-dom'
import menus from './menus'
import RedirectRouterView from './RedirectRouterView'
import Loading from './../components/Loading'
import { getItem } from './../utils/common'

const RouteView = () => {

const userRole = getItem('role')

const renderRoute = (menus) => {
    return  menus.map(item => {
        if(item.children) {
        return renderRoute(item.children)
        } else {

        return item.path === '/' ? null :  
        (
          // 这里判断权限
          item.auth && item.auth !== userRole ? 
          <Redirect path={item.path} key={item.path} to='/403'  /> :
          <Route path={item.path} 
            key={item.path} exact 
            component={item.component}
            ></Route>)
        }
    } )
    }

    return (
        // <Suspense fallback={<div className="loading"><Spin/></div>}>
        // 更换loading为nprogress，需要在请求拦截的时候也加上
        <Suspense fallback={<Loading/>}>
        <Switch>
        {
          renderRoute(menus)
        }
        <RedirectRouterView/>
        </Switch>
      </Suspense>
    );
}

export default RouteView;
