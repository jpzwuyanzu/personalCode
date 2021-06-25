import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

const Header = (props) => <div>{props.name}</div>
const Content = (props) => <div>{props.name}</div>
Content.defaultProps.name = '函数组件的默认值'

class Input extends React.Component {
    // static defaultProps = {
    //     type:'password'
    // }
    render() {
        return(
           <input type={ this.props.type } />
        )
    }
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
                <Header name="header"/>
                <Content name="content"/>
                <div>{ this.props.msg }</div>
                <Input type={ this.props.type }/>
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