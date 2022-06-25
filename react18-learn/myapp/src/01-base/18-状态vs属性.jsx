import React, { Component } from 'react'

class Child extends Component {
    render() {
        return (
            <div>
                child-{ this.props.text }
                <button onClick={ () => { 
                    //自组件不可以修改属性
                    // this.props.text === '3333'
                 } }>child</button>
            </div>
        )
    }
}

export default class App extends Component {

    state = {
        text: '1111'
    }

    render() {
        return (
            <div>
                <button onClick={ () => {
                    this.setState({
                        text: '2222'
                    })
                } } >click</button>
                <Child text={ this.state.text }></Child>
            </div>
        )
    }
}
