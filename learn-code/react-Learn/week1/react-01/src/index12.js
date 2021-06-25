import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App'
import reportWebVitals from './reportWebVitals';
//类组件
class App extends React.Component {
    state = {
        xing:'',
        ming:''
    }
    changeInputhandler = (event) => {
        console.log(event.target.name, event.target.value)
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    render( ){
        const { xing, ming } = this.state
        return (
            <>
            <div>
                <label>姓</label>
                <input type="text" placeholder="姓" name="xing" onChange={ this.changeInputhandler } value={ xing } />
            </div>
            <div>
                <label>名</label>
                <input type="text" placeholder="名" name="ming"  onChange={ this.changeInputhandler } value={ ming } />
            </div>
            { xing } { ming }
            </>
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