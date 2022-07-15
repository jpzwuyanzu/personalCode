import React, { Component } from 'react'

export default class App extends Component {

  state = {
    mytext: '1111'
  }

  render() {
    console.log('render')
    return (
      <div>
        <button onClick={ () => {
          this.setState({
            mytext: '2222'
          })
        } }>button</button>
        { this.state.mytext }
      </div>
    )
  }

componentDidUpdate(prevProps, prevState, value) {
  console.log('componentDidUpdate', value)
}

getSnapshotBeforeUpdate() {
  console.log('getSnapshotBeforeUpdate')
  return 100
}

}
