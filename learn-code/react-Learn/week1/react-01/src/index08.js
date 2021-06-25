import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

class App extends React.Component {
    // state = {
    //     list:['aaa','bbbb']
    // }
    //props是可以跨组件使用
    //state是本组件使用
    constructor(props){
        super(props) //es6的继承机制
        this.state = {
            list:['1111',222]
        }
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