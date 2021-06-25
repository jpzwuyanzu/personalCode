import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

//react事件处理，
class App extends React.Component {
    state = {
        msg:'121212'
    }
    constructor(props) {
        super(props)
        this.clickPramasFn2 = this.clickPramasFn2.bind(this) //会给当前的类添加实力方法
    }
    clickFn(e) {
        //react事件中有一个默认参数event
        console.log('btn',e)
        e.preventDefault()
    }
    clickPramasFn(val) {
        this.setState({msg:val},() => {
            console.log(this.state.msg)
        })
    }
    clickPramasFn2(e) {
        console.log('btn',e)
        this.setState({msg:'4444444'})
    }
    render() { 
        return (
            <Fragment>
                <button onClick={this.clickFn}>react事件处理，阻止默认行为</button>
                <button onClick={this.clickPramasFn.bind(this,'params')}>react事件处理，改变this指向{this.state.msg}</button>
                <button onClick={this.clickPramasFn2}>react事件处理，改变this指向2{ this.state.msg }</button>
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