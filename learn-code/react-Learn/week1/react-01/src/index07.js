import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

//props.children就是react的内容分发
const Content = (props) => {
    console.log(props)
    return <div>{props.children[0]}content{props.children[1]}</div>
}

class App extends React.Component {
    //类组件的自定义属性 
    static defaultProps = {
        msg:'我是组件的默认属性',
        type:'text'
    }
    render() { 
        return (
            <Fragment>
                <Content>
                    <h1>你好</h1>
                    <h3>.....</h3>
                </Content>
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