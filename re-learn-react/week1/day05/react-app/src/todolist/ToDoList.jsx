import React, { Component } from 'react'
import Form from './Form'
import List from './List'

export default class ToDoList extends Component {
    state = {
        keyword: ''
    }
    handlerReceiveKeyWord (keyword) {
        // console.log(keyword)
        this.setState({
            keyword: keyword
        })
    }
    render() {
        return (
            <div>
                <Form onReceiveKeyWord = { this.handlerReceiveKeyWord.bind(this) }></Form>
                <List keyword = { this.state.keyword }></List>
            </div>
        )
    }
}
