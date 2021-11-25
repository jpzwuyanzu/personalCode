import React, { Component } from 'react'
import {  Route, NavLink } from 'react-router-dom'



const Child = (props) => {
    console.log(props)
    const type = props.match.params.type
    return (
        <div>child--{ type }</div>
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
               <Route path="/:type" component = { Child }></Route>
            </>
        )
    }
}
