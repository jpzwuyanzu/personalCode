import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';
import reportWebVitals from './reportWebVitals';

//props.children就是react的内容分发
const Content = (props) => {
    return <div>{ props.children }content,我的名字是{ props.name }年纪是{props.age}</div>
}

//使用propType进行值的检验
Content.propTypes = {
    name:PropTypes.string,
    age:PropTypes.number.isRequired
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
                <div>{ this.props.msg }</div>
                {/* 数据为number或者是布尔值用大括号绑定数据 */}
                <Content name="asasas" age={18}>这里是</Content>
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