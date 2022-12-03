import React from 'react'
import './App.css'
import MRouter from './router/index'
import { HashRouter } from 'react-router-dom'

export default function App() {
  return (<>
    <HashRouter>
      <MRouter/>
    </HashRouter>
  </>)
}
