import React, { Component } from 'react'

export default class App extends Component {
    render() {
        return (
            <div>
                app
                <Child name="aaa"/>
            </div>
        )
    }
}

interface IProps {
    name: string
}

class Child extends Component<IProps, any> {
    render() {
        return (
            <div>child -- { this.props.name }</div>
        )
    }
}
