import React, { Component } from 'react';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom'
import Home from './views/Home'
import Kind from './views/Kind'
import ProCom from './views/Pro'
import NotFound from './views/404NotFound'

class App extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li><NavLink to="/home">首页</NavLink></li>
                    <li><NavLink to="/kind">分类</NavLink></li>
                    <li><NavLink to="/pro">产品</NavLink></li>
                </ul>
                <Switch>
                    <Route path="/home" component = { Home }></Route>
                    <Route path="/kind" component = { Kind }></Route>
                    <Route path="/pro" component = { ProCom }></Route>
                    <Redirect path="/" exact to="/home"></Redirect>
                    <Route path="*" component = { NotFound }></Route>
                </Switch>
            </div>
        );
    }
}

export default App;
