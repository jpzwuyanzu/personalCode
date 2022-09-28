import React, { useEffect } from 'react'
import { HashRouter } from 'react-router-dom'
import MRouter from './router/index'

const App = () => {
  return (
    <HashRouter>
      <MRouter/>
    </HashRouter>
  )
}

export default App