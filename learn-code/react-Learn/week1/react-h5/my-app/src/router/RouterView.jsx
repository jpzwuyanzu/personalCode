import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import menus from "./router";
import RedirectRouterView from './RedirectRouterView'
import Loading from './../components/Loading'
const RouterView = () => {
  const renderRoute = (menus) => {
    return menus.map((item, index) => {
      return (
        <Route
          key={index}
          path={item.path}
          exact
          component={item.component}
        ></Route>
      );
    });
  };


  return (
    <Suspense fallback={<Loading/>}>
      <Switch>
          {renderRoute(menus)}
          <Redirect key='/' path='/' exact to='/home' />
         <RedirectRouterView/>
      </Switch>
    </Suspense>
  );
};

export default RouterView;
