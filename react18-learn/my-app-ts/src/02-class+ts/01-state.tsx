import React, { Component } from 'react'
interface IState{
    name: string
}

export default class App extends Component<any, IState> {
    // 上面的泛型中第一个参数是约束属性，第二个是约束状态
    state = {
        name: 'test'
    }

    render() {
        return (
            <div>
                App- { this.state.name.substring(0,1).toUpperCase() + this.state.name.substring(1) }
                <button onClick={ () => {
                    this.setState({
                        name: 'xiaoming'
                    })
                } }>click</button>
            </div>
        )
    }
}
