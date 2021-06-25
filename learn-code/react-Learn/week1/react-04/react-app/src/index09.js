import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './thunk-09/store'
import App from './thunk-09/App'

ReactDOM.render(
    <Provider store = { store }>
        <App/>
    </Provider>,
    document.getElementById('root')
)
