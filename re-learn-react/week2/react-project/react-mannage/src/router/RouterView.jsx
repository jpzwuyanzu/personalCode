import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
// import { Spin } from 'antd';
import menus from './menu'
import RedirectRouterView from './RedirectRouterView'
import { getItem } from './../utils/common'
import Loading from './../components/Loading'

const userRole = getItem('role') * 1

const RouterView = () => {
  
    const renderRoutes = (menus) => {
        return menus.map(item => {
          if(item.children) {
           return renderRoutes(item.children)
          } else {
            return item.path === '/' ? null : (
              (item.auth && item.auth !== userRole) ? 
              <Redirect path={ item.path } key={ item.path } to="/403" />
              :
              <Route key={ item.path }
               exact
               path={ item.path } 
               component={ item.component }
               >
               </Route>
            )
          }
        })
      }
    return (
        // <Suspense fallback={ <div className="loading"><Spin size="large" /></div> }>
        // 更换loading组件为nprogress，同时在请求拦截也要加上
        <Suspense fallback={ <Loading/> }>
            <Switch>
              {
                renderRoutes(menus)
              }
              {/* <Route path="/" component={ lazy(() => import('./../../views/home/Index')) }></Route> */}
            </Switch>
            <RedirectRouterView/>
            </Suspense>
    );
}

export default RouterView;
