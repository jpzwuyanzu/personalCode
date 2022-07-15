import React, { Component } from 'react'

export default class App extends Component {

    state = {
        myName: 'test'
    }

    UNSAFE_componentWillMount() {
        console.log('第一次WillMount', this.state.myName)
        // 第一次上树前的最后一次修改状态
        this.setState({
            myName: 'oooooo'
        })

        //初始化数据的作用
    }

    componentDidMount() {
        console.log('第一次DidMount')
        // 可以做数据请求 axios
        // 订阅函数的调用
        // setInterval
        // 基于创建完的dom进行初始化， 例如betterScroll库
    }

    render() {
        console.log('render')
        return (
            <div>
                生命周期--{ this.state.myName }
            </div>
        )
    }
}
