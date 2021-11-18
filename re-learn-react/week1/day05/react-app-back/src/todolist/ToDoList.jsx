import React, { Component } from 'react'
import Form from './Form'
import List from './List'

export default class ToDoList extends Component {
    state = {
        keyword: ''
    }
    receiveKeyWord (keyword) {
        this.setState({
            keyword
        })
    }
    render() {
        return (
            <div>
               <Form onReceiveKeyWord = { this.receiveKeyWord.bind(this) }></Form> 
               <List sendData = { this.state.keyword  }></List>
            </div>
        )
    }
}
