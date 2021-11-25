import React from 'react'
import ReactDOM from 'react-dom'
// import App from './04todolist/TodoList'
import { Provider } from 'react-redux'
// import store from './04todolist/store'

// import App from './05request/App'

import store from './06thunk/store'

import App from './06thunk/App'


ReactDOM.render(
    <Provider store = { store }>
     <App></App>
    </Provider>,
    document.getElementById('root')
)

// ReactDOM.render(
//      <App></App>,
//     document.getElementById('root')
// )