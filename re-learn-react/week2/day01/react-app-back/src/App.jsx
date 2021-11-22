import React, { Component } from 'react'
import ToDoList from './todolist/TodoList'


export default class App extends Component {
    render() {
        return (
            <div>
                <ToDoList></ToDoList>
            </div>
        )
    }
}
