
import React, { Component } from 'react'

export default class App extends Component {

    state = {
        msg: '12345'
    }
    clickFn (event) {
        console.log('btn', event)
        event.preventDefault()
    }
    clickParamsFn () {
        console.log('2this', this)
        this.setState({
            msg: '222222'
        })
    }
    render () {
        return (
            <>
                <button onClick={ this.clickFn }>react事件处理,阻止默认行为</button>
                <button onClick={ this.clickParamsFn.bind(this) }>react事件处理,改变this指向-1{ this.state.msg }</button>
            </>
        )
    }
}
