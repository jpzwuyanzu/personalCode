
import React, { Component } from 'react'

export default class App extends Component {

    state = {
        msg: '12345'
    }
    render () {
        return (
            <>
               <button onClick= { () => {
                    console.log(this)
                    this.setState({
                        msg: '2222'
                    })
               } }>箭头函数使用this</button>
               <button onClick= { () => {
                   this.sendData('params')
               } }>箭头函数使用this，传递参数</button>
               { this.state.msg }
            </>
        )
    }
}
