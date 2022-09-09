import React, { useEffect, useState } from 'react'
import { BrowserRouter} from 'react-router-dom'
import MRouter from './router/index'
import TabBar from './components/TabBar'
import store from './05-Redux/redux/store'
import './views/css/App.css'

// store.subscribe 订阅

const App = () =>  {

  const [isShow, setIsShow] = useState(store.getState().show)

  useEffect(() => {
    store.subscribe(() => {
      console.log("app 中订阅", store.getState())
      setIsShow(store.getState().show)
    })
  }, [])

  return (
    <BrowserRouter>
      <MRouter></MRouter>
      { isShow ? <TabBar/> : null }
    </BrowserRouter>
  )
}


export default App;