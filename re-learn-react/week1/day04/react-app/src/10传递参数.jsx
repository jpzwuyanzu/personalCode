
import React, { Component } from 'react'

export default class App extends Component {

    state = {
        msg: '12345'
    }

    sendData (val) {
        this.setState({
            msg: val
        })
    }
    render () {
        return (
            <>
               <button onClick= { this.sendData.bind(this, 'params') }>传递参数</button>
               { this.state.msg }
            </>
        )
    }
}
