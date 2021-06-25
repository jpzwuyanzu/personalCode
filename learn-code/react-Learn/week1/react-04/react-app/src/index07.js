import React from 'react'
import ReactDOM from 'react-dom'
import App from './thunk-07//App'
import { Provider } from 'react-redux'
import store from './thunk-07/store'


ReactDOM.render(
<Provider store = { store }>
    <App/>
</Provider>,
document.getElementById('root')
)