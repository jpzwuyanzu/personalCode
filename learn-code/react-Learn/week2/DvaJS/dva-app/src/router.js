import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Product from './routes/Product'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
      <Route path="/product" exact component={Product} />
        <Route path="/" exact component={IndexPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
