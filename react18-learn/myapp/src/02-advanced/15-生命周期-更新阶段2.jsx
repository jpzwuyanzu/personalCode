import React, { Component } from 'react'

export default class App extends Component {
    state = {
        name: 'test'
    }
    render() {
        console.log('render')
        return (
            <div>
                <button onClick={ () => {
                    this.setState({
                        name: 'oooo'
                    })
                } }>button</button>
                { this.state.name }
            </div>
        )
    }
    shouldComponentUpdate(nextProps, nextState) {
        // return true; //代表一致允许更新 
        // return false; //代表不会更新
        // this.state 代表的老的状态
        // nextState 代表新的状态
        // 可以在这里优化性能
        if(JSON.stringify(this.state) !== JSON.stringify(nextState)) {
            return true
        }
        return false;
    }
    UNSAFE_componentWillUpdate() {
        console.log('UNSAFE_componentWillUpdate')
    }
    componentDidUpdate() {
        console.log('componentDidUpdate')
    }
}
