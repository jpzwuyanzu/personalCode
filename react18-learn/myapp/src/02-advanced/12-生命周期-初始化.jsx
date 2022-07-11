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
    }

    componentDidMount() {
        console.log('第一次DidMount')
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
