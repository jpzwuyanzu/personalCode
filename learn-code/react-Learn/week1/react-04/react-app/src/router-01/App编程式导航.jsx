import React, { Component } from 'react';

import {  Route, withRouter } from 'react-router-dom'

import './style.css'



const Home = () => <div>首页</div>
const Kind = () => <div>分类</div>
const Cart = () => <div>购物车</div>
const User = () => <div>我的</div>

@withRouter
class App extends Component {
    state = {
        currentIndex:0
    }

    changePage = (path,index) => {
        return (e) => {
            console.log(index)
            this.setState({
                currentIndex: index
            })
            this.props.history.push({
                pathname:path
            })
        }
    }
    render() {


        const { currentIndex} = this.state
        return (
            // Router下边有且只有一个子元素(react-router-dom 4版本的时候会报错， 最新版本不会报错)
            // chilren -- 所有的路由都会渲染该路由对应的组件
            // 2， 编程式跳转 
            //编程式导航需要使用this.props.history
            //如果当前组件没有的话可以引入withRouter --- 高阶组件
            <>
                <ul>
                    <li className = { currentIndex === 0 ? 'active' : '' } onClick = { this.changePage('home',0) }>首页{ currentIndex }</li>
                    <li className = { currentIndex === 1 ? 'active' : '' } onClick = { this.changePage('kind',1) }>分类{ currentIndex }</li>
                    <li className = { currentIndex === 2 ? 'active' : '' } onClick = { this.changePage('cart',2) }>购物车{ currentIndex }</li>
                    <li className = { currentIndex === 3 ? 'active' : '' } onClick = { this.changePage('user',3) }>我的{ currentIndex }</li>
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
            </>
        );
    }
}

export default App;
