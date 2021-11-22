import React from 'react'
import ReactDOM from 'react-dom'
import store from './03redux/store'

// import App from './01portals/App'
// import App from './02redux/App'
import App from './03redux/App'


// ReactDOM.render(
//     <App></App>,
//     document.getElementById('root')
// )

function render() {
    ReactDOM.render(
        <App></App>,
        document.getElementById('root')
    )
}

render()

// 如果状态一旦发生改变，就重新执行render函数（自定义函数）
store.subscribe(render)