import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import MRouter from './router/MRouter'
export default function App() {
  return (
      <BrowserRouter>
        <MRouter/>
      </BrowserRouter>
  )
}

