import React, { useEffect, useState } from 'react'
import { BrowserRouter} from 'react-router-dom'
import MRouter from './router/index'
import TabBar from './components/TabBar'
import store from './06-Redux/redux/store'
import './views/css/App.css'

// store.subscribe 订阅

const App = () =>  {

  const [isShow, setIsShow] = useState(store.getState().TabBarReducer.show)

  useEffect(() => {
    store.subscribe(() => {
      setIsShow(store.getState().TabBarReducer.show)
    })
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


export default App;