import React, { Component } from 'react';
import { Switch, NavLink, Route  } from 'react-router-dom'
import Home from './views/Home'
import Kind from './views/Kind'

class App extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li><NavLink to="/home">首页</NavLink></li>
                    <li><NavLink to="/kind">分类</NavLink></li>
                </ul>
                <Switch>
                    <Route path="/home" component = { Home }></Route>
                    <Route path="/kind" component = { Kind }></Route>
                </Switch>
            </div>
        );
    }
}

export default App;
