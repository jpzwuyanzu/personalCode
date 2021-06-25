import React, {Suspense} from 'react';
import {Route, Switch } from 'react-router-dom'
import menus from './menus'
import RedirectRouterView from './RedirectRouterView'
import { Spin } from 'antd';

const RouterView = () => {
    // 使用递归遍历路由配置
  const renderRoute = (menus) => {
    return menus.map((item,index) => {
      if(item.children) {
        return  renderRoute(item.children)
      } else {
        return (
          item.path === '/' ? null : <Route
            key={index}
            path={item.path}  exact
            component = {item.component}
          ></Route>
        )
      }
    })
  }
  
    return (
        <Suspense fallback={<div className="loading"><Spin size="large"/></div>}>
            <Switch>
              {
                renderRoute(menus)
              }
              <RedirectRouterView/>
            </Switch>
           </Suspense>
    );
}

export default RouterView;
