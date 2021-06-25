import React, { Component } from 'react'
import Child from './components/Child'
import { observer, inject } from 'mobx-react'

@inject('store') //这里注入store
@observer //还要装饰成observer
class App extends Component {


  render () {
    return (
      <div>
        <h2>渲染子组件122</h2>
        <Child/>
      </div>
    )
  }
}

export default App