import React, { Component } from 'react'
import {  Route, NavLink, useRouteMatch } from 'react-router-dom'

// 路由嵌套


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
            <Route path={`${url}/phone`} component = { Phone }></Route>
            <Route path={`${url}/wash`} component = { Wash }></Route>
            <Route path={`${url}/ice`} component = { Ice }></Route>
        </div>
    )
}

// const Kind = () =>{
//     return (
//         <div>分类
//             <ul>
//                 <li> <NavLink to="/kind/phone">旧手机</NavLink></li>
//                 <li> <NavLink to="/kind/wash">洗衣机</NavLink></li>
//                 <li> <NavLink to="/kind/ice">电冰箱</NavLink></li>
//             </ul>
//             <hr></hr>
//             <Route path="/kind/phone" component = { Phone }></Route>
//             <Route path="/kind/wash" component = { Wash }></Route>
//             <Route path="/kind/ice" component = { Ice }></Route>
//         </div>
//     )
// }

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
                <Route path="/home" component = { Home }></Route>
                <Route path="/kind" component = { Kind }></Route>
                <Route path="/cart" component = { Cart }></Route>
                <Route path="/user" component = { User }></Route>
            </>
        )
    }
}
