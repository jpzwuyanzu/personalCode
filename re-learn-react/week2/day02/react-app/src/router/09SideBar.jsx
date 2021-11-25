import React, { Component } from 'react'
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom'
import './style.css'

const Home = () => <div>首页</div>
const Kind = () => <div>分类</div>
const Cart = () => <div>购物车</div>
const User = () => <div>我的</div>

export default class App extends Component {
    render() {
        return (
            // Router下边有且只有一个子元素(react-router-dom 4版本时会报错)
            // 使用Route中children属性渲染组件时 --- 所有的路由都会渲染该路由对应的组件（不常用）
            // React路由声明式跳转 Link NavLink

            // <Router>
                <>
                    <ul style={{ float: 'left', width: '40%' }}>
                    <li><NavLink activeClassName="selected" activeStyle={{ color: 'yellowgreen' }}  to="/home">首页</NavLink></li>
                    <li><NavLink activeClassName="selected" activeStyle={{ color: 'yellowgreen' }} to="/kind">分类</NavLink></li>
                    <li><NavLink activeClassName="selected" activeStyle={{ color: 'yellowgreen' }} to="/cart">购物车</NavLink></li>
                    <li><NavLink activeClassName="selected" activeStyle={{ color: 'yellowgreen' }} to="/user">我的</NavLink></li>
                </ul>
                <hr/>
                <div style={{ float: 'left' }}>
                <Switch>
                    <Route path="/home" component={ Home }></Route>
                    <Route path="/kind"><Kind></Kind></Route>
                    <Route path="/cart" render = { () => <Cart></Cart> }></Route>
                    {/* <Route path="/user" children = { () => <User></User> }></Route> */}
                    <Route path="/user" render = { () => <User></User> }></Route>
                </Switch>
                </div>
                </>
            // </Router>
        )
    }
}
