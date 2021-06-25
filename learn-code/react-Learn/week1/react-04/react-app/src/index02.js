import React from 'react';
import ReactDOM from 'react-dom';

import ToDoList from './todolist02/TodoList'


import  { Provider } from 'react-redux'
import store from './todolist02/store'


     ReactDOM.render(
        <Provider store = { store }>
            <ToDoList/>
        </Provider>,
        document.getElementById('root')
    )