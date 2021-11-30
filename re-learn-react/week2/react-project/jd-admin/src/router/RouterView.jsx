import React, { Suspense } from "react";
import { Spin } from "antd";
import { Switch, Route } from "react-router-dom";
import menus from "./menu";

const RouterView = () => {
  const renderRoute = (menus) => {
    return menus.map((item) => {
      if (item.children) {
        return renderRoute(item.children);
      } else {
        return (
          <Route
            key={item.path}
            path={item.path}
            exact
            component={item.component}
          ></Route>
        );
      }
    });
  };
  return (
    <Suspense
      fallback={
        <div className="loading">
          <Spin size="large" />
        </div>
      }
    >
      <Switch>{renderRoute(menus)}</Switch>
    </Suspense>
  );
};

export default RouterView;
