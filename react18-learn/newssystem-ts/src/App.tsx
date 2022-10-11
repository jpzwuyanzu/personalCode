import React from 'react'
import { HashRouter } from 'react-router-dom'
import MRouter from './router/index'
import './App.css'

const App = () => {
  return (
      <HashRouter>
        <MRouter/>
    </HashRouter>
  )
}

export default App