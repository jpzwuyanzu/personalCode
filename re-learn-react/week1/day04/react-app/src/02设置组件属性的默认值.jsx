import React, { Component } from 'react'

const Header = (props) => <div>{ props.name }</div>
const Content = (props) => <div>{ props.name }</div>
//函数式组件的属性默认值
Content.defaultProps = {
    name: 'ssssssss'
}

class Input extends Component {
    static defaultProps = {
        type: 'password'
    }
    render() {
        return (
            <input type={ this.props.type } />
        )
    }
}


export default class App extends Component {
    //使用类创建的组件，直接在这里写static方法，创建defaultProps
    static defaultProps = {
        msg: '我是App组件的默认属性值'
    }

    render() {
        return (
            <>
               <Header name="header" /> 
               <Content name="content" />
               <div>{ this.props.msg }</div>
               <Input/>
            </>
        )
    }
}
