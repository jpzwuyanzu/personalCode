import React from 'react';
import { observer} from 'mobx-react'

@observer
class App extends React.Component {
  componentDidMount() {
    this.props.store.getProlist()
  }
  render () {
    return (
      <>
        hello mobx
        {
          this.props.store.prolist.map((item, index) => {
           return  <div key = {index}>{item.categoryname}</div>
          })
        }
      </>
    )
  }
}


export default App;
