import React from 'react'
import { observer, inject } from 'mobx-react'
// @inject('store')  将store绑定到this.props上
@inject('store')
@observer
class App extends React.Component {

  componentDidMount() {
    const { getProlist } = this.props.store.home
    getProlist()
  }

  render () {
    console.log('-=-=-=-=-=')
    console.log(this.props.store.home.prolist)
    console.log('-=-=-=-=-=')
    return (
      <>
        <h2>mobx</h2>
        {
          this.props.store.home.prolist.map((item,index) => {
            return (
              <div key={index}>{item.categoryname}</div>
            )
          })
        }
      </>
    )
  }
}

export default App