import React, { Component } from 'react';

import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

import './style.css'



const Home = () => <div>首页</div>
const Kind = () => <div>分类</div>
const Cart = () => <div>购物车</div>
const User = () => <div>我的</div>


class App extends Component {
    render() {
        return (
            // Router下边有且只有一个子元素(react-router-dom 4版本的时候会报错， 最新版本不会报错)
            // chilren -- 所有的路由都会渲染该路由对应的组件
            //跳转有两种方式，
            // 1，声明式跳转   Link  NavLink
            // 2， 编程式跳转 
            <Router>
                <ul>
                    <li><NavLink activeClassName = "selected" to = "/home">首页</NavLink></li>
                    <li><NavLink activeClassName = "selected" to = "/kind">分类</NavLink></li>
                    <li><NavLink activeClassName = "selected" to = "/cart">购物车</NavLink></li>
                    <li><NavLink activeClassName = "selected" to = "/user">我的</NavLink></li>
                </ul>
                <hr/>
                {/* 第一种 */}
                <Route path="/home" component = { Home } />
                {/* 第二种 */}
                <Route path="/kind"><Kind/></Route>
                {/* 第三种 */}
                <Route path="/cart" render = { () => <Cart/> }></Route>
                <Route path="/user" render = { () => <User/> }></Route>
                {/* 第四种，不常用 */}
                {/* <Route path="/User" children = { () => <User/> }></Route> */}
            </Router>
        );
    }
}

export default App;
