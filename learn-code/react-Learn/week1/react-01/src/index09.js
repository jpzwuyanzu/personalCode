import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

class App extends React.Component {
    constructor(props){
        super(props) //es6的继承机制
        this.state = {
            list:['1111',222]
        }
    }
    componentDidMount() {
        //组件挂载,修改state只能使用setState修改
        //setState有两个参数，而且是异步的，需要通过回调函数获取最新的状态
        // state可以用来区分状态组件和无状态组件
        setTimeout(() => {
            this.setState({list:['a','b']},() => {
                console.log('这里是回掉')
            })
        },2000)
    }
    render() { 
        return (
            <Fragment>
                {this.state.list}
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