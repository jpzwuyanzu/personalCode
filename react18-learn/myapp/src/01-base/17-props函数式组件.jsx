import React, { Component } from 'react'
import NavBar from './NavBar/index'
import SideBar from './SideBar/index'

export default class App extends Component {
    render() {
        return (
            <div>
                {/* 类组件接受属性 */}
                <NavBar title="导航"></NavBar>
                {/* 函数式组件侧边栏 */}
                <SideBar bg="yellow" position="left"></SideBar>
            </div>
        )
    }
}
