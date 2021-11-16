import React from 'react';
import ReactDOM from 'react-dom';

// 这是在用jsx定义一个react元素
// const app  = <h1>hello world</h1>


//函数式组件,
const App = (props) => <h1>欢迎来到{ props.name }世界</h1>

ReactDOM.render(
  <App name="react-test" />, //标签写法， 首字母大写, 传递参数使用属性的方式 --这种方式符合jsx写法
  document.getElementById('root')
);
