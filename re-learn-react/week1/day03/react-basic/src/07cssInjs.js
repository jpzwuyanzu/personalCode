
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// css in js
import styled from 'styled-components'

const Header = styled.header`
height: 44px;
background: #f66;
`

const Content = styled.section`
height: 440px;
background: #066;
color: #fff;
`

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Content>hello styled-components</Content>
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)