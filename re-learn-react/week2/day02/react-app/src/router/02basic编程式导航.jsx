import React, { Component } from 'react'
import {  Route, withRouter } from 'react-router-dom'

const Home = () => <div>首页</div>
const Kind = () => <div>分类</div>
const Cart = () => <div>购物车</div>
const User = () => <div>我的</div>

@withRouter
 class App extends Component {
    changePage = (path) => {
        return (e) => {
            // console.log(path)
            // console.log(this)
            this.props.history.push(path)
        }
    }
    render() {
        return (
            // 编程式跳转
            //编程式导航需要使用this.props.history
            // 如果没有需要通过withRouter高阶组件包裹来获取
            // 同时App组件外需要用Router包裹

            <>
                <ul>
                   <li onClick={ this.changePage('/home') }>首页</li>
                   <li onClick={ this.changePage('/kind') }>分类</li>
                   <li onClick={ this.changePage('/cart') }>购物车</li>
                   <li onClick={ this.changePage('/user') }>我的</li>
                </ul>
                <hr/>
                <Route path="/home" component={ Home }></Route>
                <Route path="/kind"><Kind></Kind></Route>
                <Route path="/cart" render = { () => <Cart></Cart> }></Route>
                {/* <Route path="/user" children = { () => <User></User> }></Route> */}
                <Route path="/user" render = { () => <User></User> }></Route>
            </>
        )
    }
}

export default App