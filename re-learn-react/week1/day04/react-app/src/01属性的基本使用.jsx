import React, { Component } from 'react'

const Header = (props) => <div>{ props.name }</div>
const Content = (props) => <div>{ props.name }</div>


export default class App extends Component {
    render() {
        return (
            <>
               <Header name="header" /> 
               <Content name="content" />
            </>
        )
    }
}
