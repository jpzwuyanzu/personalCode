
import React, { Component } from 'react'

export default class App extends Component {

    state = {
        msg: '12345'
    }
    testFn = () => {
        console.log(this)
        this.setState({
            msg: '2222'
        })
    }

    sendData = (val) => {
        this.setState({
            msg: val
        })
    }
    render () {
        return (
            <>
               <button onClick= { this.testFn }>箭头函数使用this</button>
               <button onClick= { () => {
                   this.sendData('params')
               } }>箭头函数使用this，传递参数</button>
               { this.state.msg }
            </>
        )
    }
}
