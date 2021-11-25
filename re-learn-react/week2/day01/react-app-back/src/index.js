import React from 'react'
import ReactDOM from 'react-dom'
// import App from './App'
import { Provider } from 'react-redux'
// import store from './store/index'

import App from './thunk/App'
import store from './thunk/store'

ReactDOM.render(
    <Provider store = { store }>
    <App></App>
    </Provider>,
    document.getElementById('root')
)