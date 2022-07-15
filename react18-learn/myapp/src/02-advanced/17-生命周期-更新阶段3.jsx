import React, { Component } from 'react'

class Child extends Component {

    state = {
        titile:''
    }

    render(){
        return <div>child-{ this.state.titile }</div>
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        //在这里可以拿到最新的父组件传递的属性 nextProps， 可以处理ajax
        // this.props.text 拿到的是修改之前的属性
        console.log('componentWillReceiveProps', nextProps)
        this.setState({
            titile: nextProps.text+'test'
        })
    }
}

export default class App extends Component {
    state ={
        text: '1111'
    }
    render() {
        return (
            <div>
                {
                    this.state.text
                }
                <button onClick={ () => {
                    this.setState({
                        text: '222'
                    })
                } }>click</button>
                <Child text={ this.state.text }></Child>
            </div>
        )
    }
}
