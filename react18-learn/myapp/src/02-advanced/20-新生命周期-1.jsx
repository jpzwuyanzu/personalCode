import React, { Component } from 'react'

export default class App extends Component {

    state = {
        name: 'tony'
    }

    static getDerivedStateFromProps(nextProps, nextState) {
        console.log('getDrivedStateFromProps', nextState)
        return {
            name: nextState.name.substring(0,1).toUpperCase() + nextState.name.substring(1) //这里返回的数据会跟状态合并
        }
    }

    render() {
        return (
            <div>
                <button onClick={ () => {
                    this.setState({
                        name: 'xiaoming'
                    })
                } }>button</button>
                20--{ this.state.name }
            </div>
        )
    }
}
