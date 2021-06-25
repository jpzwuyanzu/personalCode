import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// react-native可以用来做app开发
//react-dom中的render方法就是渲染组件到dom树中
// 组件以标签的形式调用，--类比vue组件使用
// 如果标签首字母大写使用的是react组件，如果消协使用用的是react的元素 组件是由元素组成
//react元素
//react的组件分为函数式组件和class组件
ReactDOM.render(
  <React.StrictMode>
    <App name="开始吧" />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
