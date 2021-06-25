import React from 'react'
import ReactDOM from 'react-dom'
import TodoList from './todolist/TodoList'

import { Provider } from 'react-redux' 
import store from './todolist/store'

ReactDOM.render(
    <Provider store = { store }>
        <TodoList/>
    </Provider>,
    document.getElementById('root')
) 