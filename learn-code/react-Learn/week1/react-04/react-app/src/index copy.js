import React from 'react'
import ReactDOM from 'react-dom'
// import App from './router-01/App'
// import App from './router-02/App'
// import App from './immutable/App'
import App from './redux-immutable/App'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux-immutable/store'

ReactDOM.render(
    <Router>
        <Provider store = { store }>
        <App/>
    </Provider>
    </Router>,
    document.getElementById('root')
)