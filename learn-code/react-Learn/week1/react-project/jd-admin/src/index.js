import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { ConfigProvider} from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale/zh_CN';

import store from './store'

import './index.css'

ReactDOM.render(
    <Provider store = { store }>
        <ConfigProvider locale={zhCN}>
        <App/>
        </ConfigProvider>
    </Provider>,
    document.getElementById('root')
)