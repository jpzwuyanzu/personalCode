import React, { Component } from 'react';

import {  Route, NavLink, useRouteMatch, Redirect, Switch } from 'react-router-dom'

import './style.css'

    // 分类下的导航组件
    const Phone = () => <div>手机</div>
    const Wash = () => <div>洗衣机</div>
    const Ice = () => <div>电冰箱</div>


    //默认的导航组件
    const Home = () => <div>首页</div>
    const Cart = () => <div>购物车</div>
    const User = () => <div>我的</div>
    const Kind = () => {
        const { url } = useRouteMatch() //该函数只能在函数式组件中使用
        return (
            <div>
                分类
                <ul>
                    <li><NavLink to = {`${url}/phone`} >手er机</NavLink></li>
                    <li><NavLink to = {`${url}/wash`} >洗衣机</NavLink></li>
                    <li><NavLink to = {`${url}/ice`} >电冰箱</NavLink></li>
                </ul>
                <hr/>
                <Switch>
                    <Route path={`${url}/phone`} component = {Phone} />
                    <Route path={`${url}/wash`} component = {Wash} />
                    <Route path={`${url}/ice`} component = {Ice} />
                    <Redirect path = {`${url}`}  to = {`${url}/phone`} />
                </Switch>
            </div>
        )
    }



class App extends Component {
    render() {
        return (
            <>
                <ul>
                   <li><NavLink to = "/home">首页</NavLink></li>
                    <li><NavLink to = "/kind">分类</NavLink></li>
                    <li><NavLink to = "/cart">购物车</NavLink></li>
                    <li><NavLink to = "/user">我的</NavLink></li>
                </ul>
                <hr/>
                {/* Switch 只能选择其中一个路由  */}
                <Switch>
                    <Route path = "/home" component = { Home } />
                    <Route path = "/kind" component = { Kind } />
                    <Route path = "/cart" component = { Cart } />
                    <Route path = "/user" component = { User } />
                    {/* exact 叫做精准匹配，只有当路由为/的时候才会重定向 */}
                    <Redirect path = "/" exact to = "home" />
                </Switch>
            </>
        );
    }
}

export default App;
