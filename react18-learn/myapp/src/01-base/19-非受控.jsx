import React, { Component } from 'react'

export default class App extends Component {
    myusername = React.createRef()
    render() {
        return (
            <div>
                <h1>登录</h1>
                {/* 非受控设置默认值 */}
                {/* 脱离react控制的非受控组件 */}
                <input type="text" ref={ this.myusername } defaultValue="aaa" />
                <button onClick={ () => {
                    console.log(this.myusername.current.value)
                } }>登录</button>
                <button onClick={ () => {
                    this.myusername.current.value = ''
                } }>重置</button>
            </div>
        )
    }
}
