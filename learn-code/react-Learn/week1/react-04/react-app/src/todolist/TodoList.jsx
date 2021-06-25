import React, { Component } from 'react';
import Form from './Form'
import List from './List'

class TodoList extends Component {
    render() {
        return (
            <div>
                <Form/>
                <List/>
            </div>
        );
    }
}

export default TodoList;
