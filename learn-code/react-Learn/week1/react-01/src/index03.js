import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
class Header extends React.Component {
    render() {
        return (
            <h1>header部分</h1>
        )
    }
}
class Footer extends React.Component {
    render() {
        return (
            <h1>footer部分</h1>
        )
    }
}

//组件可以乔套使用，jsx的顶级标签可以是空标记和Freagment ---都不会在dom结构中添加标签
class App extends React.Component {
    render() { 
        return (
            <Fragment>
                <Header/>
                <Footer/>
            </Fragment>
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
