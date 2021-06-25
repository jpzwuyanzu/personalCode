import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop' //用于切换路由的时候把页面滚动到最上面
import Main from "./layout/main/index";
import Login from './layout/Login'

const App = () => {
  return (
    <Router>
      <ScrollToTop>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Main} />
        
      </Switch>
      </ScrollToTop>
    </Router>
  );
};
export default App;
