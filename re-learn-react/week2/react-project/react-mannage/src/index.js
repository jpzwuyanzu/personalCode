import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN';
import { Provider } from 'react-redux'
import store from './store/index'


ReactDOM.render(
    <Provider store = { store }>
        <ConfigProvider locale={ zhCN }>
        <App/>
        </ConfigProvider>
    </Provider>,
    document.getElementById('root')
)