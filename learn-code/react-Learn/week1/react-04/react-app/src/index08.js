import React from 'react'
import ReactDOM from 'react-dom'
import {Provider}  from 'react-redux'
import App from './thunk-08/App'
import store from './thunk-08/store'


ReactDOM.render(
    <Provider store = { store }>
        <App/>
    </Provider>,
    document.getElementById('root')
)