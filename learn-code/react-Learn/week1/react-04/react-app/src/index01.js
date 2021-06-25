import React from 'react';
import ReactDOm from 'react-dom';
import App from './redux-03/App'
import store from './redux-03/store'

// ReactDOm.render(
//     <React.StrictMode>
//         <App/>
// </React.StrictMode>,
// document.getElementById('root')
// )
function render() {
    ReactDOm.render(
        <React.StrictMode>
            <App/>
    </React.StrictMode>,
    document.getElementById('root')
    )
}

render()


//如果状态一旦发生改变，就会重新执行render函数（自定义的函数）
store.subscribe(render)