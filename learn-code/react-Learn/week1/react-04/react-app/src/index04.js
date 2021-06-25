import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux-04/store'

import App from './redux-04/App'


function render () {
     ReactDOM.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>,
        document.getElementById('root')
    )
}

render()
//一旦状态改变即可更新视图
store.subscribe(render)