import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import {Provider} from 'react-redux'
import store  from './store/index'
import { ConfigProvider} from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale/zh_CN';

ReactDOM.render(
    <Provider store = {store}>
        <ConfigProvider locale={zhCN}>
        <App/>
        </ConfigProvider>
    </Provider>,
    document.getElementById('root')
)