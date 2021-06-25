import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
//react的组件分为函数式组件和class组件
class App extends React.Component {
    render() { //继承至父类React的Component
        //返回一段jsx代码
        return <h1> <i>hello react class1</i> {this.props.name}</h1>
    }
}
ReactDOM.render(
  <React.StrictMode>
      <App name='react-test'/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
