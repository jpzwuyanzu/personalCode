import React from 'react';
import ReactDOM from 'react-dom';

//类组件
//组件首字母大写，因为Class首字母必须大写
class App extends React.Component {
   render () { //render是继承自React.Component的方法
     return ( //必须返回一段jsx的代码
       <p>欢迎来到{ this.props.name }世界</p>
     )
   }
}


ReactDOM.render(
  <App name="react-class" />, //标签写法， 首字母大写, 传递参数使用属性的方式 --这种方式符合jsx写法
  document.getElementById('root')
);
