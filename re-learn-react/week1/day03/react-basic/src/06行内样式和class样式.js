import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './main.scss'

class App extends Component {
  render () {
    return (
      <div>
        <h1>react的样式处理</h1>
        <div style = {{ color: 'yellowgreen', fontSize: '30px' }}>
          react行内样式
        </div>
        <div className="test">
          react 的class样式
        </div>
      </div>
    )
  }
}


ReactDOM.render(
 <App/>,
  document.getElementById('root')
)