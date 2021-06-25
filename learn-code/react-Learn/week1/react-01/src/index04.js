import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

//组件可以乔套使用，jsx的顶级标签可以是空标记和Freagment ---都不会在dom结构中添加标签
class App extends React.Component {
    render() { 
        return (
            <div>
                <h1>react样式处理</h1>
                <div style={ {color:'yellow',fontSize:'30px'} }>react行内样式</div>
                <div className="test">react class样式</div>
                <div>react不同调价添加不同的样式</div>
            </div>
        )
    }
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