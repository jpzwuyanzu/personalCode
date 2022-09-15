import React, { useEffect, useState } from 'react'
import { BrowserRouter} from 'react-router-dom'
import MRouter from './router/index'
import TabBar from './components/TabBar'
import store from './06-Redux/redux/store'
import { connect } from 'react-redux'
import './views/css/App.css'

const App = ({ isShow }) =>  {
  useEffect(() => {
    console.log(isShow)
  }, [])

  return (
    <BrowserRouter>
      <MRouter></MRouter>
      {
        isShow ? <TabBar/> : null
      }
    </BrowserRouter>
  )
}
export default connect((state) => {
  return {
    a: 1,
    b: 1,
    isShow: state.TabBarReducer.show
  }
})(App);