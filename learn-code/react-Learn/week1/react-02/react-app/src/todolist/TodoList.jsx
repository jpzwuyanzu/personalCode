import React, { Component } from 'react';
import Form from './Form'
import List from './List'
class TodoList extends Component {
    state = {
        keyWord:''
    }
    handlerReceiveKeyWord(keyWord) {
        console.log(keyWord)
        this.setState({keyWord})
    }
    render() {
        return (
            <div>
              <Form onReceiveKeyWord = { this.handlerReceiveKeyWord.bind(this) }></Form>
              <List keyWord = { this.state.keyWord }></List>
            </div>
        );
    }
}

export default TodoList;
