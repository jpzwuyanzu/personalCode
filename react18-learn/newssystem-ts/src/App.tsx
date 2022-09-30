import React, { Suspense } from 'react'
import { HashRouter, BrowserRouter } from 'react-router-dom'
import MRouter from './router/index'
import { Spin } from 'antd'
import './App.css'

const App = () => {
  return (
      <BrowserRouter>
        <MRouter/>
    </BrowserRouter>
  )
}

export default App