import React from 'react'
import ReactDOM from 'react-dom'
// import App from './router/App'
// import App from './immutable/App'
import App from './redux-imutable/App'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux-imutable/store/index'

ReactDOM.render(
    <Provider store = { store }>
        <Router>
        <App></App>
        </Router>
    </Provider>,
    document.getElementById('root')
)