import React, { Fragment, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App'
import reportWebVitals from './reportWebVitals';

//体验react hook --让函数式组件拥有状态
//函数式组件不能用setState修改状态，只用hook方式来使用
const App = () => {
    const [count, setCount] = useState(10)
    const [list, setList] = useState(['1-','-2'])
    const clickFn = () => {
      setCount(count + 1)
    }
    return (
        <Fragment>
      <button onClick={ clickFn }>{ count }</button>
      <button onClick={ () => {
          setList(['a--','b'])
      } }>{ list }</button>
      </Fragment>
    )
  }
ReactDOM.render(
  <React.StrictMode>
      <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();