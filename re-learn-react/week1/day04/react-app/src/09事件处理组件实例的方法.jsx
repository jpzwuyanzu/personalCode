
import React, { Component } from 'react'

export default class App extends Component {

    state = {
        msg: '12345'
    }

    constructor (props) {
        super(props)
        this.clickParamsFn2 = this.clickParamsFn2.bind(this) //会给当前的类添加实例方法
    }

    clickFn (event) {
        console.log('btn', event)
        event.preventDefault()
    }
    clickParamsFn2 () {
        console.log('3this', this)
        this.setState({
            msg: '333333'
        })
    }
    render () {
        return (
            <>
                <button onClick={ this.clickFn }>react事件处理,阻止默认行为</button>
                <button onClick={ this.clickParamsFn2 }>react事件处理,改变this指向-2{ this.state.msg }</button>
            </>
        )
    }
}
