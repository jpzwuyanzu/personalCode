import React, { useEffect } from 'react';
import { observer} from 'mobx-react'

const App = (props) => {
  console.log(props)
  useEffect(() => {
    props.store.getProlist()
  }, [])
  return (
    <div>
      hello mobx
      {
        props.store.prolist.map((item, index) => {
         return  <div key = {index}>{item.categoryname}</div>
        })
      }
    </div>
  );
}

export default observer(App);
