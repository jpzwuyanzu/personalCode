import React, { Component } from 'react'
import {  Route, NavLink, useRouteMatch, Redirect, Switch } from 'react-router-dom'

// 重定向Redirect+精准匹配exact+Switch

// 分类下的导航组件
const Phone = () => <div>手机</div>
const Wash = () => <div>洗衣机</div>
const Ice = () => <div>电冰箱</div>


const Home = () => <div>首页</div>
const Cart = () => <div>购物车</div>
const User = () => <div>我的</div>

const Kind = () =>{
    console.log(useRouteMatch())
    const { url } = useRouteMatch() //useRouteMatch 只能在函数式组件中使用
    return (
        <div>分类
            <ul>
                <li> <NavLink to={`${url}/phone`}>旧手机</NavLink></li>
                <li> <NavLink to={`${url}/wash`}>洗衣机</NavLink></li>
                <li> <NavLink to={`${url}/ice`}>电冰箱</NavLink></li>
            </ul>
            <hr></hr>
            <Switch>
                <Route path={`${url}/phone`} component = { Phone }></Route>
                <Route path={`${url}/wash`} component = { Wash }></Route>
                <Route path={`${url}/ice`} component = { Ice }></Route>
                <Redirect path={`${url}`} exact to={`${url}/phone`}></Redirect>
            </Switch>
        </div>
    )
}
export default class App extends Component {
    render() {
        return (
            <>
                <ul>
                    <li><NavLink  to="/home">首页</NavLink></li>
                    <li><NavLink to="/kind">分类</NavLink></li>
                    <li><NavLink to="/cart">购物车</NavLink></li>
                    <li><NavLink to="/user">我的</NavLink></li>
                </ul>
                <hr/>
                {/* Switch: 表示只能选择其中一个路由 */}
                <Switch>
                    <Route path="/home" component = { Home }></Route>
                    <Route path="/kind" component = { Kind }></Route>
                    <Route path="/cart" component = { Cart }></Route>
                    <Route path="/user" component = { User }></Route>
                    {/* exact: 表示精准匹配， 只有当路由为/时，才会重定向 */}
                    {/* <Redirect path="/" exact to="/home"></Redirect> */}
                    <Redirect path={{ pathname: '/' }} exact to="/home"></Redirect>
                </Switch>
            </>
        )
    }
}
