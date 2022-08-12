import React from 'react'
import { BrowserRouter} from 'react-router-dom'
import MRouter from './router/index'
import TabBar from './components/TabBar'

const App = () =>  {
  return (
    <BrowserRouter>
      <MRouter/>
      <TabBar/>
    </BrowserRouter>
  )
}


export default App;