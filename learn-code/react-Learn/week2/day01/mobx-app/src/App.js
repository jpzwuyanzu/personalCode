import React, { useEffect } from 'react'
import { observer, inject } from 'mobx-react'

function App (props) {
  console.log(props)
  useEffect(() => {
    props.store.home.getProlist()
  }, [props.store.home])
  return (
    <>
    hello fn { props.store.home.prolen } 条数据
      {
        props.store.home.prolist.map((item ,index) => {
         return   <div key={index}> { item.categoryname}</div>
        }) 
      }
    </>
  )
}

export default inject('store')(observer(App))