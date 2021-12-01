import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom'
import { Spin } from 'antd';
import menus from './menu'
import RedirectRouterView from './RedirectRouterView'

const RouterView = () => {
    const renderRoutes = (menus) => {
        return menus.map(item => {
          if(item.children) {
           return renderRoutes(item.children)
          } else {
            return item.path === '/' ? null : (
              <Route key={ item.path }
               exact
               path={ item.path } component={ item.component }></Route>
            )
          }
        })
      }
    return (
        <Suspense fallback={ <div className="loading"><Spin size="large" /></div> }>
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
